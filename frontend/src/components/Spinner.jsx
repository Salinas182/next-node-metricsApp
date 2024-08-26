"use client";

import React from "react";

export default function Spinner() {
  return (
    <div>
      <div className="flex justify-center items-center fixed top-0 left-0 z-[9999] w-screen h-screen bg-[#eee7ea]/70">
        <div className="border-4 border-solid border-black/[0.1] w-9 h-9 rounded-[50%] border-l-brand-primary animate-spin"></div>
      </div>
    </div>
  );
}
