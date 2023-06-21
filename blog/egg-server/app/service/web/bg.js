'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryDayImg() {
    const { ctx } = this;
    const msg = await ctx.model.Web.DayImg.findAll();
    return msg;
  }
  async queryHomeBg() {
    const { ctx } = this;
    const msg = await ctx.model.Web.HomeBg.findAll();
    return msg;
  }
  async queryHomeBgNow() {
    const { ctx } = this;
    const msg = await ctx.model.Web.HomeBgNow.findAll();
    const bg = await ctx.model.Web.HomeBg.findAll({
      where: {
        id: msg[0].bg_id,
      },
    });
    return bg;
  }
  async updateHomeBgNow(body) {
    const { ctx } = this;
    const msg = await ctx.model.Web.HomeBgNow.update(body, {
      where: { id: 1 },
    });
    return msg;
  }
}

module.exports = RecreationService;
