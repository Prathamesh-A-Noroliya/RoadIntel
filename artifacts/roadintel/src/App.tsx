import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";

import RootLayout from "@/components/layout/root-layout";
import AppLayout from "@/components/layout/app-layout";

import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Dashboard from "@/pages/dashboard";
import Complaints from "@/pages/complaints";
import Scan from "@/pages/scan";
import Roads from "@/pages/roads";
import RoadDetail from "@/pages/road-detail";
import RiskMap from "@/pages/risk-map";
import Spending from "@/pages/spending";
import Sensors from "@/pages/sensors";
import Contractors from "@/pages/contractors";
import Analytics from "@/pages/analytics";
import Settings from "@/pages/settings";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public / Marketing Routes */}
      <Route path="/">
        <RootLayout>
          <Landing />
        </RootLayout>
      </Route>
      <Route path="/login">
        <RootLayout>
          <Login />
        </RootLayout>
      </Route>
      <Route path="/register">
        <RootLayout>
          <Register />
        </RootLayout>
      </Route>

      {/* App Routes with Sidebar */}
      <Route path="/dashboard">
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </Route>
      <Route path="/complaints">
        <AppLayout>
          <Complaints />
        </AppLayout>
      </Route>
      <Route path="/scan">
        <AppLayout>
          <Scan />
        </AppLayout>
      </Route>
      <Route path="/roads">
        <AppLayout>
          <Roads />
        </AppLayout>
      </Route>
      <Route path="/roads/:id">
        <AppLayout>
          <RoadDetail />
        </AppLayout>
      </Route>
      <Route path="/risk-map">
        <AppLayout>
          <RiskMap />
        </AppLayout>
      </Route>
      <Route path="/spending">
        <AppLayout>
          <Spending />
        </AppLayout>
      </Route>
      <Route path="/sensors">
        <AppLayout>
          <Sensors />
        </AppLayout>
      </Route>
      <Route path="/contractors">
        <AppLayout>
          <Contractors />
        </AppLayout>
      </Route>
      <Route path="/analytics">
        <AppLayout>
          <Analytics />
        </AppLayout>
      </Route>
      <Route path="/settings">
        <AppLayout>
          <Settings />
        </AppLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="roadintel-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
