import React, { useState, useEffect }from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useList } from 'tapis-hooks/streams/sites';
import { Streams } from '@tapis/tapis-typescript';
import { Navbar, NavItem } from 'tapis-ui/_wrappers/Navbar';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { joinPath } from 'utils/URLManager';
import styles from './SiteNav.module.scss';

const SitesNav: React.FC<{ projectId: string }> = ({ projectId }) => {
  const { url } = useRouteMatch();
  const { data, isLoading, error } = useList({
    projectId,
  });

  const [searchInput, setSearchInput] = useState<string>('');
  const [sortedDefinitions, setSortedDefinitions] = useState<Array<Streams.Site>>([]);
  const [filterDefinitions, setFilteredDefinitions] = useState<Array<Streams.Site>>([]);

  const createSearch = (event: any) => {
    let value = event.target.value;
    setSearchInput(value);
  };

  useEffect(() => {
    const definitions: Array<Streams.Site> = data?.result ?? [];
    const sortedDefinitions = definitions.slice().sort((a, b) => {
      if (a.site_name === undefined && b.site_name === undefined) {
        return 0;
      }
      if (a.site_name === undefined) {
        return 1;
      }
      if (b.site_name === undefined) {
        return -1;
      }
      
      return a.site_name.localeCompare(b.site_name);
    });
    setSortedDefinitions(sortedDefinitions);
  }, [data]);

  useEffect(() => {
    let filteredSites = sortedDefinitions;
    
    if(searchInput !== '') {
        filteredSites = sortedDefinitions.filter(site =>
        site.site_id?.toLowerCase().includes(searchInput.toLowerCase())
        || site.site_name?.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    
    setFilteredDefinitions(filteredSites);
  // eslint-disable-next-line
  }, [searchInput, sortedDefinitions]);

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <div className={styles['control']}>
        Search
        <i className="icon-search"></i>
        <div>
          <input
            className={styles['string-input']}
            type="string"
            value={searchInput}
            onChange={createSearch}
          />
        </div>
      </div>
      <Navbar>
        {filterDefinitions.length ? (
          filterDefinitions.map((site) => {
            const path = joinPath([url, site.site_id!]);
            return (
              <NavItem to={path} icon="project" key={site.site_id}>
                {`${site.site_id} (${site.site_name})`}
              </NavItem>
            );
          })
        ) : (
          <i>No sites found</i>
        )}
      </Navbar>
    </QueryWrapper>
  );
};

export default SitesNav;
