'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
  // 随时间变化背景,默认背景，不予修改
  async queryDayImg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryDayImg(ctx.request.body);
    ctx.body = msg;
  }
  // 首页背景
  async queryHomeBg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryHomeBg(ctx.request.body);
    ctx.body = msg;
  }
  async queryHomeBgNow() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryHomeBgNow(ctx.request.body);
    ctx.body = msg;
  }
  async updateHomeBgNow() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.updateHomeBgNow(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = EssayController;
