import React, { useState } from "react";
import { Lock, Mail, ArrowRight } from "lucide-react";
import Button from "../../../../components/ui/Button";
import Input from "../../../../components/ui/Input";
import { useAuth } from "../../hooks/useAuth";

export function LoginForm({ onSuccess }: { onSuccess?: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full mx-auto">
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
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        leftIcon={<Lock size={16} />}
        required
      />

      <Button
        type="submit"
        className="w-full"
        loading={isLoading}
        rightIcon={<ArrowRight size={16} />}
      >
        Sign In to Workspace
      </Button>
    </form>
  );
}

export default LoginForm;
