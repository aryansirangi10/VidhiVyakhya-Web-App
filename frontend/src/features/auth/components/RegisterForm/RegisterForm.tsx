import React, { useState } from "react";
import { User as UserIcon, Mail, Lock, CheckCircle2 } from "lucide-react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { authApi } from "../../services/auth.api";

export function RegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await authApi.register(email, password, fullName);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl bg-emerald-500/10 p-6 border border-emerald-500/30 text-center space-y-3">
        <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Verification Email Dispatched</h3>
        <p className="text-xs text-slate-600">
          Please check your inbox at <span className="font-bold">{email}</span> to verify your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full mx-auto">
      <Input
        label="Full Name"
        type="text"
        placeholder="Citizen Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        leftIcon={<UserIcon size={16} />}
        required
      />

      <Input
        label="Email Address"
        type="email"
        placeholder="citizen@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail size={16} />}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock size={16} />}
        required
      />

      <Button type="submit" className="w-full" loading={isLoading}>
        Create Free Account
      </Button>
    </form>
  );
}

export default RegisterForm;
