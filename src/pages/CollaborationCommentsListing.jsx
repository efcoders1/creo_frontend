import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CollaborationCommentsListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [authorFilter, setAuthorFilter] = useState('all');
    const [projectFilter, setProjectFilter] = useState('all');
    const [dateRange, setDateRange] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Modal states
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showReplyModal, setShowReplyModal] = useState(false);
    const [selectedComment, setSelectedComment] = useState(null);

    // Form states
    const [editCommentContent, setEditCommentContent] = useState('');
    const [replyContent, setReplyContent] = useState('');

    // Dummy collaboration comments data
    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'EMMA DAVIS',
            role: 'DESIGNER',
            timestamp: '2025-01-16 15:30:00',
            content: 'Design mockups for the lobby are ready for review. @Michael Chen @Sarah Johnson please provide feedback by Friday.',
            type: 'Design Review',
            likes: 3,
            replies: 2,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: null,
            taggedUsers: ['Michael Chen', 'Sarah Johnson'],
            isEdited: false,
            priority: 'HIGH',
            status: 'ACTIVE',
            category: 'DESIGN'
        },
        {
            id: 2,
            author: 'DAVID BROWN',
            role: 'CONTRACTOR',
            timestamp: '2025-01-16 14:15:00',
            content: '@Robert Smith @Sarah Johnson The electrical contractor needs updated plans. Current drawings don\'t match the smart building requirements.',
            type: 'Technical Issue',
            likes: 1,
            replies: 4,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: 'electrical_plans_v2.pdf',
            taggedUsers: ['Robert Smith', 'Sarah Johnson'],
            isEdited: false,
            priority: 'CRITICAL',
            status: 'ACTIVE',
            category: 'TECHNICAL'
        },
        {
            id: 3,
            author: 'ROBERT SMITH',
            role: 'ARCHITECT',
            timestamp: '2025-01-16 13:45:00',
            content: 'Budget Line 4: Electrical Category ($12,000) - The electrical specifications need clarification. Current budget allocation might not cover the smart building features.',
            type: 'Budget Alert',
            likes: 5,
            replies: 1,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: 'budget_line_4_analysis.xlsx',
            taggedUsers: ['Michael Chen', 'Sarah Johnson', 'David Brown'],
            isEdited: true,
            priority: 'HIGH',
            status: 'RESOLVED',
            category: 'BUDGET'
        },
        {
            id: 4,
            author: 'SARAH JOHNSON',
            role: 'PROJECT MANAGER',
            timestamp: '2025-01-16 12:20:00',
            content: 'Weekly progress meeting scheduled for Thursday 2 PM. All stakeholders please confirm attendance. @Emma Davis @David Brown @Robert Smith',
            type: 'Schedule Update',
            likes: 2,
            replies: 6,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: 'meeting_agenda_week3.pdf',
            taggedUsers: ['Emma Davis', 'David Brown', 'Robert Smith'],
            isEdited: false,
            priority: 'MEDIUM',
            status: 'ACTIVE',
            category: 'SCHEDULE'
        },
        {
            id: 5,
            author: 'MICHAEL CHEN',
            role: 'DIRECTOR',
            timestamp: '2025-01-16 11:10:00',
            content: 'Budget approval completed for Phase 1. Moving forward with contractor selection. Great work team! @Sarah Johnson please coordinate next steps.',
            type: 'General Discussion',
            likes: 8,
            replies: 3,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: null,
            taggedUsers: ['Sarah Johnson'],
            isEdited: false,
            priority: 'LOW',
            status: 'ACTIVE',
            category: 'GENERAL'
        },
        {
            id: 6,
            author: 'LISA WONG',
            role: 'QUALITY INSPECTOR',
            timestamp: '2025-01-16 10:30:00',
            content: 'Quality inspection failed for concrete foundation. Issues found with reinforcement placement. @David Brown immediate action required.',
            type: 'Quality Control',
            likes: 0,
            replies: 8,
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            attachment: 'quality_inspection_report_001.pdf',
            taggedUsers: ['David Brown', 'Sarah Johnson'],
            isEdited: false,
            priority: 'CRITICAL',
            status: 'ACTIVE',
            category: 'QUALITY'
        },
        {
            id: 7,
            author: 'ALEX RODRIGUEZ',
            role: 'SAFETY OFFICER',
            timestamp: '2025-01-16 09:45:00',
            content: 'Safety concern: Workers not wearing proper PPE on site. @David Brown please ensure all contractors follow safety protocols immediately.',
            type: 'Safety Concern',
            likes: 4,
            replies: 2,
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            attachment: 'safety_violation_photos.zip',
            taggedUsers: ['David Brown', 'Michael Chen'],
            isEdited: false,
            priority: 'CRITICAL',
            status: 'ACTIVE',
            category: 'SAFETY'
        },
        {
            id: 8,
            author: 'JENNIFER LEE',
            role: 'CLIENT REPRESENTATIVE',
            timestamp: '2025-01-16 08:30:00',
            content: 'Client requests change to lobby design - wants more natural lighting. @Emma Davis can you provide updated mockups with skylights?',
            type: 'Change Request',
            likes: 1,
            replies: 5,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: 'client_feedback_lobby.pdf',
            taggedUsers: ['Emma Davis', 'Robert Smith'],
            isEdited: false,
            priority: 'MEDIUM',
            status: 'ACTIVE',
            category: 'DESIGN'
        },
        {
            id: 9,
            author: 'TOM ANDERSON',
            role: 'ELECTRICAL CONTRACTOR',
            timestamp: '2025-01-15 16:20:00',
            content: 'Electrical rough-in completed for floors 1-3. Ready for inspection. @Lisa Wong please schedule quality check.',
            type: 'Technical Issue',
            likes: 2,
            replies: 1,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: 'electrical_completion_photos.zip',
            taggedUsers: ['Lisa Wong', 'Sarah Johnson'],
            isEdited: false,
            priority: 'MEDIUM',
            status: 'RESOLVED',
            category: 'TECHNICAL'
        },
        {
            id: 10,
            author: 'MARIA GARCIA',
            role: 'INTERIOR DESIGNER',
            timestamp: '2025-01-15 14:45:00',
            content: 'Material samples arrived for conference rooms. @Jennifer Lee @Emma Davis please review and approve selections by Monday.',
            type: 'Design Review',
            likes: 3,
            replies: 4,
            projectCode: '25-01-0001',
            projectName: 'Office Building Construction',
            attachment: 'material_samples_catalog.pdf',
            taggedUsers: ['Jennifer Lee', 'Emma Davis'],
            isEdited: false,
            priority: 'MEDIUM',
            status: 'ACTIVE',
            category: 'DESIGN'
        },
        {
            id: 11,
            author: 'STEVE WILSON',
            role: 'PLUMBING CONTRACTOR',
            timestamp: '2025-01-15 13:15:00',
            content: 'Plumbing installation delayed due to material shortage. New delivery date is next Wednesday. @Sarah Johnson please update schedule.',
            type: 'Schedule Update',
            likes: 0,
            replies: 3,
            projectCode: '25-01-0002',
            projectName: 'Warehouse Renovation',
            attachment: 'material_delivery_schedule.pdf',
            taggedUsers: ['Sarah Johnson', 'Michael Chen'],
            isEdited: true,
            priority: 'HIGH',
            status: 'ACTIVE',
            category: 'SCHEDULE'
        },
        {
            id: 12,
            author: 'RACHEL BROWN',
            role: 'HVAC TECHNICIAN',
            timestamp: '2025-01-15 11:30:00',
            content: 'HVAC system testing completed successfully. All zones maintaining proper temperature and airflow. System ready for final inspection.',
            type: 'Quality Control',
            likes: 6,
            replies: 0,
            projectCode: '25-01-0003',
            projectName: 'Retail Store Fitout',
            attachment: 'hvac_test_results.pdf',
            taggedUsers: ['Lisa Wong', 'Sarah Johnson'],
            isEdited: false,
            priority: 'LOW',
            status: 'RESOLVED',
            category: 'QUALITY'
        }
    ]);

    const typeOptions = [
        { value: 'all', label: 'ALL TYPES', color: 'bg-gray-600' },
        { value: 'General Discussion', label: 'GENERAL DISCUSSION', color: 'bg-gray-600' },
        { value: 'Design Review', label: 'DESIGN REVIEW', color: 'bg-blue-600' },
        { value: 'Technical Issue', label: 'TECHNICAL ISSUE', color: 'bg-red-600' },
        { value: 'Budget Alert', label: 'BUDGET ALERT', color: 'bg-yellow-600' },
        { value: 'Schedule Update', label: 'SCHEDULE UPDATE', color: 'bg-green-600' },
        { value: 'Quality Control', label: 'QUALITY CONTROL', color: 'bg-purple-600' },
        { value: 'Safety Concern', label: 'SAFETY CONCERN', color: 'bg-red-600' },
        { value: 'Change Request', label: 'CHANGE REQUEST', color: 'bg-orange-600' }
    ];

    const authorOptions = [
        { value: 'all', label: 'ALL AUTHORS' },
        { value: 'EMMA DAVIS', label: 'Emma Davis (Designer)' },
        { value: 'DAVID BROWN', label: 'David Brown (Contractor)' },
        { value: 'ROBERT SMITH', label: 'Robert Smith (Architect)' },
        { value: 'SARAH JOHNSON', label: 'Sarah Johnson (Project Manager)' },
        { value: 'MICHAEL CHEN', label: 'Michael Chen (Director)' },
        { value: 'LISA WONG', label: 'Lisa Wong (Quality Inspector)' },
        { value: 'ALEX RODRIGUEZ', label: 'Alex Rodriguez (Safety Officer)' },
        { value: 'JENNIFER LEE', label: 'Jennifer Lee (Client Representative)' },
        { value: 'TOM ANDERSON', label: 'Tom Anderson (Electrical Contractor)' },
        { value: 'MARIA GARCIA', label: 'Maria Garcia (Interior Designer)' },
        { value: 'STEVE WILSON', label: 'Steve Wilson (Plumbing Contractor)' },
        { value: 'RACHEL BROWN', label: 'Rachel Brown (HVAC Technician)' }
    ];

    const projectOptions = [
        { value: 'all', label: 'ALL PROJECTS' },
        { value: '25-01-0001', label: '25-01-0001 - Office Building Construction' },
        { value: '25-01-0002', label: '25-01-0002 - Warehouse Renovation' },
        { value: '25-01-0003', label: '25-01-0003 - Retail Store Fitout' }
    ];

    const dateRangeOptions = [
        { value: 'all', label: 'ALL TIME' },
        { value: 'today', label: 'TODAY' },
        { value: 'week', label: 'THIS WEEK' },
        { value: 'month', label: 'THIS MONTH' }
    ];

    const sortOptions = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'most_liked', label: 'Most Liked' },
        { value: 'most_replies', label: 'Most Replies' },
        { value: 'author', label: 'Author Name' },
        { value: 'type', label: 'Comment Type' },
        { value: 'priority', label: 'Priority' }
    ];

    // Filter and sort comments
    const filteredComments = comments
        .filter(comment => {
            const matchesSearch = comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.projectCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.taggedUsers.some(user => user.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesType = typeFilter === 'all' || comment.type === typeFilter;
            const matchesAuthor = authorFilter === 'all' || comment.author === authorFilter;
            const matchesProject = projectFilter === 'all' || comment.projectCode === projectFilter;

            // Date range filtering
            let matchesDate = true;
            if (dateRange !== 'all') {
                const commentDate = new Date(comment.timestamp);
                const today = new Date();

                switch (dateRange) {
                    case 'today':
                        matchesDate = commentDate.toDateString() === today.toDateString();
                        break;
                    case 'week':
                        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                        matchesDate = commentDate >= weekAgo;
                        break;
                    case 'month':
                        matchesDate = commentDate.getMonth() === today.getMonth() &&
                            commentDate.getFullYear() === today.getFullYear();
                        break;
                }
            }

            return matchesSearch && matchesType && matchesAuthor && matchesProject && matchesDate;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.timestamp) - new Date(a.timestamp);
                case 'oldest':
                    return new Date(a.timestamp) - new Date(b.timestamp);
                case 'most_liked':
                    return b.likes - a.likes;
                case 'most_replies':
                    return b.replies - a.replies;
                case 'author':
                    return a.author.localeCompare(b.author);
                case 'type':
                    return a.type.localeCompare(b.type);
                case 'priority':
                    const priorityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
                    return (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                default:
                    return 0;
            }
        });

    const getCommentTypeColor = (type) => {
        switch (type) {
            case 'Design Review': return 'bg-blue-100 text-blue-800';
            case 'Technical Issue': return 'bg-red-100 text-red-800';
            case 'Budget Alert': return 'bg-yellow-100 text-yellow-800';
            case 'Schedule Update': return 'bg-green-100 text-green-800';
            case 'Quality Control': return 'bg-purple-100 text-purple-800';
            case 'Safety Concern': return 'bg-red-100 text-red-800';
            case 'Change Request': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'DESIGNER': return 'text-blue-600';
            case 'CONTRACTOR': return 'text-green-600';
            case 'ARCHITECT': return 'text-purple-600';
            case 'PROJECT MANAGER': return 'text-orange-600';
            case 'DIRECTOR': return 'text-red-600';
            case 'QUALITY INSPECTOR': return 'text-purple-600';
            case 'SAFETY OFFICER': return 'text-red-600';
            case 'CLIENT REPRESENTATIVE': return 'text-blue-600';
            case 'ELECTRICAL CONTRACTOR': return 'text-yellow-600';
            case 'INTERIOR DESIGNER': return 'text-pink-600';
            case 'PLUMBING CONTRACTOR': return 'text-blue-600';
            case 'HVAC TECHNICIAN': return 'text-green-600';
            default: return 'text-gray-600';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'CRITICAL': return 'bg-red-100 text-red-800';
            case 'HIGH': return 'bg-orange-100 text-orange-800';
            case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
            case 'LOW': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'ACTIVE': return 'bg-green-100 text-green-800';
            case 'RESOLVED': return 'bg-blue-100 text-blue-800';
            case 'ARCHIVED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const calculateSummary = () => {
        const totalComments = filteredComments.length;
        const totalLikes = filteredComments.reduce((sum, comment) => sum + comment.likes, 0);
        const totalReplies = filteredComments.reduce((sum, comment) => sum + comment.replies, 0);
        const activeComments = filteredComments.filter(comment => comment.status === 'ACTIVE').length;
        const criticalComments = filteredComments.filter(comment => comment.priority === 'CRITICAL').length;

        return {
            totalComments,
            totalLikes,
            totalReplies,
            activeComments,
            criticalComments
        };
    };

    const navigate = useNavigate();

    const summary = calculateSummary();

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            return `${diffInMinutes}m ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `${diffInDays}d ago`;
        }
    };

    // Button handlers
    const handleViewComment = (commentId) => {
        const comment = comments.find(c => c.id === commentId);
        setSelectedComment(comment);
        setShowViewModal(true);
    };

    const handleLikeComment = (commentId) => {
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
            )
        );
        alert('Comment liked!');
    };

    const handleReplyComment = (commentId) => {
        const comment = comments.find(c => c.id === commentId);
        setSelectedComment(comment);
        setReplyContent('');
        setShowReplyModal(true);
    };

    const handleEditComment = (commentId) => {
        const comment = comments.find(c => c.id === commentId);
        setSelectedComment(comment);
        setEditCommentContent(comment.content);
        setShowEditModal(true);
    };

    const confirmEdit = () => {
        if (!editCommentContent.trim()) {
            alert('Comment content cannot be empty.');
            return;
        }
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === selectedComment.id ? { ...comment, content: editCommentContent, isEdited: true } : comment
            )
        );
        setShowEditModal(false);
        setSelectedComment(null);
        setEditCommentContent('');
        alert('Comment updated successfully!');
    };

    const confirmReply = () => {
        if (!replyContent.trim()) {
            alert('Reply content cannot be empty.');
            return;
        }
        // In a real application, you would add a new comment object here
        // For now, we'll just increment the reply count of the parent comment
        setComments(prevComments =>
            prevComments.map(comment =>
                comment.id === selectedComment.id ? { ...comment, replies: comment.replies + 1 } : comment
            )
        );
        setShowReplyModal(false);
        setSelectedComment(null);
        setReplyContent('');
        alert('Reply posted successfully!');
    };

    const handleCreateNew = () => {
        console.log('Creating new comment');
        // Navigate to comment creation form
    };

    const handleExportComments = () => {
        console.log('Exporting comments');
        alert('Export functionality would be implemented here');
    };

    // View Modal Component
    const ViewModal = () => (
        selectedComment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Comment Details</h2>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        {/* Comment Header */}
                        <div className="flex items-start gap-3 sm:gap-4 mb-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                                {selectedComment.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{selectedComment.author}</h3>
                                    <span className={`text-xs sm:text-sm font-medium ${getRoleColor(selectedComment.role)}`}>
                                        {selectedComment.role}
                                    </span>
                                    {selectedComment.isEdited && (
                                        <span className="text-xs text-gray-500">(edited)</span>
                                    )}
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                    <span>{formatTimestamp(selectedComment.timestamp)}</span>
                                    <span className="hidden sm:inline">•</span>
                                    <span className="truncate">{selectedComment.projectCode} - {selectedComment.projectName}</span>
                                </div>
                            </div>
                        </div>

                        {/* Comment Content */}
                        <div className="mb-4">
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{selectedComment.content}</p>
                        </div>

                        {/* Tagged Users */}
                        {selectedComment.taggedUsers.length > 0 && (
                            <div className="mb-4">
                                <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Tagged Users:</div>
                                <div className="flex flex-wrap gap-2">
                                    {selectedComment.taggedUsers.map((user, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                            @{user}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Attachment */}
                        {selectedComment.attachment && (
                            <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <i className="bi bi-paperclip text-gray-600 flex-shrink-0"></i>
                                    <span className="text-xs sm:text-sm font-medium text-gray-700">Attachment:</span>
                                    <span className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 cursor-pointer truncate">
                                        {selectedComment.attachment}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Comment Stats */}
                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4 text-xs sm:text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                                <i className="bi bi-hand-thumbs-up"></i>
                                <span>{selectedComment.likes} likes</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="bi bi-chat"></i>
                                <span>{selectedComment.replies} replies</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <i className="bi bi-tag"></i>
                                <span>{selectedComment.category}</span>
                            </div>
                        </div>

                        {/* Type, Priority, Status */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getCommentTypeColor(selectedComment.type)}`}>
                                    {selectedComment.type}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 mt-2">Type</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedComment.priority)}`}>
                                    {selectedComment.priority}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 mt-2">Priority</div>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedComment.status)}`}>
                                    {selectedComment.status}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-600 mt-2">Status</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Edit Modal Component
    const EditModal = () => (
        selectedComment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Edit Comment</h2>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Comment Content *</label>
                            <textarea
                                value={editCommentContent}
                                onChange={(e) => setEditCommentContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                rows="6"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmEdit}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );

    // Reply Modal Component
    const ReplyModal = () => (
        selectedComment && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-2xl">
                    <div className="p-4 sm:p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Reply to Comment</h2>
                            <button
                                onClick={() => setShowReplyModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <i className="bi bi-x-lg text-xl"></i>
                            </button>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-4">
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Replying to:</p>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{selectedComment.content}</p>
                        </div>
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Your Reply *</label>
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                                rows="4"
                                placeholder="Type your reply here..."
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                            <button
                                onClick={() => setShowReplyModal(false)}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmReply}
                                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700"
                            >
                                Post Reply
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
                {/* Page Header */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-chat-dots text-green-600 text-lg"></i>
                            <h1 className="text-lg sm:text-2xl font-semibold text-gray-900">COLLABORATION COMMENTS</h1>
                            <span className="bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium">
                                ALL USERS
                            </span>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                            <button
                                onClick={handleExportComments}
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <i className="bi bi-download mr-2"></i>
                                EXPORT COMMENTS
                            </button>

                            <button onClick={() => navigate('/collaboration-comments')} className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white font-medium text-sm sm:text-base rounded-lg hover:bg-blue-700 transition-colors">
                                <i className="bi bi-plus-circle mr-2"></i>
                                ADD COMMENT
                            </button>
                        </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600">Manage project collaboration and team communication</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6 mb-6">
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL COMMENTS</h3>
                        <p className="text-lg sm:text-2xl font-bold text-blue-600">{summary.totalComments}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL LIKES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-green-600">{summary.totalLikes}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">TOTAL REPLIES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-purple-600">{summary.totalReplies}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">ACTIVE COMMENTS</h3>
                        <p className="text-lg sm:text-2xl font-bold text-orange-600">{summary.activeComments}</p>
                    </div>
                    <div className="bg-white rounded-lg border border-gray-300 p-3 sm:p-6 text-center col-span-2 sm:col-span-1">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">CRITICAL ISSUES</h3>
                        <p className="text-lg sm:text-2xl font-bold text-red-600">{summary.criticalComments}</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-funnel text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900">FILTERS & SEARCH</h2>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search comments, authors, projects, or tagged users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                        {/* Type Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                COMMENT TYPE
                            </label>
                            <select
                                value={typeFilter}
                                onChange={(e) => setTypeFilter(e.target.value)}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                {typeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Author Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                AUTHOR
                            </label>
                            <select
                                value={authorFilter}
                                onChange={(e) => setAuthorFilter(e.target.value)}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                {authorOptions.map((option) => (
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
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                {projectOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Range Filter */}
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                DATE RANGE
                            </label>
                            <select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                            >
                                {dateRangeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                SORT BY
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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

                {/* Comments List */}
                <div className="space-y-4 sm:space-y-6">
                    {filteredComments.map((comment) => (
                        <div key={comment.id} className="bg-white rounded-lg border border-gray-300 p-4 sm:p-6 hover:shadow-lg transition-shadow">
                            {/* Comment Header */}
                            <div className="flex items-start gap-3 sm:gap-4 mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                                    {comment.author.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                        <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">{comment.author}</h3>
                                        <span className={`text-xs sm:text-sm font-medium ${getRoleColor(comment.role)}`}>
                                            {comment.role}
                                        </span>
                                        {comment.isEdited && (
                                            <span className="text-xs text-gray-500">(edited)</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                                        <span>{formatTimestamp(comment.timestamp)}</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span className="truncate">{comment.projectCode} - {comment.projectName}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 sm:gap-2">
                                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getCommentTypeColor(comment.type)}`}>
                                        {comment.type}
                                    </div>
                                    <div className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(comment.priority)}`}>
                                        {comment.priority}
                                    </div>
                                </div>
                            </div>

                            {/* Comment Content */}
                            <div className="mb-4">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{comment.content}</p>
                            </div>

                            {/* Tagged Users */}
                            {comment.taggedUsers.length > 0 && (
                                <div className="mb-4">
                                    <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Tagged:</div>
                                    <div className="flex flex-wrap gap-1 sm:gap-2">
                                        {comment.taggedUsers.map((user, index) => (
                                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                                @{user}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Attachment */}
                            {comment.attachment && (
                                <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <i className="bi bi-paperclip text-gray-600 flex-shrink-0"></i>
                                        <span className="text-xs sm:text-sm font-medium text-gray-700">Attachment:</span>
                                        <span className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 cursor-pointer truncate">
                                            {comment.attachment}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Comment Stats and Actions */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-100">
                                <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <i className="bi bi-hand-thumbs-up"></i>
                                        <span>{comment.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <i className="bi bi-chat"></i>
                                        <span>{comment.replies}</span>
                                    </div>
                                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                                        {comment.status}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleViewComment(comment.id)}
                                        className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                                    >
                                        <i className="bi bi-eye mr-1"></i>
                                        View
                                    </button>
                                    <button
                                        onClick={() => handleLikeComment(comment.id)}
                                        className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                                    >
                                        <i className="bi bi-hand-thumbs-up mr-1"></i>
                                        Like
                                    </button>
                                    <button
                                        onClick={() => handleReplyComment(comment.id)}
                                        className="px-3 py-1 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors"
                                    >
                                        <i className="bi bi-reply mr-1"></i>
                                        Reply
                                    </button>
                                    <button
                                        onClick={() => handleEditComment(comment.id)}
                                        className="px-3 py-1 bg-gray-600 text-white text-xs font-medium rounded hover:bg-gray-700 transition-colors"
                                    >
                                        <i className="bi bi-pencil mr-1"></i>
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredComments.length === 0 && (
                    <div className="bg-white rounded-lg border border-gray-300 p-8 sm:p-12 text-center">
                        <i className="bi bi-chat-x text-4xl sm:text-6xl text-gray-400 mb-4"></i>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No comments found</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-6">
                            No comments match your current filters. Try adjusting your search criteria.
                        </p>
                        <button
                            onClick={handleCreateNew}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <i className="bi bi-plus-circle mr-2"></i>
                            Add First Comment
                        </button>
                    </div>
                )}

                {/* Modals */}
                {showViewModal && <ViewModal />}
                {showEditModal && <EditModal />}
                {showReplyModal && <ReplyModal />}
            </div>
        </div>
    );
};

export default CollaborationCommentsListing;

