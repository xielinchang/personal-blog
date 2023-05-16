'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class EssayCommentsService extends Service {
  async queryEssayComments(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (body.query.essay_id) {
      where.essay_id = body.query.essay_id;
    }
    const comments = await ctx.model.Blog.EssayComments.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
    });
    return comments;
  }
  async createEssayComments(body) {
    const { ctx } = this;
    body.created_at = ctx.helper.formatTime(new Date());
    body.updated_at = ctx.helper.formatTime(new Date());
    console.log(body);
    const created = await ctx.model.Blog.EssayComments.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteEssayComments(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Blog.EssayComments.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
}

module.exports = EssayCommentsService;
