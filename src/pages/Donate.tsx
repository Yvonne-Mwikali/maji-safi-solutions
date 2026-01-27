import DonationModal from "@/components/DonationModal";
import { Button } from "@/components/ui/button";

// Simple redirect or wrapper page if user navigates to /donate directly
export default function Donate() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/5">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-heading font-bold text-primary">Support Our Cause</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Your donation makes a direct impact on water accessibility in rural communities.
        </p>
        <DonationModal trigger={
          <Button size="lg" variant="accent" className="text-lg px-12 py-6">
            Open Donation Form
          </Button>
        } />
      </div>
    </div>
  );
}
