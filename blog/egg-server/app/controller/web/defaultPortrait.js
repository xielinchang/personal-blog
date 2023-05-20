'use strict';

const Controller = require('egg').Controller;

class PortraitController extends Controller {
  async queryDefaultPortrait() {
    const { ctx } = this;
    const msg = await ctx.service.web.defaultPortrait.queryDefaultPortrait(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = PortraitController;
