'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async queryRoleList() {
    const { ctx } = this;
    const msg = await ctx.service.user.role.queryRoleList(ctx.request.body);
    ctx.body = msg;
  }

}

module.exports = RoleController;
