'use client';

import Link from "next/link";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import httpAdapter from "@/adapters/httpAdapter";
import Timeline from "@/components/Timeline";
import AverageDataTable from "@/components/AverageDataTable";

export default function Home() {
  const [metrics, setMetrics] = useState([]);
  const [averages, setAverages] = useState({
    perMinute: [],
    perHour: [],
    perDay: []
  })

  useEffect(() => {
    async function getMetrics() {
      try {
        const { data: metricsData } = await httpAdapter.get('/metrics');
        setMetrics(metricsData);

        const { data: averagesData } = await httpAdapter.get('/metrics/averages');
        setAverages(averagesData);
      } catch (error) {
        console.error('Error fetching metrics data:', error);
      }
    }

    getMetrics();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2 className="text-2xl font-bold mt-8 mb-4">Metrics Timeline</h2>
      <Timeline metrics={metrics} />

      <h2 className="text-2xl font-bold mt-8 mb-4">Metrics Averages</h2>

      <h3 className="text-xl font-bold mt-4 mb-2">Per Minute</h3>
      <AverageDataTable averages={averages.perMinute} />

      <h3 className="text-xl font-bold mt-4 mb-2">Per Hour</h3>
      <AverageDataTable averages={averages.perHour} />

      <h3 className="text-xl font-bold mt-4 mb-2">Per Day</h3>
      <AverageDataTable averages={averages.perDay} />

      <Link href="/add">
        <Button label="Add a new metric" type="primary" styles={"w-48 h-16"} />
      </Link>
    </main>
  );
}
