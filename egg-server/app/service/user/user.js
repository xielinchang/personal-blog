'use strict';
const Service = require('egg').Service;
const md5 = require('md5');
class UserService extends Service {
  async register(body) {
    const { ctx, app } = this;
    const pwdCheck = body.password.length < 6 || body.password.length > 20;
    const usernameCheck = body.username.length < 6 || body.username.length > 20;
    const nameCheck = body.name.length < 1 || body.name.length > 20;
    if (pwdCheck || usernameCheck) {
      return { success: false, msg: 'The username or password should consist of 6 to 20 characters, which can be either numbers or letters.' };
    }
    if (nameCheck) {
      return { success: false, msg: 'The name length should be between 1 and 20 characters.' };
    }
    body.password = md5(md5(body.password) + app.config.password_salt);
    // 创建或者查询用户
    // created表示这条是否是创建出来的
    const [ , created ] = await ctx.model.User.User.findOrCreate({
      where: { username: body.username },
      defaults: body,
    });

    if (created) {
      const user = await ctx.model.User.User.findOne({
        where: { username: body.username },
      });
      await ctx.model.User.UserDetail.create({
        user_id: user.id,
        good: '',
        collect: '',
      });
      return { data: body, success: true, msg: 'Registration successful!' };
    }
    return { success: false, msg: 'Registration failed. The account already exists!' };
  }
  async login({ username, password }) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    // created表示这条是否是创建出来的
    password = md5(md5(password) + app.config.password_salt);
    const user = await ctx.model.User.User.findOne({
      where: {
        username,
        upt_act: { [Op.ne]: 'D' },
      },
    });
    if (!user) {
      return { success: false, msg: 'Login failed! User does not exist' };
    }
    if (user.password === password) {
      const token = app.jwt.sign({
        userid: user.id,
        username: user.username,
      }, app.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 30 }
      );
      return { success: true, token, msg: 'Login successful!' };
    }
    return { success: false, msg: 'Login failed! Incorrect username or password!' };
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
        return { success: false, msg: 'Original password is incorrect!' };
      }
      await user.update({
        password: md5(md5(pass) + app.config.password_salt),
        updated_at: ctx.helper.formatTime(new Date()),
        upt_act: 'U',
      });
      return { success: true, msg: 'Password changed successfully!' };
    } catch (error) {
      console.log(error);
      return { success: false, msg: 'Password change failed!' };
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
      return { success: true, msg: 'Password reset successfully! The initial password is: 888888' };
    } catch (error) {
      console.log(error);
      return { success: false, msg: 'Password reset failed!' };
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
      where.username = body.query.username;
    }
    const user = await ctx.model.User.User.findAndCountAll({
      where,
      limit: body.limit * 1,
      offset: (body.offset - 1) * body.limit,
      include: [{
        model: this.app.model.User.UserDetail,
      }],
      order: [[ 'created_at', 'desc' ]],
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
