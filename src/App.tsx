import { Switch, Route, Router } from "wouter";

import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Navigation from "./components/navigation";
import Home from "./pages/home";
import Scientists from "./pages/scientists";
import Questionnaire from "./pages/questionnaire";
import NotFound from "./pages/not-found";
import useHashLocation from "./hooks/useHasLocation";
import { useEffect } from "react";

function AppRouter() {
  useEffect(() => {
    const onHashChange = () => {
      window.location.reload();
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/scientists" component={Scientists} />
          <Route path="/questionnaire" component={Questionnaire} />
          <Route path="/scientists/:id" component={Scientists} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
