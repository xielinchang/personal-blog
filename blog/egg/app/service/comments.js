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
  async updateComments(body) {
    const { ctx } = this;
    if (body.reply !== null) {
      const updated = await ctx.model.BlogComments.update({
        reply: body.reply,
        isreply: 'true',
      }, {
        where: {
          id: body.id,
        },
      });
      if (updated) {
        return { success: true, data: body };
      }
    } else {
      const updated = await ctx.model.BlogComments.update({
        reply: body.reply,
        isreply: 'false',
      }, {
        where: {
          id: body.id,
        },
      });
      if (updated) {
        return { success: true, data: body };
      }
    }


  }
}

module.exports = CommentsService;
