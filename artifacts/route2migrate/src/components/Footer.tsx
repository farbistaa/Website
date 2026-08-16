import { Link } from "wouter";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import logoPath from "@assets/R2M Logo.png";
import caelBadge from "@assets/CAEL_Network_Badge_-_Silver_1782555104773.png";
import celpipBadge from "@assets/CELPIP_Network_Badge_-_Silver_1782555114632.png";

const scrollTop = () => window.scrollTo({ top: 0, left: 0, behavior: "instant" });

const services = [
  "Express Entry",
  "Provincial Nominee Program",
   "Business Immigration",
  "Study Permits",
  "Work Permits",
  "Family Sponsorship",
  "Visitor & Super Visas",
  "UK Visit Visa",
  "USA Visit Visa",
  "USA Student Visa",
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
  { label: "Book Consultation", href: "https://riffathmohaimen.setmore.com/", external: true },
];

export function Footer() {
  return (
    <footer className="bg-[#08080f] text-white relative overflow-hidden" aria-label="Site footer">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          <div className="lg:col-span-1">
            {/* Forced to stay in a single horizontal line using flex-nowrap and shrink-0 */}
            <div className="flex items-center justify-start gap-3 mb-5">
              <Link href="/" onClick={scrollTop} aria-label="Route 2 Migrate Home" className="shrink-0">
                <img src={logoPath} alt="Route 2 Migrate" className="h-16 sm:h-20 w-auto cursor-pointer" />
              </Link>
              {/* CELPIP & CAEL Silver Badges */}
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <img src={celpipBadge} alt="CELPIP Network Silver Member" className="h-12 sm:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  <span className="text-[9px] sm:text-[10px] text-white/30 text-center font-medium uppercase tracking-wider">CELPIP Silver</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <img src={caelBadge} alt="CAEL Network Silver Member" className="h-12 sm:h-16 w-auto opacity-80 hover:opacity-100 transition-opacity" />
                  <span className="text-[9px] sm:text-[10px] text-white/30 text-center font-medium uppercase tracking-wider">CAEL Silver</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-white/50 leading-relaxed mb-6">
              RMohaimen Immigration Services (Route 2 Migrate) is a licensed Canadian immigration consultancy firm led by RCIC Riffat H. Mohaimen.
            </p>

            <div className="flex items-center gap-2 mb-6">
              {[
                { label: "Facebook", icon: FaFacebook, href: "https://www.facebook.com/RMigrate.ca" },
                { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/route2migrate" },
                { label: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/route2migrateca" },
                { label: "YouTube", icon: FaYoutube, href: "https://www.youtube.com/@route2migrate" },
              ].map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/6 border border-white/8 hover:bg-primary hover:border-primary flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6 text-white/50">Quick Links</h4>
            <ul className="space-y-3" role="list">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-primary text-sm transition-colors duration-200 flex items-center gap-1.5 group"
                      aria-label={link.label}
                    >
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} onClick={scrollTop}>
                      <span className="text-white/50 hover:text-primary text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1.5 group">
                        <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        {link.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6 text-white/50">Our Services</h4>
            <ul className="space-y-3" role="list">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/services" onClick={scrollTop}>
                    <span className="text-white/50 hover:text-primary text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1.5 group">
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6 text-white/50">Contact Us</h4>
            <ul className="space-y-5">
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-white/35 uppercase tracking-wider mb-1 font-medium">Canada</div>
                    <span className="text-white/55 text-sm leading-relaxed">123 Parkway Forest Dr, Apt./Suite/Unit #805, North York, ON M2J 0G1, Canada</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="text-xs text-white/35 uppercase tracking-wider mb-1 font-medium">Bangladesh</div>
                    <span className="text-white/55 text-sm leading-relaxed">93 Shah Makhdum Avenue, Flat A2, Sector 12, Uttara, Dhaka 1230</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <a href="tel:+14373328242" className="text-white/55 hover:text-primary text-sm transition-colors block">+1 (437) 332-8242 (CA)</a>
                    <a href="tel:+8801896060701" className="text-white/55 hover:text-primary text-sm transition-colors block">+880 1896 060701 (BD)</a>
                    <a href="tel:+8801896060702" className="text-white/55 hover:text-primary text-sm transition-colors block">+880 1896 060702 (BD)</a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <a href="mailto:contact@rmigrate.ca" className="text-white/55 hover:text-primary text-sm transition-colors">contact@rmigrate.ca</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <p className="text-white/25 text-xs">
                &copy; {new Date().getFullYear()} All rights reserved RMohaimen Immigration Services (Route 2 Migrate).
              </p>
              {/* Hidden intellectual property text - matching exact footer background color */}
              <a 
                href="https://www.facebook.com/farbistaa/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block text-xs text-[#08080f] selection:text-white"
                aria-label="This website is an intellectual Property of Foyaj Ahmmad Farabi"
              >
                This website is an intellectual Property of Foyaj Ahmmad Farabi
              </a>
            </div>
            <p className="text-white/20 text-xs text-center lg:text-right max-w-md">
              Immigration consulting services regulated by the College of Immigration and Citizenship Consultants (CICC).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}