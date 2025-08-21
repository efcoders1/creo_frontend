import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, onClose, windowWidth }) => {
    const location = useLocation();

    // Function to determine if a link is active
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Function to get link classes based on active state
    const getLinkClasses = (path) => {
        const baseClasses = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors";
        const activeClasses = "bg-blue-50 text-blue-700 font-medium";
        const inactiveClasses = "text-gray-700 hover:bg-gray-50 hover:text-gray-900";

        return `${baseClasses} ${isActiveLink(path) ? activeClasses : inactiveClasses}`;
    };

    // Handle link click - don't auto-close sidebar
    const handleLinkClick = () => {
        // Keep sidebar open when clicking links
    };

    return (
        <>
            {/* Sidebar */}
            <aside className={`
                fixed top-16 left-0 z-50 
                w-64 h-[calc(100vh-4rem)]
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <nav className="h-full bg-white p-3 shadow-lg overflow-y-auto border-r border-gray-200">

                    <ul className="space-y-1 text-gray-700">

                        {/* Dashboard */}
                        <li>
                            <Link to="/home" className={getLinkClasses("/home")} onClick={handleLinkClick}>
                                <i className="bi bi-speedometer2 text-base"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        {/* Project Management */}
                        <li>
                            <Link to="/project-listing" className={getLinkClasses("/project-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-kanban text-base"></i>
                                <span>Project Management</span>
                            </Link>
                        </li>

                        {/* Cost Category Management */}
                        <li>
                            <Link to="/cost-category-listing" className={getLinkClasses("/cost-category-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-tags text-base"></i>
                                <span>Cost Category Management</span>
                            </Link>
                        </li>

                        {/* Budget Planning */}
                        <li>
                            <Link to="/budget-planning-listing" className={getLinkClasses("/budget-planning-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-calculator text-base"></i>
                                <span>Budget Planning</span>
                            </Link>
                        </li>

                        {/* Actual Cost Tracking */}
                        <li>
                            <Link to="/actual-cost-tracking-listing" className={getLinkClasses("/actual-cost-tracking-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-graph-up-arrow text-base"></i>
                                <span>Actual Cost Tracking</span>
                            </Link>
                        </li>

                        {/* Margin Calculation */}
                        <li>
                            <Link to="/margin-calculation" className={getLinkClasses("/margin-calculation")} onClick={handleLinkClick}>
                                <i className="bi bi-percent text-base"></i>
                                <span>Margin Calculation</span>
                            </Link>
                        </li>

                        {/* Storage Asset Management */}
                        <li>
                            <Link to="/storage-assets" className={getLinkClasses("/storage-assets")} onClick={handleLinkClick}>
                                <i className="bi bi-hdd-stack text-base"></i>
                                <span>Storage Asset Management</span>
                            </Link>
                        </li>

                        {/* Supplier Quote Management */}
                        <li>
                            <Link to="/supplier-quote-listing" className={getLinkClasses("/supplier-quote-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-file-earmark-text text-base"></i>
                                <span>Supplier Quote Management</span>
                            </Link>
                        </li>

                        {/* Approval & Locking */}
                        <li>
                            <Link to="/approval-locking-listing" className={getLinkClasses("/approval-locking-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-shield-check text-base"></i>
                                <span>Approval & Locking</span>
                            </Link>
                        </li>

                        {/* Notifications Alerts */}
                        <li>
                            <Link to="/notifications-alerts" className={getLinkClasses("/notifications-alerts")} onClick={handleLinkClick}>
                                <i className="bi bi-bell text-base"></i>
                                <span>Notifications Alerts</span>
                            </Link>
                        </li>

                        {/* Collaboration Comments */}
                        <li>
                            <Link to="/collaboration-comments-listing" className={getLinkClasses("/collaboration-comments-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-chat-dots text-base"></i>
                                <span>Collaboration Comments</span>
                            </Link>
                        </li>

                        {/* Photo upload */}
                        <li>
                            <Link to="/photo-upload" className={getLinkClasses("/photo-upload")} onClick={handleLinkClick}>
                                <i className="bi bi-camera text-base"></i>
                                <span>Photo upload</span>
                            </Link>
                        </li>

                        {/* Reporting Dashboard */}
                        <li>
                            <Link to="/reporting-dashboard" className={getLinkClasses("/reporting-dashboard")} onClick={handleLinkClick}>
                                <i className="bi bi-bar-chart text-base"></i>
                                <span>Reporting Dashboard</span>
                            </Link>
                        </li>

                        {/* Mobile Interface */}
                        <li>
                            <Link to="/mobile-interface-listing" className={getLinkClasses("/mobile-interface-listing")} onClick={handleLinkClick}>
                                <i className="bi bi-phone text-base"></i>
                                <span>Mobile Interface</span>
                            </Link>
                        </li>

                        {/* Access Control Permissions */}
                        <li>
                            <Link to="/access-control" className={getLinkClasses("/access-control")} onClick={handleLinkClick}>
                                <i className="bi bi-key text-base"></i>
                                <span>Access Control Permissions</span>
                            </Link>
                        </li>

                        {/* Audit Trail */}
                        <li>
                            <Link to="/audit-trail" className={getLinkClasses("/audit-trail")} onClick={handleLinkClick}>
                                <i className="bi bi-person-check text-base"></i>
                                <span>Audit Trail</span>
                            </Link>
                        </li>

                        {/* Financial Modeling & Simulation Tool */}
                        <li>
                            <Link to="/financial-modeling" className={getLinkClasses("/financial-modeling")} onClick={handleLinkClick}>
                                <i className="bi bi-graph-down text-base"></i>
                                <span>Financial Modeling & Simulation Tool</span>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;

