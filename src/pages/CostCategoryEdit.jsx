import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const CostCategoryEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        type: 'MATERIAL',
        order: 1,
        icon: '',
        description: '',
        budgetAllocated: '',
        status: 'active',
        projects: []
    });

    // Dummy cost category data (same as in other components)
    const categories = [
        {
            id: 1,
            name: 'FLOOR',
            type: 'MATERIAL',
            order: 1,
            icon: '🏠',
            description: 'Flooring materials and installation costs',
            budgetAllocated: '$45,000',
            actualSpent: '$38,500',
            variance: '-$6,500',
            status: 'active',
            lastUpdated: '2025-01-15',
            projects: ['Office Building', 'Warehouse Renovation'],
            createdBy: 'Sarah Johnson',
            usageCount: 12
        },
        {
            id: 2,
            name: 'BUILD ITEMS',
            type: 'MATERIAL',
            order: 2,
            icon: '🔨',
            description: 'General construction materials and supplies',
            budgetAllocated: '$125,000',
            actualSpent: '$142,300',
            variance: '+$17,300',
            status: 'active',
            lastUpdated: '2025-01-18',
            projects: ['Office Building', 'Retail Store', 'Hospital Wing'],
            createdBy: 'Michael Chen',
            usageCount: 25
        },
        {
            id: 3,
            name: 'REFURB COST',
            type: 'LABOUR',
            order: 3,
            icon: '🔧',
            description: 'Refurbishment and renovation labor costs',
            budgetAllocated: '$85,000',
            actualSpent: '$79,200',
            variance: '-$5,800',
            status: 'active',
            lastUpdated: '2025-01-12',
            projects: ['Warehouse Renovation', 'Retail Store'],
            createdBy: 'Emma Thompson',
            usageCount: 8
        },
        {
            id: 4,
            name: 'GRAPHICS',
            type: 'MATERIAL',
            order: 4,
            icon: '🎨',
            description: 'Signage, graphics, and visual elements',
            budgetAllocated: '$15,000',
            actualSpent: '$12,800',
            variance: '-$2,200',
            status: 'active',
            lastUpdated: '2025-01-10',
            projects: ['Retail Store', 'Office Building'],
            createdBy: 'David Wilson',
            usageCount: 6
        },
        {
            id: 5,
            name: 'PLUMBING',
            type: 'SUBCONTRACTOR',
            order: 5,
            icon: '🚰',
            description: 'Plumbing installation and maintenance',
            budgetAllocated: '$65,000',
            actualSpent: '$68,500',
            variance: '+$3,500',
            status: 'active',
            lastUpdated: '2025-01-16',
            projects: ['Office Building', 'Hospital Wing', 'Warehouse'],
            createdBy: 'Robert Smith',
            usageCount: 15
        },
        {
            id: 6,
            name: 'ELECTRICAL',
            type: 'SUBCONTRACTOR',
            order: 6,
            icon: '⚡',
            description: 'Electrical systems and installations',
            budgetAllocated: '$95,000',
            actualSpent: '$89,200',
            variance: '-$5,800',
            status: 'active',
            lastUpdated: '2025-01-14',
            projects: ['Office Building', 'Hospital Wing', 'Retail Store'],
            createdBy: 'Sarah Johnson',
            usageCount: 18
        },
        {
            id: 7,
            name: 'AUDIO VISUAL',
            type: 'SUBCONTRACTOR',
            order: 7,
            icon: '📺',
            description: 'Audio visual equipment and installation',
            budgetAllocated: '$35,000',
            actualSpent: '$32,100',
            variance: '-$2,900',
            status: 'active',
            lastUpdated: '2025-01-11',
            projects: ['Office Building', 'Hospital Wing'],
            createdBy: 'Michael Chen',
            usageCount: 4
        },
        {
            id: 8,
            name: 'MANAGEMENT FEE',
            type: 'OVERHEAD',
            order: 8,
            icon: '💼',
            description: 'Project management and administrative costs',
            budgetAllocated: '$75,000',
            actualSpent: '$75,000',
            variance: '$0',
            status: 'active',
            lastUpdated: '2025-01-17',
            projects: ['All Projects'],
            createdBy: 'Emma Thompson',
            usageCount: 30
        },
        {
            id: 9,
            name: 'HVAC SYSTEMS',
            type: 'SUBCONTRACTOR',
            order: 9,
            icon: '❄️',
            description: 'Heating, ventilation, and air conditioning',
            budgetAllocated: '$120,000',
            actualSpent: '$115,600',
            variance: '-$4,400',
            status: 'active',
            lastUpdated: '2025-01-13',
            projects: ['Office Building', 'Hospital Wing'],
            createdBy: 'David Wilson',
            usageCount: 10
        },
        {
            id: 10,
            name: 'SECURITY SYSTEMS',
            type: 'SUBCONTRACTOR',
            order: 10,
            icon: '🔒',
            description: 'Security equipment and installation',
            budgetAllocated: '$25,000',
            actualSpent: '$0',
            variance: '-$25,000',
            status: 'inactive',
            lastUpdated: '2025-01-05',
            projects: ['Office Building'],
            createdBy: 'Robert Smith',
            usageCount: 1
        },
        {
            id: 11,
            name: 'LANDSCAPING',
            type: 'SUBCONTRACTOR',
            order: 11,
            icon: '🌿',
            description: 'Landscaping and outdoor area development',
            budgetAllocated: '$40,000',
            actualSpent: '$42,800',
            variance: '+$2,800',
            status: 'completed',
            lastUpdated: '2024-12-20',
            projects: ['School Playground'],
            createdBy: 'Emma Thompson',
            usageCount: 3
        },
        {
            id: 12,
            name: 'DEMOLITION',
            type: 'LABOUR',
            order: 12,
            icon: '🏗️',
            description: 'Demolition and site preparation work',
            budgetAllocated: '$30,000',
            actualSpent: '$28,500',
            variance: '-$1,500',
            status: 'completed',
            lastUpdated: '2024-11-15',
            projects: ['Warehouse Renovation'],
            createdBy: 'Michael Chen',
            usageCount: 5
        }
    ];

    const typeOptions = [
        { value: 'LABOUR', label: 'LABOUR', color: 'bg-yellow-500' },
        { value: 'MATERIAL', label: 'MATERIAL', color: 'bg-green-500' },
        { value: 'SUBCONTRACTOR', label: 'SUBCONTRACTOR', color: 'bg-blue-500' },
        { value: 'OVERHEAD', label: 'OVERHEAD', color: 'bg-orange-500' }
    ];

    const statusOptions = [
        { value: 'active', label: 'ACTIVE' },
        { value: 'inactive', label: 'INACTIVE' },
        { value: 'completed', label: 'COMPLETED' }
    ];

    const availableProjects = [
        'Office Building',
        'Warehouse Renovation',
        'Retail Store',
        'Hospital Wing',
        'School Playground',
        'All Projects'
    ];

    useEffect(() => {
        // Load category data
        const category = categories.find(cat => cat.id === parseInt(id));
        if (category) {
            setFormData({
                name: category.name,
                type: category.type,
                order: category.order,
                icon: category.icon,
                description: category.description,
                budgetAllocated: category.budgetAllocated.replace('$', '').replace(',', ''),
                status: category.status,
                projects: category.projects
            });
        }
        setLoading(false);
    }, [id]);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.budgetAllocated || isNaN(parseFloat(formData.budgetAllocated))) {
            newErrors.budgetAllocated = 'Valid budget amount is required';
        }

        if (formData.order < 1) {
            newErrors.order = 'Display order must be at least 1';
        }

        if (!formData.icon.trim()) {
            newErrors.icon = 'Icon is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleProjectToggle = (project) => {
        setFormData(prev => ({
            ...prev,
            projects: prev.projects.includes(project)
                ? prev.projects.filter(p => p !== project)
                : [...prev.projects, project]
        }));
    };

    const handleSave = async () => {
        if (!validateForm()) {
            return;
        }

        setSaving(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Saving category:', formData);
            setSaving(false);
            navigate(`/cost-category/view/${id}`);
        }, 1000);
    };

    const handleCancel = () => {
        navigate(`/cost-category/view/${id}`);
    };

    const handleBack = () => {
        navigate('/cost-category-listing');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-3 sm:mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Enhanced Page Header - Better Mobile Layout */}

                <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 lg:p-6">
                    {/* Header Row */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                        >
                            <i className="bi bi-arrow-left text-sm sm:text-base lg:text-lg"></i>
                        </button>

                        {/* Title */}
                        <i className="bi bi-pencil-square text-blue-600 text-sm sm:text-base lg:text-lg flex-shrink-0"></i>
                        <h1 className="text-sm sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
                            EDIT COST CATEGORY
                        </h1>

                        {/* Buttons - Top Right */}
                        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
                            {/* Cancel Button */}
                            <Button
                                color="gray"
                                size="md"
                                className="flex items-center gap-2"
                                onClick={handleCancel}
                            >
                                <i className="bi bi-x-circle mr-1 sm:mr-2"></i>
                                <span className="hidden sm:inline">CANCEL</span>
                                <span className="sm:hidden">CANCEL</span>
                            </Button>

                            {/* Save Button */}
                            <Button
                                color="primary"
                                size="md"
                                className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleSave}
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <i className="bi bi-arrow-clockwise animate-spin mr-1 sm:mr-2"></i>
                                        <span className="hidden sm:inline">SAVING...</span>
                                        <span className="sm:hidden">SAVE...</span>
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle mr-1 sm:mr-2"></i>
                                        <span className="hidden sm:inline">SAVE CHANGES</span>
                                        <span className="sm:hidden">SAVE</span>
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm lg:text-base leading-relaxed">
                        Edit cost category information and settings
                    </p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">

                    {/* Enhanced Basic Information - Better Mobile Experience */}
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 lg:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                            <i className="bi bi-info-circle text-blue-600 text-sm sm:text-base lg:text-lg flex-shrink-0"></i>
                            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">BASIC INFORMATION</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    CATEGORY NAME *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={`w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base text-gray-900 ${
                                        errors.name ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter category name"
                                />
                                {errors.name && (
                                    <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    CATEGORY TYPE *
                                </label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base text-gray-900"
                                >
                                    {typeOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    DISPLAY ORDER *
                                </label>
                                <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    min="1"
                                    className={`w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base text-gray-900 ${
                                        errors.order ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter display order"
                                />
                                {errors.order && (
                                    <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.order}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    ICON *
                                </label>
                                <input
                                    type="text"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleInputChange}
                                    className={`w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base text-gray-900 ${
                                        errors.icon ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter emoji or icon"
                                />
                                {errors.icon && (
                                    <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.icon}</p>
                                )}
                                <p className="text-xs text-gray-500 mt-1">Use an emoji or icon character</p>
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    STATUS
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base text-gray-900"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Additional Details - Better Mobile Experience */}
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 lg:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                            <i className="bi bi-gear text-blue-600 text-sm sm:text-base lg:text-lg flex-shrink-0"></i>
                            <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">ADDITIONAL DETAILS</h2>
                        </div>

                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    DESCRIPTION *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                    className={`w-full px-2.5 sm:px-3 lg:px-4 py-2 sm:py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs sm:text-sm lg:text-base text-gray-900 ${
                                        errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder="Enter category description"
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                                    BUDGET ALLOCATED *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs sm:text-sm">$</span>
                                    <input
                                        type="number"
                                        name="budgetAllocated"
                                        value={formData.budgetAllocated}
                                        onChange={handleInputChange}
                                        min="0"
                                        step="0.01"
                                        className={`w-full pl-6 sm:pl-8 pr-2.5 sm:pr-3 lg:pr-4 py-2 sm:py-2.5 lg:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm lg:text-base text-gray-900 ${
                                            errors.budgetAllocated ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                        placeholder="0.00"
                                    />
                                </div>
                                {errors.budgetAllocated && (
                                    <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.budgetAllocated}</p>
                                )}
                            </div>

                            {/* Enhanced Project Assignment - Better Mobile Layout */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                                    ASSIGNED PROJECTS
                                </label>
                                <div className="space-y-1.5 sm:space-y-2 max-h-40 sm:max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-2 sm:p-3">
                                    {availableProjects.map((project) => (
                                        <label key={project} className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:bg-gray-50 p-1.5 sm:p-2 rounded">
                                            <input
                                                type="checkbox"
                                                checked={formData.projects.includes(project)}
                                                onChange={() => handleProjectToggle(project)}
                                                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                                            />
                                            <span className="text-xs sm:text-sm text-gray-900">{project}</span>
                                        </label>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-1.5 sm:mt-2">
                                    Select projects where this category will be used
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Preview Section - Better Mobile Layout */}
                <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-4 lg:p-6">
                    <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-6">
                        <i className="bi bi-eye text-green-600 text-sm sm:text-base lg:text-lg flex-shrink-0"></i>
                        <h2 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">PREVIEW</h2>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="cursor-move text-gray-400 flex-shrink-0">
                                    <i className="bi bi-grip-vertical text-sm sm:text-base"></i>
                                </div>
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                                    {formData.icon || '❓'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                            {formData.name || 'Category Name'}
                                        </h3>
                                        <Badge
                                            size="sm"
                                            className={`px-2 sm:px-3 py-1 rounded-full font-medium ${
                                                formData.type === 'LABOUR'
                                                    ? 'bg-yellow-100 text-yellow-800 '
                                                    : formData.type === 'MATERIAL'
                                                        ? 'bg-green-600 text-white'
                                                        : formData.type === 'SUBCONTRACTOR'
                                                            ? 'bg-blue-600 text-white'
                                                            : formData.type === 'OVERHEAD'
                                                                ? 'bg-red-600 text-white'
                                                                : 'bg-gray-600'
                                            }`}
                                        >
                                            {formData.type}
                                        </Badge>

                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                                <div className="flex items-center gap-2">
                                    <label className="text-gray-600">Order:</label>
                                    <span className="font-medium">{formData.order}</span>
                                </div>
                                <div className="text-gray-600">
                                    Budget: ${parseFloat(formData.budgetAllocated || 0).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {formData.description && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{formData.description}</p>
                            </div>
                        )}

                        {formData.projects.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-2">Assigned to projects:</p>
                                <div className="flex flex-wrap gap-1">
                                    {formData.projects.map((project) => (
                                        <Badge
                                            key={project}
                                            color="primary"
                                            size="sm"
                                            className="px-2 sm:px-3 py-1 rounded-full font-medium"
                                        >
                                            {project}
                                        </Badge>

                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Enhanced Action Buttons - Better Mobile Layout */}
                <div className="flex flex-row gap-3 pt-3 sm:pt-4 lg:pt-0">
                    {/* Cancel Button */}
                    <Button
                        color="gray"
                        size="md"
                        className="flex items-center gap-2"
                        onClick={handleCancel}
                    >
                        <i className="bi bi-x-circle mr-1 sm:mr-2"></i>
                        <span className="hidden sm:inline">CANCEL</span>
                        <span className="sm:hidden">CANCEL</span>
                    </Button>

                    {/* Save Button */}
                    <Button
                        color="primary"
                        size="md"
                        className="flex items-center gap-2"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? (
                            <>
                                <i className="bi bi-arrow-clockwise animate-spin mr-1 sm:mr-2"></i>
                                <span className="hidden sm:inline">SAVING CHANGES...</span>
                                <span className="sm:hidden">SAVING...</span>
                            </>
                        ) : (
                            <>
                                <i className="bi bi-check-circle mr-1 sm:mr-2"></i>
                                <span className="hidden sm:inline">SAVE CHANGES</span>
                                <span className="sm:hidden">SAVE</span>
                            </>
                        )}
                    </Button>
                </div>


            </div>
        </div>
    );
};

export default CostCategoryEdit;

