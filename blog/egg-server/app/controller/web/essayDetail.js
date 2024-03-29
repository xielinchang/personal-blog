'use strict';

const Controller = require('egg').Controller;

class EssayDetailController extends Controller {
  async updateEssayDetail() {
    const { ctx } = this;
    const essay = await ctx.service.web.essayDetail.updateEssayDetail(ctx.request.body);
    ctx.body = essay;
  }
}

module.exports = EssayDetailController;
