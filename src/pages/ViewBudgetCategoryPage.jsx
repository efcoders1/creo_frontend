import React from 'react';

const ViewCategoryPage = ({ budget, onBack, onEdit }) => {
    if (!budget) return null;

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

    const getCategoryTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'bg-yellow-500';
            case 'MATERIAL': return 'bg-green-500';
            case 'SUBCONTRACTOR': return 'bg-blue-500';
            case 'OVERHEAD': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <i className="bi bi-arrow-left text-gray-600 text-lg"></i>
                        </button>
                        <i className="bi bi-eye text-blue-600 text-lg"></i>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">VIEW BUDGET DETAILS</h1>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => onEdit(budget)}
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-pencil mr-2"></i>
                            EDIT
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Detailed view of budget planning and categories</p>
            </div>

            {/* Project Overview */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-building text-gray-600 text-lg"></i>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PROJECT OVERVIEW</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Left Column */}
                    <div className="space-y-4 sm:space-y-6">
                        <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{budget.projectName}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-600">Job Code:</span>
                                    <span className="text-sm font-bold text-blue-600">{budget.jobCode}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium text-white self-start ${getStatusColor(budget.budgetStatus)}`}>
                                    {getStatusLabel(budget.budgetStatus)}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <span className="text-sm font-medium text-gray-600">Project Manager</span>
                                <p className="text-gray-900 font-medium text-sm sm:text-base">{budget.projectManager}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Created Date</span>
                                <p className="text-gray-900 text-sm sm:text-base">{formatDate(budget.createdDate)}</p>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-600">Last Updated</span>
                                <p className="text-gray-900 text-sm sm:text-base">{formatDate(budget.lastUpdated)}</p>
                            </div>
                            {budget.approvedBy && (
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Approved By</span>
                                    <p className="text-gray-900 text-sm sm:text-base">{budget.approvedBy}</p>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-600">Project Progress</span>
                                <span className="text-sm font-medium text-gray-900">{budget.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                                <div
                                    className={`h-2 sm:h-3 rounded-full ${getProgressColor(budget.progress)}`}
                                    style={{ width: `${budget.progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Budget Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">BUDGET SUMMARY</h4>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm sm:text-base">Total Budgeted:</span>
                                <span className="font-semibold text-gray-900 text-sm sm:text-base">{formatCurrency(budget.totalBudgeted)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm sm:text-base">Scope Changes:</span>
                                <span className={`font-semibold text-sm sm:text-base ${budget.totalScopeChanges >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {budget.totalScopeChanges >= 0 ? '+' : ''}{formatCurrency(budget.totalScopeChanges)}
                                </span>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="flex justify-between items-center">
                                <span className="text-gray-900 font-medium text-sm sm:text-base">Final Budget:</span>
                                <span className="font-bold text-base sm:text-lg text-gray-900">{formatCurrency(budget.finalBudget)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm sm:text-base">Budget Variance:</span>
                                <span className={`font-semibold text-sm sm:text-base ${budget.varianceColor}`}>{budget.budgetVariance}</span>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm sm:text-base">Actual Spent:</span>
                                <span className="font-semibold text-gray-900 text-sm sm:text-base">{formatCurrency(budget.actualSpent)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 text-sm sm:text-base">Remaining Budget:</span>
                                <span className="font-semibold text-green-600 text-sm sm:text-base">{formatCurrency(budget.remainingBudget)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Budget Categories */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                    <div className="flex items-center gap-3">
                        <i className="bi bi-list-ul text-gray-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">BUDGET CATEGORIES</h2>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full self-start">
                        {budget.categories.length} Categories
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {budget.categories.map((category, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3">
                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{category.name}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium text-white self-start ${getCategoryTypeColor(category.type)}`}>
                                    {category.type}
                                </span>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Budgeted:</span>
                                    <span className="font-medium text-gray-900">{formatCurrency(category.budgeted)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Scope Change:</span>
                                    <span className={`font-medium ${category.scopeChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {category.scopeChange >= 0 ? '+' : ''}{formatCurrency(category.scopeChange)}
                                    </span>
                                </div>
                                <hr className="border-gray-200" />
                                <div className="flex justify-between">
                                    <span className="text-gray-900 font-medium">Final Amount:</span>
                                    <span className="font-bold text-gray-900">{formatCurrency(category.budgeted + category.scopeChange)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories Summary */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4 sm:p-6">
                    <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">CATEGORIES BREAKDOWN</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        {['LABOUR', 'MATERIAL', 'SUBCONTRACTOR', 'OVERHEAD'].map(type => {
                            const typeCategories = budget.categories.filter(cat => cat.type === type);
                            const typeTotal = typeCategories.reduce((sum, cat) => sum + cat.budgeted + cat.scopeChange, 0);
                            return (
                                <div key={type} className="text-center">
                                    <div className={`w-3 h-3 sm:w-4 sm:h-4 ${getCategoryTypeColor(type)} rounded-full mx-auto mb-1`}></div>
                                    <div className="font-medium text-gray-900 text-xs sm:text-sm">{type}</div>
                                    <div className="text-gray-600 text-xs sm:text-sm">{formatCurrency(typeTotal)}</div>
                                    <div className="text-xs text-gray-500">{typeCategories.length} items</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewCategoryPage;

