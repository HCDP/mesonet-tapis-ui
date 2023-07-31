import React from 'react';
import { PageLayout, LayoutNavWrapper, LayoutBody } from 'tapis-ui/_common';
import { InstrumentsNav } from '../_components';
import { Router } from '../_Router';

const Layout: React.FC<{ projectId: string; siteId: string }> = ({
  projectId,
  siteId,
}) => {
  const sidebar = (
    <LayoutNavWrapper>
      <InstrumentsNav projectId={projectId} siteId={siteId} />
    </LayoutNavWrapper>
  );

  const body = (
    <LayoutBody>
      <Router projectId={projectId} siteId={siteId} />
    </LayoutBody>
  );

  return <PageLayout left={sidebar} right={body} />;
};

export default Layout;
