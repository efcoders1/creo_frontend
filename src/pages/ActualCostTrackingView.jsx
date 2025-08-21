import React, { useState } from 'react';

const ActualCostTrackingView = ({ expense, onBack, onEdit }) => {
    if (!expense) {
        return (
            <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-exclamation-triangle text-gray-400 text-3xl sm:text-4xl mb-4"></i>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">Expense Not Found</h3>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                            The expense you're looking for could not be found.
                        </p>
                        <button
                            onClick={onBack}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getMethodColor = (method) => {
        switch (method) {
            case 'CASH': return 'bg-green-100 text-green-800';
            case 'BANK-TRANSFER': return 'bg-blue-100 text-blue-800';
            case 'CREDIT-CARD': return 'bg-purple-100 text-purple-800';
            case 'CHECK': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category) => {
        const icons = {
            'FLOOR': '🏠',
            'BUILD ITEMS': '🔨',
            'ELECTRICAL': '⚡',
            'PLUMBING': '🚰',
            'GRAPHICS': '🎨',
            'AUDIO VISUAL': '📺',
            'MANAGEMENT FEE': '💼'
        };
        return icons[category] || '📋';
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
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
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">VIEW EXPENSE DETAILS</h1>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => onEdit(expense)}
                                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                            >
                                <i className="bi bi-pencil mr-2"></i>
                                EDIT
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Detailed view of expense record and payment information</p>
                </div>

                {/* Expense Overview */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-receipt text-gray-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">EXPENSE OVERVIEW</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        {/* Left Column */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">
                                    {getCategoryIcon(expense.category)}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{expense.category}</h3>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                        <span className="text-sm text-gray-600">Receipt: {expense.receipt}</span>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white self-start ${getStatusColor(expense.status)}`}>
                                            {expense.status?.toUpperCase() || 'PENDING'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Date Paid</span>
                                    <p className="text-gray-900 font-medium text-sm sm:text-base">{formatDate(expense.date)}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Vendor</span>
                                    <p className="text-gray-900 text-sm sm:text-base">{expense.vendor}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-medium text-gray-600">Payment Method</span>
                                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mt-1 ${getMethodColor(expense.method)}`}>
                                        {expense.method}
                                    </span>
                                </div>
                                {expense.approvedBy && (
                                    <div>
                                        <span className="text-sm font-medium text-gray-600">Approved By</span>
                                        <p className="text-gray-900 text-sm sm:text-base">{expense.approvedBy}</p>
                                    </div>
                                )}
                            </div>

                            {/* Project Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-3">PROJECT INFORMATION</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Project Code:</span>
                                        <span className="text-sm font-medium text-gray-900">{expense.projectCode}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Project Name:</span>
                                        <span className="text-sm font-medium text-gray-900">{expense.projectName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Amount and Details */}
                        <div className="space-y-6">
                            {/* Amount Display */}
                            <div className="bg-red-50 rounded-lg p-6 text-center">
                                <div className="text-sm font-medium text-red-600 mb-2">AMOUNT PAID</div>
                                <div className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
                                    {formatCurrency(expense.amount)}
                                </div>
                                <div className="text-sm text-gray-600">Total expense amount</div>
                            </div>

                            {/* Payment Notes */}
                            {expense.paymentNotes && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-blue-900 mb-2">PAYMENT NOTES</h4>
                                    <p className="text-sm text-blue-800">{expense.paymentNotes}</p>
                                </div>
                            )}

                            {/* Attachments */}
                            {expense.attachments && expense.attachments.length > 0 && (
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="text-sm font-semibold text-gray-900 mb-3">ATTACHMENTS</h4>
                                    <div className="space-y-2">
                                        {expense.attachments.map((attachment, index) => (
                                            <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border">
                                                <i className="bi bi-paperclip text-blue-600"></i>
                                                <span className="text-sm text-gray-900 flex-1 truncate">{attachment}</span>
                                                <button className="text-blue-600 hover:text-blue-700 text-sm">
                                                    <i className="bi bi-download"></i>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Expense Timeline */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-clock-history text-gray-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">EXPENSE TIMELINE</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <i className="bi bi-plus text-blue-600 text-sm"></i>
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                    <h4 className="font-medium text-gray-900">Expense Created</h4>
                                    <span className="text-sm text-gray-600">{formatDate(expense.date)}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    Expense record created for {expense.category} category
                                </p>
                            </div>
                        </div>

                        {expense.status === 'approved' && (
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="bi bi-check text-green-600 text-sm"></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                        <h4 className="font-medium text-gray-900">Expense Approved</h4>
                                        <span className="text-sm text-gray-600">{formatDate(expense.date)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Approved by {expense.approvedBy || 'System'}
                                    </p>
                                </div>
                            </div>
                        )}

                        {expense.status === 'rejected' && (
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="bi bi-x text-red-600 text-sm"></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                        <h4 className="font-medium text-gray-900">Expense Rejected</h4>
                                        <span className="text-sm text-gray-600">{formatDate(expense.date)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Expense was rejected and requires revision
                                    </p>
                                </div>
                            </div>
                        )}

                        {expense.status === 'pending' && (
                            <div className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <i className="bi bi-clock text-yellow-600 text-sm"></i>
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                                        <h4 className="font-medium text-gray-900">Pending Review</h4>
                                        <span className="text-sm text-gray-600">Current Status</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Expense is awaiting approval from project manager
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onBack}
                            className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-arrow-left mr-2"></i>
                            BACK TO LIST
                        </button>
                        <button
                            onClick={() => onEdit(expense)}
                            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-pencil mr-2"></i>
                            EDIT EXPENSE
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-printer mr-2"></i>
                            PRINT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActualCostTrackingView;

