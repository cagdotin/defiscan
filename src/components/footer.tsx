import React from "react";
import { FaLinkedinIn, FaDiscord, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Section } from "./section";
import { Container } from "./container";
import { Button } from "./ui/button";

export const Footer = () => {
  return (
    <footer>
      <Section>
        <Container className="flex flex-col sm:flex-row justify-between items-center px-0 gap-4 md:px-0">
          <div className="text-gray-500 text-xs font-mono mt-4 sm:mt-0 px-4">
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://deficollective.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              DeFi Collective
            </a>
          </div>
          <div className="uppercase text-xs font-mono">
            <a
              href="/terms"
              className="text-gray-500 hover:text-gray-700 mr-4 transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-gray-500 hover:text-gray-700 ml-4 transition-colors duration-200"
            >
              Privacy
            </a>
          </div>
          <div className="flex">
            <Button variant="ghost" className="sm:border-x h-12 w-12" asChild>
              <a
                href="https://x.com/defiscan_info"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter />
              </a>
            </Button>
            <Button variant="ghost" className="sm:border-r h-12 w-12" asChild>
              <a
                href="https://www.linkedin.com/company/defi-collective"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </Button>
            <Button variant="ghost" className="sm:border-r h-12 w-12" asChild>
              <a
                href="https://discord.gg/Z467Ehv6VU"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord />
              </a>
            </Button>
            <Button variant="ghost" className="h-12 w-12" asChild>
              <a
                href="https://github.com/deficollective/defiscan"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub />
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </footer>
  );
};
