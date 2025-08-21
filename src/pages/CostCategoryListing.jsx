import React, { useState, useEffect } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal.jsx';
import { useNavigate } from 'react-router-dom';

const CostCategoryListing = ({ projectId = null, projectName = null }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortBy, setSortBy] = useState('order');
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, category: null });
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedProject, setSelectedProject] = useState(projectId || 'all');

    // Dummy project data
    const projects = [
        { id: 'all', name: 'All Projects' },
        { id: 1, name: 'Downtown Office Complex' },
        { id: 2, name: 'Residential Tower A' },
        { id: 3, name: 'Shopping Mall Renovation' },
        { id: 4, name: 'Hospital Wing Extension' },
        { id: 5, name: 'School Modernization' },
        { id: 6, name: 'Warehouse Facility' },
        { id: 7, name: 'Corporate Headquarters' },
        { id: 8, name: 'Community Center' },
        { id: 9, name: 'Hotel Renovation' },
        { id: 10, name: 'Manufacturing Plant' },
        { id: 11, name: 'Sports Complex' },
        { id: 12, name: 'Retail Store' }
    ];

    // Enhanced cost category data with project-specific information
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'FLOOR',
            type: 'MATERIAL',
            order: 1,
            icon: '🏠',
            description: 'Flooring materials and installation costs',
            status: 'active',
            lastUpdated: '2025-01-15',
            createdBy: 'Sarah Johnson',
            usageCount: 12,
            projectBreakdown: {
                1: { budgetAllocated: '$122,000', actualSpent: '$108,700', variance: '-$13,300', status: 'active' },
                2: { budgetAllocated: '$18,000', actualSpent: '$16,800', variance: '-$1,200', status: 'active' },
                3: { budgetAllocated: '$12,000', actualSpent: '$9,200', variance: '-$2,800', status: 'completed' },
                4: { budgetAllocated: '$0', actualSpent: '$0', variance: '$0', status: 'not_applicable' },
                5: { budgetAllocated: '$8,500', actualSpent: '$8,500', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$6,000', actualSpent: '$5,200', variance: '-$800', status: 'active' },
                7: { budgetAllocated: '$22,000', actualSpent: '$18,900', variance: '-$3,100', status: 'active' },
                8: { budgetAllocated: '$5,500', actualSpent: '$5,500', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$9,000', actualSpent: '$8,200', variance: '-$800', status: 'active' },
                10: { budgetAllocated: '$14,000', actualSpent: '$12,800', variance: '-$1,200', status: 'active' },
                11: { budgetAllocated: '$7,200', actualSpent: '$6,900', variance: '-$300', status: 'active' },
                12: { budgetAllocated: '$4,800', actualSpent: '$4,200', variance: '-$600', status: 'completed' }
            }
        },
        {
            id: 2,
            name: 'BUILD ITEMS',
            type: 'MATERIAL',
            order: 2,
            icon: '🔨',
            description: 'General construction materials and supplies',
            status: 'active',
            lastUpdated: '2025-01-18',
            createdBy: 'Michael Chen',
            usageCount: 25,
            projectBreakdown: {
                1: { budgetAllocated: '$45,000', actualSpent: '$48,200', variance: '+$3,200', status: 'active' },
                2: { budgetAllocated: '$38,000', actualSpent: '$35,600', variance: '-$2,400', status: 'active' },
                3: { budgetAllocated: '$28,000', actualSpent: '$31,500', variance: '+$3,500', status: 'completed' },
                4: { budgetAllocated: '$52,000', actualSpent: '$49,800', variance: '-$2,200', status: 'active' },
                5: { budgetAllocated: '$22,000', actualSpent: '$22,000', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$18,500', actualSpent: '$17,200', variance: '-$1,300', status: 'active' },
                7: { budgetAllocated: '$65,000', actualSpent: '$62,400', variance: '-$2,600', status: 'active' },
                8: { budgetAllocated: '$15,000', actualSpent: '$15,000', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$32,000', actualSpent: '$29,800', variance: '-$2,200', status: 'active' },
                10: { budgetAllocated: '$42,000', actualSpent: '$44,500', variance: '+$2,500', status: 'active' },
                11: { budgetAllocated: '$25,000', actualSpent: '$23,800', variance: '-$1,200', status: 'active' },
                12: { budgetAllocated: '$19,500', actualSpent: '$18,200', variance: '-$1,300', status: 'completed' }
            }
        },
        {
            id: 3,
            name: 'ELECTRICAL',
            type: 'SUBCONTRACTOR',
            order: 3,
            icon: '⚡',
            description: 'Electrical systems and installations',
            status: 'active',
            lastUpdated: '2025-01-14',
            createdBy: 'Sarah Johnson',
            usageCount: 18,
            projectBreakdown: {
                1: { budgetAllocated: '$25,000', actualSpent: '$23,800', variance: '-$1,200', status: 'active' },
                2: { budgetAllocated: '$18,000', actualSpent: '$17,500', variance: '-$500', status: 'active' },
                3: { budgetAllocated: '$15,000', actualSpent: '$16,200', variance: '+$1,200', status: 'completed' },
                4: { budgetAllocated: '$32,000', actualSpent: '$30,500', variance: '-$1,500', status: 'active' },
                5: { budgetAllocated: '$12,000', actualSpent: '$12,000', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$8,500', actualSpent: '$8,200', variance: '-$300', status: 'active' },
                7: { budgetAllocated: '$35,000', actualSpent: '$33,200', variance: '-$1,800', status: 'active' },
                8: { budgetAllocated: '$6,000', actualSpent: '$6,000', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$14,000', actualSpent: '$13,500', variance: '-$500', status: 'active' },
                10: { budgetAllocated: '$22,000', actualSpent: '$24,100', variance: '+$2,100', status: 'active' },
                11: { budgetAllocated: '$16,500', actualSpent: '$15,800', variance: '-$700', status: 'active' },
                12: { budgetAllocated: '$9,000', actualSpent: '$8,500', variance: '-$500', status: 'completed' }
            }
        },
        {
            id: 4,
            name: 'PLUMBING',
            type: 'SUBCONTRACTOR',
            order: 4,
            icon: '🚰',
            description: 'Plumbing installation and maintenance',
            status: 'active',
            lastUpdated: '2025-01-16',
            createdBy: 'Robert Smith',
            usageCount: 15,
            projectBreakdown: {
                1: { budgetAllocated: '$18,000', actualSpent: '$19,200', variance: '+$1,200', status: 'active' },
                2: { budgetAllocated: '$15,000', actualSpent: '$14,500', variance: '-$500', status: 'active' },
                3: { budgetAllocated: '$12,000', actualSpent: '$13,100', variance: '+$1,100', status: 'completed' },
                4: { budgetAllocated: '$28,000', actualSpent: '$26,800', variance: '-$1,200', status: 'active' },
                5: { budgetAllocated: '$8,000', actualSpent: '$8,000', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$6,500', actualSpent: '$6,200', variance: '-$300', status: 'active' },
                7: { budgetAllocated: '$25,000', actualSpent: '$24,100', variance: '-$900', status: 'active' },
                8: { budgetAllocated: '$4,500', actualSpent: '$4,500', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$11,000', actualSpent: '$10,500', variance: '-$500', status: 'active' },
                10: { budgetAllocated: '$16,000', actualSpent: '$17,200', variance: '+$1,200', status: 'active' },
                11: { budgetAllocated: '$12,500', actualSpent: '$11,800', variance: '-$700', status: 'active' },
                12: { budgetAllocated: '$7,000', actualSpent: '$6,500', variance: '-$500', status: 'completed' }
            }
        },
        {
            id: 5,
            name: 'HVAC SYSTEMS',
            type: 'SUBCONTRACTOR',
            order: 5,
            icon: '❄️',
            description: 'Heating, ventilation, and air conditioning',
            status: 'active',
            lastUpdated: '2025-01-13',
            createdBy: 'David Wilson',
            usageCount: 10,
            projectBreakdown: {
                1: { budgetAllocated: '$35,000', actualSpent: '$33,500', variance: '-$1,500', status: 'active' },
                2: { budgetAllocated: '$28,000', actualSpent: '$27,200', variance: '-$800', status: 'active' },
                3: { budgetAllocated: '$0', actualSpent: '$0', variance: '$0', status: 'not_applicable' },
                4: { budgetAllocated: '$45,000', actualSpent: '$43,800', variance: '-$1,200', status: 'active' },
                5: { budgetAllocated: '$18,000', actualSpent: '$18,000', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$12,000', actualSpent: '$11,500', variance: '-$500', status: 'active' },
                7: { budgetAllocated: '$52,000', actualSpent: '$49,800', variance: '-$2,200', status: 'active' },
                8: { budgetAllocated: '$8,000', actualSpent: '$8,000', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$22,000', actualSpent: '$21,200', variance: '-$800', status: 'active' },
                10: { budgetAllocated: '$32,000', actualSpent: '$34,100', variance: '+$2,100', status: 'active' },
                11: { budgetAllocated: '$25,000', actualSpent: '$24,200', variance: '-$800', status: 'active' },
                12: { budgetAllocated: '$0', actualSpent: '$0', variance: '$0', status: 'not_applicable' }
            }
        },
        {
            id: 6,
            name: 'GRAPHICS',
            type: 'MATERIAL',
            order: 6,
            icon: '🎨',
            description: 'Signage, graphics, and visual elements',
            status: 'active',
            lastUpdated: '2025-01-10',
            createdBy: 'David Wilson',
            usageCount: 6,
            projectBreakdown: {
                1: { budgetAllocated: '$8,000', actualSpent: '$7,200', variance: '-$800', status: 'completed' },
                2: { budgetAllocated: '$6,000', actualSpent: '$5,800', variance: '-$200', status: 'active' },
                3: { budgetAllocated: '$12,000', actualSpent: '$11,500', variance: '-$500', status: 'completed' },
                4: { budgetAllocated: '$5,000', actualSpent: '$4,800', variance: '-$200', status: 'active' },
                5: { budgetAllocated: '$3,500', actualSpent: '$3,500', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$2,000', actualSpent: '$1,800', variance: '-$200', status: 'active' },
                7: { budgetAllocated: '$15,000', actualSpent: '$14,200', variance: '-$800', status: 'active' },
                8: { budgetAllocated: '$4,000', actualSpent: '$4,000', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$7,500', actualSpent: '$7,100', variance: '-$400', status: 'active' },
                10: { budgetAllocated: '$9,000', actualSpent: '$8,500', variance: '-$500', status: 'active' },
                11: { budgetAllocated: '$6,500', actualSpent: '$6,200', variance: '-$300', status: 'active' },
                12: { budgetAllocated: '$10,000', actualSpent: '$9,500', variance: '-$500', status: 'completed' }
            }
        },
        {
            id: 7,
            name: 'MANAGEMENT FEE',
            type: 'OVERHEAD',
            order: 7,
            icon: '💼',
            description: 'Project management and administrative costs',
            status: 'active',
            lastUpdated: '2025-01-17',
            createdBy: 'Emma Thompson',
            usageCount: 30,
            projectBreakdown: {
                1: { budgetAllocated: '$12,000', actualSpent: '$12,000', variance: '$0', status: 'active' },
                2: { budgetAllocated: '$10,000', actualSpent: '$10,000', variance: '$0', status: 'active' },
                3: { budgetAllocated: '$8,500', actualSpent: '$8,500', variance: '$0', status: 'completed' },
                4: { budgetAllocated: '$15,000', actualSpent: '$15,000', variance: '$0', status: 'active' },
                5: { budgetAllocated: '$6,000', actualSpent: '$6,000', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$4,500', actualSpent: '$4,500', variance: '$0', status: 'active' },
                7: { budgetAllocated: '$18,000', actualSpent: '$18,000', variance: '$0', status: 'active' },
                8: { budgetAllocated: '$3,500', actualSpent: '$3,500', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$7,000', actualSpent: '$7,000', variance: '$0', status: 'active' },
                10: { budgetAllocated: '$11,000', actualSpent: '$11,000', variance: '$0', status: 'active' },
                11: { budgetAllocated: '$8,000', actualSpent: '$8,000', variance: '$0', status: 'active' },
                12: { budgetAllocated: '$5,500', actualSpent: '$5,500', variance: '$0', status: 'completed' }
            }
        },
        {
            id: 8,
            name: 'SECURITY SYSTEMS',
            type: 'SUBCONTRACTOR',
            order: 8,
            icon: '🔒',
            description: 'Security equipment and installation',
            status: 'active',
            lastUpdated: '2025-01-05',
            createdBy: 'Robert Smith',
            usageCount: 8,
            projectBreakdown: {
                1: { budgetAllocated: '$15,000', actualSpent: '$14,200', variance: '-$800', status: 'active' },
                2: { budgetAllocated: '$12,000', actualSpent: '$11,500', variance: '-$500', status: 'active' },
                3: { budgetAllocated: '$0', actualSpent: '$0', variance: '$0', status: 'not_applicable' },
                4: { budgetAllocated: '$22,000', actualSpent: '$21,300', variance: '-$700', status: 'active' },
                5: { budgetAllocated: '$8,000', actualSpent: '$8,000', variance: '$0', status: 'completed' },
                6: { budgetAllocated: '$5,000', actualSpent: '$4,800', variance: '-$200', status: 'active' },
                7: { budgetAllocated: '$28,000', actualSpent: '$26,900', variance: '-$1,100', status: 'active' },
                8: { budgetAllocated: '$3,000', actualSpent: '$3,000', variance: '$0', status: 'completed' },
                9: { budgetAllocated: '$9,000', actualSpent: '$8,600', variance: '-$400', status: 'active' },
                10: { budgetAllocated: '$14,000', actualSpent: '$13,500', variance: '-$500', status: 'active' },
                11: { budgetAllocated: '$10,000', actualSpent: '$9,700', variance: '-$300', status: 'active' },
                12: { budgetAllocated: '$6,000', actualSpent: '$5,800', variance: '-$200', status: 'completed' }
            }
        }
    ]);

    const typeOptions = [
        { value: 'all', label: 'ALL TYPES', color: 'bg-gray-600' },
        { value: 'LABOUR', label: 'LABOUR', color: 'bg-yellow-500' },
        { value: 'MATERIAL', label: 'MATERIAL', color: 'bg-green-500' },
        { value: 'SUBCONTRACTOR', label: 'SUBCONTRACTOR', color: 'bg-blue-500' },
        { value: 'OVERHEAD', label: 'OVERHEAD', color: 'bg-orange-500' }
    ];

    const sortOptions = [
        { value: 'order', label: 'Display Order' },
        { value: 'name', label: 'Category Name' },
        { value: 'type', label: 'Category Type' },
        { value: 'usage', label: 'Usage Count' },
        { value: 'budget', label: 'Budget Amount' },
        { value: 'updated', label: 'Last Updated' }
    ];

    // Get project-specific data for a category
    const getProjectData = (category, projectId) => {
        if (projectId === 'all') {
            // Calculate totals across all projects
            const projectIds = Object.keys(category.projectBreakdown);
            const totals = projectIds.reduce((acc, pid) => {
                const data = category.projectBreakdown[pid];
                if (data.status !== 'not_applicable') {
                    acc.budgetAllocated += parseFloat(data.budgetAllocated.replace(/[$,]/g, ''));
                    acc.actualSpent += parseFloat(data.actualSpent.replace(/[$,]/g, ''));
                }
                return acc;
            }, { budgetAllocated: 0, actualSpent: 0 });

            const variance = totals.actualSpent - totals.budgetAllocated;
            return {
                budgetAllocated: `$${totals.budgetAllocated.toLocaleString()}`,
                actualSpent: `$${totals.actualSpent.toLocaleString()}`,
                variance: `${variance >= 0 ? '+' : ''}$${Math.abs(variance).toLocaleString()}`,
                status: 'active'
            };
        } else {
            return category.projectBreakdown[projectId] || {
                budgetAllocated: '$0',
                actualSpent: '$0',
                variance: '$0',
                status: 'not_applicable'
            };
        }
    };

    const getFilteredCategories = () => {
        return categories.filter(category => {
            const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                category.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === 'all' || category.type === typeFilter;

            return matchesSearch && matchesType;
        })
            .sort((a, b) => {
                switch (sortBy) {
                    case 'order':
                        return a.order - b.order;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'type':
                        return a.type.localeCompare(b.type);
                    case 'usage':
                        return b.usageCount - a.usageCount;
                    case 'budget':
                        const aData = getProjectData(a, selectedProject);
                        const bData = getProjectData(b, selectedProject);
                        return parseFloat(bData.budgetAllocated.replace(/[$,]/g, '')) - parseFloat(aData.budgetAllocated.replace(/[$,]/g, ''));
                    case 'updated':
                        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
                    default:
                        return 0;
                }
            });
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'bg-yellow-500';
            case 'MATERIAL': return 'bg-green-500';
            case 'SUBCONTRACTOR': return 'bg-blue-500';
            case 'OVERHEAD': return 'bg-orange-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-600';
            case 'inactive': return 'bg-gray-600';
            case 'completed': return 'bg-blue-600';
            case 'not_applicable': return 'bg-gray-400';
            default: return 'bg-gray-600';
        }
    };

    const getVarianceColor = (variance) => {
        if (variance.startsWith('+')) return 'text-red-600';
        if (variance.startsWith('-')) return 'text-green-600';
        return 'text-gray-600';
    };

    const navigate = useNavigate();

    const handleViewCategory = (categoryId) => {
        console.log('Navigating to view category:', categoryId, 'with project:', selectedProject);
        const params = selectedProject !== 'all' ? `?projectId=${selectedProject}` : '';
        navigate(`/cost-category/view/${categoryId}${params}`);
    };

    const handleEditCategory = (categoryId) => {
        const params = selectedProject !== 'all' ? `?projectId=${selectedProject}` : '';
        navigate(`/cost-category/edit/${categoryId}${params}`);
    };

    const handleDeleteCategory = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        setDeleteModal({ isOpen: true, category });
    };

    const handleConfirmDelete = async () => {
        if (!deleteModal.category) return;

        setIsDeleting(true);

        // Simulate API call
        setTimeout(() => {
            // Remove category from state
            setCategories(prev => prev.filter(cat => cat.id !== deleteModal.category.id));

            // Close modal and reset state
            setDeleteModal({ isOpen: false, category: null });
            setIsDeleting(false);

            console.log('Category deleted:', deleteModal.category.id);
        }, 1500);
    };

    const handleCancelDelete = () => {
        setDeleteModal({ isOpen: false, category: null });
    };

    const handleCreateNew = () => {
        const params = selectedProject !== 'all' ? `?projectId=${selectedProject}` : '';
        navigate(`/cost-category/create${params}`);
    };

    // Set initial project if provided via props
    useEffect(() => {
        if (projectId && projectId !== selectedProject) {
            setSelectedProject(projectId);
        }
    }, [projectId]);

    const filteredCategories = getFilteredCategories();
    const currentProject = projects.find(p => p.id == selectedProject);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Page Header - Responsive */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-grid-3x3-gap text-blue-600 text-lg"></i>
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                COST CATEGORY MANAGEMENT
                                {currentProject && currentProject.id !== 'all' && (
                                    <span className="block sm:inline text-sm sm:text-lg text-blue-600 sm:ml-2">
                                        - {currentProject.name}
                                    </span>
                                )}
                            </h1>
                        </div>
                        <button 
                            onClick={() => navigate('/cost-category')}
                            className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-plus-circle mr-2"></i>
                            CREATE NEW CATEGORY
                        </button>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                        {selectedProject === 'all'
                            ? 'Manage construction cost categories and budget allocations across all projects'
                            : `Manage cost categories and budget breakdown for ${currentProject?.name}`
                        }
                    </p>
                </div>

                {/* Project Selection & Filters - Responsive */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">PROJECT SELECTION & FILTERS</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Project Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SELECT PROJECT
                            </label>
                            <select
                                value={selectedProject}
                                onChange={(e) => setSelectedProject(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                disabled={projectId} // Disable if projectId is provided via props
                            >
                                {projects.map((project) => (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SEARCH CATEGORIES
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name, description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            />
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                FILTER BY TYPE
                            </label>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            >
                                {typeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                SORT BY
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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

                {/* Project Summary - Responsive Grid */}
                {selectedProject !== 'all' && (
                    <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <i className="bi bi-bar-chart text-blue-600 text-lg"></i>
                            <h2 className="text-lg font-semibold text-gray-900">PROJECT COST SUMMARY</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {(() => {
                                const projectTotals = filteredCategories.reduce((acc, category) => {
                                    const data = getProjectData(category, selectedProject);
                                    if (data.status !== 'not_applicable') {
                                        acc.budgetAllocated += parseFloat(data.budgetAllocated.replace(/[$,]/g, ''));
                                        acc.actualSpent += parseFloat(data.actualSpent.replace(/[$,]/g, ''));
                                    }
                                    return acc;
                                }, { budgetAllocated: 0, actualSpent: 0 });

                                const variance = projectTotals.actualSpent - projectTotals.budgetAllocated;
                                const variancePercentage = projectTotals.budgetAllocated > 0
                                    ? ((variance / projectTotals.budgetAllocated) * 100).toFixed(1)
                                    : 0;

                                return (
                                    <>
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="text-xl sm:text-2xl font-bold text-blue-600">
                                                ${projectTotals.budgetAllocated.toLocaleString()}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Total Budget</div>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="text-xl sm:text-2xl font-bold text-green-600">
                                                ${projectTotals.actualSpent.toLocaleString()}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Actual Spent</div>
                                        </div>
                                        <div className={`rounded-lg p-4 ${variance >= 0 ? 'bg-red-50' : 'bg-green-50'}`}>
                                            <div className={`text-xl sm:text-2xl font-bold ${variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                {variance >= 0 ? '+' : ''}${Math.abs(variance).toLocaleString()}
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Variance</div>
                                        </div>
                                        <div className={`rounded-lg p-4 ${Math.abs(variancePercentage) > 10 ? 'bg-yellow-50' : 'bg-gray-50'}`}>
                                            <div className={`text-xl sm:text-2xl font-bold ${Math.abs(variancePercentage) > 10 ? 'text-yellow-600' : 'text-gray-600'}`}>
                                                {variancePercentage >= 0 ? '+' : ''}{variancePercentage}%
                                            </div>
                                            <div className="text-xs sm:text-sm text-gray-600">Variance %</div>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {/* Categories Grid - Responsive */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {filteredCategories.map((category) => {
                        const projectData = getProjectData(category, selectedProject);

                        return (
                            <div key={category.id} className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 hover:shadow-lg transition-shadow">

                                {/* Category Header - Responsive */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center text-lg sm:text-xl">
                                            {category.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{category.name}</h3>
                                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                                                <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getTypeColor(category.type)}`}>
                                                    {category.type}
                                                </span>
                                                <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(projectData.status)}`}>
                                                    {projectData.status.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500">#{category.order}</div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-xs sm:text-sm mb-4">{category.description}</p>

                                {/* Project-specific Budget Information - Responsive */}
                                <div className="space-y-2 sm:space-y-3 mb-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-gray-600">Budget Allocated:</span>
                                        <span className="font-semibold text-blue-600 text-xs sm:text-sm">{projectData.budgetAllocated}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-gray-600">Actual Spent:</span>
                                        <span className="font-semibold text-gray-900 text-xs sm:text-sm">{projectData.actualSpent}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs sm:text-sm text-gray-600">Variance:</span>
                                        <span className={`font-semibold text-xs sm:text-sm ${getVarianceColor(projectData.variance)}`}>
                                            {projectData.variance}
                                        </span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                {projectData.status !== 'not_applicable' && (
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Budget Utilization</span>
                                            <span>
                                                {(() => {
                                                    const budget = parseFloat(projectData.budgetAllocated.replace(/[$,]/g, ''));
                                                    const spent = parseFloat(projectData.actualSpent.replace(/[$,]/g, ''));
                                                    const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
                                                    return `${percentage.toFixed(1)}%`;
                                                })()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${
                                                    (() => {
                                                        const budget = parseFloat(projectData.budgetAllocated.replace(/[$,]/g, ''));
                                                        const spent = parseFloat(projectData.actualSpent.replace(/[$,]/g, ''));
                                                        const percentage = budget > 0 ? (spent / budget) * 100 : 0;
                                                        if (percentage > 100) return 'bg-red-500';
                                                        if (percentage > 90) return 'bg-yellow-500';
                                                        return 'bg-green-500';
                                                    })()
                                                }`}
                                                style={{
                                                    width: `${(() => {
                                                        const budget = parseFloat(projectData.budgetAllocated.replace(/[$,]/g, ''));
                                                        const spent = parseFloat(projectData.actualSpent.replace(/[$,]/g, ''));
                                                        const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
                                                        return percentage;
                                                    })()}%`
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                )}

                                {/* Meta Information */}
                                <div className="text-xs text-gray-500 space-y-1 mb-4">
                                    <div>Created by: {category.createdBy}</div>
                                    <div>Last updated: {category.lastUpdated}</div>
                                    <div>Usage count: {category.usageCount} projects</div>
                                </div>

                                {/* Action Buttons - Responsive */}
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                        onClick={() => handleViewCategory(category.id)}
                                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        <i className="bi bi-eye mr-1"></i>
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleEditCategory(category.id)}
                                        className="flex-1 px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        <i className="bi bi-pencil mr-1"></i>
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDeleteCategory(category.id)}
                                        className="sm:w-auto px-3 py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* No Results Message - Responsive */}
                {filteredCategories.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-search text-gray-400 text-3xl sm:text-4xl mb-4"></i>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
                        <p className="text-gray-600 mb-4 text-sm sm:text-base">
                            {selectedProject !== 'all'
                                ? `No cost categories found for ${currentProject?.name} with the current filters.`
                                : 'No cost categories match your current search and filter criteria.'
                            }
                        </p>
                        <button
                            onClick={handleCreateNew}
                            className="px-4 sm:px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                        >
                            <i className="bi bi-plus-circle mr-2"></i>
                            Create New Category
                        </button>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                <DeleteConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                    title="Delete Cost Category"
                    message={`Are you sure you want to delete the cost category "${deleteModal.category?.name}"? This action cannot be undone and will affect all associated projects.`}
                    isLoading={isDeleting}
                />
            </div>
        </div>
    );
};

export default CostCategoryListing;

