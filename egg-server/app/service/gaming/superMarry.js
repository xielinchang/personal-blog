'use strict';

const Service = require('egg').Service;

class UserDetailService extends Service {
  // 查询地图
  async queryMarryMap(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } }; // 排除标记为删除的记录
    if (body.id) {
      where.id = body.id; // 如果传入了 id，则作为查询条件
    }
    const maps = await ctx.model.Gaming.SuperMarry.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      where,
    });
    if (maps) {
      return { success: true, result: maps };
    }
    return { success: false, message: 'query fail' };
  }

  // 新增地图
  async createMarryMap(body) {
    const { ctx } = this;
    const created = await ctx.model.Gaming.SuperMarry.create(body);
    if (created) {
      return { success: true, data: body };
    }
  }

  // 更新地图
  async updateMarryMap(body) {
    const { ctx } = this;
    try {
      const updated = await ctx.model.Gaming.SuperMarry.update(body, {
        where: { id: body.id },
      });
      if (updated[0] > 0) { // Sequelize 的 update 方法返回一个数组，第一个元素是受影响的行数
        return { success: true, data: body };
      }
      return { message: 'No content has been updated.' };
    } catch (error) {
      ctx.logger.error('failed:', error);
      return { success: false, message: 'failed' };
    }
  }

  // 删除地图（逻辑删除）
  async deleteMarryMap(body) {
    const { ctx } = this;
    try {
      const deleted = await ctx.model.Gaming.SuperMarry.update(
        { upt_act: 'D' }, // 标记为删除
        { where: { id: body.id } }
      );
      if (deleted[0] > 0) {
        return { success: true, message: 'deleted successfully' };
      }
      return { success: false, message: 'No map needs to be deleted was found.' };
    } catch (error) {
      ctx.logger.error('delete failed:', error);
      return { success: false, message: 'delete failed' };
    }
  }
}

module.exports = UserDetailService;
