import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Card } from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const MobileInterfaceListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    // Form states for editing
    const [editFormData, setEditFormData] = useState({
        type: '',
        category: '',
        amount: '',
        vendor: '',
        notes: ''
    });

    // Dummy mobile interface data (representing entries made via mobile)
    const [mobileEntries, setMobileEntries] = useState([
        {
            id: 1,
            type: 'Cost Entry',
            category: 'Floor',
            amount: 2500,
            vendor: 'ABC Flooring Co',
            date: '2025-07-16',
            notes: 'Material delivery for lobby area.',
            photos: ['photo1.jpg', 'photo2.jpg'],
            status: 'Pending Sync',
            offline: true,
            syncDate: null,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction'
        },
        {
            id: 2,
            type: 'Cost Entry',
            category: 'Electrical',
            amount: 1800,
            vendor: 'ElectriPro Services',
            date: '2025-07-15',
            notes: 'Progress payment for wiring installation.',
            photos: [],
            status: 'Synced',
            offline: false,
            syncDate: '2025-07-15T18:00:00Z',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction'
        },
        {
            id: 3,
            type: 'Cost Entry',
            category: 'Plumbing',
            amount: 650,
            vendor: 'Quick Fix Plumbing',
            date: '2025-07-14',
            notes: 'Emergency repair in restroom.',
            photos: ['photo3.jpg'],
            status: 'Pending Sync',
            offline: true,
            syncDate: null,
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation'
        },
        {
            id: 4,
            type: 'Photo Upload',
            category: 'Site Progress',
            amount: null,
            vendor: null,
            date: '2025-07-17',
            notes: 'Daily site progress photos for structural work.',
            photos: ['site_progress_01.jpg', 'site_progress_02.jpg', 'site_progress_03.jpg'],
            status: 'Synced',
            offline: false,
            syncDate: '2025-07-17T10:30:00Z',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction'
        },
        {
            id: 5,
            type: 'Comment',
            category: 'General Discussion',
            amount: null,
            vendor: null,
            date: '2025-07-17',
            notes: 'Discussed material delivery schedule with site manager.',
            photos: [],
            status: 'Pending Sync',
            offline: true,
            syncDate: null,
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout'
        },
        {
            id: 6,
            type: 'Cost Entry',
            category: 'Graphics',
            amount: 1500,
            vendor: 'Creative Graphics Ltd',
            date: '2025-07-17',
            notes: 'Payment for signage design.',
            photos: ['receipt_graphics.jpg'],
            status: 'Synced',
            offline: false,
            syncDate: '2025-07-17T14:00:00Z',
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout'
        },
        {
            id: 7,
            type: 'Photo Upload',
            category: 'Safety Inspection',
            amount: null,
            vendor: null,
            date: '2025-07-16',
            notes: 'Photos from daily safety inspection, all clear.',
            photos: ['safety_check_01.jpg'],
            status: 'Pending Sync',
            offline: true,
            syncDate: null,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction'
        },
        {
            id: 8,
            type: 'Comment',
            category: 'Technical Issue',
            amount: null,
            vendor: null,
            date: '2025-07-15',
            notes: 'Reported issue with faulty power outlet in sector B.',
            photos: [],
            status: 'Synced',
            offline: false,
            syncDate: '2025-07-15T11:00:00Z',
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation'
        },
        {
            id: 9,
            type: 'Cost Entry',
            category: 'Build Items',
            amount: 8500,
            vendor: 'Construction Supplies Ltd',
            date: '2025-07-14',
            notes: 'Bulk order for steel beams.',
            photos: ['invoice_steel.pdf'],
            status: 'Synced',
            offline: false,
            syncDate: '2025-07-14T09:00:00Z',
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction'
        },
        {
            id: 10,
            type: 'Photo Upload',
            category: 'Material Delivery',
            amount: null,
            vendor: null,
            date: '2025-07-13',
            notes: 'Photos of recent concrete delivery.',
            photos: ['concrete_delivery_01.jpg', 'concrete_delivery_02.jpg'],
            status: 'Pending Sync',
            offline: true,
            syncDate: null,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction'
        }
    ]);

    const typeOptions = [
        { value: 'all', label: 'ALL TYPES' },
        { value: 'Cost Entry', label: 'COST ENTRY' },
        { value: 'Photo Upload', label: 'PHOTO UPLOAD' },
        { value: 'Comment', label: 'COMMENT' }
    ];

    const statusOptions = [
        { value: 'all', label: 'ALL STATUSES' },
        { value: 'Pending Sync', label: 'PENDING SYNC' },
        { value: 'Synced', label: 'SYNCED' }
    ];

    const dateRangeOptions = [
        { value: 'all', label: 'ALL TIME' },
        { value: 'today', label: 'TODAY' },
        { value: 'week', label: 'THIS WEEK' },
        { value: 'month', label: 'THIS MONTH' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'amount_desc', label: 'Amount (High to Low)' },
        { value: 'amount_asc', label: 'Amount (Low to High)' }
    ];

    // Filter and sort entries
    const filteredEntries = mobileEntries
        .filter(entry => {
            const matchesSearch = searchTerm === '' ||
                entry.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (entry.vendor && entry.vendor.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (entry.category && entry.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
                entry.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.projectName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesType = typeFilter === 'all' || entry.type === typeFilter;
            const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;

            // Date range filtering
            let matchesDate = true;
            if (dateRange !== 'all') {
                const entryDate = new Date(entry.date);
                const today = new Date();

                switch (dateRange) {
                    case 'today':
                        matchesDate = entryDate.toDateString() === today.toDateString();
                        break;
                    case 'week':
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        matchesDate = entryDate >= weekAgo;
                        break;
                    case 'month':
                        matchesDate = entryDate.getMonth() === today.getMonth() &&
                            entryDate.getFullYear() === today.getFullYear();
                        break;
                }
            }

            return matchesSearch && matchesType && matchesStatus && matchesDate;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.date) - new Date(a.date);
                case 'oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'amount_desc':
                    return (b.amount || 0) - (a.amount || 0);
                case 'amount_asc':
                    return (a.amount || 0) - (b.amount || 0);
                default:
                    return 0;
            }
        });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending Sync': return 'warning';
            case 'Synced': return 'success';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Cost Entry': return 'bg-blue-100 text-blue-800';
            case 'Photo Upload': return 'bg-purple-100 text-purple-800';
            case 'Comment': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const calculateSummary = () => {
        const totalEntries = filteredEntries.length;
        const pendingSync = filteredEntries.filter(e => e.status === 'Pending Sync').length;
        const syncedEntries = filteredEntries.filter(e => e.status === 'Synced').length;
        const totalCostAmount = filteredEntries.reduce((sum, entry) => sum + (entry.type === 'Cost Entry' ? entry.amount : 0), 0);

        return {
            totalEntries,
            pendingSync,
            syncedEntries,
            totalCostAmount
        };
    };

    const summary = calculateSummary();

    const formatAmount = (amount) => {
        return amount !== null ? `$${amount.toLocaleString()}` : 'N/A';
    };

    // Button handlers
    const handleViewEntry = (entryId) => {
        const entry = mobileEntries.find(e => e.id === entryId);
        setSelectedEntry(entry);
        setShowViewModal(true);
    };

    const handleEditEntry = (entryId) => {
        const entry = mobileEntries.find(e => e.id === entryId);
        setSelectedEntry(entry);
        setEditFormData({
            type: entry.type,
            category: entry.category || '',
            amount: entry.amount || '',
            vendor: entry.vendor || '',
            notes: entry.notes || ''
        });
        setShowEditModal(true);
    };

    const handleDeleteEntry = (entryId) => {
        const entry = mobileEntries.find(e => e.id === entryId);
        setSelectedEntry(entry);
        setShowDeleteModal(true);
    };

    const confirmEdit = () => {
        if (!editFormData.notes.trim()) {
            alert('Notes field is required.');
            return;
        }

        setMobileEntries(prevEntries =>
            prevEntries.map(entry =>
                entry.id === selectedEntry.id ? {
                    ...entry,
                    type: editFormData.type,
                    category: editFormData.category,
                    amount: editFormData.amount ? parseFloat(editFormData.amount) : null,
                    vendor: editFormData.vendor,
                    notes: editFormData.notes
                } : entry
            )
        );
        setShowEditModal(false);
        setSelectedEntry(null);
        alert('Entry updated successfully!');
    };

    const confirmDelete = () => {
        setMobileEntries(prevEntries =>
            prevEntries.filter(entry => entry.id !== selectedEntry.id)
        );
        setShowDeleteModal(false);
        setSelectedEntry(null);
        alert('Entry deleted successfully!');
    };

    const handleSyncSelected = () => {
        console.log('Syncing selected entries...');
        alert('Sync functionality would be implemented here');
    };

    const handleCreateNew = () => {
        console.log('Creating new mobile entry');
        // Navigate to mobile entry creation form
    };

    const navigate = useNavigate();

    // View Modal Component
    const ViewModal = () => (
        selectedEntry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Mobile Entry Details</h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <i className="bi bi-x-lg text-lg sm:text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {/* Entry Header */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${getTypeColor(selectedEntry.type)}`}>
                                {selectedEntry.type === 'Cost Entry' && <i className="bi bi-currency-dollar"></i>}
                                {selectedEntry.type === 'Photo Upload' && <i className="bi bi-camera"></i>}
                                {selectedEntry.type === 'Comment' && <i className="bi bi-chat-dots"></i>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">{selectedEntry.type}</h3>
                                    {selectedEntry.category && (
                                        <span className="text-xs sm:text-sm font-medium text-gray-600">({selectedEntry.category})</span>
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                    <span>{new Date(selectedEntry.date).toLocaleDateString()}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="truncate">{selectedEntry.projectCode} - {selectedEntry.projectName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Entry Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Entry Type</label>
                                    <p className="text-sm sm:text-base text-gray-900">{selectedEntry.type}</p>
                                </div>
                                {selectedEntry.category && (
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedEntry.category}</p>
                                    </div>
                                )}
                                {selectedEntry.amount !== null && (
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Amount</label>
                                        <p className="text-lg sm:text-xl font-bold text-red-600">{formatAmount(selectedEntry.amount)}</p>
                                    </div>
                                )}
                                {selectedEntry.vendor && (
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Vendor</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedEntry.vendor}</p>
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Date</label>
                                    <p className="text-sm sm:text-base text-gray-900">{new Date(selectedEntry.date).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedEntry.status)}`}>
                                        {selectedEntry.status}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Project</label>
                                    <p className="text-sm sm:text-base text-gray-900 break-words">{selectedEntry.projectCode} - {selectedEntry.projectName}</p>
                                </div>
                                {selectedEntry.syncDate && (
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Sync Date</label>
                                        <p className="text-sm sm:text-base text-gray-900">{new Date(selectedEntry.syncDate).toLocaleString()}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Notes */}
                        {selectedEntry.notes && (
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Notes</label>
                                <p className="text-sm sm:text-base text-gray-900 bg-gray-50 p-3 rounded-lg leading-relaxed">{selectedEntry.notes}</p>
                            </div>
                        )}

                        {/* Photos */}
                        {selectedEntry.photos.length > 0 && (
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Photos ({selectedEntry.photos.length})</label>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                                    {selectedEntry.photos.map((photo, index) => (
                                        <div key={index} className="w-full h-16 sm:h-20 bg-gray-100 rounded-lg flex flex-col items-center justify-center overflow-hidden p-2">
                                            <i className="bi bi-image text-gray-400 text-lg sm:text-2xl"></i>
                                            <span className="text-xs text-gray-500 text-center truncate w-full">{photo}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );

    // Edit Modal Component
    const EditModal = () => (
        selectedEntry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Mobile Entry</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <i className="bi bi-x-lg text-lg sm:text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Entry Type *</label>
                                <select
                                    value={editFormData.type}
                                    onChange={(e) => setEditFormData({...editFormData, type: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base  text-gray-900"
                                >
                                    <option value="Cost Entry">Cost Entry</option>
                                    <option value="Photo Upload">Photo Upload</option>
                                    <option value="Comment">Comment</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Category</label>
                                <input
                                    type="text"
                                    value={editFormData.category}
                                    onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base  text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Amount</label>
                                <input
                                    type="number"
                                    value={editFormData.amount}
                                    onChange={(e) => setEditFormData({...editFormData, amount: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base  text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Vendor</label>
                                <input
                                    type="text"
                                    value={editFormData.vendor}
                                    onChange={(e) => setEditFormData({...editFormData, vendor: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base  text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Notes *</label>
                            <textarea
                                value={editFormData.notes}
                                onChange={(e) => setEditFormData({...editFormData, notes: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base  text-gray-900"
                                rows="4"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <Button
                                color="gray"
                                size="sm"
                                onClick={() => setShowEditModal(false)}
                                className="order-2 sm:order-1"
                            >
                                Cancel
                            </Button>

                            <Button
                                color="primary"
                                size="sm"
                                onClick={confirmEdit}
                                className="order-1 sm:order-2"
                            >
                                Save
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        )
    );

    // Delete Modal Component
    const DeleteModal = () => (
        selectedEntry && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
                <div className="bg-white rounded-lg w-full max-w-md">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Delete Entry</h2>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-gray-600 p-1"
                            >
                                <i className="bi bi-x-lg text-lg sm:text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                                <i className="bi bi-exclamation-triangle text-red-600 text-lg sm:text-xl"></i>
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-base sm:text-lg font-medium text-gray-900">Confirm Deletion</h3>
                                <p className="text-xs sm:text-sm text-gray-600">This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-xs sm:text-sm font-medium text-gray-700">Entry Details:</p>
                            <p className="text-xs sm:text-sm text-gray-600">{selectedEntry.type} - {selectedEntry.category}</p>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{selectedEntry.notes}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 order-1 sm:order-2"
                            >
                                Delete Entry
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-phone text-indigo-600 text-lg"></i>
                            <div className="min-w-0">
                                <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">MOBILE INTERFACE ENTRIES</h1>

                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">

                            <Button
                                color="primary"
                                size="md"
                                onClick={handleSyncSelected}
                                className="font-medium"
                            >
                                <i className="bi bi-arrow-repeat mr-2"></i>
                                SYNC SELECTED
                            </Button>

                            <Button
                                color="success"
                                size="md"
                                onClick={() => navigate('/mobile-interface')}
                                className="font-medium"
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                ADD NEW ENTRY
                            </Button>
                        </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">Manage data captured from mobile devices</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-6">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">TOTAL ENTRIES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{summary.totalEntries}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">PENDING SYNC</h3>
                        <p className="text-lg sm:text-2xl font-bold text-yellow-600">{summary.pendingSync}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">SYNCED ENTRIES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">{summary.syncedEntries}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center col-span-2 lg:col-span-1">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">TOTAL COST</h3>
                        <p className="text-lg sm:text-2xl font-bold text-red-600">${summary.totalCostAmount.toLocaleString()}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">FILTERS & SEARCH</h2>
                    </div>

                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div>
                            <input
                                type="text"
                                placeholder="Search entries, vendors, categories, projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900"
                            />
                        </div>

                        {/* Filter Controls */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">TYPE</label>
                                <select
                                    value={typeFilter}
                                    onChange={(e) => setTypeFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                >
                                    {typeOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">STATUS</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">DATE RANGE</label>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                >
                                    {dateRangeOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">SORT BY</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end">

                                <Button
                                    color="gray"
                                    size="md"
                                    onClick={() => {
                                        setSearchTerm('');
                                        setTypeFilter('all');
                                        setStatusFilter('all');
                                        setDateRange('all');
                                        setSortBy('newest');
                                    }}
                                    className="font-medium"
                                >
                                    Clear Filters
                                </Button>


                            </div>
                        </div>
                    </div>
                </div>

                {/* Entries List */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                            ENTRIES ({filteredEntries.length})
                        </h2>
                    </div>

                    {filteredEntries.length === 0 ? (
                        <div className="text-center py-8 sm:py-12">
                            <i className="bi bi-inbox text-4xl sm:text-6xl text-gray-400 mb-4"></i>
                            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No entries found</h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                            <button
                                onClick={() => navigate('/mobile-interface')}
                                className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                Add First Entry
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            {filteredEntries.map((entry) => (
                                <div key={entry.id} className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
                                    {/* Entry Header */}
                                    <div className="flex items-start gap-3 mb-3 sm:mb-4">
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0 ${getTypeColor(entry.type)}`}>
                                            {entry.type === 'Cost Entry' && <i className="bi bi-currency-dollar"></i>}
                                            {entry.type === 'Photo Upload' && <i className="bi bi-camera"></i>}
                                            {entry.type === 'Comment' && <i className="bi bi-chat-dots"></i>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 mb-1">
                                                <h3 className="text-sm sm:text-base font-semibold text-gray-900">{entry.type}</h3>
                                                <Badge
                                                    color={getStatusColor(entry.status)}
                                                    size="sm"
                                                    className="w-auto px-2 py-1 rounded-full font-medium self-start sm:self-auto"
                                                >
                                                    {entry.status}
                                                </Badge>

                                            </div>
                                            {entry.category && (
                                                <p className="text-xs sm:text-sm text-gray-600 mb-1">{entry.category}</p>
                                            )}
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs text-gray-500">
                                                <span>{new Date(entry.date).toLocaleDateString()}</span>
                                                <span className="hidden sm:inline">•</span>
                                                <span className="truncate">{entry.projectCode}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Entry Details */}
                                    <div className="space-y-2 mb-3 sm:mb-4">
                                        {entry.amount !== null && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs sm:text-sm text-gray-600">Amount:</span>
                                                <span className="text-sm sm:text-base font-bold text-red-600">{formatAmount(entry.amount)}</span>
                                            </div>
                                        )}
                                        {entry.vendor && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs sm:text-sm text-gray-600">Vendor:</span>
                                                <span className="text-xs sm:text-sm text-gray-900 truncate ml-2">{entry.vendor}</span>
                                            </div>
                                        )}
                                        {entry.photos.length > 0 && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs sm:text-sm text-gray-600">Photos:</span>
                                                <span className="text-xs sm:text-sm text-gray-900">{entry.photos.length} attached</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Notes Preview */}
                                    {entry.notes && (
                                        <div className="mb-3 sm:mb-4">
                                            <p className="text-xs sm:text-sm text-gray-700 bg-gray-50 p-2 sm:p-3 rounded-lg line-clamp-2">
                                                {entry.notes}
                                            </p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

                                        <Button
                                            color="primary"
                                            size="sm"
                                            onClick={() => handleViewEntry(entry.id)}
                                            className="flex items-center justify-center"
                                        >
                                            <i className="bi bi-eye"></i>
                                        </Button>

                                        <Button
                                            color="warning"
                                            size="sm"
                                            onClick={() => handleEditEntry(entry.id)}
                                            className="flex items-center justify-center"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Button>

                                        <Button
                                            color="failure"
                                            size="sm"
                                            onClick={() => handleDeleteEntry(entry.id)}
                                            className="flex items-center justify-center"
                                        >
                                            <i className="bi bi-trash"></i>
                                        </Button>

                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modals */}
            {showViewModal && <ViewModal />}
            {showEditModal && <EditModal />}
            {showDeleteModal && <DeleteModal />}
        </div>
    );
};

export default MobileInterfaceListing;

