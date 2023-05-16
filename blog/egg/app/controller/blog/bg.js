'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
  async queryBg() {
    const { ctx } = this;
    const msg = await ctx.service.blog.bg.queryBg(ctx.request.body);
    ctx.body = msg;
  }

  async queryBgGif() {
    const { ctx } = this;
    const msg = await ctx.service.blog.bg.queryBgGif(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = EssayController;
