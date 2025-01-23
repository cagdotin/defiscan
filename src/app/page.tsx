import React from "react";
import Chart from "@/components/chart";
import Table from "@/components/table/page";
import { PieChartComponent } from "@/components/pie-charts/piechart";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";

const DefiStats = () => {
  return (
    <div className="grid grid-flow-row gap-2 p-4 ">
      <div className="shrink-0 w-full grid grid-flow-row md:grid-cols-2 gap-2">
        <div className="flex p-4 border rounded-md flex-row justify-between items-center">
          <h1 className="text-primary font-bold text-xl lg:text-2xl px-2 ">
            Verifiable insights
            <br />
            into the maturity and risks of DeFi
          </h1>
        </div>

        <Chart className="shadow-none" />
        {/* <Chart className="shadow-none" /> */}
      </div>
      <div className="grid grid-cols-2  md:grid-cols-4 w-full gap-2">
        <PieChartComponent
          groupByKey="stage"
          operation="count"
          baseColor="#ae7ef4"
          chartTitle="#Projects by Stage"
          labelValueDescription="Stage-2"
          className=""
        />
        <PieChartComponent
          groupByKey="stage"
          operation="sum"
          baseColor="#ae7ef4"
          chartTitle="TVL by Stage"
          labelValueDescription="Total TVL"
          className=""
        />

        <PieChartComponent
          groupByKey="chain"
          operation="count"
          baseColor="#ae7ef4"
          chartTitle="Projects by Chain"
          labelValueDescription="Top Source"
          className=""
        />
        <PieChartComponent
          groupByKey="chain"
          operation="sum"
          baseColor="#ae7ef4"
          chartTitle="TVL by Chain"
          labelValueDescription="Most TVL"
          className=""
        />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Section>
        <Container className="px-0 md:px-0">
          <DefiStats />
        </Container>
      </Section>
      <Section className="border-0">
        <Container className="px-0 md:px-0 pb-4">
          <Table />
        </Container>
      </Section>
    </>
  );
}
