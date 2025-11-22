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
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <Button
          variant="destructive"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2"
        >
          <LogOut size={18} />
          Logout
        </Button>
      </div>

      {/* Admin Profile */}
      <Card className="rounded-2xl shadow p-4">
        <CardContent className="flex items-center gap-4">
          <UserCog className="w-12 h-12 text-black/80" />

          <div className="flex-1">
            <h2 className="text-xl font-semibold">Welcome, {session?.user?.name}</h2>
            <p className="text-gray-600 text-sm">{session?.user?.email}</p>
            <p className="text-sm font-medium text-black/60">Role: Administrator</p>
          </div>

          <Button variant="default">Manage Profile</Button>
        </CardContent>
      </Card>

      {/* Dashboard Sections */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Post New Alert */}
        <Card className="rounded-2xl shadow p-4 hover:shadow-xl transition">
          <CardContent className="flex items-center gap-4">
            <Megaphone className="w-12 h-12 text-red-500" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Post New Alert</h2>
              <p className="text-gray-600 text-sm">Broadcast emergencies instantly to users.</p>
            </div>
            <Button>Post Alert</Button>
          </CardContent>
        </Card>

        {/* Manage Safe Zones */}
        <Card className="rounded-2xl shadow p-4 hover:shadow-xl transition">
          <CardContent className="flex items-center gap-4">
            <Map className="w-12 h-12 text-blue-600" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Manage Safe Zones</h2>
              <p className="text-gray-600 text-sm">Add, update or remove safe-zone locations.</p>
            </div>
            <Button>Open Map</Button>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="rounded-2xl shadow p-4 hover:shadow-xl transition">
          <CardContent className="flex items-center gap-4">
            <AlertTriangle className="w-12 h-12 text-yellow-500" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">Active Alerts</h2>
              <p className="text-gray-600 text-sm">View and manage currently active alerts.</p>
            </div>
            <Button>View Alerts</Button>
          </CardContent>
        </Card>

        {/* User Reports */}
        <Card className="rounded-2xl shadow p-4 hover:shadow-xl transition">
          <CardContent className="flex items-center gap-4">
            <Users className="w-12 h-12 text-green-600" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">User Reports</h2>
              <p className="text-gray-600 text-sm">View reports submitted by users.</p>
            </div>
            <Button>View Reports</Button>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="rounded-2xl shadow p-4 hover:shadow-xl transition md:col-span-2">
          <CardContent className="flex items-center gap-4">
            <ShieldCheck className="w-12 h-12 text-purple-600" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">System Status</h2>
              <p className="text-gray-600 text-sm">Monitor real-time platform performance & services.</p>
            </div>
            <Button>View Status</Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
