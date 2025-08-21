import React, { useState, useRef, useEffect } from 'react';

const Header = ({ onToggleSidebar, isSidebarOpen, windowWidth }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSwitchDropdown, setShowSwitchDropdown] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        name: 'John Smith',
        role: 'Director',
        email: 'john.smith@company.com',
        avatar: 'JS',
        department: 'Operations',
        lastLogin: '2025-01-16 09:30 AM'
    });

    const dropdownRef = useRef(null);
    const switchDropdownRef = useRef(null);

    // Available users for switching
    const availableUsers = [
        {
            name: 'John Smith',
            role: 'Director',
            email: 'john.smith@company.com',
            avatar: 'JS',
            department: 'Operations',
            lastLogin: '2025-01-16 09:30 AM'
        },
        {
            name: 'Sarah Johnson',
            role: 'Project Manager',
            email: 'sarah.johnson@company.com',
            avatar: 'SJ',
            department: 'Construction',
            lastLogin: '2025-01-16 08:45 AM'
        },
        {
            name: 'Michael Chen',
            role: 'Financial Controller',
            email: 'michael.chen@company.com',
            avatar: 'MC',
            department: 'Finance',
            lastLogin: '2025-01-16 07:15 AM'
        },
        {
            name: 'Emma Davis',
            role: 'Site Supervisor',
            email: 'emma.davis@company.com',
            avatar: 'ED',
            department: 'Field Operations',
            lastLogin: '2025-01-15 16:30 PM'
        },
        {
            name: 'Robert Wilson',
            role: 'Quality Inspector',
            email: 'robert.wilson@company.com',
            avatar: 'RW',
            department: 'Quality Assurance',
            lastLogin: '2025-01-15 14:20 PM'
        }
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
            if (switchDropdownRef.current && !switchDropdownRef.current.contains(event.target)) {
                setShowSwitchDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleUserSwitch = (user) => {
        setCurrentUser(user);
        setShowSwitchDropdown(false);
        alert(`Switched to ${user.name} (${user.role})`);
    };

    const handleLogout = () => {
        setShowDropdown(false);
        alert('Logging out...');
    };

    const handleProfile = () => {
        setShowDropdown(false);
        alert('Opening profile settings...');
    };

    const handleSettings = () => {
        setShowDropdown(false);
        alert('Opening account settings...');
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'Director': return 'text-red-600 bg-red-50';
            case 'Project Manager': return 'text-blue-600 bg-blue-50';
            case 'Financial Controller': return 'text-green-600 bg-green-50';
            case 'Site Supervisor': return 'text-orange-600 bg-orange-50';
            case 'Quality Inspector': return 'text-purple-600 bg-purple-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const getAvatarColor = (role) => {
        switch (role) {
            case 'Director': return 'from-red-500 to-red-600';
            case 'Project Manager': return 'from-blue-500 to-blue-600';
            case 'Financial Controller': return 'from-green-500 to-green-600';
            case 'Site Supervisor': return 'from-orange-500 to-orange-600';
            case 'Quality Inspector': return 'from-purple-500 to-purple-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-white z-40 relative h-16">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                {/* Menu Icon - Always visible for sidebar toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Toggle sidebar"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">Cre8 Co</span>
                    {/*<span className="text-sm text-gray-600 font-medium"></span>*/}
                </div>

                {/* See Plans Button */}
                {/*<button className="px-4 py-2 text-xs font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">*/}
                {/*    See plans*/}
                {/*</button>*/}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
                {/* Current User Role Display - Hidden on mobile */}
                <button className="hidden lg:flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm">{currentUser.role}</span>
                </button>

                {/* Switch Button with Dropdown - Hidden on mobile */}
                <div className="relative hidden lg:block" ref={switchDropdownRef}>
                    <button
                        onClick={() => setShowSwitchDropdown(!showSwitchDropdown)}
                        className="px-4 py-2 text-xs font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Switch
                    </button>

                    {/* Switch Dropdown */}
                    {showSwitchDropdown && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            <div className="p-4 border-b border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900">Switch User Account</h3>
                                <p className="text-xs text-gray-600">Select a user to switch to</p>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                {availableUsers.map((user, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleUserSwitch(user)}
                                        className={`w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                                            currentUser.email === user.email ? 'bg-blue-50' : ''
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-8 h-8 bg-gradient-to-r ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white text-xs font-medium`}>
                                                {user.avatar}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                                    {currentUser.email === user.email && (
                                                        <span className="text-xs text-blue-600 font-medium">(Current)</span>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2 mt-1">
                                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                                                        {user.role}
                                                    </span>
                                                    <span className="text-xs text-gray-500">{user.department}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">Last login: {user.lastLogin}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Avatar with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className={`w-8 h-8 bg-gradient-to-r ${getAvatarColor(currentUser.role)} rounded-full flex items-center justify-center text-white text-sm font-medium hover:shadow-lg transition-shadow`}
                    >
                        {currentUser.avatar}
                    </button>

                    {/* Profile Dropdown */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                            {/* User Info Section */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${getAvatarColor(currentUser.role)} rounded-full flex items-center justify-center text-white text-lg font-medium`}>
                                        {currentUser.avatar}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(currentUser.role)} mt-1`}>
                                            {currentUser.role}
                                        </span>
                                        <p className="text-xs text-gray-600 mt-1">{currentUser.email}</p>
                                        <p className="text-xs text-gray-500">{currentUser.department} Department</p>
                                    </div>
                                </div>
                            </div>

                            {/* Menu Items */}
                            <div className="py-2">
                                <button
                                    onClick={handleProfile}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>View Profile</span>
                                </button>

                                <button
                                    onClick={handleSettings}
                                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Account Settings</span>
                                </button>

                                <div className="border-t border-gray-200 mt-2 pt-2">
                                    <div className="px-4 py-2">
                                        <p className="text-xs text-gray-500">Last login: {currentUser.lastLogin}</p>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

