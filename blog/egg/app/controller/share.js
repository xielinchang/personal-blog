'use strict';

const Controller = require('egg').Controller;

class ShareController extends Controller {
  async queryShare() {
    const { ctx } = this;
    const msg = await ctx.service.share.queryShare(ctx.request.body);
    ctx.body = msg;
  }
  async createShare() {
    const { ctx } = this;
    const share = await ctx.service.share.createShare(ctx.request.body);
    ctx.body = share;
  }
  async deleteShare() {
    const { ctx } = this;
    const share = await ctx.service.share.deleteShare(ctx.request.body);
    ctx.body = share;
  }
  async updateShare() {
    const { ctx } = this;
    const share = await ctx.service.share.updateShare(ctx.request.body);
    ctx.body = share;
  }
  async querySaveShare() {
    const { ctx } = this;
    const msg = await ctx.service.share.querySaveShare(ctx.request.body);
    ctx.body = msg;
  }
  async saveShare() {
    const { ctx } = this;
    const share = await ctx.service.share.saveShare(ctx.request.body);
    ctx.body = share;
  }
}

module.exports = ShareController;
