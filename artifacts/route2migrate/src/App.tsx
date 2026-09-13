import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ScrollToTop } from "@/components/ScrollToTop";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/Home";
import ServicesPage from "@/pages/Services";
import AboutPage from "@/pages/About";
import ContactPage from "@/pages/Contact";
import BlogPage from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      
      {/* This handles all standard blog URLs like /blog/sowp */}
      <Route path="/blog/:slug" component={BlogPostPage} />
      
      {/* 
        This catch-all route sends all your service URLs (like /sowp, /study-permits) 
        to the BlogPostPage. BlogPostPage reads the URL and finds the matching slug.
      */}
      <Route path="/:slug" component={BlogPostPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <ScrollToTop /> 
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;