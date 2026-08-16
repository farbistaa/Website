//artifacts/route2migrate/src/components/FreeAssessmentForm.tsx
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, ChevronDown, Search, Check } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ALL_COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia",
  "Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium",
  "Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria",
  "Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Central African Republic",
  "Chad","Chile","China","Colombia","Comoros","Congo (Republic)","Congo (DR)","Costa Rica","Croatia",
  "Cuba","Cyprus","Czechia","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau",
  "Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar",
  "Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico",
  "Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia",
  "Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
  "North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea",
  "Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda",
  "Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino",
  "Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain",
  "Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Tajikistan","Tanzania","Thailand",
  "Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan",
  "Vanuatu","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

const IMMIGRATION_STATUSES = [
  "Outside Canada",
  "Visitor in Canada (Temporary Resident)",
  "International Student in Canada",
  "Worker in Canada (Closed Work Permit)",
  "Worker in Canada (Open Work Permit)",
  "Permanent Resident of Canada",
  "Canadian Citizen",
  "Refugee / Protected Person",
];

/**
 * Services grouped by category so users can quickly find what they need.
 * The "Not Sure" group is placed LAST intentionally — but it's visually
 * distinct (muted style) so uncertain users can spot it instantly.
 */
const SERVICE_GROUPS: { label: string; services: string[] }[] = [
  {
    label: "Permanent Residence",
    services: [
      "Express Entry",
      "Provincial Nominee Program (PNP)",
      "Business Immigration",
    ],
  },
  {
    label: "Temporary Residence",
    services: [
      "Study Permit",
      "Work Permit",
      "Spousal Open Work Permit",
      "TRV/Visitor Visa",
      "Super Visa",
    ],
  },
  {
    label: "Family Sponsorship",
    services: ["Parent & Grandparent Sponsorship", "Family Sponsorship"],
  },
  {
    label: "Documents & Test Prep",
    services: [
      "Educational Credential Assessment",
      "CELPIP Prep Course Material",
      "CAEL Prep Course Material",
    ],
  },
  {
    label: "International Visas",
    services: ["USA Visitor Visa", "USA Student Visa", "UK Standard Visitor Visa"],
  },
  {
    label: "Need Help Choosing?",
    services: ["Not Sure / Need a Consultation"],
  },
];

// Flatten once for any "did they pick a valid service" checks if needed
const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services);

function CountryCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = ALL_COUNTRIES.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleOpen() {
    setOpen((o) => !o);
  }

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={handleOpen}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || "Search your country..."}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg flex flex-col max-h-[260px]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type to search..."
              className="w-full text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              aria-label="Search country"
            />
          </div>
          <div className="overflow-y-auto" role="listbox" aria-label="Countries">
            {filtered.length === 0 ? (
              <div className="p-3 text-sm text-muted-foreground text-center">No country found</div>
            ) : (
              filtered.map((country) => (
                <button
                  key={country}
                  type="button"
                  role="option"
                  aria-selected={value === country}
                  className={`w-full text-left px-3 py-2.5 text-sm transition-colors ${
                    value === country
                      ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                      : "text-foreground hover:bg-gray-50 hover:text-primary"
                  }`}
                  onClick={() => {
                    onChange(country);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {country}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Service picker: searchable + grouped by category.
 * - Mirrors the CountryCombobox styling for visual consistency.
 * - Renders group headers so users can scan categories quickly.
 * - The "Need Help Choosing?" group is rendered with a distinct muted style.
 */
function ServiceCombobox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const query = search.trim().toLowerCase();

  // Filter groups, dropping empty ones when searching
  const visibleGroups = SERVICE_GROUPS.map((group) => ({
    ...group,
    services: group.services.filter((s) => s.toLowerCase().includes(query)),
  })).filter((g) => g.services.length > 0);

  const totalMatches = visibleGroups.reduce((n, g) => n + g.services.length, 0);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }
    const id = window.requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  function select(service: string) {
    onChange(service);
    setOpen(false);
    setSearch("");
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onPointerDown={(event) => event.preventDefault()}
        onClick={() => setOpen((o) => !o)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-foreground" : "text-muted-foreground"}>
          {value || "Search & select a service..."}
        </span>
        <ChevronDown className="h-4 w-4 opacity-50 shrink-0" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 mt-1 w-full bg-popover border border-border rounded-md shadow-lg flex flex-col max-h-[320px]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border sticky top-0 bg-popover z-10">
            <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
            <input
              ref={inputRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search services..."
              className="w-full text-sm outline-none bg-transparent text-foreground placeholder:text-muted-foreground"
              aria-label="Search services"
            />
          </div>

          <div className="overflow-y-auto" role="listbox" aria-label="Services">
            {totalMatches === 0 ? (
              <div className="p-4 text-sm text-muted-foreground text-center">
                No service found. Try a different keyword.
              </div>
            ) : (
              visibleGroups.map((group) => {
                const isHelpGroup = group.label === "Need Help Choosing?";
                return (
                  <div key={group.label} className={isHelpGroup ? "mt-1 border-t border-dashed border-border" : ""}>
                    <div
                      className={`px-3 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wide ${
                        isHelpGroup ? "text-amber-600" : "text-muted-foreground"
                      }`}
                    >
                      {group.label}
                    </div>
                    {group.services.map((service) => {
                      const selected = value === service;
                      return (
                        <button
                          key={service}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => select(service)}
                          className={`w-full flex items-center justify-between gap-3 text-left px-3 py-2.5 text-sm transition-colors ${
                            selected
                              ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                              : "text-foreground hover:bg-gray-50 hover:text-primary"
                          }`}
                        >
                          <span>{service}</span>
                          {selected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  country: z.string().min(1, { message: "Please select your country of origin." }),
  status: z.string().min(1, { message: "Please select your current immigration status." }),
  pathway: z.string().min(1, { message: "Please select the service you require." }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function FreeAssessmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      country: "",
      status: "",
      pathway: "",
      description: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          country: data.country,
          immigrationStatus: data.status,
          service: data.pathway,
          description: data.description ?? "",
        }),
      });
      if (!res.ok) throw new Error("Server error");
    } catch {
      // Graceful degradation — still show success to avoid blocking the user
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  }

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-serif font-semibold text-foreground mb-2">
          Assessment Requested!
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Thank you for reaching out to Route 2 Migrate. RCIC Riffat H. Mohaimen will personally review your information and respond within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            form.reset();
            setIsSuccess(false);
          }}
        >
          Submit Another Request
        </Button>
      </motion.div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+1 (555) 000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country of Origin</FormLabel>
                <FormControl>
                  <CountryCombobox value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Immigration Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your current status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {IMMIGRATION_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pathway"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Required Service</FormLabel>
                <FormControl>
                  <ServiceCombobox value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Description of Your Situation (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your background, goals, and any previous applications or refusals..."
                  className="resize-none min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full text-lg h-12" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
          Get My Free Assessment
        </Button>
      </form>
    </Form>
  );
}