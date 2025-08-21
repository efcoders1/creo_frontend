import React, { useState, useEffect } from 'react';


const FinancialModeling = () => {
    const [formData, setFormData] = useState({
        dataSource: 'manual',
        projectBudget: 75000,
        actualCosts: 45000,
        forecastedCosts: 52000,
        marginModel: 'markup',
        targetMarkup: 32,
        fixedTarget: 24000,
        costPlusRate: 15
    });

    const [simulation, setSimulation] = useState({
        costChange: 0,
        quoteChange: 0,
        isActive: false
    });

    const [metrics, setMetrics] = useState({
        currentMargin: 40.0,
        targetMargin: 32.0,
        breakevenPoint: 51000,
        profitLoss: 30000
    });

    // Enhanced calculation with more sophisticated logic
    useEffect(() => {
        const calculateMetrics = () => {
            const budget = formData.projectBudget;
            const baseCosts = formData.actualCosts;
            const adjustedCosts = baseCosts + simulation.costChange;
            const adjustedRevenue = budget * (1 + simulation.quoteChange / 100);

            // Calculate current margin
            const currentMargin = adjustedRevenue > 0 ?
                ((adjustedRevenue - adjustedCosts) / adjustedRevenue) * 100 : 0;

            // Calculate profit/loss
            const profit = adjustedRevenue - adjustedCosts;

            // Calculate breakeven point
            const breakeven = adjustedCosts;

            // Determine target margin based on model
            let targetMargin = formData.targetMarkup;
            if (formData.marginModel === 'fixed') {
                targetMargin = adjustedRevenue > 0 ? (formData.fixedTarget / adjustedRevenue) * 100 : 0;
            } else if (formData.marginModel === 'costplus') {
                targetMargin = formData.costPlusRate;
            }

            setMetrics({
                currentMargin: Math.max(0, currentMargin),
                targetMargin: Math.max(0, targetMargin),
                breakevenPoint: breakeven,
                profitLoss: profit
            });
        };

        calculateMetrics();
    }, [formData, simulation]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSimulationChange = (field, value) => {
        const numValue = parseFloat(value) || 0;
        setSimulation(prev => ({
            ...prev,
            [field]: numValue,
            isActive: numValue !== 0 || prev.costChange !== 0 || prev.quoteChange !== 0
        }));
    };

    const handleResetSimulation = () => {
        setSimulation({
            costChange: 0,
            quoteChange: 0,
            isActive: false
        });
    };

    const handleApplyChanges = () => {
        if (simulation.isActive) {
            setFormData(prev => ({
                ...prev,
                actualCosts: prev.actualCosts + simulation.costChange,
                projectBudget: prev.projectBudget * (1 + simulation.quoteChange / 100)
            }));
            setSimulation({
                costChange: 0,
                quoteChange: 0,
                isActive: false
            });
        }
    };

    const getMarginStatus = () => {
        const difference = metrics.currentMargin - metrics.targetMargin;

        if (difference >= 5) {
            return {
                type: 'success',
                message: `Above Target: Current margin (${metrics.currentMargin.toFixed(1)}%) exceeds target (${metrics.targetMargin.toFixed(1)}%)`
            };
        } else if (difference >= 0) {
            return {
                type: 'warning',
                message: `Near Target: Current margin (${metrics.currentMargin.toFixed(1)}%) meets target (${metrics.targetMargin.toFixed(1)}%)`
            };
        } else if (difference >= -5) {
            return {
                type: 'warning',
                message: `Below Target: Current margin (${metrics.currentMargin.toFixed(1)}%) is slightly below target (${metrics.targetMargin.toFixed(1)}%)`
            };
        } else {
            return {
                type: 'danger',
                message: `Critical: Current margin (${metrics.currentMargin.toFixed(1)}%) is significantly below target (${metrics.targetMargin.toFixed(1)}%)`
            };
        }
    };

    const marginStatus = getMarginStatus();

    // Enhanced chart data calculation
    const chartData = {
        costs: {
            budgeted: formData.projectBudget * 0.6,
            actual: formData.actualCosts + simulation.costChange,
            forecasted: formData.forecastedCosts
        },
        margins: {
            budgeted: 35,
            actual: metrics.currentMargin,
            forecasted: ((formData.projectBudget - formData.forecastedCosts) / formData.projectBudget) * 100
        },
        profit: {
            budgeted: formData.projectBudget * 0.4,
            actual: metrics.profitLoss,
            forecasted: formData.projectBudget - formData.forecastedCosts
        }
    };

    // Get maximum values for chart scaling
    const maxCost = Math.max(chartData.costs.budgeted, chartData.costs.actual, chartData.costs.forecasted);
    const maxMargin = Math.max(chartData.margins.budgeted, chartData.margins.actual, chartData.margins.forecasted);
    const maxProfit = Math.max(chartData.profit.budgeted, Math.abs(chartData.profit.actual), chartData.profit.forecasted);

    return (
        <div>

            {/* Header */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">💰</span>
                    </div>
                    <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Financial Modeling & Simulation Tool</h1>
                </div>
                <p className="text-gray-600 ml-11">Advanced cost analysis, margin modeling, and profit simulation</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">

                {/* Left Panel - Data Input & Configuration */}
                <div className="bg-white rounded-lg border border-gray-300 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-blue-100 p-2 rounded">
                            <i className="bi bi-bar-chart text-blue-600 text-lg"></i>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Data Input & Configuration</h2>
                        <div className="ml-auto bg-gray-200 px-3 py-1 rounded text-sm font-medium">INPUT</div>
                    </div>

                    <div className="space-y-6">
                        {/* Data Source */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Data Source</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={() => handleInputChange('dataSource', 'manual')}
                                    className={`px-2 py-1 sm:p-3 text-sm sm:text-base rounded border font-medium transition-colors ${
                                        formData.dataSource === 'manual'
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <i className="bi bi-pencil mr-2"></i>
                                    Manual Entry
                                </button>
                                <button
                                    onClick={() => handleInputChange('dataSource', 'auto')}
                                    className={`px-2 py-1 sm:p-3 text-sm sm:text-base rounded border font-medium transition-colors ${
                                        formData.dataSource === 'auto'
                                            ? 'bg-gray-600 text-white border-gray-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <i className="bi bi-link mr-2"></i>
                                    Auto-Linked
                                </button>
                            </div>
                        </div>

                        {/* Project Budget */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget ($)</label>
                            <input
                                type="number"
                                value={formData.projectBudget}
                                onChange={(e) => handleInputChange('projectBudget', parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-600"  />
                        </div>

                        {/* Actual Costs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Actual Costs ($)</label>
                            <input
                                type="number"
                                value={formData.actualCosts}
                                onChange={(e) => handleInputChange('actualCosts', parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-600"
                            />
                        </div>

                        {/* Forecasted Costs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Forecasted Costs ($)</label>
                            <input
                                type="number"
                                value={formData.forecastedCosts}
                                onChange={(e) => handleInputChange('forecastedCosts', parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-600"
                            />
                        </div>

                        {/* Margin Model */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Margin Model</label>
                            <div className="space-y-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="marginModel"
                                        value="markup"
                                        checked={formData.marginModel === 'markup'}
                                        onChange={(e) => handleInputChange('marginModel', e.target.value)}
                                        className="mr-3"
                                    />
                                    <i className="bi bi-percent text-blue-600 mr-2"></i>
                                    <span className="font-medium">Markup %</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="marginModel"
                                        value="fixed"
                                        checked={formData.marginModel === 'fixed'}
                                        onChange={(e) => handleInputChange('marginModel', e.target.value)}
                                        className="mr-3"
                                    />
                                    <i className="bi bi-bullseye text-red-600 mr-2"></i>
                                    <span className="font-medium">Fixed Target</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="marginModel"
                                        value="costplus"
                                        checked={formData.marginModel === 'costplus'}
                                        onChange={(e) => handleInputChange('marginModel', e.target.value)}
                                        className="mr-3"
                                    />
                                    <i className="bi bi-plus-circle text-green-600 mr-2"></i>
                                    <span className="font-medium">Cost-Plus</span>
                                </label>
                            </div>
                        </div>

                        {/* Target Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                {formData.marginModel === 'markup' && 'Target Markup (%)'}
                                {formData.marginModel === 'fixed' && 'Fixed Target ($)'}
                                {formData.marginModel === 'costplus' && 'Cost-Plus Rate (%)'}
                            </label>
                            <input
                                type="number"
                                value={
                                    formData.marginModel === 'markup' ? formData.targetMarkup :
                                        formData.marginModel === 'fixed' ? formData.fixedTarget :
                                            formData.costPlusRate
                                }
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value) || 0;
                                    if (formData.marginModel === 'markup') {
                                        handleInputChange('targetMarkup', value);
                                    } else if (formData.marginModel === 'fixed') {
                                        handleInputChange('fixedTarget', value);
                                    } else {
                                        handleInputChange('costPlusRate', value);
                                    }
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg text-gray-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Analysis & Warnings */}
                <div className="bg-white rounded-lg border border-gray-300 p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-yellow-100 p-2 rounded">
                            <i className="bi bi-exclamation-triangle text-yellow-600 text-lg"></i>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Analysis & Warnings</h2>
                        <div className="ml-auto bg-gray-200 px-3 py-1 rounded text-sm font-medium">ANALYSIS</div>
                    </div>

                    <div className="space-y-6">
                        {/* Status Alert */}
                        <div className={`p-4 rounded-lg border ${
                            marginStatus.type === 'success'
                                ? 'bg-green-50 border-green-200'
                                : marginStatus.type === 'danger'
                                    ? 'bg-red-50 border-red-200'
                                    : 'bg-yellow-50 border-yellow-200'
                        }`}>
                            <div className="flex items-center gap-2">
                                <i className={`bi ${
                                    marginStatus.type === 'success'
                                        ? 'bi-check-circle text-green-600'
                                        : marginStatus.type === 'danger'
                                            ? 'bi-x-circle text-red-600'
                                            : 'bi-exclamation-triangle text-yellow-600'
                                }`}></i>
                                <span className={`font-medium ${
                                    marginStatus.type === 'success'
                                        ? 'text-green-800'
                                        : marginStatus.type === 'danger'
                                            ? 'text-red-800'
                                            : 'text-yellow-800'
                                }`}>
                  {marginStatus.message}
                </span>
                            </div>
                        </div>

                        {/* Metrics Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="border border-gray-300 rounded-lg p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">Current Margin</div>
                                <div className={`text-2xl font-bold ${
                                    metrics.currentMargin >= metrics.targetMargin ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {metrics.currentMargin.toFixed(1)}%
                                </div>
                            </div>

                            <div className="border border-gray-300 rounded-lg p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">Target Margin</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    {metrics.targetMargin.toFixed(1)}%
                                </div>
                            </div>

                            <div className="border border-gray-300 rounded-lg p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">Breakeven Point</div>
                                <div className="text-2xl font-bold text-gray-900">
                                    ${metrics.breakevenPoint.toLocaleString()}
                                </div>
                            </div>

                            <div className="border border-gray-300 rounded-lg p-4 text-center">
                                <div className="text-sm font-medium text-gray-600 mb-1">Profit/Loss</div>
                                <div className={`text-2xl font-bold ${
                                    metrics.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                    {metrics.profitLoss >= 0 ? '+' : ''}${metrics.profitLoss.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Simulation Controls */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="bi bi-sliders text-blue-600"></i>
                                <h3 className="font-semibold text-blue-900">Simulation Controls</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Simulate Cost Change ($)
                                    </label>
                                    <input
                                        type="number"
                                        value={simulation.costChange}
                                        onChange={(e) => handleSimulationChange('costChange', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Simulate Quote Change (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={simulation.quoteChange}
                                        onChange={(e) => handleSimulationChange('quoteChange', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-600"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={handleResetSimulation}
                                        className="flex-1 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors font-medium"
                                    >
                                        <i className="bi bi-arrow-clockwise mr-2"></i>
                                        Reset Simulation
                                    </button>
                                    <button
                                        onClick={handleApplyChanges}
                                        className="flex-1 px-2 py-1 sm:px-4 sm:py-2 text-sm sm:text-base bg-green-600 text-white rounded hover:bg-green-700 transition-colors font-medium"
                                    >
                                        <i className="bi bi-check mr-2"></i>
                                        Apply Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Analysis Section */}
            <div className="bg-white rounded-lg border border-gray-300 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-bar-chart text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">Visual Analysis</h2>
                </div>

                <div className="border border-dashed border-gray-400 rounded-lg p-4 sm:p-8">
                    {/* Chart Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 h-auto sm:h-64">
                        {/* Costs Chart */}
                        <div className="flex flex-col items-center justify-end">
                            <div className="flex items-end gap-2 mb-4">
                                <div
                                    className="w-8 sm:w-12 bg-blue-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.costs.budgeted / maxCost) * 180)}px` }}
                                    title={`Budgeted: $${chartData.costs.budgeted.toLocaleString()}`}
                                ></div>
                                <div
                                    className="w-8 sm:w-12 bg-green-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.costs.actual / maxCost) * 180)}px` }}
                                    title={`Actual: $${chartData.costs.actual.toLocaleString()}`}
                                ></div>
                                <div
                                    className="w-8 sm:w-12 bg-yellow-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.costs.forecasted / maxCost) * 180)}px` }}
                                    title={`Forecasted: $${chartData.costs.forecasted.toLocaleString()}`}
                                ></div>
                            </div>
                            <div className="text-sm font-medium text-gray-700">Costs</div>
                        </div>

                        {/* Margins Chart */}
                        <div className="flex flex-col items-center justify-end">
                            <div className="flex items-end gap-2 mb-4">
                                <div
                                    className="w-8 sm:w-12 bg-blue-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.margins.budgeted / maxMargin) * 180)}px` }}
                                    title={`Budgeted: ${chartData.margins.budgeted.toFixed(1)}%`}
                                ></div>
                                <div
                                    className="w-8 sm:w-12 bg-green-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.margins.actual / maxMargin) * 180)}px` }}
                                    title={`Actual: ${chartData.margins.actual.toFixed(1)}%`}
                                ></div>
                                <div
                                    className="w-8 sm:w-12 bg-yellow-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.margins.forecasted / maxMargin) * 180)}px` }}
                                    title={`Forecasted: ${chartData.margins.forecasted.toFixed(1)}%`}
                                ></div>
                            </div>
                            <div className="text-sm font-medium text-gray-700">Margins</div>
                        </div>

                        {/* Profit Chart */}
                        <div className="flex flex-col items-center justify-end">
                            <div className="flex items-end gap-2 mb-4">
                                <div
                                    className="w-8 sm:w-12 bg-blue-500 rounded-t"
                                    style={{ height: `${Math.max(20, (chartData.profit.budgeted / maxProfit) * 180)}px` }}
                                    title={`Budgeted: $${chartData.profit.budgeted.toLocaleString()}`}
                                ></div>
                                <div
                                    className={`w-8 sm:w-12 rounded-t ${chartData.profit.actual >= 0 ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{ height: `${Math.max(20, (Math.abs(chartData.profit.actual) / maxProfit) * 180)}px` }}
                                    title={`Actual: $${chartData.profit.actual.toLocaleString()}`}
                                ></div>
                                <div
                                    className={`w-8 sm:w-12 rounded-t ${chartData.profit.forecasted >= 0 ? 'bg-yellow-500' : 'bg-red-400'}`}
                                    style={{ height: `${Math.max(20, (Math.abs(chartData.profit.forecasted) / maxProfit) * 180)}px` }}
                                    title={`Forecasted: $${chartData.profit.forecasted.toLocaleString()}`}
                                ></div>
                            </div>
                            <div className="text-sm font-medium text-gray-700">Profit</div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Budgeted</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Actual</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                            <span className="text-sm font-medium text-gray-700">Forecasted</span>
                        </div>
                    </div>

                    {/* Simulation Indicator */}
                    {simulation.isActive && (
                        <div className="mt-4 text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border border-blue-300 rounded-lg">
                                <i className="bi bi-info-circle text-blue-600"></i>
                                <span className="text-sm font-medium text-blue-800">
          Simulation Active: Results include simulated changes
        </span>
                            </div>
                        </div>
                    )}
                </div>


            </div>

        </div>
    );
};

export default FinancialModeling;

