"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import httpAdapter from "@/adapters/httpAdapter";
import Timeline from "@/components/Timeline";
import AverageDataTable from "@/components/AverageDataTable";
import { useLoading } from "@/hooks/useLoading";

export default function Home() {
  const [metrics, setMetrics] = useState([]);
  const [averages, setAverages] = useState({
    perMinute: [],
    perHour: [],
    perDay: [],
  });
  const { loading, setLoading, renderSpinner } = useLoading();

  useEffect(() => {
    async function getMetrics() {
      try {
        setLoading(true);

        const { data: metricsData } = await httpAdapter.get("/metrics");
        setMetrics(metricsData);

        const { data: averagesData } = await httpAdapter.get(
          "/metrics/averages"
        );
        setAverages(averagesData);

        setLoading(false)
      } catch (error) {
        setLoading(false);
        toast.error('Error fetching data');
        console.error("Error fetching metrics data:", error);
      }
    }

    getMetrics();
  }, [setLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 md:flex-row md:flex-wrap lg:justify-center">
      {loading && renderSpinner()}

      <div className="md:flex md:flex-wrap md:gap-2 md:justify-between">
        <h2 className="text-2xl font-bold mt-8 mb-4 md:basis-full">
          Metrics Averages
        </h2>
        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">Per Minute</h3>
          <AverageDataTable averages={averages.perMinute} />
        </div>

        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">Per Hour</h3>
          <AverageDataTable averages={averages.perHour} />
        </div>

        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">Per Day</h3>
          <AverageDataTable averages={averages.perDay} />
        </div>
      </div>

      <div className="mb-8 lg:mr-16">
        <h2 className="text-2xl font-bold mt-8 mb-4">Metrics Timeline</h2>
        <Timeline metrics={metrics} />
      </div>

      <Link href="/add">
        <Button label="Add a new metric" type="primary" styles={"w-48 h-16"} />
      </Link>
    </main>
  );
}
