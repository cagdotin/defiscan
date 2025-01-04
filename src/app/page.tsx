import React from "react";
import Chart from "@/components/chart";
import Table from "@/components/table/page";
import { PieChartComponent } from "@/components/pie-charts/piechart";
import { Section } from "@/components/section";
import { Container } from "@/components/container";

const DefiStats = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="shrink-0 border-b md:w-1/2 md:border-b-0 p-4 md:pr-0 grid grid-flow-row grid-rows-min gap-4">
        <Chart className="shadow-none" />
      </div>
      <div className="grid grid-cols-2 md:w-1/2 p-4 gap-2">
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
          <div className="pt-8 md:pt-12 pb-8 px-4 border-b md:border-b-0">
            <h1 className="text-primary font-bold text-2xl lg:text-3xl px-2 ">
              Verifiable insights
              <br />
              into the maturity and risks of DeFi
            </h1>
          </div>
          <DefiStats />
        </Container>
      </Section>
      <Section className="border-0">
        <Container className="px-0 md:px-0">
          <Table />
          <div className="grow" />
        </Container>
      </Section>
    </>
  );
}
