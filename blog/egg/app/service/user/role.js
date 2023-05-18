'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async queryRoleList(body) {
    const { ctx } = this;
    const where = {};
    if (body.id) {
      where.id = body.id;
    }
    const msg = await ctx.model.User.Role.findAll({
      where,
    });
    return msg;
  }
}

module.exports = RoleService;
