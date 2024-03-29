'use strict';

const Controller = require('egg').Controller;

class EssayCommentsController extends Controller {
  async queryEssayComments() {
    const { ctx } = this;
    const msg = await ctx.service.web.essayComments.queryEssayComments(ctx.request.body);
    ctx.body = msg;
  }
  async createEssayComments() {
    const { ctx } = this;
    const comments = await ctx.service.web.essayComments.createEssayComments(ctx.request.body);
    ctx.body = comments;
  }
  async deleteEssayComments() {
    const { ctx } = this;
    const comments = await ctx.service.web.essayComments.deleteEssayComments(ctx.request.body);
    ctx.body = comments;
  }
}

module.exports = EssayCommentsController;
