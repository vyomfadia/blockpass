"use client";

import { createContext, ReactNode, useContext } from 'react';
import {
    usePolkadotExtension,
    UsePolkadotExtensionReturnType,
} from '@/app/(hooks)/UsePolkdadotExtension';

const PolkadotExtensionContext = createContext<UsePolkadotExtensionReturnType>({
    accounts: [],
    error: null,
    isReady: false,
    actingAccount: null,
    injector: null,
    setActingAccountIdx: () => {},
});

export const usePolkadotExtensionWithContext = () => useContext(PolkadotExtensionContext);

export const PolkadotExtensionContextProvider = ({ children }: { children: ReactNode }) => {
    const polkadotExtension = usePolkadotExtension();

    return (
        <PolkadotExtensionContext.Provider value={polkadotExtension}>
            {children}
        </PolkadotExtensionContext.Provider>
    );
};
