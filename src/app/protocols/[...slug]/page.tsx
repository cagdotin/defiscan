"use client";

import { Metadata } from "next";
import { protocols as allProtocols } from "#site/content";
import "@/styles/mdx.css";
import { Mdx } from "@/components/mdx-component";
import {
  ChevronDown,
  ChevronLeft,
  ExternalLink,
  Globe,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { BigPizzaRosette } from "@/components/rosette/big-rosette";
import { getRiskDescriptions } from "@/components/rosette/data-converter/data-converter";
import { TooltipProvider } from "@/components/rosette/tooltip/tooltip";
import { cn } from "@/lib/utils";
import { Stage } from "@/lib/types";
import { InfoBadge } from "@/components/ui/info-badge";
import { Container } from "@/components/container";
import { Section } from "@/components/section";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

interface ProtocolPageItemProps {
  params: {
    slug: string[];
  };
}

async function getProtocolFromParams(slug: string[]) {
  const slugString = slug.join("/");

  const protocol = allProtocols.find(
    (protocol) => protocol.slugAsParams === slugString
  );

  return { ...protocol };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string[] };
// }): Promise<Metadata> {
//   const protocol = await getProtocolFromParams(params.slug);

//   if (!protocol) {
//     return {
//       title: "Protocol not found",
//       description: "Protocol details could not be found.",
//     };
//   }

//   return {
//     title: protocol.protocol,
//     description: "DeFi Scan decentralization report for " + protocol.protocol,
//     authors: {
//       name: protocol.author!.join(", "),
//     },
//   };
// }

const ProtocolLinks = ({ protocol }: { protocol: any }) => {
  return (
    <div className="h-16 flex items-center border-b overflow-scroll">
      <Button variant="ghost" asChild className="h-full border-r">
        <a target="_blank" rel="noopener noreferrer" href={protocol.website}>
          <Globe className="w-4 h-4 mr-2" />
          Website
          <ExternalLink className="w-3 h-3 ml-2" />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-full border-r">
            <Waypoints className="w-4 h-4 mr-2" /> Socials
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={protocol.x}
              className="flex items-center "
            >
              <FaXTwitter className="w-4 h-4 mr-2" /> @
              {protocol.x?.replace("https://x.com/", "")}
              <ExternalLink className="w-3 h-3 ml-4" />
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-full border-r">
            <FaGithub className="w-4 h-4 mr-2" /> Github
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {protocol.github!.map((slug: string, index: number) => (
            <DropdownMenuItem key={index}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`
                          ${slug}`}
                className="w-full flex justify-between items-center"
              >
                {slug}
                <ExternalLink className="w-3 h-3 ml-4" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-full border-r">
            DefiLlama
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {protocol.defillama_slug!.map((slug: string, index: number) => (
            // TODO: create a proper defillama link
            <DropdownMenuItem key={index}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`
                        ${slug}`}
                className="flex items-center justify-between w-full"
              >
                {slug}
                <ExternalLink className="w-3 h-3 ml-4" />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-full border-r">
            {protocol.chain}
            <ChevronDown className="w-3 h-3 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>{protocol.chain}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ReviewTimeline = ({ protocol }: { protocol: any }) => {
  return (
    <div className="mt-auto py-8 px-4">
      <ul className="font-mono text-sm list-disc list-inside pb-4">
        <li>
          This review has been submitted by {protocol.author!.join(", ")} on{" "}
          {protocol.submission_date!.split("T")[0]}.
        </li>
        <li>
          It was reviewed and published by the DeFi Collective team on{" "}
          {protocol.publish_date!.split("T")[0]}.
        </li>
        <li>
          The {protocol.protocol} team has{" "}
          {protocol.acknowledge_date!.split("T")[0] === "1970-01-01"
            ? "NOT acknowledged the review"
            : "acknowledged the review on " +
              protocol.acknowledge_date!.split("T")[0]}
          .
        </li>
        <li>
          {protocol.update_date!.split("T")[0] === "1970-01-01"
            ? "The review has not been updated since the initial submission"
            : "The last update to the review was made on " +
              protocol.update_date!.split("T")[0]}
          .
        </li>
      </ul>
      <p className="text-sm">
        This content is provided "as is" and "as available". Read more in our
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"../../terms"}
          className="text-blue-500 hover:underline"
        >
          {" "}
          Terms
        </a>
        .
      </p>
    </div>
  );
};

interface TOCItem {
  url: string;
  title: string;
  items: TOCItem[];
}

const TableOfContents = ({ protocol }: { protocol: any }) => {
  const renderItem = (item: TOCItem) => {
    if (item.items.length === 0) {
      return (
        <li className="pt-1">
          <a href={item.url}>{item.title}</a>
        </li>
      );
    }
    return (
      <li className="pt-1">
        <a href={item.url}>{item.title}</a>
        <ul className="pl-4 py-1">{item.items.map(renderItem)}</ul>
      </li>
    );
  };

  return <ul className="font-normal">{protocol!.toc.map(renderItem)}</ul>;
};

export default async function ProtocolPageItem({
  params,
}: ProtocolPageItemProps) {
  const protocol = await getProtocolFromParams(params.slug);

  if (!protocol) {
    return <div>Protocol not found</div>; // Handle not found case
  }

  return (
    <article className="w-full flex flex-col">
      <Section>
        <Container className="flex flex-col-reverse lg:flex-row p-0">
          <div className="grow border-r">
            <div className="flex flex-row gap-4 items-center border-b pl-4">
              <div className="w-10 h-10 aspect-square border "></div>
              <h1 className="text-xl sm:text-4xl shrink-0">
                {protocol.protocol}
              </h1>
              <TooltipProvider>
                <InfoBadge
                  stage={protocol.stage! as Stage}
                  className={cn(
                    "text-white py-1 rounded text-lg h-20 sm:h-32 rounded-none ml-auto sm:aspect-square flex justify-center",
                    protocol.stage! === "R" && "bg-gray-500",
                    `${
                      protocol.stage! === "R"
                        ? "bg-gray-500"
                        : protocol.stage! === 0
                          ? "bg-red-500"
                          : protocol.stage! === 1
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    } `
                  )}
                >
                  {protocol.stage! === "R"
                    ? "Review"
                    : "Stage " + protocol.stage!}
                </InfoBadge>
              </TooltipProvider>
            </div>
            <ProtocolLinks protocol={protocol} />
            <ReviewTimeline protocol={protocol} />
          </div>
          <div className="border-b lg:border-none px-8 flex items-center justify-center">
            <TooltipProvider>
              <BigPizzaRosette values={getRiskDescriptions(protocol.risks!)} />
            </TooltipProvider>
          </div>
        </Container>
      </Section>
      <Section>
        <Container className="flex flex-row">
          <div className="hidden lg:block w-80 shrink-0 inline px-4 border-r">
            <div className="sticky top-0 pt-8 text-sm">
              <TableOfContents protocol={protocol} />
            </div>
          </div>
          <div className="pt-4 px-8 grow w-1/2">
            <div className="prose max-w-none">
              <Mdx code={protocol.body!} />
            </div>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <div className="flex px-4 py-6 lg:py-10">
            <Link href="/" className={cn(buttonVariants({ variant: "ghost" }))}>
              <ChevronLeft className="mr-2 size-4" />
              See all Protocols
            </Link>
          </div>
        </Container>
      </Section>
    </article>
  );
}
