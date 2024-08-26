'use client';

import { useState } from "react";
import Spinner from "@/components/Spinner";

export function useLoading() {
  const [loading, setLoading] = useState(false);

  function renderSpinner() {
    return loading ? <Spinner /> : null;
  }

  return { loading, setLoading, renderSpinner };
}
