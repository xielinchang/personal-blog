'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryBg() {
    const { ctx } = this;
    const msg = await ctx.model.Web.BlogBg.findAll();
    return msg;
  }
  async queryBgGif() {
    const { ctx } = this;
    const msg = await ctx.model.Web.BlogBgGif.findAll();
    return msg;
  }
}

module.exports = RecreationService;
