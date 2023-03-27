'use strict';

const Controller = require('egg').Controller;

class EssayDetailController extends Controller {
  async updateEssayDetail() {
    const { ctx } = this;
    const essay = await ctx.service.essayDetail.updateEssayDetail(ctx.request.body);
    ctx.body = essay;
  }
}

module.exports = EssayDetailController;
