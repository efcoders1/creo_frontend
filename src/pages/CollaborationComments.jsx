import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from "flowbite-react";
import { Button, Badge } from 'flowbite-react';

const CollaborationComments = () => {
    const [commentForm, setCommentForm] = useState({
        type: 'General Discussion',
        comment: '',
        tagUsers: ''
    });

    const [comments, setComments] = useState([
        {
            id: 1,
            author: 'EMMA DAVIS',
            role: 'DESIGNER',
            timestamp: '1hr ago',
            content: 'Design mockups for the lobby are ready for review. @Michael Chen @Sarah Johnson please provide feedback by Friday.',
            type: 'Design Review',
            likes: 0,
            replies: []
        },
        {
            id: 2,
            author: 'DAVID BROWN',
            role: 'CONTRACTOR',
            timestamp: '2hr ago',
            content: '@Robert Smith @Sarah Johnson The electrical contractor needs updated plans. Current drawings don\'t match the smart building requirements.',
            type: 'Technical Issue',
            likes: 0,
            replies: []
        },
        {
            id: 3,
            author: 'ROBERT SMITH',
            role: 'ARCHITECT',
            timestamp: '3hr ago',
            content: 'Budget Line 4: Electrical Category ($12,000)',
            attachment: 'The electrical specifications need clarification. Current budget allocation might not cover the smart building features.',
            type: 'Budget Alert',
            likes: 0,
            replies: []
        }
    ]);

    const [projectStats] = useState({
        jobCode: '25-01-0001',
        projectName: 'Office Building Construction',
        totalComments: 8,
        activeUsers: 7
    });

    const commentTypes = [
        'General Discussion',
        'Design Review',
        'Technical Issue',
        'Budget Alert',
        'Schedule Update',
        'Quality Control',
        'Safety Concern',
        'Change Request'
    ];

    const handleFormChange = (field, value) => {
        setCommentForm(prev => ({ ...prev, [field]: value }));
    };

    const postComment = () => {
        if (commentForm.comment.trim()) {
            const newComment = {
                id: comments.length + 1,
                author: 'CURRENT USER',
                role: 'PROJECT MANAGER',
                timestamp: 'Just now',
                content: commentForm.comment,
                type: commentForm.type,
                likes: 0,
                replies: []
            };
            setComments(prev => [newComment, ...prev]);
            setCommentForm({ type: 'General Discussion', comment: '', tagUsers: '' });
        }
    };

    const clearForm = () => {
        setCommentForm({ type: 'General Discussion', comment: '', tagUsers: '' });
    };

    const likeComment = (commentId) => {
        setComments(prev => prev.map(comment =>
            comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
        ));
    };

    const refreshFeed = () => {
        console.log('Refreshing activity feed...');
    };

    const showTagged = () => {
        console.log('Showing tagged comments...');
    };

    const showLineComments = () => {
        console.log('Showing line comments...');
    };

    const showAll = () => {
        console.log('Showing all comments...');
    };

    const getCommentTypeColor = (type) => {
        switch (type) {
            case 'Design Review':
                return 'primary';
            case 'Technical Issue':
                return 'failure';
            case 'Budget Alert':
                return 'warning';
            case 'Schedule Update':
                return 'success';
            case 'Quality Control':
                return 'info';
            case 'Safety Concern':
                return 'failure';
            case 'Change Request':
                return 'orange';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'DESIGNER':
                return 'text-blue-600';
            case 'CONTRACTOR':
                return 'text-green-600';
            case 'ARCHITECT':
                return 'text-purple-600';
            case 'PROJECT MANAGER':
                return 'text-orange-600';
            default:
                return 'text-gray-600';
        }
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-6">
            <div className="mx-auto">
                {/* All Users Badge */}
                <div className="flex justify-end ">
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-xs sm:text-sm font-medium">
                        ALL USERS
                    </span>
                </div>

                {/* Project Overview Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <button onClick={() => navigate('/collaboration-comments-listing')} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                            <i className="bi bi-arrow-left text-lg"></i>
                        </button>
                        <i className="bi bi-bar-chart text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">PROJECT OVERVIEW</h2>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 bg-yellow-50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                                <input
                                    type="text"
                                    value={projectStats.jobCode}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                                <input
                                    type="text"
                                    value={projectStats.projectName}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">TOTAL COMMENTS</label>
                                <input
                                    type="text"
                                    value={projectStats.totalComments}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-center text-sm sm:text-base"
                                />
                            </div>

                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">ACTIVE USERS</label>
                                <input
                                    type="text"
                                    value={projectStats.activeUsers}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-center text-sm sm:text-base"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Add New Comment Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-chat-dots text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">ADD NEW COMMENT</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">COMMENT TYPE</label>
                            <select
                                value={commentForm.type}
                                onChange={(e) => handleFormChange('type', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base"
                            >
                                {commentTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">COMMENT</label>
                            <textarea
                                value={commentForm.comment}
                                onChange={(e) => handleFormChange('comment', e.target.value)}
                                placeholder="Type your comment here... Use @username to tag users"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 resize-none text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">TAG USERS (TYPE @ TO SEARCH)</label>
                            <input
                                type="text"
                                value={commentForm.tagUsers}
                                onChange={(e) => handleFormChange('tagUsers', e.target.value)}
                                placeholder="@username"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm sm:text-base"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">

                            <Button
                                color="primary"
                                size="md"
                                onClick={() => navigate('/collaboration-comments-listing')}
                                className="font-medium"
                            >

                                POST COMMENT
                            </Button>


                            <Button
                                size="md"
                                onClick={clearForm}
                                className="font-medium text-red-600 border "
                            >
                                CLEAR FORM
                            </Button>

                        </div>
                    </div>
                </div>

                {/* Activity Feed Section */}
                <div className="bg-white border border-gray-300 rounded-lg p-4 sm:p-6 mb-4">
                    <div className="flex items-center gap-3 mb-4">
                        <i className="bi bi-list-ul text-gray-600 text-lg"></i>
                        <h2 className="text-base sm:text-lg font-medium text-gray-900">ACTIVITY FEED</h2>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 max-h-96 overflow-y-auto">
                        <div className="space-y-3 sm:space-y-4">
                            {comments.map((comment) => (
                                <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                                            {comment.author.split(' ').map(n => n[0]).join('')}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                                <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{comment.author}</h4>
                                                <span className={`text-xs sm:text-sm font-medium ${getRoleColor(comment.role)}`}>
                                                    {comment.role}
                                                </span>
                                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                                            </div>

                                            <div className="flex justify-start">
                                                <Badge
                                                    color={getCommentTypeColor(comment.type)}
                                                    size="sm"
                                                    className="w-auto px-2 py-1 rounded-full"
                                                >
                                                    {comment.type}
                                                </Badge>
                                            </div>


                                            <p className="text-gray-700 mb-3 text-sm sm:text-base leading-relaxed">{comment.content}</p>

                                            {comment.attachment && (
                                                <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-3">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        <i className="bi bi-paperclip text-gray-600 flex-shrink-0 mt-1"></i>
                                                        <span className="text-xs sm:text-sm font-medium text-gray-700">Budget Line 4: Electrical Category ($12,000)</span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{comment.attachment}</p>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => likeComment(comment.id)}
                                                    className="flex items-center gap-1 px-3 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded"
                                                >
                                                    <i className="bi bi-hand-thumbs-up"></i>
                                                    <span>LIKE</span>
                                                    {comment.likes > 0 && <span className="text-blue-600">({comment.likes})</span>}
                                                </button>
                                                <button className="px-3 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                    REPLY
                                                </button>
                                                <button className="px-3 py-1 text-xs sm:text-sm text-blue-600 hover:bg-blue-50 rounded">
                                                    EDIT
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">

                        <Button
                            color="success"
                            size="sm"
                            onClick={refreshFeed}
                            className="flex items-center justify-center"
                        >
                            <span className="hidden sm:inline">Refresh Feed</span>
                            <span className="sm:hidden">Refresh</span>
                        </Button>

                        <Button
                            color="warning"
                            size="sm"
                            onClick={showTagged}
                            className="flex items-center justify-center"
                        >
                            <span className="hidden sm:inline">Show Tagged</span>
                            <span className="sm:hidden">Tagged</span>
                        </Button>

                        <Button
                            color="primary"
                            size="sm"
                            onClick={showLineComments}
                            className="flex items-center justify-center"
                        >
                            <span className="hidden sm:inline">Line Comments</span>
                            <span className="sm:hidden">Comments</span>
                        </Button>

                        <Button
                            color="gray"
                            size="sm"
                            className="flex items-center justify-center"
                        >
                            <span className="hidden sm:inline">Show All</span>
                            <span className="sm:hidden">All</span>
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CollaborationComments;

