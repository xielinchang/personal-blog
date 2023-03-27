'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class CommentsService extends Service {
  async queryComments(body) {
    const { ctx } = this;
    const comments = await ctx.model.BlogComments.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
      include: [{
        model: this.app.model.CommentsReply,
      }],
    });
    return comments;
  }
  async createComments(body) {
    console.log(body);
    const { ctx } = this;
    const created = await ctx.model.BlogComments.create(body);

    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteComments(body) {
    const { ctx } = this;
    const deleted = await ctx.model.BlogComments.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
}

module.exports = CommentsService;
