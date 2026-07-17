'use strict';

const Controller = require('egg').Controller;

class AboutmeController extends Controller {
  async queryAboutme() {
    const { ctx } = this;
    const msg = await ctx.service.web.aboutmeDetail.queryAboutme(ctx.request.body);
    ctx.body = msg;
  }
  async updateAboutme() {
    const { ctx } = this;
    const essay = await ctx.service.web.aboutmeDetail.updateAboutme(ctx.request.body);
    ctx.body = essay;
  }
}

module.exports = AboutmeController;
