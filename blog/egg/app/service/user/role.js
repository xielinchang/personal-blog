'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async queryRoleList() {
    const { ctx } = this;
    const msg = await ctx.model.User.Role.findAll();
    return msg;
  }
}

module.exports = RoleService;
