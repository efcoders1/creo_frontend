import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovalLocking = () => {
    const [isLocked, setIsLocked] = useState(false);
    const [checklist, setChecklist] = useState([
        { id: 1, text: 'Budget planning completed and reviewed', checked: true },
        { id: 2, text: 'All cost categories properly allocated', checked: true },
        { id: 3, text: 'Margin calculations verified (84.7% > 32%)', checked: true },
        { id: 4, text: 'Project manager has submitted for approval', checked: true },
        { id: 5, text: 'Stakeholder notifications sent', checked: true },
        { id: 6, text: 'Supplier quotes reviewed and validated', checked: true },
        { id: 7, text: 'Risk assessment completed', checked: true },
        { id: 8, text: 'Director authorization confirmed', checked: true }
    ]);

    const [auditLog] = useState([
        {
            id: 1,
            timestamp: 'Jan 16, 2025, 04:45:00 PM',
            action: 'Director Review Started',
            user: 'By: Michael Chen (Director)',
            details: 'Budget review initiated - All categories verified'
        },
        {
            id: 2,
            timestamp: 'Jan 16, 2025, 04:45:00 PM',
            action: 'Budget Submitted for Approval',
            user: 'By: Sarah Johnson (PM)',
            details: 'Budget submitted to Director for final approval'
        },
        {
            id: 3,
            timestamp: 'Jan 15, 2025, 10:15:00 AM',
            action: 'Budget Locked',
            user: 'By: Sarah Johnson (PM)',
            details: ''
        }
    ]);

    const budgetSummary = {
        totalBudget: '$83,500.00',
        actualCosts: '$12,800.00',
        remaining: '$70,700.00',
        currentMargin: '84.7%'
    };

    const handleChecklistChange = (id) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ));
    };

    const toggleLock = () => {
        setIsLocked(!isLocked);
    };

    const saveBudget = () => {
        console.log('Budget saved with checklist:', checklist);
        alert('Budget has been saved successfully!');
    };

    const allItemsChecked = checklist.every(item => item.checked);

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Director Only Badge */}
                <div className="flex justify-end mb-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium">
                        DIRECTOR ONLY
                    </span>
                </div>

                {/* Project Overview Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button onClick={() => navigate('/approval-locking-listing')} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i className="bi bi-arrow-left text-lg"></i>
                        </button>
                        <i className="bi bi-clipboard-data text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">PROJECT OVERVIEW</h2>
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value="25-01-0001"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value="Office Building Construction"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">PROJECT MANAGER</label>
                                <input
                                    type="text"
                                    value="Sarah Johnson"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">STATUS</label>
                                <input
                                    type="text"
                                    value="Active"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Budget Summary Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-bar-chart text-yellow-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">BUDGET SUMMARY</h2>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-xs sm:text-sm text-gray-600 mb-2">TOTAL BUDGET</div>
                                <div className="text-lg sm:text-2xl font-bold text-gray-900">{budgetSummary.totalBudget}</div>
                            </div>
                            <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-xs sm:text-sm text-gray-600 mb-2">ACTUAL COSTS</div>
                                <div className="text-lg sm:text-2xl font-bold text-gray-900">{budgetSummary.actualCosts}</div>
                            </div>
                            <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-xs sm:text-sm text-gray-600 mb-2">REMAINING</div>
                                <div className="text-lg sm:text-2xl font-bold text-gray-900">{budgetSummary.remaining}</div>
                            </div>
                            <div className="bg-white border border-gray-300 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-xs sm:text-sm text-gray-600 mb-2">CURRENT MARGIN</div>
                                <div className="text-lg sm:text-2xl font-bold text-gray-900">{budgetSummary.currentMargin}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning Message */}
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 sm:p-4 flex items-start sm:items-center gap-3 mb-4">
                    <i className="bi bi-exclamation-triangle text-yellow-600 text-lg flex-shrink-0 mt-0.5 sm:mt-0"></i>
                    <span className="text-yellow-800 font-medium text-sm sm:text-base">BUDGET IS CURRENTLY UNLOCKED AND CAN BE MODIFIED</span>
                </div>

                {/* Lock Status Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-lock text-gray-600 text-lg"></i>
                            <h2 className="text-base sm:text-lg font-medium text-gray-900">LOCK STATUS</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-xs sm:text-sm text-gray-600">SECURE BUDGET</span>
                            <button
                                onClick={toggleLock}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                    isLocked ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        isLocked ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 sm:p-8 text-center">
                        <div className="mb-4">
                            <i className={`text-4xl sm:text-6xl ${isLocked ? 'bi bi-lock-fill text-red-600' : 'bi bi-unlock-fill text-yellow-600'}`}></i>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                            {isLocked ? 'BUDGET LOCKED' : 'BUDGET UNLOCKED'}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm">
                            {isLocked
                                ? 'Budget is currently secured. Click the lock button above to unlock the budget.'
                                : 'Budget is currently open for modifications. Click the lock button above to secure the budget.'
                            }
                        </p>
                    </div>
                </div>

                {/* Pre-Approval Checklist Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-check-square text-green-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">PRE-APPROVAL CHECKLIST</h2>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 sm:p-6">
                        <div className="space-y-3 sm:space-y-4 mb-6">
                            {checklist.map((item) => (
                                <div key={item.id} className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id={`checklist-${item.id}`}
                                        checked={item.checked}
                                        onChange={() => handleChecklistChange(item.id)}
                                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-0.5 flex-shrink-0"
                                    />
                                    <label
                                        htmlFor={`checklist-${item.id}`}
                                        className={`text-xs sm:text-sm ${item.checked ? 'text-gray-900' : 'text-gray-600'} flex-1`}
                                    >
                                        {item.text}
                                    </label>
                                    {item.checked && (
                                        <i className="bi bi-check-circle-fill text-green-600 text-sm flex-shrink-0"></i>
                                    )}
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('/approval-locking-listing')}
                            className={`w-full py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                                allItemsChecked
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            SAVE BUDGET
                        </button>
                    </div>
                </div>

                {/* Audit Log Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-file-text text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">AUDIT LOG</h2>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg">
                        {/* Header */}
                        <div className="bg-gray-900 text-white px-4 py-3 rounded-t-lg">
                            <h3 className="font-medium text-sm sm:text-base">BUDGET CHANGE HISTORY & SECURITY LOG</h3>
                        </div>

                        {/* Log Entries */}
                        <div className="p-4 space-y-4 max-h-64 overflow-y-auto">
                            {auditLog.map((entry) => (
                                <div key={entry.id} className="border-b border-gray-200 pb-3 last:border-b-0">
                                    <div className="text-xs sm:text-sm text-gray-900 font-medium mb-1">
                                        {entry.action}
                                    </div>
                                    <div className="text-xs text-gray-600 mb-1">
                                        {entry.user}
                                    </div>
                                    {entry.details && (
                                        <div className="text-xs text-gray-700">
                                            {entry.details}
                                        </div>
                                    )}
                                    <div className="text-xs text-gray-500 mt-2">
                                        {entry.timestamp}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovalLocking;

