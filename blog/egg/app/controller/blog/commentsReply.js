'use strict';

const Controller = require('egg').Controller;

class CommentsReplyController extends Controller {
  async createCommentsReply() {
    const { ctx } = this;
    const comments = await ctx.service.blog.commentsReply.createCommentsReply(ctx.request.body);
    ctx.body = comments;
  }
  async deleteCommentsReply() {
    const { ctx } = this;
    const comments = await ctx.service.blog.commentsReply.deleteCommentsReply(ctx.request.body);
    ctx.body = comments;
  }
}

module.exports = CommentsReplyController;
