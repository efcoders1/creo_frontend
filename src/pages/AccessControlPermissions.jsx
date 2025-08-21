import React, { useState } from 'react';

const AccessControlPermissions = () => {
    const [fieldLocks, setFieldLocks] = useState({
        budgetCategories: true,
        projectScope: true,
        stakeholderAssignments: true,
        costCategoryDefinitions: true,
        actualCostEntries: false,
        receiptPhotoUploads: false,
        commentsCollaboration: false
    });

    const systemOverview = [
        { label: 'Active Users', value: '7', color: 'text-blue-600' },
        { label: 'User Roles', value: '3', color: 'text-blue-600' },
        { label: 'Permissions', value: '15', color: 'text-blue-600' },
        { label: 'Audit Events', value: '142', color: 'text-blue-600' }
    ];

    const roleDefinitions = [
        {
            id: 1,
            title: 'PROJECT MANAGER',
            subtitle: 'Primary Operations',
            color: 'bg-green-500',
            permissions: [
                'Create/Update projects',
                'Manage budgets (pre-approval)',
                'Input actual costs',
                'Upload quotes & documents',
                'Add comments & collaborate',
                'View reports & analytics',
                'Manage project timeline'
            ]
        },
        {
            id: 2,
            title: 'DIRECTOR',
            subtitle: 'Executive Control',
            color: 'bg-orange-500',
            permissions: [
                'Lock & approve budgets',
                'Export all data',
                'Access cost management',
                'System configuration',
                'Audit trail review',
                'Override permissions',
                'Final project approval'
            ]
        },
        {
            id: 3,
            title: 'BOOKKEEPER',
            subtitle: 'Financial Operations',
            color: 'bg-blue-500',
            permissions: [
                'Input actual costs',
                'Mark payments as paid',
                'Upload receipts & invoices',
                'Export financial data',
                'Sync with Xero',
                'Generate financial reports',
                'Manage vendor information'
            ]
        }
    ];

    const fieldLockItems = [
        { key: 'budgetCategories', label: 'Budget Categories & Amounts', locked: true },
        { key: 'projectScope', label: 'Project Scope & Timeline', locked: true },
        { key: 'stakeholderAssignments', label: 'Stakeholder Assignments', locked: true },
        { key: 'costCategoryDefinitions', label: 'Cost Category Definitions', locked: true },
        { key: 'actualCostEntries', label: 'Actual Cost Entries', locked: false },
        { key: 'receiptPhotoUploads', label: 'Receipt & Photo Uploads', locked: false },
        { key: 'commentsCollaboration', label: 'Comments & Collaboration', locked: false }
    ];

    const userManagement = [
        {
            id: 1,
            name: 'Michael Chen',
            role: 'Director',
            avatar: 'MC',
            permissions: [
                { name: 'Full System Access', granted: true },
                { name: 'Budget Lock Authority', granted: true }
            ]
        },
        {
            id: 2,
            name: 'Sarah Johnson',
            role: 'PM Manager',
            avatar: 'SJ',
            permissions: [
                { name: 'Project Management', granted: true },
                { name: 'Budget Lock Authority', granted: false }
            ]
        },
        {
            id: 3,
            name: 'Lisa Wong',
            role: 'Bookkeeper',
            avatar: 'LW',
            permissions: [
                { name: 'Financial Operations', granted: true },
                { name: 'Xero Sync Access', granted: true }
            ]
        },
        {
            id: 4,
            name: 'Robert Smith',
            role: 'Architect',
            avatar: 'RS',
            permissions: [
                { name: 'View Only Access', granted: true },
                { name: 'Comment Access', granted: false }
            ]
        }
    ];

    const auditTrail = [
        {
            id: 1,
            timestamp: 'Jul 18, 2025 - 3:22 PM',
            action: 'System System health check completed',
            user: 'System',
            type: 'system'
        },
        {
            id: 2,
            timestamp: 'Jul 17, 2025 - 1:45 PM',
            action: 'Michael Chen (Director) LOCKED budget for project 25-01-0001',
            user: 'Michael Chen',
            type: 'security'
        },
        {
            id: 3,
            timestamp: 'Jul 17, 2025 - 1:15 PM',
            action: 'Sarah Johnson (PM) submitted budget for approval in project 25-01-0001',
            user: 'Sarah Johnson',
            type: 'approval'
        },
        {
            id: 4,
            timestamp: 'Jul 17, 2025 - 10:45 AM',
            action: 'Lisa Wong (Bookkeeper) added actual cost entry: Supplies - $1,200',
            user: 'Lisa Wong',
            type: 'data'
        }
    ];

    const toggleFieldLock = (key) => {
        setFieldLocks(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSystemAction = (action) => {
        console.log(`Executing system action: ${action}`);
        // Implementation for system actions
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8">
            {/* Restricted Access Warning */}
            <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                    <i className="bi bi-shield-lock text-yellow-600"></i>
                    <span className="text-sm font-medium text-yellow-800">RESTRICTED ACCESS - SYSTEM ADMINISTRATORS ONLY</span>
                </div>
            </div>

            {/* System Overview */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-speedometer2 text-blue-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">SYSTEM OVERVIEW</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {systemOverview.map((item, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-6 text-center">
                            <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.value}</div>
                            <div className="text-sm text-gray-600">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Role Definitions & Permissions */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-people text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">ROLE DEFINITIONS & PERMISSIONS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {roleDefinitions.map((role) => (
                        <div key={role.id} className="border border-gray-300 rounded-lg p-6 mb-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-8 h-8 ${role.color} rounded flex items-center justify-center`}>
                                    <i className="bi bi-person text-white"></i>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{role.title}</h3>
                                    <p className="text-sm text-gray-600">{role.subtitle}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {role.permissions.map((permission, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <i className="bi bi-check-circle text-green-500 text-sm"></i>
                                        <span className="text-sm text-gray-700">{permission}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Field-Level Locks */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-lock text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">FIELD-LEVEL LOCKS</h2>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-red-800 mb-4">Budget Post-Approval Locks</h3>

                    <div className="space-y-3">
                        {fieldLockItems.map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-3 bg-white rounded border border-red-200">
                                <span className="text-sm text-gray-700">{item.label}</span>
                                <button
                                    onClick={() => toggleFieldLock(item.key)}
                                    className={`px-4 py-1 text-xs font-medium rounded ${
                                        fieldLocks[item.key]
                                            ? 'bg-red-600 text-white'
                                            : 'bg-green-600 text-white'
                                    }`}
                                >
                                    {fieldLocks[item.key] ? 'LOCKED' : 'UNLOCKED'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* User Management */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-person-gear text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">USER MANAGEMENT</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
                    {userManagement.map((user) => (
                        <div key={user.id} className="border border-gray-300 rounded-lg p-4 ">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                    {user.avatar}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{user.name}</h3>
                                    <p className="text-sm text-gray-600">{user.role}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {user.permissions.map((permission, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <span className="text-xs text-gray-700">{permission.name}</span>
                                        <div className={`w-4 h-4 rounded ${
                                            permission.granted ? 'bg-green-500' : 'bg-gray-300'
                                        }`}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Audit Trail */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-clock-history text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">AUDIT TRAIL</h2>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <div className="space-y-3">
                        {auditTrail.map((entry) => (
                            <div key={entry.id} className="flex items-start gap-3 p-3 bg-white rounded border border-blue-200">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                    entry.type === 'system' ? 'bg-blue-500' :
                                        entry.type === 'security' ? 'bg-red-500' :
                                            entry.type === 'approval' ? 'bg-yellow-500' :
                                                'bg-green-500'
                                }`}></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{entry.action}</p>
                                    <p className="text-xs text-gray-500">{entry.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Controls */}
            <div className="bg-white rounded-lg border border-gray-300 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-gear text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">SYSTEM CONTROLS</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <button
                        onClick={() => handleSystemAction('network-permissions')}
                        className="px-2 py-1 text-sm sm:px-4 sm:py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
                    >
                        Network Permissions
                    </button>
                    <button
                        onClick={() => handleSystemAction('export-audit-log')}
                        className="px-2 py-1 text-sm sm:px-4 sm:py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
                    >
                        Export Audit Log
                    </button>
                    <button
                        onClick={() => handleSystemAction('emergency-lockdown')}
                        className="px-2 py-1 text-sm sm:px-4 sm:py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors"
                    >
                        Emergency Lockdown
                    </button>
                    <button
                        onClick={() => handleSystemAction('generate-report')}
                        className="px-2 py-1 text-sm sm:px-4 sm:py-3 bg-yellow-600 text-white font-medium rounded hover:bg-yellow-700 transition-colors"
                    >
                        Generate Report
                    </button>
                    <button
                        onClick={() => handleSystemAction('backup-settings')}
                        className="px-2 py-1 text-sm sm:px-4 sm:py-3 bg-purple-600 text-white font-medium rounded hover:bg-purple-700 transition-colors"
                    >
                        Backup Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessControlPermissions;


