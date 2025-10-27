/**
 * @router AppRouter
 * @summary Main application routing configuration with lazy loading
 * @type router-configuration
 * @category navigation
 */

import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/pages/layouts/MainLayout';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

const HomePage = lazy(() => import('@/pages/Home'));
const ChecklistListPage = lazy(() => import('@/pages/ChecklistList'));
const ChecklistCreatePage = lazy(() => import('@/pages/ChecklistCreate'));
const ChecklistEditPage = lazy(() => import('@/pages/ChecklistEdit'));
const ChecklistDetailPage = lazy(() => import('@/pages/ChecklistDetail'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="checklists" element={<ChecklistListPage />} />
          <Route path="checklists/new" element={<ChecklistCreatePage />} />
          <Route path="checklists/:id" element={<ChecklistDetailPage />} />
          <Route path="checklists/:id/edit" element={<ChecklistEditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
