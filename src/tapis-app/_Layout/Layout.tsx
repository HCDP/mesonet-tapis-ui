import React from 'react';
import { Router } from 'tapis-app/_Router';
import { PageLayout } from 'tapis-ui/_common';
import { NotificationsProvider } from 'tapis-app/_components/Notifications';
import './Layout.scss';

const Layout: React.FC = () => {
  const header = (
    <div className="tapis-ui__header">
      <div>MesonetUI</div>
      <div></div>
    </div>
  );

  const workbenchContent = (
    <div className="workbench-content">
      <Router />
    </div>
  );

  return (
    <NotificationsProvider>
      <div
        style={{
          display: 'flex',
          flexGrow: 1,
          height: '100%',
          minHeight: '100vh',
        }}
      >
        <PageLayout top={header} right={workbenchContent} />
      </div>
    </NotificationsProvider>
  );
};

export default Layout;
