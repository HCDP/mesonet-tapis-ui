import React from 'react';
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch
} from 'react-router-dom';
import MeasurementsListing from '../../MeasurementsListing';
import { SitesNav } from '../_components';

const Router: React.FC<{ projectId: string; }> = ({
  projectId
}) => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}`} exact>
        <SitesNav projectId={projectId} />
      </Route>
      <Route
        path={`${path}/:siteId`}
        render={({
          match: {
            params: { siteId },
          },
          }: RouteComponentProps<{ siteId: string }>) => {
            return (
              <MeasurementsListing
                projectId={projectId}
                siteId={siteId}
                instrumentId={siteId}
              />
            )
          }
        }
      />
    </Switch>
  );
};

export default Router;