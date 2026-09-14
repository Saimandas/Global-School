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
    { name: "Chairman", path: "/principal" },
    { name: "Gallery", path: "/gallery" },
    { name: "Teachers", path: "/teachers" },
    { name: "Announcements", path: "/announcements" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-green-200 bg-green-600 text-white backdrop-blur-lg">
      {/* =========================
          MAIN NAVBAR
      ========================== */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-3">
        {/* =========================
            LOGO
        ========================== */}
        <div className="flex items-center gap-3 sm:gap-4">
          <NavLink to="/" className="select-none">
            <img
              height="75"
              width="75"
              src={img}
              alt="The Global School"
              className="h-14 w-14 object-contain sm:h-[75px] sm:w-[75px]"
            />
          </NavLink>

          <h1 className=" text-2xl font-bold text-yellow-300 sm:block sm:text-3xl">
            The Global School
          </h1>
        </div>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `font-medium transition-colors ${
                  isActive
                    ? "text-yellow-300"
                    : "text-white hover:text-yellow-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* =========================
            RIGHT SIDE
        ========================== */}
        <div className="flex items-center gap-3">
          {/* Apply Now - Desktop */}
          {/*
          <NavLink
            to="/admission"
            className="hidden lg:block"
          >
            <Button>
              Apply Now
            </Button>
          </NavLink>
          */}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/40 bg-white/10 text-white transition hover:bg-white/20 lg:hidden"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* =========================
          MOBILE MENU / DRAWER
      ========================== */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-[100dvh] w-[85%] max-w-sm flex-col bg-white text-green-900 shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* =========================
            MOBILE MENU HEADER
        ========================== */}
        <div className="flex items-center border border-black justify-between border-b border-green-100 bg-white px-5 py-5">
          <div className="flex items-center gap-3">
            {/* Mobile Logo */}
            <img
              src={img}
              alt="The The Global School"
              className="h-12 w-12 object-contain"
            />

            <div>
              <h2 className="text-xl font-bold leading-tight">
                <span className="text-green-800">The Global</span>{" "}
                <span className="text-yellow-500">School</span>
              </h2>

              <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-gray-500">
                Learn • Grow • Lead
              </p>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-green-800 transition hover:bg-green-100"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* =========================
            MOBILE NAVIGATION
        ========================== */}
        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto bg-white p-5">
          {navLinks.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-800 text-white shadow-sm"
                    : "bg-white text-green-900 hover:bg-green-50 hover:text-green-800"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* =========================
              APPLY NOW - MOBILE
          ========================== */}
          {/*
          <NavLink
            to="/admission"
            onClick={() => setIsOpen(false)}
            className="mt-auto pt-4"
          >
            <Button className="w-full">
              Apply Now
            </Button>
          </NavLink>
          */}
        </nav>
      </aside>
    </header>
  );
};

export default Navbar;