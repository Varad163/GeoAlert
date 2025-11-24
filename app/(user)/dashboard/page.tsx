"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Bell, MessageCircle, Shield, MapPin } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="min-h-screen p-6 space-y-8 bg-gray-50">
      <h1 className="text-4xl font-bold">Welcome User 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Alerts Card */}
        <Link href="/alerts">
          <Card className="rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer bg-white">
            <CardContent className="flex items-center gap-6">
              <Bell className="w-16 h-16 text-blue-600" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Active Alerts</h2>
                <p className="text-gray-600 text-md mt-1">
                  View real-time alerts and danger zones in your area.
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Chat Card */}
        <Link href="/components/chat/user-chat">
          <Card className="rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer bg-white">
            <CardContent className="flex items-center gap-6">
              <MessageCircle className="w-16 h-16 text-green-600" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Chat With Admin</h2>
                <p className="text-gray-600 text-md mt-1">
                  Ask questions or request immediate support.
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Safe Status */}
        <Link href="/dashboard/safety">
          <Card className="rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer bg-white">
            <CardContent className="flex items-center gap-6">
              <Shield className="w-16 h-16 text-purple-600" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Your Safety Status</h2>
                <p className="text-gray-600 text-md mt-1">
                  Update whether you’re safe during emergencies.
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* Safe Zones */}
        <Link href="/safe-zones">
          <Card className="rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer bg-white">
            <CardContent className="flex items-center gap-6">
              <MapPin className="w-16 h-16 text-red-600" />
              <div className="flex-1">
                <h2 className="text-2xl font-semibold">Nearby Safe Zones</h2>
                <p className="text-gray-600 text-md mt-1">
                  Locate safe shelters and emergency locations.
                </p>
              </div>
            </CardContent>
          </Card>
        </Link>

      </div>
    </div>
  );
}
