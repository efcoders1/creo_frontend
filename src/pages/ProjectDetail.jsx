import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetailView = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // New state for view mode (grid or list)
    const [viewMode, setViewMode] = useState('list');

    // Tab configuration
    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'bi-info-circle' },
        { id: 'cost-management', label: 'Cost Management', icon: 'bi-currency-dollar' },
        { id: 'suppliers', label: 'Suppliers', icon: 'bi-building' },
        { id: 'client-invoices', label: 'Client Invoices', icon: 'bi-receipt' },
        { id: 'comments', label: 'Comments', icon: 'bi-chat-dots' },
        { id: 'photos', label: 'Photos', icon: 'bi-camera' }
    ];

    // Mock project data - in real app, this would come from API
    const mockProjects = {
        1: {
            id: 1,
            projectName: 'Office Building Construction',
            jobCode: '25-01-0001',
            startDate: '2025-01-15',
            endDate: '2025-12-30',
            projectManager: 'Sarah Johnson',
            status: 'active',
            budget: '$2,500,000',
            standImage: 'https://picsum.photos/seed/office_detail/150/150',
            standSize: '10x20ft',
            unpaidInvoices: true,
            clientPaid: false,
            stakeholders: [
                { name: 'Jane Doe', role: 'Architect', avatar: 'JD', color: 'bg-blue-500', imageUrl: 'https://picsum.photos/seed/JaneDoe/50/50' },
                { name: 'Tom Anderson', role: 'Site Supervisor', avatar: 'TA', color: 'bg-orange-500', imageUrl: 'https://picsum.photos/seed/TomAnderson/50/50' },
                { name: 'Mike Chen', role: 'Engineer', avatar: 'MC', color: 'bg-green-500', imageUrl: 'https://picsum.photos/seed/MikeChen/50/50' }
            ]
        },
        2: {
            id: 2,
            projectName: 'Warehouse Renovation',
            jobCode: '25-01-0002',
            startDate: '2025-02-01',
            endDate: '2025-08-15',
            projectManager: 'Michael Chen',
            status: 'draft',
            budget: '$850,000',
            standImage: 'https://picsum.photos/seed/warehouse_detail/150/150',
            standSize: '20x30ft',
            unpaidInvoices: false,
            clientPaid: true,
            stakeholders: [
                { name: 'Emma Wilson', role: 'Project Coordinator', avatar: 'EW', color: 'bg-purple-500', imageUrl: 'https://picsum.photos/seed/EmmaWilson/50/50' },
                { name: 'David Smith', role: 'Contractor', avatar: 'DS', color: 'bg-red-500', imageUrl: 'https://picsum.photos/seed/DavidSmith/50/50' }
            ]
        },
        3: {
            id: 3,
            projectName: 'Retail Store Fitout',
            jobCode: '25-01-0003',
            startDate: '2024-11-01',
            endDate: '2025-03-30',
            projectManager: 'Emma Thompson',
            status: 'active',
            budget: '$450,000',
            standImage: 'https://picsum.photos/seed/retail_detail/150/150',
            standSize: '15x15ft',
            unpaidInvoices: true,
            clientPaid: true,
            stakeholders: [
                { name: 'Lisa Wong', role: 'Interior Designer', avatar: 'LW', color: 'bg-pink-500', imageUrl: 'https://picsum.photos/seed/LisaWong/50/50' },
                { name: 'Robert Brown', role: 'Electrician', avatar: 'RB', color: 'bg-yellow-500', imageUrl: 'https://picsum.photos/seed/RobertBrown/50/50' },
                { name: 'Anna Davis', role: 'Project Assistant', avatar: 'AD', color: 'bg-indigo-500', imageUrl: 'https://picsum.photos/seed/AnnaDavis/50/50' }
            ]
        },
        4: {
            id: 4,
            projectName: 'Hospital Wing Extension',
            jobCode: '25-01-0004',
            startDate: '2025-03-01',
            endDate: '2026-02-28',
            projectManager: 'David Wilson',
            status: 'draft',
            budget: '$5,200,000',
            standImage: 'https://picsum.photos/seed/hospital_detail/150/150',
            standSize: '25x25ft',
            unpaidInvoices: false,
            clientPaid: false,
            stakeholders: [
                { name: 'Dr. Sarah Lee', role: 'Medical Consultant', avatar: 'SL', color: 'bg-teal-500', imageUrl: 'https://picsum.photos/seed/SarahLee/50/50' },
                { name: 'Mark Johnson', role: 'Structural Engineer', avatar: 'MJ', color: 'bg-cyan-500', imageUrl: 'https://picsum.photos/seed/MarkJohnson/50/50' }
            ]
        },
        5: {
            id: 5,
            projectName: 'School Playground Upgrade',
            jobCode: '25-01-0005',
            startDate: '2024-09-01',
            endDate: '2024-12-15',
            projectManager: 'Robert Smith',
            status: 'closed',
            budget: '$125,000',
            standImage: 'https://picsum.photos/seed/playground_detail/150/150',
            standSize: '5x10ft',
            unpaidInvoices: true,
            clientPaid: true,
            stakeholders: [
                { name: 'Mary Johnson', role: 'Safety Inspector', avatar: 'MJ', color: 'bg-lime-500', imageUrl: 'https://picsum.photos/seed/MaryJohnson/50/50' },
                { name: 'Peter Wilson', role: 'Landscape Architect', avatar: 'PW', color: 'bg-amber-500', imageUrl: 'https://picsum.photos/seed/PeterWilson/50/50' }
            ]
        },
        6: {
            id: 6,
            projectName: 'Residential Complex Phase 2',
            jobCode: '25-01-0006',
            startDate: '2025-04-01',
            endDate: '2026-10-30',
            projectManager: 'Sarah Johnson',
            status: 'active',
            budget: '$8,750,000',
            standImage: 'https://picsum.photos/seed/residential_detail/150/150',
            standSize: '30x40ft',
            unpaidInvoices: false,
            clientPaid: true,
            stakeholders: [
                { name: 'Alex Turner', role: 'Civil Engineer', avatar: 'AT', color: 'bg-rose-500', imageUrl: 'https://picsum.photos/seed/AlexTurner/50/50' },
                { name: 'Nina Patel', role: 'Urban Planner', avatar: 'NP', color: 'bg-violet-500', imageUrl: 'https://picsum.photos/seed/NinaPatel/50/50' },
                { name: 'Chris Lee', role: 'Construction Manager', avatar: 'CL', color: 'bg-emerald-500', imageUrl: 'https://picsum.photos/seed/ChrisLee/50/50' }
            ]
        }
    };

    // Load project data based on projectId
    useEffect(() => {
        const loadProject = () => {
            // Simulate API call
            setTimeout(() => {
                const foundProject = mockProjects[parseInt(projectId)];
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    // Fallback to default project if not found
                    setProject(mockProjects[1]);
                }
                setLoading(false);
            }, 500);
        };

        if (projectId) {
            loadProject();
        }
    }, [projectId]);

    // Updated categories based on Excel file
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

    // Updated cost data structure to support multiple items per category with supplier information
    const [costData, setCostData] = useState({
        budgetPlanning: {
            totalBudget: 2500000,
            allocatedBudget: 2200000,
            remainingBudget: 300000,
            categoryItems: [
                {
                    id: 1,
                    category: 'Floor Costs',
                    description: 'Flooring material, floor coverings, etc.',
                    supplier: 'Supplier',
                    supplierQuotes: 0,
                    supplierCost: 0,
                    marginCalculated: 0,
                    actuals: 0
                },
                {
                    id: 2,
                    category: 'Build Items',
                    description: 'Manufacturing physical elements at the event',
                    supplier: 'Supplier',
                    supplierQuotes: 0,
                    supplierCost: 0,
                    marginCalculated: 0,
                    actuals: 0
                },
                {
                    id: 3,
                    category: 'Refurb Cost',
                    description: 'Refurbishing or modifying existing structures',
                    supplier: 'Supplier',
                    supplierQuotes: 2175.00,
                    supplierCost: 2175.00,
                    marginCalculated: 0,
                    actuals: 3198.53
                },
                {
                    id: 4,
                    category: 'Graphics Design and print graphics',
                    description: 'Design and print graphics (banners, signage)',
                    supplier: 'Supplier',
                    supplierQuotes: 0,
                    supplierCost: 0,
                    marginCalculated: 0,
                    actuals: 0
                },
                {
                    id: 5,
                    category: 'Electrical Stand Power & Leads',
                    description: 'Power supply costs, electrical outlets and cables',
                    supplier: 'Supplier',
                    supplierQuotes: 1817.30,
                    supplierCost: 1817.30,
                    marginCalculated: 0,
                    actuals: 2672.50
                },
                {
                    id: 6,
                    category: 'Install Bump Out',
                    description: 'Installation and bump out services',
                    supplier: 'Supplier',
                    supplierQuotes: 1414.93,
                    supplierCost: 1414.93,
                    marginCalculated: 0,
                    actuals: 2080.78
                }
            ]
        }
    });

    const [suppliers, setSuppliers] = useState([
        { id: 1, name: 'ABC Construction Materials', quote: 450000, status: 'approved', category: 'Floor Costs' },
        { id: 2, name: 'XYZ Labor Services', quote: 720000, status: 'pending', category: 'Build Items' },
        { id: 3, name: 'Equipment Rental Co.', quote: 350000, status: 'approved', category: 'Electrical Stand Power & Leads' }
    ]);

    // Client Invoice state
    const [clientInvoices, setClientInvoices] = useState([
        { id: 1, clientName: 'Acme Corporation', invoiceNumber: 'INV-2025-001', amount: 500000, status: 'paid', category: 'Floor Costs', dueDate: '2025-02-15' },
        { id: 2, clientName: 'Global Industries', invoiceNumber: 'INV-2025-002', amount: 750000, status: 'pending', category: 'Build Items', dueDate: '2025-03-01' },
        { id: 3, clientName: 'Tech Solutions Ltd', invoiceNumber: 'INV-2025-003', amount: 300000, status: 'overdue', category: 'Electrical Stand Power & Leads', dueDate: '2025-01-30' }
    ]);

    const [comments, setComments] = useState([
        { id: 1, author: 'Sarah Johnson', text: 'Budget review completed for Q1', timestamp: '2025-01-15 10:30', type: 'budget' },
        { id: 2, author: 'Mike Chen', text: 'Material costs are within expected range', timestamp: '2025-01-14 15:45', type: 'cost' }
    ]);

    const [newComment, setNewComment] = useState('');
    const [uploadedPhotos, setUploadedPhotos] = useState([
        { id: 1, url: 'https://picsum.photos/seed/photo1/200/150', caption: 'Foundation work progress' },
        { id: 2, url: 'https://picsum.photos/seed/photo2/200/150', caption: 'Material delivery' }
    ]);

    // New state for adding category items
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const [newCategoryItem, setNewCategoryItem] = useState({
        category: '',
        description: '',
        supplier: 'Supplier',
        supplierQuotes: null, // Changed to handle file
        supplierCost: 0,
        marginCalculated: 0,
        actuals: 0
    });

    // State for file upload
    const [selectedFile, setSelectedFile] = useState(null);

    // State for editing suppliers
    const [editingSupplierId, setEditingSupplierId] = useState(null);
    const [editedSupplier, setEditedSupplier] = useState(null);

    // State for editing client invoices
    const [editingInvoiceId, setEditingInvoiceId] = useState(null);
    const [editedInvoice, setEditedInvoice] = useState(null);

    // State for adding new client invoice
    const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);
    const [newInvoice, setNewInvoice] = useState({
        clientName: '',
        invoiceNumber: '',
        amount: 0,
        status: 'pending',
        category: '',
        dueDate: ''
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'draft': return 'bg-gray-600';
            case 'active': return 'bg-green-600';
            case 'closed': return 'bg-red-600';
            default: return 'bg-gray-600';
        }
    };

    const getInvoiceStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'overdue': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const addComment = () => {
        if (newComment.trim()) {
            const comment = {
                id: comments.length + 1,
                author: 'Current User',
                text: newComment,
                timestamp: new Date().toLocaleString(),
                type: 'general'
            };
            setComments([comment, ...comments]);
            setNewComment('');
        }
    };

    const addCategoryItem = () => {
        if (newCategoryItem.category && newCategoryItem.description) {
            const item = {
                id: costData.budgetPlanning.categoryItems.length + 1,
                ...newCategoryItem,
                supplierQuotes: selectedFile ? selectedFile.name : 'No file selected', // Store file name
                supplierCost: parseFloat(newCategoryItem.supplierCost) || 0,
                marginCalculated: parseFloat(newCategoryItem.marginCalculated) || 0,
                actuals: parseFloat(newCategoryItem.actuals) || 0
            };

            setCostData(prev => ({
                ...prev,
                budgetPlanning: {
                    ...prev.budgetPlanning,
                    categoryItems: [...prev.budgetPlanning.categoryItems, item]
                }
            }));

            setNewCategoryItem({
                category: '',
                description: '',
                supplier: 'Supplier',
                supplierQuotes: null,
                supplierCost: 0,
                marginCalculated: 0,
                actuals: 0
            });
            setSelectedFile(null);
            setShowAddItemModal(false);
        }
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
            setSelectedFile(file);
            setNewCategoryItem(prev => ({ ...prev, supplierQuotes: file }));
        } else {
            alert('Please select a PDF file or image');
        }
    };

    const deleteCategoryItem = (itemId) => {
        setCostData(prev => ({
            ...prev,
            budgetPlanning: {
                ...prev.budgetPlanning,
                categoryItems: prev.budgetPlanning.categoryItems.filter(item => item.id !== itemId)
            }
        }));
    };

    const updateCategoryItem = (itemId, field, value) => {
        setCostData(prev => ({
            ...prev,
            budgetPlanning: {
                ...prev.budgetPlanning,
                categoryItems: prev.budgetPlanning.categoryItems.map(item =>
                    item.id === itemId ? {
                        ...item,
                        [field]: field === 'supplier' ? value : (parseFloat(value) || 0)
                    } : item
                )
            }
        }));
    };

    const handleDeleteSupplier = (id) => {
        setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    };

    const handleEditSupplier = (supplier) => {
        setEditingSupplierId(supplier.id);
        setEditedSupplier({ ...supplier });
    };

    const handleSaveSupplier = (id) => {
        setSuppliers(suppliers.map(supplier =>
            supplier.id === id ? editedSupplier : supplier
        ));
        setEditingSupplierId(null);
        setEditedSupplier(null);
    };

    const handleCancelEditSupplier = () => {
        setEditingSupplierId(null);
        setEditedSupplier(null);
    };

    const handleSupplierChange = (field, value) => {
        setEditedSupplier(prev => ({ ...prev, [field]: value }));
    };

    // Client Invoice functions
    const handleDeleteInvoice = (id) => {
        setClientInvoices(clientInvoices.filter(invoice => invoice.id !== id));
    };

    const handleEditInvoice = (invoice) => {
        setEditingInvoiceId(invoice.id);
        setEditedInvoice({ ...invoice });
    };

    const handleSaveInvoice = (id) => {
        setClientInvoices(clientInvoices.map(invoice =>
            invoice.id === id ? editedInvoice : invoice
        ));
        setEditingInvoiceId(null);
        setEditedInvoice(null);
    };

    const handleCancelEditInvoice = () => {
        setEditingInvoiceId(null);
        setEditedInvoice(null);
    };

    const handleInvoiceChange = (field, value) => {
        setEditedInvoice(prev => ({ ...prev, [field]: value }));
    };

    const addClientInvoice = () => {
        if (newInvoice.clientName && newInvoice.invoiceNumber && newInvoice.amount) {
            const invoice = {
                id: clientInvoices.length + 1,
                ...newInvoice,
                amount: parseFloat(newInvoice.amount) || 0
            };

            setClientInvoices([...clientInvoices, invoice]);

            setNewInvoice({
                clientName: '',
                invoiceNumber: '',
                amount: 0,
                status: 'pending',
                category: '',
                dueDate: ''
            });
            setShowAddInvoiceModal(false);
        }
    };

    // Get active tab data for mobile dropdown
    const activeTabData = tabs.find(tab => tab.id === activeTab);

    // Handle tab change and close dropdown
    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsDropdownOpen(false);
    };

    const renderOverviewTab = () => (
        <div className="space-y-4 sm:space-y-6">
            {/* Project Info */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Project Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Project Name</label>
                        <p className="text-sm sm:text-base text-gray-900">{project.projectName}</p>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Job Code</label>
                        <p className="text-sm sm:text-base text-blue-600 font-bold">{project.jobCode}</p>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Project Manager</label>
                        <p className="text-sm sm:text-base text-gray-900">{project.projectManager}</p>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Status</label>
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                            {project.status.toUpperCase()}
                        </span>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Start Date</label>
                        <p className="text-sm sm:text-base text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">End Date</label>
                        <p className="text-sm sm:text-base text-gray-900">{new Date(project.endDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Stand Size</label>
                        <p className="text-sm sm:text-base text-gray-900">{project.standSize}</p>
                    </div>
                    <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700">Stand Image</label>
                        <img src={project.standImage} alt="Stand" className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Invoice Status */}
            {project.status === 'closed' && (
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Invoice Status</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            {project.unpaidInvoices ? (
                                <span className="text-red-600 text-sm sm:text-base"><i className="bi bi-exclamation-triangle-fill mr-2"></i>Unpaid Invoices Present</span>
                            ) : (
                                <span className="text-green-600 text-sm sm:text-base"><i className="bi bi-check-circle-fill mr-2"></i>No Unpaid Invoices</span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {project.clientPaid ? (
                                <span className="text-green-600 text-sm sm:text-base"><i className="bi bi-check-circle-fill mr-2"></i>Client Payment Received</span>
                            ) : (
                                <span className="text-red-600 text-sm sm:text-base"><i className="bi bi-x-circle-fill mr-2"></i>Client Payment Pending</span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Team Members */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Team Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    {project.stakeholders.map((stakeholder, index) => (
                        <div key={index} className="flex items-center gap-2 sm:gap-3">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${stakeholder.color} rounded-full flex items-center justify-center text-white font-medium text-xs sm:text-sm`}>
                                {stakeholder.avatar}
                            </div>
                            <img
                                src={stakeholder.imageUrl}
                                alt={stakeholder.name}
                                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-medium text-gray-900 text-sm sm:text-base">{stakeholder.name}</p>
                                <p className="text-xs sm:text-sm text-gray-600">{stakeholder.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderCostManagementTab = () => (
        <div className="space-y-4 sm:space-y-6">
            {/* Category Items Management */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Category Items Management</h3>
                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        {/* View Toggle Buttons */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1 flex-1 sm:flex-none">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                                    viewMode === 'list'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <i className="bi bi-list mr-1"></i><span className="hidden sm:inline">List View</span>
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors flex-1 sm:flex-none ${
                                    viewMode === 'grid'
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <i className="bi bi-grid mr-1"></i><span className="hidden sm:inline">Grid View</span>
                            </button>
                        </div>
                        <button
                            onClick={() => setShowAddItemModal(true)}
                            className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                        >
                            <i className="bi bi-plus-circle mr-1 sm:mr-2"></i><span className="hidden sm:inline">Add Category Item</span><span className="sm:hidden">Add</span>
                        </button>
                    </div>
                </div>

                {/* List View */}
                {viewMode === 'list' && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Quotes</th>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Cost</th>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin Calculated</th>
                                <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {costData.budgetPlanning.categoryItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{item.category}</td>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 text-xs sm:text-sm text-gray-500 max-w-xs truncate">{item.description}</td>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-red-500 font-medium">
                                        <input
                                            type="text"
                                            value={item.supplier}
                                            onChange={(e) => updateCategoryItem(item.id, 'supplier', e.target.value)}
                                            className="w-16 sm:w-24 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm text-red-500"
                                        />
                                    </td>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.supplierQuotes}
                                            onChange={(e) => updateCategoryItem(item.id, 'supplierQuotes', e.target.value)}
                                            className="w-16 sm:w-24 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    </td>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.supplierCost}
                                            onChange={(e) => updateCategoryItem(item.id, 'supplierCost', e.target.value)}
                                            className="w-16 sm:w-24 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    </td>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                        <input
                                            type="number"
                                            value={item.marginCalculated}
                                            onChange={(e) => updateCategoryItem(item.id, 'marginCalculated', e.target.value)}
                                            className="w-16 sm:w-24 px-1 sm:px-2 py-1 border border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    </td>
                                    <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
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
                )}
            </div>
        </div>
    );

    const renderSuppliersTab = () => (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Supplier Management</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier Name</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote Amount</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {suppliers.map((supplier) => (
                            <tr key={supplier.id}>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                    {editingSupplierId === supplier.id ? (
                                        <input
                                            type="text"
                                            value={editedSupplier.name}
                                            onChange={(e) => handleSupplierChange('name', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 text-gray-600 border border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    ) : (
                                        supplier.name
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                    {editingSupplierId === supplier.id ? (
                                        <select
                                            value={editedSupplier.category}
                                            onChange={(e) => handleSupplierChange('category', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        supplier.category
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    {editingSupplierId === supplier.id ? (
                                        <input
                                            type="number"
                                            value={editedSupplier.quote}
                                            onChange={(e) => handleSupplierChange('quote', parseFloat(e.target.value) || 0)}
                                            className="w-16 sm:w-24 px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    ) : (
                                        formatCurrency(supplier.quote)
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                    {editingSupplierId === supplier.id ? (
                                        <select
                                            value={editedSupplier.status}
                                            onChange={(e) => handleSupplierChange('status', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        >
                                            <option value="approved">approved</option>
                                            <option value="pending">pending</option>
                                        </select>
                                    ) : (
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            supplier.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {supplier.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                    {editingSupplierId === supplier.id ? (
                                        <>
                                            <button onClick={() => handleSaveSupplier(supplier.id)} className="text-green-600 hover:text-green-900 mr-2 sm:mr-3">
                                                <i className="bi bi-check"></i>
                                            </button>
                                            <button onClick={handleCancelEditSupplier} className="text-gray-600 hover:text-gray-900">
                                                <i className="bi bi-x"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditSupplier(supplier)} className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-3">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button onClick={() => handleDeleteSupplier(supplier.id)} className="text-red-600 hover:text-red-900">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderClientInvoicesTab = () => (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-3">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Client Invoice Management</h3>
                    <button
                        onClick={() => setShowAddInvoiceModal(true)}
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                    >
                        <i className="bi bi-plus-circle mr-1 sm:mr-2"></i><span className="hidden sm:inline">Add Invoice</span><span className="sm:hidden">Add</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Number</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {clientInvoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                                    {editingInvoiceId === invoice.id ? (
                                        <input
                                            type="text"
                                            value={editedInvoice.clientName}
                                            onChange={(e) => handleInvoiceChange('clientName', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 text-gray-600 border border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    ) : (
                                        invoice.clientName
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                    {editingInvoiceId === invoice.id ? (
                                        <input
                                            type="text"
                                            value={editedInvoice.invoiceNumber}
                                            onChange={(e) => handleInvoiceChange('invoiceNumber', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 text-gray-600 border border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    ) : (
                                        invoice.invoiceNumber
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                    {editingInvoiceId === invoice.id ? (
                                        <select
                                            value={editedInvoice.category}
                                            onChange={(e) => handleInvoiceChange('category', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        invoice.category
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">
                                    {editingInvoiceId === invoice.id ? (
                                        <input
                                            type="number"
                                            value={editedInvoice.amount}
                                            onChange={(e) => handleInvoiceChange('amount', parseFloat(e.target.value) || 0)}
                                            className="w-16 sm:w-24 px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    ) : (
                                        formatCurrency(invoice.amount)
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                                    {editingInvoiceId === invoice.id ? (
                                        <input
                                            type="date"
                                            value={editedInvoice.dueDate}
                                            onChange={(e) => handleInvoiceChange('dueDate', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        />
                                    ) : (
                                        new Date(invoice.dueDate).toLocaleDateString()
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                                    {editingInvoiceId === invoice.id ? (
                                        <select
                                            value={editedInvoice.status}
                                            onChange={(e) => handleInvoiceChange('status', e.target.value)}
                                            className="w-full px-1 sm:px-2 py-1 border text-gray-600 border-gray-300 rounded text-xs sm:text-sm"
                                        >
                                            <option value="paid">paid</option>
                                            <option value="pending">pending</option>
                                            <option value="overdue">overdue</option>
                                        </select>
                                    ) : (
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getInvoiceStatusColor(invoice.status)}`}>
                                            {invoice.status}
                                        </span>
                                    )}
                                </td>
                                <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                    {editingInvoiceId === invoice.id ? (
                                        <>
                                            <button onClick={() => handleSaveInvoice(invoice.id)} className="text-green-600 hover:text-green-900 mr-2 sm:mr-3">
                                                <i className="bi bi-check"></i>
                                            </button>
                                            <button onClick={handleCancelEditInvoice} className="text-gray-600 hover:text-gray-900">
                                                <i className="bi bi-x"></i>
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditInvoice(invoice)} className="text-blue-600 hover:text-blue-900 mr-2 sm:mr-3">
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button onClick={() => handleDeleteInvoice(invoice.id)} className="text-red-600 hover:text-red-900">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderCommentsTab = () => (
        <div className="space-y-4 sm:space-y-6">
            {/* Add Comment */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Add Comment</h3>
                <div className="flex flex-col sm:flex-row gap-3">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 "
                        rows="3"
                        placeholder="Enter your comment..."
                    />
                    <button
                        onClick={addComment}
                        className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors self-start text-xs sm:text-sm"
                    >
                        Add Comment
                    </button>
                </div>
            </div>

            {/* Comments List */}
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Comments</h3>
                <div className="space-y-3 sm:space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm sm:text-base">{comment.author}</p>
                                    <p className="text-gray-700 mt-1 text-sm sm:text-base">{comment.text}</p>
                                </div>
                                <span className="text-xs sm:text-sm text-gray-500">{comment.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPhotosTab = () => (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Project Photos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {uploadedPhotos.map((photo) => (
                        <div key={photo.id} className="border border-gray-300 rounded-lg overflow-hidden">
                            <img src={photo.url} alt={photo.caption} className="w-full h-32 sm:h-48 object-cover" />
                            <div className="p-2 sm:p-3">
                                <p className="text-xs sm:text-sm text-gray-700">{photo.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-sm sm:text-base">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                    <i className="bi bi-exclamation-triangle text-2xl sm:text-4xl text-red-600 mb-4"></i>
                    <p className="text-gray-600 text-sm sm:text-base">Project not found</p>
                    <button
                        onClick={() => navigate('/project-listing')}
                        className="mt-4 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                    >
                        Back to Projects
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <button
                            onClick={() => navigate('/project-listing')}
                            className="p-1 sm:p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <i className="bi bi-arrow-left text-base sm:text-lg"></i>
                        </button>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">{project.projectName}</h1>
                            <p className="text-gray-600 text-sm sm:text-base">Job Code: {project.jobCode}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                            {project.status.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Tabs */}
            <div className="bg-white border-b border-gray-200">
                {/* Desktop Tabs */}
                <div className="hidden md:block px-3 sm:px-6">
                    <nav className="flex space-x-4 lg:space-x-8 overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-sm lg:text-base whitespace-nowrap ${
                                    activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className={`${tab.icon} mr-1 sm:mr-2 text-sm lg:text-base`}></i>
                                <span className="hidden lg:inline">{tab.label}</span>
                                <span className="lg:hidden">{tab.label.split(' ')[0]}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Mobile Dropdown */}
                <div className="md:hidden relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 border-b border-gray-300"
                    >
                        <div className="flex items-center gap-2">
                            <i className={`${activeTabData?.icon} text-sm`}></i>
                            <span>{activeTabData?.label}</span>
                        </div>
                        <i className={`bi bi-chevron-down text-sm transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}></i>
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 shadow-lg z-10">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-left transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <i className={`${tab.icon} text-sm`}></i>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-3 sm:p-6">
                {activeTab === 'overview' && renderOverviewTab()}
                {activeTab === 'cost-management' && renderCostManagementTab()}
                {activeTab === 'suppliers' && renderSuppliersTab()}
                {activeTab === 'client-invoices' && renderClientInvoicesTab()}
                {activeTab === 'comments' && renderCommentsTab()}
                {activeTab === 'photos' && renderPhotosTab()}
            </div>

            {/* Add Category Item Modal */}
            {showAddItemModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Add Category Item</h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Category</label>
                                <select
                                    value={newCategoryItem.category}
                                    onChange={(e) => setNewCategoryItem(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    rows="3"
                                    placeholder="Enter description..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Supplier</label>
                                <input
                                    type="text"
                                    value={newCategoryItem.supplier}
                                    onChange={(e) => setNewCategoryItem(prev => ({ ...prev, supplier: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    placeholder="Enter supplier name..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                                        Supplier Quotes
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            onChange={handleFileUpload}
                                            className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-2 sm:file:mr-4 file:py-1 file:px-1 sm:file:px-2 file:rounded file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-xs sm:text-sm"
                                        />
                                        {selectedFile && (
                                            <p className="text-xs text-green-600 mt-1">
                                                Selected: {selectedFile.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Supplier Cost</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.supplierCost}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, supplierCost: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
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
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Actuals</label>
                                    <input
                                        type="number"
                                        value={newCategoryItem.actuals}
                                        onChange={(e) => setNewCategoryItem(prev => ({ ...prev, actuals: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                            <button
                                onClick={() => setShowAddItemModal(false)}
                                className="px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addCategoryItem}
                                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                            >
                                Add Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Client Invoice Modal */}
            {showAddInvoiceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Add Client Invoice</h3>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Client Name</label>
                                <input
                                    type="text"
                                    value={newInvoice.clientName}
                                    onChange={(e) => setNewInvoice(prev => ({ ...prev, clientName: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    placeholder="Enter client name..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Invoice Number</label>
                                <input
                                    type="text"
                                    value={newInvoice.invoiceNumber}
                                    onChange={(e) => setNewInvoice(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    placeholder="Enter invoice number..."
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Category</label>
                                <select
                                    value={newInvoice.category}
                                    onChange={(e) => setNewInvoice(prev => ({ ...prev, category: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:gap-4">
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Amount</label>
                                    <input
                                        type="number"
                                        value={newInvoice.amount}
                                        onChange={(e) => setNewInvoice(prev => ({ ...prev, amount: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Due Date</label>
                                    <input
                                        type="date"
                                        value={newInvoice.dueDate}
                                        onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                                        className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Status</label>
                                <select
                                    value={newInvoice.status}
                                    onChange={(e) => setNewInvoice(prev => ({ ...prev, status: e.target.value }))}
                                    className="w-full px-2 sm:px-3 py-2 border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                >
                                    <option value="pending">pending</option>
                                    <option value="paid">paid</option>
                                    <option value="overdue">overdue</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
                            <button
                                onClick={() => setShowAddInvoiceModal(false)}
                                className="px-3 sm:px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={addClientInvoice}
                                className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm"
                            >
                                Add Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetailView;

