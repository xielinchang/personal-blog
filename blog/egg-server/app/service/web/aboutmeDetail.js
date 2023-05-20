'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class AboutmeService extends Service {
  async queryAboutme() {
    const { ctx } = this;
    const aboutme = await ctx.model.Web.AboutmeDetail.findAll();
    return aboutme;
  }
  async updateAboutme(body) {
    const { ctx } = this;
    const { roles } = ctx.state.user;
    // 有这个判断就说明普通用户是无法调用这个接口的
    if (roles.code !== 'user') {
      const updated = await ctx.model.Web.AboutmeDetail.update(body, {
        where: {
          id: body.id,
        },
      });
      if (updated) {
        return { success: true, data: body };
      }
    }
  }
}

module.exports = AboutmeService;
