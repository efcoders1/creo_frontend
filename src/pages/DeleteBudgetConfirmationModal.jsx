import React from 'react';

const DeleteConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    budget,
    isDeleting = false
}) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

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

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 p-0 sm:p-4 sm:flex sm:items-center sm:justify-center"
            onClick={handleBackdropClick}
        >
            <div className="bg-white h-full sm:h-auto sm:rounded-lg shadow-xl sm:max-w-lg w-full sm:mx-4 transform transition-all sm:max-h-[90vh] flex flex-col">

                {/* Modal Header - Fixed at top */}
                <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <i className="bi bi-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                DELETE BUDGET
                            </h3>
                            <p className="text-sm text-gray-600">
                                This action cannot be undone
                            </p>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            onClick={onClose}
                            className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <i className="bi bi-x text-xl text-gray-500"></i>
                        </button>
                    </div>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                    <div className="mb-4">
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to delete this budget? This will permanently remove all budget data, including categories, progress tracking, and financial records.
                        </p>

                        {budget && (
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 mb-1">{budget.projectName}</h4>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-medium text-gray-600">Job Code:</span>
                                            <span className="text-sm font-bold text-blue-600">{budget.jobCode}</span>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(budget.budgetStatus)}`}>
                                        {getStatusLabel(budget.budgetStatus)}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Project Manager:</span>
                                        <span className="font-medium text-gray-900">{budget.projectManager}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Final Budget:</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(budget.finalBudget)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Progress:</span>
                                        <span className="font-medium text-gray-900">{budget.progress}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Categories:</span>
                                        <span className="font-medium text-gray-900">{budget.categories?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Actual Spent:</span>
                                        <span className="font-medium text-gray-900">{formatCurrency(budget.actualSpent)}</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {budget.progress > 0 && (
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs text-gray-600">Current Progress</span>
                                            <span className="text-xs font-medium text-gray-900">{budget.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${budget.progress < 30 ? 'bg-red-500' : budget.progress < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                                style={{ width: `${budget.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Warning Messages */}
                    <div className="space-y-3">
                        {budget?.budgetStatus === 'approved' && (
                            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <i className="bi bi-exclamation-triangle text-yellow-600 text-sm mt-0.5"></i>
                                <div className="text-sm">
                                    <p className="font-medium text-yellow-800">Approved Budget Warning</p>
                                    <p className="text-yellow-700">
                                        This budget has been approved. Deleting it may affect project planning and financial reporting.
                                    </p>
                                </div>
                            </div>
                        )}

                        {budget?.progress > 0 && budget?.progress < 100 && (
                            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <i className="bi bi-graph-up text-orange-600 text-sm mt-0.5"></i>
                                <div className="text-sm">
                                    <p className="font-medium text-orange-800">Progress Loss Warning</p>
                                    <p className="text-orange-700">
                                        This budget has {budget.progress}% progress completed. All progress data and financial tracking will be permanently lost.
                                    </p>
                                </div>
                            </div>
                        )}

                        {budget?.categories?.length > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <i className="bi bi-list-ul text-blue-600 text-sm mt-0.5"></i>
                                <div className="text-sm">
                                    <p className="font-medium text-blue-800">Categories Data Warning</p>
                                    <p className="text-blue-700">
                                        This budget contains {budget.categories.length} categories with detailed financial breakdowns. All category data will be permanently removed.
                                    </p>
                                </div>
                            </div>
                        )}

                        {budget?.actualSpent > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                                <i className="bi bi-cash-coin text-purple-600 text-sm mt-0.5"></i>
                                <div className="text-sm">
                                    <p className="font-medium text-purple-800">Financial Data Warning</p>
                                    <p className="text-purple-700">
                                        This budget has {formatCurrency(budget.actualSpent)} in actual spending recorded. All financial tracking data will be lost.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <i className="bi bi-trash text-red-600 text-sm mt-0.5"></i>
                            <div className="text-sm">
                                <p className="font-medium text-red-800">Permanent Deletion</p>
                                <p className="text-red-700">
                                    This action cannot be undone. All budget data, categories, progress reports, and financial records will be permanently removed from the system.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer - Fixed at bottom */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 sm:rounded-b-lg flex-shrink-0">
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onClose}
                            disabled={isDeleting}
                            className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isDeleting}
                            className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {isDeleting ? (
                                <>
                                    <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                                    DELETING...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-trash mr-2"></i>
                                    DELETE BUDGET
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;

