import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowUpDown } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ChangeManagementApp = () => {
  const [changes, setChanges] = useState([
    {
      id: 1,
      title: 'Update CRM System',
      description: 'Migrating from legacy CRM to new cloud-based solution',
      status: 'In Progress',
      priority: 'High',
      requestedBy: 'John Smith',
      dateRequested: '2025-02-01',
      impact: 'High',
      department: 'Sales'
    },
    {
      id: 2,
      title: 'Implement New Security Protocol',
      description: 'Rolling out 2FA across all departments',
      status: 'Pending Review',
      priority: 'Critical',
      requestedBy: 'Sarah Johnson',
      dateRequested: '2025-02-05',
      impact: 'Medium',
      department: 'IT'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredChanges = changes.filter(change => {
    const matchesSearch = change.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         change.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || change.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Change Management Dashboard</h1>
        
        {/* Controls */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search changes..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            className="px-4 py-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending Review">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            New Change
          </button>
        </div>

        {/* Change Request Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredChanges.map(change => (
            <Card key={change.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{change.title}</span>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    change.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    change.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-800' :
                    change.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {change.status}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">{change.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Requested By</p>
                      <p>{change.requestedBy}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Date Requested</p>
                      <p>{change.dateRequested}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Priority</p>
                      <p className={`${
                        change.priority === 'Critical' ? 'text-red-600' :
                        change.priority === 'High' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {change.priority}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Department</p>
                      <p>{change.department}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeManagementApp;