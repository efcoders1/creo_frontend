import React, { useState } from 'react';
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const ActualCostTrackingListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [methodFilter, setMethodFilter] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    // Dummy actual cost tracking data with state management
    const [expenses, setExpenses] = useState([
        {
            id: 1,
            date: '2025-01-15',
            category: 'FLOOR',
            categoryIcon: '🏠',
            amount: 6000.00,
            vendor: 'ABC FLOORING CO',
            method: 'CASH',
            receipt: 'RECEIPT-001',
            paymentNotes: 'First phase flooring installation completed',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            approvedBy: 'Sarah Johnson',
            status: 'approved',
            attachments: ['invoice_001.pdf', 'receipt_001.jpg']
        },
        {
            id: 2,
            date: '2025-01-12',
            category: 'ELECTRICAL',
            categoryIcon: '⚡',
            amount: 3500.00,
            vendor: 'ELECTRIPRO SERVICES',
            method: 'BANK-TRANSFER',
            receipt: 'RECEIPT-002',
            paymentNotes: 'Main electrical panel installation',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            approvedBy: 'Sarah Johnson',
            status: 'approved',
            attachments: ['invoice_002.pdf']
        },
        {
            id: 3,
            date: '2025-01-10',
            category: 'PLUMBING',
            categoryIcon: '🚰',
            amount: 2800.00,
            vendor: 'PLUMBTECH SOLUTIONS',
            method: 'CREDIT-CARD',
            receipt: 'RECEIPT-003',
            paymentNotes: 'Bathroom fixtures and piping',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            approvedBy: 'Sarah Johnson',
            status: 'approved',
            attachments: ['invoice_003.pdf', 'delivery_note_003.pdf']
        },
        {
            id: 4,
            date: '2025-01-08',
            category: 'BUILD ITEMS',
            categoryIcon: '🔨',
            amount: 8500.00,
            vendor: 'CONSTRUCTION SUPPLIES LTD',
            method: 'BANK-TRANSFER',
            receipt: 'RECEIPT-004',
            paymentNotes: 'Bulk construction materials delivery',
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            approvedBy: 'Michael Chen',
            status: 'pending',
            attachments: ['invoice_004.pdf']
        },
        {
            id: 5,
            date: '2025-01-05',
            category: 'GRAPHICS',
            categoryIcon: '🎨',
            amount: 1500.00,
            vendor: 'CREATIVE GRAPHICS LTD',
            method: 'CREDIT-CARD',
            receipt: 'RECEIPT-005',
            paymentNotes: 'Store signage and branding materials',
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            approvedBy: 'Emma Thompson',
            status: 'approved',
            attachments: ['invoice_005.pdf', 'design_proof_005.jpg']
        },
        {
            id: 6,
            date: '2025-01-03',
            category: 'AUDIO VISUAL',
            categoryIcon: '📺',
            amount: 12000.00,
            vendor: 'AV TECH SOLUTIONS',
            method: 'BANK-TRANSFER',
            receipt: 'RECEIPT-006',
            paymentNotes: 'Conference room AV equipment installation',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            approvedBy: 'Sarah Johnson',
            status: 'approved',
            attachments: ['invoice_006.pdf', 'warranty_006.pdf']
        },
        {
            id: 7,
            date: '2024-12-28',
            category: 'MANAGEMENT FEE',
            categoryIcon: '💼',
            amount: 5000.00,
            vendor: 'PROJECT MANAGEMENT SERVICES',
            method: 'BANK-TRANSFER',
            receipt: 'RECEIPT-007',
            paymentNotes: 'Monthly project management fee - December',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            approvedBy: 'Director Smith',
            status: 'approved',
            attachments: ['invoice_007.pdf']
        },
        {
            id: 8,
            date: '2024-12-25',
            category: 'ELECTRICAL',
            categoryIcon: '⚡',
            amount: 4200.00,
            vendor: 'POWER SYSTEMS INC',
            method: 'CASH',
            receipt: 'RECEIPT-008',
            paymentNotes: 'Emergency electrical repairs',
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            approvedBy: 'Michael Chen',
            status: 'rejected',
            attachments: ['invoice_008.pdf']
        },
        {
            id: 9,
            date: '2024-12-20',
            category: 'FLOOR',
            categoryIcon: '🏠',
            amount: 7500.00,
            vendor: 'PREMIUM FLOORING CO',
            method: 'CREDIT-CARD',
            receipt: 'RECEIPT-009',
            paymentNotes: 'High-end flooring for executive areas',
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            approvedBy: 'Emma Thompson',
            status: 'approved',
            attachments: ['invoice_009.pdf', 'material_specs_009.pdf']
        },
        {
            id: 10,
            date: '2024-12-18',
            category: 'PLUMBING',
            categoryIcon: '🚰',
            amount: 3200.00,
            vendor: 'HYDRO PLUMBING SERVICES',
            method: 'BANK-TRANSFER',
            receipt: 'RECEIPT-010',
            paymentNotes: 'Kitchen and break room plumbing',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            approvedBy: 'Sarah Johnson',
            status: 'approved',
            attachments: ['invoice_010.pdf']
        }
    ]);

    const categoryOptions = [
        { value: 'all', label: 'ALL CATEGORIES' },
        { value: 'FLOOR', label: 'FLOOR', icon: '🏠' },
        { value: 'BUILD ITEMS', label: 'BUILD ITEMS', icon: '🔨' },
        { value: 'ELECTRICAL', label: 'ELECTRICAL', icon: '⚡' },
        { value: 'PLUMBING', label: 'PLUMBING', icon: '🚰' },
        { value: 'GRAPHICS', label: 'GRAPHICS', icon: '🎨' },
        { value: 'AUDIO VISUAL', label: 'AUDIO VISUAL', icon: '📺' },
        { value: 'MANAGEMENT FEE', label: 'MANAGEMENT FEE', icon: '💼' }
    ];

    const methodOptions = [
        { value: 'all', label: 'ALL METHODS' },
        { value: 'CASH', label: 'CASH' },
        { value: 'BANK-TRANSFER', label: 'BANK TRANSFER' },
        { value: 'CREDIT-CARD', label: 'CREDIT CARD' },
        { value: 'CHECK', label: 'CHECK' }
    ];

    const dateRangeOptions = [
        { value: 'all', label: 'ALL TIME' },
        { value: 'today', label: 'TODAY' },
        { value: 'week', label: 'THIS WEEK' },
        { value: 'month', label: 'THIS MONTH' },
        { value: 'quarter', label: 'THIS QUARTER' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'amount_high', label: 'Amount (High to Low)' },
        { value: 'amount_low', label: 'Amount (Low to High)' },
        { value: 'vendor', label: 'Vendor Name' },
        { value: 'category', label: 'Category' },
        { value: 'project', label: 'Project' }
    ];

    // Filter and sort expenses
    const filteredExpenses = expenses
        .filter(expense => {
            const matchesSearch = expense.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expense.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expense.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expense.receipt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                expense.paymentNotes.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = categoryFilter === 'all' || expense.category === categoryFilter;
            const matchesMethod = methodFilter === 'all' || expense.method === methodFilter;

            // Date range filtering
            let matchesDate = true;
            if (dateRange !== 'all') {
                const expenseDate = new Date(expense.date);
                const today = new Date();

                switch (dateRange) {
                    case 'today':
                        matchesDate = expenseDate.toDateString() === today.toDateString();
                        break;
                    case 'week':
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        matchesDate = expenseDate >= weekAgo;
                        break;
                    case 'month':
                        matchesDate = expenseDate.getMonth() === today.getMonth() &&
                            expenseDate.getFullYear() === today.getFullYear();
                        break;
                    case 'quarter':
                        const currentQuarter = Math.floor(today.getMonth() / 3);
                        const expenseQuarter = Math.floor(expenseDate.getMonth() / 3);
                        matchesDate = expenseQuarter === currentQuarter &&
                            expenseDate.getFullYear() === today.getFullYear();
                        break;
                }
            }

            return matchesSearch && matchesCategory && matchesMethod && matchesDate;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.date) - new Date(a.date);
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'amount_high':
                    return b.amount - a.amount;
                case 'amount_low':
                    return a.amount - b.amount;
                case 'vendor':
                    return a.vendor.localeCompare(b.vendor);
                case 'category':
                    return a.category.localeCompare(b.category);
                case 'project':
                    return a.projectName.localeCompare(b.projectName);
                default:
                    return 0;
            }
        });

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
            case 'CASH': return 'success';
            case 'BANK-TRANSFER': return 'info';
            case 'CREDIT-CARD': return 'warning';
            case 'CHECK': return 'failour';
            default: return 'gray';
        }
    };

    const calculateSummary = () => {
        const totalExpenses = filteredExpenses.length;
        const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
        const approvedAmount = filteredExpenses
            .filter(expense => expense.status === 'approved')
            .reduce((sum, expense) => sum + expense.amount, 0);
        const pendingAmount = filteredExpenses
            .filter(expense => expense.status === 'pending')
            .reduce((sum, expense) => sum + expense.amount, 0);

        return {
            totalExpenses,
            totalAmount,
            approvedAmount,
            pendingAmount
        };
    };

    const summary = calculateSummary();

    // Handler functions with working functionality
    const handleViewExpense = (expenseId) => {
        const expense = expenses.find(exp => exp.id === expenseId);
        if (expense) {
            alert(`Viewing Expense Details:
            
ID: ${expense.id}
Category: ${expense.category}
Amount: $${expense.amount.toLocaleString()}
Vendor: ${expense.vendor}
Date: ${new Date(expense.date).toLocaleDateString()}
Status: ${expense.status.toUpperCase()}
Project: ${expense.projectCode} - ${expense.projectName}
Receipt: ${expense.receipt}
Payment Method: ${expense.method}
Approved By: ${expense.approvedBy}
Notes: ${expense.paymentNotes}
Attachments: ${expense.attachments.join(', ')}`);
        }
    };

    const handleEditExpense = (expenseId) => {
        const expense = expenses.find(exp => exp.id === expenseId);
        if (expense) {
            if (expense.status === 'approved') {
                alert('Cannot edit approved expenses. Please contact your administrator.');
                return;
            }

            // Simple edit simulation - in real app, this would open an edit form
            const newVendor = prompt('Edit Vendor Name:', expense.vendor);
            const newAmount = prompt('Edit Amount:', expense.amount);
            const newNotes = prompt('Edit Payment Notes:', expense.paymentNotes);

            if (newVendor !== null && newAmount !== null && newNotes !== null) {
                setExpenses(prevExpenses =>
                    prevExpenses.map(exp =>
                        exp.id === expenseId
                            ? {
                                ...exp,
                                vendor: newVendor || exp.vendor,
                                amount: parseFloat(newAmount) || exp.amount,
                                paymentNotes: newNotes || exp.paymentNotes
                            }
                            : exp
                    )
                );
                alert('Expense updated successfully!');
            }
        }
    };

    const handleDeleteExpense = (expenseId) => {
        const expense = expenses.find(exp => exp.id === expenseId);
        if (expense) {
            if (expense.status === 'approved') {
                alert('Cannot delete approved expenses. Please contact your administrator.');
                return;
            }
            setExpenseToDelete(expenseId);
            setShowDeleteConfirm(true);
        }
    };

    const confirmDeleteExpense = () => {
        if (expenseToDelete) {
            setExpenses(prevExpenses =>
                prevExpenses.filter(expense => expense.id !== expenseToDelete)
            );
            setShowDeleteConfirm(false);
            setExpenseToDelete(null);
            alert('Expense deleted successfully!');
        }
    };

    const cancelDeleteExpense = () => {
        setShowDeleteConfirm(false);
        setExpenseToDelete(null);
    };

    const handleCreateNew = () => {
        // Simple create simulation - in real app, this would open a create form
        const category = prompt('Enter Category (FLOOR, ELECTRICAL, PLUMBING, etc.):');
        const vendor = prompt('Enter Vendor Name:');
        const amount = prompt('Enter Amount:');
        const receipt = prompt('Enter Receipt Number:');
        const projectCode = prompt('Enter Project Code:');
        const projectName = prompt('Enter Project Name:');

        if (category && vendor && amount && receipt && projectCode && projectName) {
            const newExpense = {
                id: Math.max(...expenses.map(e => e.id)) + 1,
                date: new Date().toISOString().split('T')[0],
                category: category.toUpperCase(),
                categoryIcon: categoryOptions.find(cat => cat.value === category.toUpperCase())?.icon || '📄',
                amount: parseFloat(amount),
                vendor: vendor,
                method: 'CASH',
                receipt: receipt,
                paymentNotes: 'New expense entry',
                projectCode: projectCode,
                projectName: projectName,
                approvedBy: 'Current User',
                status: 'pending',
                attachments: []
            };

            setExpenses(prevExpenses => [...prevExpenses, newExpense]);
            alert('New expense created successfully!');
        }
    };

    const handleExportReport = () => {
        // Generate CSV data
        const csvData = filteredExpenses.map(expense => ({
            Date: expense.date,
            Category: expense.category,
            Amount: expense.amount,
            Vendor: expense.vendor,
            Method: expense.method,
            Receipt: expense.receipt,
            Project: `${expense.projectCode} - ${expense.projectName}`,
            Status: expense.status,
            ApprovedBy: expense.approvedBy
        }));

        // Convert to CSV string
        const csvHeaders = Object.keys(csvData[0]).join(',');
        const csvRows = csvData.map(row => Object.values(row).join(','));
        const csvContent = [csvHeaders, ...csvRows].join('\n');

        // Download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `expense_report_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);

        alert('Report exported successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-receipt text-blue-600 text-lg"></i>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">ACTUAL COST TRACKING</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                              <Button
                                color="success"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={handleExportReport}
                            >
                                <i className="bi bi-download mr-2"></i>
                                <span className="hidden sm:inline"> EXPORT REPORT</span>
                                <span className="sm:hidden">EXPORT</span>
                            </Button>
                            <Button
                                color="primary"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={handleCreateNew}
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                <span className="hidden sm:inline"> ADD NEW EXPENSE</span>
                                <span className="sm:hidden">ADD</span>
                            </Button>

                        </div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Track and manage actual project expenses and costs</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL EXPENSES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{summary.totalExpenses}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL AMOUNT</h3>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">
                            ${summary.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">APPROVED</h3>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">
                            ${summary.approvedAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">PENDING</h3>
                        <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                            ${summary.pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">FILTERS & SEARCH</h2>
                    </div>

                    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-5 lg:gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEARCH EXPENSES
                            </label>
                            <input
                                type="text"
                                placeholder="Search vendor, project, receipt..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700"
                            />
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                CATEGORY
                            </label>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                {categoryOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Payment Method Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PAYMENT METHOD
                            </label>
                            <select
                                value={methodFilter}
                                onChange={(e) => setMethodFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                {methodOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                DATE RANGE
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                {dateRangeOptions.map((option) => (
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
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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

                {/* Expenses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredExpenses.map((expense) => (
                        <Card key={expense.id} >

                            {/* Expense Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                                        {expense.categoryIcon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                                            {expense.category}
                                        </h3>
                                        <div className="text-xs sm:text-sm text-gray-600">
                                            {new Date(expense.date).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>

                                <Badge
                                    color={getStatusColor(expense.status)}
                                    size="sm"
                                    className="px-2 sm:px-3 py-1 rounded-full font-medium ml-2 flex-shrink-0 whitespace-nowrap"
                                >
                                    {expense.status.toUpperCase()}
                                </Badge>

                            </div>

                            {/* Amount */}
                            <div className="mb-4 p-3 sm:p-4 bg-red-50 rounded-lg text-center">
                                <div className="text-lg sm:text-2xl font-bold text-red-600">
                                    ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Amount Paid</div>
                            </div>

                            {/* Expense Details */}
                            <div className="space-y-2 sm:space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-building text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">{expense.vendor}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-folder text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">
                                        {expense.projectCode} - {expense.projectName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-receipt text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700">{expense.receipt}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-person-check text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">Approved by {expense.approvedBy}</span>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="mb-4">
                                <Badge
                                    color={getMethodColor(expense.method)}
                                    size="sm"
                                    className="px-2 sm:px-3 py-1 rounded-full float-left"
                                >
                                    {expense.method}
                                </Badge>

                            </div>

                            {/* Payment Notes */}
                            {expense.paymentNotes && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Notes:</div>
                                    <div className="text-xs sm:text-sm text-gray-600">{expense.paymentNotes}</div>
                                </div>
                            )}

                            {/* Attachments */}
                            <div className="mb-4">
                                <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Attachments:</div>
                                <div className="flex flex-wrap gap-2">
                                    {expense.attachments.map((attachment, index) => (
                                        <Badge
                                            key={index}
                                            color="info"
                                            size="sm"
                                            className="px-2 py-1  rounded-full"
                                        >
                                            <i className="bi bi-paperclip mr-1"></i>
                                            {attachment}
                                        </Badge>
                                    ))}
                                </div>

                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2">

                                <Button
                                    color="primary"
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => handleViewExpense(expense.id)}
                                >
                                    <span className="hidden sm:inline">  CANCEL</span>
                                </Button>

                                <Button
                                    onClick={() => handleEditExpense(expense.id)}
                                    size="sm"
                                    className={`flex items-center  ${
                                        expense.status === 'approved'
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-gray-600 hover:bg-gray-700'
                                    }`}
                                    disabled={expense.status === 'approved'}
                                >
                                    <i className="bi bi-pencil mr-1"></i>
                                </Button>



                                <Button
                                    size="sm"
                                    onClick={() => handleDeleteExpense(expense.id)}
                                    className={`px-3 py-2 text-white text-xs sm:text-sm font-medium rounded transition-colors ${
                                        expense.status === 'approved'
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-red-600 hover:bg-red-700'
                                    }`}
                                    disabled={expense.status === 'approved'}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredExpenses.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-search text-gray-400 text-3xl sm:text-4xl mb-4"></i>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Expenses Found</h3>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            No expense records match your current search criteria. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setCategoryFilter('all');
                                setMethodFilter('all');
                                setDateRange('all');
                                setSortBy('newest');
                            }}
                            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Category Breakdown */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-pie-chart text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">EXPENSE BREAKDOWN BY CATEGORY</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {categoryOptions.slice(1).map((category) => {
                            const categoryExpenses = filteredExpenses.filter(e => e.category === category.value);
                            const categoryTotal = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

                            return (
                                <div key={category.value} className="text-center p-3 sm:p-4 border border-gray-200 rounded-lg">
                                    <div className="text-xl sm:text-2xl mb-2">{category.icon}</div>
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">{category.label}</div>
                                    <div className="text-sm sm:text-lg font-bold text-blue-600">
                                        ${categoryTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {categoryExpenses.length} expense{categoryExpenses.length !== 1 ? 's' : ''}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="bi bi-exclamation-triangle text-red-500 text-xl"></i>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Confirm Delete</h3>
                            </div>
                            <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                Are you sure you want to delete this expense? This action cannot be undone.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                                <button
                                    onClick={cancelDeleteExpense}
                                    className="w-full sm:w-auto px-4 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 transition-colors text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteExpense}
                                    className="w-full sm:w-auto px-4 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActualCostTrackingListing;

