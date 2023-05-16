'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async queryProject() {
    const { ctx } = this;
    const project = await ctx.service.blog.project.queryProject(ctx.request.body);
    ctx.body = project;
  }
  async createProject() {
    const { ctx } = this;
    const project = await ctx.service.blog.project.createProject(ctx.request.body);
    ctx.body = project;
  }
  async deleteProject() {
    const { ctx } = this;
    const project = await ctx.service.blog.project.deleteProject(ctx.request.body);
    ctx.body = project;
  }
  async updateProject() {
    const { ctx } = this;
    const project = await ctx.service.blog.project.updateProject(ctx.request.body);
    ctx.body = project;
  }
}

module.exports = ProjectController;
