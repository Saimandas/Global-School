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
import Container from "../UI/Container";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Gallery", path: "/gallery" },
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

          {/* School Information */}
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
              innovation, and holistic development while preparing students
              for a successful future.
            </p>

            {/* Social Media */}
            <div className="mt-8 flex gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 transition-all duration-300 hover:bg-white hover:text-primary"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold">
              Quick Links
            </h3>

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

          {/* Academic Programs */}
          <div>
            <h3 className="text-xl font-semibold">
              Academic Programs
            </h3>

            <ul className="mt-6 space-y-3 text-primary-foreground/80">
              <li>Pre-Primary</li>
              <li>Primary</li>
            </ul>
          </div>

          {/* School Contact */}
          <div>
            <h3 className="text-xl font-semibold">
              Contact Us
            </h3>

            <div className="mt-6 space-y-5">

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-1 shrink-0"
                  size={20}
                />

                <p className="text-primary-foreground/80">
                  Global School
                  <br />
                  Saljhora, Kajalgaon, Chirang, Assam.
                </p>
              </div>

              {/* School Phone */}
              <div className="flex items-start gap-3">
                <Phone
                  className="mt-1 shrink-0"
                  size={20}
                />

                <div>
                  <p className="text-primary-foreground/80">
                    <a
                      href="tel:+918812018503"
                      className="transition-colors hover:text-white"
                    >
                      +91 8812018503
                    </a>
                    <br />

                    <a
                      href="tel:+918472043949"
                      className="transition-colors hover:text-white"
                    >
                      +91 8472043949
                    </a>
                  </p>
                </div>
              </div>

              {/* School Email */}
              <div className="flex items-start gap-3">
                <Mail
                  className="mt-1 shrink-0"
                  size={20}
                />

                <a
                  href="mailto:info@globalschool.edu.in"
                  className="break-all text-primary-foreground/80 transition-colors hover:text-white"
                >
                  info@globalschool.edu.in
                </a>
              </div>
            </div>

            {/* Back To Top */}
            <button
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 transition-all duration-300 hover:bg-white hover:text-primary"
            >
              <ArrowUp size={18} />
              Back to Top
            </button>
          </div>
        </div>

        {/* ============================= */}
        {/* WEBSITE SUPPORT - KT ASSAM */}
        {/* ============================= */}

        <div className="border-t border-white/10 py-2 rounded-md">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between px-3">

            {/* Support Title */}
            <div className=" font-semibold p-3 bg-black text-white rounded-md ">
              <h1>This site devloped by </h1>
              <h2>Kavyam Technology Assam</h2>
            </div>
            <div className=" bg-[url('/BgLeaf.webp')]">
              <img src="/staff/Aronai.jpg" height={'85px'} width={"155px"}  alt="" />
            </div>

            {/* KT Assam Contact Box */}
            <div className="w-full  p-3 bg-black text-white rounded-md px-6 py-5 md:w-auto md:min-w-[300px]">

              {/* Phone */}
              <a
                href="tel:+916002079492"
                className="flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-yellow-300"
              >
                <Phone
                  size={18}
                  className="shrink-0 text-yellow-300"
                />

                <span>
                  +91 6002079492
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:ktassam13@gmail.com"
                className="mt-3 flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-yellow-300"
              >
                <Mail
                  size={18}
                  className="shrink-0 text-white/70"
                />

                <span className="break-all">
                  ktassam13@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-center md:flex-row">

          <p className="text-sm text-primary-foreground/70">
            © 2026 Global School. All Rights Reserved.
          </p>

          <p className="text-sm text-primary-foreground/70">
            Designed & Developed by{" "}
            <span className="font-semibold text-white">
              KT Assam
            </span>
          </p>

        </div>
      </Container>
    </footer>
  );
};

export default Footer;