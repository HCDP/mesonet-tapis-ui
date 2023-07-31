import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useList } from 'tapis-hooks/streams/projects';
import { Streams } from '@tapis/tapis-typescript';
import { Navbar, NavItem } from 'tapis-ui/_wrappers/Navbar';
import { QueryWrapper } from 'tapis-ui/_wrappers';
import { joinPath } from 'utils/URLManager';

const ProjectsNav: React.FC = () => {
  const { url } = useRouteMatch();
  // Get a projects listing with default request params
  const { data, isLoading, error } = useList();
  const definitions: Array<Streams.Project> = data?.result ?? [];

  return (
    <QueryWrapper isLoading={isLoading} error={error}>
      <Navbar>
        {definitions.length ? (
          definitions.map((project) => {
            const path = joinPath([url, project.project_name!]);
            return (
              <NavItem to={path} icon="project" key={project.project_name}>
                {`${project.project_name}`}
              </NavItem>
            );
          })
        ) : (
          <i>No projects found</i>
        )}
      </Navbar>
    </QueryWrapper>
  );
};

export default ProjectsNav;
