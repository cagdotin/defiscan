import React, { PropsWithChildren } from "react";
import Navbar from "@/components/header";
import { Footer } from "@/components/footer";

export default function App({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex flex-col grow">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
