"use client";

import {useRouter} from "next/navigation";
import {useState} from "react";
import {useSession, signIn, signOut, getCsrfToken} from 'next-auth/react';
import AccountSelector from "@/app/(components)/AccountSelector";
import {usePolkadotExtensionWithContext} from "@/app/(context)/PolkadotExtensionContext";
import {sign} from "node:crypto";

export default function LoginButton() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {accounts, actingAccount, injector} = usePolkadotExtensionWithContext();

    async function handleLogin() {
        try {
            console.log("AUTHING!!!")
            setIsLoading(true);

            let signature = '';
            const message = {
                statement: 'Sign in with polkadot extension to the example tokengated example dApp',
                uri: window.location.origin,
                version: '1',
                nonce: await getCsrfToken(),
            };

            const payload = JSON.stringify(message);
            const signRaw = injector?.signer?.signRaw;
            console.log(signRaw);
            if (!!signRaw && !!actingAccount) {
                // after making sure that signRaw is defined
                // we can use it to sign our message
                const data = await signRaw({
                    address: actingAccount.address,
                    data: payload,
                    type: 'bytes',
                });

                signature = data.signature;
            }

            const result = await signIn('credentials', {
                redirect: false,
                callbackUrl: '/events',
                message: payload,
                name: actingAccount?.meta?.name,
                signature: signature,
                address: actingAccount?.address,
            });

            setError(result?.error ?? null);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className={"flex justify-center items-center h-screen"}>
            <div
                className="min-w-[30rem] p-4 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <form className="space-y-6" action="#">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign In to BlockPass</h5>
                    <AccountSelector/>
                    <div role="button"
                         className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                         onClick={handleLogin}>
                        Login to your account
                    </div>
                    <div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}
