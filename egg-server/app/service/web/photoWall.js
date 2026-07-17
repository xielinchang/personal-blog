'use strict';

const Service = require('egg').Service;

class PhotoService extends Service {
  async queryPhoto(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const msg = await ctx.model.Web.PhotoWall.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      where,
      order: [[ 'sort', 'asc' ]],
    });
    return msg;
  }
  async deletePhoto(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.PhotoWall.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async createPhoto(body) {
    const { ctx } = this;
    const created = await ctx.model.Web.PhotoWall.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async updatePhoto(body) {
    const { ctx } = this;
    const updated = await ctx.model.Web.PhotoWall.update(body, {
      where: { id: body.id },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = PhotoService;
