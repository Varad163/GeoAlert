"use client";

import Link from "next/link";
import { Megaphone, Map, AlertTriangle, Users, ShieldCheck, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">GeoAlert Admin</h1>

      <nav className="flex flex-col gap-4">

        <Link href="/admin" className="flex items-center gap-3 text-lg hover:text-blue-600">
          <LayoutDashboard size={20} /> Dashboard
        </Link>

        <Link href="/admin/alerts/new" className="flex items-center gap-3 text-lg hover:text-blue-600">
          <Megaphone size={20} /> Post Alert
        </Link>

        <Link href="/admin/safe-zones" className="flex items-center gap-3 text-lg hover:text-blue-600">
          <Map size={20} /> Safe Zones
        </Link>

        <Link href="/admin/alerts" className="flex items-center gap-3 text-lg hover:text-blue-600">
          <AlertTriangle size={20} /> Active Alerts
        </Link>

        <Link href="/admin/reports" className="flex items-center gap-3 text-lg hover:text-blue-600">
          <Users size={20} /> User Reports
        </Link>

        <Link href="/admin/system" className="flex items-center gap-3 text-lg hover:text-blue-600">
          <ShieldCheck size={20} /> System Status
        </Link>
      </nav>
    </aside>
  );
}
