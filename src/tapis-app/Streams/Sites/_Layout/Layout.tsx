import React from 'react';
import { Router } from '../_Router';

const Layout: React.FC<{ projectId: string }> = ({ projectId }) => {
  console.log(projectId);
  return <Router projectId={projectId} />;
};

export default Layout;
