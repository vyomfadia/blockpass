import NextAuth, {User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import {cryptoWaitReady, signatureVerify} from '@polkadot/util-crypto';
import {encodeAddress, decodeAddress} from '@polkadot/keyring';
import {u8aToHex} from '@polkadot/util';
import {ApiPromise, WsProvider} from '@polkadot/api';
import {BN} from '@polkadot/util';

declare module 'next-auth' {
    interface Session {
        address: string | undefined;
        ksmAddress: string;
        freeBalance: BN;
    }

    interface User {
        id: string;
        ksmAddress: string;
        freeBalance: BN;
    }

    interface credentials {
        address: string;
        message: string;
        signature: string;
        csrfToken: string;
    }
}

const handler = NextAuth({
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    address: {
                        label: 'Address',
                        type: 'text',
                        placeholder: '0x0',
                    },
                    message: {
                        label: 'Message',
                        type: 'text',
                        placeholder: '0x0',
                    },
                    signature: {
                        label: 'Signature',
                        type: 'text',
                        placeholder: '0x0',
                    },
                    csrfToken: {
                        label: 'CSRF Token',
                        type: 'text',
                        placeholder: '0x0',
                    },
                    name: {
                        label: 'Name',
                        type: 'text',
                        placeholder: 'name',
                    },
                },
                async authorize(credentials): Promise<User | null> {
                    if (credentials === undefined) {
                        return null;
                    }
                    try {
                        const message = JSON.parse(credentials.message);
                        if (message.uri !== process.env.NEXTAUTH_URL || message.nonce !== credentials.csrfToken) {
                            return Promise.reject(new Error('invalid request'));
                        }

                        await cryptoWaitReady();
                        if (!signatureVerify(credentials.message, credentials.signature, credentials.address,).isValid) {
                            return Promise.reject(new Error('invalid signature'));
                        }

                        console.log("here")
                        const wsProvider = new WsProvider('wss://rpc.polkadot.io');
                        console.log("here2")
                        const api = await ApiPromise.create({ provider: wsProvider });
                        console.log("here3")

                        if (credentials?.address) {
                            const ksmAddress = encodeAddress(credentials.address, 2);
                            // highlight-start
                            const accountInfo = await api.query.system.account(ksmAddress);

                            if (accountInfo.data.free.gt(new BN(1_000_000_000_000))) {
                                // if the user has a free balance > 1 KSM, we let them in
                                return {
                                    id: credentials.address,
                                    name: credentials.name,
                                    freeBalance: accountInfo.data.free,
                                    ksmAddress,
                                };
                            } else {
                                return Promise.reject(new Error('🚫 The gate is closed for you'));
                            }
                            // highlight-end
                        }

                        return Promise.reject(new Error('🚫 API Error'));
                    } catch (e) {
                        return null;
                    }
                },
            }),
        ],
        session: {
            strategy: 'jwt',
            // maxAge: 3, // uncomment to test session expiration in seconds
        },
        jwt: {
            secret: process.env.NEXTAUTH_SECRET,
        },
    }
)

export {handler as GET, handler as POST}
