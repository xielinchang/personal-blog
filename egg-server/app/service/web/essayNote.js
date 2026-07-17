'use strict';
/* const md5 = require('blueimp-md5'); */
const Service = require('egg').Service;

class EssayNoteService extends Service {
  async queryEssayNote(body, note_id) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (body.query.essay_id) {
      where.essay_id = body.query.essay_id;
    }
    if (note_id) {
      where.note_id = note_id;
    }
    const note = await ctx.model.Web.EssayNote.findAndCountAll({
      where,
      include: [{
        model: app.model.User.User,
      }],
    });
    return note;
  }
  // 找到用户的所有笔记
  async getUserNotes(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    try {
      const note = await ctx.model.Web.EssayNote.findAndCountAll({
        where,
        include: [{
          model: app.model.User.User,
        }],
      });
      const userNotes = note.rows.filter(item => {
        return item.users[0].id === body.user_id;
      });
      return userNotes;
    } catch (error) {
      // 处理异常
      throw error;
    }
  }
  async updateEssayNote(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (body.essay_id) {
      where.essay_id = body.essay_id;
    }
    const note = await ctx.model.Web.EssayNote.findAndCountAll({
      where,
      include: [{
        model: app.model.User.User,
      }],
    });
    // 若找不到则添加，负责进行修改
    console.log(!note.rows.find(item => {
      return item.users[0].id === body.user_id;
    }));
    if (!note.rows.find(item => {
      return item.users[0].id === body.user_id;
    })) {
      this.createEssayNote(body);
    } else {
      body.upt_act = 'U';
      const updated = await ctx.model.Web.EssayNote.update(body, {
        where: {
          id: body.id,
        },
      });
      if (updated) {
        return { success: true, data: body };
      }
    }


  }
  async createEssayNote(body) {
    const { ctx } = this;
    body.created_at = ctx.helper.formatTime(new Date());
    body.updated_at = ctx.helper.formatTime(new Date());
    body.upt_act = 'I';
    body.id = undefined; // 避免修改时将note的id传回，引发主键冲突
    console.log(body);
    // 错一个便为false
    await ctx.model.transaction(async t => {
      try {
        const created = await ctx.model.Web.EssayNote.create(body, { transaction: t });
        if (created) {
          await ctx.model.Web.NoteUser.create({
            note_id: created.id,
            user_id: body.user_id,
            transaction: t,
          });
        }
      } catch (error) {
        // 处理异常，回滚事务
        await t.rollback();
        throw error;
      }
    });
  }
  async deleteEssayNote(body) {
    const { ctx } = this;
    body.upt_act = 'D';
    const updated = await ctx.model.Web.EssayNote.update(body, {
      where: {
        id: body.id,
      },
    });
    if (updated) {
      return { success: true, data: updated };
    }
  }
}

module.exports = EssayNoteService;
