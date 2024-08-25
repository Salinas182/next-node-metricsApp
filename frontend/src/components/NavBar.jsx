"use client";

import React from "react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between py-3 px-6 bg-brand-primary/80 text-white">
      <Link href="/" className="font-bold">
        Home
      </Link>

      <Link href="/add" className="font-bold">
        New metric
      </Link>
    </nav>
  );
}
