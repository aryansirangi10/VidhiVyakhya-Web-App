import React, { useState } from "react";
import { User, Shield, Bell, Key, Lock, Trash2, Smartphone, Monitor } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8 font-mono">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900">Workspace & Security Settings</h1>
        <p className="text-xs text-slate-500">Manage encrypted profiles, active JWT sessions, and notification preferences.</p>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 gap-6 text-xs font-bold">
        <button
          onClick={() => setActiveTab("profile")}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === "profile" ? "border-brand-600 text-brand-700" : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          User Profile
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === "security" ? "border-brand-600 text-brand-700" : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Security & Active Sessions
        </button>
        <button
          onClick={() => setActiveTab("notifications")}
          className={`pb-3 transition-all border-b-2 ${
            activeTab === "notifications" ? "border-brand-600 text-brand-700" : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          Notifications
        </button>
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === "profile" && (
        <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900">Account Credentials</h3>
          <div className="space-y-4 max-w-md">
            <Input label="Full Name" defaultValue="Verified Citizen User" />
            <Input label="Email Address" defaultValue="citizen@example.com" disabled />
          </div>
        </div>
      )}

      {/* TAB CONTENT: SECURITY & SESSIONS */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Active Login Sessions</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-3">
                  <Monitor size={20} className="text-brand-600" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Chrome on macOS (Current Session)</h4>
                    <p className="text-[10px] text-slate-400">IP: 127.0.0.1 • Last Active: Just Now</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Alert Preferences</h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-600" />
              <span>Email notification for new Parliamentary Finance Bills</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-brand-600" />
              <span>Weekly savings impact updates</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
