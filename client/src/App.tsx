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

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/diet" component={Diet} />
      <Route path="/exercise" component={Exercise} />
      <Route path="/sleep" component={Sleep} />
      <Route path="/wisdom" component={Wisdom} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
