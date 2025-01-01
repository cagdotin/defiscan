import React from "react";
import Chart from "@/components/chart";
import Table from "@/components/table/page";
import { PieChartComponent } from "@/components/pie-charts/piechart";
import { Section } from "@/components/section";
import { Container } from "@/components/container";

const Header = () => {
  return (
    <div className="md:border-r-0 md:w-2/2  border-t md:border-t-0 border-b">
      <h1 className="my-auto text-primary font-bold text-3xl md:text-5xl lg:text-5xl px-8 py-12">
        Verifiable insights
        <br />
        <span>into the maturity and risks of</span>
        <br /> DeFi
      </h1>
    </div>
  );
};

const DefiStats = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="pb-2 shrink-0 border-b md:w-1/2 md:border-r md:border-b-0">
        <Chart className="w-full border-none shadow-none" />
      </div>
      <div className="flex flex-wrap md:w-1/2">
        <PieChartComponent
          groupByKey="stage"
          operation="count"
          baseColor="#ae7ef4"
          chartTitle="#Projects by Stage"
          labelValueDescription="Stage-2"
          className="w-1/2  border-r border-b"
        />
        <PieChartComponent
          groupByKey="stage"
          operation="sum"
          baseColor="#ae7ef4"
          chartTitle="TVL by Stage"
          labelValueDescription="Total TVL"
          className="w-1/2  border-b"
        />

        <PieChartComponent
          groupByKey="chain"
          operation="count"
          baseColor="#ae7ef4"
          chartTitle="Projects by Chain"
          labelValueDescription="Top Source"
          className="w-1/2  border-r"
        />
        <PieChartComponent
          groupByKey="chain"
          operation="sum"
          baseColor="#ae7ef4"
          chartTitle="TVL by Chain"
          labelValueDescription="Most TVL"
          className="w-1/2 "
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
          <div className="flex flex-col">
            <Header />
            <DefiStats />
          </div>
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
