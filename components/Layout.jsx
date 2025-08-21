import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);

            // Auto-hide sidebar on screens <= 991px
            if (width <= 991) {
                setIsSidebarOpen(false);
            } else {
                // Auto-show sidebar on screens > 991px
                setIsSidebarOpen(true);
            }
        };

        // Set initial state based on window width
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex flex-col w-screen h-screen">
            {/* Header */}
            <Header
                onToggleSidebar={toggleSidebar}
                isSidebarOpen={isSidebarOpen}
                windowWidth={windowWidth}
            />

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={closeSidebar}
                    windowWidth={windowWidth}
                />

                {/* Main Content */}
                <main className={`flex-1 p-4 overflow-auto bg-white shadow-2xl transition-all duration-300 ease-in-out ${
                    isSidebarOpen && windowWidth > 991 ? 'ml-64' : 'ml-0'
                }`}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;

