/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-25 14:42:32
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-15 16:35:41
 */
'use strict';


const Service = require('egg').Service;

class SysDictService extends Service {

  async query(query) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const queryList = [ 'type' ];
    let where = {};
    where = ctx.helper.queryFilter(query, queryList);
    where.state = { [Op.ne]: 0 };
    try {
      const data = await ctx.model.Sys.Dict.findAll({
        where,
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async page(query) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const { page, limit } = query;
    const queryList = [ 'dict_type', 'dict_name', 'state' ];
    let where = {};
    where = ctx.helper.queryFilter(query, queryList);
    try {
      const data = await ctx.model.Sys.DictType.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async pageByType(query) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const { page, limit, type } = query;
    const queryList = [ 'type', 'label', 'value', 'state' ];
    let where = {};
    where = ctx.helper.queryFilter(query, queryList);
    try {
      const data = await ctx.model.Sys.Dict.findAndCountAll({
        where,
        offset: (page - 1) * limit,
        limit: parseInt(limit),
      });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async create(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Sys.DictType.create(body);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async createByType(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Sys.Dict.create(body);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Sys.DictType.update(body, {
        where: {
          id: body.id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateByType(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Sys.Dict.update(body, {
        where: {
          id: body.id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.transaction(async t => {
        await ctx.model.Sys.DictType.destroy({
          where: {
            id: body.id,
          },
        }, { transaction: t });
        await ctx.model.Sys.Dict.destroy({
          where: {
            type: body.dict_type,
          },
        }, { transaction: t });
        return true;
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteByType(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    try {
      return await ctx.model.Sys.Dict.destroy({
        where: {
          id: body.id,
        },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
module.exports = SysDictService;
