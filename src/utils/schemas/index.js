import path from 'path';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';

// import usersResolvers from '../../features/Users/UsersResolvers';
import ProjectResolvers from '../../features/Projects/ProjectResolvers';

const allResolvers = merge(
  ProjectResolvers,
  {},
);

const typeDefs = mergeTypes(fileLoader(path.resolve(__dirname, '../../**/*.graphql')), { all: true });

const executableSchemas = makeExecutableSchema({
  typeDefs,
  resolvers: allResolvers,
});

export default executableSchemas;
