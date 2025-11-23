"use client";

import { useEffect, useState } from "react";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export default function AdminSafetyStatusPage() {
  const [list, setList] = useState([]);

  async function loadData() {
    const res = await fetch("/api/admin/status/list");
    const data = await res.json();
    setList(data.statuses || []);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">   {/* CLEAN BACKGROUND */}
      <h1 className="text-3xl font-bold mb-6">User Safety Overview</h1>

      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="p-3">User</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {list.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No safety updates yet.
                </td>
              </tr>
            )}

            {list.map((s: any) => (
              <tr key={s.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium">{s.user.name}</td>
                <td className="p-3 text-gray-600">{s.user.email}</td>

                <td className="p-3">
                  {s.isSafe ? (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <ShieldCheck /> Safe
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-red-600 font-semibold">
                      <ShieldAlert /> Unsafe
                    </span>
                  )}
                </td>

                <td className="p-3 text-gray-500">
                  {new Date(s.lastUpdated).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
