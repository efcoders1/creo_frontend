import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProjectEdit = () => {
    const navigate = useNavigate();
    const { projectId } = useParams();

    // Mock project data - in real app, this would come from API
    const mockProjects = {
        1: {
            id: 1,
            projectName: 'Downtown Office Complex',
            jobCode: '25-01-1234',
            startDate: '2025-02-01',
            endDate: '2025-12-31',
            projectManager: 'Sarah Johnson',
            status: 'active',
            stakeholders: [
                { id: 1, name: 'Jane Doe', role: 'Architect', avatar: 'JD', color: 'bg-blue-500' },
                { id: 2, name: 'Tom Anderson', role: 'Site Supervisor', avatar: 'TA', color: 'bg-orange-500' }
            ],
            categoryItems: [
                { id: 1, category: 'Floor Costs', description: 'Initial flooring setup', supplierQuotes: 10000, supplierCost: 9500, marginCalculated: 500, actuals: 9800 },
                { id: 2, category: 'Electrical Stand Power & Leads', description: 'Power for main stage', supplierQuotes: 5000, supplierCost: 4800, marginCalculated: 200, actuals: 4900 }
            ]
        },
        2: {
            id: 2,
            projectName: 'Residential Tower Phase 2',
            jobCode: '25-01-5678',
            startDate: '2025-03-15',
            endDate: '2026-06-30',
            projectManager: 'Michael Chen',
            status: 'draft',
            stakeholders: [
                { id: 1, name: 'Emma Wilson', role: 'Engineer', avatar: 'EW', color: 'bg-green-500' },
                { id: 2, name: 'David Smith', role: 'Contractor', avatar: 'DS', color: 'bg-purple-500' }
            ],
            categoryItems: [
                { id: 3, category: 'Build Items', description: 'Tower structure materials', supplierQuotes: 150000, supplierCost: 145000, marginCalculated: 5000, actuals: 148000 }
            ]
        }
    };

    const [formData, setFormData] = useState({
        projectName: '',
        jobCode: '',
        startDate: '',
        endDate: '',
        projectManager: '',
        status: 'draft'
    });

    const [stakeholders, setStakeholders] = useState([]);
    const [categoryItems, setCategoryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const projectManagers = [
        'Select Project Manager',
        'Sarah Johnson',
        'Michael Chen',
        'David Wilson',
        'Emma Thompson',
        'Robert Smith'
    ];

    const statusOptions = [
        { value: 'draft', label: 'DRAFT', color: 'bg-gray-600' },
        { value: 'active', label: 'ACTIVE', color: 'bg-blue-600' },
        { value: 'closed', label: 'CLOSED', color: 'bg-green-600' }
    ];

    const stakeholderColors = [
        'bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-purple-500',
        'bg-red-500', 'bg-indigo-500', 'bg-yellow-500', 'bg-pink-500'
    ];

    const categories = [
        'Floor Costs',
        'Build Items',
        'Refurb Cost',
        'Graphics Design and print graphics',
        'Plumbing',
        'Electrical Stand Power & Leads',
        'Audio Visual (AV)',
        'Rigging Banner',
        'Rigging',
        'Lighting',
        'Furniture',
        'Event Décor',
        'Greenery',
        'Catering',
        'Wi-Fi',
        'Miscellaneous',
        'Install Bump Out'
    ];

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [newCategoryItem, setNewCategoryItem] = useState({
        category: '',
        description: '',
        supplierQuotes: 0,
        supplierCost: 0,
        marginCalculated: 0,
        actuals: 0
    });

    // Load project data on component mount
    useEffect(() => {
        const loadProject = () => {
            // Simulate API call
            setTimeout(() => {
                const project = mockProjects[parseInt(projectId)];
                if (project) {
                    setFormData({
                        projectName: project.projectName,
                        jobCode: project.jobCode,
                        startDate: project.startDate,
                        endDate: project.endDate,
                        projectManager: project.projectManager,
                        status: project.status
                    });
                    setStakeholders(project.stakeholders);
                    setCategoryItems(project.categoryItems || []);
                }
                setLoading(false);
            }, 500);
        };

        if (projectId) {
            loadProject();
        }
    }, [projectId]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddStakeholder = () => {
        const newStakeholder = {
            id: Date.now(),
            name: 'New Stakeholder',
            role: 'Role',
            avatar: 'NS',
            color: stakeholderColors[stakeholders.length % stakeholderColors.length]
        };
        setStakeholders([...stakeholders, newStakeholder]);
    };

    const handleRemoveStakeholder = (id) => {
        setStakeholders(stakeholders.filter(stakeholder => stakeholder.id !== id));
    };

    const handleStakeholderChange = (id, field, value) => {
        setStakeholders(stakeholders.map(stakeholder =>
            stakeholder.id === id
                ? { ...stakeholder, [field]: value, avatar: field === 'name' ? value.split(' ').map(n => n[0]).join('').toUpperCase() : stakeholder.avatar }
                : stakeholder
        ));
    };

    const addCategoryItem = () => {
        if (newCategoryItem.category && newCategoryItem.description) {
            const item = {
                id: categoryItems.length + 1,
                ...newCategoryItem,
                supplierQuotes: parseFloat(newCategoryItem.supplierQuotes) || 0,
                supplierCost: parseFloat(newCategoryItem.supplierCost) || 0,
                marginCalculated: parseFloat(newCategoryItem.marginCalculated) || 0,
                actuals: parseFloat(newCategoryItem.actuals) || 0
            };

            setCategoryItems([...categoryItems, item]);

            setNewCategoryItem({
                category: '',
                description: '',
                supplierQuotes: 0,
                supplierCost: 0,
                marginCalculated: 0,
                actuals: 0
            });
            setShowAddCategoryModal(false);
        }
    };

    const deleteCategoryItem = (itemId) => {
        setCategoryItems(categoryItems.filter(item => item.id !== itemId));
    };

    const updateCategoryItem = (itemId, field, value) => {
        setCategoryItems(categoryItems.map(item =>
            item.id === itemId ? { ...item, [field]: parseFloat(value) || 0 } : item
        ));
    };

    const handleCancel = () => {
        navigate('/project-listing');
    };

    const handleSaveDraft = async () => {
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Saving draft...', { ...formData, status: 'draft' }, stakeholders, categoryItems);
            setSaving(false);
            navigate('/project-listing');
        }, 1000);
    };

    const handleUpdateProject = async () => {
        setSaving(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Updating project...', formData, stakeholders, categoryItems);
            setSaving(false);
            navigate('/project-listing');
        }, 1000);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading project data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
            {/* Page Header */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <button
                            onClick={() => navigate('/project-listing')}
                            className="p-1 sm:p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <i className="bi bi-arrow-left text-base sm:text-lg"></i>
                        </button>
                        <i className="bi bi-pencil-square text-blue-600 text-lg sm:text-xl"></i>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">EDIT PROJECT</h1>
                            <p className="text-xs sm:text-sm text-gray-600">Job Code: {formData.jobCode}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <span className="text-xs sm:text-sm text-gray-500">Last modified: Just now</span>
                    </div>
                </div>
            </div>

            {/* Project Information */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <i className="bi bi-clipboard-data text-blue-600 text-base sm:text-lg"></i>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">PROJECT INFORMATION</h2>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {/* Project Name */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            PROJECT NAME / TITLE *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project name or title"
                            value={formData.projectName}
                            onChange={(e) => handleInputChange('projectName', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-lg"
                        />
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">DESCRIPTIVE NAME FOR THE CONSTRUCTION PROJECT</p>
                    </div>

                    {/* Job Code (Read-only) */}
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                            JOB CODE (READ-ONLY)
                        </label>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-3 sm:p-4 text-center bg-gray-50">
                            <div className="text-lg sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{formData.jobCode}</div>
                            <p className="text-xs sm:text-sm text-gray-500">CANNOT MODIFY (UNIQUE IDENTIFIER)</p>
                        </div>
                    </div>

                    {/* Project Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                PROJECT START DATE
                            </label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                PROJECT END DATE
                            </label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-lg"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Project Manager Assignment */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <i className="bi bi-person-badge text-gray-600 text-base sm:text-lg"></i>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">PROJECT MANAGER ASSIGNMENT</h2>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        ASSIGN PROJECT MANAGER *
                    </label>
                    <select
                        value={formData.projectManager}
                        onChange={(e) => handleInputChange('projectManager', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-lg"
                    >
                        {projectManagers.map((manager, index) => (
                            <option key={index} value={manager === 'Select Project Manager' ? '' : manager}>
                                {manager}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">PRIMARY PERSON RESPONSIBLE FOR PROJECT EXECUTION</p>
                </div>
            </div>

            {/* Stakeholder Assignment */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <i className="bi bi-people text-gray-600 text-base sm:text-lg"></i>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">STAKEHOLDER ASSIGNMENT</h2>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                        ASSIGN TEAM MEMBERS & STAKEHOLDERS
                    </label>

                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                        {stakeholders.map((stakeholder) => (
                            <div key={stakeholder.id} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border border-gray-300 rounded-lg">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stakeholder.color} rounded flex items-center justify-center text-white font-medium text-xs sm:text-sm`}>
                                    {stakeholder.avatar}
                                </div>
                                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                    <input
                                        type="text"
                                        placeholder="Stakeholder name"
                                        value={stakeholder.name}
                                        onChange={(e) => handleStakeholderChange(stakeholder.id, 'name', e.target.value)}
                                        className="px-2 sm:px-3 py-1 sm:py-2 border text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Role"
                                        value={stakeholder.role}
                                        onChange={(e) => handleStakeholderChange(stakeholder.id, 'role', e.target.value)}
                                        className="px-2 sm:px-3 py-1 sm:py-2 border text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <button
                                    onClick={() => handleRemoveStakeholder(stakeholder.id)}
                                    className="w-6 h-6 sm:w-8 sm:h-8 bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                                >
                                    <i className="bi bi-x text-xs sm:text-sm"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6 text-center">
                        <button
                            onClick={handleAddStakeholder}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <i className="bi bi-plus-circle text-xl sm:text-2xl mb-1 sm:mb-2"></i>
                            <p className="text-xs sm:text-sm font-medium">ADD STAKEHOLDER</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Items Management */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-3 sm:mb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <i className="bi bi-list-ul text-gray-600 text-base sm:text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">CATEGORY ITEMS SETUP</h2>
                    </div>
                    <button
                        onClick={() => setShowAddCategoryModal(true)}
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm w-full sm:w-auto"
                    >
                        <i className="bi bi-plus-circle mr-1 sm:mr-2"></i><span className="hidden sm:inline">Add Category Item</span><span className="sm:hidden">Add Item</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Quotes</th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Cost</th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin Calculated</th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actuals</th>
                            <th className="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {categoryItems.map((item) => (
                            <tr key={item.id}>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{item.category}</td>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    <input
                                        type="number"
                                        value={item.supplierQuotes}
                                        onChange={(e) => updateCategoryItem(item.id, 'supplierQuotes', e.target.value)}
                                        className="w-16 sm:w-24 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm"
                                    />
                                </td>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    <input
                                        type="number"
                                        value={item.supplierCost}
                                        onChange={(e) => updateCategoryItem(item.id, 'supplierCost', e.target.value)}
                                        className="w-16 sm:w-24 px-1 sm:px-2 py-1 text-gray-600 border border-gray-300 rounded text-xs sm:text-sm"
                                    />
                                </td>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    <input
                                        type="number"
                                        value={item.marginCalculated}
                                        onChange={(e) => updateCategoryItem(item.id, 'marginCalculated', e.target.value)}
                                        className="w-16 sm:w-24 px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                    />
                                </td>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    <input
                                        type="number"
                                        value={item.actuals}
                                        onChange={(e) => updateCategoryItem(item.id, 'actuals', e.target.value)}
                                        className="w-16 sm:w-24 px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                    />
                                </td>
                                <td className="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                    <button
                                        onClick={() => deleteCategoryItem(item.id)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {categoryItems.length === 0 && (
                    <div className="text-center py-6 sm:py-8 text-gray-500">
                        <i className="bi bi-list-ul text-2xl sm:text-4xl mb-1 sm:mb-2"></i>
                        <p className="text-xs sm:text-sm">No category items added yet. Click "Add Category Item" to get started.</p>
                    </div>
                )}
            </div>

            {/* Project Status */}
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <i className="bi bi-flag text-blue-600 text-base sm:text-lg"></i>
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900">PROJECT STATUS</h2>
                </div>

                <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4">
                        SET CURRENT PROJECT STATUS
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleInputChange('status', option.value)}
                                className={`p-3 sm:p-4 rounded-lg border-2 transition-colors ${
                                    formData.status === option.value
                                        ? `${option.color} text-white border-transparent`
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center justify-center gap-1 sm:gap-2">
                                    <i className={`bi ${
                                        option.value === 'draft' ? 'bi-file-earmark' :
                                            option.value === 'active' ? 'bi-play-circle' :
                                                'bi-check-circle'
                                    } text-sm sm:text-base`}></i>
                                    <span className="font-medium text-xs sm:text-sm">{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="border-2 border-dashed border-blue-400 rounded-lg p-3 sm:p-4">
                        <p className="text-xs sm:text-sm text-blue-700">
                            <i className="bi bi-info-circle mr-1 sm:mr-2"></i>
                            STATUS: {formData.status.toUpperCase()} - PROJECT {formData.status === 'draft' ? 'BEING SET UP' : formData.status === 'active' ? 'IN PROGRESS' : 'COMPLETED'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                <button
                    onClick={handleCancel}
                    className="px-4 sm:px-6 py-3 sm:py-4 border border-gray-400 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors text-sm sm:text-lg order-3 sm:order-1"
                >
                    CANCEL
                </button>
                <button
                    onClick={handleSaveDraft}
                    className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 transition-colors text-sm sm:text-lg order-2"
                >
                    SAVE DRAFT
                </button>
                <button
                    onClick={handleUpdateProject}
                    className="px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors text-sm sm:text-lg order-1 sm:order-3"
                >
                    {saving ? 'Updating...' : 'UPDATE PROJECT'}
                </button>
            </div>

            {/* Add Category Item Modal */}
            {showAddCategoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Add Category Item</h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Category</label>
                                <select
                                    value={newCategoryItem.category}
                                    onChange={(e) => setNewCategoryItem(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Description</label>
                                <textarea
                                    value={newCategoryItem.description}
                                    onChange={(e) => setNewCategoryItem(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border border-gray-300 text-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    rows="3"
                                    placeholder="Enter description..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Supplier Quotes</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.supplierQuotes}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, supplierQuotes: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Supplier Cost</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.supplierCost}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, supplierCost: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Margin Calculated</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.marginCalculated}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, marginCalculated: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Actuals</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.actuals}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, actuals: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                            <button
                                onClick={() => setShowAddCategoryModal(false)}
                                className="px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm order-2 sm:order-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addCategoryItem}
                                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm order-1 sm:order-2"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectEdit;

