'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryCasual(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const msg = await ctx.model.Web.Casual.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      where,
      order: [[ 'sort', 'asc' ]],
    });
    return msg;
  }
  async deleteCasual(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.Casual.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async createCasual(body) {
    const { ctx } = this;
    const created = await ctx.model.Web.Casual.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async updateCasual(body) {
    const { ctx } = this;
    const updated = await ctx.model.Web.Casual.update(body, {
      where: { id: body.id },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = RecreationService;
