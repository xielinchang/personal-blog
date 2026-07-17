'use strict';

const Controller = require('egg').Controller;

class BannerController extends Controller {
  async queryBanner() {
    const { ctx } = this;
    const msg = await ctx.service.web.banner.queryBanner(ctx.request.body);
    ctx.body = msg;
  }
  async createBanner() {
    const { ctx } = this;
    const Banner = await ctx.service.web.banner.createBanner(ctx.request.body);
    ctx.body = Banner;
  }
  async deleteBanner() {
    const { ctx } = this;
    const Banner = await ctx.service.web.banner.deleteBanner(ctx.request.body);
    ctx.body = Banner;
  }
  async updateBanner() {
    const { ctx } = this;
    const Banner = await ctx.service.web.banner.updateBanner(ctx.request.body);
    ctx.body = Banner;
  }
}

module.exports = BannerController;
