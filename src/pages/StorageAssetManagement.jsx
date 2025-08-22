import React, { useState } from 'react';
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';
const StorageAssetManagement = () => {
    const [activeTab, setActiveTab] = useState('Asset Cards');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showAddFileModal, setShowAddFileModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showEditFileModal, setShowEditFileModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showViewFileModal, setShowViewFileModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Initial asset data
    const [assetData, setAssetData] = useState([
        {
            id: 1,
            title: 'Storage Box',
            subtitle: 'SSI @ CeMat 2024 Pallet number: 147,148,149,150',
            cardNumber: '1/5',
            cardColor: 'bg-gray-600',
            name: '📋',
            subitems: { folder: '📁', file: '📄', count: 1 },
            attachments: '+2',
            itemsIn: 'Floor tiles and sub...',
            location: 'Jack Warehouse',
            weeklyCost: '$37.5',
            email: '',
            palletArea: '4',
            palletSize: '117x117x60... +3',
            status: 'Active',
            lastUpdated: '2025-01-15',
            category: 'Storage',
            weight: '125 kg',
            dimensions: '117x117x60 cm'
        },
        {
            id: 2,
            title: 'NZTE Equipment',
            subtitle: 'NZTE',
            cardNumber: '1/4',
            cardColor: 'bg-gray-500',
            name: '📋',
            subitems: { folder: '📁', file: '📄', count: 4 },
            attachments: '+1',
            itemsIn: '127 - black flooring...',
            location: 'Melbourne VIC...',
            weeklyCost: '$105',
            email: '',
            palletArea: '4',
            palletSize: '',
            status: 'Active',
            lastUpdated: '2025-01-14',
            category: 'Equipment',
            weight: '89 kg',
            dimensions: '200x150x80 cm'
        },
        {
            id: 3,
            title: 'Baxter Display',
            subtitle: 'Baxter @ CSANZ 2023',
            cardNumber: '1/2',
            cardColor: 'bg-blue-600',
            name: '📋',
            subitems: { folder: '📁', file: '📄', count: 2 },
            attachments: '',
            itemsIn: 'Walls and counter...',
            location: 'GREG WA',
            weeklyCost: '$60',
            email: 'allen.He@hirom...',
            palletArea: '2',
            palletSize: '2800... 2000...',
            status: 'Inactive',
            lastUpdated: '2025-01-12',
            category: 'Display',
            weight: '156 kg',
            dimensions: '280x200x150 cm'
        },
        {
            id: 4,
            title: 'Bryant Exhibit',
            subtitle: 'Bryant @ ADX 2024',
            cardNumber: '1/3',
            cardColor: 'bg-green-600',
            name: '📋',
            subitems: { folder: '📁', file: '', count: 0 },
            attachments: '',
            itemsIn: '126 - Big Timber b...',
            location: 'Jack Warehouse',
            weeklyCost: '$90',
            email: 'Mai@bryant.dental',
            palletArea: '2',
            palletSize: '3600... 12 x 1...',
            status: 'Active',
            lastUpdated: '2025-01-16',
            category: 'Exhibit',
            weight: '203 kg',
            dimensions: '360x120x180 cm'
        },
        {
            id: 5,
            title: 'Tech Display',
            subtitle: 'Tech Expo 2024',
            cardNumber: '1/1',
            cardColor: 'bg-purple-600',
            name: '📋',
            subitems: { folder: '📁', file: '📄', count: 3 },
            attachments: '+5',
            itemsIn: 'LED screens and...',
            location: 'Sydney NSW',
            weeklyCost: '$150',
            email: 'tech@expo.com',
            palletArea: '6',
            palletSize: '400x300x200...',
            status: 'Active',
            lastUpdated: '2025-01-17',
            category: 'Technology',
            weight: '275 kg',
            dimensions: '400x300x200 cm'
        }
    ]);

    // Files data
    const [filesData, setFilesData] = useState([
        {
            id: 1,
            name: 'Storage_Box_Manual.pdf',
            type: 'PDF',
            size: '2.5 MB',
            assetId: 1,
            assetName: 'Storage Box',
            category: 'Documentation',
            thumbnail: '📄',
            uploadDate: '2025-01-15'
        },
        {
            id: 2,
            name: 'Equipment_Specs.xlsx',
            type: 'Excel',
            size: '1.8 MB',
            assetId: 2,
            assetName: 'NZTE Equipment',
            category: 'Specifications',
            thumbnail: '📊',
            uploadDate: '2025-01-14'
        },
        {
            id: 3,
            name: 'Display_Photos.zip',
            type: 'Archive',
            size: '15.2 MB',
            assetId: 3,
            assetName: 'Baxter Display',
            category: 'Images',
            thumbnail: '📦',
            uploadDate: '2025-01-12'
        },
        {
            id: 4,
            name: 'Exhibit_Layout.dwg',
            type: 'CAD',
            size: '5.7 MB',
            assetId: 4,
            assetName: 'Bryant Exhibit',
            category: 'Design',
            thumbnail: '📐',
            uploadDate: '2025-01-16'
        }
    ]);

    // Form states
    const [newAsset, setNewAsset] = useState({
        title: '',
        subtitle: '',
        category: '',
        location: '',
        weeklyCost: '',
        email: '',
        palletArea: '',
        palletSize: '',
        itemsIn: '',
        weight: '',
        dimensions: ''
    });

    const [editAsset, setEditAsset] = useState({
        title: '',
        subtitle: '',
        category: '',
        location: '',
        weeklyCost: '',
        email: '',
        palletArea: '',
        palletSize: '',
        itemsIn: '',
        weight: '',
        dimensions: ''
    });

    const [newFile, setNewFile] = useState({
        name: '',
        type: '',
        size: '',
        assetId: '',
        category: ''
    });

    const [editFile, setEditFile] = useState({
        name: '',
        type: '',
        size: '',
        assetId: '',
        category: ''
    });

    // Filter assets based on search term
    const filteredAssets = assetData.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter files based on search term
    const filteredFiles = filesData.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        file.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get file thumbnail based on type
    const getFileThumbnail = (type) => {
        switch (type.toLowerCase()) {
            case 'pdf': return '📄';
            case 'excel': case 'xlsx': case 'xls': return '📊';
            case 'word': case 'doc': case 'docx': return '📝';
            case 'image': case 'jpg': case 'png': case 'gif': return '🖼️';
            case 'video': case 'mp4': case 'avi': return '🎥';
            case 'archive': case 'zip': case 'rar': return '📦';
            case 'cad': case 'dwg': case 'dxf': return '📐';
            default: return '📄';
        }
    };

    // Handle adding new asset
    const handleAddAsset = (e) => {
        e.preventDefault();

        if (!newAsset.title || !newAsset.category || !newAsset.location) {
            alert('Please fill in required fields (Title, Category, Location)');
            return;
        }

        const asset = {
            id: Math.max(...assetData.map(a => a.id)) + 1,
            title: newAsset.title,
            subtitle: newAsset.subtitle,
            cardNumber: '1/1',
            cardColor: 'bg-blue-600',
            name: '📋',
            subitems: { folder: '📁', file: '', count: 0 },
            attachments: '',
            itemsIn: newAsset.itemsIn,
            location: newAsset.location,
            weeklyCost: newAsset.weeklyCost,
            email: newAsset.email,
            palletArea: newAsset.palletArea,
            palletSize: newAsset.palletSize,
            status: 'Active',
            lastUpdated: new Date().toISOString().split('T')[0],
            category: newAsset.category,
            weight: newAsset.weight,
            dimensions: newAsset.dimensions
        };

        setAssetData([...assetData, asset]);
        setNewAsset({
            title: '',
            subtitle: '',
            category: '',
            location: '',
            weeklyCost: '',
            email: '',
            palletArea: '',
            palletSize: '',
            itemsIn: '',
            weight: '',
            dimensions: ''
        });
        setShowAddModal(false);

        // Show success message
        alert('Asset added successfully!');
    };

    // Handle adding new file
    const handleAddFile = (e) => {
        e.preventDefault();

        if (!newFile.name || !newFile.assetId) {
            alert('Please fill in required fields (File Name and Asset)');
            return;
        }

        const selectedAsset = assetData.find(a => a.id === parseInt(newFile.assetId));
        if (!selectedAsset) {
            alert('Please select a valid asset');
            return;
        }

        const file = {
            id: Math.max(...filesData.map(f => f.id)) + 1,
            name: newFile.name,
            type: newFile.type,
            size: newFile.size,
            assetId: parseInt(newFile.assetId),
            assetName: selectedAsset.title,
            category: newFile.category,
            thumbnail: getFileThumbnail(newFile.type),
            uploadDate: new Date().toISOString().split('T')[0]
        };

        setFilesData([...filesData, file]);
        setNewFile({
            name: '',
            type: '',
            size: '',
            assetId: '',
            category: ''
        });
        setShowAddFileModal(false);

        // Show success message
        alert('File added successfully!');
    };

    // Handle editing asset
    const handleEditAsset = (asset) => {
        setSelectedAsset(asset);
        setEditAsset({
            title: asset.title,
            subtitle: asset.subtitle,
            category: asset.category,
            location: asset.location,
            weeklyCost: asset.weeklyCost,
            email: asset.email,
            palletArea: asset.palletArea,
            palletSize: asset.palletSize,
            itemsIn: asset.itemsIn,
            weight: asset.weight,
            dimensions: asset.dimensions
        });
        setShowEditModal(true);
    };

    // Handle updating asset
    const handleUpdateAsset = (e) => {
        e.preventDefault();

        if (!editAsset.title || !editAsset.category || !editAsset.location) {
            alert('Please fill in required fields (Title, Category, Location)');
            return;
        }

        const updatedAssets = assetData.map(asset => {
            if (asset.id === selectedAsset.id) {
                return {
                    ...asset,
                    title: editAsset.title,
                    subtitle: editAsset.subtitle,
                    category: editAsset.category,
                    location: editAsset.location,
                    weeklyCost: editAsset.weeklyCost,
                    email: editAsset.email,
                    palletArea: editAsset.palletArea,
                    palletSize: editAsset.palletSize,
                    itemsIn: editAsset.itemsIn,
                    weight: editAsset.weight,
                    dimensions: editAsset.dimensions,
                    lastUpdated: new Date().toISOString().split('T')[0]
                };
            }
            return asset;
        });

        setAssetData(updatedAssets);
        setShowEditModal(false);
        setSelectedAsset(null);

        // Show success message
        alert('Asset updated successfully!');
    };

    // Handle editing file
    const handleEditFile = (file) => {
        setSelectedFile(file);
        setEditFile({
            name: file.name,
            type: file.type,
            size: file.size,
            assetId: file.assetId.toString(),
            category: file.category
        });
        setShowEditFileModal(true);
    };

    // Handle updating file
    const handleUpdateFile = (e) => {
        e.preventDefault();

        if (!editFile.name || !editFile.assetId) {
            alert('Please fill in required fields (File Name and Asset)');
            return;
        }

        const selectedAsset = assetData.find(a => a.id === parseInt(editFile.assetId));
        if (!selectedAsset) {
            alert('Please select a valid asset');
            return;
        }

        const updatedFiles = filesData.map(file => {
            if (file.id === selectedFile.id) {
                return {
                    ...file,
                    name: editFile.name,
                    type: editFile.type,
                    size: editFile.size,
                    assetId: parseInt(editFile.assetId),
                    assetName: selectedAsset.title,
                    category: editFile.category,
                    thumbnail: getFileThumbnail(editFile.type)
                };
            }
            return file;
        });

        setFilesData(updatedFiles);
        setShowEditFileModal(false);
        setSelectedFile(null);

        // Show success message
        alert('File updated successfully!');
    };

    // Handle viewing asset
    const handleViewAsset = (asset) => {
        setSelectedAsset(asset);
        setShowViewModal(true);
    };

    // Handle viewing file
    const handleViewFile = (file) => {
        setSelectedFile(file);
        setShowViewFileModal(true);
    };

    // Handle deleting asset
    const handleDeleteAsset = (assetId) => {
        if (window.confirm('Are you sure you want to delete this asset? This action cannot be undone.')) {
            const updatedAssets = assetData.filter(asset => asset.id !== assetId);
            setAssetData(updatedAssets);

            // Also remove associated files
            const updatedFiles = filesData.filter(file => file.assetId !== assetId);
            setFilesData(updatedFiles);

            alert('Asset and associated files deleted successfully!');
        }
    };

    // Handle deleting file
    const handleDeleteFile = (fileId) => {
        if (window.confirm('Are you sure you want to delete this file? This action cannot be undone.')) {
            const updatedFiles = filesData.filter(file => file.id !== fileId);
            setFilesData(updatedFiles);
            alert('File deleted successfully!');
        }
    };

    const AssetCard = ({ asset }) => (
        <Card>
            {/* Card Header with Image */}
            <div className={`${asset.cardColor} h-32 sm:h-48 relative flex items-center justify-center rounded-lg`}>
                <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs sm:text-sm">
                    {asset.cardNumber}
                </div>
                <div className="bg-black bg-opacity-30 rounded-lg px-4 sm:px-8 py-2 sm:py-4">
                    <h3 className="text-white text-sm sm:text-lg font-semibold text-center">{asset.title}</h3>
                </div>
            </div>

            {/* Card Content */}
            <div className="space-y-2 sm:space-y-3">
                {/* Title */}
                <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{asset.subtitle}</h4>

                {/* Details Grid */}
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    {/* Name Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <i className="bi bi-card-text text-gray-500"></i>
                            <span className="text-gray-600">Name</span>
                            <i className="bi bi-exclamation-triangle text-yellow-500"></i>
                        </div>
                    </div>

                    {/* Subitems Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <i className="bi bi-folder text-gray-500"></i>
                            <span className="text-gray-600">Subitems</span>
                            <div className="flex items-center gap-1">
                                <i className="bi bi-folder text-blue-500"></i>
                                {asset.subitems.file && <i className="bi bi-file-text text-blue-500"></i>}
                                {asset.subitems.count > 0 && (
                                    <span className="text-blue-600 font-medium">{asset.subitems.count}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Attachments Row */}
                    {asset.attachments && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 sm:gap-2">
                                <i className="bi bi-paperclip text-gray-500"></i>
                                <span className="text-gray-600">Attachm...</span>
                                <span className="bg-gray-500 text-white px-1 sm:px-2 py-1 rounded-full text-xs">
                                    {asset.attachments}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Items In Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                            <i className="bi bi-box text-gray-500 flex-shrink-0"></i>
                            <span className="text-gray-600 flex-shrink-0">Items In</span>
                        </div>
                        <span className="text-gray-900 text-xs truncate ml-2">{asset.itemsIn}</span>
                    </div>

                    {/* Location Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                            <i className="bi bi-geo-alt text-red-500 flex-shrink-0"></i>
                            <span className="text-gray-600 flex-shrink-0">Location</span>
                        </div>
                        <span className="text-gray-900 text-xs truncate ml-2">{asset.location}</span>
                    </div>

                    {/* Weekly Cost Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <i className="bi bi-currency-dollar text-green-500"></i>
                            <span className="text-gray-600">Weekly Cost</span>
                        </div>
                        <span className="text-gray-900 text-xs font-medium">{asset.weeklyCost}</span>
                    </div>

                    {/* Email Row */}
                    {asset.email && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                                <i className="bi bi-envelope text-gray-500 flex-shrink-0"></i>
                                <span className="text-gray-600 flex-shrink-0">Email</span>
                            </div>
                            <span className="text-blue-600 text-xs truncate ml-2">{asset.email}</span>
                        </div>
                    )}

                    {/* Pallet Area Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2">
                            <i className="bi bi-grid text-orange-500"></i>
                            <span className="text-gray-600">Pallet A...</span>
                        </div>
                        <span className="text-gray-900 text-xs">{asset.palletArea}</span>
                    </div>

                    {/* Pallet Size Row */}
                    {asset.palletSize && (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-1">
                                <i className="bi bi-rulers text-purple-500 flex-shrink-0"></i>
                                <span className="text-gray-600 flex-shrink-0">Pallet S...</span>
                            </div>
                            <span className="text-gray-900 text-xs truncate ml-2">{asset.palletSize}</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:pt-3 border-t border-gray-100">

                    <Button
                        color="primary"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleViewAsset(asset)}
                    >
                        <i className="bi bi-eye mr-1"></i>
                    </Button>

                    <Button
                        color="gray"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleEditAsset(asset)}
                    >
                        <i className="bi bi-pencil mr-1"></i>
                    </Button>


                    <Button
                        color="failure"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => handleDeleteAsset(asset.id)}
                    >
                        <i className="bi bi-trash"></i>
                    </Button>

                </div>

            </div>
        </Card>
    );

    const FileCard = ({ file }) => (
        <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3">
                {/* File Thumbnail */}
                <div className="text-2xl sm:text-3xl flex-shrink-0">
                    {file.thumbnail}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm sm:text-base truncate">{file.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{file.assetName}</p>
                    <div className="flex flex-wrap gap-2 mt-1 sm:mt-2 text-xs">

                        <Badge
                            color="info"
                            size="sm"
                            className="px-2 py-1 rounded-full"
                        >
                            {file.type}
                        </Badge>
                        <Badge
                            color="gray"
                            size="sm"
                            className="px-2 py-1 rounded-full"
                        >
                            {file.size}
                        </Badge>

                        <Badge
                            color="success"
                            size="sm"
                            className="px-2 py-1 rounded-full"
                        >
                            {file.category}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-3 pt-3 border-t border-gray-100">

                <Button
                    color="primary"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleViewFile(file)}
                >
                    <i className="bi bi-eye mr-1"></i>
                </Button>

                <Button
                    color="gray"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleEditFile(file)}
                >
                    <i className="bi bi-pencil mr-1"></i>
                </Button>


                <Button
                    color="failure"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleDeleteFile(file.id)}
                >
                    <i className="bi bi-trash"></i>
                </Button>


            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">STORAGE ASSET MANAGEMENT</h1>
                            <p className="text-sm sm:text-base text-gray-600">Manage your storage assets, files, and documentation</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

                            <Button
                                color="success"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={() => setShowAddModal(true)}
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                <span className="hidden sm:inline">Add Asset</span>
                                <span className="sm:hidden">Add</span>
                            </Button>

                            <Button
                                color="primary"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={() => setShowAddFileModal(true)}
                            >
                                <i className="bi bi-plus-circle mr-2"></i>
                                <span className="hidden sm:inline">Add File</span>
                                <span className="sm:hidden">Add</span>
                            </Button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search assets, files, locations..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        {['Asset Cards', 'Main Table', 'Files Gallery'].map((tab) => (
                            <Button
                                color="primary"
                                size="sm"
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex items-center gap-2 ${
                                    activeTab === tab
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {tab}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Summary Statistics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL ASSETS</h3>
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{assetData.length}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">ACTIVE ASSETS</h3>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">
                            {assetData.filter(a => a.status === 'Active').length}
                        </p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL FILES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-purple-600">{filesData.length}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">WEEKLY COST</h3>
                        <p className="text-lg sm:text-2xl font-bold text-orange-600">
                            ${assetData.reduce((sum, asset) => sum + parseFloat(asset.weeklyCost.replace('$', '')), 0).toFixed(1)}
                        </p>
                    </div>
                </div>

                {/* Content based on active tab */}
                {activeTab === 'Asset Cards' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
                        {filteredAssets.map((asset) => (
                            <AssetCard key={asset.id} asset={asset} />
                        ))}
                    </div>
                )}

                {activeTab === 'Main Table' && (
                    <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                        {/* Mobile Card View */}
                        <div className="block lg:hidden">
                            <div className="p-4 space-y-4">
                                {filteredAssets.map((asset) => (
                                    <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-gray-900 truncate">{asset.title}</h3>
                                                <p className="text-sm text-gray-600 truncate">{asset.subtitle}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 flex-shrink-0 ${
                                                asset.status === 'Active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}>
                                                {asset.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Category:</span>
                                                <span className="text-gray-900">{asset.category}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Location:</span>
                                                <span className="text-gray-900 truncate ml-2">{asset.location}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Weekly Cost:</span>
                                                <span className="text-gray-900 font-medium">{asset.weeklyCost}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Weight:</span>
                                                <span className="text-gray-900">{asset.weight}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Dimensions:</span>
                                                <span className="text-gray-900 truncate ml-2">{asset.dimensions}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-3 border-t border-gray-100">
                                            <button
                                                onClick={() => handleViewAsset(asset)}
                                                className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                            >
                                                <i className="bi bi-eye mr-1"></i>
                                                View
                                            </button>
                                            <button
                                                onClick={() => handleEditAsset(asset)}
                                                className="flex-1 px-3 py-2 bg-gray-600 text-white text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                                            >
                                                <i className="bi bi-pencil mr-1"></i>
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAsset(asset.id)}
                                                className="flex-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
                                            >
                                                <i className="bi bi-trash mr-1"></i>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Cost</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {filteredAssets.map((asset) => (
                                    <tr key={asset.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{asset.title}</div>
                                                <div className="text-sm text-gray-500">{asset.subtitle}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.weeklyCost}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                                    asset.status === 'Active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {asset.status}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.weight}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{asset.dimensions}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleViewAsset(asset)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleEditAsset(asset)}
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteAsset(asset.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'Files Gallery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {filteredFiles.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                )}

                {/* Add Asset Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Add New Asset</h3>
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleAddAsset} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newAsset.title}
                                            onChange={(e) => setNewAsset({...newAsset, title: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            required
                                            value={newAsset.category}
                                            onChange={(e) => setNewAsset({...newAsset, category: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Storage">Storage</option>
                                            <option value="Equipment">Equipment</option>
                                            <option value="Display">Display</option>
                                            <option value="Exhibit">Exhibit</option>
                                            <option value="Technology">Technology</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        value={newAsset.subtitle}
                                        onChange={(e) => setNewAsset({...newAsset, subtitle: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={newAsset.location}
                                            onChange={(e) => setNewAsset({...newAsset, location: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weekly Cost
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="$0.00"
                                            value={newAsset.weeklyCost}
                                            onChange={(e) => setNewAsset({...newAsset, weeklyCost: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weight
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="0 kg"
                                            value={newAsset.weight}
                                            onChange={(e) => setNewAsset({...newAsset, weight: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Dimensions
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="L x W x H cm"
                                            value={newAsset.dimensions}
                                            onChange={(e) => setNewAsset({...newAsset, dimensions: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={newAsset.email}
                                            onChange={(e) => setNewAsset({...newAsset, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pallet Area
                                        </label>
                                        <input
                                            type="text"
                                            value={newAsset.palletArea}
                                            onChange={(e) => setNewAsset({...newAsset, palletArea: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pallet Size
                                    </label>
                                    <input
                                        type="text"
                                        value={newAsset.palletSize}
                                        onChange={(e) => setNewAsset({...newAsset, palletSize: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Items In
                                    </label>
                                    <textarea
                                        value={newAsset.itemsIn}
                                        onChange={(e) => setNewAsset({...newAsset, itemsIn: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">

                                    <Button
                                        color="gray"
                                        size="md"
                                        className="flex items-center gap-2"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        color="success"
                                        size="md"
                                        className="flex items-center gap-2"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                         <span className="hidden sm:inline">Add Asset</span>
                                        <span className="sm:hidden">Add</span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Add File Modal */}
                {showAddFileModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Add New File</h3>
                                <button
                                    onClick={() => setShowAddFileModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleAddFile} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={newFile.name}
                                        onChange={(e) => setNewFile({...newFile, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Asset *
                                    </label>
                                    <select
                                        required
                                        value={newFile.assetId}
                                        onChange={(e) => setNewFile({...newFile, assetId: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                    >
                                        <option value="">Select Asset</option>
                                        {assetData.map((asset) => (
                                            <option key={asset.id} value={asset.id}>
                                                {asset.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            File Type
                                        </label>
                                        <select
                                            value={newFile.type}
                                            onChange={(e) => setNewFile({...newFile, type: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="PDF">PDF</option>
                                            <option value="Excel">Excel</option>
                                            <option value="Word">Word</option>
                                            <option value="Image">Image</option>
                                            <option value="Video">Video</option>
                                            <option value="Archive">Archive</option>
                                            <option value="CAD">CAD</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            File Size
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="0 MB"
                                            value={newFile.size}
                                            onChange={(e) => setNewFile({...newFile, size: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={newFile.category}
                                        onChange={(e) => setNewFile({...newFile, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Documentation">Documentation</option>
                                        <option value="Specifications">Specifications</option>
                                        <option value="Images">Images</option>
                                        <option value="Design">Design</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Report">Report</option>
                                    </select>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">


                                    <Button
                                        color="gray"
                                        size="md"
                                        className="flex items-center gap-2"
                                        onClick={() => setShowAddFileModal(false)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        type="submit"
                                        color="primary"
                                        size="md"
                                        className="flex items-center gap-2"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        <span className="hidden sm:inline">Add File</span>
                                        <span className="sm:hidden">Add</span>
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Asset Modal */}
                {showEditModal && selectedAsset && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Asset</h3>
                                <button
                                    onClick={() => setShowEditModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleUpdateAsset} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={editAsset.title}
                                            onChange={(e) => setEditAsset({...editAsset, title: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Category *
                                        </label>
                                        <select
                                            required
                                            value={editAsset.category}
                                            onChange={(e) => setEditAsset({...editAsset, category: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        >
                                            <option value="">Select Category</option>
                                            <option value="Storage">Storage</option>
                                            <option value="Equipment">Equipment</option>
                                            <option value="Display">Display</option>
                                            <option value="Exhibit">Exhibit</option>
                                            <option value="Technology">Technology</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subtitle
                                    </label>
                                    <input
                                        type="text"
                                        value={editAsset.subtitle}
                                        onChange={(e) => setEditAsset({...editAsset, subtitle: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Location *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={editAsset.location}
                                            onChange={(e) => setEditAsset({...editAsset, location: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weekly Cost
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="$0.00"
                                            value={editAsset.weeklyCost}
                                            onChange={(e) => setEditAsset({...editAsset, weeklyCost: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Weight
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="0 kg"
                                            value={editAsset.weight}
                                            onChange={(e) => setEditAsset({...editAsset, weight: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Dimensions
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="L x W x H cm"
                                            value={editAsset.dimensions}
                                            onChange={(e) => setEditAsset({...editAsset, dimensions: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={editAsset.email}
                                            onChange={(e) => setEditAsset({...editAsset, email: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Pallet Area
                                        </label>
                                        <input
                                            type="text"
                                            value={editAsset.palletArea}
                                            onChange={(e) => setEditAsset({...editAsset, palletArea: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Pallet Size
                                    </label>
                                    <input
                                        type="text"
                                        value={editAsset.palletSize}
                                        onChange={(e) => setEditAsset({...editAsset, palletSize: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Items In
                                    </label>
                                    <textarea
                                        value={editAsset.itemsIn}
                                        onChange={(e) => setEditAsset({...editAsset, itemsIn: e.target.value})}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditModal(false)}
                                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Update Asset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit File Modal */}
                {showEditFileModal && selectedFile && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Edit File</h3>
                                <button
                                    onClick={() => setShowEditFileModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <form onSubmit={handleUpdateFile} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={editFile.name}
                                        onChange={(e) => setEditFile({...editFile, name: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Asset *
                                    </label>
                                    <select
                                        required
                                        value={editFile.assetId}
                                        onChange={(e) => setEditFile({...editFile, assetId: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    >
                                        <option value="">Select Asset</option>
                                        {assetData.map((asset) => (
                                            <option key={asset.id} value={asset.id}>
                                                {asset.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            File Type
                                        </label>
                                        <select
                                            value={editFile.type}
                                            onChange={(e) => setEditFile({...editFile, type: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        >
                                            <option value="">Select Type</option>
                                            <option value="PDF">PDF</option>
                                            <option value="Excel">Excel</option>
                                            <option value="Word">Word</option>
                                            <option value="Image">Image</option>
                                            <option value="Video">Video</option>
                                            <option value="Archive">Archive</option>
                                            <option value="CAD">CAD</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            File Size
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="0 MB"
                                            value={editFile.size}
                                            onChange={(e) => setEditFile({...editFile, size: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={editFile.category}
                                        onChange={(e) => setEditFile({...editFile, category: e.target.value})}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-gray-900"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Documentation">Documentation</option>
                                        <option value="Specifications">Specifications</option>
                                        <option value="Images">Images</option>
                                        <option value="Design">Design</option>
                                        <option value="Manual">Manual</option>
                                        <option value="Report">Report</option>
                                    </select>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditFileModal(false)}
                                        className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Update File
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* View Asset Modal */}
                {showViewModal && selectedAsset && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Asset Details</h3>
                                <button
                                    onClick={() => setShowViewModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <p className="text-gray-900">{selectedAsset.title}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                        <p className="text-gray-900">{selectedAsset.category}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                    <p className="text-gray-900">{selectedAsset.subtitle}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                        <p className="text-gray-900">{selectedAsset.location}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Weekly Cost</label>
                                        <p className="text-gray-900 font-medium">{selectedAsset.weeklyCost}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                                        <p className="text-gray-900">{selectedAsset.weight}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                                        <p className="text-gray-900">{selectedAsset.dimensions}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                                            selectedAsset.status === 'Active'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {selectedAsset.status}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                                        <p className="text-gray-900">{new Date(selectedAsset.lastUpdated).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {selectedAsset.email && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <p className="text-blue-600">{selectedAsset.email}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pallet Area</label>
                                        <p className="text-gray-900">{selectedAsset.palletArea}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Pallet Size</label>
                                        <p className="text-gray-900">{selectedAsset.palletSize}</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Items In</label>
                                    <p className="text-gray-900">{selectedAsset.itemsIn}</p>
                                </div>

                                <div className="flex justify-end pt-4">

                                    <Button
                                        color="gray"
                                        size="sm"
                                        className="flex items-center gap-2"
                                        onClick={() => setShowViewModal(false)}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* View File Modal */}
                {showViewFileModal && selectedFile && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">File Details</h3>
                                <button
                                    onClick={() => setShowViewFileModal(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <i className="bi bi-x-lg text-xl"></i>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="text-center">
                                    <div className="text-4xl mb-2">{selectedFile.thumbnail}</div>
                                    <h4 className="font-medium text-gray-900">{selectedFile.name}</h4>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Associated Asset</label>
                                    <p className="text-gray-900">{selectedFile.assetName}</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                                        <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                                            {selectedFile.type}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                                        <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                                            {selectedFile.size}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                                        {selectedFile.category}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
                                    <p className="text-gray-900">{new Date(selectedFile.uploadDate).toLocaleDateString()}</p>
                                </div>

                                <div className="flex justify-end pt-4">
                                   
                                    <Button
                                        color="gray"
                                        size="sm"
                                        className="flex items-center gap-2"
                                        onClick={() => setShowViewFileModal(false)}
                                    >
                                        Close
                                    </Button>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StorageAssetManagement;

