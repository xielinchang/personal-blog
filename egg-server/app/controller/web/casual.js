'use strict';

const Controller = require('egg').Controller;

class CasualController extends Controller {
  async queryCasual() {
    const { ctx } = this;
    const msg = await ctx.service.web.casual.queryCasual(ctx.request.body);
    ctx.body = msg;
  }
  async deleteCasual() {
    const { ctx } = this;
    const msg = await ctx.service.web.casual.deleteCasual(ctx.request.body);
    ctx.body = msg;
  }
  async createCasual() {
    const { ctx } = this;
    const msg = await ctx.service.web.casual.createCasual(ctx.request.body);
    ctx.body = msg;
  }
  async updateCasual() {
    const { ctx } = this;
    const msg = await ctx.service.web.casual.updateCasual(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = CasualController;
