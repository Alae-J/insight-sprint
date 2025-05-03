
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';
import { api } from "../service/api/api";
import { saveAuth } from "@/lib/auth"; // assuming you've added the helper
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Login = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
        "/auth/login",
        formData
      );
      saveAuth(res.token, res.userId);
      toast({
        title: "Login successful 🎉",
        description: "Welcome back!",
      });
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err.message);
      toast({
        title: "Login failed",
        description: err.message || "Invalid email or password.",
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
            Welcome back
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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
            
            <div className="flex items-center justify-between mt-2 mb-2">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary dark:text-gray-300">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-primary-blue hover:underline">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button type="submit" variant="primary" className="w-full">
              Log In
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-text-secondary dark:text-gray-300">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-blue hover:underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
