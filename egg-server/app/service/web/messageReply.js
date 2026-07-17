'use strict';
const Service = require('egg').Service;

class MessageReplyService extends Service {
  async createMessageReply(body) {
    console.log(body);
    const { ctx } = this;
    const created = await ctx.model.Web.MessageReply.create(body);

    if (created) {
      return { success: true, data: body };
    }
  }
  async updateMessageReply(body) {
    const updated = await this.ctx.model.Web.MessageReply.update(body, {
      where: { id: body.id },
    });
    if (updated) {
      return { success: true };
    }
  }
  async deleteMessageReply(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.MessageReply.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }
  }
}

module.exports = MessageReplyService;
