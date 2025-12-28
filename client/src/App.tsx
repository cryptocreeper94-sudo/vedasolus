import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Diet from "@/pages/Diet";
import Exercise from "@/pages/Exercise";
import Sleep from "@/pages/Sleep";
import Wisdom from "@/pages/Wisdom";
import Ayurveda from "@/pages/Ayurveda";
import Library from "@/pages/Library";
import Passport from "@/pages/Passport";
import Marketplace from "@/pages/Marketplace";
import Community from "@/pages/Community";
import Settings from "@/pages/Settings";
import DeveloperDashboard from "@/pages/Developer";
import PractitionerDashboard from "@/pages/Practitioner";
import AdminDashboard from "@/pages/Admin";
import Meditation from "@/pages/Meditation";
import Messages from "@/pages/Messages";
import HealthRecords from "@/pages/HealthRecords";
import { DisclaimerModal } from "@/components/ui/disclaimer-modal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/ayurveda" component={Ayurveda} />
      <Route path="/passport" component={Passport} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/community" component={Community} />
      <Route path="/library" component={Library} />
      <Route path="/settings" component={Settings} />
      <Route path="/developer" component={DeveloperDashboard} />
      <Route path="/practitioner" component={PractitionerDashboard} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/diet" component={Diet} />
      <Route path="/exercise" component={Exercise} />
      <Route path="/sleep" component={Sleep} />
      <Route path="/wisdom" component={Wisdom} />
      <Route path="/meditation" component={Meditation} />
      <Route path="/messages" component={Messages} />
      <Route path="/records" component={HealthRecords} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <DisclaimerModal />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
