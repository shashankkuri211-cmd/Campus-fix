/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { NavigationProvider, usePathname } from './shims/next-navigation';
import { AppProvider } from '@/context/AppContext';
import { AppShell } from '@/components/AppShell';
import StudentDashboard from '@/app/page';
import ReportIssuePage from '@/app/report/page';
import StaffOperationsPage from '@/app/staff/page';
import BuildingsPage from '@/app/buildings/page';
import { IssueDetailsClient } from '@/app/issues/[id]/IssueDetailsClient';

function RouteRenderer() {
  const pathname = usePathname();

  if (pathname === '/' || pathname === '') {
    return <StudentDashboard />;
  }
  if (pathname === '/report') {
    return <ReportIssuePage />;
  }
  if (pathname === '/staff') {
    return <StaffOperationsPage />;
  }
  if (pathname === '/buildings') {
    return <BuildingsPage />;
  }
  if (pathname === '/issues' || pathname === '/issues/') {
    return <IssueDetailsClient id="CF-2024-8841" />;
  }
  if (pathname.startsWith('/issues/')) {
    const id = decodeURIComponent(pathname.replace(/^\/issues\//, '').split('/')[0] || 'CF-2024-8841');
    return <IssueDetailsClient id={id} />;
  }

  return <StudentDashboard />;
}

export default function App() {
  return (
    <NavigationProvider>
      <AppProvider>
        <Suspense fallback={<div className="min-h-screen bg-surface" />}>
          <AppShell>
            <RouteRenderer />
          </AppShell>
        </Suspense>
      </AppProvider>
    </NavigationProvider>
  );
}
