"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import httpAdapter from "@/adapters/httpAdapter";
import Timeline from "@/components/Timeline";
import AverageDataTable from "@/components/AverageDataTable";
import { useLoading } from "@/hooks/useLoading";
import { AVERAGES_FILTERS } from "@/utils/constants";

export default function Home() {
  const [metrics, setMetrics] = useState([]);
  const [averages, setAverages] = useState({
    perMinute: [],
    perHour: [],
    perDay: [],
  });
  const [filter, setFilter] = useState(AVERAGES_FILTERS.ALL);
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

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching data");
        console.error("Error fetching metrics data:", error);
      }
    }

    getMetrics();
  }, [setLoading]);

  const renderAverages = (filter) => {
    if (filter === AVERAGES_FILTERS.MINUTE) {
      return <AverageDataTable averages={averages.perMinute} />;
    }

    if (filter === AVERAGES_FILTERS.HOUR) {
      return <AverageDataTable averages={averages.perHour} />;
    }

    if (filter === AVERAGES_FILTERS.DAY) {
      return <AverageDataTable averages={averages.perDay} />;
    }

    return (
      <>
        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">
            {AVERAGES_FILTERS.MINUTE}
          </h3>
          <AverageDataTable averages={averages.perMinute} />
        </div>

        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">
            {AVERAGES_FILTERS.HOUR}
          </h3>
          <AverageDataTable averages={averages.perHour} />
        </div>

        <div>
          <h3 className="text-xl font-bold mt-4 mb-2">
            {AVERAGES_FILTERS.DAY}
          </h3>
          <AverageDataTable averages={averages.perDay} />
        </div>
      </>
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 md:p-24 lg:justify-center">
      {loading && renderSpinner()}

      <div className="md:flex md:flex-wrap md:gap-2 md:justify-between lg:flex-col">
        <h2 className="text-2xl font-bold mt-8 mb-4 md:basis-full">
          Metrics Averages
        </h2>

        <div className="flex bg-brand-primary justify-between  rounded-full h-12 mx-auto my-6 lg:w-[548px] lg:my-12">
          {Object.keys(AVERAGES_FILTERS).map((filterKey) => {
            const isActive = filter === AVERAGES_FILTERS[filterKey];

            return (
              <Button
                key={`${filterKey}-filter`}
                label={AVERAGES_FILTERS[filterKey]}
                onClick={() => setFilter(AVERAGES_FILTERS[filterKey])}
                type={isActive ? "secondary" : "primary"}
                styles={isActive ? styles.activeFilter : styles.inactiveFilter}
              />
            );
          })}
        </div>

        <div className="flex flex-col items-center w-full">
          <h3 className="text-xl font-bold mt-4 mb-2">
            {AVERAGES_FILTERS[filter]}
          </h3>

          <div className="flex flex-row flex-wrap gap-6">
            {renderAverages(filter)}
          </div>
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

const styles = {
  activeFilter: "bg-white rounded-full w-1/4",
  inactiveFilter: "w-1/4",
};
