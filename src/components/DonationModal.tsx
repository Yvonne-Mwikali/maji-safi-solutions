import { SITE_LINKS } from "@/constants/links";
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
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface DonationModalProps {
  projectId?: number;
  projectTitle?: string;
  trigger?: React.ReactNode;
  type?: string;
}

declare global {
  interface Window {
    Pageclip?: {
      form: (form: HTMLFormElement | string) => void;
    };
  }
}

export default function DonationModal({
  projectId,
  projectTitle,
  trigger,
  type = "donations",
}: DonationModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // Initialize Pageclip when modal opens and form is available
    if (open && formRef.current && window.Pageclip) {
      window.Pageclip.form(formRef.current);

      // Add event listeners for Pageclip events
      const form = formRef.current;

      const handleSuccess = () => {
        setIsSubmitting(false);
        toast({
          title: "Thank you!",
          description:
            type === "donations"
              ? "Your donation pledge has been received. We'll contact you shortly to complete the process."
              : "Your message has been received. We'll get back to you soon.",
        });
        setTimeout(() => {
          setOpen(false);
          form?.reset();
        }, 1500);
      };

      const handleError = () => {
        setIsSubmitting(false);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      };

      form.addEventListener("pageclip-success", handleSuccess);
      form.addEventListener("pageclip-error", handleError);

      return () => {
        form.removeEventListener("pageclip-success", handleSuccess);
        form.removeEventListener("pageclip-error", handleError);
      };
    }
  }, [open, toast, type]);

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

        <form
          ref={formRef}
          action={SITE_LINKS.donationForm}
          className="pageclip-form space-y-6 mt-4"
          method="post"
          onSubmit={() => setIsSubmitting(true)}
        >
          {/* Hidden field for submission type */}
          <input type="hidden" name="type" value={type} />

          {/* Hidden field for project ID */}
          {projectId && (
            <input type="hidden" name="projectId" value={projectId} />
          )}
          {projectTitle && (
            <input type="hidden" name="projectTitle" value={projectTitle} />
          )}

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Your Name</label>
              <Input name="name" placeholder="Jane Doe" required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                placeholder="you@example.com"
                type="email"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Phone (optional)</label>
              <Input name="phone" placeholder="+254..." />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Message</label>
              <Textarea
                name="message"
                placeholder="Share your pledge details, preferred follow-up, or questions."
                className="resize-none h-24"
              />
            </div>
          </div>

          <button
            type="submit"
            className="pageclip-form__submit w-full text-lg py-6 bg-secondary hover:bg-secondary/90 rounded-md font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-5 w-5 rounded-full border-2 border-white/70 border-t-transparent animate-spin" />
                Sending...
              </span>
            ) : (
              <span>Submit pledge</span>
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            We'll reach out by email to complete your donation.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
