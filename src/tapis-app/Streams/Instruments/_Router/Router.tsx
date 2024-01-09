import React, { useState } from 'react';
import {
  Route,
  useRouteMatch,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';
import { SectionMessage } from 'tapis-ui/_common';
import MeasurementsListing from '../../MeasurementsListing';
import Toolbar from '../_components/Toolbar';

const Router: React.FC<{ projectId: string; siteId: string }> = ({
  projectId,
  siteId,
}) => {
  const { path } = useRouteMatch();

  const [start, setStart] = useState<Date | undefined>(() => {
    const now = new Date();
    now.setHours(now.getHours() - 12);
    return now;
  });
  const [end, setEnd] = useState<Date | undefined>(() => new Date());

  const [limit, setLimit] = useState<number | undefined>(undefined);
  const [offset, setOffset] = useState<number | undefined>(undefined);

  return (
    <div>
      <Toolbar
        start={start}
        end={end}
        setStart={setStart}
        setEnd={setEnd}
        setLimit={setLimit}
        setOffset={setOffset}
      />
      <Switch>
        <Route path={path} exact>
          <SectionMessage type="info">
            Select an instrument from the list.
          </SectionMessage>
        </Route>

        <Route
          path={`${path}/:instrumentId`}
          render={({
            match: {
              params: { instrumentId },
            },
          }: RouteComponentProps<{ instrumentId: string }>) => (
            <MeasurementsListing
              projectId={projectId}
              siteId={siteId}
              instrumentId={instrumentId}
              start={start}
              end={end}
              limit={limit}
              offset={offset}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default Router;
