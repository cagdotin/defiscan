import React from "react";
import Chart from "@/components/chart";
import Table from "@/components/table/page";
import { PieChartComponent } from "@/components/pie-charts/piechart";
import { Section } from "@/components/section";
import { Container } from "@/components/container";

const Header = () => {
  return (
    <div className="flex flex-col md:w-full lg:border-r">
      <h1 className="my-auto text-primary font-bold text-2xl sm:text-2xl md:text-3xl px-8 py-12  border-b ">
        Verifiable insights
        <br />
        <small>into the maturity and risks of DeFi</small>
      </h1>

      <div className="hidden lg:flex  h-24 flex-row">
        <div className="w-1/2" />
      </div>
      <div className="hidden lg:flex grow"></div>
    </div>
  );
};

const DefiStats = () => {
  return (
    <div className="md:w-full flex flex-col">
      <div className="border-b pb-2">
        <Chart className="w-full border-none shadow-none" />
      </div>
      <div className="flex flex-wrap">
        <PieChartComponent
          groupByKey="stage"
          operation="count"
          baseColor="#ae7ef4"
          chartTitle="#Projects by Stage"
          labelValueDescription="Stage-2"
          className="w-1/2 md:w-1/4 border-r border-b md:border-b-0"
        />
        <PieChartComponent
          groupByKey="stage"
          operation="sum"
          baseColor="#ae7ef4"
          chartTitle="TVL by Stage"
          labelValueDescription="Total TVL"
          className="w-1/2 md:w-1/4 border-b md:border-b-0 md:border-r"
        />

        <PieChartComponent
          groupByKey="chain"
          operation="count"
          baseColor="#ae7ef4"
          chartTitle="Projects by Chain"
          labelValueDescription="Top Source"
          className="w-1/2 md:w-1/4 border-r"
        />
        <PieChartComponent
          groupByKey="chain"
          operation="sum"
          baseColor="#ae7ef4"
          chartTitle="TVL by Chain"
          labelValueDescription="Most TVL"
          className="w-1/2 md:w-1/4"
        />
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <>
      <Section>
        <Container className="px-0">
          <div className="flex flex-col lg:flex-row">
            <Header />
            <DefiStats />
          </div>
        </Container>
      </Section>
      <Section className="border-0">
        <Container className="px-0">
          <Table />
          <div className="grow" />
        </Container>
      </Section>
      <Section className="grow h-full flex">
        <Container className="min-h-full"></Container>
      </Section>
    </>
  );
}
