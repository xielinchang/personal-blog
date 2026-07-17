'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  // 首页背景
  async queryHomeBg() {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const msg = await ctx.model.Web.HomeBg.findAll({
      where,
    });
    return msg;
  }
  async createHomeBg(body) {
    const { ctx } = this;
    const created = await ctx.model.Web.HomeBg.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteHomeBg(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.HomeBg.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: body };
    }
  }
  async queryHomeBgNow() {
    const { ctx,app } = this;
    const msg = await ctx.model.Web.HomeBgNow.findAll();
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if(msg?.[0]?.bg_id >= 99999){
      const bgs = await ctx.model.Web.HomeBg.findAll({
        where,
      });
      return bgs;
    } else{
      const bg = await ctx.model.Web.HomeBg.findAll({
        where: {
          id: msg[0].bg_id,
        },
      });
      return bg;
    }

  }
  async updateHomeBgNow(body) {
    const { ctx } = this;
    const msg = await ctx.model.Web.HomeBgNow.update(body, {
      where: { id: 1 },
    });
    return msg;
  }
  // 首页背景(晚上)
  async queryHomeBgNight() {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const msg = await ctx.model.Web.HomeBgNight.findAll({
      where,
    });
    return msg;
  }
  async createHomeBgNight(body) {
    const { ctx } = this;
    const created = await ctx.model.Web.HomeBgNight.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteHomeBgNight(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.HomeBgNight.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async queryHomeBgNowNight() {
    const { ctx,app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const msg = await ctx.model.Web.HomeBgNowNight.findAll();
    if(msg?.[0]?.bg_id >= 99999){
      const bgs = await ctx.model.Web.HomeBgNight.findAll({
        where,
      });
      return bgs;
    } else {
      const bg = await ctx.model.Web.HomeBgNight.findAll({
        where: {
          id: msg[0].bg_id,
        },
      });
      return bg;

    }

  }
  async updateHomeBgNowNight(body) {
    const { ctx } = this;
    const msg = await ctx.model.Web.HomeBgNowNight.update(body, {
      where: { id: 1 },
    });
    return msg;
  }
}

module.exports = RecreationService;
