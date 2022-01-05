import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import List from '../pages/List';
import Layout from '../components/Layout';

const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<Dashboard/>}/> 
            <Route path="/list/*" element ={<List/>} />
        </Routes>
    </Layout>

);

export default AppRoutes;
