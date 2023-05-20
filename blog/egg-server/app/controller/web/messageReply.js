'use strict';

const Controller = require('egg').Controller;

class MessageReplyController extends Controller {
  async createMessageReply() {
    const { ctx } = this;
    const Message = await ctx.service.web.messageReply.createMessageReply(ctx.request.body);
    ctx.body = Message;
  }
  async deleteMessageReply() {
    const { ctx } = this;
    const Message = await ctx.service.web.messageReply.deleteMessageReply(ctx.request.body);
    ctx.body = Message;
  }
}

module.exports = MessageReplyController;
