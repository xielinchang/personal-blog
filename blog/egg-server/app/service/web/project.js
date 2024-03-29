'use strict';

const Service = require('egg').Service;

class ProjectService extends Service {
  async queryProject(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (body.query.id) {
      where.id = body.query.id;
    }
    if (body.query.html) {
      where.html = { [Op.like]: `%${body.query.html}%` };
    }
    if (body.query.title) {
      where.title = { [Op.like]: `%${body.query.title}%` };
    }
    if (body.query.state) {
      where.state = body.query.state;
    }
    const Project = await ctx.model.Web.Project.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
    });
    return Project;
  }
  async queryProjectState(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' }, state: 1 };
    if (body.query.id) {
      where.id = body.query.id;
    }
    if (body.query.html) {
      where.html = { [Op.like]: `%${body.query.html}%` };
    }
    if (body.query.title) {
      where.title = { [Op.like]: `%${body.query.title}%` };
    }
    
    const Project = await ctx.model.Web.Project.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
    });
    return Project;
  }
  async createProject(body) {
    const { ctx } = this;
    const created = await ctx.model.Web.Project.create(body);
    if (created) {
      return { success: true, data: body };
    }

  }
  async deleteProject(body) {
    const { ctx } = this;

    const deleted = await ctx.model.Web.Project.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }

  }
  async updateProject(body) {
    const { ctx } = this;
    body.upt_act = 'U';
    const updated = await ctx.model.Web.Project.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
  async changeState(body) {
    const { ctx } = this;
    body.upt_act = 'U';
    const updated = await ctx.model.Web.Project.update({ state: body.state }, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
  async queryProjectSave() {
    const { ctx } = this;
    const Project = await ctx.model.Web.SaveProject.findOne();
    return Project;
  }
  async updateProjectSave(body) {
    const { ctx } = this;
    body.upt_act = 'U';
    const updated = await ctx.model.Web.SaveProject.update(body, {
      where: {
        id: 1,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = ProjectService;
