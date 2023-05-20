'use strict';

const Service = require('egg').Service;

class EssayDetailService extends Service {
  async updateEssayDetail(body) {
    const { ctx } = this;
    console.log(body.id);
    if (body.id === null) {
      const created = await ctx.model.Web.EssayDetail.create(body);
      if (created) {
        return { success: true, data: body };
      }

    }
    const updated = await ctx.model.Web.EssayDetail.update(body, {
      where: {
        id: body.id,
      },
    });

    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = EssayDetailService;
