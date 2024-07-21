"use client";

import {useEffect, useRef, useState} from "react";

// Qr Scanner
import QrScanner from "qr-scanner";
import {scan} from "rxjs";
import {ethers} from "ethers";
import {getTicketByContractAndTicketId} from "@/app/(lib)/database/ticket_manager";

import EventsAbi from "@/app/(lib)/contracts/abi/events.json";

const QrReader = () => {
    // QR States
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement>(null);
    const qrBoxEl = useRef<HTMLDivElement>(null);
    const [qrOn, setQrOn] = useState<boolean>(true);

    // Result
    const [scannedResult, setScannedResult] = useState<string | undefined>("");
    const [validTicket, setValidTicket] = useState(false);

    useEffect(() => {
        if (!scannedResult)
            setValidTicket(false);

        if (scannedResult.startsWith("http://")) {
            setScannedResult(scannedResult.substring(7));
        }

        const parts = scannedResult.split(".");
        if (parts.length != 3) {
            setValidTicket(false);
            return;
        }

        // Check if scanned result is a valid ticket
        const ticket = getTicketByContractAndTicketId(parts[0], parts[1])
        if (!ticket) {
            setValidTicket(false);
            return;
        }

        const test = async () => {
            const provider = new ethers.BrowserProvider((window as any).ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(parts[0], EventsAbi, signer);
            await contract.verifyTicket(BigInt(parts[1]));
            setValidTicket(true);
        }

        void test()
    }, [scannedResult]);


    // Success
    const onScanSuccess = (result: QrScanner.ScanResult) => {
        // 🖨 Print the "result" to browser console.
        console.log(result);
        // ✅ Handle success.
        // 😎 You can do whatever you want with the scanned result.
        setScannedResult(result?.data);
    };

    // Fail
    const onScanFail = (err: string | Error) => {
        // 🖨 Print the "err" to browser console.
        console.log(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
            });

            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);

    return (
        <div className="w-screen h-screen flex justify-items-center qr-reader">
            {/* QR */}
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box"></div>

            {/* Show Data Result if scan is success */}
            {scannedResult && (
                <p
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 99999,
                        color: "white",
                        backgroundColor: validTicket ? "green" : "red",
                    }}
                >
                    Scanned Result: {scannedResult}
                </p>
            )}
        </div>
    );
};

export default QrReader;
