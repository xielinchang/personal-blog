'use strict';

const Controller = require('egg').Controller;

class SuperMarryMapController extends Controller {
  // 查询地图
  async queryMarryMap() {
    const { ctx } = this;
    const maps = await ctx.service.gaming.superMarry.queryMarryMap(ctx.request.body);
    ctx.body = maps;
  }

  // 新增地图
  async createMarryMap() {
    const { ctx } = this;
    const result = await ctx.service.gaming.superMarry.createMarryMap(ctx.request.body);
    ctx.body = result;
  }

  // 更新地图
  async updateMarryMap() {
    const { ctx } = this;
    const result = await ctx.service.gaming.superMarry.updateMarryMap(ctx.request.body);
    ctx.body = result;
  }

  // 删除地图
  async deleteMarryMap() {
    const { ctx } = this;
    const result = await ctx.service.gaming.superMarry.deleteMarryMap(ctx.request.body);
    ctx.body = result;
  }
}

module.exports = SuperMarryMapController;
