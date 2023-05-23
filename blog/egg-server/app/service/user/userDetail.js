'use strict';
const Service = require('egg').Service;

class UserDetailService extends Service {
  async updateUserDetail(body) {
    const { ctx } = this;
    if (body.id === null) {
      const created = await ctx.model.User.UserDetail.create(body);
      if (created) {
        return { success: true, data: body };
      }
    }
    const updated = await ctx.model.User.UserDetail.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: body };
    }


  }
}

module.exports = UserDetailService;
