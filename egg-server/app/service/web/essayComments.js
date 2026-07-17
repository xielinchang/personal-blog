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
    const comments = await ctx.model.Web.EssayComments.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
      include: [{
        model: app.model.User.User,
      }],
    });
    return comments;
  }
  async createEssayComments(body) {
    const { ctx } = this;
    body.created_at = ctx.helper.formatTime(new Date());
    body.updated_at = ctx.helper.formatTime(new Date());
    // 错一个便为false
    return await ctx.model.transaction(async t => {
      const created = await ctx.model.Web.EssayComments.create(body, { transaction: t });
      if (created) {
        await ctx.model.Web.CommentUser.create({
          comment_id: created.id,
          user_id: body.user_id,
          transaction: t,
        });
        return { success: true, msg: '添加成功' };
      }
    });
  }
  async deleteEssayComments(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.EssayComments.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
}

module.exports = EssayCommentsService;
