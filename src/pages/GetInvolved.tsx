import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, HeartHandshake, Briefcase, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function GetInvolved() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      type: "Volunteer",
    },
  });

  const onSubmit = async (data: InsertInquiry) => {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);
    formData.append("type", data.type);

    try {
      const siteKey = import.meta.env.VITE_PAGECLIP_SITE_KEY;
      const response = await fetch(
        `https://send.pageclip.co/${siteKey}/inquiry`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        toast({
          title: "Message sent!",
          description:
            "Thank you for reaching out. We'll get back to you as soon as possible.",
        });
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
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        {...form.register("name")}
                        placeholder="Your name"
                      />
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        {...form.register("email")}
                        placeholder="email@example.com"
                      />
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      I'm interested in...
                    </label>
                    <select
                      {...form.register("type")}
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
                      {...form.register("message")}
                      className="min-h-[150px]"
                      placeholder="Tell us a bit about yourself..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-xs text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-lg bg-secondary hover:bg-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
