
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempted with:', formData);
    // Handle login logic here
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
