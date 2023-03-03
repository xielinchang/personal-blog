'use strict';
const md5 = require('blueimp-md5');
const Service = require('egg').Service;

class UserService extends Service {
  async queryUserIp() {
    const { ctx } = this;
    return { ip: ctx.request.ip };
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
    console.log(ctx.state);
    const user = await ctx.model.User.findOne({
      where: { id: ctx.state.user.userId },
    });
    return {
      success: true,
      user,
    };
  }
}

module.exports = UserService;
