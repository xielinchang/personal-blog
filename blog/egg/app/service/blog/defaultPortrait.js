'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryDefaultPortrait() {
    const { ctx } = this;
    const msg = await ctx.model.Blog.DefaultPortrait.findAll();
    return msg;
  }
}

module.exports = RecreationService;
