"use client";

import { addMenuRestaurant } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useFormStatus } from "react-dom";

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await addMenuRestaurant(formData);
      router.refresh();
      onSuccess?.();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
      // aria-disabled={isPending}
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
          <Input
            id="link"
            type="text"
            name="link"
            placeholder="https://example.com/menu"
            required
            disabled={isPending}
          />
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
