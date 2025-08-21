import React, { useState } from 'react';

const EditCategoryPage = ({ budget, onBack, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        projectName: budget?.projectName || '',
        projectManager: budget?.projectManager || '',
        budgetStatus: budget?.budgetStatus || 'draft',
        categories: budget?.categories?.map(cat => ({
            ...cat,
            id: Math.random().toString(36).substr(2, 9) // Add unique ID for form handling
        })) || []
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const statusOptions = [
        { value: 'draft', label: 'DRAFT' },
        { value: 'pending_review', label: 'PENDING REVIEW' },
        { value: 'approved', label: 'APPROVED' },
        { value: 'completed', label: 'COMPLETED' }
    ];

    const categoryTypes = [
        { value: 'LABOUR', label: 'LABOUR' },
        { value: 'MATERIAL', label: 'MATERIAL' },
        { value: 'SUBCONTRACTOR', label: 'SUBCONTRACTOR' },
        { value: 'OVERHEAD', label: 'OVERHEAD' }
    ];

    const getCategoryTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'bg-yellow-500';
            case 'MATERIAL': return 'bg-green-500';
            case 'SUBCONTRACTOR': return 'bg-blue-500';
            case 'OVERHEAD': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    const handleCategoryChange = (categoryId, field, value) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.map(cat =>
                cat.id === categoryId
                    ? { ...cat, [field]: field === 'budgeted' || field === 'scopeChange' ? parseFloat(value) || 0 : value }
                    : cat
            )
        }));
    };

    const addCategory = () => {
        const newCategory = {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            budgeted: 0,
            scopeChange: 0,
            type: 'MATERIAL'
        };
        setFormData(prev => ({
            ...prev,
            categories: [...prev.categories, newCategory]
        }));
    };

    const removeCategory = (categoryId) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.filter(cat => cat.id !== categoryId)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.projectName.trim()) {
            newErrors.projectName = 'Project name is required';
        }

        if (!formData.projectManager.trim()) {
            newErrors.projectManager = 'Project manager is required';
        }

        // Validate categories
        formData.categories.forEach((category, index) => {
            if (!category.name.trim()) {
                newErrors[`category_${category.id}_name`] = 'Category name is required';
            }
            if (category.budgeted < 0) {
                newErrors[`category_${category.id}_budgeted`] = 'Budget amount cannot be negative';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        
        try {
            // Calculate totals
            const totalBudgeted = formData.categories.reduce((sum, cat) => sum + cat.budgeted, 0);
            const totalScopeChanges = formData.categories.reduce((sum, cat) => sum + cat.scopeChange, 0);
            const finalBudget = totalBudgeted + totalScopeChanges;
            const budgetVariance = totalBudgeted > 0 ? ((totalScopeChanges / totalBudgeted) * 100).toFixed(1) + '%' : '0%';
            const varianceColor = totalScopeChanges >= 0 ? 'text-green-600' : 'text-red-600';

            const updatedBudget = {
                ...budget,
                ...formData,
                totalBudgeted,
                totalScopeChanges,
                finalBudget,
                budgetVariance: (totalScopeChanges >= 0 ? '+' : '') + budgetVariance,
                varianceColor,
                lastUpdated: new Date().toISOString().split('T')[0],
                categories: formData.categories.map(({ id, ...cat }) => cat) // Remove temporary IDs
            };

            await onSave(updatedBudget);
        } catch (error) {
            console.error('Error saving budget:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const calculateTotals = () => {
        const totalBudgeted = formData.categories.reduce((sum, cat) => sum + cat.budgeted, 0);
        const totalScopeChanges = formData.categories.reduce((sum, cat) => sum + cat.scopeChange, 0);
        const finalBudget = totalBudgeted + totalScopeChanges;
        return { totalBudgeted, totalScopeChanges, finalBudget };
    };

    const { totalBudgeted, totalScopeChanges, finalBudget } = calculateTotals();

    if (!budget) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
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
                        <i className="bi bi-pencil text-blue-600 text-lg"></i>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">EDIT BUDGET</h1>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                        >
                            CANCEL
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center text-sm sm:text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <i className="bi bi-arrow-clockwise animate-spin mr-2"></i>
                                    SAVING...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-check-circle mr-2"></i>
                                    SAVE CHANGES
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Edit budget details and categories</p>
            </div>

            <form onSubmit={handleSubmit}>
                {/* Project Details */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-building text-gray-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PROJECT DETAILS</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PROJECT NAME *
                                </label>
                                <input
                                    type="text"
                                    value={formData.projectName}
                                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.projectName ? 'border-red-300' : 'border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Enter project name"
                                />
                                {errors.projectName && (
                                    <p className="text-red-600 text-sm mt-1">{errors.projectName}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PROJECT MANAGER *
                                </label>
                                <input
                                    type="text"
                                    value={formData.projectManager}
                                    onChange={(e) => handleInputChange('projectManager', e.target.value)}
                                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.projectManager ? 'border-red-300' : 'border-gray-300 text-gray-900'
                                    }`}
                                    placeholder="Enter project manager name"
                                />
                                {errors.projectManager && (
                                    <p className="text-red-600 text-sm mt-1">{errors.projectManager}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    BUDGET STATUS
                                </label>
                                <select
                                    value={formData.budgetStatus}
                                    onChange={(e) => handleInputChange('budgetStatus', e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900"
                                >
                                    {statusOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Right Column - Budget Summary */}
                        <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">BUDGET SUMMARY</h4>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Total Budgeted:</span>
                                    <span className="font-semibold text-gray-900 text-sm sm:text-base">{formatCurrency(totalBudgeted)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600 text-sm sm:text-base">Scope Changes:</span>
                                    <span className={`font-semibold text-sm sm:text-base ${totalScopeChanges >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {totalScopeChanges >= 0 ? '+' : ''}{formatCurrency(totalScopeChanges)}
                                    </span>
                                </div>
                                <hr className="border-gray-300" />
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-900 font-medium text-sm sm:text-base">Final Budget:</span>
                                    <span className="font-bold text-base sm:text-lg text-gray-900">{formatCurrency(finalBudget)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Budget Categories */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                            <div className="flex items-center gap-3">
                                <i className="bi bi-list-ul text-gray-600 text-lg"></i>
                                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">BUDGET CATEGORIES</h2>
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full self-start">
                                {formData.categories.length} Categories
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={addCategory}
                            className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-plus-circle mr-2"></i>
                            ADD CATEGORY
                        </button>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {formData.categories.map((category, index) => (
                            <div key={category.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
                                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Category #{index + 1}</h4>
                                    <button
                                        type="button"
                                        onClick={() => removeCategory(category.id)}
                                        className="self-start sm:self-auto p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                    <div className="sm:col-span-2 lg:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CATEGORY NAME *
                                        </label>
                                        <input
                                            type="text"
                                            value={category.name}
                                            onChange={(e) => handleCategoryChange(category.id, 'name', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                                errors[`category_${category.id}_name`] ? 'border-red-300' : 'border-gray-300 text-gray-900'
                                            }`}
                                            placeholder="Enter category name"
                                        />
                                        {errors[`category_${category.id}_name`] && (
                                            <p className="text-red-600 text-xs mt-1">{errors[`category_${category.id}_name`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            TYPE
                                        </label>
                                        <select
                                            value={category.type}
                                            onChange={(e) => handleCategoryChange(category.id, 'type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900"
                                        >
                                            {categoryTypes.map(type => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            BUDGETED AMOUNT
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={category.budgeted}
                                            onChange={(e) => handleCategoryChange(category.id, 'budgeted', e.target.value)}
                                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                                errors[`category_${category.id}_budgeted`] ? 'border-red-300' : 'border-gray-300 text-gray-900'
                                            }`}
                                            placeholder="0.00"
                                        />
                                        {errors[`category_${category.id}_budgeted`] && (
                                            <p className="text-red-600 text-xs mt-1">{errors[`category_${category.id}_budgeted`]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            SCOPE CHANGE
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={category.scopeChange}
                                            onChange={(e) => handleCategoryChange(category.id, 'scopeChange', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>

                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white self-start ${getCategoryTypeColor(category.type)}`}>
                                        {category.type}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Final: {formatCurrency(category.budgeted + category.scopeChange)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {formData.categories.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                <i className="bi bi-plus-circle text-3xl sm:text-4xl mb-2"></i>
                                <p className="text-sm sm:text-base">No categories added yet. Click "ADD CATEGORY" to get started.</p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCategoryPage;

