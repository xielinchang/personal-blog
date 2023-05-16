'use strict';
const Service = require('egg').Service;
const md5 = require('blueimp-md5');
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
      const userList = await ctx.model.User.User.findAll();
      // 查询是否注册了新用户，并存取id
      const user = userList.find(item => {
        return item.username === body.username;
      });
      // 默认给游客身份
      await ctx.model.User.UserRole.create({
        user_id: user.id,
        role_id: 3,
      });
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
    const roles = await ctx.model.User.UserRole.findOne({
      where: { user_id: user.id },
    });
    console.log(roles);
    if (user.password === md5(password)) {
      const token = app.jwt.sign({
        userid: user.id,
        username: user.username,
        roles: roles.role_id,
      }, app.config.jwt.secret
      );
      return { success: true, token };
    }
    return { success: false, msg: '登录失败' };
  }
  async getUserInfo() {
    const { ctx } = this;
    const { userid, roles } = ctx.state.user;
    try {
      const user = await ctx.model.User.User.findOne({
        where: {
          id: userid,
        },
      });
      const role_name = await ctx.model.User.Role.findOne({
        where: { id: roles },
      });
      const role = {
        role_id: roles,
        role_name,
      };
      console.log(user);
      return { user, role };
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
  async deleteUser(body) {
    const { ctx } = this;
    const deleted = await ctx.model.User.User.update({ upt_act: 'D' }, {
      where: {
        id: body.id,
      },
    });
    console.log(body, deleted);
    if (deleted) {
      return { success: true, data: body };
    }
  }
  async getUsersByRole(role_code, name) {
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    try {
      const users = await ctx.model.User.User.findAll({
        attributes: [ 'id', 'name' ],
        include: {
          model: ctx.model.User.Role,
          where: { code: role_code },
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
