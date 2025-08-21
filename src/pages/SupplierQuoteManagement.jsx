import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SupplierQuoteManagement = () => {
    const [formData, setFormData] = useState({
        vendorName: '',
        quoteAmount: '',
        quoteDate: '',
        referenceNumber: '',
        paidStatus: 'UNPAID',
        verbalNotes: ''
    });

    const [quoteHistory, setQuoteHistory] = useState([
        {
            id: 1,
            vendor: 'ABC FLOORING CO',
            amount: '$5,000.00',
            date: 'Jan 15, 2025',
            reference: 'QT-2025-001',
            file: 'VIEW',
            status: 'PAID',
            actions: ['TOGGLE', 'EDIT', 'DEL']
        },
        {
            id: 2,
            vendor: 'ELECTRIPRO SERVICES',
            amount: '$7,000.00',
            date: 'Jan 12, 2025',
            reference: 'NP-2025-045',
            file: 'VIEW',
            status: 'PAID',
            actions: ['TOGGLE', 'EDIT', 'DEL']
        },
        {
            id: 3,
            vendor: 'CREATIVE GRAPHICS LTD',
            amount: '$6,500.00',
            date: 'Jan 10, 2025',
            reference: 'DG-2025-078',
            file: '',
            status: 'UNPAID',
            actions: ['TOGGLE', 'EDIT', 'DEL']
        }
    ]);

    const [quoteSummary] = useState({
        totalQuotes: '$18,500.00',
        paidQuotes: '$12,000.00',
        pending: '$6,500.00',
        avgQuote: '$6,167'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddQuote = () => {
        if (formData.vendorName && formData.quoteAmount && formData.quoteDate) {
            const newQuote = {
                id: quoteHistory.length + 1,
                vendor: formData.vendorName.toUpperCase(),
                amount: `$${parseFloat(formData.quoteAmount).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                date: new Date(formData.quoteDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                reference: formData.referenceNumber || `QT-2025-${String(quoteHistory.length + 1).padStart(3, '0')}`,
                file: '',
                status: formData.paidStatus,
                actions: ['TOGGLE', 'EDIT', 'DEL']
            };

            setQuoteHistory(prev => [newQuote, ...prev]);
            clearForm();
        }
    };

    const clearForm = () => {
        setFormData({
            vendorName: '',
            quoteAmount: '',
            quoteDate: '',
            referenceNumber: '',
            paidStatus: 'UNPAID',
            verbalNotes: ''
        });
    };

    const exportQuotes = () => {
        console.log('Exporting quotes...', quoteHistory);
    };

    const navigate = useNavigate();

    return (

        <div>

            {/* Project Overview Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                    <i className="bi bi-clipboard-data text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-medium text-gray-900">PROJECT OVERVIEW</h2>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">JOB CODE</label>
                            <input
                                type="text"
                                value="25-01-0001"
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">PROJECT NAME</label>
                            <input
                                type="text"
                                value="Office Building Construction"
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">TOTAL QUOTES</label>
                            <input
                                type="text"
                                value="3"
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-center"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">PENDING PAYMENTS</label>
                            <input
                                type="text"
                                value="1"
                                readOnly
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 text-center"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Quote Summary Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                    <i className="bi bi-bar-chart text-yellow-600 text-lg"></i>
                    <h2 className="text-lg font-medium text-gray-900">QUOTE SUMMARY</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600 mb-2">TOTAL QUOTES</div>
                        <div className="text-2xl font-bold text-gray-900">{quoteSummary.totalQuotes}</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600 mb-2">PAID QUOTES</div>
                        <div className="text-2xl font-bold text-gray-900">{quoteSummary.paidQuotes}</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600 mb-2">PENDING</div>
                        <div className="text-2xl font-bold text-gray-900">{quoteSummary.pending}</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-300 rounded-lg p-4 text-center">
                        <div className="text-sm text-gray-600 mb-2">AVG QUOTE</div>
                        <div className="text-2xl font-bold text-gray-900">{quoteSummary.avgQuote}</div>
                    </div>
                </div>
            </div>

            {/* Add New Quote Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                    <i className="bi bi-file-earmark-plus text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-medium text-gray-900">ADD NEW QUOTE</h2>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* First Row */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">VENDOR NAME</label>
                            <input
                                type="text"
                                name="vendorName"
                                value={formData.vendorName}
                                onChange={handleInputChange}
                                placeholder="Supplier/Vendor Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">QUOTE AMOUNT</label>
                            <input
                                type="number"
                                name="quoteAmount"
                                value={formData.quoteAmount}
                                onChange={handleInputChange}
                                placeholder="0.00"
                                step="0.01"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">QUOTE DATE</label>
                            <input
                                type="date"
                                name="quoteDate"
                                value={formData.quoteDate}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        {/* Second Row */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">REFERENCE NUMBER</label>
                            <input
                                type="text"
                                name="referenceNumber"
                                value={formData.referenceNumber}
                                onChange={handleInputChange}
                                placeholder="Quote/Invoice Reference"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">QUOTE FILE UPLOAD</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <i className="bi bi-upload text-gray-400 text-2xl mb-2"></i>
                                <p className="text-sm text-gray-600">UPLOAD QUOTE DOCUMENT</p>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">PAID STATUS</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="paidStatus"
                                    checked={formData.paidStatus === 'PAID'}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        paidStatus: e.target.checked ? 'PAID' : 'UNPAID'
                                    }))}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="paidStatus" className="text-sm font-medium text-gray-700">
                                    {formData.paidStatus}
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Verbal Notes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">VERBAL NOTES</label>
                        <textarea
                            name="verbalNotes"
                            value={formData.verbalNotes}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="Additional notes about this quote, verbal agreements, terms, etc..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Quote History Section */}
            <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
                <div className="flex items-center gap-3 mb-4">
                    <i className="bi bi-clock-history text-gray-600 text-lg"></i>
                    <h2 className="text-lg font-medium text-gray-900">QUOTE HISTORY</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-900 text-white">
                            <th className="px-4 py-3 text-left text-sm font-medium">VENDOR</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">AMOUNT</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">DATE</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">REFERENCE</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">FILE</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">STATUS</th>
                            <th className="px-4 py-3 text-left text-sm font-medium">ACTIONS</th>
                        </tr>
                        </thead>
                        <tbody>
                        {quoteHistory.map((quote, index) => (
                            <tr key={quote.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-3 text-sm text-gray-900">{quote.vendor}</td>
                                <td className="px-4 py-3 text-sm text-blue-600 font-medium">{quote.amount}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{quote.date}</td>
                                <td className="px-4 py-3 text-sm text-gray-900">{quote.reference}</td>
                                <td className="px-4 py-3">
                                    {quote.file && (
                                        <button className="text-blue-600 hover:text-blue-800 text-sm">
                                            <i className="bi bi-eye mr-1"></i>
                                            {quote.file}
                                        </button>
                                    )}
                                </td>
                                <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                        quote.status === 'PAID'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {quote.status}
                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button className="bg-blue-600 text-white px-2 py-1 rounded text-xs hover:bg-blue-700">
                                            TOGGLE
                                        </button>
                                        <button className="bg-gray-600 text-white px-2 py-1 rounded text-xs hover:bg-gray-700">
                                            EDIT
                                        </button>
                                        <button className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                                            DEL
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <button
                    onClick={clearForm}
                    className="px-6 py-3 border border-gray-400 text-gray-700 font-medium rounded hover:bg-gray-50 transition-colors"
                >
                    CLEAR FORM
                </button>
                <button
                    onClick={handleAddQuote}
                    className="px-6 py-3 bg-gray-900 text-white font-medium rounded hover:bg-black transition-colors"
                >
                    ADD QUOTE
                </button>
                <button      onClick={() => navigate('/supplier-quote-listing')}    className="px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors">
                    EXPORT QUOTES
                </button>
            </div>

        </div>
    );
};

export default SupplierQuoteManagement;

