'use strict';

const Controller = require('egg').Controller;

class MessageController extends Controller {
  async queryMessage() {
    const { ctx } = this;
    const msg = await ctx.service.web.message.queryMessage(ctx.request.body);
    ctx.body = msg;
  }
  async createMessage() {
    const { ctx } = this;
    const Message = await ctx.service.web.message.createMessage(ctx.request.body);
    ctx.body = Message;
  }
  async deleteMessage() {
    const { ctx } = this;
    const Message = await ctx.service.web.message.deleteMessage(ctx.request.body);
    ctx.body = Message;
  }
  async updateMessage() {
    const { ctx } = this;
    const Message = await ctx.service.web.message.updateMessage(ctx.request.body);
    ctx.body = Message;
  }
}

module.exports = MessageController;
