import { useState } from "react";
import { type InsertDonation } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

type MutationOptions = {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
};

export function useCreateDonation() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutate = (_data: InsertDonation, options?: MutationOptions) => {
    setIsPending(true);

    // Simulate a network request so UI states remain intact without a backend.
    setTimeout(() => {
      setIsPending(false);
      toast({
        title: "Thank you!",
        description: "Your donation helps bring clean water to those in need.",
      });
      options?.onSuccess?.();
    }, 450);
  };

  return { mutate, isPending };
}
