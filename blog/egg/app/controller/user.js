'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async queryUserIp() {
    const { ctx } = this;
    const msg = await ctx.service.user.queryUserIp(ctx.request.body);
    ctx.body = msg;
  }
  async queryUser() {
    const { ctx } = this;
    const msg = await ctx.service.user.queryUser(ctx.request.body);
    ctx.body = msg;
  }
  async updateUser() {
    const { ctx } = this;
    const msg = await ctx.service.user.updateUser(ctx.request.body);
    ctx.body = msg;
  }
  async deleteUser() {
    const { ctx } = this;
    const msg = await ctx.service.user.deleteUser(ctx.request.body);
    ctx.body = msg;
  }
  async register() {
    const { ctx } = this;
    const user = await ctx.service.user.register(ctx.request.body);
    ctx.body = user;
  }
  async login() {
    const { ctx } = this;
    const user = await ctx.service.user.login(ctx.request.body);
    ctx.body = user;
  }
  async validate() {
    const { ctx } = this;
    const user = await ctx.service.user.validate();
    ctx.body = user;
  }

}

module.exports = UserController;
