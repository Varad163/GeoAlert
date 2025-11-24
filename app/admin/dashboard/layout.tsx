"use client";

import Sidebar from "@/app/components/admin/Sidebar";
import Footer from "@/app/components/admin/footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
