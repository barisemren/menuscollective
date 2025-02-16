import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

interface QrScannerProps {
  onResult: (url: string) => void;
  onError?: (error: string) => void;
}

export default function QrScanner({ onResult, onError }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
      }
    };
  }, []);

  const startScanning = () => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
      },
      false
    );

    scanner.render(
      (decodedText) => {
        // Validate if the decoded text is a valid URL
        try {
          const url = new URL(decodedText);
          onResult(url.toString());
          scanner.clear();
          setIsScanning(false);
        } catch {
          onError?.("Invalid URL detected. Please scan a valid menu URL.");
        }
      },
      () => {}
    );

    scannerRef.current = scanner;
    setIsScanning(true);
  };

  const stopScanning = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      setIsScanning(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-center">
          {!isScanning ? (
            <Button onClick={startScanning}>Start QR Scanner</Button>
          ) : (
            <Button variant="destructive" onClick={stopScanning}>
              Stop Scanner
            </Button>
          )}
        </div>
        <div id="qr-reader" className="w-full max-w-sm mx-auto" />
      </div>
    </Card>
  );
}
