'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class CommentsService extends Service {
  async queryComments(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const comments = await ctx.model.Blog.BlogComments.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
      where: {
        upt_act: { [Op.ne]: 'D' },
      },
      include: [{
        model: this.app.model.Blog.CommentsReply,
      }],
    });
    return comments;
  }
  async createComments(body) {
    console.log(body);
    const { ctx } = this;
    const { roles } = ctx.state.user;
    if (roles.code !== 'user') {
    const created = await ctx.model.Blog.BlogComments.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }
  }
  async deleteComments(body) {
    const { ctx } = this;
    const { roles } = ctx.state.user;
    if (roles.code !== 'user') {
      const deleted = await ctx.model.Blog.BlogComments.update({ upt_act: 'D' }, {
        where: { id: body.id },
      });
      if (deleted) {
        return { success: true, data: deleted };
      }
    }
  }
}

module.exports = CommentsService;
