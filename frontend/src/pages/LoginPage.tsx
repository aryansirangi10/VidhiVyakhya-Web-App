import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vidhi_token', 'demo_jwt_token_sample');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl font-bold text-slate-900">
              {isRegister ? 'Create an Account' : 'Welcome Back'}
            </h2>
            <p className="text-xs text-slate-500">Sign in to sync your encrypted profiles and simulation history</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
            {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isRegister ? 'Sign In' : 'Register for free'}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
