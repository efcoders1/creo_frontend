import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ActualCostTracking = () => {
    const [expenseHistory, setExpenseHistory] = useState([
        {
            id: 1,
            date: 'Jan 15, 2025',
            category: 'FLOOR',
            categoryIcon: '🏠',
            amount: 6000.00,
            vendor: 'ABC FLOORING CO',
            method: 'CASH',
            receipt: 'RECEIPT-001',
            actions: ['VIEW', 'EDIT', 'DEL']
        },
        {
            id: 2,
            date: 'Jan 12, 2025',
            category: 'ELECTRICAL',
            categoryIcon: '⚡',
            amount: 3500.00,
            vendor: 'ELECTRIPRO SERVICES',
            method: 'BANK-TRANSFER',
            receipt: 'RECEIPT-002',
            actions: ['VIEW', 'EDIT', 'DEL']
        },
        {
            id: 3,
            date: 'Jan 10, 2025',
            category: 'PLUMBING',
            categoryIcon: '🚰',
            amount: 2800.00,
            vendor: 'PLUMBTECH SOLUTIONS',
            method: 'CREDIT-CARD',
            receipt: 'RECEIPT-003',
            actions: ['VIEW', 'EDIT', 'DEL']
        }
    ]);

    const [newExpense, setNewExpense] = useState({
        category: '',
        amount: '',
        datePaid: '',
        vendorName: '',
        paymentMethod: '',
        paymentNotes: ''
    });

    const [projectInfo] = useState({
        jobCode: '25-01-0001',
        projectName: 'Office Building Construction',
        budgetStatus: 'Locked',
        totalBudget: 83500.00
    });

    const calculateSummary = () => {
        const totalSpent = expenseHistory.reduce((sum, expense) => sum + expense.amount, 0);
        const remaining = projectInfo.totalBudget - totalSpent;
        const variance = ((totalSpent / projectInfo.totalBudget) * 100).toFixed(1);

        return {
            totalBudget: projectInfo.totalBudget,
            totalSpent,
            remaining,
            variance
        };
    };

    const summary = calculateSummary();

    const handleInputChange = (field, value) => {
        setNewExpense(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddExpense = () => {
        if (newExpense.category && newExpense.amount && newExpense.datePaid) {
            const expense = {
                id: expenseHistory.length + 1,
                date: new Date(newExpense.datePaid).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit'
                }),
                category: newExpense.category,
                categoryIcon: getCategoryIcon(newExpense.category),
                amount: parseFloat(newExpense.amount),
                vendor: newExpense.vendorName || 'N/A',
                method: newExpense.paymentMethod || 'CASH',
                receipt: `RECEIPT-${String(expenseHistory.length + 1).padStart(3, '0')}`,
                actions: ['VIEW', 'EDIT', 'DEL']
            };

            setExpenseHistory([...expenseHistory, expense]);
            clearForm();
        }
    };

    const clearForm = () => {
        setNewExpense({
            category: '',
            amount: '',
            datePaid: '',
            vendorName: '',
            paymentMethod: '',
            paymentNotes: ''
        });
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

    const handleAction = (action, expenseId) => {
        if (action === 'DEL') {
            setExpenseHistory(expenseHistory.filter(expense => expense.id !== expenseId));
        } else if (action === 'VIEW') {
            console.log('View expense:', expenseId);
        } else if (action === 'EDIT') {
            console.log('Edit expense:', expenseId);
        }
    };

    const getMethodColor = (method) => {
        switch (method) {
            case 'CASH': return 'bg-green-100 text-green-800';
            case 'BANK-TRANSFER': return 'bg-blue-100 text-blue-800';
            case 'CREDIT-CARD': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Project Overview */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-clipboard-data text-blue-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">PROJECT OVERVIEW</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value={projectInfo.jobCode}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value={projectInfo.projectName}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">BUDGET STATUS</label>
                                <input
                                    type="text"
                                    value={projectInfo.budgetStatus}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">TOTAL BUDGET</label>
                                <input
                                    type="text"
                                    value={`$${projectInfo.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Budget Summary */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-bar-chart text-green-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">BUDGET SUMMARY</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xs sm:text-sm font-medium text-blue-600 mb-2">TOTAL BUDGET</div>
                            <div className="text-lg sm:text-2xl font-bold text-blue-700">
                                ${summary.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="bg-red-50 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xs sm:text-sm font-medium text-red-600 mb-2">TOTAL SPENT</div>
                            <div className="text-lg sm:text-2xl font-bold text-red-700">
                                ${summary.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xs sm:text-sm font-medium text-green-600 mb-2">REMAINING</div>
                            <div className="text-lg sm:text-2xl font-bold text-green-700">
                                ${summary.remaining.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </div>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 text-center">
                            <div className="text-xs sm:text-sm font-medium text-yellow-600 mb-2">VARIANCE</div>
                            <div className="text-lg sm:text-2xl font-bold text-yellow-700">
                                {summary.variance}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Expense Form */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-plus-circle text-blue-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">ADD NEW EXPENSE</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">CATEGORY *</label>
                                <select
                                    value={newExpense.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                >
                                    <option value="">Select Category</option>
                                    <option value="FLOOR">FLOOR</option>
                                    <option value="BUILD ITEMS">BUILD ITEMS</option>
                                    <option value="ELECTRICAL">ELECTRICAL</option>
                                    <option value="PLUMBING">PLUMBING</option>
                                    <option value="GRAPHICS">GRAPHICS</option>
                                    <option value="AUDIO VISUAL">AUDIO VISUAL</option>
                                    <option value="MANAGEMENT FEE">MANAGEMENT FEE</option>
                                </select>
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">AMOUNT *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={newExpense.amount}
                                    onChange={(e) => handleInputChange('amount', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Date Paid */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">DATE PAID *</label>
                                <input
                                    type="date"
                                    value={newExpense.datePaid}
                                    onChange={(e) => handleInputChange('datePaid', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Vendor Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">VENDOR NAME</label>
                                <input
                                    type="text"
                                    placeholder="Enter vendor name"
                                    value={newExpense.vendorName}
                                    onChange={(e) => handleInputChange('vendorName', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">PAYMENT METHOD</label>
                                <select
                                    value={newExpense.paymentMethod}
                                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                >
                                    <option value="">Select Method</option>
                                    <option value="CASH">CASH</option>
                                    <option value="BANK-TRANSFER">BANK TRANSFER</option>
                                    <option value="CREDIT-CARD">CREDIT CARD</option>
                                    <option value="CHECK">CHECK</option>
                                </select>
                            </div>

                            {/* Payment Notes */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">PAYMENT NOTES</label>
                                <textarea
                                    placeholder="Enter payment notes"
                                    value={newExpense.paymentNotes}
                                    onChange={(e) => handleInputChange('paymentNotes', e.target.value)}
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <button
                                onClick={handleAddExpense}
                                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                ADD EXPENSE
                            </button>
                            <button
                                onClick={clearForm}
                                className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                            >
                                <i className="bi bi-arrow-clockwise mr-2"></i>
                                CLEAR FORM
                            </button>
                        </div>
                    </div>
                </div>

                {/* Expense History */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-clock-history text-gray-600 text-lg"></i>
                            <h2 className="text-lg font-semibold text-gray-900">EXPENSE HISTORY</h2>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                            {expenseHistory.length} expense{expenseHistory.length !== 1 ? 's' : ''} recorded
                        </div>
                    </div>

                    {/* Mobile Card View */}
                    <div className="block lg:hidden space-y-4">
                        {expenseHistory.map((expense) => (
                            <div key={expense.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-base">
                                            {expense.categoryIcon}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm">{expense.category}</div>
                                            <div className="text-xs text-gray-600">{expense.date}</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold text-red-600">
                                        ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </div>
                                </div>
                                
                                <div className="space-y-2 mb-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Vendor:</span>
                                        <span className="text-gray-900 truncate ml-2">{expense.vendor}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Method:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(expense.method)}`}>
                                            {expense.method}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Receipt:</span>
                                        <span className="text-gray-900">{expense.receipt}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    {expense.actions.map((action) => (
                                        <button
                                            key={action}
                                            onClick={() => handleAction(action, expense.id)}
                                            className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                                                action === 'VIEW' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                                                action === 'EDIT' ? 'bg-gray-600 text-white hover:bg-gray-700' :
                                                'bg-red-600 text-white hover:bg-red-700'
                                            }`}
                                        >
                                            {action}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">DATE</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">CATEGORY</th>
                                    <th className="text-right py-3 px-4 font-medium text-gray-700">AMOUNT</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">VENDOR</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">METHOD</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">RECEIPT</th>
                                    <th className="text-center py-3 px-4 font-medium text-gray-700">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenseHistory.map((expense) => (
                                    <tr key={expense.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-3 px-4 text-sm text-gray-900">{expense.date}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-base">{expense.categoryIcon}</span>
                                                <span className="text-sm font-medium text-gray-900">{expense.category}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-right text-sm font-semibold text-red-600">
                                            ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{expense.vendor}</td>
                                        <td className="py-3 px-4">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getMethodColor(expense.method)}`}>
                                                {expense.method}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-900">{expense.receipt}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex justify-center gap-2">
                                                {expense.actions.map((action) => (
                                                    <button
                                                        key={action}
                                                        onClick={() => handleAction(action, expense.id)}
                                                        className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                                                            action === 'VIEW' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                                                            action === 'EDIT' ? 'bg-gray-600 text-white hover:bg-gray-700' :
                                                            'bg-red-600 text-white hover:bg-red-700'
                                                        }`}
                                                    >
                                                        {action}
                                                    </button>
                                                ))}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {expenseHistory.length === 0 && (
                        <div className="text-center py-8">
                            <i className="bi bi-inbox text-gray-400 text-3xl sm:text-4xl mb-4"></i>
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Expenses Yet</h3>
                            <p className="text-gray-600 text-sm sm:text-base">Add your first expense using the form above.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ActualCostTracking;

