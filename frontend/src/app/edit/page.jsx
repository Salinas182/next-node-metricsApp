"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLoading } from "@/hooks/useLoading";
import httpAdapter from "@/adapters/httpAdapter";
import useFormValidation from "@/hooks/useFormValidation";
import MetricEditionCard from "@/components/MetricEditionCard";

export default function EditMetrics() {
  const [metrics, setMetrics] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedMetrics, setEditedMetrics] = useState({
    name: "",
    value: "",
  });
  const [formCompleted, setFormCompleted] = useState(false);
  const { loading, setLoading, renderSpinner } = useLoading();
  const { validateForm } = useFormValidation(editedMetrics);

  useEffect(() => {
    async function getMetrics() {
      try {
        setLoading(true);

        const { data } = await httpAdapter.get("/metrics");
        const recentToOldData = [...data].reverse();
        setMetrics(recentToOldData);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error("Error fetching metrics");
        console.error("Error fetching metrics:", error);
      }
    }

    getMetrics();
  }, [setLoading]);

  useEffect(() => {
    const { valid } = validateForm();
    setFormCompleted(valid);
  }, [validateForm, editedMetrics]);

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedMetrics({
      ...editedMetrics,
      value: metrics[index].value.toString(),
      name: metrics[index].name,
    });
  };

  const handleInputChange = (e, field) => {
    setEditedMetrics({
      ...editedMetrics,
      [field]: e.target.value,
    });
  };

  const handleSaveClick = async (id) => {
    if (!formCompleted) {
      toast.error("Please fill in both fields.");
      return;
    }

    const updatedMetric = {
      name: editedMetrics.name,
      value: parseFloat(editedMetrics.value),
    };

    try {
      await httpAdapter.put(`/metrics/${id}`, updatedMetric);
      const updatedMetrics = [...metrics];
      updatedMetrics[editingIndex] = {
        ...updatedMetrics[editingIndex],
        ...updatedMetric,
      };
      setMetrics(updatedMetrics);
      setEditingIndex(null);
      toast.success("Metric updated successfully!");
    } catch (error) {
      toast.error("Error updating metric");
      console.error("Error updating metric:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      setLoading(true);
      await httpAdapter.delete(`/metrics/${id}`);
      setMetrics(metrics.filter((metric) => metric._id !== id));
      setLoading(false);
      toast.success("Metric deleted successfully!");
    } catch (error) {
      setLoading(false);
      toast.error("Error deleting metric");
      console.error("Error deleting metric:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditedMetrics({
      name: "",
      value: "",
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-8">
      {loading && renderSpinner()}

      <div className="w-full">
        <h2 className="text-2xl font-bold mt-4 mb-8 text-center md:mt-8">
          Edit Metrics
        </h2>

        {metrics.map((metric, index) => (
          <MetricEditionCard
            key={`metric-card-${index}`}
            metric={metric}
            index={index}
            editingIndex={editingIndex}
            editedMetrics={editedMetrics}
            handleInputChange={handleInputChange}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
            handleDeleteClick={handleDeleteClick}
            handleCancelClick={handleCancelClick}
          />
        ))}
      </div>
    </div>
  );
}
