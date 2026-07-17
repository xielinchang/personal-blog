'use strict';

const Controller = require('egg').Controller;

class EssayController extends Controller {
  // 首页背景
  async queryHomeBg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryHomeBg(ctx.request.body);
    ctx.body = msg;
  }
  async createHomeBg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.createHomeBg(ctx.request.body);
    ctx.body = msg;
  }
  async deleteHomeBg() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.deleteHomeBg(ctx.request.body);
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
  // 首页背景(晚上)
  async queryHomeBgNight() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryHomeBgNight(ctx.request.body);
    ctx.body = msg;
  }
  async createHomeBgNight() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.createHomeBgNight(ctx.request.body);
    ctx.body = msg;
  }
  async deleteHomeBgNight() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.deleteHomeBgNight(ctx.request.body);
    ctx.body = msg;
  }
  async queryHomeBgNowNight() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.queryHomeBgNowNight(ctx.request.body);
    ctx.body = msg;
  }
  async updateHomeBgNowNight() {
    const { ctx } = this;
    const msg = await ctx.service.web.bg.updateHomeBgNowNight(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = EssayController;
