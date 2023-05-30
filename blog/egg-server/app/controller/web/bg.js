'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
  // 随时间变化背景,默认背景，不予修改
  async queryBg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryBg(ctx.request.body);
    ctx.body = msg;
  }
  // 首页背景
  async queryHomeBg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryHomeBg(ctx.request.body);
    ctx.body = msg;
  }
  // async createHomeBg() {
  //   const { ctx } = this;
  //   const msg = await ctx.service.web.bg.createHomeBg(ctx.request.body);
  //   ctx.body = msg;
  // }
  // async deleteHomeBg() {
  //   const { ctx } = this;
  //   const msg = await ctx.service.web.bg.deleteHomeBg(ctx.request.body);
  //   ctx.body = msg;
  // }
}

module.exports = EssayController;
