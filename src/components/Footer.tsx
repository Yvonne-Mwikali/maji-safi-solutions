import { Link } from "wouter";
import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { SOCIAL_LINKS } from "@/constants/links";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              data-testid="link-footer-logo"
            >
              <div className="bg-white text-primary p-2 rounded-md">
                <img
                  src="/logo.png"
                  alt="Maji Safi logo"
                  className="h-7 w-7 object-contain"
                />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                Maji<span className="text-secondary">Safi</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Bridging the gap between water scarcity and sustainable
              infrastructure in rural Africa. Not just a charity, but a
              solutions provider.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white/70 hover:text-secondary transition-colors"
                  data-testid="link-footer-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-white/70 hover:text-secondary transition-colors"
                  data-testid="link-footer-projects"
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="text-white/70 hover:text-secondary transition-colors"
                  data-testid="link-footer-team"
                >
                  Meet the Team
                </Link>
              </li>
              <li>
                <Link
                  href="/get-involved"
                  className="text-white/70 hover:text-secondary transition-colors"
                  data-testid="link-footer-volunteer"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-white/70 hover:text-secondary transition-colors"
                  data-testid="link-footer-donate"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-secondary">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <span>Hamilton, New York</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href="tel:+13158640795"
                  className="hover:text-secondary transition-colors"
                >
                  +1 (315) 864-0795
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <a
                  href="mailto:akaumbulu@colgate.edu"
                  className="hover:text-secondary transition-colors"
                >
                  hello@majisafisolutions.org
                </a>
              </li>
            </ul>
          </div>

          {/* Social / Newsletter */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-6 text-secondary">
              Stay Connected
            </h3>
            <div className="flex gap-4 mb-6">
              <a
                href={SOCIAL_LINKS.facebook}
                className="bg-white/10 text-white p-2.5 rounded-md hover:bg-secondary hover:text-primary transition-colors"
                data-testid="link-social-facebook"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                className="bg-white/10 text-white p-2.5 rounded-md hover:bg-secondary hover:text-primary transition-colors"
                data-testid="link-social-twitter"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                className="bg-white/10 text-white p-2.5 rounded-md hover:bg-secondary hover:text-primary transition-colors"
                data-testid="link-social-instagram"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="text-xs text-white/50">
              Follow us for updates on our projects and impact stories.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Maji Safi Solutions. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
