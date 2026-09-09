import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import img from "./../../../public/Logo.png";
import Button from "../UI/Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    // { name: "Our Courses", path: "/courses" },
    // { name: "Admission", path: "/admission" },
    { name: "Principal", path: "/principal" },
    { name: "Gallery", path: "/gallery" },
    { name: "Teachers", path: "/teachers" },
    { name: "Announcements", path: "/announcements" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-lg">
      
      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <NavLink to="/" className="select-none">
          <img
            height="75"
            width="75"
            src={img}
            alt="Global School"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition ${
                  isActive
                    ? "text-primary"
                    : "hover:text-primary"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          
          {/* Apply Now - Desktop */}
          {/* <NavLink
            to="/admission"
            className="hidden lg:block"
          >
            <Button>
              Apply Now
            </Button>
          </NavLink> */}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-border hover:bg-muted lg:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-80 flex-col bg-card shadow-2xl transition-transform duration-300 lg:hidden ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between border-b border-border p-6">
          
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-primary">Global</span>{" "}
              <span className="text-accent">School</span>
            </h2>

            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Learn • Grow • Lead
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 hover:bg-muted"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto p-6">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `rounded-xl px-4 py-3 text-lg transition ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Apply Now - Mobile */}
          {/*
          <NavLink
            to="/admission"
            onClick={() => setIsOpen(false)}
            className="mt-auto"
          >
            <Button className="w-full">
              Apply Now
            </Button>
          </NavLink>
          */}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;