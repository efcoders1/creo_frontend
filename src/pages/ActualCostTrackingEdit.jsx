import React, { useState, useEffect } from 'react';

const ActualCostTrackingEdit = ({ expense, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        vendor: '',
        amount: '',
        paymentNotes: '',
        category: '',
        method: '',
        receipt: '',
        projectCode: '',
        projectName: '',
        approvedBy: '',
        status: 'pending',
        date: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categoryOptions = [
        { value: 'FLOOR', label: 'FLOOR', icon: '🏠' },
        { value: 'BUILD ITEMS', label: 'BUILD ITEMS', icon: '🔨' },
        { value: 'ELECTRICAL', label: 'ELECTRICAL', icon: '⚡' },
        { value: 'PLUMBING', label: 'PLUMBING', icon: '🚰' },
        { value: 'GRAPHICS', label: 'GRAPHICS', icon: '🎨' },
        { value: 'AUDIO VISUAL', label: 'AUDIO VISUAL', icon: '📺' },
        { value: 'MANAGEMENT FEE', label: 'MANAGEMENT FEE', icon: '💼' }
    ];

    const methodOptions = [
        { value: 'CASH', label: 'CASH' },
        { value: 'BANK-TRANSFER', label: 'BANK TRANSFER' },
        { value: 'CREDIT-CARD', label: 'CREDIT CARD' },
        { value: 'CHECK', label: 'CHECK' }
    ];

    const statusOptions = [
        { value: 'pending', label: 'PENDING' },
        { value: 'approved', label: 'APPROVED' },
        { value: 'rejected', label: 'REJECTED' }
    ];

    useEffect(() => {
        if (expense) {
            setFormData({
                vendor: expense.vendor || '',
                amount: expense.amount?.toString() || '',
                paymentNotes: expense.paymentNotes || '',
                category: expense.category || '',
                method: expense.method || '',
                receipt: expense.receipt || '',
                projectCode: expense.projectCode || '',
                projectName: expense.projectName || '',
                approvedBy: expense.approvedBy || '',
                status: expense.status || 'pending',
                date: expense.date || ''
            });
        }
    }, [expense]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.vendor.trim()) newErrors.vendor = 'Vendor is required';
        if (!formData.amount || parseFloat(formData.amount) <= 0) {
            newErrors.amount = 'Valid amount is required';
        }
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.method) newErrors.method = 'Payment method is required';
        if (!formData.receipt.trim()) newErrors.receipt = 'Receipt number is required';
        if (!formData.date) newErrors.date = 'Date is required';

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
            const updatedExpense = {
                ...expense,
                ...formData,
                amount: parseFloat(formData.amount)
            };

            await onSave(updatedExpense);
        } catch (error) {
            console.error('Error saving expense:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getCategoryIcon = (category) => {
        const categoryOption = categoryOptions.find(opt => opt.value === category);
        return categoryOption ? categoryOption.icon : '📋';
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={onCancel}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <i className="bi bi-arrow-left text-gray-600 text-lg"></i>
                            </button>
                            <i className="bi bi-pencil text-blue-600 text-lg"></i>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">EDIT EXPENSE</h1>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={onCancel}
                                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                            >
                                <i className="bi bi-x-circle mr-2"></i>
                                CANCEL
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                <i className="bi bi-check-circle mr-2"></i>
                                {isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
                            </button>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">Update expense information and payment details</p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <i className="bi bi-info-circle text-gray-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">BASIC INFORMATION</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    CATEGORY *
                                </label>
                                <div className="relative">
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                            errors.category ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    >
                                        <option value="">Select Category</option>
                                        {categoryOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    {formData.category && (
                                        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-base">
                                            {getCategoryIcon(formData.category)}
                                        </div>
                                    )}
                                </div>
                                {errors.category && (
                                    <p className="text-red-500 text-xs mt-1">{errors.category}</p>
                                )}
                            </div>

                            {/* Amount */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    AMOUNT *
                                </label>
                                <input
                                    type="number"
                                    name="amount"
                                    step="0.01"
                                    placeholder="0.00"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.amount ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-xs mt-1">{errors.amount}</p>
                                )}
                            </div>

                            {/* Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    DATE PAID *
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.date ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.date && (
                                    <p className="text-red-500 text-xs mt-1">{errors.date}</p>
                                )}
                            </div>

                            {/* Vendor */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    VENDOR NAME *
                                </label>
                                <input
                                    type="text"
                                    name="vendor"
                                    placeholder="Enter vendor name"
                                    value={formData.vendor}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.vendor ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.vendor && (
                                    <p className="text-red-500 text-xs mt-1">{errors.vendor}</p>
                                )}
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PAYMENT METHOD *
                                </label>
                                <select
                                    name="method"
                                    value={formData.method}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.method ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select Method</option>
                                    {methodOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.method && (
                                    <p className="text-red-500 text-xs mt-1">{errors.method}</p>
                                )}
                            </div>

                            {/* Receipt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    RECEIPT NUMBER *
                                </label>
                                <input
                                    type="text"
                                    name="receipt"
                                    placeholder="Enter receipt number"
                                    value={formData.receipt}
                                    onChange={handleInputChange}
                                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                                        errors.receipt ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.receipt && (
                                    <p className="text-red-500 text-xs mt-1">{errors.receipt}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Project Information */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <i className="bi bi-folder text-gray-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PROJECT INFORMATION</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Project Code */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PROJECT CODE
                                </label>
                                <input
                                    type="text"
                                    name="projectCode"
                                    placeholder="Enter project code"
                                    value={formData.projectCode}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>

                            {/* Project Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    PROJECT NAME
                                </label>
                                <input
                                    type="text"
                                    name="projectName"
                                    placeholder="Enter project name"
                                    value={formData.projectName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Status and Approval */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <i className="bi bi-check-circle text-gray-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">STATUS & APPROVAL</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    STATUS
                                </label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                >
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Approved By */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    APPROVED BY
                                </label>
                                <input
                                    type="text"
                                    name="approvedBy"
                                    placeholder="Enter approver name"
                                    value={formData.approvedBy}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Notes */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                        <div className="flex items-center gap-3 mb-6">
                            <i className="bi bi-chat-text text-gray-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PAYMENT NOTES</h2>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ADDITIONAL NOTES
                            </label>
                            <textarea
                                name="paymentNotes"
                                placeholder="Enter any additional notes about this payment..."
                                value={formData.paymentNotes}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="w-full sm:w-auto px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-sm sm:text-base"
                            >
                                <i className="bi bi-x-circle mr-2"></i>
                                CANCEL
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                            >
                                <i className="bi bi-check-circle mr-2"></i>
                                {isSubmitting ? 'SAVING...' : 'SAVE CHANGES'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ActualCostTrackingEdit;

