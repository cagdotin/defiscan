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
import { Button } from "@/components/ui/button";
import { BigPizzaRosette } from "@/components/rosette/big-rosette";
import { getRiskDescriptions } from "@/components/rosette/data-converter/data-converter";
import { TooltipProvider } from "@/components/rosette/tooltip/tooltip";
import { Stage } from "@/lib/types";
import { StageBadge } from "@/components/stage";
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
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
    <div className="flex flex-col gap-1">
      <Button variant="outline" size="sm" asChild className="border-border">
        <a target="_blank" rel="noopener noreferrer" href={protocol.website}>
          <Globe className="w-4 h-4 mr-2" />
          Website
          <ExternalLink className="w-3 h-3 ml-auto " />
        </a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="border-border">
            <Waypoints className="w-4 h-4 mr-2" /> Socials
            <ChevronDown className="w-3 h-3 ml-auto " />
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
          <Button variant="outline" size="sm" className="border-border">
            <FaGithub className="w-4 h-4 mr-2" /> Github
            <ChevronDown className="w-3 h-3 ml-auto " />
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
          <Button variant="outline" size="sm" className="border-border">
            DefiLlama
            <ChevronDown className="w-3 h-3 ml-auto " />
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
          <Button variant="outline" size="sm" className="border-border">
            {protocol.chain}
            <ChevronDown className="w-3 h-3 ml-auto " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>{protocol.chain}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ReviewTimeline = ({
  protocol,
  className,
}: {
  protocol: any;
  className: string;
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>Review Timeline</CardHeader>
      <CardContent>
        <div className="flex flex-col justify-end">
          <ul className="font-mono text-xs list-disc list-inside pb-4">
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
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs">
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
      </CardFooter>
    </Card>
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
        <Container className=" py-4">
          <div className="grid gap-2 grid-cols-4 lg:grid-rows-1">
            <div className="flex flex-col col-span-full sm:col-span-2 lg:col-span-1">
              <div className="flex flex-col w-full gap-2">
                <div className="flex items-end gap-4 py-2">
                  <div className="w-10 h-10 aspect-square border "></div>
                  <h1 className="text-xl sm:text-2xl shrink-0">
                    {protocol.protocol}
                  </h1>
                </div>
              </div>
              <div className="mt-auto" />

              <Separator className="w-full mt-2 mb-2" />
              <StageBadge
                stage={protocol.stage! as Stage}
                className="h-8 mb-2"
              />
              <ProtocolLinks protocol={protocol} />
            </div>
            <ReviewTimeline
              className="col-span-full lg:col-span-2"
              protocol={protocol}
            />
            <div className="flex flex-col gap-2 row-start-2 col-span-full sm:col-start-3 sm:row-start-1 sm:col-span-2 lg:col-span-1 lg:col-start-4">
              <Card className="h-full flex items-center justify-center">
                <CardContent className="pb-0 flex justify-center">
                  <TooltipProvider>
                    <BigPizzaRosette
                      values={getRiskDescriptions(protocol.risks!)}
                    />
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="border-b-0">
        <Container className="flex flex-row gap-2">
          <aside className="hidden lg:block w-1/4 shrink-0 border-r py-4">
            <div className="sticky top-24 z-50 flex flex-col gap-2">
              <Card className="border-none shadow-none">
                <CardHeader>Table of Contents</CardHeader>
                <CardContent>
                  <div className="text-sm">
                    <TableOfContents protocol={protocol} />
                    <Separator className="mt-8" />
                  </div>
                </CardContent>
              </Card>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="justify-start"
              >
                <Link href="/">
                  <ChevronLeft className="mr-2 size-4" />
                  See all Protocols
                </Link>
              </Button>
            </div>
          </aside>

          <div className="px-8 py-12">
            <div className="prose dark:prose-invert">
              <Mdx code={protocol.body!} />
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
