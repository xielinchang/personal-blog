'use strict';
const Service = require('egg').Service;
class UserService extends Service {

  async createVisitAndSession(body) {
    const { ctx } = this;
    const ip = ctx.request.ip;

    // 使用事务处理保证数据一致性
    const transaction = await ctx.model.transaction();

    try {
      // 使用 findOrCreate 获取访问记录
      const [ visit, created ] = await ctx.model.User.Visit.findOrCreate({
        where: { ip },
        defaults: { ...body, ip }, // 确保 IP 被正确记录
        transaction,
      });
      // 更新访问计数
      await ctx.model.User.Visit.update({
        visit_count: visit.visit_count + 1,
      }, {
        where: { id: visit.id },
        transaction,
      });
      // 创建访问会话记录
      const sessionCreated = await ctx.model.User.VisitSession.create({
        visit_id: visit.id,
        start_time: new Date().toLocaleString(),
        visit_page: body.visit_page || '/', // 避免硬编码
      }, { transaction });


      // 提交事务
      await transaction.commit();

      // 返回结果
      return {
        success: true,
        visit,
        sessionCreated,
        msg: created ? 'The user\'s first visit' : 'User access record added successfully',
      };
    } catch (error) {
      // 回滚事务
      await transaction.rollback();

      // 错误处理
      ctx.logger.error(`Failed to create visit and session for IP: ${ip}`, error);
      return {
        success: false,
        data: { ip },
        error,
        msg: 'Visit failed!',
      };
    }
  }

  async queryVisit(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };

    const visits = await ctx.model.User.Visit.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      include: [{
        model: this.app.model.User.VisitSession,
      }],
      distinct: true,
      order: [[ 'id', 'desc' ]],
    });
    if (visits) {
      return { success: true, visits };
    }
  }
  async updateLeaveTime(body) {
    const { ctx } = this;
    try {

      const session = await ctx.model.User.VisitSession.update(body, {
        where: { id: body.id },
      });
      if (session) {
        return { success: true, session, body, msg: 'Leave time updated successfully' };
      }

    } catch (error) {
      console.log(error);
      return { success: false, error, msg: 'Failed!' };
    }
  }
}
module.exports = UserService;
