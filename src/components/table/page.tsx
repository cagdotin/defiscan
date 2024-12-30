"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import { protocols } from "#site/content";
import { useEffect, useState } from "react";
import { defiLlama } from "@/services/defillama";
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

  console.log("data:: ", data);

  const grouped_sample =
    data?.reduce((acc, curr) => {
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

  const sample = Object.values(grouped_sample).map((project) => {
    const { children, ...rest } = project;

    if (children.length === 1) {
      return {
        ...rest,
        ...children[0],
      };
    }

    return project;
  });

  return <DataTable columns={columns} data={sample || []} />;
}
