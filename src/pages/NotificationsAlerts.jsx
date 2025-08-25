import React, { useState } from 'react';
import { Card } from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const NotificationsAlerts = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'PAYMENT DUE',
            title: 'ELECTRIPRO SERVICES',
            message: 'Payment of $7,000 to ElectriPro Services is due in 3 days (Jan 20, 2024)',
            timestamp: '2hr ago',
            priority: 'high',
            actions: ['SCHEDULE PAYMENT', 'MARK PAID', 'CONTACT VENDOR']
        },
        {
            id: 2,
            type: 'NEW QUOTE UPLOADED',
            title: 'SECURITY SYSTEMS INC',
            message: 'Security Systems Inc has uploaded a new quote for $8,500 (Reference: SS-2024-098)',
            timestamp: '3hr ago',
            priority: 'medium',
            actions: ['REVIEW QUOTE', 'ACCEPT QUOTE', 'REQUEST REVISION']
        },
        {
            id: 3,
            type: 'NEW QUOTE UPLOADED',
            title: 'HVAC SOLUTIONS',
            message: 'HVAC Solutions has uploaded a new quote for $12,000 (Reference: HVAC-2024-012)',
            timestamp: '4hr ago',
            priority: 'medium',
            actions: ['REVIEW QUOTE', 'ACCEPT QUOTE', 'REQUEST REVISION']
        },
        {
            id: 4,
            type: 'BUDGET APPROVED',
            title: 'OFFICE BUILDING CONSTRUCTION',
            message: 'Budget for project 25-01-0001 has been approved and locked by Director',
            timestamp: '1d ago',
            priority: 'low',
            actions: []
        }
    ]);

    const [alertSummary] = useState({
        critical: 2,
        warnings: 2,
        info: 1,
        resolved: 2
    });

    const [alertTriggers, setAlertTriggers] = useState([
        {
            id: 1,
            title: 'BUDGET EXCEEDED',
            description: 'Triggered when actual costs exceed budgeted amount',
            status: 'active',
            count: 2
        },
        {
            id: 2,
            title: 'MARGIN < 32%',
            description: 'Alerts when project margin falls below the minimum threshold',
            status: 'monitoring',
            count: 0
        },
        {
            id: 3,
            title: 'NEW QUOTE UPLOADED',
            description: 'Notifies when suppliers upload new quotes or revisions',
            status: 'active',
            count: 3
        },
        {
            id: 4,
            title: 'PAYMENT DUE',
            description: 'Triggered alerts for upcoming payment deadlines',
            status: 'active',
            count: 2
        }
    ]);

    const [emailNotifications, setEmailNotifications] = useState({
        budgetExceeded: true,
        marginWarnings: true,
        newQuotes: false,
        paymentReminders: true
    });

    const [systemNotifications, setSystemNotifications] = useState({
        realTimeAlerts: true,
        soundNotifications: false,
        desktopNotifications: true,
        mobilePushNotifications: true
    });

    const [roleSettings, setRoleSettings] = useState({
        directorNotifications: true,
        pmDailySummaries: true,
        bookkeeperAlerts: false,
        stakeholderUpdates: true
    });

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    };

    const refreshFeed = () => {
        console.log('Refreshing notifications feed...');
    };

    const testAlert = () => {
        alert('Test notification sent successfully!');
    };

    const clearAll = () => {
        setNotifications([]);
    };

    const toggleEmailNotification = (key) => {
        setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleSystemNotification = (key) => {
        setSystemNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleRoleSetting = (key) => {
        setRoleSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getNotificationBgColor = (type) => {
        switch (type) {
            case 'PAYMENT DUE':
                return 'bg-yellow-50 border-yellow-200';
            case 'NEW QUOTE UPLOADED':
                return 'bg-blue-50 border-blue-200';
            case 'BUDGET APPROVED':
                return 'bg-green-50 border-green-200';
            default:
                return 'bg-gray-50 border-gray-200';
        }
    };

    const getActionButtonColor = (action) => {
        switch (action) {
            case 'SCHEDULE PAYMENT':
            case 'REVIEW QUOTE':
                return 'primary';
            case 'MARK PAID':
            case 'ACCEPT QUOTE':
                return 'success';
            case 'CONTACT VENDOR':
            case 'REQUEST REVISION':
                return 'failure';
            default:
                return 'gray';
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'active':
                return 'success';
            case 'monitoring':
                return 'primary';
            default:
                return 'gray';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">

                {/* Monitoring Badge */}
                <div className="flex justify-end">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">MONITORING</span>
                </div>

                {/* Alert Summary Section */}
                <Card className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-bar-chart text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-medium text-gray-900">ALERT SUMMARY</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-red-100 border border-red-200 rounded-lg p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <i className="bi bi-exclamation-triangle-fill text-red-600"></i>
                                <span className="text-sm font-medium text-red-800">CRITICAL ALERTS</span>
                            </div>
                            <div className="text-3xl font-bold text-red-900">{alertSummary.critical}</div>
                        </div>

                        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <i className="bi bi-exclamation-triangle text-yellow-600"></i>
                                <span className="text-sm font-medium text-yellow-800">WARNINGS</span>
                            </div>
                            <div className="text-3xl font-bold text-yellow-900">{alertSummary.warnings}</div>
                        </div>

                        <div className="bg-blue-100 border border-blue-200 rounded-lg p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <i className="bi bi-info-circle text-blue-600"></i>
                                <span className="text-sm font-medium text-blue-800">INFO</span>
                            </div>
                            <div className="text-3xl font-bold text-blue-900">{alertSummary.info}</div>
                        </div>

                        <div className="bg-green-100 border border-green-200 rounded-lg p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <i className="bi bi-check-circle text-green-600"></i>
                                <span className="text-sm font-medium text-green-800">RESOLVED</span>
                            </div>
                            <div className="text-3xl font-bold text-green-900">{alertSummary.resolved}</div>
                        </div>
                    </div>
                </Card>

                {/* Live Notifications Feed Section */}
                <Card className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-bell text-yellow-600 text-lg"></i>
                        <h2 className="text-lg font-medium text-gray-900">LIVE NOTIFICATIONS FEED</h2>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div key={notification.id} className={`border rounded-lg p-4 ${getNotificationBgColor(notification.type)}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="font-bold text-gray-900">{notification.type} - {notification.title}</h4>
                                            <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{notification.timestamp}</span>
                                    </div>

                                    {notification.actions.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {notification.actions.map((action, index) => (
                                                <Button
                                                    key={index}
                                                    color={getActionButtonColor(action)}
                                                    size="xs"
                                                    className="px-3 py-1"
                                                >
                                                    {action}
                                                </Button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            color="primary"
                            size="md"
                            onClick={markAllAsRead}
                            className="font-medium"
                        >
                            MARK ALL READ
                        </Button>
                        <Button
                            color="success"
                            size="md"
                            onClick={refreshFeed}
                            className="font-medium"
                        >
                            REFRESH FEED
                        </Button>
                        <Button
                            color="warning"
                            size="md"
                            onClick={testAlert}
                            className="font-medium"
                        >
                            TEST ALERT
                        </Button>
                        <Button
                            color="failure"
                            size="md"
                            onClick={clearAll}
                            className="font-medium"
                        >
                            CLEAR ALL
                        </Button>
                    </div>
                </Card>

                {/* Alert Triggers Section */}
                <Card className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-lightning text-yellow-600 text-lg"></i>
                        <h2 className="text-lg font-medium text-gray-900">ALERT TRIGGERS</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {alertTriggers.map((trigger) => (
                            <div key={trigger.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="bi bi-exclamation-triangle text-yellow-600"></i>
                                    <h4 className="font-bold text-gray-900">{trigger.title}</h4>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{trigger.description}</p>
                                <div className="flex items-center justify-between">
                                    <Badge
                                        color={getStatusBadgeColor(trigger.status)}
                                        size="sm"
                                        className="font-medium uppercase rounded-full"
                                    >
                                        {trigger.status}
                                    </Badge>
                                    <span className="text-sm text-gray-600">{trigger.count} ACTIVE</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* User & Role Configuration Section */}
                <Card className="mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-person-gear text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-medium text-gray-900">USER & ROLE CONFIGURATION</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email Notifications */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <i className="bi bi-envelope text-gray-600"></i>
                                <h3 className="font-medium text-gray-900">EMAIL NOTIFICATIONS</h3>
                            </div>
                            <div className="space-y-3">
                                {Object.entries(emailNotifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </span>
                                        <button
                                            onClick={() => toggleEmailNotification(key)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                value ? 'bg-green-600' : 'bg-gray-200'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                    value ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* System Notifications */}
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <i className="bi bi-exclamation-triangle text-yellow-600"></i>
                                <h3 className="font-medium text-gray-900">SYSTEM NOTIFICATIONS</h3>
                            </div>
                            <div className="space-y-3">
                                {Object.entries(systemNotifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-700">
                                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                        </span>
                                        <button
                                            onClick={() => toggleSystemNotification(key)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                                value ? 'bg-green-600' : 'bg-gray-200'
                                            }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                    value ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Role-based Settings */}
                    <div className="mt-6 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <i className="bi bi-people text-gray-600"></i>
                            <h3 className="font-medium text-gray-900">ROLE-BASED SETTINGS</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(roleSettings).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between">
                                    <span className="text-sm text-gray-700">
                                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                    </span>
                                    <button
                                        onClick={() => toggleRoleSetting(key)}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            value ? 'bg-green-600' : 'bg-gray-200'
                                        }`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                                value ? 'translate-x-6' : 'translate-x-1'
                                            }`}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

            </div>
        </div>
    );
};

export default NotificationsAlerts;