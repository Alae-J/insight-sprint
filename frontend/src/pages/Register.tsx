import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { saveAuth } from '@/lib/auth';
import { api } from '@/service/api/api';
import { toast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post<{ token: string; userId: string }>(
        "/auth/register",
        formData
      );
      saveAuth(res.token, res.userId);
      toast({
        title: "Account created 🎉",
        description: "You're all set, welcome aboard!",
      });
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Registration failed:", err.message);
      toast({
        title: "Registration failed",
        description: err.message || "An error occurred while creating your account.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-8">
            <Logo />
          </div>

          <h1 className="text-2xl font-bold text-center mb-6 text-text-primary dark:text-white">
            Create your account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Smith"
              required
            />

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <div className="flex items-center mt-2 mb-2">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-text-secondary dark:text-gray-300">
                I agree to the <a href="#" className="text-primary-blue hover:underline">Terms of Service</a> and <a href="#" className="text-primary-blue hover:underline">Privacy Policy</a>
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-blue hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
