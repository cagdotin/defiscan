"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Section } from "./section";
import { Container } from "./container";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { FaX, FaXTwitter } from "react-icons/fa6";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/learn-more", label: "Learn more" },
    { href: "/submit-review", label: "Submit review" },
  ];

  return (
    <header className="">
      <Section className="border-none">
        <Container className="h-8 border-dashed"></Container>
      </Section>
      <Section className="border-t">
        <Container className="px-0 md:px-0">
          <div className="flex h-12 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-primary">
                <img
                  src="/images/defiscan_by_dc_color_for_light_background.svg"
                  alt="Logo"
                  className="w-40 md:w-48"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center ml-auto h-full">
              <Button asChild variant="ghost">
                <Link
                  href="/learn-more"
                  className="w-28 text-muted-foreground hover:text-primary text-xs transition-colors px-4 h-full flex items-center border-r"
                >
                  Learn more
                </Link>
              </Button>
              {/* <div>
                <Button variant="ghost" className="border-r h-16 w-16">
                  <FaGithub />
                </Button>
                <Button variant="ghost" className="h-16 w-16">
                  <FaXTwitter />
                </Button>
              </div> */}

              <div className="h-full">
                <Button
                  asChild
                  className="h-full w-32 hover:rounded-none transition text-xs  ease-in-out duration-600"
                >
                  <Link
                    href="/submit-review"
                    className="text-muted-foreground transition-colors"
                  >
                    Submit Review
                  </Link>
                </Button>
              </div>

              {/* <Button
                asChild
                className="h-16 rounded-3xl hover:rounded-none transition-all"
              >
                <Link
                  href="/submit-review"
                  className="text-sm font-medium text-muted-foreground transition-colors"
                >
                  Submit Review
                </Link>
              </Button> */}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 ml-auto"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-gray-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </Container>
      </Section>
    </header>
  );
}
