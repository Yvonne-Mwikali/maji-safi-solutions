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
import { Textarea } from "@/components/ui/textarea";
import { insertDonationSchema, type InsertDonation } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface DonationModalProps {
  projectId?: number;
  projectTitle?: string;
  trigger?: React.ReactNode;
}

export default function DonationModal({
  projectId,
  projectTitle,
  trigger,
}: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertDonation>({
    resolver: zodResolver(insertDonationSchema),
    defaultValues: {
      projectId,
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: InsertDonation) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone || "");
    formData.append("message", data.message);
    formData.append("projectId", data.projectId?.toString() || "");

    try {
      const siteKey = import.meta.env.VITE_PAGECLIP_SITE_KEY;
      const response = await fetch(
        `https://send.pageclip.co/${siteKey}/donation`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        toast({
          title: "Thank you!",
          description:
            "Your donation pledge has been received. We'll contact you shortly to complete the process.",
        });
        setOpen(false);
        form.reset();
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="accent">Donate Now</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-accent fill-accent" />
            Pledge a Donation
          </DialogTitle>
          <DialogDescription>
            {projectTitle
              ? `Tell us how you want to support "${projectTitle}" and we'll follow up.`
              : "Share your intent to give and we'll coordinate next steps with you."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Your Name</label>
              <Input {...form.register("name")} placeholder="Jane Doe" />
              {form.formState.errors.name && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                {...form.register("email")}
                placeholder="you@example.com"
                type="email"
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone (optional)</label>
              <Input {...form.register("phone")} placeholder="+254..." />
              {form.formState.errors.phone && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                {...form.register("message")}
                placeholder="Share your pledge details, preferred follow-up, or questions."
                className="resize-none h-24"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit pledge"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            We'll reach out by email to complete your donation.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
