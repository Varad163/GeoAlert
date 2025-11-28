"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user) return;

    if (session.user.role === "ADMIN") {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/dashboard");
    }
  }, [session]);

  return (
    <div className="min-h-screen bg-gray-50 text-black">

      {/* HERO SECTION */}
      <section className="px-8 md:px-20 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Stay Safe with <span className="text-black/60">GeoAlert</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto"
        >
          GeoAlert provides real-time disaster alerts, safe-zone tracking,
          and instant emergency updates — all in one powerful platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex gap-4 justify-center"
        >
          <a href="/register">
            <button className="px-6 py-3 border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition active:scale-95">
              Get Started
            </button>
          </a>

          <a href="#features">
            <button className="px-6 py-3 border-2 border-black/30 rounded-xl font-semibold hover:bg-gray-200 transition active:scale-95">
              Learn More
            </button>
          </a>
        </motion.div>
      </section>

      {/* FEATURE SECTION */}
      <section id="features" className="px-8 md:px-20 py-20 bg-white">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why Choose <span className="text-black/60">GeoAlert?</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">⚡ Real-Time Alerts</h3>
            <p className="text-gray-700">
              Get instant disaster warnings: floods, fires, storms, earthquakes, and more.
            </p>
          </div>

          <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">🗺 Safe-Zone Tracking</h3>
            <p className="text-gray-700">
              Know which areas are safe and see nearby shelters instantly.
            </p>
          </div>

          <div className="p-6 border-2 border-black rounded-2xl bg-gray-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold mb-3">📢 Admin Alerts</h3>
            <p className="text-gray-700">
              Authorities can post, manage, and broadcast emergency alerts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-20 py-20 text-center">
        <h2 className="text-4xl font-extrabold mb-6">Ready to Stay Alert?</h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-8">
          Join thousands of users who trust GeoAlert during emergencies.
        </p>

        <a href="/register">
          <button className="px-8 py-4 border-2 border-black rounded-xl font-semibold hover:bg-black hover:text-white transition active:scale-95">
            Create Your Account
          </button>
        </a>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-gray-500 border-t border-black/10">
        © {new Date().getFullYear()} GeoAlert — Stay Safe. Stay Alert.
      </footer>
    </div>
  );
}
