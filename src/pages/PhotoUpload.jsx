import React, { useState } from 'react';
import { Card } from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const PhotoUpload = () => {
    const [selectedCostLine, setSelectedCostLine] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedUpload, setSelectedUpload] = useState(null);

    // Cost line data with state management
    const [costLineData, setCostLineData] = useState([
        {
            id: 1,
            category: 'Floor',
            amount: '$17,000',
            type: 'Material',
            photos: [
                { id: 1, name: 'Floor_1.jpg', thumbnail: '/api/placeholder/60/60', size: '2.1MB', uploadDate: '2025-01-15' },
                { id: 2, name: 'Floor_2.jpg', thumbnail: '/api/placeholder/60/60', size: '1.8MB', uploadDate: '2025-01-15' },
                { id: 3, name: 'Floor_3.jpg', thumbnail: '/api/placeholder/60/60', size: '2.3MB', uploadDate: '2025-01-14' }
            ]
        },
        {
            id: 2,
            category: 'Electrical',
            amount: '$18,000',
            type: 'Subcontractor',
            photos: [
                { id: 4, name: 'Electrical_1.jpg', thumbnail: '/api/placeholder/60/60', size: '1.9MB', uploadDate: '2025-01-14' },
                { id: 5, name: 'Electrical_2.jpg', thumbnail: '/api/placeholder/60/60', size: '2.2MB', uploadDate: '2025-01-14' },
                { id: 6, name: 'Electrical_3.jpg', thumbnail: '/api/placeholder/60/60', size: '1.7MB', uploadDate: '2025-01-13' },
                { id: 7, name: 'Electrical_4.jpg', thumbnail: '/api/placeholder/60/60', size: '2.0MB', uploadDate: '2025-01-13' }
            ]
        },
        {
            id: 3,
            category: 'Plumbing',
            amount: '$13,500',
            type: 'Subcontractor',
            photos: [
                { id: 8, name: 'Plumbing_1.jpg', thumbnail: '/api/placeholder/60/60', size: '1.6MB', uploadDate: '2025-01-13' },
                { id: 9, name: 'Plumbing_2.jpg', thumbnail: '/api/placeholder/60/60', size: '2.4MB', uploadDate: '2025-01-12' }
            ]
        },
        {
            id: 4,
            category: 'Graphics',
            amount: '$5,000',
            type: 'Material',
            photos: [
                { id: 10, name: 'Graphics_1.jpg', thumbnail: '/api/placeholder/60/60', size: '1.3MB', uploadDate: '2025-01-12' },
                { id: 11, name: 'Graphics_2.jpg', thumbnail: '/api/placeholder/60/60', size: '1.5MB', uploadDate: '2025-01-11' }
            ]
        },
        {
            id: 5,
            category: 'Build Items',
            amount: '$22,000',
            type: 'Material',
            photos: [
                { id: 12, name: 'Build_1.jpg', thumbnail: '/api/placeholder/60/60', size: '2.8MB', uploadDate: '2025-01-11' }
            ]
        }
    ]);

    // Recent uploads with state management
    const [recentUploads, setRecentUploads] = useState([
        {
            id: 1,
            title: 'Floor Installation',
            subtitle: 'Sample Image',
            date: '2025-01-15',
            size: '2.4MB',
            status: 'Uploaded',
            category: 'Floor',
            thumbnail: '/api/placeholder/150/150'
        },
        {
            id: 2,
            title: 'Electrical Work',
            subtitle: 'Sample Image',
            date: '2025-01-14',
            size: '1.8MB',
            status: 'Uploaded',
            category: 'Electrical',
            thumbnail: '/api/placeholder/150/150'
        },
        {
            id: 3,
            title: 'Plumbing Work',
            subtitle: 'Sample Image',
            date: '2025-01-13',
            size: '3.2MB',
            status: 'Uploaded',
            category: 'Plumbing',
            thumbnail: '/api/placeholder/150/150'
        }
    ]);

    const photoStats = [
        { label: 'Total Photos', value: '12', icon: '📷' },
        { label: 'Cost Lines', value: '5', icon: '📋' },
        { label: 'Avg Per Line', value: '2.4', icon: '📊' },
        { label: 'Total Size', value: '45MB', icon: '💾' },
        { label: 'Categories', value: '3', icon: '🏷️' },
        { label: 'Coverage', value: '100%', icon: '✅' }
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Material': return 'warning' ;
            case 'Subcontractor': return 'primary';
            case 'Labour': return 'success';
            case 'Overhead': return 'orange';
            default: return 'bg-gray-500';
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleFiles = (files) => {
        if (!selectedCostLine) {
            alert('Please select a cost line first before uploading photos.');
            return;
        }

        const newFiles = Array.from(files).map((file, index) => ({
            id: Date.now() + index,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(1) + 'MB',
            type: file.type,
            file: file,
            thumbnail: '/api/placeholder/60/60',
            uploadDate: new Date().toISOString().split('T')[0]
        }));

        // Add photos to the selected cost line
        setCostLineData(prevData =>
            prevData.map(line =>
                line.category === selectedCostLine
                    ? { ...line, photos: [...line.photos, ...newFiles] }
                    : line
            )
        );

        setUploadedFiles([...uploadedFiles, ...newFiles]);
        alert(`${newFiles.length} photo(s) uploaded successfully to ${selectedCostLine}!`);
    };

    const handleFileInput = (e) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    // Cost Line Upload Handler
    const handleCostLineUpload = (categoryId) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = 'image/*';
        input.onchange = (e) => {
            if (e.target.files) {
                const newFiles = Array.from(e.target.files).map((file, index) => ({
                    id: Date.now() + index,
                    name: file.name,
                    size: (file.size / 1024 / 1024).toFixed(1) + 'MB',
                    thumbnail: '/api/placeholder/60/60',
                    uploadDate: new Date().toISOString().split('T')[0]
                }));

                setCostLineData(prevData =>
                    prevData.map(line =>
                        line.id === categoryId
                            ? { ...line, photos: [...line.photos, ...newFiles] }
                            : line
                    )
                );

                const categoryName = costLineData.find(line => line.id === categoryId)?.category || 'Unknown';
                alert(`${newFiles.length} photo(s) uploaded successfully to ${categoryName}!`);
            }
        };
        input.click();
    };

    // Delete photo from cost line
    const handleDeletePhoto = (categoryId, photoId) => {
        setCostLineData(prevData =>
            prevData.map(line =>
                line.id === categoryId
                    ? { ...line, photos: line.photos.filter(photo => photo.id !== photoId) }
                    : line
            )
        );
        alert('Photo deleted successfully!');
    };

    // View photo handler
    const handleViewPhoto = (photo, categoryName) => {
        setSelectedPhoto({ ...photo, categoryName });
        setShowViewModal(true);
    };

    // Recent uploads handlers
    const handleViewUpload = (upload) => {
        setSelectedUpload(upload);
        setShowViewModal(true);
    };

    const handleDeleteUpload = (uploadId) => {
        setSelectedUpload(recentUploads.find(upload => upload.id === uploadId));
        setShowDeleteModal(true);
    };

    const confirmDeleteUpload = () => {
        setRecentUploads(prevUploads =>
            prevUploads.filter(upload => upload.id !== selectedUpload.id)
        );
        setShowDeleteModal(false);
        setSelectedUpload(null);
        alert('Upload deleted successfully!');
    };

    const handleDownloadUpload = (upload) => {
        alert(`Downloading ${upload.title}...`);
    };

    // View Modal Component
    const ViewModal = () => (
        (selectedPhoto || selectedUpload) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                                {selectedPhoto ? 'Photo Details' : 'Upload Details'}
                            </h2>
                            <button
                                onClick={() => {
                                    setShowViewModal(false);
                                    setSelectedPhoto(null);
                                    setSelectedUpload(null);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        {selectedPhoto ? (
                            <div className="space-y-4">
                                <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <i className="bi bi-image text-3xl sm:text-4xl text-gray-400"></i>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Name</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedPhoto.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedPhoto.categoryName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Size</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedPhoto.size}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Date</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedPhoto.uploadDate}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <i className="bi bi-image text-3xl sm:text-4xl text-gray-400"></i>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedUpload.title}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedUpload.category}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">File Size</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedUpload.size}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Upload Date</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedUpload.date}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedUpload.status}</p>
                                    </div>
                                    <div>
                                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <p className="text-sm sm:text-base text-gray-900">{selectedUpload.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );

    // Delete Modal Component
    const DeleteModal = () => (
        selectedUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-md">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Delete Upload</h2>
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedUpload(null);
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        <div className="flex items-center mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 flex-shrink-0">
                                <i className="bi bi-exclamation-triangle text-red-600 text-lg sm:text-xl"></i>
                            </div>
                            <div>
                                <h3 className="text-base sm:text-lg font-medium text-gray-900">Confirm Deletion</h3>
                                <p className="text-xs sm:text-sm text-gray-600">This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-xs sm:text-sm font-medium text-gray-700">Upload Details:</p>
                            <p className="text-xs sm:text-sm text-gray-600">{selectedUpload.title}</p>
                            <p className="text-xs sm:text-sm text-gray-600">{selectedUpload.category} - {selectedUpload.size}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3">
                            <button
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setSelectedUpload(null);
                                }}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteUpload}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                Delete Upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-6xl mx-auto">
                {/* Project Overview */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-clipboard-data text-blue-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">PROJECT OVERVIEW</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value="25-01-0001"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value="Office Building Construction"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">TOTAL PHOTOS</label>
                                <input
                                    type="text"
                                    value="12"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">COST LINES WITH PHOTOS</label>
                                <input
                                    type="text"
                                    value="5"
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upload New Photo */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-cloud-upload text-blue-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">UPLOAD NEW PHOTO</h2>
                    </div>

                    <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2">
                            <i className="bi bi-exclamation-triangle text-yellow-600 flex-shrink-0"></i>
                            <span className="text-xs sm:text-sm font-medium text-yellow-800">ATTACH TO COST LINE</span>
                        </div>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">SELECT COST LINE...</label>
                        <select
                            value={selectedCostLine}
                            onChange={(e) => setSelectedCostLine(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        >
                            <option value="">Select Cost Line...</option>
                            {costLineData.map((line) => (
                                <option key={line.id} value={line.category}>
                                    {line.category} - {line.amount} ({line.type})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Drag & Drop Area */}
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 sm:p-12 text-center transition-colors ${
                            dragActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-400 bg-gray-50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <div className="flex flex-col items-center gap-3 sm:gap-4">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                                <i className="bi bi-camera text-xl sm:text-2xl text-gray-500"></i>
                            </div>
                            <div>
                                <p className="text-sm sm:text-lg font-medium text-gray-700 mb-2">Click to upload or drag & drop photos</p>
                                <p className="text-xs sm:text-sm text-gray-500">Supports JPG, PNG, HEIC (Max 10MB per file)</p>
                            </div>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileInput}
                                className="hidden"
                                id="file-upload"
                            />
                            <label htmlFor="file-upload">
                                <Button
                                    color="primary"
                                    size="md"
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <i className="bi bi-upload"></i>
                                    <span className="hidden sm:inline">Choose Files</span>
                                    <span className="sm:hidden">Upload</span>
                                </Button>
                            </label>

                        </div>
                    </div>
                </div>

                {/* Cost Line Attachments */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-paperclip text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">COST LINE ATTACHMENTS</h2>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {costLineData.map((line) => (
                            <div key={line.id} className="border border-gray-300 rounded-lg p-3 sm:p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            color={getTypeColor(line.type)}
                                            size="sm"
                                            className="w-auto px-2 sm:px-3 py-1 rounded font-medium"
                                        >
                                            {line.category} - {line.amount} ({line.type})
                                        </Badge>

                                    </div>
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={() => handleCostLineUpload(line.id)}
                                        className="flex items-center gap-2 w-full sm:w-auto"
                                    >
                                        <i className="bi bi-upload"></i>
                                        <span className="hidden sm:inline">Upload File</span>
                                        <span className="sm:hidden">Upload</span>
                                    </Button>

                                </div>

                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-4">
                                    {line.photos.map((photo) => (
                                        <div key={photo.id} className="relative group">
                                            <div className="w-full h-12 sm:h-16 bg-gray-200 rounded border border-gray-300 flex items-center justify-center">
                                                <i className="bi bi-image text-gray-400 text-xs sm:text-sm"></i>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-1 truncate">{photo.name}</p>
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded flex items-center justify-center">
                                                <div className="flex gap-1">
                                                    <button
                                                        onClick={() => handleViewPhoto(photo, line.category)}
                                                        className="p-1 bg-white rounded text-xs hover:bg-gray-100"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => alert(`Downloading ${photo.name}...`)}
                                                        className="p-1 bg-white rounded text-xs hover:bg-gray-100"
                                                    >
                                                        <i className="bi bi-download"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePhoto(line.id, photo.id)}
                                                        className="p-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Photo Statistics */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-bar-chart text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">PHOTO STATISTICS</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                        {photoStats.map((stat, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-lg sm:text-2xl mb-1">{stat.icon}</div>
                                <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Uploads */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-clock-history text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">RECENT UPLOADS</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {recentUploads.map((upload) => (
                            <div key={upload.id} className="border border-gray-300 rounded-lg p-3 sm:p-4">
                                <div className="w-full h-32 sm:h-40 bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                                    <i className="bi bi-image text-2xl sm:text-3xl text-gray-400"></i>
                                </div>

                                <div className="mb-3">
                                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{upload.title}</h3>
                                    <p className="text-xs sm:text-sm text-gray-600 mb-1">{upload.subtitle}</p>
                                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                                        <span>{upload.date}</span>
                                        <span>•</span>
                                        <span>{upload.size}</span>
                                        <span>•</span>
                                        <span className="text-green-600">{upload.status}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={() => handleViewUpload(upload)}
                                        className="flex items-center justify-center"
                                    >
                                        <i className="bi bi-eye"></i>
                                    </Button>

                                    <Button
                                        color="success"
                                        size="sm"
                                        onClick={() => handleDownloadUpload(upload)}
                                        className="flex items-center justify-center"
                                    >
                                        <i className="bi bi-download"></i>
                                    </Button>

                                    <Button
                                        color="failure"
                                        size="sm"
                                        onClick={() => handleDeleteUpload(upload.id)}
                                        className="flex items-center justify-center"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Modals */}
                {showViewModal && <ViewModal />}
                {showDeleteModal && <DeleteModal />}
            </div>
        </div>
    );
};

export default PhotoUpload;

