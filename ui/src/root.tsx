import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { routes } from './routes';
import history from './history';

function Root() {
  return (
    <SWRConfig
      value={{
        revalidateIfStale: false
      }}
    >
      <Router history={history}>
        <React.StrictMode>
          <Switch>
            <Route path="/">
              {routes.map(({ path, exact, component }) => (
                <Route key={path} exact={exact} path={path} component={component} />
              ))}
            </Route>
          </Switch>
        </React.StrictMode>
      </Router>
    </SWRConfig>
  );
}

export default Root;
