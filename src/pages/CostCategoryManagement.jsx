import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const CostCategoryManagement = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'FLOOR', type: 'MATERIAL', order: 1, icon: '🏠' },
        { id: 2, name: 'BUILD ITEMS', type: 'MATERIAL', order: 2, icon: '🔨' },
        { id: 3, name: 'REFURB COST', type: 'LABOUR', order: 3, icon: '🔧' },
        { id: 4, name: 'GRAPHICS', type: 'MATERIAL', order: 4, icon: '🎨' },
        { id: 5, name: 'PLUMBING', type: 'SUBCONTRACTOR', order: 5, icon: '🚰' },
        { id: 6, name: 'ELECTRICAL', type: 'SUBCONTRACTOR', order: 6, icon: '⚡' },
        { id: 7, name: 'AUDIO VISUAL', type: 'SUBCONTRACTOR', order: 7, icon: '📺' },
        { id: 8, name: 'MANAGEMENT FEE', type: 'OVERHEAD', order: 8, icon: '💼' }
    ]);

    const [activeTab, setActiveTab] = useState('LABOUR');

    const getTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'warning';
            case 'MATERIAL': return 'success';
            case 'SUBCONTRACTOR': return 'primary';
            case 'OVERHEAD': return 'failure';
            default: return 'gray';
        }
    };

    const handleEdit = (id) => {
        console.log('Edit category:', id);
    };

    const handleDelete = (id) => {
        setCategories(categories.filter(cat => cat.id !== id));
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-6xl mx-auto space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Cost Categories Section */}
                <div className="bg-white rounded-lg border border-gray-300">
                    <div className="p-3 sm:p-4 lg:p-6 border-b border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <button
                                onClick={() => navigate('/cost-category-listing')}
                                className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <i className="bi bi-arrow-left text-base sm:text-lg"></i>
                            </button>
                            <i className="bi bi-grid-3x3-gap text-blue-600 text-base sm:text-lg"></i>
                            <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900">COST CATEGORIES</h2>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                            MANAGE CONSTRUCTION COST CATEGORIES FROM APPENDIX 1 OR CREATE CUSTOM ONES
                        </p>

                        {/* Enhanced Responsive Tabs */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2">
                            {['LABOUR', 'MATERIAL', 'SUBCONTRACTOR', 'OVERHEAD'].map((tab) => (
                                <Button
                                    key={tab}
                                    color={activeTab === tab ? getTypeColor(tab) : "gray"}
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {/* Mobile view (shortened text) */}
                                    <span className="block sm:hidden">
    {tab.slice(0, 8)}
                                        {tab.length > 8 ? "..." : ""}
  </span>

                                    {/* Desktop view (full text) */}
                                    <span className="hidden sm:block">{tab}</span>
                                </Button>


                            ))}
                        </div>
                    </div>

                    {/* Enhanced Category Items - Better Mobile Layout */}
                    <div className="p-3 sm:p-4 lg:p-6">
                        <div className="space-y-2 sm:space-y-3">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex flex-col gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    {/* Top row: Drag handle, icon, name, and type badge */}
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="cursor-move text-gray-400 hover:text-gray-600 flex-shrink-0">
                                            <i className="bi bi-grip-vertical text-sm sm:text-base"></i>
                                        </div>

                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm sm:text-lg flex-shrink-0">
                                            {category.icon}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{category.name}</h3>
                                                <Badge
                                                    color={getTypeColor(category.type)}
                                                    size="sm"
                                                    className="px-2 sm:px-3 py-1 rounded-full font-medium"
                                                >
                                                    {category.type}
                                                </Badge>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom row: Order input and action buttons */}
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <label className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">Order:</label>
                                            <input
                                                type="number"
                                                value={category.order}
                                                onChange={(e) => {
                                                    const newOrder = parseInt(e.target.value);
                                                    setCategories(categories.map(cat =>
                                                        cat.id === category.id ? { ...cat, order: newOrder } : cat
                                                    ));
                                                }}
                                                className="w-12 sm:w-16 px-1 sm:px-2 py-1 text-xs sm:text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                                            />
                                        </div>

                                        <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                                            <Button
                                                color="gray"
                                                size="sm"
                                                className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 font-medium"
                                                onClick={() => handleEdit(category.id)}
                                            >
                                                EDIT
                                            </Button>

                                            <Button
                                                color="failure"
                                                size="sm"
                                                className="px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 font-medium"
                                                onClick={() => handleDelete(category.id)}
                                            >
                                                <span className="hidden sm:inline">DELETE</span>
                                                <span className="sm:hidden">DEL</span>
                                            </Button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced Add Category - Better Mobile Experience */}
                <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6 lg:p-8 bg-white">
                    <div className="text-center">
                        <button className="flex items-center gap-2 mx-auto px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i className="bi bi-plus-lg text-sm sm:text-base lg:text-lg"></i>
                            <span className="font-medium text-xs sm:text-sm lg:text-base">ADD NEW CATEGORY</span>
                        </button>
                    </div>
                </div>

                {/* Enhanced Footer Actions - Better Mobile Layout */}
                <div className="flex flex-col gap-2 sm:gap-3 lg:grid lg:grid-cols-3 lg:gap-4 pt-3 sm:pt-4 lg:pt-6">
                    <button className="w-full px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 border border-gray-400 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors text-xs sm:text-sm lg:text-base">
                        CANCEL
                    </button>
                    <button
                        onClick={() => navigate('/cost-category-listing')}
                        className="w-full px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 transition-colors text-xs sm:text-sm lg:text-base"
                    >
                        SAVE CHANGES
                    </button>
                    <button className="w-full px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 bg-gray-900 text-white font-medium rounded hover:bg-black transition-colors text-xs sm:text-sm lg:text-base">
                        <span className="hidden sm:inline">APPLY TO BUDGETING</span>
                        <span className="sm:hidden">APPLY TO BUDGET</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CostCategoryManagement;

