import React from "react";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import Container from "../ui/Container";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Academic Programs", path: "/academics" },
  { name: "Gallery", path: "/gallery" },
  { name: "Notice & Events", path: "/updates" },
  { name: "Contact", path: "/contact" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <GraduationCap size={28} />
              </div>

              <div>
                <h2 className="font-heading text-2xl font-bold">
                  Global School
                </h2>
                <p className="text-sm text-primary-foreground/70">
                  Learn • Grow • Achieve
                </p>
              </div>
            </Link>

            <p className="mt-6 leading-7 text-primary-foreground/80">
              Global School is committed to providing quality education,
              innovation, and holistic development while preparing students for
              a successful future.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Quick Links</h3>

            <ul className="mt-6 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 transition-colors duration-300 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Academic Programs</h3>

            <ul className="mt-6 space-y-3 text-primary-foreground/80">
              <li>Pre-Primary</li>
              <li>Primary</li>
              <li>Secondary</li>
              <li>Higher Secondary</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Contact Us</h3>

            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 shrink-0" size={20} />
                <p className="text-primary-foreground/80">
                  Global School
                  <br />
                  Saljhora, Kajalgaon, Chirang, Assam.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={20} />
                <a
                  href="tel:++918812018503"
                  className="text-primary-foreground/80 hover:text-white"
                >
                 +91 8812018503 <br /> +91 8472043949.
                </a>
              </div>
              

              <div className="flex items-center gap-3">
                <Mail size={20} />
                <a
                  href="mailto:info@globalschool.com"
                  className="text-primary-foreground/80 hover:text-white"
                >
                  info@globalschool.com
                </a>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 transition-all duration-300 hover:bg-white hover:text-primary"
            >
              <ArrowUp size={18} />
              Back to Top
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center md:flex-row">
          <p className="text-sm text-primary-foreground/70">
            © 2026 Global School. All Rights Reserved.
          </p>

          <p className="text-sm text-primary-foreground/70">
            Designed & Developed by{" "}
            <span className="font-semibold text-white">
              KT Assam            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;