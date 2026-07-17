'use strict';

const Controller = require('egg').Controller;

class PhotoController extends Controller {
  async queryPhoto() {
    const { ctx } = this;
    const msg = await ctx.service.web.photoWall.queryPhoto(ctx.request.body);
    ctx.body = msg;
  }
  async deletePhoto() {
    const { ctx } = this;
    const msg = await ctx.service.web.photoWall.deletePhoto(ctx.request.body);
    ctx.body = msg;
  }
  async createPhoto() {
    const { ctx } = this;
    const msg = await ctx.service.web.photoWall.createPhoto(ctx.request.body);
    ctx.body = msg;
  }
  async updatePhoto() {
    const { ctx } = this;
    const msg = await ctx.service.web.photoWall.updatePhoto(ctx.request.body);
    ctx.body = msg;
  }
}

module.exports = PhotoController;
