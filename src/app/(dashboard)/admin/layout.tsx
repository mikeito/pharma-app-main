import React from 'react';
import AppShell from 'src/components/layout/app-shell';
import { Layout, LayoutBody, LayoutHeader } from 'src/components/custom/layout';
import { Search } from 'src/components/custom/search';
import ThemeSwitch from 'src/components/layout/themes/theme-switch';
import { UserNav } from 'src/components/layout/user-nav';
import { AuthProvider } from 'src/provider/AuthProvider';
import PrivateRoute from 'src/provider/PrivateRoute';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <AuthProvider>
      <AppShell>
        {/* <PrivateRoute> */}
          <Layout>
            {/* ===== Top Heading ===== */}
            <LayoutHeader>
              {/* <TopNav links={topNav} /> */}
              <div className='ml-auto flex items-center space-x-4'>
                <Search />
                <ThemeSwitch />
                <UserNav />
              </div>
            </LayoutHeader>
            <LayoutBody className='space-y-4'>{children}</LayoutBody>
          </Layout>
        {/* </PrivateRoute> */}
      </AppShell>
    </AuthProvider>
  );
};

export default DashboardLayout;
