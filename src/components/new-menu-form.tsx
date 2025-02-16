"use client";

import { addMenuRestaurant } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Loader2, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import QrScanner from "./qr-scanner";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Adding menu...
        </>
      ) : (
        "Add Menu"
      )}
    </Button>
  );
}

export function NewMenuForm({
  className,
  onSuccess,
  ...props
}: React.ComponentPropsWithoutRef<"form"> & {
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false);
  const menuLinkInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await addMenuRestaurant(formData);
      router.refresh();
      onSuccess?.();
    });
  }

  const handleQrScanResult = (url: string) => {
    if (menuLinkInputRef.current) {
      menuLinkInputRef.current.value = url;
    }
    setIsQrDialogOpen(false);
    toast({
      title: "QR Code Scanned",
      description: "Menu URL has been added to the form.",
    });
  };

  const handleQrScanError = (error: string) => {
    toast({
      title: "Scan Error",
      description: error,
      variant: "destructive",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="restaurant_name">Restaurant Name</Label>
          <Input
            id="restaurant_name"
            type="text"
            name="restaurant_name"
            placeholder="Burger King"
            required
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="link">Menu Link</Label>
          <div className="flex gap-2">
            <Input
              ref={menuLinkInputRef}
              id="link"
              type="text"
              name="link"
              placeholder="https://example.com/menu"
              required
              disabled={isPending}
            />
            <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  disabled={isPending}
                >
                  <QrCode className="h-4 w-4" />
                  <span className="sr-only">Scan QR Code</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Scan Menu QR Code</DialogTitle>
                  <DialogDescription>
                    Point your camera at a menu QR code to automatically fill
                    the menu link.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <QrScanner
                    onResult={handleQrScanResult}
                    onError={handleQrScanError}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Google Maps Link</Label>
          <Input
            id="location"
            type="text"
            name="location"
            placeholder="https://goo.gl/maps/..."
            required
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            name="category"
            placeholder="Fast Food, Cafe, etc."
            required
            disabled={isPending}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cuisine">Cuisine</Label>
          <Input
            id="cuisine"
            type="text"
            name="cuisine"
            placeholder="American, Italian, etc."
            disabled={isPending}
          />
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
