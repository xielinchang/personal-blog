'use strict';

const Controller = require('egg').Controller;

class UserDetailController extends Controller {
  async updateUserDetail() {
    const { ctx } = this;
    const User = await ctx.service.user.userDetail.updateUserDetail(ctx.request.body);
    ctx.body = User;
  }
}

module.exports = UserDetailController;
