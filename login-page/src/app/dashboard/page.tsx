"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Home, User, Settings, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar untuk layar besar */}
      <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link href="/settings" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-red-600 hover:text-red-800">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Sidebar Mobile */}
      <div className="md:hidden">
        <button
          className="absolute top-4 left-4 z-50 p-2 bg-white rounded-full shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out`}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link
              href="/profile"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
              onClick={() => setIsSidebarOpen(false)}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
            <button
              onClick={() => {
                setIsSidebarOpen(false);
                handleLogout();
              }}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center sm:my-8 lg:mb-8">
            <h1 className="text-2xl font-bold">Welcome, {user.email}</h1>
          </div>

          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold">Total Projects</h3>
              <p className="text-3xl font-bold text-blue-600">12</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold">Tasks Completed</h3>
              <p className="text-3xl font-bold text-green-600">87%</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-semibold">New Messages</h3>
              <p className="text-3xl font-bold text-red-600">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white shadow rounded-lg p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="flex items-center justify-between">
                <span>Updated profile picture</span>
                <span className="text-gray-500 text-sm">2h ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Completed project "Website Redesign"</span>
                <span className="text-gray-500 text-sm">1d ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Sent a message to John Doe</span>
                <span className="text-gray-500 text-sm">3d ago</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
