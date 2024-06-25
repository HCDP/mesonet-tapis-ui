import React from 'react';
import { Router } from '../_Router';

const Layout: React.FC<{ 
  projectId: string;
  location: string;
}> = ({ projectId, location }) => {
  return <Router projectId={projectId} location={location} />;
};

export default Layout;
