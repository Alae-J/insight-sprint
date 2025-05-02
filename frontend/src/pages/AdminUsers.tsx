
import React, { useState } from 'react';
import { Card } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { User, ChevronDown } from 'lucide-react';

// Sample users data
const usersData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Admin',
    active: true,
    lastActive: '2023-05-02T09:15:00',
  },
  {
    id: 2,
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    role: 'User',
    active: true,
    lastActive: '2023-05-01T14:30:00',
  },
  {
    id: 3,
    name: 'Mike Brown',
    email: 'mike.brown@example.com',
    role: 'User',
    active: true,
    lastActive: '2023-04-30T11:45:00',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    email: 'sarah.williams@example.com',
    role: 'User',
    active: false,
    lastActive: '2023-04-15T16:20:00',
  },
];

// Available roles
const availableRoles = ['Admin', 'User'];

const AdminUsers = () => {
  const [users, setUsers] = useState(usersData);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  
  const toggleDropdown = (userId: number) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    setOpenDropdown(null);
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, active: !user.active } : user
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-text-primary dark:text-white">Admin - Users</h1>
      
      <div className="mb-6 flex justify-between items-center">
        <div>
          <p className="text-text-secondary dark:text-gray-400">
            Manage user permissions and access
          </p>
        </div>
        <Button variant="primary">
          Add New User
        </Button>
      </div>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">User</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Email</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Role</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Last Active</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Status</th>
                <th className="pb-3 pt-2 text-text-secondary dark:text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr 
                  key={user.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/10"
                >
                  <td className="py-4 pr-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center text-white mr-3">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-text-primary dark:text-white">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-text-secondary dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="py-4 pr-4">
                    <div className="relative">
                      <button
                        className="flex items-center justify-between border border-gray-300 dark:border-gray-600 rounded p-2 w-32 bg-white dark:bg-gray-700"
                        onClick={() => toggleDropdown(user.id)}
                      >
                        <span>{user.role}</span>
                        <ChevronDown size={16} />
                      </button>
                      
                      {openDropdown === user.id && (
                        <div className="absolute z-10 mt-1 w-32 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
                          {availableRoles.map(role => (
                            <button
                              key={role}
                              className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                              onClick={() => handleRoleChange(user.id, role)}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-text-secondary dark:text-gray-300">
                    {new Date(user.lastActive).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant={user.active ? 'success' : 'danger'}>
                      {user.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="py-4">
                    <Button 
                      variant={user.active ? 'danger' : 'secondary'} 
                      size="sm"
                      onClick={() => toggleUserStatus(user.id)}
                    >
                      {user.active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminUsers;
