import React, { useState } from 'react';
import { Card } from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const ReportingDashboard = () => {
    const [filters, setFilters] = useState({
        dateRange: 'All Time',
        category: 'All Categories',
        project: 'All Projects',
        customDate: ''
    });

    const projectData = {
        jobCode: '25-01-0001',
        projectName: 'Office Building Construction',
        totalBudget: '$83,500',
        actualCost: '$12,800',
        remaining: '$70,700',
        currentMargin: '84.7%'
    };

    const budgetVsActualData = [
        { category: 'Floor', budget: 17000, actual: 2500 },
        { category: 'Build Items', budget: 22000, actual: 0 },
        { category: 'Electrical', budget: 18000, actual: 7000 },
        { category: 'Plumbing', budget: 13500, actual: 3300 },
        { category: 'Graphics', budget: 5000, actual: 0 }
    ];

    const marginData = [
        { week: 'Week 1', margin: 78.5 },
        { week: 'Week 2', margin: 82.1 },
        { week: 'Week 3', margin: 84.3 },
        { week: 'Week 4', margin: 84.7 }
    ];

    const costByCategory = [
        { category: 'Floor', amount: 2500, color: 'bg-blue-500', percentage: 19.5 },
        { category: 'Electrical', amount: 7000, color: 'bg-orange-500', percentage: 54.7 },
        { category: 'Plumbing', amount: 3300, color: 'bg-teal-500', percentage: 25.8 },
        { category: 'Graphics', amount: 0, color: 'bg-red-500', percentage: 0 }
    ];

    const costTimelineData = [
        { date: 'Jan 14', amount: 1200 },
        { date: 'Jan 15', amount: 2800 },
        { date: 'Jan 16', amount: 4200 },
        { date: 'Jan 17', amount: 3800 }
    ];

    const detailedBreakdown = [
        {
            category: 'Floor',
            type: 'Material',
            budget: '$17,000',
            actual: '$2,500',
            variance: '+$14,500',
            variancePercent: '+85.3%',
            color: 'bg-yellow-500'
        },
        {
            category: 'Build Items',
            type: 'Material',
            budget: '$22,000',
            actual: '$0',
            variance: '+$22,000',
            variancePercent: '+100.0%',
            color: 'bg-yellow-500'
        },
        {
            category: 'Electrical',
            type: 'Subcontractor',
            budget: '$18,000',
            actual: '$7,000',
            variance: '+$11,000',
            variancePercent: '+61.1%',
            color: 'bg-blue-500'
        },
        {
            category: 'Plumbing',
            type: 'Subcontractor',
            budget: '$13,500',
            actual: '$3,300',
            variance: '+$10,200',
            variancePercent: '+75.6%',
            color: 'bg-blue-500'
        },
        {
            category: 'Graphics',
            type: 'Material',
            budget: '$5,000',
            actual: '$0',
            variance: '+$5,000',
            variancePercent: '+100.0%',
            color: 'bg-yellow-500'
        }
    ];

    const recentTimeline = [
        {
            id: 1,
            type: 'Payment',
            description: 'Graphics Payment to Creative Graphics Ltd $1,500',
            color: 'bg-yellow-500'
        },
        {
            id: 2,
            type: 'Invoice',
            description: 'Electrical work progress payment $3,500',
            color: 'bg-blue-500'
        },
        {
            id: 3,
            type: 'Quote',
            description: 'Floor material delivery $9,500',
            color: 'bg-yellow-500'
        },
        {
            id: 4,
            type: 'Payment',
            description: 'Plumbing installation payment $2,800',
            color: 'bg-blue-500'
        }
    ];

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const exportReport = (format) => {
        console.log(`Exporting report in ${format} format...`);
        // Implementation for export functionality
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Project Overview */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-clipboard-data text-blue-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">PROJECT OVERVIEW</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value={projectData.jobCode}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value={projectData.projectName}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">TOTAL BUDGET</label>
                                <input
                                    type="text"
                                    value={projectData.totalBudget}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">ACTUAL COST</label>
                                <input
                                    type="text"
                                    value={projectData.actualCost}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">REMAINING</label>
                                <input
                                    type="text"
                                    value={projectData.remaining}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">CURRENT MARGIN</label>
                            <input
                                type="text"
                                value={projectData.currentMargin}
                                readOnly
                                className="w-full sm:w-32 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 font-bold text-sm sm:text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Filters & Options */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">FILTERS & OPTIONS</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div>
                            <label className=" text-gray-600 px-2 py-1 text-xs font-medium mb-2 inline-block">
                                DATE RANGE
                            </label>
                            <select
                                value={filters.dateRange}
                                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                <option value="All Time">All Time</option>
                                <option value="Last 30 Days">Last 30 Days</option>
                                <option value="Last 90 Days">Last 90 Days</option>
                                <option value="This Year">This Year</option>
                            </select>
                        </div>

                        <div>
                            <label className=" text-gray-600 px-2 py-1 text-xs font-medium mb-2 inline-block">
                                CATEGORY
                            </label>
                            <select
                                value={filters.category}
                                onChange={(e) => handleFilterChange('category', e.target.value)}
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                <option value="All Categories">All Categories</option>
                                <option value="Material">Material</option>
                                <option value="Subcontractor">Subcontractor</option>
                                <option value="Labour">Labour</option>
                                <option value="Overhead">Overhead</option>
                            </select>
                        </div>

                        <div>
                            <label className=" text-gray-600 px-2 py-1 text-xs font-medium mb-2 inline-block">
                                PROJECT
                            </label>
                            <select
                                value={filters.project}
                                onChange={(e) => handleFilterChange('project', e.target.value)}
                                className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                <option value="All Projects">All Projects</option>
                                <option value="Office Building">Office Building</option>
                                <option value="Warehouse Project">Warehouse Project</option>
                            </select>
                        </div>

                        <div>
                            <label className=" text-gray-600 px-2 py-1 text-xs font-medium mb-2 inline-block">
                                CUSTOM DATE
                            </label>
                            <input
                                type="date"
                                value={filters.customDate}
                                onChange={(e) => handleFilterChange('customDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4">

                    {/* Budget vs Actual Chart */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="bi bi-bar-chart text-blue-600"></i>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">BUDGET VS ACTUAL</h3>
                        </div>

                        <div className="h-32 sm:h-48 mb-4">
                            <div className="flex items-end justify-between h-full gap-1 sm:gap-2">
                                {budgetVsActualData.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center flex-1">
                                        <div className="flex flex-col items-center justify-end h-full gap-1">
                                            <div
                                                className="w-full bg-blue-500 rounded-t"
                                                style={{ height: `${(item.budget / 25000) * 100}%` }}
                                            ></div>
                                            <div
                                                className="w-full bg-red-500 rounded-t"
                                                style={{ height: `${(item.actual / 25000) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-600 mt-2 text-center truncate">{item.category}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 sm:gap-4 text-xs mb-4">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded"></div>
                                <span>Budget</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded"></div>
                                <span>Actual</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                            <div className="bg-blue-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-blue-800">15.3%</div>
                                <div className="text-xs text-blue-600">Used</div>
                            </div>
                            <div className="bg-green-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-green-800">84.7%</div>
                                <div className="text-xs text-green-600">Remaining</div>
                            </div>
                            <div className="bg-gray-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-gray-800">5</div>
                                <div className="text-xs text-gray-600">Categories</div>
                            </div>
                        </div>
                    </div>

                    {/* Margin % by Project Chart */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="bi bi-graph-up text-green-600"></i>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">MARGIN % BY PROJECT</h3>
                        </div>

                        <div className="h-32 sm:h-48 mb-4 relative">
                            <div className="absolute inset-0 bg-green-50 rounded"></div>
                            <svg className="w-full h-full" viewBox="0 0 300 150">
                                <polyline
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="3"
                                    points="20,120 100,80 180,60 260,50"
                                />
                                <circle cx="20" cy="120" r="4" fill="#10b981" />
                                <circle cx="100" cy="80" r="4" fill="#10b981" />
                                <circle cx="180" cy="60" r="4" fill="#10b981" />
                                <circle cx="260" cy="50" r="4" fill="#10b981" />
                            </svg>
                            <div className="absolute bottom-2 left-0 right-0 flex justify-between text-xs text-gray-600 px-2 sm:px-4">
                                <span>Week 1</span>
                                <span>Week 2</span>
                                <span>Week 3</span>
                                <span>Week 4</span>
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 sm:gap-4 text-xs mb-4">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded"></div>
                                <span>Margin %</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded"></div>
                                <span>Target Line</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                            <div className="bg-green-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-green-800">84.7%</div>
                                <div className="text-xs text-green-600">Current</div>
                            </div>
                            <div className="bg-blue-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-blue-800">32%</div>
                                <div className="text-xs text-blue-600">Target</div>
                            </div>
                            <div className="bg-yellow-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-yellow-800">+52.7%</div>
                                <div className="text-xs text-yellow-600">Above Target</div>
                            </div>
                        </div>
                    </div>

                    {/* Cost by Category Pie Chart */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="bi bi-pie-chart text-orange-600"></i>
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">COST BY CATEGORY</h3>
                        </div>

                        <div className="h-32 sm:h-48 mb-4 flex items-center justify-center">
                            <div className="relative w-20 h-20 sm:w-32 sm:h-32">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="20"/>
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20"
                                            strokeDasharray="54.7 100" strokeDashoffset="0"/>
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" strokeWidth="20"
                                            strokeDasharray="25.8 100" strokeDashoffset="-54.7"/>
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#14b8a6" strokeWidth="20"
                                            strokeDasharray="19.5 100" strokeDashoffset="-80.5"/>
                                </svg>
                            </div>
                        </div>

                        <div className="space-y-1 sm:space-y-2 mb-4">
                            {costByCategory.map((item, index) => (
                                <div key={index} className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 sm:w-3 sm:h-3 ${item.color} rounded`}></div>
                                        <span className="text-gray-700 truncate">{item.category}</span>
                                    </div>
                                    <span className="font-medium text-gray-900">${item.amount.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center">
                            <div className="bg-orange-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-orange-800">$12.8K</div>
                                <div className="text-xs text-orange-600">Total</div>
                            </div>
                            <div className="bg-blue-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-blue-800">4</div>
                                <div className="text-xs text-blue-600">Categories</div>
                            </div>
                            <div className="bg-green-100 p-1 sm:p-2 rounded">
                                <div className="text-xs sm:text-sm font-bold text-green-800">$7K</div>
                                <div className="text-xs text-green-600">Highest</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Breakdown */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-table text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">DETAILED BREAKDOWN</h2>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block lg:hidden space-y-3">
                        {detailedBreakdown.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-3">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-3 h-3 ${item.color} rounded`}></span>
                                        <span className="font-medium text-gray-900 text-sm">{item.category}</span>
                                    </div>
                                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{item.type}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <span className="text-gray-600">Budget:</span>
                                        <span className="font-medium text-gray-900 ml-1">{item.budget}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Actual:</span>
                                        <span className="font-medium text-gray-900 ml-1">{item.actual}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Variance:</span>
                                        <span className="font-medium text-green-600 ml-1">{item.variance}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">%:</span>
                                        <span className="font-medium text-green-600 ml-1">{item.variancePercent}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">CATEGORY</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">TYPE</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700 text-sm">BUDGET</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700 text-sm">ACTUAL</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700 text-sm">VARIANCE</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-700 text-sm">VARIANCE %</th>
                            </tr>
                            </thead>
                            <tbody>
                            {detailedBreakdown.map((item, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <span className={`w-3 h-3 ${item.color} rounded`}></span>
                                            <span className="font-medium text-gray-900">{item.category}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                {item.type}
                                            </span>
                                    </td>
                                    <td className="py-3 px-4 text-right font-medium text-gray-900">{item.budget}</td>
                                    <td className="py-3 px-4 text-right font-medium text-gray-900">{item.actual}</td>
                                    <td className="py-3 px-4 text-right font-medium text-green-600">{item.variance}</td>
                                    <td className="py-3 px-4 text-right font-medium text-green-600">{item.variancePercent}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Timeline */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-clock-history text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">RECENT TIMELINE</h2>
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                        {recentTimeline.map((item) => (
                            <div key={item.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                                <div className={`w-3 h-3 ${item.color} rounded-full flex-shrink-0 mt-1`}></div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                                        <span className="font-medium text-gray-900 text-sm">{item.type}</span>
                                        <span className="text-xs text-gray-500">Jan 15, 2025</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Export Options */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-download text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">EXPORT OPTIONS</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            color="failure"
                            size="sm"
                            onClick={() => exportReport('PDF')}
                            className="flex items-center justify-center"
                        >
                            <i className="bi bi-file-earmark-pdf mr-1"></i>
                            PDF
                        </Button>

                        <Button
                            color="success"
                            size="sm"
                            onClick={() => exportReport('Excel')}
                            className="flex items-center justify-center"
                        >
                            <i className="bi bi-file-earmark-excel mr-1"></i>
                            Excel
                        </Button>

                        <Button
                            color="primary"
                            size="sm"
                            onClick={() => exportReport('CSV')}
                            className="flex items-center justify-center"
                        >
                            <i className="bi bi-file-earmark-text mr-1"></i>
                            CSV
                        </Button>

                        <Button
                            color="gray"
                            size="sm"
                            onClick={() => exportReport('Print')}
                            className="flex items-center justify-center"
                        >
                            <i className="bi bi-printer mr-1"></i>
                            Print
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ReportingDashboard;

