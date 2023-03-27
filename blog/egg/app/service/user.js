'use strict';
const md5 = require('blueimp-md5');
const Service = require('egg').Service;

class UserService extends Service {
  async queryUserIp() {
    const { ctx } = this;
    return { ip: ctx.request.ip };
  }
  async queryUser(body) {
    const { ctx } = this;
    const where = {};
    if (body.id) {
      where.id = body.id;
    }
    if (body.identity) {
      where.identity = body.identity;
    }
    const user = await ctx.model.User.findAndCountAll({
      where,
      include: [{
        model: this.app.model.UserDetail,
      }],
    });
    if (user) {
      return { success: true, user };
    }
  }
  async updateUser(body) {
    const { ctx } = this;
    const updateMsg = {};
    if (body.username) {
      updateMsg.username = body.username;
    }
    if (body.name) {
      updateMsg.name = body.name;
    }
    if (body.password) {
      updateMsg.password = body.password;
    }
    if (body.identity) {
      updateMsg.identity = body.identity;
    }
    if (body.portrait) {
      updateMsg.portrait = body.portrait;
    }
    const updated = await ctx.model.User.update(
      updateMsg,
      {
        where: {
          id: body.id,
        },
      });
    if (updated) {
      return { success: true, data: body };
    }
  }
  async deleteUser(body) {
    const { ctx } = this;

    const deleted = await ctx.model.User.destroy({
      where: {
        id: body.id,
      },
    });
    console.log(body, deleted);
    if (deleted) {
      return { success: true, data: body };
    }
  }
  async register(body) {
    const { ctx } = this;
    body.password = md5(body.password);
    // 创建或者查询用户
    // created表示这条是否是创建出来的
    const [ , created ] = await ctx.model.User.findOrCreate({
      where: { username: body.username },
      defaults: body,
    });
    if (created) {
      return { success: true };
    }
    return { success: false, msg: '注册失败 账号已经存在！' };
  }
  async login(body) {
    const { ctx, app } = this;
    // created表示这条是否是创建出来的
    const user = await ctx.model.User.findOne({
      where: { username: body.username },
    });
    if (user) {
      if (user.password === md5(body.password)) {
        const token = app.jwt.sign(
          {
            userId: user.id,
          },
          app.config.jwt.secret
        );
        return { success: true, token };
      }
      return { success: false, msg: '登录失败，密码错误' };
    }
    return { success: false, msg: '登录失败，用户不存在' };
  }
  async validate() {
    const { ctx } = this;
    const user = await ctx.model.User.findOne({
      where: { id: ctx.state.user.userId },
      include: [{
        model: this.app.model.UserDetail,
      }],
    });
    return {
      success: true,
      user,
    };
  }
}

module.exports = UserService;
