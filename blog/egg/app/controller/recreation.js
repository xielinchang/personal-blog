'use strict';

const Controller = require('egg').Controller;

class RecreationController extends Controller {
  async queryRecord() {
    const { ctx } = this;
    const msg = await ctx.service.recreation.queryRecord(ctx.request.body);
    ctx.body = msg;
  }
  async deleteRecord() {
    const { ctx } = this;
    const msg = await ctx.service.recreation.deleteRecord(ctx.request.body);
    ctx.body = msg;
  }
  async createRecord() {
    const { ctx } = this;
    const msg = await ctx.service.recreation.createRecord(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = RecreationController;
