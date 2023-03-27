'use strict';

const Controller = require('egg').Controller;

class CommentsReplyController extends Controller {
  async createCommentsReply() {
    const { ctx } = this;
    const comments = await ctx.service.commentsReply.createCommentsReply(ctx.request.body);
    ctx.body = comments;
  }
  async deleteCommentsReply() {
    const { ctx } = this;
    const comments = await ctx.service.commentsReply.deleteCommentsReply(ctx.request.body);
    ctx.body = comments;
  }
}

module.exports = CommentsReplyController;
