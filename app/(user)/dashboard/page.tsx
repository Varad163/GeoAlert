import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, Shield, MapPin } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-semibold">User Dashboard</h1>

      {/* Alerts Section */}
      <Card className="rounded-2xl shadow p-4">
        <CardContent className="flex items-center gap-4">
          <Bell className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Active Alerts</h2>
            <p className="text-gray-600 text-sm">View real-time disaster alerts in your area.</p>
          </div>
          <Button>View Alerts</Button>
        </CardContent>
      </Card>

      {/* Chat Section */}
      <Card className="rounded-2xl shadow p-4">
        <CardContent className="flex items-center gap-4">
          <MessageCircle className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Chat With Admin</h2>
            <p className="text-gray-600 text-sm">Ask questions or request help directly.</p>
          </div>
          <Button>Open Chat</Button>
        </CardContent>
      </Card>

      {/* Safe Status */}
      <Card className="rounded-2xl shadow p-4">
        <CardContent className="flex items-center gap-4">
          <Shield className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Your Safety Status</h2>
            <p className="text-gray-600 text-sm">Update or view whether you're safe.</p>
          </div>
          <Button>Update Status</Button>
        </CardContent>
      </Card>

      {/* Safe Zones */}
      <Card className="rounded-2xl shadow p-4">
        <CardContent className="flex items-center gap-4">
          <MapPin className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Nearby Safe Zones</h2>
            <p className="text-gray-600 text-sm">Find safe locations around you.</p>
          </div>
          <Button>View Map</Button>
        </CardContent>
      </Card>
    </div>
  );
}