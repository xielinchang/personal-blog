'use strict';
const Service = require('egg').Service;

class UserRoleService extends Service {
  async queryUserRole() {
    const { ctx } = this;
    const user = await ctx.model.User.UserRole.findAll();
    if (user) {
      return { success: true, user };
    }
  }
  async updateUserRole(body) {
    const { ctx } = this;
    const updated = await ctx.model.User.UserRole.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = UserRoleService;
