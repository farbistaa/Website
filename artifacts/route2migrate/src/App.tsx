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
import StudyPermit from "@/pages/StudyPermit";
import ExpressEntry from "@/pages/ExpressEntry";
import SchengenVisa from "@/pages/Schengen";
import SOWP from "@/pages/SOWP";
import SuperVisa from "@/pages/SuperVisa";
import VisitorVisa from "@/pages/TRV";
import WorkPermit from "@/pages/WorkPermit";
import Application from "@/pages/Application";
import Consultation from "@/pages/Consultation";
import PNP from "@/pages/PNP";
import LanguageTestPrep from "@/pages/LanguageCourse";
import BusinessMigration from "@/pages/BusinessMigration";


// import ExpressEntry from "@/pages/Article/ExpressEntry";
// import WorkPermit from "@/pages/Article/WorkPermit";
// ... import all other article pages

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/services" component={ServicesPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/study-permits" component={StudyPermit} />
      <Route path="/express-entry" component={ExpressEntry} />
      <Route path="/schengen-visa" component={SchengenVisa} />
      <Route path="/super-visa" component={SuperVisa} />
      <Route path="/sowp" component={SOWP} />
      <Route path="/visitor-visa" component={VisitorVisa} />
      <Route path="/work-permits" component={WorkPermit} />
      <Route path="/application-review" component={Application} />
      <Route path="/immigration-consultation" component={Consultation} />
      <Route path="/pnp" component={PNP} />
      <Route path="/language-course" component={LanguageTestPrep} />
      <Route path="/business-immigration" component={BusinessMigration} />
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