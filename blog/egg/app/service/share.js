'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class ShareService extends Service {
  async queryShare(body) {
    const { ctx } = this;
    const where = {};
    if (body.query.id) {
      where.id = body.query.id;
    }
    if (body.query.title) {
      where.title = body.query.title;
    }
    if (body.query.tags) {
      where.tags = body.query.tags;
    }
    const share = await ctx.model.BlogShare.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
    });
    return share;
  }
  async createShare(body) {
    console.log(body);
    const { ctx } = this;
    const created = await ctx.model.BlogShare.create(body);

    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteShare(body) {
    const { ctx } = this;
    const deleted = await ctx.model.BlogShare.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async updateShare(body) {
    const { ctx } = this;
    const updated = await ctx.model.BlogShare.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
  async querySaveShare() {
    const { ctx } = this;
    const share = await ctx.model.SaveShare.findAndCountAll();
    return share;
  }
  async saveShare(body) {
    const { ctx } = this;
    const updated = await ctx.model.SaveShare.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body, message: '保存成功' };
    }
  }
}

module.exports = ShareService;
