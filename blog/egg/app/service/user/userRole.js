'use strict';
const Service = require('egg').Service;

class UserRoleService extends Service {
  async queryUserRole(body) {
    const { ctx } = this;
    const user = await ctx.model.User.UserRole.findOne({
      where: {
        user_id: body.user_id,
      },
    });
    if (user) {
      return { success: true, user };
    }
  }
  async updateUserRole(body) {
    const { ctx } = this;
    const updated = await ctx.model.User.UserRole.update(body, {
      where: {
        user_id: body.user_id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }
  }
}

module.exports = UserRoleService;
