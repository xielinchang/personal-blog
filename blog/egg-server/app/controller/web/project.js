'use strict';

const Controller = require('egg').Controller;

class ProjectController extends Controller {
  async queryProject() {
    const { ctx } = this;
    const project = await ctx.service.web.project.queryProject(ctx.request.body);
    ctx.body = project;
  }
  async queryProjectState() {
    const { ctx } = this;
    const project = await ctx.service.web.project.queryProjectState(ctx.request.body);
    ctx.body = project;
  }
  async changeState() {
    const { ctx } = this;
    const project = await ctx.service.web.project.changeState(ctx.request.body);
    ctx.body = project;
  }
  async createProject() {
    const { ctx } = this;
    const project = await ctx.service.web.project.createProject(ctx.request.body);
    ctx.body = project;
  }
  async deleteProject() {
    const { ctx } = this;
    const project = await ctx.service.web.project.deleteProject(ctx.request.body);
    ctx.body = project;
  }
  async updateProject() {
    const { ctx } = this;
    const project = await ctx.service.web.project.updateProject(ctx.request.body);
    ctx.body = project;
  }
  async queryProjectSave() {
    const { ctx } = this;
    const project = await ctx.service.web.project.queryProjectSave(ctx.request.body);
    ctx.body = project;
  }
  async updateProjectSave() {
    const { ctx } = this;
    const project = await ctx.service.web.project.updateProjectSave(ctx.request.body);
    ctx.body = project;
  }
}

module.exports = ProjectController;
