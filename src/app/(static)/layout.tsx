import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <Section>
      <Container className="py-10">
        <div className="prose mx-auto max-w-none px-2 md:px-8">{children}</div>
      </Container>
    </Section>
  );
}
