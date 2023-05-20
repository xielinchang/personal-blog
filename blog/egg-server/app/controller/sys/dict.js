/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-25 14:41:39
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-15 16:42:34
 */
'use strict';

const Controller = require('../base');

class SysDictController extends Controller {

  async query() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      type: { type: 'string', required: true },
    }, query);
    const res = await ctx.service.sys.dict.query(query);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }

  async page() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);
    const res = await ctx.service.sys.dict.page(query);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }

  async pageByType() {
    const { ctx } = this;
    const query = ctx.query;
    ctx.validate({
      limit: { type: 'string', required: true },
      page: { type: 'string', required: true },
    }, query);
    const res = await ctx.service.sys.dict.pageByType(query);
    if (res) {
      this.success(res);
    } else {
      this.error('查询失败！');
    }
  }

  async create() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      dict_name: { type: 'string', required: true },
      dict_type: { type: 'string', required: true },
      state: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.dict.create(body);
    if (res) {
      this.success(res);
    } else {
      this.error('新增失败！');
    }
  }

  async createByType() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      type: { type: 'string', required: true },
      label: { type: 'string', required: true },
      value: { type: 'string', required: true },
      state: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.dict.createByType(body);
    if (res) {
      this.success(res);
    } else {
      this.error('新增失败！');
    }
  }

  async update() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.dict.update(body);
    if (res) {
      this.success(res);
    } else {
      this.error('更新失败！');
    }
  }

  async updateByType() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.dict.updateByType(body);
    if (res) {
      this.success(res);
    } else {
      this.error('更新失败！');
    }
  }

  async delete() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      dict_type: { type: 'string', required: true },
      id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.dict.delete(body);
    if (res) {
      this.success(res);
    } else {
      this.error('删除失败！');
    }
  }

  async deleteByType() {
    const { ctx } = this;
    const body = ctx.request.body;
    ctx.validate({
      id: { type: 'integer', required: true },
    }, body);
    const res = await ctx.service.sys.dict.deleteByType(body);
    if (res) {
      this.success(res);
    } else {
      this.error('删除失败！');
    }
  }
}

module.exports = SysDictController;
