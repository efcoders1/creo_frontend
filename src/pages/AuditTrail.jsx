import React, { useState } from 'react';

const AuditTrail = () => {
    const [filters, setFilters] = useState({
        dateRange: 'All Time',
        user: 'All Users',
        actionType: 'All Actions',
        search: ''
    });

    const [currentPage, setCurrentPage] = useState(2);
    const totalPages = 25;

    // Sample audit entries data
    const auditEntries = [
        {
            id: 1,
            timestamp: 'Jul 17, 2025 - 1:42 PM',
            user: 'Michael Chen',
            userColor: 'bg-red-500',
            action: 'EXPORT',
            actionColor: 'bg-blue-500',
            affectedRecord: 'Project 25-01-0001',
            details: 'Complete project data exported (45.2 MB PDF)'
        },
        {
            id: 2,
            timestamp: 'Jul 17, 2025 - 1:41 PM',
            user: 'System',
            userColor: 'bg-gray-500',
            action: 'UPDATE',
            actionColor: 'bg-orange-500',
            affectedRecord: 'Audit_Trail_Module',
            details: 'Automated backup completed successfully'
        },
        {
            id: 3,
            timestamp: 'Jul 17, 2025 - 1:40 PM',
            user: 'Sarah Johnson',
            userColor: 'bg-blue-500',
            action: 'CREATE',
            actionColor: 'bg-green-500',
            affectedRecord: 'Budget_Line: Audio_Visual',
            details: 'Added new budget category with $15,000 allocation'
        },
        {
            id: 4,
            timestamp: 'Jul 17, 2025 - 1:39 PM',
            user: 'Lisa Wong',
            userColor: 'bg-green-500',
            action: 'UPDATE',
            actionColor: 'bg-orange-500',
            affectedRecord: 'Payment: ABC Flooring Co',
            details: 'Marked payment as PAID - $5,000'
        },
        {
            id: 5,
            timestamp: 'Jul 17, 2025 - 1:38 PM',
            user: 'Michael Chen',
            userColor: 'bg-red-500',
            action: 'LOCK',
            actionColor: 'bg-purple-500',
            affectedRecord: 'Budget 25-01-0001',
            details: 'Budget locked for final approval - $83,500 total'
        },
        {
            id: 6,
            timestamp: 'Jul 17, 2025 - 1:37 PM',
            user: 'Sarah Johnson',
            userColor: 'bg-blue-500',
            action: 'UPDATE',
            actionColor: 'bg-orange-500',
            affectedRecord: 'Project 25-01-0001',
            details: 'Submitted budget for director approval'
        },
        {
            id: 7,
            timestamp: 'Jul 17, 2025 - 1:36 PM',
            user: 'Robert Smith',
            userColor: 'bg-orange-500',
            action: 'DENIED',
            actionColor: 'bg-red-500',
            affectedRecord: 'Budget 25-01-0001',
            details: 'UNAUTHORIZED: Attempted budget modification - BLOCKED'
        },
        {
            id: 8,
            timestamp: 'Jul 17, 2025 - 1:35 PM',
            user: 'Lisa Wong',
            userColor: 'bg-green-500',
            action: 'CREATE',
            actionColor: 'bg-green-500',
            affectedRecord: 'Receipt: Creative Graphics Invoice',
            details: 'Uploaded receipt for Creative Graphics Ltd - $1,500'
        },
        {
            id: 9,
            timestamp: 'Jul 17, 2025 - 1:34 PM',
            user: 'Sarah Johnson',
            userColor: 'bg-blue-500',
            action: 'UPDATE',
            actionColor: 'bg-orange-500',
            affectedRecord: 'Quote: Security Systems',
            details: 'Added quote from Security Systems Inc - $8,500'
        },
        {
            id: 10,
            timestamp: 'Jul 17, 2025 - 1:33 PM',
            user: 'Michael Chen',
            userColor: 'bg-red-500',
            action: 'LOGIN',
            actionColor: 'bg-teal-500',
            affectedRecord: 'System Access',
            details: 'Director login from IP: 192.168.1.100'
        }
    ];

    // Filter audit entries based on current filters
    const filteredEntries = auditEntries.filter(entry => {
        const matchesUser = filters.user === 'All Users' || entry.user === filters.user;
        const matchesAction = filters.actionType === 'All Actions' || entry.action === filters.actionType;
        const matchesSearch = filters.search === '' ||
            entry.details.toLowerCase().includes(filters.search.toLowerCase()) ||
            entry.affectedRecord.toLowerCase().includes(filters.search.toLowerCase()) ||
            entry.user.toLowerCase().includes(filters.search.toLowerCase());

        return matchesUser && matchesAction && matchesSearch;
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
        // Reset to first page when filters change
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters({
            dateRange: 'All Time',
            user: 'All Users',
            actionType: 'All Actions',
            search: ''
        });
        setCurrentPage(1);
    };

    const handleRefresh = () => {
        console.log('Refreshing audit data...');
        // Simulate refresh with a brief loading state
        setTimeout(() => {
            console.log('Data refreshed');
        }, 1000);
    };

    const handleExportCSV = () => {
        console.log('Exporting CSV...');
        // Create CSV content
        const csvContent = [
            ['Timestamp', 'User', 'Action', 'Affected Record', 'Details'],
            ...filteredEntries.map(entry => [
                entry.timestamp,
                entry.user,
                entry.action,
                entry.affectedRecord,
                entry.details
            ])
        ].map(row => row.join(',')).join('\n');

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-trail-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Calculate statistics based on filtered data
    const calculateStats = () => {
        const userCounts = {};
        const actionCounts = {};

        filteredEntries.forEach(entry => {
            userCounts[entry.user] = (userCounts[entry.user] || 0) + 1;
            actionCounts[entry.action] = (actionCounts[entry.action] || 0) + 1;
        });

        const mostActiveUser = Object.entries(userCounts).reduce((a, b) =>
            userCounts[a[0]] > userCounts[b[0]] ? a : b, ['', 0]
        );

        const mostCommonAction = Object.entries(actionCounts).reduce((a, b) =>
            actionCounts[a[0]] > actionCounts[b[0]] ? a : b, ['', 0]
        );

        return {
            mostActiveUser: mostActiveUser[0] || 'N/A',
            mostActiveUserCount: mostActiveUser[1] || 0,
            mostCommonAction: mostCommonAction[0] || 'N/A',
            mostCommonActionPercent: filteredEntries.length > 0 ?
                Math.round((mostCommonAction[1] / filteredEntries.length) * 100) : 0
        };
    };

    const stats = calculateStats();

    return (
        <div className="p-4">
            {/* Restricted Access Notice */}
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-3">
                    <i className="bi bi-lock-fill text-yellow-700"></i>
                    <span className="font-medium text-yellow-800">RESTRICTED ACCESS - ADMINISTRATORS & DIRECTORS ONLY</span>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
                <div className="bg-white rounded-lg border border-gray-300 p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
                    <div className="text-sm font-medium text-gray-600">TOTAL ENTRIES</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-300 p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">15</div>
                    <div className="text-sm font-medium text-gray-600">TODAY'S ENTRIES</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-300 p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">7</div>
                    <div className="text-sm font-medium text-gray-600">ACTIVE USERS</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-300 p-6 text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">3</div>
                    <div className="text-sm font-medium text-gray-600">CRITICAL EVENTS</div>
                </div>
            </div>

            {/* Audit Log Filters */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-funnel text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">AUDIT LOG FILTERS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">DATE RANGE</label>
                        <select
                            value={filters.dateRange}
                            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option>All Time</option>
                            <option>Today</option>
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>Custom Range</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">USER</label>
                        <select
                            value={filters.user}
                            onChange={(e) => handleFilterChange('user', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option>All Users</option>
                            <option>Michael Chen</option>
                            <option>Sarah Johnson</option>
                            <option>Lisa Wong</option>
                            <option>Robert Smith</option>
                            <option>System</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ACTION TYPE</label>
                        <select
                            value={filters.actionType}
                            onChange={(e) => handleFilterChange('actionType', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option>All Actions</option>
                            <option>CREATE</option>
                            <option>UPDATE</option>
                            <option>DELETE</option>
                            <option>EXPORT</option>
                            <option>LOGIN</option>
                            <option>LOCK</option>
                            <option>DENIED</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">SEARCH</label>
                        <input
                            type="text"
                            placeholder="Search records..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={handleClearFilters}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors w-full sm:w-auto"
                    >
                        <i className="bi bi-x-circle mr-2"></i>
                        Clear Filters
                    </button>
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors w-full sm:w-auto"
                    >
                        <i className="bi bi-arrow-clockwise mr-2"></i>
                        Refresh
                    </button>
                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors w-full sm:w-auto"
                    >
                        <i className="bi bi-file-earmark-spreadsheet mr-2"></i>
                        Export CSV
                    </button>
                </div>
            </div>

            {/* Audit Entries Table */}
            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden mb-4">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-300">
                    <div className="flex items-center gap-3">
                        <i className="bi bi-table text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">AUDIT ENTRIES</h2>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-slate-700 text-white">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">TIMESTAMP</th>
                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">USER</th>
                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">ACTION</th>
                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">AFFECTED RECORD</th>
                            <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider">DETAILS</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredEntries.map((entry, index) => (
                            <tr key={entry.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.timestamp}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${entry.userColor}`}>
                                        {entry.user}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-3 py-1 rounded text-xs font-medium text-white ${entry.actionColor}`}>
                                        {entry.action}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800 underline">
                                    {entry.affectedRecord}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{entry.details}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                <div className="text-sm text-gray-600 mb-2 sm:mb-0">
                    Showing {filteredEntries.length} of {auditEntries.length} entries
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-1 border border-gray-300 rounded text-gray-700">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Statistics Summary */}
            <div className="bg-white rounded-lg border border-gray-300 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-bar-chart-line text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">STATISTICS SUMMARY</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">Most Active User:</p>
                        <p className="text-lg font-semibold text-gray-900">{stats.mostActiveUser} ({stats.mostActiveUserCount} actions)</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Most Common Action:</p>
                        <p className="text-lg font-semibold text-gray-900">{stats.mostCommonAction} ({stats.mostCommonActionPercent}% of total)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuditTrail;


