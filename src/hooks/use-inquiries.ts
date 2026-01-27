import { useState } from "react";
import { type InsertInquiry } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface MutationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useCreateInquiry() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutate = (data: InsertInquiry, options?: MutationOptions) => {
    setIsPending(true);

    // Mimic a quick API success so the UI flow stays intact without a backend.
    setTimeout(() => {
      setIsPending(false);
      toast({
        title: "Thanks for reaching out!",
        description: "We'll reply within 1–2 business days.",
      });
      options?.onSuccess?.();
    }, 450);
  };

  return { mutate, isPending };
}
