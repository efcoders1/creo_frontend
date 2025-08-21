import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';

import Login from './pages/Login';
import Home from './pages/Home';
import CostCategoryManagement from './pages/CostCategoryManagement';
import BudgetPlanning from './pages/BudgetPlanning';
import ActualCostTrackin from './pages/ActualCostTrackin';
import MarginCalculation from "./pages/MarginCalculation";
import StorageAssetManagement from "./pages/StorageAssetManagement";
import SupplierQuoteManagement from './pages/SupplierQuoteManagement.jsx';
import ApprovalAndLocking from './pages/ApprovalAndLocking.jsx';
import NotificationsAlerts from './pages/NotificationsAlerts.jsx';
import CollaborationComments from './pages/CollaborationComments';
import PhotoUpload from './pages/PhotoUpload';
import ReportingDashboard from './pages/ReportingDashboard';
import MobileInterface from './pages/MobileInterface';
import AccessControlPermissions from './pages/AccessControlPermissions';

import ProjectListing from './pages/ProjectManagementList';
import ProjectManagement from './pages/ProjectManagement';
import ProjectEdit from './pages//ProjectEdit';
import ProjectDetail from './pages//ProjectDetail';

import AuditTrail from './pages/AuditTrail';
import FinancialModeling from './pages/FinancialModeling';

import CostCategoryListing from "./pages/CostCategoryListing.jsx";
import BudgetPlanningListing from "./pages/BudgetPlanningListing.jsx";
import ActualCostTrackingListing from "./pages/ActualCostTrackingListing.jsx";
import SupplierQuoteListing from "./pages/SupplierQuoteListing.jsx";
import ApprovalLockingListing from "./pages/ApprovalLockingListing.jsx";
import CollaborationCommentsListing from "./pages/CollaborationCommentsListing.jsx";
import MobileInterfaceListing from "./pages/MobileInterfaceListing.jsx";

import CostCategoryView from './pages/CostCategoryView';
import CostCategoryEdit from './pages/CostCategoryEdit';


function App() {
    return (
        <Router>
            <Routes>
                {/* Login page without layout */}
                <Route path="/" element={<Login />} />

                {/* All other pages with layout */}
                <Route path="/home" element={<Layout><Home /></Layout>} />
                <Route path="/cost-category" element={<Layout><CostCategoryManagement /></Layout>} />
                <Route path="/budget-planning" element={<Layout><BudgetPlanning /></Layout>} />
                <Route path="/actual-cost-tracking" element={<Layout><ActualCostTrackin /></Layout>} />
                <Route path="/margin-calculation" element={<Layout><MarginCalculation /></Layout>} />
                <Route path="/storage-assets" element={<Layout><StorageAssetManagement /></Layout>} />
                <Route path="/supplier-quotes" element={<Layout><SupplierQuoteManagement /></Layout>} />
                <Route path="/approval-locking" element={<Layout><ApprovalAndLocking /></Layout>} />
                <Route path="/notifications-alerts" element={<Layout><NotificationsAlerts /></Layout>} />
                <Route path="/collaboration-comments" element={<Layout><CollaborationComments /></Layout>} />
                <Route path="/photo-upload" element={<Layout><PhotoUpload /></Layout>} />
                <Route path="/reporting-dashboard" element={<Layout><ReportingDashboard /></Layout>} />
                <Route path="/mobile-interface" element={<Layout><MobileInterface /></Layout>} />
                <Route path="/access-control" element={<Layout><AccessControlPermissions /></Layout>} />
                <Route path="/project-management" element={<Layout><ProjectManagement /></Layout>} />
                <Route path="/audit-trail" element={<Layout><AuditTrail /></Layout>} />
                <Route path="/financial-modeling" element={<Layout><FinancialModeling /></Layout>} />
                <Route path="/project-listing" element={<Layout><ProjectListing /></Layout>} />
                <Route path="/cost-category-listing" element={<Layout><CostCategoryListing /></Layout>} />
                <Route path="/budget-planning-listing" element={<Layout><BudgetPlanningListing /></Layout>} />
                <Route path="/actual-cost-tracking-listing" element={<Layout><ActualCostTrackingListing /></Layout>} />
                <Route path="/supplier-quote-listing" element={<Layout><SupplierQuoteListing /></Layout>} />
                <Route path="/approval-locking-listing" element={<Layout><ApprovalLockingListing /></Layout>} />
                <Route path="/collaboration-comments-listing" element={<Layout><CollaborationCommentsListing /></Layout>} />
                <Route path="/mobile-interface-listing" element={<Layout><MobileInterfaceListing /></Layout>} />

                <Route path="/project/:projectId/view" element={<Layout><ProjectDetail /></Layout>} />
                <Route path="/project/:projectId/edit" element={<Layout><ProjectEdit /></Layout>} />

                <Route path="/cost-category/view/:id" element={<Layout><CostCategoryView /></Layout>} />
                <Route path="/cost-category/edit/:id" element={<Layout><CostCategoryEdit /></Layout>} />


            </Routes>
        </Router>
    );
}

export default App;
