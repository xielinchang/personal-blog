'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryBg() {
    const { ctx } = this;
    const msg = await ctx.model.Web.BlogBg.findAll();
    return msg;
  }
  async queryHomeBg() {
    const { ctx } = this;
    const msg = await ctx.model.Web.BlogHomeBg.findAll();
    return msg;
  }
  // async createHomeBg(body) {
  //   const { ctx } = this;
  //   const msg = await ctx.model.Web.BlogHomeBg.create(body);
  //   return msg;
  // }
  // async deleteHomeBg(body) {
  //   const { ctx } = this;
  //   const msg = await ctx.model.Web.BlogHomeBg.update({ upt_act: 'D' }, {
  //     where: { id: body.id },
  //   });
  //   return msg;
  // }
}

module.exports = RecreationService;
