
import { Op } from 'sequelize';

import Model from '../../connectors/postgresql/schemas/Project';
import STATUS from '../../constants/status';

class ProjectModel {
  constructor(connector) {
    this.dbModel = new Model(connector);
  }

  transformModel = (project, status) => ({
    id: project.id,
    name: project.name,
    status: status || project.status,
    updatedAt: new Date().toISOString(),
  });

  add = async (project) => {
    const newProject = {
      ...this.transformModel(project),
      status: STATUS.ACTIVE,
      createdAt: new Date().toISOString(),
    };
    const savedProject = await this.dbModel.findOrCreate(newProject);
    return savedProject;
  };

  update = async (id, project) => {
    const newProject = {
      ...this.transformModel(project),
    };
    const updated = await this.dbModel.update(newProject, {
      where: {
        id,
        status: STATUS.ACTIVE,
      },
    });
    if (updated) {
      return true;
    }
    return false;
  };


  remove = async (id) => {
    const updated = await this.dbModel.update({
      status: STATUS.DELETE,
    }, {
      where: {
        id,
        status: STATUS.ACTIVE,
      },
    });
    if (updated) {
      return true;
    }
    return false;
  };

  findAll = (offset = 0, limit = 10) => {
    const projects = this.dbModel.findAll({
      offset,
      limit,
      where: {
        status: {
          [Op.ne]: STATUS.DELETE,
        },
      },
    });
    return projects;
  };

  findById = async (id) => {
    const project = await this.dbModel.findOne({
      where: {
        id,
        status: {
          [Op.ne]: STATUS.DELETE,
        },
      },
    });
    return project;
  };
}

export default ProjectModel;
