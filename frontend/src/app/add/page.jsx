"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Input from "@/components/Input";
import Button from "@/components/Button";
import httpAdapter from "@/adapters/httpAdapter";
import useFormValidation from "@/hooks/useFormValidation";
import { useLoading } from "@/hooks/useLoading";

export default function AddMetricsForm() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const nameRef = useRef(null);
  const { validateForm } = useFormValidation({ name, value });
  const { loading, setLoading, renderSpinner } = useLoading();

  useEffect(() => {
    const { valid } = validateForm();
    setFormCompleted(valid);
  }, [validateForm, name, value]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formCompleted) {
      return;
    }

    const metric = { name, value: parseFloat(value) };

    try {
      setLoading(true);

      await httpAdapter.post("/metrics", metric);

      setLoading(false)
      toast.success("Yay! Metric successfully saved!");
      setName("");
      setValue("");
      nameRef.current.focus();
    } catch (error) {
      setLoading(false);
      console.error("Error adding metric:", error);
      toast.error("There was an error, please try again");
    }
  };

  return (
    <div className="px-8 py-6 md:m-32 lg:w-1/2 lg:mx-auto lg:my-24 lg:border-solid lg:border-gray-200 lg:border-2 lg:shadow-xl lg:rounded-lg lg:bg-white lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[70vh]">
      {loading && renderSpinner()}

      <h1 className="text-5xl mb-10 text-center">New metric</h1>

      <form onSubmit={handleSubmit} className="lg:w-2/4">
        <div className="grid grid-cols-1 gap-4 mb-8">
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Metric name"
            ref={nameRef}
          />

          <Input
            type="number"
            name="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            label="Metric value"
          />
        </div>

        <div className="flex justify-center gap-4">
          <Button label="Save" disabled={!formCompleted} />

          <Link href="/">
            <Button label="View metrics" type="secondary" />
          </Link>
        </div>
      </form>
    </div>
  );
}
