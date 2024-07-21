"use client";

import LoginButton from "@/app/(components)/LoginButton";
import {useSession, signIn, signOut, getCsrfToken} from 'next-auth/react';
import {useEffect} from "react";
import {listAllEvents} from "@/app/(lib)/event_manager";

export default function Login() {
    const authSession = useSession();

    useEffect(() => {
        if (authSession.status === "loading") {
            return;
        }

        if (authSession.data) {
            console.log(authSession.data.address);
        } else {
            console.log("no auth session detect");
        }
    }, [authSession.data, authSession.status]);

    if (authSession.status === "authenticated") {
        listAllEvents().then((events) => {
            events.map((event) => {
                console.log(event.name);
            })
        })
    }

    return (
        <LoginButton />
    );
}
