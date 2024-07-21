"use client";

import {usePolkadotExtensionWithContext} from '@/app/(context)/PolkadotExtensionContext';

export default function AccountSelector() {
    const {accounts, actingAccount, setActingAccountIdx} = usePolkadotExtensionWithContext();

    return (
        <select
            onChange={(event) => {
                const accountIdx = accounts
                    ? accounts.findIndex(
                        (account) => account.address === (event.target.value as any).address
                    )
                    : 0;
                setActingAccountIdx(accountIdx);
            }}
            value={actingAccount?.address}
            className={"w-full text-sm border border-gray-300 bg-black text-[#000000] rounded-lg p-2"}
        >
            {accounts?.map((acc) => (
                <option key={acc.address+" "+acc.meta.name} value={acc.address}>
                    {acc.meta?.name} - {acc.address}
                </option>
            ))}
        </select>
    );
}
