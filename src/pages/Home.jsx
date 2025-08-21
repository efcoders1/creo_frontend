import React, { useState, useMemo } from 'react';
import Header from '/components/header.jsx';
import Sidebar from '/components/sidebar.jsx';

function Home() {
    // Filter states
    const [projectNameFilter, setProjectNameFilter] = useState('');
    const [clientFilter, setClientFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [completionMonthFilter, setCompletionMonthFilter] = useState('all');

    // Project data
    const projectsData = [
        {
            id: 1,
            name: 'Downtown Office Complex',
            client: 'Metro Corp',
            revenue: 450000,
            cost: 95000,
            margin: 78.9,
            status: 'Completed',
            completion: 'Dec 28',
            completionMonth: 'December'
        },
        {
            id: 2,
            name: 'Residential Tower A',
            client: 'Urban Developers',
            revenue: 320000,
            cost: 75000,
            margin: 76.6,
            status: 'Completed',
            completion: 'Dec 22',
            completionMonth: 'December'
        },
        {
            id: 3,
            name: 'Shopping Mall Renovation',
            client: 'Retail Solutions',
            revenue: 280000,
            cost: 58000,
            margin: 79.3,
            status: 'Completed',
            completion: 'Dec 20',
            completionMonth: 'December'
        },
        {
            id: 4,
            name: 'Hospital Wing Extension',
            client: 'HealthCare Systems',
            revenue: 380000,
            cost: 82000,
            margin: 78.4,
            status: 'Completed',
            completion: 'Dec 18',
            completionMonth: 'December'
        },
        {
            id: 5,
            name: 'School Modernization',
            client: 'Education Board',
            revenue: 195000,
            cost: 45000,
            margin: 76.9,
            status: 'Completed',
            completion: 'Dec 15',
            completionMonth: 'December'
        },
        {
            id: 6,
            name: 'Warehouse Facility',
            client: 'Logistics Plus',
            revenue: 165000,
            cost: 38000,
            margin: 77.0,
            status: 'Completed',
            completion: 'Dec 12',
            completionMonth: 'December'
        },
        {
            id: 7,
            name: 'Corporate Headquarters',
            client: 'TechFlow Inc',
            revenue: 425000,
            cost: 88000,
            margin: 79.3,
            status: 'Completed',
            completion: 'Dec 10',
            completionMonth: 'December'
        },
        {
            id: 8,
            name: 'Community Center',
            client: 'City Council',
            revenue: 145000,
            cost: 32000,
            margin: 77.9,
            status: 'Completed',
            completion: 'Dec 8',
            completionMonth: 'December'
        },
        {
            id: 9,
            name: 'Hotel Renovation',
            client: 'Hospitality Group',
            revenue: 235000,
            cost: 52000,
            margin: 77.9,
            status: 'Completed',
            completion: 'Dec 5',
            completionMonth: 'December'
        },
        {
            id: 10,
            name: 'Manufacturing Plant',
            client: 'Industrial Corp',
            revenue: 185000,
            cost: 42000,
            margin: 77.3,
            status: 'In Progress',
            completion: 'Dec 30',
            completionMonth: 'December'
        },
        {
            id: 11,
            name: 'Sports Complex',
            client: 'Recreation Dept',
            revenue: 155000,
            cost: 35000,
            margin: 77.4,
            status: 'In Progress',
            completion: 'Jan 5',
            completionMonth: 'January'
        },
        {
            id: 12,
            name: 'Retail Store',
            client: 'Fashion Forward',
            revenue: 125000,
            cost: 28000,
            margin: 77.6,
            status: 'Completed',
            completion: 'Dec 3',
            completionMonth: 'December'
        }
    ];

    // Filter options
    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'Completed', label: 'Completed' },
        { value: 'In Progress', label: 'In Progress' }
    ];

    const completionMonthOptions = [
        { value: 'all', label: 'All Months' },
        { value: 'December', label: 'December' },
        { value: 'January', label: 'January' }
    ];

    // Filtered projects
    const filteredProjects = useMemo(() => {
        return projectsData.filter(project => {
            const matchesProjectName = project.name.toLowerCase().includes(projectNameFilter.toLowerCase());
            const matchesClient = project.client.toLowerCase().includes(clientFilter.toLowerCase());
            const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
            const matchesCompletionMonth = completionMonthFilter === 'all' || project.completionMonth === completionMonthFilter;

            return matchesProjectName && matchesClient && matchesStatus && matchesCompletionMonth;
        });
    }, [projectNameFilter, clientFilter, statusFilter, completionMonthFilter, projectsData]);

    // Calculate filtered summary
    const filteredSummary = useMemo(() => {
        const totalProjects = filteredProjects.length;
        const totalRevenue = filteredProjects.reduce((sum, project) => sum + project.revenue, 0);
        const avgMargin = totalProjects > 0
            ? filteredProjects.reduce((sum, project) => sum + project.margin, 0) / totalProjects
            : 0;
        const completedProjects = filteredProjects.filter(project => project.status === 'Completed').length;

        return {
            totalProjects,
            totalRevenue,
            avgMargin,
            completedProjects
        };
    }, [filteredProjects]);

    // Clear all filters
    const clearAllFilters = () => {
        setProjectNameFilter('');
        setClientFilter('');
        setStatusFilter('all');
        setCompletionMonthFilter('all');
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (amount >= 1000000) {
            return `$${(amount / 1000000).toFixed(1)}M`;
        } else if (amount >= 1000) {
            return `$${(amount / 1000).toFixed(0)}K`;
        } else {
            return `$${amount.toLocaleString()}`;
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-3 space-y-4 sm:space-y-6">
                    {/* Top Row - Previous Month Overview */}
                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">


                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">

                            {/* Left side */}
                            <div className="flex items-center gap-2 mb-2 sm:mb-0">
                                <i className="bi bi-calendar-month text-blue-600 text-sm sm:text-base"></i>
                                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                                    Previous Month Overview
                                </h2>
                            </div>

                            {/* Right side */}
                            <div className="text-xs sm:text-sm text-gray-500">
                                December 2024
                            </div>
                        </div>


                        {/* Month Summary Cards - Updated with filtered data */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                                <div className="text-lg sm:text-2xl font-bold text-blue-600">{filteredSummary.totalProjects}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Total Projects</div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                                <div className="text-lg sm:text-2xl font-bold text-green-600">{formatCurrency(filteredSummary.totalRevenue)}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Total Revenue</div>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                                <div className="text-lg sm:text-2xl font-bold text-purple-600">{filteredSummary.avgMargin.toFixed(1)}%</div>
                                <div className="text-xs sm:text-sm text-gray-600">Avg Margin</div>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-3 sm:p-4">
                                <div className="text-lg sm:text-2xl font-bold text-orange-600">{filteredSummary.completedProjects}</div>
                                <div className="text-xs sm:text-sm text-gray-600">Completed</div>
                            </div>
                        </div>
                    </div>

                    {/* Previous Month Projects with Margins */}
                    <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                            <div className="flex items-center gap-2">
                                <i className="bi bi-bar-chart text-green-600 text-sm sm:text-base"></i>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Previous Month Projects & Margins</h3>
                            </div>
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>

                        {/* Filter Section */}
                        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                            <div className="flex items-center gap-3 mb-3 sm:mb-4">
                                <i className="bi bi-funnel text-gray-600 text-sm sm:text-base"></i>
                                <h4 className="text-sm sm:text-md font-semibold text-gray-900">Filter Projects</h4>
                                <button
                                    onClick={clearAllFilters}
                                    className="ml-auto text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Clear All Filters
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                {/* Project Name Filter */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Project Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Search by project name..."
                                        value={projectNameFilter}
                                        onChange={(e) => setProjectNameFilter(e.target.value)}
                                        className="w-full px-2 sm:px-3 text-gray-600 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>

                                {/* Client Filter */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Client
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Search by client name..."
                                        value={clientFilter}
                                        onChange={(e) => setClientFilter(e.target.value)}
                                        className="w-full px-2 sm:px-3 text-gray-600 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>

                                {/* Status Filter */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    >
                                        {statusOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Completion Month Filter */}
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Completion Month
                                    </label>
                                    <select
                                        value={completionMonthFilter}
                                        onChange={(e) => setCompletionMonthFilter(e.target.value)}
                                        className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    >
                                        {completionMonthOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(projectNameFilter || clientFilter || statusFilter !== 'all' || completionMonthFilter !== 'all') && (
                                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-xs sm:text-sm text-gray-600">Active filters:</span>
                                        {projectNameFilter && (
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                                Project: "{projectNameFilter}"
                                            </span>
                                        )}
                                        {clientFilter && (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                                Client: "{clientFilter}"
                                            </span>
                                        )}
                                        {statusFilter !== 'all' && (
                                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                                                Status: {statusFilter}
                                            </span>
                                        )}
                                        {completionMonthFilter !== 'all' && (
                                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                                                Month: {completionMonthFilter}
                                            </span>
                                        )}
                                        <span className="text-xs sm:text-sm text-gray-500">
                                            ({filteredProjects.length} of {projectsData.length} projects)
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Projects Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs sm:text-sm">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Project Name</th>
                                    <th className="text-left py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Client</th>
                                    <th className="text-right py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Revenue</th>
                                    <th className="text-right py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Cost</th>
                                    <th className="text-right py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Margin</th>
                                    <th className="text-center py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Status</th>
                                    <th className="text-center py-2 sm:py-3 text-gray-600 font-medium text-xs sm:text-sm">Completion</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-900">
                                {filteredProjects.length > 0 ? (
                                    filteredProjects.map((project) => (
                                        <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-2 sm:py-3 font-medium text-xs sm:text-sm">{project.name}</td>
                                            <td className="py-2 sm:py-3 text-xs sm:text-sm">{project.client}</td>
                                            <td className="text-right py-2 sm:py-3 text-xs sm:text-sm">${project.revenue.toLocaleString()}</td>
                                            <td className="text-right py-2 sm:py-3 text-xs sm:text-sm">${project.cost.toLocaleString()}</td>
                                            <td className="text-right py-2 sm:py-3">
                                                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                                                        project.margin >= 78
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {project.margin}%
                                                    </span>
                                            </td>
                                            <td className="text-center py-2 sm:py-3">
                                                    <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                                                        project.status === 'Completed'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {project.status}
                                                    </span>
                                            </td>
                                            <td className="text-center py-2 sm:py-3 text-xs sm:text-sm">{project.completion}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-6 sm:py-8 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <i className="bi bi-search text-lg sm:text-2xl"></i>
                                                <p className="text-xs sm:text-sm">No projects found matching your filters.</p>
                                                <button
                                                    onClick={clearAllFilters}
                                                    className="text-blue-600 hover:text-blue-800 font-medium text-xs sm:text-sm"
                                                >
                                                    Clear all filters to see all projects
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Key Metrics Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                        {/* Live Margin Card */}
                        <div className="bg-green-500 rounded-xl p-4 sm:p-6 text-white relative overflow-hidden xl:col-span-1">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs sm:text-sm font-medium">LIVE</span>
                                </div>
                                <i className="bi bi-graph-up text-xl sm:text-2xl opacity-80"></i>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">78.5%</div>
                            <div className="text-green-100 text-xs sm:text-sm">Current Margin</div>
                            <div className="absolute -bottom-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-white bg-opacity-10 rounded-full"></div>
                        </div>

                        {/* Budget vs Actual Chart */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Budget vs Actual</h3>
                                <i className="bi bi-bar-chart text-blue-600 text-sm sm:text-base"></i>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Budget</span>
                                    <span className="font-semibold text-sm sm:text-base">$2.8M</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Actual</span>
                                    <span className="font-semibold text-green-600 text-sm sm:text-base">$2.4M</span>
                                </div>
                                <div className="text-xs text-gray-500">15% under budget</div>
                            </div>
                        </div>

                        {/* Cost Variance */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Cost Variance</h3>
                                <i className="bi bi-arrow-down-circle text-green-600 text-sm sm:text-base"></i>
                            </div>
                            <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1 sm:mb-2">-$400K</div>
                            <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Below projected costs</div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-xs text-gray-500">14.3% cost savings</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Row - Additional Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        {/* Project Timeline */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Project Timeline</h3>
                                <i className="bi bi-calendar-check text-purple-600 text-sm sm:text-base"></i>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">On Schedule</span>
                                    <span className="font-semibold text-green-600 text-sm sm:text-base">8 projects</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Ahead of Schedule</span>
                                    <span className="font-semibold text-blue-600 text-sm sm:text-base">3 projects</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Behind Schedule</span>
                                    <span className="font-semibold text-red-600 text-sm sm:text-base">1 project</span>
                                </div>
                            </div>
                        </div>

                        {/* Resource Utilization */}
                        <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Resource Utilization</h3>
                                <i className="bi bi-people text-orange-600 text-sm sm:text-base"></i>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Team Capacity</span>
                                    <span className="font-semibold text-sm sm:text-base">92%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '92%'}}></div>
                                </div>
                                <div className="text-xs text-gray-500">Optimal utilization range</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;