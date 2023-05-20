'use strict';
const Service = require('egg').Service;
const md5 = require('md5');
class UserService extends Service {
  async register(body) {
    const { ctx } = this;
    body.password = md5(body.password);
    // 创建或者查询用户
    // created表示这条是否是创建出来的
    const [ , created ] = await ctx.model.User.User.findOrCreate({
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
    const user = await ctx.model.User.User.findOne({
      where: { username },
    });
    if (!user) {
      return false;
    }
    if (user.password === md5(password)) {
      const token = app.jwt.sign({
        userid: user.id,
        username: user.username,
      }, app.config.jwt.secret
      );
      return { success: true, token };
    }
    return { success: false, msg: '登录失败' };
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
      console.log(111, user);
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
    const { ctx } = this;
    const where = {};
    if (body.id) {
      where.id = body.id;
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
    if (body.username) {
      updateMsg.username = body.username;
    }
    if (body.name) {
      updateMsg.name = body.name;
    }
    if (body.password) {
      updateMsg.password = body.password;
    }
    if (body.portrait) {
      updateMsg.portrait = body.portrait;
    }
    const { roles } = ctx.state.user;
    const superAdmin = await ctx.model.User.User.findAll({
      attributes: [ 'id', 'name' ],
      include: {
        model: ctx.model.User.Role,
        where: { code: 'superAdmin' },
      },
    });

    // 用户必须是管理员才能调用此接口，且不能修改超级管理员
    // 超级管理员可以修改所有
    if (roles.code !== 'user') {
      if (body.id !== superAdmin[0].id) {
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
      } else if (roles.code === 'superAdmin') {
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
      }

    }


  }
  async deleteUser(body) {
    const { ctx } = this;
    const { roles } = ctx.state.user;
    if (roles.code !== 'superAdmin') {
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
  async getUsersByRole(body) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (body.name) {
      where.name = { [Op.like]: `%${body.name}%` };
    }
    try {
      const users = await ctx.model.User.User.findAll({
        attributes: [ 'id', 'name' ],
        include: {
          model: ctx.model.User.Role,
          where: { code: body.role_code },
        },
        where,
      });
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
