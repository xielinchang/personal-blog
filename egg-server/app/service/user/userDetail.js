'use strict';
const Service = require('egg').Service;

class UserDetailService extends Service {
  async updateUserDetail(body) {
    const { ctx } = this;
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
