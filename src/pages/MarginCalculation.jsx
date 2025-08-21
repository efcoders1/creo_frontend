import React, { useState, useEffect } from 'react';

const MarginCalculation = () => {
    const [projectInfo] = useState({
        jobCode: '25-01-0001',
        projectName: 'Office Building Construction',
        lastUpdate: '12:38:12 PM',
        status: 'Active'
    });

    const [marginData, setMarginData] = useState({
        adjustedBudget: 83500.00,
        actualCost: 13075.224,
        currentMargin: 84.3,
        marginThreshold: 32,
        profit: 70424.776
    });

    const [weeklyTrend] = useState([
        { week: 'Week 1', margin: 82.5 },
        { week: 'Week 2', margin: 83.1 },
        { week: 'Week 3', margin: 83.8 },
        { week: 'Week 4', margin: 84.0 },
        { week: 'Week 5', margin: 84.2 },
        { week: 'Week 6', margin: 84.1 },
        { week: 'Current', margin: 84.3 }
    ]);

    const [autoUpdating, setAutoUpdating] = useState(true);

    // Calculate margin based on formula
    const calculateMargin = () => {
        const { adjustedBudget, actualCost } = marginData;
        const profit = adjustedBudget - actualCost;
        const margin = ((profit / adjustedBudget) * 100);

        return {
            profit: profit,
            margin: margin
        };
    };

    // Update margin data when costs change
    useEffect(() => {
        const calculated = calculateMargin();
        setMarginData(prev => ({
            ...prev,
            profit: calculated.profit,
            currentMargin: calculated.margin
        }));
    }, [marginData.adjustedBudget, marginData.actualCost]);

    const getMarginStatus = () => {
        if (marginData.currentMargin > marginData.marginThreshold) {
            return {
                status: 'EXCELLENT MARGIN',
                color: 'bg-green-500',
                textColor: 'text-green-600',
                bgColor: 'bg-green-50',
                icon: '✓'
            };
        } else if (marginData.currentMargin > marginData.marginThreshold * 0.8) {
            return {
                status: 'GOOD MARGIN',
                color: 'bg-yellow-500',
                textColor: 'text-yellow-600',
                bgColor: 'bg-yellow-50',
                icon: '⚠'
            };
        } else {
            return {
                status: 'LOW MARGIN',
                color: 'bg-red-500',
                textColor: 'text-red-600',
                bgColor: 'bg-red-50',
                icon: '⚠'
            };
        }
    };

    const marginStatus = getMarginStatus();

    const refreshData = () => {
        // Simulate data refresh
        console.log('Refreshing margin data...');
    };

    const exportReport = () => {
        // Simulate report export
        console.log('Exporting margin report...');
    };

    const setAlert = () => {
        // Simulate alert setting
        console.log('Setting margin alert...');
    };

    return (

        <div>

                {/* Auto-updating indicator */}
                <div className="flex justify-end">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white text-sm rounded">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>AUTO-UPDATING</span>
                    </div>
                </div>




                {/* Project Overview */}
                <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-clipboard-data text-blue-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">PROJECT OVERVIEW</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value={projectInfo.jobCode}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value={projectInfo.projectName}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">LAST UPDATE</label>
                                <input
                                    type="text"
                                    value={projectInfo.lastUpdate}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">STATUS</label>
                                <input
                                    type="text"
                                    value={projectInfo.status}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Margin Dashboard */}
                <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-bar-chart text-yellow-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">MARGIN DASHBOARD</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">ADJUSTED BUDGET</h3>
                            <p className="text-2xl font-bold text-gray-900">
                                ${marginData.adjustedBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">FROM BUDGET PLANNING</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">ACTUAL COST</h3>
                            <p className="text-2xl font-bold text-gray-900">
                                ${marginData.actualCost.toLocaleString('en-US', { minimumFractionDigits: 3 })}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">FROM COST TRACKING</p>
                        </div>

                        <div className="bg-yellow-50 rounded-lg p-6 text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">CURRENT MARGIN</h3>
                            <p className="text-2xl font-bold text-gray-900">
                                {marginData.currentMargin.toFixed(1)}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">PROFIT MARGIN</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-6 text-center">
                            <h3 className="text-sm font-medium text-gray-600 mb-2">MARGIN THRESHOLD</h3>
                            <p className="text-2xl font-bold text-gray-900">{marginData.marginThreshold}%</p>
                            <p className="text-xs text-gray-500 mt-1">MINIMUM REQUIRED</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-gray-100 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Margin Performance</span>
                            <span className="text-sm font-medium text-gray-700">{marginData.currentMargin.toFixed(1)}%</span>
                        </div>

                        <div className="w-full bg-gray-300 rounded-full h-6 relative">

                            <div  className={`h-6 rounded-full ${marginStatus.color} flex items-center justify-center text-white text-sm font-medium`}
                                style={{ width: `${Math.min((marginData.currentMargin / 100) * 100, 100)}%` }} >
                                {marginStatus.status}
                            </div>

                            {/* Threshold marker */}
                            <div  className="absolute top-0 h-6 w-1 bg-red-500"  style={{ left: `${marginData.marginThreshold}%` }} >
                            </div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>0%</span>
                            <span className="text-red-500">Threshold: {marginData.marginThreshold}%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>

                {/* Calculation Breakdown */}
                <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-calculator text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">CALCULATION BREAKDOWN</h2>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">MARGIN FORMULA</h3>
                            <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
                                <p className="text-sm text-gray-700">
                                    Margin % = (Adjusted Budget - Actual Cost) / Adjusted Budget) × 100
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-4 text-center border">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">ADJUSTED BUDGET</h4>
                                <p className="text-lg font-bold text-gray-900">
                                    ${marginData.adjustedBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 text-center border">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">ACTUAL COST</h4>
                                <p className="text-lg font-bold text-gray-900">
                                    ${marginData.actualCost.toLocaleString('en-US', { minimumFractionDigits: 3 })}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 text-center border">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">PROFIT</h4>
                                <p className="text-lg font-bold text-green-600">
                                    ${marginData.profit.toLocaleString('en-US', { minimumFractionDigits: 3 })}
                                </p>
                            </div>

                            <div className="bg-white rounded-lg p-4 text-center border">
                                <h4 className="text-sm font-medium text-gray-600 mb-2">MARGIN %</h4>
                                <p className="text-lg font-bold text-green-600">
                                    {marginData.currentMargin.toFixed(1)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alerts & Status */}
                <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-exclamation-triangle text-red-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">ALERTS & STATUS</h2>
                    </div>

                    <div className={`${marginStatus.bgColor} rounded-lg p-4 border-l-4 ${marginStatus.color.replace('bg-', 'border-')}`}>
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{marginStatus.icon}</span>
                            <div>
                                <p className={`font-medium ${marginStatus.textColor}`}>
                                    MARGIN IS WELL ABOVE THRESHOLD (84.3% > 32%)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Margin History */}
                <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                    <div className="flex items-center gap-3 mb-6">
                        <i className="bi bi-graph-up text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">MARGIN HISTORY</h2>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                        <h3 className="text-center text-sm font-medium text-gray-700 mb-2">
                            WEEKLY MARGIN TREND
                        </h3>

                        {/* Wrapper for responsiveness */}
                        <div className="overflow-x-auto">
                            <div className="flex sm:justify-between gap-2  min-w-max sm:min-w-0">
                                {weeklyTrend.map((week, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center flex-1 min-w-[60px] sm:min-w-0 bg-white"
                                    >
                                        <div
                                            className="bg-green-500 rounded-t w-full flex items-end justify-center text-white text-xs font-medium pb-1"
                                            style={{
                                                height: `${(week.margin / 100) * 120}px`,
                                                minHeight: "30px"
                                            }}
                                        >
                                            {week.margin}%
                                        </div>
                                        <div className="text-xs text-gray-600 mt-2 text-center pb-2 rounded-b">
                                            {week.week === "Current" ? "Current" : week.week.replace("Week ", "W")}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 ">
                    <button
                        onClick={refreshData}
                        className="px-6 py-3 border border-gray-400 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors">
                        REFRESH DATA
                    </button>
                    <button
                        onClick={exportReport}
                        className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-black transition-colors">
                        EXPORT REPORT
                    </button>
                    <button
                        onClick={setAlert}
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors">
                        SET ALERT
                    </button>
                </div>


            </div>
    );
};

export default MarginCalculation;

