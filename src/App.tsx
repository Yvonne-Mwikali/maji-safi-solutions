import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Team from "@/pages/Team";
import GetInvolved from "@/pages/GetInvolved";
import Donate from "@/pages/Donate";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body text-foreground selection:bg-accent/30">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/team" component={Team} />
          <Route path="/get-involved" component={GetInvolved} />
          <Route path="/donate" component={Donate} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
