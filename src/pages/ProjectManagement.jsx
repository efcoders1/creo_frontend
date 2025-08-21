import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectManagement = () => {
    const [formData, setFormData] = useState({
        projectName: '',
        jobCode: '25-07-9712',
        startDate: '',
        endDate: '',
        projectManager: '',
        status: 'draft'
    });

    const [stakeholders, setStakeholders] = useState([
        {
            id: 1,
            name: 'Jane Doe',
            role: 'Architect',
            avatar: 'JD',
            color: 'bg-blue-500'
        },
        {
            id: 2,
            name: 'Tom Anderson',
            role: 'Site Supervisor',
            avatar: 'TA',
            color: 'bg-orange-500'
        }
    ]);

    // Categories based on Excel file requirements
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

    // Initial category items for new projects
    const [categoryItems, setCategoryItems] = useState([
        {
            id: 1,
            category: 'Floor Costs',
            description: 'Flooring material, floor coverings, etc.',
            supplierQuotes: 0,
            supplierCost: 0,
            marginCalculated: 0,
            actuals: 0
        }
    ]);

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [newCategoryItem, setNewCategoryItem] = useState({
        category: '',
        description: '',
        supplierQuotes: 0,
        supplierCost: 0,
        marginCalculated: 0,
        actuals: 0
    });

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

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddStakeholder = () => {
        const newStakeholder = {
            id: stakeholders.length + 1,
            name: 'New Stakeholder',
            role: 'Role',
            avatar: 'NS',
            color: 'bg-purple-500'
        };
        setStakeholders([...stakeholders, newStakeholder]);
    };

    const handleRemoveStakeholder = (id) => {
        setStakeholders(stakeholders.filter(stakeholder => stakeholder.id !== id));
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
        console.log('Cancelling project creation...');
        // Reset form or navigate away
    };

    const handleSaveDraft = () => {
        console.log('Saving draft...', formData, stakeholders, categoryItems);
        // Save as draft
    };

    const handleCreateProject = () => {
        console.log('Creating project...', formData, stakeholders, categoryItems);
        // Create project
    };

    const generateJobCode = () => {
        const year = new Date().getFullYear().toString().slice(-2);
        const month = String(new Date().getMonth() + 1).padStart(2, '0');
        const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
        return `${year}-${month}-${random}`;
    };

    const navigate = useNavigate();

    return (
        <div>
            {/* Project Information */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate('/project-listing')} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                        <i className="bi bi-arrow-left text-lg"></i>
                    </button>
                    <i className="bi bi-clipboard-data text-blue-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">PROJECT INFORMATION</h2>
                </div>

                <div className="space-y-6">
                    {/* Project Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            PROJECT NAME / TITLE *
                        </label>
                        <input
                            type="text"
                            placeholder="Enter project name or title"
                            value={formData.projectName}
                            onChange={(e) => handleInputChange('projectName', e.target.value)}
                            className="w-full px-4 text-gray-600 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        />
                        <p className="text-sm text-gray-500 mt-1">DESCRIPTIVE NAME FOR THE CONSTRUCTION PROJECT</p>
                    </div>

                    {/* Auto-Generated Job Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            AUTO-GENERATED JOB CODE
                        </label>
                        <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-2">{formData.jobCode}</div>
                            <p className="text-sm text-gray-500">CANNOT MODIFY (UNIQUE IDENTIFIER)</p>
                        </div>
                    </div>

                    {/* Project Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PROJECT START DATE
                            </label>
                            <input
                                type="date"
                                value={formData.startDate}
                                onChange={(e) => handleInputChange('startDate', e.target.value)}
                                className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                PROJECT END DATE
                            </label>
                            <input
                                type="date"
                                value={formData.endDate}
                                onChange={(e) => handleInputChange('endDate', e.target.value)}
                                className="w-full px-4 py-3 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                            />
                        </div>
                    </div>

                    {/* Auto-Generated Code Info */}
                    <div className="border-2 border-dashed border-blue-400 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                            <i className="bi bi-info-circle mr-2"></i>
                            AUTO-GENERATED CODES ENSURE UNIQUE PROJECT TRACKING
                        </p>
                    </div>
                </div>
            </div>

            {/* Project Manager Assignment */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-person-badge text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">PROJECT MANAGER ASSIGNMENT</h2>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ASSIGN PROJECT MANAGER *
                    </label>
                    <select
                        value={formData.projectManager}
                        onChange={(e) => handleInputChange('projectManager', e.target.value)}
                        className="w-full px-4 py-3 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    >
                        {projectManagers.map((manager, index) => (
                            <option key={index} value={manager === 'Select Project Manager' ? '' : manager}>
                                {manager}
                            </option>
                        ))}
                    </select>
                    <p className="text-sm text-gray-500 mt-1">PRIMARY PERSON RESPONSIBLE FOR PROJECT EXECUTION</p>
                </div>
            </div>

            {/* Stakeholder Assignment */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-people text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">STAKEHOLDER ASSIGNMENT</h2>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                        ASSIGN TEAM MEMBERS & STAKEHOLDERS
                    </label>

                    <div className="space-y-3 mb-4">
                        {stakeholders.map((stakeholder) => (
                            <div key={stakeholder.id} className="flex items-center justify-between p-3 border border-gray-300 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 ${stakeholder.color} rounded flex items-center justify-center text-white font-medium`}>
                                        {stakeholder.avatar}
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{stakeholder.name}</h3>
                                        <p className="text-sm text-gray-600">{stakeholder.role}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveStakeholder(stakeholder.id)}
                                    className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                                >
                                    <i className="bi bi-x text-sm"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center">
                        <button
                            onClick={handleAddStakeholder}
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <i className="bi bi-plus-circle text-2xl mb-2"></i>
                            <p className="text-sm font-medium">ADD STAKEHOLDER</p>
                        </button>
                    </div>
                </div>
            </div>

            {/* Category Items Management */}
            <div className="bg-white rounded-lg border border-gray-300 p-6 mb-4">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <i className="bi bi-list-ul text-gray-600 text-lg"></i>
                        <h2 className="text-lg font-semibold text-gray-900">CATEGORY ITEMS SETUP</h2>
                    </div>
                    <button
                        onClick={() => setShowAddCategoryModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <i className="bi bi-plus-circle mr-2"></i>Add Category Item
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Quotes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Cost</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin Calculated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actuals</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categoryItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.category}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.supplierQuotes}
                                            onChange={(e) => updateCategoryItem(item.id, 'supplierQuotes', e.target.value)}
                                            className="w-24 px-2 py-1 text-gray-600 border border-gray-300 rounded text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.supplierCost}
                                            onChange={(e) => updateCategoryItem(item.id, 'supplierCost', e.target.value)}
                                            className="w-24 px-2 py-1 text-gray-600 border border-gray-300 rounded text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.marginCalculated}
                                            onChange={(e) => updateCategoryItem(item.id, 'marginCalculated', e.target.value)}
                                            className="w-24 px-2 py-1 border text-gray-600 border-gray-300 rounded text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.actuals}
                                            onChange={(e) => updateCategoryItem(item.id, 'actuals', e.target.value)}
                                            className="w-24 px-2 py-1 border text-gray-600 border-gray-300 rounded text-sm"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => deleteCategoryItem(item.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {categoryItems.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        <i className="bi bi-list-ul text-4xl mb-2"></i>
                        <p>No category items added yet. Click "Add Category Item" to get started.</p>
                    </div>
                )}
            </div>

            {/* Project Status */}
            <div className="border-2 border-dashed border-gray-400 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-6">
                    <i className="bi bi-flag text-blue-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-900">PROJECT STATUS</h2>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                        SET CURRENT PROJECT STATUS
                    </label>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        {statusOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleInputChange('status', option.value)}
                                className={`p-4 rounded-lg border-2 transition-colors ${
                                    formData.status === option.value
                                        ? `${option.color} text-white border-transparent`
                                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <i className={`bi ${
                                        option.value === 'draft' ? 'bi-file-earmark' :
                                            option.value === 'active' ? 'bi-play-circle' :
                                                'bi-check-circle'
                                    }`}></i>
                                    <span className="font-medium">{option.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="border-2 border-dashed border-blue-400 rounded-lg p-4">
                        <p className="text-sm text-blue-700">
                            <i className="bi bi-info-circle mr-2"></i>
                            STATUS: DRAFT - PROJECT BEING SET UP
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
                <button onClick={handleCancel} className="px-6 py-4 border border-gray-400 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors text-lg">
                    CANCEL
                </button>
                <button onClick={handleSaveDraft} className="px-6 py-4 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 transition-colors text-lg">
                    SAVE DRAFT
                </button>
                <button onClick={() => navigate('/project-listing')} className="px-6 py-4 bg-gray-900 text-white font-medium rounded hover:bg-black transition-colors text-lg">
                    CREATE PROJECT
                </button>
            </div>

            {/* Add Category Item Modal */}
            {showAddCategoryModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Category Item</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={newCategoryItem.category}
                                    onChange={(e) => setNewCategoryItem(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={newCategoryItem.description}
                                    onChange={(e) => setNewCategoryItem(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows="3"
                                    placeholder="Enter description..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Quotes</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.supplierQuotes}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, supplierQuotes: e.target.value }))}
                                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Cost</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.supplierCost}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, supplierCost: e.target.value }))}
                                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Margin Calculated</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.marginCalculated}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, marginCalculated: e.target.value }))}
                                        className="w-full px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Actuals</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.actuals}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, actuals: e.target.value }))}
                                        className="w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setShowAddCategoryModal(false)}
                                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addCategoryItem}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default ProjectManagement;

