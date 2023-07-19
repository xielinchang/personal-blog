'use strict';
const Service = require('egg').Service;
const md5 = require('md5');
class UserService extends Service {
  async register(body) {
    const { ctx, app } = this;
    body.password = md5(md5(body.password) + app.config.password_salt);
    // 创建或者查询用户
    // created表示这条是否是创建出来的
    const [, created] = await ctx.model.User.User.findOrCreate({
      where: { username: body.username },
      defaults: body,
    });

    if (created) {
      return { data: body, success: true };
    }
    return { success: false, msg: '注册失败 账号已经存在！' };
  }
  async login({ username, password }) {
    const { app, ctx } = this;
    // created表示这条是否是创建出来的
    password = md5(md5(password) + app.config.password_salt);
    const user = await ctx.model.User.User.findOne({
      where: { username },
    });
    if (!user) {
      return false;
    }
    if (user.password === password) {
      const token = app.jwt.sign({
        userid: user.id,
        username: user.username,
      }, app.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 1 }
      );
      return { success: true, token };
    }
    return { success: false, msg: '登录失败' };
  }
  async changePsw(body) {
    const { app, ctx } = this;
    const { old_pass, pass } = body;
    const { userid } = ctx.state.user;
    try {
      const user = await ctx.model.User.User.findOne({
        where: {
          id: userid,
        },
      });
      console.log(old_pass, pass, userid);
      if (md5(md5(old_pass) + app.config.password_salt) !== user.password) {
        return { success: false, msg: '原密码错误！！' };
      }
      await user.update({
        password: md5(md5(pass) + app.config.password_salt),
        updated_at: ctx.helper.formatTime(new Date()),
        upt_act: 'U',
      });
      return { success: true, msg: '修改成功！！' };
    } catch (error) {
      console.log(error);
      return { success: false, msg: '密码修改失败！！' };
    }
  }
  async resetPsw(body) {
    const { app, ctx } = this;
    try {
      const user = await ctx.model.User.User.findOne({
        where: {
          id: body.id,
        },
      });
      await user.update({
        password: md5(md5('888888') + app.config.password_salt),
        updated_at: ctx.helper.formatTime(new Date()),
        upt_act: 'U',
      });
      return { success: true, msg: '重置成功！！初始密码为：888888' };
    } catch (error) {
      console.log(error);
      return { success: false, msg: '密码重置失败！！' };
    }
  }
  async getUserInfo() {
    const { ctx } = this;
    const { userid } = ctx.state.user;
    try {
      const user = await ctx.model.User.User.findOne({
        where: {
          id: userid,
        },
        include: [{
          model: this.app.model.User.UserDetail,
        }],
      });
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async queryUserIp() {
    const { ctx } = this;
    return { ip: ctx.request.ip };
  }
  async queryUser(body) {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (body.query.id) {
      where.id = body.query.id;
    }
    if (body.query.username) {
      where.username = body.query.username
    }
    const user = await ctx.model.User.User.findAndCountAll({
      where,
      include: [{
        model: this.app.model.User.UserDetail,
      }],
    });
    if (user) {
      return { success: true, user };
    }
  }

  async updateUser(body) {
    const { ctx } = this;
    body.upt_act = 'U';
    const updateMsg = {};
    if (body.name) {
      updateMsg.name = body.name;
    }
    if (body.portrait) {
      updateMsg.portrait = body.portrait;
    }
    const updated = await ctx.model.User.User.update(
      updateMsg,
      {
        where: {
          id: body.id,
        },
      });
    if (updated) {
      return { success: true, data: body };
    }
    if (updated) {
      return { success: true, data: body };
    }
  }
  async deleteUser(body) {
    const { ctx } = this;
    const deleted = await ctx.model.User.User.update({ upt_act: 'D' }, {
      where: {
        id: body.id,
      },
    });
    if (deleted) {
      return { success: true, data: body };
    }

  }
}

module.exports = UserService;
