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
    if (body.query.name) {
      where.name = { [Op.like]: `%${body.query.name}%` };
    }
    const Project = await ctx.model.Blog.Project.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
    });
    return Project;
  }
  async createProject(body) {
    const { ctx } = this;
    const created = await ctx.model.Blog.Project.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteProject(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Blog.Project.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async updateProject(body) {
    const { ctx } = this;
    body.upt_act = 'U';
    const updated = await ctx.model.Blog.Project.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }

}

module.exports = ProjectService;
