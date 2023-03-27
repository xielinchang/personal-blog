'use strict';

const Service = require('egg').Service;

class RecreationService extends Service {
  async queryRecord(body) {
    const { ctx } = this;
    const msg = await ctx.model.BlogRecord.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
    });
    return msg;
  }
  async deleteRecord(body) {
    const { ctx } = this;
    const deleted = await ctx.model.BlogRecord.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async createRecord(body) {
    const { ctx } = this;
    const created = await ctx.model.BlogRecord.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async queryRecordDefault() {
    const { ctx } = this;
    const msg = await ctx.model.RecordDefault.findAll();
    return msg;
  }
  async updateRecordDefault(body) {
    const { ctx } = this;
    const updated = await ctx.model.RecordDefault.update(body, {
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
