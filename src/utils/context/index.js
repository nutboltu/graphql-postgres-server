import PostGreSQLConnector from '../../connectors/postgresql';

import ProjectModel from '../../features/Projects/ProjectModel';

export default ({ res }) => ({
  log: res.locals.log,
  connectors: {
    postgres: PostGreSQLConnector,
  },
  models: {
    projects: new ProjectModel(PostGreSQLConnector),
  },
});
