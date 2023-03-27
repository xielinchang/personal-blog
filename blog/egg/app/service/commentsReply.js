'use strict';
const Service = require('egg').Service;

class CommentsReplyService extends Service {
  async createCommentsReply(body) {
    console.log(body);
    const { ctx } = this;
    const created = await ctx.model.CommentsReply.create(body);

    if (created) {
      return { success: true, data: body };
    }
  }
  async deleteCommentsReply(body) {
    const { ctx } = this;
    const deleted = await ctx.model.CommentsReply.destroy({
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
}

module.exports = CommentsReplyService;
