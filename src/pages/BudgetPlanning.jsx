import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';
const BudgetPlanning = () => {
    const [budgetData, setBudgetData] = useState([
        {
            id: 1,
            category: 'FLOOR',
            type: 'MATERIAL',
            icon: '🏠',
            budgetedCost: 15000,
            scopeChange: 2000,
            adjustedBudget: 17000.00,
            variance: '+13.3%',
            varianceColor: 'text-green-600',
            notes: ''
        },
        {
            id: 2,
            category: 'BUILD ITEMS',
            type: 'MATERIAL',
            icon: '🔨',
            budgetedCost: 25000,
            scopeChange: -3000,
            adjustedBudget: 22000.00,
            variance: '-12.0%',
            varianceColor: 'text-red-600',
            notes: ''
        },
        {
            id: 3,
            category: 'REFURB COST',
            type: 'LABOUR',
            icon: '🔧',
            budgetedCost: 8000,
            scopeChange: 0,
            adjustedBudget: 8000.00,
            variance: '0.0%',
            varianceColor: 'text-gray-600',
            notes: ''
        },
        {
            id: 4,
            category: 'GRAPHICS',
            type: 'MATERIAL',
            icon: '🎨',
            budgetedCost: 0,
            scopeChange: 0,
            adjustedBudget: 0.00,
            variance: '0%',
            varianceColor: 'text-gray-600',
            notes: ''
        },
        {
            id: 5,
            category: 'PLUMBING',
            type: 'SUBCONTRACTOR',
            icon: '🚰',
            budgetedCost: 12000,
            scopeChange: 1500,
            adjustedBudget: 13500.00,
            variance: '+12.5%',
            varianceColor: 'text-green-600',
            notes: ''
        },
        {
            id: 6,
            category: 'ELECTRICAL',
            type: 'SUBCONTRACTOR',
            icon: '⚡',
            budgetedCost: 18000,
            scopeChange: 0,
            adjustedBudget: 18000.00,
            variance: '0.0%',
            varianceColor: 'text-gray-600',
            notes: ''
        },
        {
            id: 7,
            category: 'AUDIO VISUAL',
            type: 'SUBCONTRACTOR',
            icon: '📺',
            budgetedCost: 0,
            scopeChange: 0,
            adjustedBudget: 0.00,
            variance: '0%',
            varianceColor: 'text-gray-600',
            notes: ''
        },
        {
            id: 8,
            category: 'MANAGEMENT FEE',
            type: 'OVERHEAD',
            icon: '💼',
            budgetedCost: 0,
            scopeChange: 0,
            adjustedBudget: 0.00,
            variance: '0%',
            varianceColor: 'text-gray-600',
            notes: ''
        }
    ]);

    const [projectInfo, setProjectInfo] = useState({
        jobCode: '25-01-0001',
        projectName: 'Office Building Construction',
        projectManager: 'Sarah Jones',
        budgetStatus: 'Draft'
    });

    const calculateTotals = () => {
        const totalBudgeted = budgetData.reduce((sum, item) => sum + item.budgetedCost, 0);
        const totalScopeChanges = budgetData.reduce((sum, item) => sum + item.scopeChange, 0);
        const finalBudget = budgetData.reduce((sum, item) => sum + item.adjustedBudget, 0);
        const budgetVariance = totalScopeChanges !== 0 ? ((totalScopeChanges / totalBudgeted) * 100).toFixed(1) : '0.0';

        return {
            totalBudgeted,
            totalScopeChanges,
            finalBudget,
            budgetVariance
        };
    };

    const totals = calculateTotals();

    const getTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'warning';
            case 'MATERIAL': return 'success';
            case 'SUBCONTRACTOR': return 'primary';
            case 'OVERHEAD': return 'failure';
            default: return 'gray';
        }
    };

    const updateBudgetItem = (id, field, value) => {
        setBudgetData(budgetData.map(item => {
            if (item.id === id) {
                const updatedItem = { ...item, [field]: parseFloat(value) || 0 };

                // Recalculate adjusted budget and variance
                if (field === 'budgetedCost' || field === 'scopeChange') {
                    updatedItem.adjustedBudget = updatedItem.budgetedCost + updatedItem.scopeChange;
                    const variancePercent = updatedItem.budgetedCost !== 0
                        ? ((updatedItem.scopeChange / updatedItem.budgetedCost) * 100).toFixed(1)
                        : '0.0';
                    updatedItem.variance = `${variancePercent > 0 ? '+' : ''}${variancePercent}%`;
                    updatedItem.varianceColor = variancePercent > 0 ? 'text-green-600' :
                        variancePercent < 0 ? 'text-red-600' : 'text-gray-600';
                }

                return updatedItem;
            }
            return item;
        }));
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            {/* Main Content Container */}
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Project Budget Overview */}

                <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
                        <button onClick={() => navigate('/budget-planning-listing')} className="self-start p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i className="bi bi-arrow-left text-lg"></i>
                        </button>
                        <div className="flex items-center gap-3">
                            <i className="bi bi-clipboard-data text-blue-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PROJECT BUDGET OVERVIEW</h2>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value={projectInfo.jobCode}
                                    onChange={(e) => setProjectInfo({...projectInfo, jobCode: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value={projectInfo.projectName}
                                    onChange={(e) => setProjectInfo({...projectInfo, projectName: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700"
                                />
                            </div>

                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">PROJECT MANAGER</label>
                                <input
                                    type="text"
                                    value={projectInfo.projectManager}
                                    onChange={(e) => setProjectInfo({...projectInfo, projectManager: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">BUDGET STATUS</label>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                <input
                                    type="text"
                                    value={projectInfo.budgetStatus}
                                    readOnly
                                    className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 text-sm sm:text-base"
                                />
                                <Badge
                                    color="warning"
                                    size="sm"
                                    className="px-3 py-1 font-medium rounded self-start"
                                >
                                    DRAFT
                                </Badge>

                            </div>
                        </div>
                    </div>
                </Card>

                {/* Budget Categories Section */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-currency-dollar text-yellow-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">BUDGET CATEGORIES</h2>
                    </div>

                    <p className="text-sm text-gray-600 mb-6">
                        DEFINE EXPECTED COST PER CATEGORY WITH SCOPE CHANGES
                    </p>

                    {/* Mobile Card View */}
                    <div className="block lg:hidden space-y-4">
                        {budgetData.map((item) => (
                            <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm">
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-sm">{item.category}</div>
                                        <span className={`px-2 py-1 text-xs font-medium text-white rounded ${getTypeColor(item.type)}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">BUDGETED COST</label>
                                        <input
                                            type="number"
                                            value={item.budgetedCost}
                                            onChange={(e) => updateBudgetItem(item.id, 'budgetedCost', e.target.value)}
                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">SCOPE CHANGE</label>
                                        <input
                                            type="number"
                                            value={item.scopeChange}
                                            onChange={(e) => updateBudgetItem(item.id, 'scopeChange', e.target.value)}
                                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">ADJUSTED BUDGET</label>
                                        <div className="text-sm font-medium text-gray-900">
                                            ${item.adjustedBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-gray-700 mb-1">VARIANCE</label>
                                        <div className={`text-sm font-medium ${item.varianceColor}`}>
                                            {item.variance}
                                        </div>
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1">NOTES</label>
                                    <input
                                        type="text"
                                        placeholder="Notes..."
                                        value={item.notes}
                                        onChange={(e) => updateBudgetItem(item.id, 'notes', e.target.value)}
                                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    />
                                </div>
                            </div>
                        ))}
                        
                        {/* Mobile Totals Card */}
                        <div className="bg-gray-900 text-white rounded-lg p-4">
                            <h3 className="font-bold text-lg mb-4">TOTAL</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <div className="text-xs text-gray-300 mb-1">BUDGETED</div>
                                    <div className="font-bold">${totals.totalBudgeted.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-300 mb-1">SCOPE CHANGES</div>
                                    <div className="font-bold">${totals.totalScopeChanges.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-300 mb-1">FINAL BUDGET</div>
                                    <div className="font-bold">${totals.finalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-300 mb-1">VARIANCE</div>
                                    <div className="font-bold">+{totals.budgetVariance}%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-900 text-white">
                                    <th className="border border-gray-600 px-4 py-3 text-left font-medium">CATEGORY</th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-medium">BUDGETED COST</th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-medium">SCOPE CHANGE</th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-medium">ADJUSTED BUDGET</th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-medium">VARIANCE</th>
                                    <th className="border border-gray-600 px-4 py-3 text-center font-medium">NOTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgetData.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-sm">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{item.category}</div>
                                                    <Badge
                                                        color={getTypeColor(item.type)}
                                                        size="sm"
                                                        className="px-2 sm:px-3 py-1 rounded-full font-medium"
                                                    >
                                                        {item.type}
                                                    </Badge>

                                                </div>
                                            </div>
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3 text-center">
                                            <input
                                                type="number"
                                                value={item.budgetedCost}
                                                onChange={(e) => updateBudgetItem(item.id, 'budgetedCost', e.target.value)}
                                                className="w-24 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3 text-center">
                                            <input
                                                type="number"
                                                value={item.scopeChange}
                                                onChange={(e) => updateBudgetItem(item.id, 'scopeChange', e.target.value)}
                                                className="w-24 px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3 text-center font-medium">
                                            ${item.adjustedBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className={`border border-gray-300 px-4 py-3 text-center font-medium ${item.varianceColor}`}>
                                            {item.variance}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-3">
                                            <input
                                                type="text"
                                                placeholder="Notes..."
                                                value={item.notes}
                                                onChange={(e) => updateBudgetItem(item.id, 'notes', e.target.value)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                            />
                                        </td>
                                    </tr>
                                ))}

                                {/* Totals Row */}
                                <tr className="bg-gray-900 text-white font-bold">
                                    <td className="border border-gray-600 px-4 py-3">TOTAL</td>
                                    <td className="border border-gray-600 px-4 py-3 text-center">
                                        ${totals.totalBudgeted.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="border border-gray-600 px-4 py-3 text-center">
                                        ${totals.totalScopeChanges.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="border border-gray-600 px-4 py-3 text-center">
                                        ${totals.finalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="border border-gray-600 px-4 py-3 text-center">
                                        +{totals.budgetVariance}%
                                    </td>
                                    <td className="border border-gray-600 px-4 py-3"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </Card>

                {/* Budget Summary */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-calculator text-gray-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">BUDGET SUMMARY</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">TOTAL BUDGETED</label>
                                <input
                                    type="text"
                                    value={`$${totals.totalBudgeted.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">TOTAL SCOPE CHANGES</label>
                                <input
                                    type="text"
                                    value={`$${totals.totalScopeChanges.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">FINAL BUDGET</label>
                                <input
                                    type="text"
                                    value={`$${totals.finalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">BUDGET VARIANCE</label>
                                <input
                                    type="text"
                                    value={`+${totals.budgetVariance}%`}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 font-medium text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}


                <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                        color="gray"
                        size="md"
                        className="flex items-center gap-2"
                     >
                        <span className="hidden sm:inline">  CANCEL</span>
                    </Button>
                    <Button
                        color="success"
                        size="md"
                        className="flex items-center gap-2"
                    >
                        <span className="hidden sm:inline"> SAVE DRAFT</span>
                    </Button>

                    <Button
                        color="primary"
                        size="md"
                        className="flex items-center gap-2"
                        onClick={() => navigate('/budget-planning-listing')}
                    >
                        <span className="hidden sm:inline">SUBMIT FOR REVIEW</span>
                        <span className="sm:hidden">SUBMIT</span>
                    </Button>

                </div>

            </div>
        </div>
    );
};

export default BudgetPlanning;

