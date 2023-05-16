'use strict';

const Controller = require('egg').Controller;

class UserRoleController extends Controller {
  async updateUserRole() {
    const { ctx } = this;
    const updated = await ctx.service.user.userRole.updateUserRole(ctx.request.body);
    ctx.body = updated;
  }
  async queryUserRole() {
    const { ctx } = this;
    const UserRoleList = await ctx.service.user.userRole.queryUserRole(ctx.request.body);
    ctx.body = UserRoleList;
  }
}
module.exports = UserRoleController;
