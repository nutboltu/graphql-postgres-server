
const ProjectResolvers = {
  Mutation: {
    addProject: async (_, args, { models }) => {
      const project = { name: args.name };
      const newProject = await models.projects.add(project);
      return {
        id: newProject.id,
      };
    },
    updateProject: async (_, args, { models }) => {
      const project = { name: args.name };
      await models.projects.update(args.id, project);
      return {
        id: args.id,
      };
    },
    removeProject: async (_, args, { models }) => {
      await models.projects.remove(args.id);
      return {
        id: args.id,
      };
    },
  },
  Query: {
    findProjectById: async (_, args, { models }) => {
      const project = await models.projects.findById(args.id);
      return project;
    },
    findAllProjects: async (_, args, { models }) => {
      const projects = await models.projects.findAll(args.offset, args.limit);
      return projects;
    },
  },
};

export default ProjectResolvers;
