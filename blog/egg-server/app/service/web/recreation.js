'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryRecord(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const msg = await ctx.model.Web.BlogRecord.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      where,
      order: [[ 'id', 'desc' ]],
    });
    return msg;
  }
  async deleteRecord(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.BlogRecord.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async createRecord(body) {
    const { ctx } = this;
    const created = await ctx.model.Web.BlogRecord.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async queryRecordDefault() {
    const { ctx } = this;
    const msg = await ctx.model.Web.RecordDefault.findAll();
    return msg;
  }
  async updateRecordDefault(body) {
    const { ctx } = this;
    const updated = await ctx.model.Web.RecordDefault.update(body, {
      where: {
        id: body.id,
      },
    });

    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = RecreationService;
