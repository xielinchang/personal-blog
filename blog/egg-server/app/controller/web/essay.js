'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
  async queryEssay() {
    const { ctx } = this;
    const msg = await ctx.service.web.essay.queryEssay(ctx.request.body);
    ctx.body = msg;
  }
  async queryEssayState() {
    const { ctx } = this;
    const msg = await ctx.service.web.essay.queryEssayState(ctx.request.body);
    ctx.body = msg;
  }
  async changeState() {
    const { ctx } = this;
    const essay = await ctx.service.web.essay.changeState(ctx.request.body);
    ctx.body = essay;
  }
  async createEssay() {
    const { ctx } = this;
    const essay = await ctx.service.web.essay.createEssay(ctx.request.body);
    ctx.body = essay;
  }
  async deleteEssay() {
    const { ctx } = this;
    const essay = await ctx.service.web.essay.deleteEssay(ctx.request.body);
    ctx.body = essay;
  }
  async updateEssay() {
    const { ctx } = this;
    const essay = await ctx.service.web.essay.updateEssay(ctx.request.body);
    ctx.body = essay;
  }
  async querySaveEssay() {
    const { ctx } = this;
    const msg = await ctx.service.web.essay.querySaveEssay(ctx.request.body);
    ctx.body = msg;
  }
  async saveEssay() {
    const { ctx } = this;
    const essay = await ctx.service.web.essay.saveEssay(ctx.request.body);
    ctx.body = essay;
  }
}

module.exports = EssayController;
