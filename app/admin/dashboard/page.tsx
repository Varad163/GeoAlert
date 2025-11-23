"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Map,
  Megaphone,
  Users,
  LogOut,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen p-8 bg-white"> {/*  <-- gradient removed */}

      {/* Top Bar */}
      <header className="flex justify-between items-center bg-white/70 backdrop-blur-xl p-5 rounded-2xl shadow-lg border border-black/10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Admin Dashboard
        </h1>

        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 shadow-md hover:shadow-lg transition"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </header>

      {/* Profile Section */}
      <section className="mt-8 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg border border-black/10">
        <div className="flex items-center gap-6">
          <UserCog className="w-20 h-20 text-gray-700" />

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {session?.user?.name}
            </h2>
            <p className="text-gray-700">{session?.user?.email}</p>
            <p className="text-sm mt-1 font-medium text-gray-700">
              Role: Administrator
            </p>
          </div>

          <div className="ml-auto">
            <Button className="shadow-md">Manage Profile</Button>
          </div>
        </div>
      </section>

      {/* Dashboard Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        <DashboardCard
          icon={<Megaphone className="w-14 h-14 text-gray-700" />}
          title="Post New Alert"
          desc="Broadcast important notifications instantly."
          href="/admin/alerts/new"
        />

        <DashboardCard
          icon={<Map className="w-14 h-14 text-gray-700" />}
          title="Manage Safe Zones"
          desc="Add, update or remove safe-area locations."
          href="/admin/safe-zones"
        />

        <DashboardCard
          icon={<AlertTriangle className="w-14 h-14 text-gray-700" />}
          title="Active Alerts"
          desc="Monitor and manage current alerts."
          href="/admin/alerts"
        />

        <DashboardCard
          icon={<Users className="w-14 h-14 text-gray-700" />}
          title="User Reports"
          desc="Review reports submitted by users."
          href="/admin/reports"
        />

        <DashboardCard
          icon={<ShieldCheck className="w-14 h-14 text-gray-700" />}
          title="System Status"
          desc="Review system health and activity logs."
          href="/admin/system"
        />

      </section>
    </div>
  );
}

function DashboardCard({ icon, title, desc, href }: any) {
  return (
    <Card className="rounded-2xl bg-white/80 backdrop-blur-xl border border-black/10 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition cursor-pointer">
      <CardContent className="p-6 flex flex-col gap-4">
        <div>{icon}</div>

        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm">{desc}</p>

        <a href={href} className="mt-4">
          <Button className="w-full shadow-md hover:shadow-lg">Open</Button>
        </a>
      </CardContent>
    </Card>
  );
}
