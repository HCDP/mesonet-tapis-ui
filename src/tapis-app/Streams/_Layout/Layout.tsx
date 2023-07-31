import React from 'react';
import Projects from '../Projects';
import { Breadcrumbs, PageLayout, LayoutHeader } from 'tapis-ui/_common';
import { useLocation } from 'react-router';
import breadcrumbsFromPathname from 'tapis-ui/_common/Breadcrumbs/breadcrumbsFromPathname';
import styles from './Layout.module.scss';

const pathTypes = ['Projects', 'Sites', 'Instruments'];

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const crumbs = breadcrumbsFromPathname(pathname).slice(0, 3);
  const pathType = pathTypes[crumbs.length - 1];

  const header = (
    <LayoutHeader>
      <div>
        <div className={styles['header-text']}>{pathType}</div>
        <div className={styles.breadcrumbs}>
          <Breadcrumbs breadcrumbs={[...crumbs]} />
        </div>
      </div>
    </LayoutHeader>
  );

  const body = <Projects />;

  return <PageLayout top={header} left={body} />;
};

export default Layout;
