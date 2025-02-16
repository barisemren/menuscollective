import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import QrScanner from "./qr-scanner";

export default function ScanMenuDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleScanResult = (url: string) => {
    setIsOpen(false);
    toast({
      title: "QR Code Scanned",
      description: `Menu URL detected: ${url}`,
    });
  };

  const handleScanError = (error: string) => {
    toast({
      title: "Scan Error",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="relative px-2.5 py-1 text-sm font-medium text-nowrap inline-flex hover:text-mc-primary text-popover">
          <span className="font-bold hidden lg:block">-</span>
          <span className="lg:hidden lg:group-hover:block ml-1 inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <rect width="7" height="7" x="7" y="7" rx="1" />
              <path d="M7 15h7" />
            </svg>
            Scan QR
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Menu QR Code</DialogTitle>
          <DialogDescription>
            Point your camera at a menu QR code to add it to your collection.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <QrScanner onResult={handleScanResult} onError={handleScanError} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
