/* eslint-disable no-new-func */
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";
import * as runtime from "react/jsx-runtime";
import { AnchorHTMLAttributes } from "react";

import Image from "next/image";
import { ResponsiveTable } from "./responsive-table";

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

type ComponentsProps = HTMLAttributes<HTMLElement>;

const components = {
  h1: ({ className, ...props }: ComponentsProps) => (
    <h1 className={cn("text-2xl md:text-4xl", className)} {...props} />
  ),
  h2: ({ className, ...props }: ComponentsProps) => (
    <h2 className={cn("text-lg md:text-2xl", className)} {...props} />
  ),
  h3: ({ className, ...props }: ComponentsProps) => (
    <h3 className={cn("text-base md:text-xl", className)} {...props} />
  ),
  a: ({ className, href = "", ...props }: AnchorProps) => {
    const isInternal = href.startsWith("#") || href.startsWith("/");

    return (
      <a
        className={className}
        href={href}
        {...(!isInternal
          ? {
              target: "_blank",
              rel: "noopener noreferrer",
            }
          : {})}
        {...props}
      />
    );
  },
  p: ({ className, ...props }: ComponentsProps) => (
    <p
      className={cn("break-words text-sm md:text-normal", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentsProps) => (
    <ul className={className} {...props} />
  ),
  ol: ({ className, ...props }: ComponentsProps) => (
    <ol className={className} {...props} />
  ),
  li: ({ className, ...props }: ComponentsProps) => (
    <li className={className} {...props} />
  ),
  blockquote: ({ className, ...props }: ComponentsProps) => (
    <blockquote className={className} {...props} />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} alt={alt} {...props} />
  ),
  hr: ({ ...props }) => <hr {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <ResponsiveTable className={className}>{props.children}</ResponsiveTable>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={className} {...props} />
  ),

  th: ({ className, style, ...props }: ComponentsProps) => (
    <th className={className} {...props} />
  ),

  td: ({ className, style, ...props }: ComponentsProps) => (
    <td className={className} {...props} />
  ),
  pre: ({ className, ...props }: ComponentsProps) => (
    <pre className={className} {...props} />
  ),
  code: ({ className, ...props }: ComponentsProps) => (
    <code className={className} {...props} />
  ),
  Image,
};

interface MdxProps {
  code: string;
  components?: Record<string, React.ComponentType>;
}

export function MDXContent({ code, components }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={{ Image, ...components }} />;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="">
      <Component components={components} />
    </div>
  );
}
