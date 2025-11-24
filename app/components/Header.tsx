"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const { data: session, status } = useSession();

  // Don't show header if not authenticated
  if (status === "loading" || !session) {
    return null;
  }

  const role = session.user?.role || "USER";
  const userName = session.user?.name || session.user?.email || "User";

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Info */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700 font-medium">
                  {userName}
                </span>
              </div>
              
              {/* Role Badge */}
              <div
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold ${
                  role === "ADMIN"
                    ? "bg-red-100 text-red-700 border border-red-200"
                    : "bg-blue-100 text-blue-700 border border-blue-200"
                }`}
              >
                {role}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

