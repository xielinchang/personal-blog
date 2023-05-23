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

module.exports = AboutmeService;
