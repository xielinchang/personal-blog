'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class EssayService extends Service {
  async queryEssay(body) {
    const { ctx } = this;
    const where = {};
    if (body.query.id) {
      where.id = body.query.id;
    }
    if (body.query.title) {
      where.title = body.query.title;
    }
    if (body.query.subtitle) {
      where.subtitle = body.query.subtitle;
    }
    if (body.query.domain) {
      where.domain = body.query.domain;
    }
    const essay = await ctx.model.BlogEssay.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
    });
    return essay;
  }
  async createEssay(body) {
    console.log(body);
    const { ctx } = this;
    const created = await ctx.model.BlogEssay.create(body);

    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteEssay(body) {
    const { ctx } = this;
    const deleted = await ctx.model.BlogEssay.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
  async updateEssay(body) {
    const { ctx } = this;
    const updated = await ctx.model.BlogEssay.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
  async querySaveEssay() {
    const { ctx } = this;
    const essay = await ctx.model.SaveEssay.findAndCountAll();
    return essay;
  }
  async saveEssay(body) {
    const { ctx } = this;
    const updated = await ctx.model.SaveEssay.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body, message: '保存成功' };
    }
  }
}

module.exports = EssayService;
