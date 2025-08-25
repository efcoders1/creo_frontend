import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const MobileInterface = () => {
    const [activeTab, setActiveTab] = useState('cost');
    const [formData, setFormData] = useState({
        category: '',
        amount: '',
        vendor: '',
        date: '07/18/2025',
        notes: ''
    });
    const [offlineMode, setOfflineMode] = useState(false);
    const [autoSync, setAutoSync] = useState(true);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);

    const offlineQueue = [
        {
            id: 1,
            type: 'Floor Materials',
            description: '$2,500 - ABC Flooring Co',
            date: 'Jul 16, 2025',
            status: 'Pending'
        },
        {
            id: 2,
            type: 'Electrical Work',
            description: '$1,800 - ElectriPro Services',
            date: 'Jul 15, 2025',
            status: 'Pending'
        },
        {
            id: 3,
            type: 'Plumbing Repair',
            description: '$650 - Quick Fix Plumbing',
            date: 'Jul 14, 2025',
            status: 'Pending'
        }
    ];

    const recentEntries = [
        {
            id: 1,
            type: 'Graphics',
            description: 'Creative Graphics Ltd - Logo design',
            date: 'Jul 17, 2025 • 3 hours ago',
            amount: '$1,500',
            color: 'bg-blue-500'
        },
        {
            id: 2,
            type: 'Electrical',
            description: 'ElectriPro Services - Progress payment',
            date: 'Jul 16, 2025 • 1 day ago',
            amount: '$3,500',
            color: 'bg-blue-500'
        },
        {
            id: 3,
            type: 'Floor',
            description: 'ABC Flooring Co - Material delivery',
            date: 'Jul 14, 2025 • 3 days ago',
            amount: '$5,000',
            color: 'bg-blue-500'
        }
    ];

    const categories = [
        'Select Category',
        'Floor',
        'Build Items',
        'Electrical',
        'Plumbing',
        'Graphics',
        'Management Fee'
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePhotoUpload = (event) => {
        const files = Array.from(event.target.files);
        const newPhotos = files.map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(1) + 'MB',
            file: file
        }));
        setUploadedPhotos([...uploadedPhotos, ...newPhotos]);
    };

    const handleSubmit = () => {
        if (offlineMode) {
            console.log('Saving to offline queue...');
            // Add to offline queue
        } else {
            console.log('Submitting form...', formData);
            // Submit to server
        }

        // Reset form
        setFormData({
            category: '',
            amount: '',
            vendor: '',
            date: '07/18/2025',
            notes: ''
        });
        setUploadedPhotos([]);
    };

    const handleSaveOffline = () => {
        console.log('Saving offline...', formData);
        // Save to local storage or offline queue
    };

    const handleSync = () => {
        console.log('Syncing data...');
        // Sync offline data with server
    };

    const navigate = useNavigate();

    const renderTabContent = () => {
        switch (activeTab) {
            case 'cost':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Add Actual Cost Form */}
                        <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <i className="bi bi-currency-dollar text-yellow-600 text-lg"></i>
                                <h2 className="text-base sm:text-lg font-semibold text-gray-900">ADD ACTUAL COST</h2>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                {/* Category */}
                                <div>
                                    <label className=" block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        CATEGORY
                                    </label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg  text-gray-900"
                                    >
                                        {categories.map((category, index) => (
                                            <option key={index} value={category === 'Select Category' ? '' : category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Amount */}
                                <div>
                                    <label className=" block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        AMOUNT ($)
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="0.00"
                                        value={formData.amount}
                                        onChange={(e) => handleInputChange('amount', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg  text-gray-900"
                                    />
                                </div>

                                {/* Vendor/Supplier */}
                                <div>
                                    <label className=" block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        VENDOR/SUPPLIER
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter vendor name"
                                        value={formData.vendor}
                                        onChange={(e) => handleInputChange('vendor', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg  text-gray-900"
                                    />
                                </div>

                                {/* Date */}
                                <div>
                                    <label className=" block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        DATE
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleInputChange('date', e.target.value)}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg  text-gray-900"
                                    />
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className=" block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        NOTES
                                    </label>
                                    <textarea
                                        placeholder="Additional details..."
                                        value={formData.notes}
                                        onChange={(e) => handleInputChange('notes', e.target.value)}
                                        rows={4}
                                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg resize-none  text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Photo Upload Section */}
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-8 text-center">
                            <div className="flex flex-col items-center gap-3 sm:gap-4">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <i className="bi bi-camera text-xl sm:text-2xl text-gray-500"></i>
                                </div>
                                <div>
                                    <p className="text-base sm:text-lg font-medium text-gray-700 mb-2">TAP TO ADD PHOTOS</p>
                                    <p className="text-xs sm:text-sm text-gray-500">Camera or Gallery</p>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                    className="hidden"
                                    id="photo-upload"
                                />

                                <button
                                    type="button"
                                    onClick={() => document.getElementById("photo-upload").click()}
                                    className="flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                                >
                                    <i className="bi bi-image"></i>
                                </button>


                            </div>

                            {uploadedPhotos.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {uploadedPhotos.map((photo) => (
                                        <div key={photo.id} className="relative">
                                            <div className="w-full h-16 sm:h-20 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                                                <i className="bi bi-image text-gray-400"></i>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1 truncate">{photo.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <Button
                                color="primary"
                                size="sm"
                                onClick={handleSubmit}
                            >
                                SUBMIT

                            </Button>
                            <Button
                                color="gray"
                                size="sm"
                                onClick={handleSaveOffline}
                            >
                                SAVE OFFLINE

                            </Button>
                        </div>

                    </div>
                );

            case 'photo':
                return (
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <i className="bi bi-camera text-blue-600 text-lg"></i>
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">PHOTO CAPTURE</h2>
                        </div>
                        <div className="text-center py-8 sm:py-12">
                            <i className="bi bi-camera text-4xl sm:text-6xl text-gray-400 mb-4"></i>
                            <p className="text-base sm:text-lg text-gray-600">Camera functionality would be implemented here</p>
                        </div>
                    </div>
                );

            case 'comment':
                return (
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <i className="bi bi-chat-dots text-green-600 text-lg"></i>
                            <h2 className="text-base sm:text-lg font-semibold text-gray-900">ADD COMMENT</h2>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <textarea
                                placeholder="Enter your comment..."
                                rows={6}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base sm:text-lg resize-none"
                            />
                            <Button
                                color="success"
                                size="lg"
                                className="w-full"
                            >
                                POST COMMENT
                            </Button>

                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with Back Button */}
            <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
                <button
                    onClick={() => navigate('/mobile-interface-listing')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <i className="bi bi-arrow-left text-lg sm:text-xl"></i>
                </button>
            </div>

            {/* Top Navigation */}
            <div className="bg-white border-b border-gray-200 p-3 sm:p-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <button
                        onClick={() => setActiveTab('cost')}
                        className={`flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                            activeTab === 'cost'
                                ? 'border-yellow-500 bg-yellow-50'
                                : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                    >
                        <i className="bi bi-currency-dollar text-xl sm:text-2xl text-yellow-600"></i>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">ADD COST</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('photo')}
                        className={`flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                            activeTab === 'photo'
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                    >
                        <i className="bi bi-camera text-xl sm:text-2xl text-gray-600"></i>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">PHOTO</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('comment')}
                        className={`flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                            activeTab === 'comment'
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                    >
                        <i className="bi bi-chat-dots text-xl sm:text-2xl text-gray-600"></i>
                        <span className="text-xs sm:text-sm font-medium text-gray-900">COMMENT</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="p-3 sm:p-4">
                <div className=" mx-auto">
                    {renderTabContent()}
                </div>
            </div>

            {/* Offline Queue */}
            <div className="p-3 sm:p-4">
                <div className="mx-auto">
                    <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 sm:p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3">
                            <i className="bi bi-clock-history text-yellow-600"></i>
                            <span className="text-xs sm:text-sm font-medium text-yellow-800">OFFLINE QUEUE (3 ITEMS)</span>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {offlineQueue.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg p-3 border border-yellow-300">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 text-sm sm:text-base">{item.type}</h4>
                                            <p className="text-xs sm:text-sm text-gray-600 truncate">{item.description}</p>
                                            <p className="text-xs text-gray-500">{item.date}</p>
                                        </div>
                                        <Badge
                                            color="warning"
                                            size="sm"
                                            className="w-auto px-2 py-1 rounded-full font-medium flex-shrink-0"
                                        >
                                            {item.status}
                                        </Badge>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sync Controls */}
            <div className="p-3 sm:p-4">
                <div className="mx-auto">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 mb-4">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <i className="bi bi-arrow-repeat text-blue-600"></i>
                            <span className="text-xs sm:text-sm font-medium text-gray-900">SYNC CONTROLS</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button
                                color="success"
                                size="sm"
                                onClick={handleSync}
                            >
                                SYNC NOW
                            </Button>

                            <Button
                                color={autoSync ? "primary" : "secondary"}
                                size="sm"
                                onClick={() => setAutoSync(!autoSync)}
                            >
                                AUTO-SYNC: {autoSync ? "ON" : "OFF"}
                            </Button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Recent Entries */}
            <div className="p-3 sm:p-4 pb-6">
                <div className="mx-auto">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4">
                        <div className="flex items-center gap-2 mb-3 sm:mb-4">
                            <i className="bi bi-clock-history text-blue-600"></i>
                            <span className="text-xs sm:text-sm font-medium text-gray-900">RECENT ENTRIES</span>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {recentEntries.map((entry) => (
                                <div key={entry.id} className="border border-gray-200 rounded-lg p-3">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    color={entry.color}
                                                    size="sm"
                                                    className="bg-blue-600 w-auto px-2 py-1 rounded-full font-medium text-white"
                                                >
                                                    {entry.type}
                                                </Badge>

                                            </div>
                                            <h4 className="font-medium text-gray-900 text-xs sm:text-sm truncate">{entry.description}</h4>
                                            <p className="text-xs text-gray-500">{entry.date}</p>
                                        </div>
                                        <span className="text-sm sm:text-lg font-bold text-red-600 flex-shrink-0">{entry.amount}</span>
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

export default MobileInterface;

