"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PermissionButton } from "@/common/permission-button";
import TestModal from "./modal";
import { collectPermittedHrefs } from "@/lib/permission-button";
// Example array of items to map over
const items = [
  {
    id: "1",
    modalId: "modal-1",
    label: "Edit Invoice 1",
  },
  {
    id: "2",
    modalId: "modal-2",
    label: "Edit Invoice 2",
  },
  {
    id: "3",
    modalId: "modal-3",
    label: "Edit Invoice 3",
  },
];
export default function ExamplePage() {
  const [openModal, setOpenModal] = useState<string | null>(null);

  const allHref = collectPermittedHrefs();

  const handleModalOpen = (tourId: string) => {
    setOpenModal(tourId);
    console.log("click button");
    console.log(tourId);
  };
  console.log("openModal", openModal);

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">Permission-Based Menu System</h1>
      {/* Mapping over items to render PermissionButton */}
      <Card>
        <CardHeader>
          <CardTitle>Array of Buttons</CardTitle>
          <CardDescription>
            Rendering multiple PermissionButton components using array map
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4 flex-wrap">
          {items.map((item) => (
            <div key={item.id}>
              <PermissionButton
                buttonId="invoice-air-ticket-create"
                id={item.id}
                onClick={() => console.log("click button")}
                className="min-w-[150px]"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Example Modal */}
      {openModal && (
        <Dialog open={!!openModal} onOpenChange={() => setOpenModal(null)}>
          <TestModal openModal={openModal} />
        </Dialog>
      )}
    </div>
  );
}
