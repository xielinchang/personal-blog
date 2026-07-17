'use strict';


/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class BannerService extends Service {
  async queryBanner(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const Banner = await ctx.model.Web.Banner.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
      where: {
        upt_act: { [Op.ne]: 'D' },
      },
      include: [{
        model: app.model.Web.BlogEssay,
      }],
    });
    return Banner;
  }
  async createBanner(body) {
    const { ctx } = this;
    const ids = body.ids.split(',');
    const createdBanner = await Promise.all(ids.map(async essay_id => {
      const createBanner = await ctx.model.Web.Banner.create({
        id: undefined,
        essay_id,
      });
      return createBanner;
    }));
    // const createBanner = await ctx.model.Web.Banner.create(body);
    if (createdBanner) {
      return { success: true, msg: '添加成功' };
    }
  }
  // 目前不用
  async updateBanner(body) {
    const { ctx } = this;
    body.upt_act = 'U';
    const updated = await ctx.model.Web.Banner.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
  async deleteBanner(body) {
    const { ctx } = this;
    const ids = body.ids.length > 1 ? body.ids.split(',') : body.ids[0];
    const deleted = await ctx.model.Web.Banner.update(
      { upt_act: 'D' },
      {
        where: { id: ids },
      });
    if (deleted) {
      return { success: true, ids, msg: '删除成功' };
    }

  }
}

module.exports = BannerService;
