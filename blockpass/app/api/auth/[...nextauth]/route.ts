import NextAuth, {User} from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import {cryptoWaitReady, signatureVerify} from '@polkadot/util-crypto';
import {encodeAddress} from '@polkadot/keyring';
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

                        const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
                        const api = await ApiPromise.create({provider: wsProvider});

                        if (credentials?.address) {
                            const ksmAddress = encodeAddress(credentials.address, 2);
                            const accountInfo = await api.query.system.account(ksmAddress);

                            return {
                                id: credentials.address,
                                name: credentials.name,
                                freeBalance: accountInfo.data.free,
                                ksmAddress,
                            };
                        }

                        return Promise.reject(new Error('unknown error occurred'));
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
        callbacks: {
            async jwt({token, user}) {
                if (user) {
                    token.freeBalance = user.freeBalance;
                }
                return token;
            },
            async session(sessionData) {
                const {session, token} = sessionData;

                session.address = token.sub;
                if (session.address) {
                    session.ksmAddress = encodeAddress(session.address, 2);
                }

                // as we already queried it, we can add whatever token to the session,
                // so pages can use it without an extra query
                session.freeBalance = token.freeBalance as BN;

                return session;
            }
        }
    }
)

export {handler as GET, handler as POST}
