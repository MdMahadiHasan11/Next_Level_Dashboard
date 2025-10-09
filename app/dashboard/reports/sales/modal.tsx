import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TestModal({ openModal }: { openModal: string | null }) {
  console.log({ openModal });
  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modal Opened</DialogTitle>
          <DialogDescription>
            Modal ID: <span className="font-mono">123456789</span>
          </DialogDescription>
        </DialogHeader>
        <p>This is where your modal content would go.</p>
      </DialogContent>
    </div>
  );
}
