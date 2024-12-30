"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { Project } from "@/lib/types";
import { mergeDefiLlamaWithMd } from "../pie-charts/piechart";

export const getData = async (): Promise<Project[]> => {
  // fetch
  const merged = await mergeDefiLlamaWithMd();

  return merged;
};

export default function Table() {
  const [data, setData] = useState<Project[] | undefined>(undefined);

  const fetchData = async () => {
    const data = await getData();
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const grouped =
    data?.reduce((acc: Record<string, any>, curr) => {
      let protocol = acc[curr.protocol] || {
        protocol: curr.protocol,
        logo: curr.logo,
        type: curr.type,
        tvl: 0,
        stage: curr.stage,
        chain: [],
        children: [],
      };

      const children = [...protocol.children, curr];
      protocol.tvl += curr.tvl;
      protocol.chain = [...protocol.chain, curr.chain];

      // if the stages of all children doesn't match.
      // make it -1 to indicate variable stage.
      if (protocol.stage !== curr.stage) {
        protocol.stage = "V";
      }

      protocol = {
        ...protocol,
        children,
      };

      return {
        ...acc,
        [curr.protocol]: protocol,
      };
    }, {}) || {};

  const projects = Object.values(grouped).map((project: any) => {
    const { children, ...rest } = project as {
      children: any[];
      [key: string]: any;
    };

    if (children.length === 1) {
      return {
        ...rest,
        ...children[0],
      };
    }

    return project;
  });

  return <DataTable columns={columns} data={projects} />;
}
