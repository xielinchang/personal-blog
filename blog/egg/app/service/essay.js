'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class EssayService extends Service {
  async queryEssay(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = {};
    if (body.query.id) {
      where.id = body.query.id;
    }
    if (body.query.html) {
      where.html = { [Op.like]: `%${body.query.html}%` };
    }
    if (body.query.title) {
      where.title = { [Op.like]: `%${body.query.title}%` };
    }
    if (body.query.domain) {
      where.domain = body.query.domain;
    }
    if (body.query.tags) {
      where.tags = { [Op.like]: `%${body.query.tags}%` };
    }
    const essay = await ctx.model.BlogEssay.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      include: [{
        model: this.app.model.EssayDetail,
      }],
      order: [[ this.app.model.EssayDetail, 'good', 'desc' ]],
    });
    return essay;
  }
  async createEssay(body) {
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
