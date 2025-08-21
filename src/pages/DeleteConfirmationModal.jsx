import React from 'react';

const DeleteConfirmationModal = ({
                                     isOpen,
                                     onClose,
                                     onConfirm,
                                     category,
                                     isDeleting = false
                                 }) => {
    if (!isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'bg-yellow-500';
            case 'MATERIAL': return 'bg-green-500';
            case 'SUBCONTRACTOR': return 'bg-blue-500';
            case 'OVERHEAD': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 p-0 sm:p-4 sm:flex sm:items-center sm:justify-center"
            onClick={handleBackdropClick}
        >
            <div className="bg-white h-full sm:h-auto sm:rounded-lg shadow-xl sm:max-w-md w-full sm:mx-4 transform transition-all sm:max-h-[90vh] flex flex-col">

                {/* Modal Header - Fixed at top */}
                <div className="p-4 sm:p-6 border-b border-gray-200 flex-shrink-0 bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                            <i className="bi bi-exclamation-triangle text-red-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">
                                DELETE COST CATEGORY
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
                            Are you sure you want to delete this cost category? This will permanently remove all associated data.
                        </p>

                        {category && (
                            <div className="bg-gray-50 rounded-lg p-4 border">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getTypeColor(category.type)}`}>
                                                {category.type}
                                            </span>
                                            <span className="text-xs text-gray-600">
                                                Order #{category.order}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Budget Allocated:</span>
                                        <span className="font-medium">{category.budgetAllocated}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Used in Projects:</span>
                                        <span className="font-medium">{category.projects?.length || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Usage Count:</span>
                                        <span className="font-medium">{category.usageCount}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Warning Messages */}
                    <div className="space-y-3">
                        {category?.usageCount > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <i className="bi bi-exclamation-triangle text-yellow-600 text-sm mt-0.5"></i>
                                <div className="text-sm">
                                    <p className="font-medium text-yellow-800">High Usage Warning</p>
                                    <p className="text-yellow-700">
                                        This category has been used {category.usageCount} times across multiple projects.
                                    </p>
                                </div>
                            </div>
                        )}

                        {category?.projects?.length > 0 && (
                            <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                <i className="bi bi-building text-orange-600 text-sm mt-0.5"></i>
                                <div className="text-sm">
                                    <p className="font-medium text-orange-800">Project Dependencies</p>
                                    <p className="text-orange-700">
                                        This category is associated with {category.projects.length} project(s).
                                        Deleting it may affect project budgets and reports.
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <i className="bi bi-trash text-red-600 text-sm mt-0.5"></i>
                            <div className="text-sm">
                                <p className="font-medium text-red-800">Permanent Deletion</p>
                                <p className="text-red-700">
                                    This action cannot be undone. All historical data and references will be permanently removed.
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
                                    DELETE CATEGORY
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

