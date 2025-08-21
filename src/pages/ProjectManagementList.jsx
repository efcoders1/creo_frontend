import React, { useState } from 'react';
import ProjectDeleteConfirmationModal from './ProjectDeleteConfirmationModal.jsx';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Badge } from 'flowbite-react';
import { Card } from 'flowbite-react';

const ProjectListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, project: null });
    const [isDeleting, setIsDeleting] = useState(false);

    // Updated project data with category items and dummy images
    const [projects, setProjects] = useState([
        {
            id: 1,
            projectName: 'Office Building Construction',
            jobCode: '25-01-0001',
            startDate: '2025-01-15',
            endDate: '2025-12-30',
            projectManager: 'Sarah Johnson',
            status: 'active',
            stakeholders: [
                { name: 'Jane Doe', role: 'Architect', avatar: 'JD', color: 'bg-blue-500', imageUrl: 'https://picsum.photos/seed/JaneDoe/50/50' },
                { name: 'Tom Anderson', role: 'Site Supervisor', avatar: 'TA', color: 'bg-orange-500', imageUrl: 'https://picsum.photos/seed/TomAnderson/50/50' },
                { name: 'Mike Chen', role: 'Engineer', avatar: 'MC', color: 'bg-green-500', imageUrl: 'https://picsum.photos/seed/MikeChen/50/50' }
            ],
            budget: '$2,500,000',
            standImage: 'https://picsum.photos/seed/office/400/200',
            standSize: '10x20ft',
            unpaidInvoices: true,
            clientPaid: false,
            createdDate: '2025-01-10',
            categoryItems: [
                { category: 'Floor Costs', supplierQuotes: 15000, supplierCost: 14500, actuals: 15200 },
                { category: 'Build Items', supplierQuotes: 25000, supplierCost: 24000, actuals: 26500 },
                { category: 'Electrical Stand Power & Leads', supplierQuotes: 8000, supplierCost: 7800, actuals: 8200 }
            ]
        },
        {
            id: 2,
            projectName: 'Warehouse Renovation',
            jobCode: '25-01-0002',
            startDate: '2025-02-01',
            endDate: '2025-08-15',
            projectManager: 'Michael Chen',
            status: 'draft',
            stakeholders: [
                { name: 'Emma Wilson', role: 'Project Coordinator', avatar: 'EW', color: 'bg-purple-500', imageUrl: 'https://picsum.photos/seed/EmmaWilson/50/50' },
                { name: 'David Smith', role: 'Contractor', avatar: 'DS', color: 'bg-red-500', imageUrl: 'https://picsum.photos/seed/DavidSmith/50/50' }
            ],
            budget: '$850,000',
            standImage: 'https://picsum.photos/seed/warehouse/400/200',
            standSize: '20x30ft',
            unpaidInvoices: false,
            clientPaid: true,
            createdDate: '2025-01-08',
            categoryItems: [
                { category: 'Refurb Cost', supplierQuotes: 35000, supplierCost: 33000, actuals: 36000 },
                { category: 'Lighting', supplierQuotes: 12000, supplierCost: 11500, actuals: 12500 }
            ]
        },
        {
            id: 3,
            projectName: 'Retail Store Fitout',
            jobCode: '25-01-0003',
            startDate: '2024-11-01',
            endDate: '2025-03-30',
            projectManager: 'Emma Thompson',
            status: 'active',
            stakeholders: [
                { name: 'Lisa Wong', role: 'Interior Designer', avatar: 'LW', color: 'bg-pink-500', imageUrl: 'https://picsum.photos/seed/LisaWong/50/50' },
                { name: 'Robert Brown', role: 'Electrician', avatar: 'RB', color: 'bg-yellow-500', imageUrl: 'https://picsum.photos/seed/RobertBrown/50/50' },
                { name: 'Anna Davis', role: 'Project Assistant', avatar: 'AD', color: 'bg-indigo-500', imageUrl: 'https://picsum.photos/seed/AnnaDavis/50/50' }
            ],
            budget: '$450,000',
            standImage: 'https://picsum.photos/seed/retail/400/200',
            standSize: '15x15ft',
            unpaidInvoices: true,
            clientPaid: true,
            createdDate: '2024-10-25',
            categoryItems: [
                { category: 'Graphics Design and print graphics', supplierQuotes: 8000, supplierCost: 7500, actuals: 8200 },
                { category: 'Furniture', supplierQuotes: 18000, supplierCost: 17000, actuals: 18500 },
                { category: 'Event Décor', supplierQuotes: 5000, supplierCost: 4800, actuals: 5200 }
            ]
        },
        {
            id: 4,
            projectName: 'Hospital Wing Extension',
            jobCode: '25-01-0004',
            startDate: '2025-03-01',
            endDate: '2026-02-28',
            projectManager: 'David Wilson',
            status: 'draft',
            stakeholders: [
                { name: 'Dr. Sarah Lee', role: 'Medical Consultant', avatar: 'SL', color: 'bg-teal-500', imageUrl: 'https://picsum.photos/seed/SarahLee/50/50' },
                { name: 'Mark Johnson', role: 'Structural Engineer', avatar: 'MJ', color: 'bg-cyan-500', imageUrl: 'https://picsum.photos/seed/MarkJohnson/50/50' }
            ],
            budget: '$5,200,000',
            standImage: 'https://picsum.photos/seed/hospital/400/200',
            standSize: '25x25ft',
            unpaidInvoices: false,
            clientPaid: false,
            createdDate: '2025-01-05',
            categoryItems: [
                { category: 'Build Items', supplierQuotes: 150000, supplierCost: 145000, actuals: 0 },
                { category: 'Plumbing', supplierQuotes: 45000, supplierCost: 43000, actuals: 0 },
                { category: 'Audio Visual (AV)', supplierQuotes: 25000, supplierCost: 24000, actuals: 0 }
            ]
        },
        {
            id: 5,
            projectName: 'School Playground Upgrade',
            jobCode: '25-01-0005',
            startDate: '2024-09-01',
            endDate: '2024-12-15',
            projectManager: 'Robert Smith',
            status: 'closed',
            stakeholders: [
                { name: 'Mary Johnson', role: 'Safety Inspector', avatar: 'MJ', color: 'bg-lime-500', imageUrl: 'https://picsum.photos/seed/MaryJohnson/50/50' },
                { name: 'Peter Wilson', role: 'Landscape Architect', avatar: 'PW', color: 'bg-amber-500', imageUrl: 'https://picsum.photos/seed/PeterWilson/50/50' }
            ],
            budget: '$125,000',
            standImage: 'https://picsum.photos/seed/playground/400/200',
            standSize: '5x10ft',
            unpaidInvoices: true,
            clientPaid: true,
            createdDate: '2024-08-20',
            categoryItems: [
                { category: 'Greenery', supplierQuotes: 8000, supplierCost: 7500, actuals: 8200 },
                { category: 'Install Bump Out', supplierQuotes: 12000, supplierCost: 11500, actuals: 12800 }
            ]
        },
        {
            id: 6,
            projectName: 'Residential Complex Phase 2',
            jobCode: '25-01-0006',
            startDate: '2025-04-01',
            endDate: '2026-10-30',
            projectManager: 'Sarah Johnson',
            status: 'active',
            stakeholders: [
                { name: 'Alex Turner', role: 'Civil Engineer', avatar: 'AT', color: 'bg-rose-500', imageUrl: 'https://picsum.photos/seed/AlexTurner/50/50' },
                { name: 'Nina Patel', role: 'Urban Planner', avatar: 'NP', color: 'bg-violet-500', imageUrl: 'https://picsum.photos/seed/NinaPatel/50/50' },
                { name: 'Chris Lee', role: 'Construction Manager', avatar: 'CL', color: 'bg-emerald-500', imageUrl: 'https://picsum.photos/seed/ChrisLee/50/50' }
            ],
            budget: '$8,750,000',
            standImage: 'https://picsum.photos/seed/residential/400/200',
            standSize: '30x40ft',
            unpaidInvoices: false,
            clientPaid: true,
            createdDate: '2025-01-12',
            categoryItems: [
                { category: 'Floor Costs', supplierQuotes: 85000, supplierCost: 82000, actuals: 0 },
                { category: 'Build Items', supplierQuotes: 250000, supplierCost: 240000, actuals: 0 },
                { category: 'Electrical Stand Power & Leads', supplierQuotes: 35000, supplierCost: 33000, actuals: 0 },
                { category: 'Plumbing', supplierQuotes: 65000, supplierCost: 62000, actuals: 0 }
            ]
        }
    ]);

    const statusOptions = [
        { value: 'all', label: 'ALL PROJECTS', color: 'bg-gray-600' },
        { value: 'draft', label: 'DRAFT', color: 'bg-gray-600' },
        { value: 'active', label: 'ACTIVE', color: 'bg-green-600' },
        { value: 'closed', label: 'CLOSED', color: 'bg-red-600' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'name', label: 'Project Name' },
        { value: 'status', label: 'Status' },
        { value: 'manager', label: 'Project Manager' }
    ];

    // Filter and sort projects
    const filteredProjects = projects
        .filter(project => {
            const matchesSearch = project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.jobCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.projectManager.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdDate) - new Date(a.createdDate);
                case 'oldest':
                    return new Date(a.createdDate) - new Date(b.createdDate);
                case 'name':
                    return a.projectName.localeCompare(b.projectName);
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'manager':
                    return a.projectManager.localeCompare(b.projectManager);
                default:
                    return 0;
            }
        });

    const statusToBadgeColor = (status) => {
        switch (status) {
            case 'draft': return 'gray';
            case 'active': return 'success';
            case 'closed': return 'failure';
            default: return 'gray';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-600';
            case 'active': return 'bg-green-600';
            case 'closed': return 'bg-red-600';
            default: return 'bg-gray-600';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const calculateProjectTotals = (categoryItems) => {
        return categoryItems.reduce((totals, item) => ({
            supplierQuotes: totals.supplierQuotes + item.supplierQuotes,
            supplierCost: totals.supplierCost + item.supplierCost,
            actuals: totals.actuals + item.actuals
        }), { supplierQuotes: 0, supplierCost: 0, actuals: 0 });
    };

    const navigate = useNavigate();

    const handleViewProject = (projectId) => {
        navigate(`/project/${projectId}/view`);
    };

    const handleEditProject = (projectId) => {
        navigate(`/project/${projectId}/edit`);
    };

    const handleDeleteProject = (projectId) => {
        const project = projects.find(p => p.id === projectId);
        setDeleteModal({ isOpen: true, project });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.project) return;

        setIsDeleting(true);

        // Simulate API call
        setTimeout(() => {
            // Remove project from state
            setProjects(prev => prev.filter(p => p.id !== deleteModal.project.id));

            // Close modal and reset state
            setDeleteModal({ isOpen: false, project: null });
            setIsDeleting(false);

            console.log('Project deleted:', deleteModal.project.id);
        }, 1500);
    };

    const handleCancelDelete = () => {
        setDeleteModal({ isOpen: false, project: null });
    };

    const handleCreateNew = () => {
        navigate("/project/create");
    };

    return (
        <div>

            <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 sm:mb-4 gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <i className="bi bi-kanban text-blue-600 text-base sm:text-lg"></i>
                        <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">PROJECT MANAGEMENT</h1>
                    </div>
                    <Button
                        color="primary"
                        size="md"
                        className="flex items-center gap-2"
                        onClick={() => navigate('/project-management')}
                    >
                        <i className="bi bi-plus-circle mr-1 sm:mr-2"></i>
                        <span className="hidden sm:inline">CREATE NEW PROJECT</span>
                        <span className="sm:hidden">CREATE</span>
                    </Button>
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Manage and track all construction projects with category-based cost tracking</p>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <i className="bi bi-funnel text-gray-600 text-base sm:text-lg"></i>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">FILTERS & SEARCH</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {/* Search */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            SEARCH PROJECTS
                        </label>
                        <input
                            type="text"
                            placeholder="Search by name, code, or manager..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            FILTER BY STATUS
                        </label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-sm sm:text-base text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            SORT BY
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-sm sm:text-base text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filteredProjects.map((project) => {
                    const totals = calculateProjectTotals(project.categoryItems || []);

                    return (
                        <Card key={project.id}>
                            {/* Project Header */}
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                                <div className="flex-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                                        {project.projectName}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs sm:text-sm font-medium text-gray-600">Job Code:</span>
                                        <span className="text-blue-600 font-bold text-xs sm:text-sm">{project.jobCode}</span>
                                    </div>
                                </div>
                                <Badge color={statusToBadgeColor(project.status)}
                                       size="sm" className="px-2 sm:px-3 py-1 rounded-full font-medium">
                                    {project.status.toUpperCase()}
                                </Badge>
                            </div>

                            {/* Project Details */}
                            <div className="space-y-1 sm:space-y-2 text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-person-circle text-sm sm:text-base"></i>
                                    <span className="text-xs sm:text-sm">{project.projectManager}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-calendar text-sm sm:text-base"></i>
                                    <span className="text-xs sm:text-sm">{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-currency-dollar text-sm sm:text-base"></i>
                                    <span className="text-xs sm:text-sm">{project.budget}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-aspect-ratio text-sm sm:text-base"></i>
                                    <span className="text-xs sm:text-sm">{project.standSize}</span>
                                </div>
                            </div>

                            {/* Category Items Summary */}
                            <div className="mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="bi bi-list-ul text-gray-600 text-sm sm:text-base"></i>
                                    <span className="font-medium text-gray-900 text-sm sm:text-base">{project.categoryItems.length} Category Items</span>
                                </div>
                                <div className="grid grid-cols-3 gap-2 text-center text-xs sm:text-sm">
                                    <div>
                                        <p className="text-blue-600 font-semibold text-xs sm:text-sm">{formatCurrency(totals.supplierQuotes)}</p>
                                        <p className="text-gray-500 text-xs">Quotes</p>
                                    </div>

                                    <div>
                                        <p className="text-orange-600 font-semibold text-xs sm:text-sm">{formatCurrency(totals.supplierCost)}</p>
                                        <p className="text-gray-500 text-xs">Cost</p>
                                    </div>

                                    <div>
                                        <p className="text-red-600 font-semibold text-xs sm:text-sm">{formatCurrency(totals.actuals)}</p>
                                        <p className="text-gray-500 text-xs">Actuals</p>
                                    </div>

                                </div>
                            </div>

                            {/* Team Members */}
                            <div className="mb-3 sm:mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <i className="bi bi-people text-gray-600 text-sm sm:text-base"></i>
                                    <span className="font-medium text-gray-900 text-sm sm:text-base">Team Members</span>
                                </div>
                                <div className="flex -space-x-2 overflow-hidden">
                                    {project.stakeholders.map((stakeholder, index) => (
                                        <img
                                            key={index}
                                            className="inline-block h-6 w-6 sm:h-8 sm:w-8 rounded-full ring-2 ring-white"
                                            src={stakeholder.imageUrl}
                                            alt={stakeholder.name}
                                            title={stakeholder.name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Invoice Status (for closed projects) */}
                            {project.status === 'closed' && (
                                <div className="mb-3 sm:mb-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <i className="bi bi-receipt text-sm sm:text-base"></i>
                                        <span className="font-medium text-gray-900 text-sm sm:text-base">Invoice Status</span>
                                    </div>
                                    <div className="space-y-1">
                                        {project.unpaidInvoices ? (
                                            <p className="text-red-600 text-xs sm:text-sm"><i className="bi bi-exclamation-triangle-fill mr-1"></i>Unpaid Invoices</p>
                                        ) : (
                                            <p className="text-green-600 text-xs sm:text-sm"><i className="bi bi-check-circle-fill mr-1"></i>No Unpaid Invoices</p>
                                        )}
                                        {project.clientPaid ? (
                                            <p className="text-green-600 text-xs sm:text-sm"><i className="bi bi-check-circle-fill mr-1"></i>Client Paid</p>
                                        ) : (
                                            <p className="text-red-600 text-xs sm:text-sm"><i className="bi bi-x-circle-fill mr-1"></i>Client Payment Pending</p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                                <Button
                                    color="primary"
                                    className="sm:w-auto flex items-center justify-center gap-1"
                                    onClick={() => handleViewProject(project.id)}
                                >
                                    <i className="bi bi-eye mr-1"></i>

                                </Button>
                                <Button
                                    color="gray"
                                    className="sm:w-auto flex items-center justify-center gap-1"
                                    onClick={() => handleEditProject(project.id)}
                                >
                                    <i className="bi bi-pencil mr-1"></i>
                                                                    </Button>
                                <Button
                                    color="failure"
                                    className="sm:w-auto flex items-center justify-center gap-1"
                                    onClick={() => handleDeleteProject(project.id)}
                                >
                                    <i className="bi bi-trash"></i>
                                </Button>
                            </div>


                        </Card>
                    );
                })}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteModal.isOpen && (
                <ProjectDeleteConfirmationModal
                    project={deleteModal.project}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    isDeleting={isDeleting}
                />
            )}
        </div>
    );
};

export default ProjectListing;
