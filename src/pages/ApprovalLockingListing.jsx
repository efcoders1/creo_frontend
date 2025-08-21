import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApprovalLockingListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState('all');
    const [approverFilter, setApproverFilter] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedApproval, setSelectedApproval] = useState(null);

    // Form states
    const [approvalComment, setApprovalComment] = useState('');
    const [rejectionReason, setRejectionReason] = useState('');
    const [editFormData, setEditFormData] = useState({});

    // Dummy approval and locking data
    const [approvals, setApprovals] = useState([
        {
            id: 1,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            projectManager: 'Sarah Johnson',
            totalBudget: 83500.00,
            actualCosts: 12800.00,
            currentMargin: 84.7,
            status: 'LOCKED',
            lockDate: '2025-01-16',
            approvedBy: 'Michael Chen',
            approverRole: 'Director',
            submittedDate: '2025-01-15',
            lockReason: 'Final budget approval completed - All requirements met',
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (84.7% > 32%)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: true },
                { item: 'Supplier quotes reviewed and validated', checked: true },
                { item: 'Risk assessment completed', checked: true },
                { item: 'Director authorization confirmed', checked: true }
            ],
            auditLog: [
                { action: 'Budget Locked', user: 'Michael Chen (Director)', timestamp: '2025-01-16 16:45:00', details: 'Final approval granted - All criteria met' },
                { action: 'Budget Submitted for Approval', user: 'Sarah Johnson (PM)', timestamp: '2025-01-15 14:30:00', details: 'Budget submitted to Director for final approval' },
                { action: 'Pre-approval Checklist Completed', user: 'Sarah Johnson (PM)', timestamp: '2025-01-15 10:15:00', details: 'All checklist items verified and completed' }
            ],
            priority: 'HIGH',
            category: 'CONSTRUCTION'
        },
        {
            id: 2,
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            projectManager: 'Michael Chen',
            totalBudget: 133500.00,
            actualCosts: 0.00,
            currentMargin: 100.0,
            status: 'PENDING_APPROVAL',
            lockDate: null,
            approvedBy: null,
            approverRole: null,
            submittedDate: '2025-01-14',
            lockReason: null,
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (100.0% > 32%)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: true },
                { item: 'Supplier quotes reviewed and validated', checked: false },
                { item: 'Risk assessment completed', checked: false },
                { item: 'Director authorization confirmed', checked: false }
            ],
            auditLog: [
                { action: 'Budget Submitted for Approval', user: 'Michael Chen (PM)', timestamp: '2025-01-14 11:20:00', details: 'Budget submitted to Director for review' },
                { action: 'Budget Created', user: 'Michael Chen (PM)', timestamp: '2025-01-14 09:45:00', details: 'Initial budget planning completed' }
            ],
            priority: 'MEDIUM',
            category: 'RENOVATION'
        },
        {
            id: 3,
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            projectManager: 'Emma Thompson',
            totalBudget: 92500.00,
            actualCosts: 23125.00,
            currentMargin: 75.0,
            status: 'LOCKED',
            lockDate: '2025-01-13',
            approvedBy: 'Director Smith',
            approverRole: 'Director',
            submittedDate: '2025-01-12',
            lockReason: 'Budget approved with conditions - Monthly review required',
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (75.0% > 32%)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: true },
                { item: 'Supplier quotes reviewed and validated', checked: true },
                { item: 'Risk assessment completed', checked: true },
                { item: 'Director authorization confirmed', checked: true }
            ],
            auditLog: [
                { action: 'Budget Locked', user: 'Director Smith (Director)', timestamp: '2025-01-13 15:30:00', details: 'Approved with monthly review condition' },
                { action: 'Budget Submitted for Approval', user: 'Emma Thompson (PM)', timestamp: '2025-01-12 16:15:00', details: 'Budget submitted for director approval' },
                { action: 'Budget Revised', user: 'Emma Thompson (PM)', timestamp: '2025-01-12 14:20:00', details: 'Updated margin calculations based on new quotes' }
            ],
            priority: 'HIGH',
            category: 'FITOUT'
        },
        {
            id: 4,
            projectCode: '25-01-0004',
            projectName: 'Hospital Wing Extension',
            projectManager: 'Robert Davis',
            totalBudget: 475000.00,
            actualCosts: 0.00,
            currentMargin: 100.0,
            status: 'DRAFT',
            lockDate: null,
            approvedBy: null,
            approverRole: null,
            submittedDate: null,
            lockReason: null,
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: false },
                { item: 'Margin calculations verified (100.0% > 32%)', checked: false },
                { item: 'Project manager has submitted for approval', checked: false },
                { item: 'Stakeholder notifications sent', checked: false },
                { item: 'Supplier quotes reviewed and validated', checked: false },
                { item: 'Risk assessment completed', checked: false },
                { item: 'Director authorization confirmed', checked: false }
            ],
            auditLog: [
                { action: 'Budget Created', user: 'Robert Davis (PM)', timestamp: '2025-01-10 10:00:00', details: 'Initial budget draft created' }
            ],
            priority: 'CRITICAL',
            category: 'HEALTHCARE'
        },
        {
            id: 5,
            projectCode: '25-01-0005',
            projectName: 'School Playground Upgrade',
            projectManager: 'Lisa Wong',
            totalBudget: 36200.00,
            actualCosts: 36200.00,
            currentMargin: 0.0,
            status: 'COMPLETED',
            lockDate: '2024-12-20',
            approvedBy: 'Michael Chen',
            approverRole: 'Director',
            submittedDate: '2024-12-18',
            lockReason: 'Project completed successfully - Final budget locked',
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (0.0% breakeven)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: true },
                { item: 'Supplier quotes reviewed and validated', checked: true },
                { item: 'Risk assessment completed', checked: true },
                { item: 'Director authorization confirmed', checked: true }
            ],
            auditLog: [
                { action: 'Project Completed', user: 'Lisa Wong (PM)', timestamp: '2025-01-05 17:00:00', details: 'Project completed - Final costs recorded' },
                { action: 'Budget Locked', user: 'Michael Chen (Director)', timestamp: '2024-12-20 14:45:00', details: 'Final approval granted for project completion' },
                { action: 'Budget Submitted for Approval', user: 'Lisa Wong (PM)', timestamp: '2024-12-18 13:30:00', details: 'Budget submitted for final approval' }
            ],
            priority: 'LOW',
            category: 'EDUCATION'
        },
        {
            id: 6,
            projectCode: '25-01-0006',
            projectName: 'Residential Complex Phase 2',
            projectManager: 'Alex Rodriguez',
            totalBudget: 895000.00,
            actualCosts: 313250.00,
            currentMargin: 65.0,
            status: 'REJECTED',
            lockDate: null,
            approvedBy: null,
            approverRole: null,
            submittedDate: '2025-01-11',
            lockReason: 'Budget rejected - Margin below acceptable threshold',
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (65.0% > 32%)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: false },
                { item: 'Supplier quotes reviewed and validated', checked: false },
                { item: 'Risk assessment completed', checked: false },
                { item: 'Director authorization confirmed', checked: false }
            ],
            auditLog: [
                { action: 'Budget Rejected', user: 'Director Smith (Director)', timestamp: '2025-01-12 09:15:00', details: 'Rejected - Requires cost optimization and risk mitigation' },
                { action: 'Budget Submitted for Approval', user: 'Alex Rodriguez (PM)', timestamp: '2025-01-11 15:45:00', details: 'Budget submitted for director review' },
                { action: 'Budget Revised', user: 'Alex Rodriguez (PM)', timestamp: '2025-01-11 12:30:00', details: 'Updated budget with revised supplier quotes' }
            ],
            priority: 'HIGH',
            category: 'RESIDENTIAL'
        },
        {
            id: 7,
            projectCode: '25-01-0007',
            projectName: 'Corporate Office Renovation',
            projectManager: 'Jennifer Lee',
            totalBudget: 156000.00,
            actualCosts: 46800.00,
            currentMargin: 70.0,
            status: 'UNDER_REVIEW',
            lockDate: null,
            approvedBy: null,
            approverRole: null,
            submittedDate: '2025-01-13',
            lockReason: null,
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (70.0% > 32%)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: true },
                { item: 'Supplier quotes reviewed and validated', checked: true },
                { item: 'Risk assessment completed', checked: false },
                { item: 'Director authorization confirmed', checked: false }
            ],
            auditLog: [
                { action: 'Budget Under Review', user: 'Michael Chen (Director)', timestamp: '2025-01-14 10:30:00', details: 'Review in progress - Additional documentation requested' },
                { action: 'Budget Submitted for Approval', user: 'Jennifer Lee (PM)', timestamp: '2025-01-13 14:20:00', details: 'Budget submitted for director approval' },
                { action: 'Budget Updated', user: 'Jennifer Lee (PM)', timestamp: '2025-01-13 11:45:00', details: 'Updated with latest supplier quotes and cost estimates' }
            ],
            priority: 'MEDIUM',
            category: 'RENOVATION'
        },
        {
            id: 8,
            projectCode: '25-01-0008',
            projectName: 'Manufacturing Facility Upgrade',
            projectManager: 'David Brown',
            totalBudget: 725000.00,
            actualCosts: 0.00,
            currentMargin: 100.0,
            status: 'EXPIRED',
            lockDate: null,
            approvedBy: null,
            approverRole: null,
            submittedDate: '2024-12-15',
            lockReason: 'Approval request expired - Requires resubmission',
            checklist: [
                { item: 'Budget planning completed and reviewed', checked: true },
                { item: 'All cost categories properly allocated', checked: true },
                { item: 'Margin calculations verified (100.0% > 32%)', checked: true },
                { item: 'Project manager has submitted for approval', checked: true },
                { item: 'Stakeholder notifications sent', checked: false },
                { item: 'Supplier quotes reviewed and validated', checked: false },
                { item: 'Risk assessment completed', checked: false },
                { item: 'Director authorization confirmed', checked: false }
            ],
            auditLog: [
                { action: 'Approval Request Expired', user: 'System', timestamp: '2025-01-15 00:00:00', details: 'Approval request expired after 30 days - Requires resubmission' },
                { action: 'Budget Submitted for Approval', user: 'David Brown (PM)', timestamp: '2024-12-15 16:30:00', details: 'Budget submitted for director approval' },
                { action: 'Budget Created', user: 'David Brown (PM)', timestamp: '2024-12-15 14:15:00', details: 'Initial budget planning completed' }
            ],
            priority: 'HIGH',
            category: 'MANUFACTURING'
        }
    ]);

    const statusOptions = [
        { value: 'all', label: 'ALL STATUS', color: 'bg-gray-600' },
        { value: 'DRAFT', label: 'DRAFT', color: 'bg-gray-600' },
        { value: 'PENDING_APPROVAL', label: 'PENDING APPROVAL', color: 'bg-yellow-600' },
        { value: 'UNDER_REVIEW', label: 'UNDER REVIEW', color: 'bg-blue-600' },
        { value: 'LOCKED', label: 'LOCKED', color: 'bg-green-600' },
        { value: 'REJECTED', label: 'REJECTED', color: 'bg-red-600' },
        { value: 'EXPIRED', label: 'EXPIRED', color: 'bg-orange-600' },
        { value: 'COMPLETED', label: 'COMPLETED', color: 'bg-purple-600' }
    ];

    const projectOptions = [
        { value: 'all', label: 'ALL PROJECTS' },
        { value: '25-01-0001', label: '25-01-0001 - Office Building Construction' },
        { value: '25-01-0002', label: '25-01-0002 - Warehouse Renovation' },
        { value: '25-01-0003', label: '25-01-0003 - Retail Store Fitout' },
        { value: '25-01-0004', label: '25-01-0004 - Hospital Wing Extension' },
        { value: '25-01-0005', label: '25-01-0005 - School Playground Upgrade' },
        { value: '25-01-0006', label: '25-01-0006 - Residential Complex Phase 2' },
        { value: '25-01-0007', label: '25-01-0007 - Corporate Office Renovation' },
        { value: '25-01-0008', label: '25-01-0008 - Manufacturing Facility Upgrade' }
    ];

    const approverOptions = [
        { value: 'all', label: 'ALL APPROVERS' },
        { value: 'Michael Chen', label: 'Michael Chen' },
        { value: 'Director Smith', label: 'Director Smith' },
        { value: 'Sarah Johnson', label: 'Sarah Johnson' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'budget_high', label: 'Budget: High to Low' },
        { value: 'budget_low', label: 'Budget: Low to High' },
        { value: 'margin_high', label: 'Margin: High to Low' },
        { value: 'margin_low', label: 'Margin: Low to High' },
        { value: 'status', label: 'Status' },
        { value: 'priority', label: 'Priority' }
    ];

    // Helper functions
    const getStatusColor = (status) => {
        switch (status) {
            case 'LOCKED':
                return 'bg-green-100 text-green-800';
            case 'PENDING_APPROVAL':
                return 'bg-yellow-100 text-yellow-800';
            case 'UNDER_REVIEW':
                return 'bg-blue-100 text-blue-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            case 'COMPLETED':
                return 'bg-purple-100 text-purple-800';
            case 'DRAFT':
                return 'bg-gray-100 text-gray-800';
            case 'EXPIRED':
                return 'bg-orange-100 text-orange-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'CRITICAL':
                return 'bg-red-100 text-red-800';
            case 'HIGH':
                return 'bg-orange-100 text-orange-800';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800';
            case 'LOW':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Filter and sort approvals
    const filteredApprovals = approvals
        .filter(approval => {
            const matchesSearch = approval.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                approval.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                approval.projectManager.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = statusFilter === 'all' || approval.status === statusFilter;
            const matchesProject = projectFilter === 'all' || approval.projectCode === projectFilter;
            const matchesApprover = approverFilter === 'all' || approval.approvedBy === approverFilter;

            return matchesSearch && matchesStatus && matchesProject && matchesApprover;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.submittedDate || '1970-01-01') - new Date(a.submittedDate || '1970-01-01');
                case 'oldest':
                    return new Date(a.submittedDate || '1970-01-01') - new Date(b.submittedDate || '1970-01-01');
                case 'budget_high':
                    return b.totalBudget - a.totalBudget;
                case 'budget_low':
                    return a.totalBudget - b.totalBudget;
                case 'margin_high':
                    return b.currentMargin - a.currentMargin;
                case 'margin_low':
                    return a.currentMargin - b.currentMargin;
                case 'status':
                    return a.status.localeCompare(b.status);
                case 'priority':
                    const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                default:
                    return 0;
            }
        });

    // Calculate summary statistics
    const calculateSummary = () => {
        const totalApprovals = filteredApprovals.length;
        const totalBudget = filteredApprovals.reduce((sum, approval) => sum + approval.totalBudget, 0);
        const lockedCount = filteredApprovals.filter(approval => approval.status === 'LOCKED').length;
        const pendingCount = filteredApprovals.filter(approval => approval.status === 'PENDING_APPROVAL').length;
        const completedCount = filteredApprovals.filter(approval => approval.status === 'COMPLETED').length;
        const rejectedCount = filteredApprovals.filter(approval => approval.status === 'REJECTED').length;
        const avgMargin = totalApprovals > 0 ?
            filteredApprovals.reduce((sum, approval) => sum + approval.currentMargin, 0) / totalApprovals : 0;

        return {
            totalApprovals,
            totalBudget,
            lockedCount,
            pendingCount,
            completedCount,
            rejectedCount,
            avgMargin
        };
    };

    const summary = calculateSummary();

    const getChecklistProgress = (checklist) => {
        const completed = checklist.filter(item => item.checked).length;
        return Math.round((completed / checklist.length) * 100);
    };

    // Button handlers
    const handleViewApproval = (approvalId) => {
        const approval = approvals.find(a => a.id === approvalId);
        setSelectedApproval(approval);
        setShowViewModal(true);
    };

    const handleEditApproval = (approvalId) => {
        const approval = approvals.find(a => a.id === approvalId);
        setSelectedApproval(approval);
        setEditFormData({
            projectName: approval.projectName,
            projectManager: approval.projectManager,
            totalBudget: approval.totalBudget,
            currentMargin: approval.currentMargin,
            priority: approval.priority,
            category: approval.category
        });
        setShowEditModal(true);
    };

    const handleApprove = (approvalId) => {
        const approval = approvals.find(a => a.id === approvalId);
        setSelectedApproval(approval);
        setApprovalComment('');
        setShowApproveModal(true);
    };

    const handleReject = (approvalId) => {
        const approval = approvals.find(a => a.id === approvalId);
        setSelectedApproval(approval);
        setRejectionReason('');
        setShowRejectModal(true);
    };

    const confirmApproval = () => {
        if (!approvalComment.trim()) {
            alert('Please provide an approval comment.');
            return;
        }

        const updatedApprovals = approvals.map(approval => {
            if (approval.id === selectedApproval.id) {
                const newAuditEntry = {
                    action: 'Budget Approved',
                    user: 'Current User (Director)',
                    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    details: approvalComment
                };

                return {
                    ...approval,
                    status: 'LOCKED',
                    approvedBy: 'Current User',
                    approverRole: 'Director',
                    lockDate: new Date().toISOString().split('T')[0],
                    lockReason: approvalComment,
                    auditLog: [newAuditEntry, ...approval.auditLog]
                };
            }
            return approval;
        });

        setApprovals(updatedApprovals);
        setShowApproveModal(false);
        setSelectedApproval(null);
        setApprovalComment('');
        alert('Approval request has been approved successfully!');
    };

    const confirmRejection = () => {
        if (!rejectionReason.trim()) {
            alert('Please provide a rejection reason.');
            return;
        }

        const updatedApprovals = approvals.map(approval => {
            if (approval.id === selectedApproval.id) {
                const newAuditEntry = {
                    action: 'Budget Rejected',
                    user: 'Current User (Director)',
                    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    details: rejectionReason
                };

                return {
                    ...approval,
                    status: 'REJECTED',
                    lockReason: rejectionReason,
                    auditLog: [newAuditEntry, ...approval.auditLog]
                };
            }
            return approval;
        });

        setApprovals(updatedApprovals);
        setShowRejectModal(false);
        setSelectedApproval(null);
        setRejectionReason('');
        alert('Approval request has been rejected.');
    };

    const handleUpdateApproval = () => {
        if (!editFormData.projectName || !editFormData.projectManager || !editFormData.totalBudget) {
            alert('Please fill in all required fields.');
            return;
        }

        const updatedApprovals = approvals.map(approval => {
            if (approval.id === selectedApproval.id) {
                const newAuditEntry = {
                    action: 'Budget Updated',
                    user: 'Current User (Director)',
                    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                    details: 'Budget information updated'
                };

                return {
                    ...approval,
                    ...editFormData,
                    auditLog: [newAuditEntry, ...approval.auditLog]
                };
            }
            return approval;
        });

        setApprovals(updatedApprovals);
        setShowEditModal(false);
        setSelectedApproval(null);
        setEditFormData({});
        alert('Approval information has been updated successfully!');
    };

    const handleLockUnlock = (approvalId) => {
        const approval = approvals.find(a => a.id === approvalId);
        const isCurrentlyLocked = approval.status === 'LOCKED' || approval.status === 'COMPLETED';

        if (window.confirm(`Are you sure you want to ${isCurrentlyLocked ? 'unlock' : 'lock'} this budget?`)) {
            const updatedApprovals = approvals.map(a => {
                if (a.id === approvalId) {
                    const newAuditEntry = {
                        action: isCurrentlyLocked ? 'Budget Unlocked' : 'Budget Locked',
                        user: 'Current User (Director)',
                        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                        details: isCurrentlyLocked ? 'Budget unlocked for modifications' : 'Budget locked for protection'
                    };

                    return {
                        ...a,
                        status: isCurrentlyLocked ? 'UNDER_REVIEW' : 'LOCKED',
                        lockDate: isCurrentlyLocked ? null : new Date().toISOString().split('T')[0],
                        auditLog: [newAuditEntry, ...a.auditLog]
                    };
                }
                return a;
            });

            setApprovals(updatedApprovals);
            alert(`Budget has been ${isCurrentlyLocked ? 'unlocked' : 'locked'} successfully!`);
        }
    };

    const handleCreateNew = () => {
        console.log('Creating new approval request');
        // Navigate to approval creation form
    };

    const handleExportApprovals = () => {
        console.log('Exporting approvals');
        alert('Export functionality would be implemented here');
    };

    const navigate = useNavigate();

    // View Modal Component
    const ViewModal = () => (
        selectedApproval && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Approval Details</h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {/* Project Header */}
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{selectedApproval.projectName}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Project Code:</span>
                                    <div className="font-medium text-blue-600">{selectedApproval.projectCode}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Project Manager:</span>
                                    <div className="font-medium text-gray-600">{selectedApproval.projectManager}</div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Priority:</span>
                                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedApproval.priority)}`}>
                                        {selectedApproval.priority}
                                    </div>
                                </div>
                                <div>
                                    <span className="text-gray-600">Status:</span>
                                    <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedApproval.status)}`}>
                                        {selectedApproval.status.replace('_', ' ')}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Budget Information */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-lg sm:text-2xl font-bold text-blue-600">
                                    ${selectedApproval.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Total Budget</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-lg sm:text-2xl font-bold text-red-600">
                                    ${selectedApproval.actualCosts.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Actual Costs</div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 text-center">
                                <div className="text-lg sm:text-2xl font-bold text-green-600">
                                    {selectedApproval.currentMargin.toFixed(1)}%
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600">Current Margin</div>
                            </div>
                        </div>

                        {/* Checklist */}
                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Approval Checklist</h4>
                            <div className="space-y-2">
                                {selectedApproval.checklist.map((item, index) => (
                                    <div key={index} className="flex items-start gap-2 sm:gap-3">
                                        <i className={`bi ${item.checked ? 'bi-check-circle-fill text-green-600' : 'bi-circle text-gray-400'} flex-shrink-0 mt-0.5`}></i>
                                        <span className={`text-sm ${item.checked ? 'text-gray-900' : 'text-gray-500'}`}>{item.item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Audit Log */}
                        <div>
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Audit Log</h4>
                            <div className="space-y-3">
                                {selectedApproval.auditLog.map((log, index) => (
                                    <div key={index} className="border-l-4 border-blue-500 pl-3 sm:pl-4 py-2">
                                        <div className="font-medium text-gray-900 text-sm sm:text-base">{log.action}</div>
                                        <div className="text-xs sm:text-sm text-gray-600">{log.user}</div>
                                        <div className="text-xs sm:text-sm text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
                                        <div className="text-xs sm:text-sm text-gray-700 mt-1">{log.details}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Edit Modal Component
    const EditModal = () => (
        selectedApproval && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Approval</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                                <input
                                    type="text"
                                    value={editFormData.projectName || ''}
                                    onChange={(e) => setEditFormData({...editFormData, projectName: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Project Manager *</label>
                                <input
                                    type="text"
                                    value={editFormData.projectManager || ''}
                                    onChange={(e) => setEditFormData({...editFormData, projectManager: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Total Budget *</label>
                                <input
                                    type="number"
                                    value={editFormData.totalBudget || ''}
                                    onChange={(e) => setEditFormData({...editFormData, totalBudget: parseFloat(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Margin (%)</label>
                                <input
                                    type="number"
                                    value={editFormData.currentMargin || ''}
                                    onChange={(e) => setEditFormData({...editFormData, currentMargin: parseFloat(e.target.value)})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                <select
                                    value={editFormData.priority || ''}
                                    onChange={(e) => setEditFormData({...editFormData, priority: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                >
                                    <option value="LOW">LOW</option>
                                    <option value="MEDIUM">MEDIUM</option>
                                    <option value="HIGH">HIGH</option>
                                    <option value="CRITICAL">CRITICAL</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={editFormData.category || ''}
                                    onChange={(e) => setEditFormData({...editFormData, category: e.target.value})}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-600"
                                >
                                    <option value="CONSTRUCTION">CONSTRUCTION</option>
                                    <option value="RENOVATION">RENOVATION</option>
                                    <option value="FITOUT">FITOUT</option>
                                    <option value="HEALTHCARE">HEALTHCARE</option>
                                    <option value="EDUCATION">EDUCATION</option>
                                    <option value="RESIDENTIAL">RESIDENTIAL</option>
                                    <option value="MANUFACTURING">MANUFACTURING</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateApproval}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Update Approval
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Approve Modal Component
    const ApproveModal = () => (
        selectedApproval && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-md">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Approve Budget</h2>
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base">{selectedApproval.projectName}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{selectedApproval.projectCode}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Approval Comment *</label>
                            <textarea
                                value={approvalComment}
                                onChange={(e) => setApprovalComment(e.target.value)}
                                rows="4"
                                placeholder="Please provide your approval comment..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmApproval}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                            >
                                Approve Budget
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Reject Modal Component
    const RejectModal = () => (
        selectedApproval && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-md">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Reject Budget</h2>
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                        <div className="bg-red-50 rounded-lg p-3 sm:p-4">
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base">{selectedApproval.projectName}</h3>
                            <p className="text-xs sm:text-sm text-gray-600">{selectedApproval.projectCode}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
                            <textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows="4"
                                placeholder="Please provide the reason for rejection..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRejection}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                Reject Budget
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">APPROVAL & LOCKING</h1>
                            <p className="text-sm sm:text-base text-gray-600">Manage budget approvals and project locking status</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">

                            <button   onClick={() => navigate('/approval-locking')}
                                      className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors">
                                <i className="bi bi-plus-circle mr-2"></i>
                                NEW APPROVAL
                            </button>
                            <button
                                onClick={handleExportApprovals}
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-gray-700 transition-colors "
                            >
                                <i className="bi bi-download mr-2"></i>
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
                        <div className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">TOTAL</h3>
                            <p className="text-lg sm:text-2xl font-bold text-blue-600">{summary.totalApprovals}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 sm:p-4 text-center">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">LOCKED</h3>
                            <p className="text-lg sm:text-2xl font-bold text-green-600">{summary.lockedCount}</p>
                        </div>
                        <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 text-center">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">PENDING</h3>
                            <p className="text-lg sm:text-2xl font-bold text-yellow-600">{summary.pendingCount}</p>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 sm:p-4 text-center">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">COMPLETED</h3>
                            <p className="text-lg sm:text-2xl font-bold text-purple-600">{summary.completedCount}</p>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 sm:p-4 text-center">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">REJECTED</h3>
                            <p className="text-lg sm:text-2xl font-bold text-red-600">{summary.rejectedCount}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 sm:p-4 text-center">
                            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2">AVG MARGIN</h3>
                            <p className="text-lg sm:text-2xl font-bold text-orange-600">{summary.avgMargin.toFixed(1)}%</p>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search by project name, code, or manager..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {/* Status Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                STATUS
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 text-gray-600 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {statusOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Project Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                PROJECT
                            </label>
                            <select
                                value={projectFilter}
                                onChange={(e) => setProjectFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {projectOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Approver Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                APPROVER
                            </label>
                            <select
                                value={approverFilter}
                                onChange={(e) => setApproverFilter(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border text-gray-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {approverOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                SORT BY
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-gray-600 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                {/* Approvals Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {filteredApprovals.map((approval) => (
                        <div key={approval.id} className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 hover:shadow-lg transition-shadow">

                            {/* Approval Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 truncate">
                                        {approval.projectName}
                                    </h3>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs sm:text-sm font-medium text-gray-600">Code:</span>
                                        <span className="text-xs sm:text-sm font-bold text-blue-600">{approval.projectCode}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 sm:gap-2 ml-2">
                                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                                        {approval.status.replace('_', ' ')}
                                    </div>
                                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval.priority)}`}>
                                        {approval.priority}
                                    </div>
                                </div>
                            </div>

                            {/* Budget Summary */}
                            <div className="mb-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div className="text-center">
                                        <div className="text-sm sm:text-lg font-bold text-blue-600">
                                            ${approval.totalBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">Total Budget</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-sm sm:text-lg font-bold text-green-600">
                                            {approval.currentMargin.toFixed(1)}%
                                        </div>
                                        <div className="text-xs sm:text-sm text-gray-600">Current Margin</div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Details */}
                            <div className="space-y-2 sm:space-y-3 mb-4">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-person text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700 truncate">PM: {approval.projectManager}</span>
                                </div>

                                {approval.submittedDate && (
                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-calendar text-gray-500 flex-shrink-0"></i>
                                        <span className="text-xs sm:text-sm text-gray-700">
                                            Submitted: {new Date(approval.submittedDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                {approval.approvedBy && (
                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-person-check text-gray-500 flex-shrink-0"></i>
                                        <span className="text-xs sm:text-sm text-gray-700 truncate">
                                            Approved by: {approval.approvedBy} ({approval.approverRole})
                                        </span>
                                    </div>
                                )}

                                {approval.lockDate && (
                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-lock text-gray-500 flex-shrink-0"></i>
                                        <span className="text-xs sm:text-sm text-gray-700">
                                            Locked: {new Date(approval.lockDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2">
                                    <i className="bi bi-tag text-gray-500 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm text-gray-700">{approval.category}</span>
                                </div>
                            </div>

                            {/* Checklist Progress */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Checklist Progress</span>
                                    <span className="text-xs sm:text-sm text-gray-600">{getChecklistProgress(approval.checklist)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${getChecklistProgress(approval.checklist)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Lock Reason */}
                            {approval.lockReason && (
                                <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                                    <div className="text-xs sm:text-sm font-medium text-yellow-700 mb-1">Reason:</div>
                                    <div className="text-xs sm:text-sm text-yellow-600">{approval.lockReason}</div>
                                </div>
                            )}

                            {/* Recent Audit Activity */}
                            <div className="mb-4 p-3 border border-gray-200 rounded-lg">
                                <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Recent Activity:</div>
                                <div className="space-y-1">
                                    {approval.auditLog.slice(0, 2).map((log, index) => (
                                        <div key={index} className="text-xs text-gray-600">
                                            <span className="font-medium">{log.action}</span> - {log.user}
                                            <div className="text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Financial Summary */}
                            <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 text-center">
                                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                                        ${approval.actualCosts.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-xs text-gray-600">Actual Costs</div>
                                </div>
                                <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                                    <div className="text-xs sm:text-sm font-bold text-gray-900">
                                        ${(approval.totalBudget - approval.actualCosts).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="text-xs text-gray-600">Remaining</div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => handleViewApproval(approval.id)}
                                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                                >
                                    <i className="bi bi-eye mr-1"></i>
                                    View
                                </button>
                                <button
                                    onClick={() => handleEditApproval(approval.id)}
                                    className="flex-1 px-3 py-2 bg-gray-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-gray-700 transition-colors"
                                >
                                    <i className="bi bi-pencil mr-1"></i>
                                    Edit
                                </button>
                                {approval.status === 'PENDING_APPROVAL' && (
                                    <>
                                        <button
                                            onClick={() => handleApprove(approval.id)}
                                            className="flex-1 px-3 py-2 bg-green-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-green-700 transition-colors"
                                        >
                                            <i className="bi bi-check-circle mr-1"></i>
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleReject(approval.id)}
                                            className="flex-1 px-3 py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-red-700 transition-colors"
                                        >
                                            <i className="bi bi-x-circle mr-1"></i>
                                            Reject
                                        </button>
                                    </>
                                )}
                                {(approval.status === 'LOCKED' || approval.status === 'COMPLETED') && (
                                    <button
                                        onClick={() => handleLockUnlock(approval.id)}
                                        className="flex-1 px-3 py-2 bg-orange-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-orange-700 transition-colors"
                                    >
                                        <i className="bi bi-unlock mr-1"></i>
                                        Unlock
                                    </button>
                                )}
                                {approval.status === 'UNDER_REVIEW' && (
                                    <button
                                        onClick={() => handleLockUnlock(approval.id)}
                                        className="flex-1 px-3 py-2 bg-green-600 text-white text-xs sm:text-sm font-medium rounded hover:bg-green-700 transition-colors"
                                    >
                                        <i className="bi bi-lock mr-1"></i>
                                        Lock
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredApprovals.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-clipboard-x text-4xl sm:text-6xl text-gray-400 mb-4"></i>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No approvals found</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">
                            No approval requests match your current filters. Try adjusting your search criteria.
                        </p>
                        <button
                            onClick={handleCreateNew}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <i className="bi bi-plus-circle mr-2"></i>
                            Create New Request
                        </button>
                    </div>
                )}

                {/* Modals */}
                {showViewModal && <ViewModal />}
                {showEditModal && <EditModal />}
                {showApproveModal && <ApproveModal />}
                {showRejectModal && <RejectModal />}
            </div>
        </div>
    );
};

export default ApprovalLockingListing;

