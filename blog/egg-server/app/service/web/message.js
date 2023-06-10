'use strict';


/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class MessageService extends Service {
  async queryMessage(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const message = await ctx.model.Web.Message.findAndCountAll({
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      order: [[ 'id', 'desc' ]],
      where: {
        upt_act: { [Op.ne]: 'D' },
      },
      include: [{
        model: app.model.Web.MessageReply,
      }, {
        model: app.model.User.User,
      }],
    });
    return message;
  }
  async createMessage(body) {
    const { ctx } = this;
    return await ctx.model.transaction(async t => {
      const createMessage = await ctx.model.Web.Message.create(body, { transaction: t });

      if (createMessage) {
        await ctx.model.Web.MessageUser.create({
          message_id: createMessage.id,
          user_id: body.user_id,
          transaction: t,
        });
        return { success: true, msg: '添加成功' };
      }
    });
  }

  async deleteMessage(body) {
    const { ctx } = this;
    const deleted = await ctx.model.Web.Message.update({ upt_act: 'D' }, {
      where: { id: body.id },
    });
    if (deleted) {
      return { success: true, data: deleted };
    }

  }
}

module.exports = MessageService;
