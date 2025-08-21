import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ViewCategoryPage from './ViewBudgetCategoryPage';
import EditCategoryPage from './EditBudgetCategoryPage';
import DeleteConfirmationModal from './DeleteBudgetConfirmationModal';

const BudgetPlanningListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [currentView, setCurrentView] = useState('listing'); // 'listing', 'view', 'edit'
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [budgetToDelete, setBudgetToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Dummy budget planning data
    const [budgets, setBudgets] = useState([
        {
            id: 1,
            jobCode: '25-01-0001',
            projectName: 'Office Building Construction',
            projectManager: 'Sarah Johnson',
            budgetStatus: 'approved',
            totalBudgeted: 78000,
            totalScopeChanges: 500,
            finalBudget: 78500,
            budgetVariance: '+0.6%',
            varianceColor: 'text-green-600',
            createdDate: '2025-01-15',
            lastUpdated: '2025-01-18',
            approvedBy: 'Director Smith',
            approvedDate: '2025-01-19',
            categories: [
                { name: 'FLOOR', budgeted: 15000, scopeChange: 2000, type: 'MATERIAL' },
                { name: 'BUILD ITEMS', budgeted: 25000, scopeChange: -3000, type: 'MATERIAL' },
                { name: 'REFURB COST', budgeted: 8000, scopeChange: 0, type: 'LABOUR' },
                { name: 'PLUMBING', budgeted: 12000, scopeChange: 1500, type: 'SUBCONTRACTOR' },
                { name: 'ELECTRICAL', budgeted: 18000, scopeChange: 0, type: 'SUBCONTRACTOR' }
            ],
            progress: 85,
            actualSpent: 65200,
            remainingBudget: 13300
        },
        {
            id: 2,
            jobCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            projectManager: 'Michael Chen',
            budgetStatus: 'draft',
            totalBudgeted: 125000,
            totalScopeChanges: 8500,
            finalBudget: 133500,
            budgetVariance: '+6.8%',
            varianceColor: 'text-yellow-600',
            createdDate: '2025-01-12',
            lastUpdated: '2025-01-17',
            approvedBy: null,
            approvedDate: null,
            categories: [
                { name: 'DEMOLITION', budgeted: 30000, scopeChange: 5000, type: 'LABOUR' },
                { name: 'BUILD ITEMS', budgeted: 45000, scopeChange: 2000, type: 'MATERIAL' },
                { name: 'ELECTRICAL', budgeted: 25000, scopeChange: 1500, type: 'SUBCONTRACTOR' },
                { name: 'PLUMBING', budgeted: 15000, scopeChange: 0, type: 'SUBCONTRACTOR' },
                { name: 'MANAGEMENT FEE', budgeted: 10000, scopeChange: 0, type: 'OVERHEAD' }
            ],
            progress: 0,
            actualSpent: 0,
            remainingBudget: 133500
        },
        {
            id: 3,
            jobCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            projectManager: 'Emma Thompson',
            budgetStatus: 'approved',
            totalBudgeted: 95000,
            totalScopeChanges: -2500,
            finalBudget: 92500,
            budgetVariance: '-2.6%',
            varianceColor: 'text-red-600',
            createdDate: '2025-01-08',
            lastUpdated: '2025-01-14',
            approvedBy: 'Director Smith',
            approvedDate: '2025-01-15',
            categories: [
                { name: 'FLOOR', budgeted: 20000, scopeChange: -1000, type: 'MATERIAL' },
                { name: 'GRAPHICS', budgeted: 15000, scopeChange: -1500, type: 'MATERIAL' },
                { name: 'ELECTRICAL', budgeted: 25000, scopeChange: 0, type: 'SUBCONTRACTOR' },
                { name: 'AUDIO VISUAL', budgeted: 20000, scopeChange: 0, type: 'SUBCONTRACTOR' },
                { name: 'REFURB COST', budgeted: 15000, scopeChange: 0, type: 'LABOUR' }
            ],
            progress: 75,
            actualSpent: 68400,
            remainingBudget: 24100
        },
        {
            id: 4,
            jobCode: '25-01-0004',
            projectName: 'Hospital Wing Extension',
            projectManager: 'David Wilson',
            budgetStatus: 'pending_review',
            totalBudgeted: 450000,
            totalScopeChanges: 25000,
            finalBudget: 475000,
            budgetVariance: '+5.6%',
            varianceColor: 'text-yellow-600',
            createdDate: '2025-01-10',
            lastUpdated: '2025-01-16',
            approvedBy: null,
            approvedDate: null,
            categories: [
                { name: 'BUILD ITEMS', budgeted: 180000, scopeChange: 15000, type: 'MATERIAL' },
                { name: 'ELECTRICAL', budgeted: 85000, scopeChange: 5000, type: 'SUBCONTRACTOR' },
                { name: 'PLUMBING', budgeted: 65000, scopeChange: 3000, type: 'SUBCONTRACTOR' },
                { name: 'HVAC SYSTEMS', budgeted: 90000, scopeChange: 2000, type: 'SUBCONTRACTOR' },
                { name: 'MANAGEMENT FEE', budgeted: 30000, scopeChange: 0, type: 'OVERHEAD' }
            ],
            progress: 0,
            actualSpent: 0,
            remainingBudget: 475000
        },
        {
            id: 5,
            jobCode: '25-01-0005',
            projectName: 'School Playground Upgrade',
            projectManager: 'Robert Smith',
            budgetStatus: 'completed',
            totalBudgeted: 35000,
            totalScopeChanges: 1200,
            finalBudget: 36200,
            budgetVariance: '+3.4%',
            varianceColor: 'text-green-600',
            createdDate: '2024-08-15',
            lastUpdated: '2024-12-20',
            approvedBy: 'Director Smith',
            approvedDate: '2024-08-20',
            categories: [
                { name: 'LANDSCAPING', budgeted: 20000, scopeChange: 800, type: 'SUBCONTRACTOR' },
                { name: 'BUILD ITEMS', budgeted: 10000, scopeChange: 400, type: 'MATERIAL' },
                { name: 'SAFETY EQUIPMENT', budgeted: 5000, scopeChange: 0, type: 'MATERIAL' }
            ],
            progress: 100,
            actualSpent: 35800,
            remainingBudget: 400
        },
        {
            id: 6,
            jobCode: '25-01-0006',
            projectName: 'Residential Complex Phase 2',
            projectManager: 'Sarah Johnson',
            budgetStatus: 'approved',
            totalBudgeted: 850000,
            totalScopeChanges: 45000,
            finalBudget: 895000,
            budgetVariance: '+5.3%',
            varianceColor: 'text-yellow-600',
            createdDate: '2025-01-05',
            lastUpdated: '2025-01-12',
            approvedBy: 'Director Smith',
            approvedDate: '2025-01-13',
            categories: [
                { name: 'BUILD ITEMS', budgeted: 350000, scopeChange: 20000, type: 'MATERIAL' },
                { name: 'ELECTRICAL', budgeted: 150000, scopeChange: 10000, type: 'SUBCONTRACTOR' },
                { name: 'PLUMBING', budgeted: 120000, scopeChange: 8000, type: 'SUBCONTRACTOR' },
                { name: 'HVAC SYSTEMS', budgeted: 180000, scopeChange: 7000, type: 'SUBCONTRACTOR' },
                { name: 'MANAGEMENT FEE', budgeted: 50000, scopeChange: 0, type: 'OVERHEAD' }
            ],
            progress: 35,
            actualSpent: 285000,
            remainingBudget: 610000
        }
    ]);

    const statusOptions = [
        { value: 'all', label: 'ALL STATUS', color: 'bg-gray-600' },
        { value: 'draft', label: 'DRAFT', color: 'bg-gray-600' },
        { value: 'pending_review', label: 'PENDING REVIEW', color: 'bg-yellow-600' },
        { value: 'approved', label: 'APPROVED', color: 'bg-green-600' },
        { value: 'completed', label: 'COMPLETED', color: 'bg-blue-600' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'project', label: 'Project Name' },
        { value: 'budget', label: 'Budget Amount' },
        { value: 'variance', label: 'Budget Variance' },
        { value: 'manager', label: 'Project Manager' }
    ];

    // Filter and sort budgets
    const filteredBudgets = budgets
        .filter(budget => {
            const matchesSearch = budget.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                budget.jobCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                budget.projectManager.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || budget.budgetStatus === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdDate) - new Date(a.createdDate);
                case 'oldest':
                    return new Date(a.createdDate) - new Date(b.createdDate);
                case 'project':
                    return a.projectName.localeCompare(b.projectName);
                case 'budget':
                    return b.finalBudget - a.finalBudget;
                case 'variance':
                    return parseFloat(b.budgetVariance.replace(/[+%]/g, '')) - parseFloat(a.budgetVariance.replace(/[+%]/g, ''));
                case 'manager':
                    return a.projectManager.localeCompare(b.projectManager);
                default:
                    return 0;
            }
        });

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-600';
            case 'pending_review': return 'bg-yellow-600';
            case 'approved': return 'bg-green-600';
            case 'completed': return 'bg-blue-600';
            default: return 'bg-gray-600';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'pending_review': return 'PENDING REVIEW';
            default: return status.toUpperCase();
        }
    };

    const getProgressColor = (progress) => {
        if (progress === 0) return 'bg-gray-300';
        if (progress < 30) return 'bg-red-500';
        if (progress < 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const handleViewBudget = (budgetId) => {
        const budget = budgets.find(b => b.id === budgetId);
        if (budget) {
            setSelectedBudget(budget);
            setCurrentView('view');
        }
    };

    const handleEditBudget = (budgetId) => {
        const budget = budgets.find(b => b.id === budgetId);
        if (budget) {
            setSelectedBudget(budget);
            setCurrentView('edit');
        }
    };

    const handleDeleteBudget = (budgetId) => {
        const budget = budgets.find(b => b.id === budgetId);
        if (budget) {
            setBudgetToDelete(budget);
            setShowDeleteModal(true);
        }
    };

    const handleConfirmDelete = async () => {
        if (!budgetToDelete) return;

        setIsDeleting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Remove budget from state
            setBudgets(prev => prev.filter(b => b.id !== budgetToDelete.id));

            // Close modal and reset state
            setShowDeleteModal(false);
            setBudgetToDelete(null);

            // Show success message (you could use a toast notification here)
            alert(`Budget "${budgetToDelete.projectName}" has been deleted successfully.`);
        } catch (error) {
            console.error('Error deleting budget:', error);
            alert('Error deleting budget. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleBackToListing = () => {
        setCurrentView('listing');
        setSelectedBudget(null);
    };

    const handleSaveBudget = async (updatedBudget) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update budget in state
            setBudgets(prev => prev.map(b =>
                b.id === updatedBudget.id ? updatedBudget : b
            ));

            // Go back to listing
            setCurrentView('listing');
            setSelectedBudget(null);

            // Show success message
            alert(`Budget "${updatedBudget.projectName}" has been updated successfully.`);
        } catch (error) {
            console.error('Error saving budget:', error);
            throw error; // Re-throw to let EditCategoryPage handle it
        }
    };

    const handleCreateNew = () => {
        console.log('Creating new budget');
        // Navigate to budget creation form
    };

    const navigate = useNavigate();

    // Render different views based on currentView state
    if (currentView === 'view') {
        return (
            <ViewCategoryPage
                budget={selectedBudget}
                onBack={handleBackToListing}
                onEdit={handleEditBudget}
            />
        );
    }

    if (currentView === 'edit') {
        return (
            <EditCategoryPage
                budget={selectedBudget}
                onBack={handleBackToListing}
                onSave={handleSaveBudget}
                onCancel={handleBackToListing}
            />
        );
    }

    // Default listing view
    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-calculator text-blue-600 text-lg"></i>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">BUDGET PLANNING</h1>
                        </div>
                        <button 
                            onClick={() => navigate('/budget-planning')} 
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-plus-circle mr-2"></i>
                            CREATE NEW BUDGET
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Manage project budgets and track financial planning</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">FILTERS & SEARCH</h2>
                    </div>

                    <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 sm:gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEARCH BUDGETS
                            </label>
                            <input
                                type="text"
                                placeholder="Search by project, code, or manager..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                FILTER BY STATUS
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SORT BY
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                {sortOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Budgets Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredBudgets.map((budget) => (
                        <div key={budget.id} className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 hover:shadow-lg transition-shadow">

                            {/* Budget Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                                        {budget.projectName}
                                    </h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                                        <span className="text-xs sm:text-sm font-medium text-gray-600">Job Code:</span>
                                        <span className="text-xs sm:text-sm font-bold text-blue-600">{budget.jobCode}</span>
                                    </div>
                                </div>
                                <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ml-2 ${getStatusColor(budget.budgetStatus)} whitespace-nowrap`}>
                                    {getStatusLabel(budget.budgetStatus)}
                                </div>
                            </div>

                            {/* Budget Details */}
                            <div className="space-y-2 sm:space-y-3 mb-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Project Manager:</span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-900 truncate ml-2">{budget.projectManager}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Final Budget:</span>
                                    <span className="text-xs sm:text-sm font-bold text-gray-900">
                                        ${budget.finalBudget.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Budget Variance:</span>
                                    <span className={`text-xs sm:text-sm font-medium ${budget.varianceColor}`}>
                                        {budget.budgetVariance}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm text-gray-600">Categories:</span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-900">
                                        {budget.categories.length}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs sm:text-sm font-medium text-gray-600">Progress</span>
                                    <span className="text-xs sm:text-sm font-medium text-gray-900">{budget.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full ${getProgressColor(budget.progress)}`}
                                        style={{ width: `${budget.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => handleViewBudget(budget.id)}
                                    className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <i className="bi bi-eye mr-1 sm:mr-2"></i>
                                    VIEW
                                </button>
                                <button
                                    onClick={() => handleEditBudget(budget.id)}
                                    className="flex-1 px-3 sm:px-4 py-2 bg-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    <i className="bi bi-pencil mr-1 sm:mr-2"></i>
                                    EDIT
                                </button>
                                <button
                                    onClick={() => handleDeleteBudget(budget.id)}
                                    className="px-3 sm:px-4 py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredBudgets.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-search text-3xl sm:text-4xl text-gray-400 mb-4"></i>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">No budgets found</h3>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            No budgets match your current search and filter criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                                setSortBy('newest');
                            }}
                            className="px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => {
                    setShowDeleteModal(false);
                    setBudgetToDelete(null);
                }}
                onConfirm={handleConfirmDelete}
                budget={budgetToDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default BudgetPlanningListing;

