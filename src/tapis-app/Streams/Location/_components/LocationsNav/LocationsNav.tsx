import { useRouteMatch } from 'react-router-dom';
import { Navbar, NavItem } from 'tapis-ui/_wrappers/Navbar';
import { joinPath } from 'utils/URLManager';
import config from "../../../../../config.json";

const LocationsNav: React.FC = () => {
  const { url } = useRouteMatch();
  const { projects } = config as any;

  return (
    <Navbar>
      {
        Object.keys(projects).map((location: string) => {
          const path = joinPath([url, location]);
          return (
            <NavItem to={path} icon="project" key={location}>
              {projects[location].display}
            </NavItem>
          );
        })
      }
    </Navbar>
  );
};

export default LocationsNav;
