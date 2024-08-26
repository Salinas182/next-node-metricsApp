"use client";

import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-3 px-6 bg-brand-primary/80 text-white">
      <Link href="/" className="font-bold">
        Home
      </Link>

      <div className="flex gap-6 md:gap-10">
        <Link href="/add" className="font-bold">
          + Add new metric
        </Link>

        <Link href="/edit" className="font-bold">
          Edit metrics
        </Link>
      </div>
    </nav>
  );
}
