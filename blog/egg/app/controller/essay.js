'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
  async queryEssay() {
    const { ctx } = this;
    const msg = await ctx.service.essay.queryEssay(ctx.request.body);
    ctx.body = msg;
  }
  async createEssay() {
    const { ctx } = this;
    const essay = await ctx.service.essay.createEssay(ctx.request.body);
    ctx.body = essay;
  }
  async deleteEssay() {
    const { ctx } = this;
    const essay = await ctx.service.essay.deleteEssay(ctx.request.body);
    ctx.body = essay;
  }
  async updateEssay() {
    const { ctx } = this;
    const essay = await ctx.service.essay.updateEssay(ctx.request.body);
    ctx.body = essay;
  }
  async querySaveEssay() {
    const { ctx } = this;
    const msg = await ctx.service.essay.querySaveEssay(ctx.request.body);
    ctx.body = msg;
  }
  async saveEssay() {
    const { ctx } = this;
    const essay = await ctx.service.essay.saveEssay(ctx.request.body);
    ctx.body = essay;
  }
}

module.exports = EssayController;
