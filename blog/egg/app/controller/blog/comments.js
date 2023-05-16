'use strict';

const Controller = require('egg').Controller;

class CommentsController extends Controller {
  async queryComments() {
    const { ctx } = this;
    const msg = await ctx.service.blog.comments.queryComments(ctx.request.body);
    ctx.body = msg;
  }
  async createComments() {
    const { ctx } = this;
    const comments = await ctx.service.blog.comments.createComments(ctx.request.body);
    ctx.body = comments;
  }
  async deleteComments() {
    const { ctx } = this;
    const comments = await ctx.service.blog.comments.deleteComments(ctx.request.body);
    ctx.body = comments;
  }
  async updateComments() {
    const { ctx } = this;
    const comments = await ctx.service.blog.comments.updateComments(ctx.request.body);
    ctx.body = comments;
  }
}

module.exports = CommentsController;
