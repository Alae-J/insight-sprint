
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { User, Mail, Key } from 'lucide-react';

// Sample user data
const userData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'Admin',
  joined: '2023-01-15',
  lastActive: '2023-05-02',
};

const Profile = () => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', formData);
    
    // In a real app, this would call an API to update the user profile
    setIsEditing(false);
    setIsChangingPassword(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-primary dark:text-white">Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <div className="w-full sm:w-1/2">
                      <Input
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={User}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={!isEditing}
                        icon={Mail}
                      />
                    </div>
                  </div>
                  
                  {isEditing && !isChangingPassword && (
                    <div>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsChangingPassword(true)}
                        className="mt-2"
                      >
                        <Key size={16} className="mr-2" />
                        Change Password
                      </Button>
                    </div>
                  )}
                  
                  {isChangingPassword && (
                    <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                      <h3 className="text-lg font-medium text-text-primary dark:text-white">Change Password</h3>
                      
                      <Input
                        label="Current Password"
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        icon={Key}
                      />
                      
                      <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="w-full sm:w-1/2">
                          <Input
                            label="New Password"
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="w-full sm:w-1/2">
                          <Input
                            label="Confirm New Password"
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsChangingPassword(false)}
                          className="text-text-secondary"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <CardFooter className="flex justify-end px-0 pt-6">
                  {isEditing ? (
                    <div className="space-x-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          setIsChangingPassword(false);
                          setFormData({
                            name: userData.name,
                            email: userData.email,
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary">
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Account Info Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-secondary dark:text-gray-400">Account Type</p>
                  <p className="font-medium text-text-primary dark:text-white">
                    {userData.role}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-text-secondary dark:text-gray-400">Joined</p>
                  <p className="font-medium text-text-primary dark:text-white">
                    {new Date(userData.joined).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-text-secondary dark:text-gray-400">Last Active</p>
                  <p className="font-medium text-text-primary dark:text-white">
                    {new Date(userData.lastActive).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
                <h3 className="font-medium text-text-primary dark:text-white mb-4">Actions</h3>
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-text-secondary"
                  >
                    Export My Data
                  </Button>
                  <Button
                    variant="outline" 
                    className="w-full justify-start text-danger-red border-danger-red hover:bg-danger-red/10"
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;