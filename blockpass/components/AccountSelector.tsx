"use client";

import {usePolkadotExtensionWithContext} from '@/context/PolkadotExtensionContext';

export default function AccountSelector() {
    const {accounts, actingAccount, setActingAccountIdx} = usePolkadotExtensionWithContext();

    return (
        <select
            onChange={(event) => {
                const accountIdx = accounts
                    ? accounts.findIndex(
                        (account) => account.address === event.target.value.address
                    )
                    : 0;
                setActingAccountIdx(accountIdx);
            }}
            value={actingAccount?.address}
        >
            {accounts?.map((acc) => (
                <option key={acc.address} value={acc.address}>
                    {acc.meta?.name} - {acc.address}
                </option>
            ))}
        </select>
    );
}
