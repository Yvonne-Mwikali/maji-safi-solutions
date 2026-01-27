import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  HeartHandshake,
  UserPlus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Pageclip?: {
      form: (form: HTMLFormElement | string) => void;
    };
  }
}

export default function GetInvolved() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [inquiryType, setInquiryType] = useState("Volunteer");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    // Initialize Pageclip when component mounts and form is available
    if (formRef.current && window.Pageclip) {
      window.Pageclip.form(formRef.current);

      const form = formRef.current;

      const handleSuccess = () => {
        toast({
          title: "Message sent!",
          description:
            "Thank you for reaching out. We'll get back to you as soon as possible.",
        });
        form?.reset();
        setInquiryType("Volunteer");
        setShowThankYou(true);
      };

      const handleError = () => {
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
  }, [toast]);

  const options = [
    {
      icon: UserPlus,
      title: "Volunteer",
      desc: "Join us in the field or remotely to support our operations.",
      value: "Volunteer",
    },
    {
      icon: Briefcase,
      title: "Partner",
      desc: "Corporate sponsorships and strategic partnerships.",
      value: "Partner",
    },
    {
      icon: HeartHandshake,
      title: "General Inquiry",
      desc: "Have a question? We'd love to hear from you.",
      value: "General",
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Content Side */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6">
                Join the Mission
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're an engineer, a donor, or an advocate, there's a
                place for you at Maji Safi Solutions.
              </p>
            </motion.div>

            <div className="grid gap-6">
              {options.map((opt, i) => (
                <motion.div
                  key={opt.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex gap-4 p-6 bg-background rounded-xl shadow-sm border border-border/50 hover:border-accent/50 transition-colors"
                >
                  <div className="bg-primary/5 p-3 h-fit rounded-lg text-primary">
                    <opt.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl text-primary mb-2">
                      {opt.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{opt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-xl border-accent/20">
              <CardHeader className="bg-primary text-white rounded-t-xl p-8">
                <CardTitle className="text-white">Get in Touch</CardTitle>
                <p className="text-white/70">
                  Fill out the form below and we'll contact you shortly.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form
                  ref={formRef}
                  action="https://send.pageclip.co/0dpcc9PmOD35T08kTAjVaHO9sLqHl45F/donations"
                  className="pageclip-form space-y-6"
                  method="post"
                >
                  {/* Hidden field for submission type */}
                  <input type="hidden" name="type" value="contact" />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input name="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      I'm interested in...
                    </label>
                    <select
                      name="inquiryType"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <option value="Volunteer">Volunteering</option>
                      <option value="Partner">Partnership</option>
                      <option value="General">General Question</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <Textarea
                      name="message"
                      className="min-h-[150px]"
                      placeholder="Tell us a bit about yourself..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="pageclip-form__submit w-full text-lg bg-secondary hover:bg-secondary/90 rounded-md font-medium py-3 transition-colors"
                  >
                    <span>Send Message</span>
                  </button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Thank You Modal - No close button */}
      <Dialog open={showThankYou} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" hideCloseButton>
          <div className="flex flex-col items-center text-center space-y-6 py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </motion.div>
            <div className="space-y-2">
              <DialogTitle className="text-3xl font-heading">
                Thank You!
              </DialogTitle>
              <DialogDescription className="text-lg">
                Your message has been received. We'll review your inquiry and
                get back to you shortly.
              </DialogDescription>
            </div>
            <p className="text-sm text-muted-foreground">
              We appreciate your interest in joining the Maji Safi Solutions
              mission. Our team will be in touch soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
