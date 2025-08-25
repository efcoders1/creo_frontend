import React, { useState } from 'react';
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const SupplierQuoteListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [quoteToDelete, setQuoteToDelete] = useState(null);

    // Dummy supplier quote data with state management
    const [quotes, setQuotes] = useState([
        {
            id: 1,
            vendor: 'ABC FLOORING CO',
            amount: 5000.00,
            date: '2025-01-15',
            reference: 'QT-2025-001',
            file: 'quote_001.pdf',
            status: 'PAID',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            category: 'FLOOR',
            verbalNotes: 'Premium flooring materials with 5-year warranty included',
            paymentDate: '2025-01-18',
            approvedBy: 'Sarah Johnson',
            contactPerson: 'John Smith',
            contactEmail: 'john@abcflooring.com',
            contactPhone: '+1-555-0123',
            validUntil: '2025-02-15',
            terms: 'Net 30 days',
            attachments: ['quote_001.pdf', 'material_specs_001.pdf']
        },
        {
            id: 2,
            vendor: 'ELECTRIPRO SERVICES',
            amount: 7000.00,
            date: '2025-01-12',
            reference: 'NP-2025-045',
            file: 'quote_002.pdf',
            status: 'PAID',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            category: 'ELECTRICAL',
            verbalNotes: 'Complete electrical installation including emergency lighting',
            paymentDate: '2025-01-16',
            approvedBy: 'Sarah Johnson',
            contactPerson: 'Mike Wilson',
            contactEmail: 'mike@electripro.com',
            contactPhone: '+1-555-0456',
            validUntil: '2025-02-12',
            terms: 'Net 15 days',
            attachments: ['quote_002.pdf', 'electrical_plan_002.pdf']
        },
        {
            id: 3,
            vendor: 'CREATIVE GRAPHICS LTD',
            amount: 6500.00,
            date: '2025-01-10',
            reference: 'DG-2025-078',
            file: '',
            status: 'UNPAID',
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            category: 'GRAPHICS',
            verbalNotes: 'Custom signage and branding materials for retail space',
            paymentDate: null,
            approvedBy: 'Emma Thompson',
            contactPerson: 'Lisa Chen',
            contactEmail: 'lisa@creativegraphics.com',
            contactPhone: '+1-555-0789',
            validUntil: '2025-02-10',
            terms: 'Net 30 days',
            attachments: ['design_mockup_003.jpg']
        },
        {
            id: 4,
            vendor: 'PLUMBTECH SOLUTIONS',
            amount: 8500.00,
            date: '2025-01-08',
            reference: 'PT-2025-112',
            file: 'quote_004.pdf',
            status: 'PENDING',
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            category: 'PLUMBING',
            verbalNotes: 'Industrial plumbing system upgrade with new fixtures',
            paymentDate: null,
            approvedBy: 'Michael Chen',
            contactPerson: 'Robert Davis',
            contactEmail: 'robert@plumbtech.com',
            contactPhone: '+1-555-0321',
            validUntil: '2025-02-08',
            terms: 'Net 45 days',
            attachments: ['quote_004.pdf', 'plumbing_diagram_004.pdf']
        },
        {
            id: 5,
            vendor: 'SECURITY SYSTEMS INC',
            amount: 12000.00,
            date: '2025-01-05',
            reference: 'SS-2025-089',
            file: 'quote_005.pdf',
            status: 'APPROVED',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            category: 'SECURITY',
            verbalNotes: 'Complete security system with cameras and access control',
            paymentDate: null,
            approvedBy: 'Director Smith',
            contactPerson: 'Alex Rodriguez',
            contactEmail: 'alex@securitysystems.com',
            contactPhone: '+1-555-0654',
            validUntil: '2025-02-05',
            terms: 'Net 30 days',
            attachments: ['quote_005.pdf', 'security_layout_005.pdf', 'equipment_specs_005.pdf']
        },
        {
            id: 6,
            vendor: 'HVAC SPECIALISTS',
            amount: 15000.00,
            date: '2025-01-03',
            reference: 'HV-2025-156',
            file: 'quote_006.pdf',
            status: 'REJECTED',
            projectCode: '25-01-0004',
            projectName: 'Hospital Wing Extension',
            category: 'HVAC',
            verbalNotes: 'Medical-grade HVAC system with specialized filtration',
            paymentDate: null,
            approvedBy: null,
            contactPerson: 'Jennifer Lee',
            contactEmail: 'jennifer@hvacspecialists.com',
            contactPhone: '+1-555-0987',
            validUntil: '2025-02-03',
            terms: 'Net 60 days',
            attachments: ['quote_006.pdf']
        },
        {
            id: 7,
            vendor: 'CONSTRUCTION SUPPLIES LTD',
            amount: 25000.00,
            date: '2024-12-28',
            reference: 'CS-2024-234',
            file: 'quote_007.pdf',
            status: 'PAID',
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            category: 'BUILD ITEMS',
            verbalNotes: 'Bulk construction materials including steel and concrete',
            paymentDate: '2025-01-02',
            approvedBy: 'Michael Chen',
            contactPerson: 'David Brown',
            contactEmail: 'david@constructionsupplies.com',
            contactPhone: '+1-555-0147',
            validUntil: '2025-01-28',
            terms: 'Net 30 days',
            attachments: ['quote_007.pdf', 'material_list_007.xlsx']
        },
        {
            id: 8,
            vendor: 'AV TECH SOLUTIONS',
            amount: 18000.00,
            date: '2024-12-25',
            reference: 'AV-2024-345',
            file: 'quote_008.pdf',
            status: 'PAID',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            category: 'AUDIO VISUAL',
            verbalNotes: 'Conference room AV equipment and installation',
            paymentDate: '2024-12-30',
            approvedBy: 'Sarah Johnson',
            contactPerson: 'Tom Anderson',
            contactEmail: 'tom@avtech.com',
            contactPhone: '+1-555-0258',
            validUntil: '2025-01-25',
            terms: 'Net 15 days',
            attachments: ['quote_008.pdf', 'av_layout_008.pdf']
        },
        {
            id: 9,
            vendor: 'LANDSCAPING PROS',
            amount: 9500.00,
            date: '2024-12-20',
            reference: 'LP-2024-567',
            file: 'quote_009.pdf',
            status: 'EXPIRED',
            projectCode: '25-01-0005',
            projectName: 'School Playground Upgrade',
            category: 'LANDSCAPING',
            verbalNotes: 'Playground landscaping and safety surface installation',
            paymentDate: null,
            approvedBy: null,
            contactPerson: 'Maria Garcia',
            contactEmail: 'maria@landscapingpros.com',
            contactPhone: '+1-555-0369',
            validUntil: '2024-12-31',
            terms: 'Net 30 days',
            attachments: ['quote_009.pdf', 'landscape_design_009.jpg']
        },
        {
            id: 10,
            vendor: 'PREMIUM FLOORING CO',
            amount: 11000.00,
            date: '2024-12-18',
            reference: 'PF-2024-678',
            file: 'quote_010.pdf',
            status: 'PENDING',
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            category: 'FLOOR',
            verbalNotes: 'High-end retail flooring with anti-slip coating',
            paymentDate: null,
            approvedBy: 'Emma Thompson',
            contactPerson: 'Steve Wilson',
            contactEmail: 'steve@premiumflooring.com',
            contactPhone: '+1-555-0741',
            validUntil: '2025-01-18',
            terms: 'Net 30 days',
            attachments: ['quote_010.pdf', 'flooring_samples_010.jpg']
        }
    ]);

    const statusOptions = [
        { value: 'all', label: 'ALL STATUS', color: 'bg-gray-100' },
        { value: 'PENDING', label: 'PENDING', color: 'bg-yellow-100' },
        { value: 'APPROVED', label: 'APPROVED', color: 'bg-blue-600' },
        { value: 'PAID', label: 'PAID', color: 'bg-green-600' },
        { value: 'REJECTED', label: 'REJECTED', color: 'bg-red-600' },
        { value: 'EXPIRED', label: 'EXPIRED', color: 'bg-gray-600' },
        { value: 'UNPAID', label: 'UNPAID', color: 'bg-blue-100' }
    ];

    const projectOptions = [
        { value: 'all', label: 'ALL PROJECTS' },
        { value: '25-01-0001', label: '25-01-0001 - Office Building Construction' },
        { value: '25-01-0002', label: '25-01-0002 - Warehouse Renovation' },
        { value: '25-01-0003', label: '25-01-0003 - Retail Store Fitout' },
        { value: '25-01-0004', label: '25-01-0004 - Hospital Wing Extension' },
        { value: '25-01-0005', label: '25-01-0005 - School Playground Upgrade' }
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
        { value: 'status', label: 'Status' },
        { value: 'project', label: 'Project' }
    ];

    // Filter and sort quotes
    const filteredQuotes = quotes
        .filter(quote => {
            const matchesSearch = quote.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                quote.verbalNotes.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'all' || quote.status === statusFilter;
            const matchesProject = projectFilter === 'all' || quote.projectCode === projectFilter;

            // Date range filtering
            let matchesDate = true;
            if (dateRange !== 'all') {
                const quoteDate = new Date(quote.date);
                const today = new Date();

                switch (dateRange) {
                    case 'today':
                        matchesDate = quoteDate.toDateString() === today.toDateString();
                        break;
                    case 'week':
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        matchesDate = quoteDate >= weekAgo;
                        break;
                    case 'month':
                        matchesDate = quoteDate.getMonth() === today.getMonth() &&
                            quoteDate.getFullYear() === today.getFullYear();
                        break;
                    case 'quarter':
                        const currentQuarter = Math.floor(today.getMonth() / 3);
                        const quoteQuarter = Math.floor(quoteDate.getMonth() / 3);
                        matchesDate = quoteQuarter === currentQuarter &&
                            quoteDate.getFullYear() === today.getFullYear();
                        break;
                }
            }

            return matchesSearch && matchesStatus && matchesProject && matchesDate;
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
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'project':
                    return a.projectName.localeCompare(b.projectName);
                default:
                    return 0;
            }
        });

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return 'warning';
            case 'APPROVED': return 'primary';
            case 'PAID': return 'success';
            case 'REJECTED': return 'failure';
            case 'EXPIRED': return 'darkgray';
            case 'UNPAID': return 'info';
            default: return 'darkgray';
        }
    };

    const calculateSummary = () => {
        const totalQuotes = filteredQuotes.length;
        const totalAmount = filteredQuotes.reduce((sum, quote) => sum + quote.amount, 0);
        const paidAmount = filteredQuotes
            .filter(quote => quote.status === 'PAID')
            .reduce((sum, quote) => sum + quote.amount, 0);
        const pendingAmount = filteredQuotes
            .filter(quote => quote.status === 'PENDING' || quote.status === 'APPROVED')
            .reduce((sum, quote) => sum + quote.amount, 0);
        const avgQuote = totalQuotes > 0 ? totalAmount / totalQuotes : 0;

        return {
            totalQuotes,
            totalAmount,
            paidAmount,
            pendingAmount,
            avgQuote
        };
    };

    const summary = calculateSummary();

    const isQuoteExpired = (validUntil) => {
        return new Date(validUntil) < new Date();
    };

    // Working button handlers
    const handleViewQuote = (quoteId) => {
        const quote = quotes.find(q => q.id === quoteId);
        if (quote) {
            alert(`Quote Details:

Vendor: ${quote.vendor}
Amount: $${quote.amount.toLocaleString()}
Date: ${new Date(quote.date).toLocaleDateString()}
Reference: ${quote.reference}
Status: ${quote.status}
Project: ${quote.projectCode} - ${quote.projectName}
Category: ${quote.category}

Contact Information:
Person: ${quote.contactPerson}
Email: ${quote.contactEmail}
Phone: ${quote.contactPhone}

Terms: ${quote.terms}
Valid Until: ${new Date(quote.validUntil).toLocaleDateString()}
${quote.paymentDate ? `Payment Date: ${new Date(quote.paymentDate).toLocaleDateString()}` : ''}
${quote.approvedBy ? `Approved By: ${quote.approvedBy}` : ''}

Notes: ${quote.verbalNotes}

Attachments: ${quote.attachments.join(', ')}`);
        }
    };

    const handleEditQuote = (quoteId) => {
        const quote = quotes.find(q => q.id === quoteId);
        if (quote) {
            const newVendor = prompt('Edit Vendor Name:', quote.vendor);
            const newAmount = prompt('Edit Quote Amount (numbers only):', quote.amount);
            const newReference = prompt('Edit Reference Number:', quote.reference);
            const newNotes = prompt('Edit Verbal Notes:', quote.verbalNotes);

            if (newVendor !== null && newAmount !== null && newReference !== null && newNotes !== null) {
                setQuotes(prevQuotes =>
                    prevQuotes.map(q =>
                        q.id === quoteId
                            ? {
                                ...q,
                                vendor: newVendor || q.vendor,
                                amount: parseFloat(newAmount) || q.amount,
                                reference: newReference || q.reference,
                                verbalNotes: newNotes || q.verbalNotes
                            }
                            : q
                    )
                );
                alert('Quote updated successfully!');
            }
        }
    };

    const handleDeleteQuote = (quoteId) => {
        const quote = quotes.find(q => q.id === quoteId);
        if (quote) {
            if (quote.status === 'PAID') {
                alert('Cannot delete paid quotes. Please contact your administrator.');
                return;
            }
            setQuoteToDelete(quoteId);
            setShowDeleteConfirm(true);
        }
    };

    const confirmDeleteQuote = () => {
        if (quoteToDelete) {
            setQuotes(prevQuotes =>
                prevQuotes.filter(quote => quote.id !== quoteToDelete)
            );
            setShowDeleteConfirm(false);
            setQuoteToDelete(null);
            alert('Quote deleted successfully!');
        }
    };

    const cancelDeleteQuote = () => {
        setShowDeleteConfirm(false);
        setQuoteToDelete(null);
    };

    const handleToggleStatus = (quoteId) => {
        const quote = quotes.find(q => q.id === quoteId);
        if (quote) {
            let newStatus;
            switch (quote.status) {
                case 'PENDING':
                    newStatus = 'APPROVED';
                    break;
                case 'APPROVED':
                    newStatus = 'PAID';
                    break;
                case 'PAID':
                    newStatus = 'UNPAID';
                    break;
                case 'UNPAID':
                    newStatus = 'PAID';
                    break;
                case 'REJECTED':
                    newStatus = 'PENDING';
                    break;
                case 'EXPIRED':
                    newStatus = 'PENDING';
                    break;
                default:
                    newStatus = 'PENDING';
            }

            setQuotes(prevQuotes =>
                prevQuotes.map(q =>
                    q.id === quoteId
                        ? {
                            ...q,
                            status: newStatus,
                            paymentDate: newStatus === 'PAID' ? new Date().toISOString().split('T')[0] : q.paymentDate
                        }
                        : q
                )
            );
            alert(`Quote status changed to: ${newStatus}`);
        }
    };

    const handleCreateNew = () => {
        const vendor = prompt('Enter Vendor Name:');
        const amount = prompt('Enter Quote Amount:');
        const reference = prompt('Enter Reference Number:');
        const projectCode = prompt('Enter Project Code (e.g., 25-01-0001):');
        const category = prompt('Enter Category (e.g., FLOOR, ELECTRICAL, etc.):');

        if (vendor && amount && reference && projectCode && category) {
            const newQuote = {
                id: Math.max(...quotes.map(q => q.id)) + 1,
                vendor: vendor.toUpperCase(),
                amount: parseFloat(amount),
                date: new Date().toISOString().split('T')[0],
                reference: reference,
                file: '',
                status: 'PENDING',
                projectCode: projectCode,
                projectName: 'New Project',
                category: category.toUpperCase(),
                verbalNotes: 'New quote entry',
                paymentDate: null,
                approvedBy: null,
                contactPerson: 'Contact Person',
                contactEmail: 'contact@vendor.com',
                contactPhone: '+1-555-0000',
                validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                terms: 'Net 30 days',
                attachments: []
            };

            setQuotes(prevQuotes => [newQuote, ...prevQuotes]);
            alert('New quote created successfully!');
        }
    };

    const handleExportQuotes = () => {
        // Generate CSV data
        const csvData = filteredQuotes.map(quote => ({
            Vendor: quote.vendor,
            Amount: quote.amount,
            Date: quote.date,
            Reference: quote.reference,
            Status: quote.status,
            Project: `${quote.projectCode} - ${quote.projectName}`,
            Category: quote.category,
            Contact: quote.contactPerson,
            Email: quote.contactEmail,
            Phone: quote.contactPhone,
            Terms: quote.terms,
            Notes: quote.verbalNotes
        }));

        // Convert to CSV string
        const csvHeaders = Object.keys(csvData[0]).join(',');
        const csvRows = csvData.map(row => Object.values(row).map(val => `"${val}"`).join(','));
        const csvContent = [csvHeaders, ...csvRows].join('\n');

        // Download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `supplier_quotes_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        window.URL.revokeObjectURL(url);

        alert('Quotes exported successfully!');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-file-earmark-text text-blue-600 text-lg"></i>
                            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">SUPPLIER QUOTE LISTING</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

                            <Button
                                color="primary"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={handleExportQuotes}
                            >
                                <i className="bi bi-upload mr-2"></i>
                                <span className="hidden sm:inline">Export Quotes</span>
                                <span className="sm:hidden">Export</span>
                            </Button>

                            <Button
                                color="success"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={handleCreateNew}
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                <span className="hidden sm:inline">Add New Quote</span>
                                <span className="sm:hidden">Add</span>
                            </Button>

                        </div>

                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Manage and track all supplier quotes across projects</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL QUOTES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{summary.totalQuotes}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL AMOUNT</h3>
                        <p className="text-lg sm:text-2xl font-bold text-gray-900">
                            ${summary.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">PAID AMOUNT</h3>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">
                            ${summary.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">PENDING AMOUNT</h3>
                        <p className="text-lg sm:text-2xl font-bold text-yellow-600">
                            ${summary.pendingAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">FILTERS & SEARCH</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search */}
                        <div className="sm:col-span-2 lg:col-span-1">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                SEARCH QUOTES
                            </label>
                            <input
                                type="text"
                                placeholder="Search vendor, project, reference..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                            />
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                STATUS
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Project Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                PROJECT
                            </label>
                            <select
                                value={projectFilter}
                                onChange={(e) => setProjectFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {projectOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                DATE RANGE
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                SORT BY
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                {/* Quotes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredQuotes.map((quote) => (
                        <Card key={quote.id}>

                            {/* Quote Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                                        {quote.vendor}
                                    </h3>
                                    <div className="text-xs sm:text-sm text-gray-600">
                                        {new Date(quote.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <Badge
                                    color={getStatusColor(quote.status)}
                                    size="sm"
                                    className="px-2 py-1 rounded-full ml-2 flex-shrink-0"
                                >
                                    {quote.status}
                                </Badge>

                            </div>

                            {/* Amount */}
                            <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg text-center">
                                <div className="text-lg sm:text-2xl font-bold text-blue-600">
                                    ${quote.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Quote Amount</div>
                            </div>

                            {/* Quote Details */}
                            <div className="space-y-2 sm:space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-hash text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">{quote.reference}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-folder text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">
                                        {quote.projectCode} - {quote.projectName}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-tag text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700">{quote.category}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-person text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">{quote.contactPerson}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-calendar-check text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700">
                                        Valid until {new Date(quote.validUntil).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* Quote Notes */}
                            {quote.verbalNotes && (
                                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Notes:</div>
                                    <div className="text-xs sm:text-sm text-gray-600 line-clamp-2">{quote.verbalNotes}</div>
                                </div>
                            )}

                            {/* Expiry Warning */}
                            {isQuoteExpired(quote.validUntil) && quote.status !== 'PAID' && quote.status !== 'EXPIRED' && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-700">
                                        <i className="bi bi-exclamation-triangle flex-shrink-0"></i>
                                        <span className="text-xs sm:text-sm font-medium">Quote Expired</span>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}

                            <div className="flex justify-start gap-2">
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => handleViewQuote(quote.id)}
                                    className="flex items-center justify-center"
                                >
                                    <i className="bi bi-eye"></i>
                                </Button>

                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={() => handleToggleStatus(quote.id)}
                                    className="flex items-center justify-center"
                                >
                                    <i className="bi bi-arrow-repeat"></i>
                                </Button>

                                <Button
                                    color="gray"
                                    size="sm"
                                    onClick={() => handleEditQuote(quote.id)}
                                    className="flex items-center justify-center"
                                    disabled={quote.status === 'PAID'}
                                >
                                    <i className="bi bi-pencil"></i>
                                </Button>

                                <Button
                                    color="failure"
                                    size="sm"
                                    onClick={() => handleDeleteQuote(quote.id)}
                                    className="flex items-center justify-center"
                                    disabled={quote.status === 'PAID'}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>



                        </Card>
                    ))}
                </div>

                {/* No Results */}
                {filteredQuotes.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-search text-gray-400 text-3xl sm:text-4xl mb-4"></i>
                        <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No Quotes Found</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                            No quotes match your current search criteria. Try adjusting your filters or search terms.
                        </p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setStatusFilter('all');
                                setProjectFilter('all');
                                setDateRange('all');
                                setSortBy('newest');
                            }}
                            className="px-4 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Status Breakdown */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mt-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-pie-chart text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">QUOTE BREAKDOWN BY STATUS</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                        {statusOptions.slice(1).map((status) => {
                            const statusQuotes = filteredQuotes.filter(q => q.status === status.value);
                            const statusTotal = statusQuotes.reduce((sum, q) => sum + q.amount, 0);

                            return (
                                <div key={status.value} className="text-center p-3 sm:p-4 bg-gray-50 rounded-lg">
                                    <div className={`w-3 h-3 sm:w-4 sm:h-4 ${status.color} rounded-full mx-auto mb-2`}></div>
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-1">{status.label}</div>
                                    <div className="text-sm sm:text-base font-bold text-gray-900">{statusQuotes.length}</div>
                                    <div className="text-xs text-gray-600">
                                        ${statusTotal.toLocaleString('en-US', { minimumFractionDigits: 0 })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="bi bi-exclamation-triangle text-red-600 text-xl"></i>
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Confirm Delete</h3>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 mb-6">
                                Are you sure you want to delete this quote? This action cannot be undone.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={cancelDeleteQuote}
                                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors text-sm sm:text-base"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteQuote}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm sm:text-base"
                                >
                                    Delete Quote
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupplierQuoteListing;

