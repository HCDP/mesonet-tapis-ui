import React from 'react';
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import { LocationsNav } from '../_components';
import config from '../../../../config.json';
import Sites from 'tapis-app/Streams/Sites';

const Router: React.FC = () => {
  const { path } = useRouteMatch();
  const { projects } = config as any;

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <LocationsNav />
      </Route>
      <Route
        path={`${path}/:location`}
        render={({
          match: {
            params: { location },
          },
          }: RouteComponentProps<{ location: string }>) => {
            return (
              <Sites
                location={location}
                projectId={projects[location].project}
              />
            )
          }
        }
      />
    </Switch>
  );
};

export default Router;