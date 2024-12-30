"use client";

import { NewMenuForm } from "@/components/new-menu-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { useState } from "react";

export function NewMenuSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="sm" className="gap-2">
          <Plus className="size-4" />
          Add Menu
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg pt-12">
        <SheetHeader className="mb-8">
          <SheetTitle>Add New Menu</SheetTitle>
          <SheetDescription>
            Share a restaurant menu with the community.
          </SheetDescription>
        </SheetHeader>
        <NewMenuForm className="pb-10" onSuccess={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
