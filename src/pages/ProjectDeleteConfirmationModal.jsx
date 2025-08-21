import React from 'react';

const ProjectDeleteConfirmationModal = ({ project, isDeleting = false, onConfirm, onCancel }) => {
    if (!project) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && !isDeleting) {
            onCancel();
        }
    };

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-blue-600';
            case 'draft': return 'bg-gray-600';
            case 'closed': return 'bg-green-600';
            default: return 'bg-gray-500';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const calculateProjectTotals = (categoryItems) => {
        if (!categoryItems || categoryItems.length === 0) return { supplierQuotes: 0, supplierCost: 0, actuals: 0 };

        return categoryItems.reduce((totals, item) => ({
            supplierQuotes: totals.supplierQuotes + (item.supplierQuotes || 0),
            supplierCost: totals.supplierCost + (item.supplierCost || 0),
            actuals: totals.actuals + (item.actuals || 0)
        }), { supplierQuotes: 0, supplierCost: 0, actuals: 0 });
    };

    const totals = calculateProjectTotals(project.categoryItems);

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
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                DELETE PROJECT
                            </h3>
                            <p className="text-sm text-gray-600">
                                This action cannot be undone
                            </p>
                        </div>
                        {/* Close button for mobile */}
                        <button
                            onClick={onCancel}
                            disabled={isDeleting}
                            className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Body - Scrollable */}
                <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                    <div className="mb-4">
                        <p className="text-gray-700 mb-4">
                            Are you sure you want to delete this project? This will permanently remove all project data, including category items, financial tracking, team assignments, and related documents.
                        </p>

                        <div className="bg-gray-50 rounded-lg p-4 border">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">{project.projectName}</h4>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-medium text-gray-600">Job Code:</span>
                                        <span className="text-sm font-bold text-blue-600">{project.jobCode}</span>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                                    {project.status?.toUpperCase()}
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex justify-between">
                                    <span>Project Manager:</span>
                                    <span className="font-medium text-gray-900">{project.projectManager}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Budget:</span>
                                    <span className="font-medium text-gray-900">{project.budget}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Team Members:</span>
                                    <span className="font-medium text-gray-900">{project.stakeholders?.length || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Category Items:</span>
                                    <span className="font-medium text-gray-900">{project.categoryItems?.length || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Duration:</span>
                                    <span className="font-medium text-gray-900">
                                        {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Financial Summary */}
                            {project.categoryItems && project.categoryItems.length > 0 && (
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <h5 className="text-sm font-medium text-gray-900 mb-2">Financial Summary</h5>
                                    <div className="grid grid-cols-3 gap-2 text-xs">
                                        <div className="text-center">
                                            <div className="font-medium text-blue-600">{formatCurrency(totals.supplierQuotes)}</div>
                                            <div className="text-gray-500">Quotes</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-medium text-orange-600">{formatCurrency(totals.supplierCost)}</div>
                                            <div className="text-gray-500">Cost</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-medium text-red-600">{formatCurrency(totals.actuals)}</div>
                                            <div className="text-gray-500">Actuals</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Warning Messages */}
                    <div className="space-y-3">
                        {project?.status === 'active' && (
                            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <svg className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                <div className="text-sm">
                                    <p className="font-medium text-yellow-800">Active Project Warning</p>
                                    <p className="text-yellow-700">
                                        This project is currently active. Deleting it may disrupt ongoing work and team schedules.
                                    </p>
                                </div>
                            </div>
                        )}

                        {project?.categoryItems?.length > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <svg className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                <div className="text-sm">
                                    <p className="font-medium text-orange-800">Financial Data Loss Warning</p>
                                    <p className="text-orange-700">
                                        This project has {project.categoryItems.length} category item(s) with financial tracking data. All cost tracking, quotes, and actuals will be permanently lost.
                                    </p>
                                </div>
                            </div>
                        )}

                        {project?.stakeholders?.length > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <div className="text-sm">
                                    <p className="font-medium text-blue-800">Team Assignment Warning</p>
                                    <p className="text-blue-700">
                                        This project has {project.stakeholders.length} team member(s) assigned. They will lose access to all project data.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            <div className="text-sm">
                                <p className="font-medium text-red-800">Permanent Deletion</p>
                                <p className="text-red-700">
                                    This action cannot be undone. All project data, category items, financial tracking, documents, and team assignments will be permanently removed from the system.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer - Fixed at bottom */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50 sm:rounded-b-lg flex-shrink-0">
                    <div className="flex gap-3 justify-end">
                        <button
                            onClick={onCancel}
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
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    DELETING...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    DELETE PROJECT
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDeleteConfirmationModal;

