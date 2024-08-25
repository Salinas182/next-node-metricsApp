"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import httpAdapter from "@/adapters/httpAdapter";
import useFormValidation from "@/hooks/useFormValidation";

export default function AddMetricsForm() {
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);
  const nameRef = useRef(null);
  const { validateForm } = useFormValidation({ name, value });
  
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
      await httpAdapter.post("/metrics", metric);
      setName("");
      setValue("");
      nameRef.current.focus();
    } catch (error) {
      console.error("Error adding metric:", error);
    }
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-5xl mb-10 text-center">New metric</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
