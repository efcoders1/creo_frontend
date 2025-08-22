import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import {Card} from "flowbite-react";
import { Button, Badge } from 'flowbite-react';
const CostCategoryView = () => {
    const { categoryId } = useParams();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    // Extract categoryId from multiple sources to ensure we get it
    const getCategoryId = () => {
        // Try from useParams first
        if (categoryId) return categoryId;

        // Try from URL pathname
        const pathParts = location.pathname.split('/');
        const viewIndex = pathParts.indexOf('view');
        if (viewIndex !== -1 && pathParts[viewIndex + 1]) {
            return pathParts[viewIndex + 1];
        }

        // Try from search params as fallback
        return searchParams.get('categoryId');
    };

    const actualCategoryId = getCategoryId();
    const projectId = searchParams.get('projectId');

    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
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
    const categoriesData = [
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

    const getTypeColor = (type) => {
        switch (type) {
            case 'LABOUR': return 'warning';
            case 'MATERIAL': return 'success';
            case 'SUBCONTRACTOR': return 'primary';
            case 'OVERHEAD': return 'failure';
            default: return 'gray';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'inactive': return 'warning';
            case 'completed': return 'primary';
            case 'not_applicable': return 'failure';
            default: return 'gray';
        }
    };

    const getVarianceColor = (variance) => {
        if (variance.startsWith('+')) return 'text-red-600';
        if (variance.startsWith('-')) return 'text-green-600';
        return 'text-gray-600';
    };

    // Load category data
    useEffect(() => {
        console.log('=== DEBUGGING CATEGORY LOADING ===');
        console.log('URL pathname:', location.pathname);
        console.log('useParams categoryId:', categoryId);
        console.log('Extracted categoryId:', actualCategoryId);
        console.log('Type of categoryId:', typeof actualCategoryId);
        console.log('Available categories:', categoriesData.map(cat => ({ id: cat.id, name: cat.name })));

        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            if (!actualCategoryId) {
                console.log('No categoryId found, setting category to null');
                setCategory(null);
                setLoading(false);
                return;
            }

            // Try multiple comparison methods to be absolutely sure
            const foundCategory = categoriesData.find(cat => {
                const catId = cat.id;
                const searchId = actualCategoryId;

                // Try direct comparison
                if (catId === searchId) return true;

                // Try string comparison
                if (catId.toString() === searchId.toString()) return true;

                // Try number comparison
                if (parseInt(catId) === parseInt(searchId)) return true;

                return false;
            });

            console.log('Search result:', foundCategory);
            setCategory(foundCategory);
            setLoading(false);
        }, 500);
    }, [actualCategoryId, location.pathname]);

    const handleEdit = () => {
        const params = selectedProject !== 'all' ? `?projectId=${selectedProject}` : '';
        navigate(`/cost-category/edit/${actualCategoryId}${params}`);
    };

    const handleBack = () => {
        const params = selectedProject !== 'all' ? `?projectId=${selectedProject}` : '';
        navigate(`/cost-category${params}`);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading category details...</p>
                </div>
            </div>
        );
    }

    if (!category) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="text-center max-w-md">
                    <i className="bi bi-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Category Not Found</h2>
                    <p className="text-gray-600 mb-4">
                        The requested cost category could not be found.
                    </p>
                    <div className="text-sm text-gray-500 mb-4 bg-gray-100 p-4 rounded-lg text-left">
                        <p className="font-semibold mb-2">Debug info:</p>
                        <p className="break-all">URL: {location.pathname}</p>
                        <p>useParams categoryId: {categoryId || 'undefined'} (type: {typeof categoryId})</p>
                        <p>Extracted categoryId: {actualCategoryId || 'undefined'} (type: {typeof actualCategoryId})</p>
                        <p>Available category IDs: {categoriesData.map(cat => cat.id).join(', ')}</p>
                        <p>Search params: {searchParams.toString()}</p>
                    </div>
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Categories
                    </button>
                </div>
            </div>
        );
    }

    const currentProject = projects.find(p => p.id == selectedProject);
    const projectData = getProjectData(category, selectedProject);

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Header - Responsive */}
              <Card>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <i className="bi bi-arrow-left text-lg sm:text-xl"></i>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-lg flex items-center justify-center text-xl sm:text-2xl">
                                    {category.icon}
                                </div>
                                <div>
                                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{category.name}</h1>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-full ${getTypeColor(category.type)}`}>
                                            {category.type}
                                        </span>
                                        <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-full ${getStatusColor(category.status)}`}>
                                            {category.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button
                            color="primary"
                            size="md"
                            className="flex items-center gap-2"
                            onClick={handleEdit}
                        >
                            <i className="bi bi-pencil mr-2"></i>
                            Edit Category
                        </Button>

                    </div>
                    <p className="text-gray-600 text-sm sm:text-base lg:text-lg">{category.description}</p>
                </Card>

                {/* Project Selection - Responsive */}
                <Card>
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-building text-blue-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PROJECT VIEW</h2>
                    </div>
                    <div className="w-full sm:max-w-md">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            SELECT PROJECT
                        </label>
                        <select
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        >
                            {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </Card>

                {/* Budget Overview - Responsive Grid */}
                <Card>
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                        <i className="bi bi-bar-chart text-green-600 text-lg"></i>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            BUDGET OVERVIEW
                            {currentProject && currentProject.id !== 'all' && (
                                <span className="block sm:inline text-sm sm:text-lg text-blue-600 sm:ml-2">
                                    - {currentProject.name}
                                </span>
                            )}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-2">{projectData.budgetAllocated}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Budget Allocated</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 sm:p-6">
                            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600 mb-2">{projectData.actualSpent}</div>
                            <div className="text-xs sm:text-sm text-gray-600">Actual Spent</div>
                        </div>
                        <div className={`rounded-lg p-4 sm:p-6 ${projectData.variance.startsWith('+') ? 'bg-red-50' : 'bg-green-50'}`}>
                            <div className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${getVarianceColor(projectData.variance)}`}>
                                {projectData.variance}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Variance</div>
                        </div>
                        <div className={`rounded-lg p-4 sm:p-6 ${getStatusColor(projectData.status) === 'bg-green-600' ? 'bg-green-50' : 'bg-gray-50'}`}>
                            <div className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-2 ${projectData.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                                {(() => {
                                    const budget = parseFloat(projectData.budgetAllocated.replace(/[$,]/g, ''));
                                    const spent = parseFloat(projectData.actualSpent.replace(/[$,]/g, ''));
                                    const percentage = budget > 0 ? ((spent / budget) * 100).toFixed(1) : 0;
                                    return `${percentage}%`;
                                })()}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600">Budget Used</div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    {projectData.status !== 'not_applicable' && (
                        <div className="mb-4">
                            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                                <span>Budget Utilization Progress</span>
                                <span>
                                    {(() => {
                                        const budget = parseFloat(projectData.budgetAllocated.replace(/[$,]/g, ''));
                                        const spent = parseFloat(projectData.actualSpent.replace(/[$,]/g, ''));
                                        const percentage = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
                                        return `${percentage.toFixed(1)}%`;
                                    })()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
                                <div
                                    className={`h-3 sm:h-4 rounded-full ${
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
                </Card>

                {/* All Projects Breakdown - Responsive Table */}
                {selectedProject === 'all' && (
                    <Card>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <i className="bi bi-table text-purple-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">PROJECT BREAKDOWN</h2>
                        </div>

                        {/* Mobile: Card Layout */}
                        <div className="block sm:hidden space-y-4">
                            {projects.filter(p => p.id !== 'all').map((project) => {
                                const data = getProjectData(category, project.id);
                                if (data.status === 'not_applicable') return null;

                                const budget = parseFloat(data.budgetAllocated.replace(/[$,]/g, ''));
                                const spent = parseFloat(data.actualSpent.replace(/[$,]/g, ''));
                                const utilization = budget > 0 ? ((spent / budget) * 100).toFixed(1) : 0;

                                return (
                                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 mb-3">{project.name}</h3>
                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                            <div>
                                                <span className="text-gray-600">Budget:</span>
                                                <div className="font-medium">{data.budgetAllocated}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Spent:</span>
                                                <div className="font-medium">{data.actualSpent}</div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Variance:</span>
                                                <div className={`font-medium ${getVarianceColor(data.variance)}`}>
                                                    {data.variance}
                                                </div>
                                            </div>
                                            <div>
                                                <span className="text-gray-600">Utilization:</span>
                                                <div className={`font-medium ${
                                                    utilization > 100 ? 'text-red-600' :
                                                        utilization > 90 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                    {utilization}%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <span className={`px-2 py-1 text-xs font-medium text-white rounded-full ${getStatusColor(data.status)}`}>
                                                {data.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Desktop: Table Layout */}
                        <div className="hidden sm:block overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 text-gray-600 font-medium">Project Name</th>
                                    <th className="text-right py-3 text-gray-600 font-medium">Budget Allocated</th>
                                    <th className="text-right py-3 text-gray-600 font-medium">Actual Spent</th>
                                    <th className="text-right py-3 text-gray-600 font-medium">Variance</th>
                                    <th className="text-center py-3 text-gray-600 font-medium">Status</th>
                                    <th className="text-right py-3 text-gray-600 font-medium">Utilization</th>
                                </tr>
                                </thead>
                                <tbody className="text-gray-900">
                                {projects.filter(p => p.id !== 'all').map((project) => {
                                    const data = getProjectData(category, project.id);
                                    if (data.status === 'not_applicable') return null;

                                    const budget = parseFloat(data.budgetAllocated.replace(/[$,]/g, ''));
                                    const spent = parseFloat(data.actualSpent.replace(/[$,]/g, ''));
                                    const utilization = budget > 0 ? ((spent / budget) * 100).toFixed(1) : 0;

                                    return (
                                        <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-3 font-medium">{project.name}</td>
                                            <td className="text-right py-3">{data.budgetAllocated}</td>
                                            <td className="text-right py-3">{data.actualSpent}</td>
                                            <td className={`text-right py-3 font-medium ${getVarianceColor(data.variance)}`}>
                                                {data.variance}
                                            </td>
                                            <td className="text-center py-3">
                                                <Badge
                                                    color={getStatusColor(data.status)}
                                                    size="sm"
                                                    className="inline-flex px-2 sm:px-3 py-1 rounded-full font-medium w-auto"
                                                >
                                                    {data.status.replace('_', ' ').toUpperCase()}
                                                </Badge>


                                            </td>
                                            <td className="text-right py-3">
                                                <span className={`font-medium ${
                                                    utilization > 100 ? 'text-red-600' :
                                                        utilization > 90 ? 'text-yellow-600' : 'text-green-600'
                                                }`}>
                                                    {utilization}%
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                )}

                {/* Category Details - Responsive Grid */}

                <Card>
                        <div className="flex items-center gap-3 mb-4 sm:mb-6">
                            <i className="bi bi-info-circle text-gray-600 text-lg"></i>
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">CATEGORY DETAILS</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                                    <div className="text-base sm:text-lg font-semibold text-gray-900">{category.name}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Type</label>
                                    <Badge
                                        color={getTypeColor(category.type)}
                                        size="sm"
                                        className="inline-flex w-auto px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full font-medium"
                                    >
                                        {category.type}
                                    </Badge>

                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                    <div className="text-base sm:text-lg font-semibold text-gray-900">#{category.order}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <span className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-full ${getStatusColor(category.status)}`}>
                                        {category.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <div className="text-gray-900 text-sm sm:text-base">{category.description}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                                    <div className="text-gray-900 text-sm sm:text-base">{category.createdBy}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Updated</label>
                                    <div className="text-gray-900 text-sm sm:text-base">{category.lastUpdated}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Usage Count</label>
                                    <div className="text-gray-900 text-sm sm:text-base">{category.usageCount} projects</div>
                                </div>
                            </div>
                        </div>
               </Card>

            </div>
        </div>
    );
};

export default CostCategoryView;

