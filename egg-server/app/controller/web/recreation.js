'use strict';

const Controller = require('egg').Controller;

class RecreationController extends Controller {
  async queryRecord() {
    const { ctx } = this;
    const msg = await ctx.service.web.recreation.queryRecord(ctx.request.body);
    ctx.body = msg;
  }
  async deleteRecord() {
    const { ctx } = this;
    const msg = await ctx.service.web.recreation.deleteRecord(ctx.request.body);
    ctx.body = msg;
  }
  async createRecord() {
    const { ctx } = this;
    const msg = await ctx.service.web.recreation.createRecord(ctx.request.body);
    ctx.body = msg;
  }
  async queryRecordDefault() {
    const { ctx } = this;
    const msg = await ctx.service.web.recreation.queryRecordDefault(ctx.request.body);
    ctx.body = msg;
  }
  async updateRecordDefault() {
    const { ctx } = this;
    const msg = await ctx.service.web.recreation.updateRecordDefault(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = RecreationController;
