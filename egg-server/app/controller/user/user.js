'use strict';

const Controller = require('../base');

class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const user = await ctx.service.user.user.register(ctx.request.body);
    ctx.body = user;
  }
  async resetPsw() {
    const { ctx } = this;
    const user = await ctx.service.user.user.resetPsw(ctx.request.body);
    ctx.body = user;
  }
  async changePsw() {
    const { ctx } = this;
    const user = await ctx.service.user.user.changePsw(ctx.request.body);
    ctx.body = user;
  }
  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    const res = await ctx.service.user.user.login(body);
    ctx.body = res;
  }
  async getUserInfo() {
    const { ctx } = this;
    const res = await ctx.service.user.user.getUserInfo();
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }
  async queryUserIp() {
    const { ctx } = this;
    const msg = await ctx.service.user.user.queryUserIp(ctx.request.body);
    ctx.body = msg;
  }
  async queryUser() {
    const { ctx } = this;
    const msg = await ctx.service.user.user.queryUser(ctx.request.body);
    ctx.body = msg;
  }
  async updateUser() {
    const { ctx } = this;
    const msg = await ctx.service.user.user.updateUser(ctx.request.body);
    ctx.body = msg;
  }
  async deleteUser() {
    const { ctx } = this;
    const msg = await ctx.service.user.user.deleteUser(ctx.request.body);
    ctx.body = msg;
  }
  async getUsersByRole() {
    const { ctx } = this;
    const res = await ctx.service.user.user.getUsersByRole(ctx.request.body);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }


}

module.exports = UserController;
