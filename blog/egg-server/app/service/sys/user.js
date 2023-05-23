'use strict';
const md5 = require('md5');
const Service = require('egg').Service;

class SysUserService extends Service {
  async login({ username, password }) {
    const { app, ctx } = this;
    password = md5(md5(password) + app.config.password_salt);

    const user = await ctx.model.Sys.User.findOne({
      where: { username },
    });

    if (!user) {
      return false;
    }
    const role = await ctx.model.Sys.UserRole.findOne({
      where: { user_id: user.id },
    });

    if (user.password === password) {
      const token = app.jwt.sign({
        userid: user.id,
        username: user.username,
        name: user.name,
        roleid: role.role_id,
      }, app.config.jwt.secret, { expiresIn: 60 * 60 * 24 * 7 });
      return token;
    }
    return false;
  }

  async getCurUserInfo() {
    const { ctx } = this;
    const { userid, roleid } = ctx.state.user;

    try {
      const user = await ctx.model.Sys.User.findOne({
        where: {
          id: userid,
        },
      });
      user.roleid = roleid;
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async changePsw(body) {
    const { app, ctx } = this;
    const { old_pass, pass } = body;
    const { userid } = ctx.state.user;
    try {
      const user = await ctx.model.Sys.User.findOne({
        where: {
          id: userid,
        },
      });
      if (md5(md5(old_pass) + app.config.password_salt) !== user.password) {
        return { success: false, msg: '原密码错误！！' };
      }
      await user.update({
        password: md5(md5(pass) + app.config.password_salt),
        updated_at: ctx.helper.formatTime(new Date()),
        updated_id: userid,
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
      const user = await ctx.model.Sys.User.findOne({
        where: {
          id: body.id,
        },
      });
      await user.update({
        password: md5(md5('888888') + app.config.password_salt),
        updated_at: ctx.helper.formatTime(new Date()),
        updated_id: ctx.state.user.userid,
        upt_act: 'U',
      });
      return { success: true, msg: '重置成功！！' };
    } catch (error) {
      console.log(error);
      return { success: false, msg: '密码重置失败！！' };
    }
  }

  async page(query) {
    const { app, ctx } = this;
    const { limit, page } = query;
    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    const roleWhere = {};
    if (query.username) {
      where.username = { [Op.like]: `%${query.username}%` };
    }
    if (query.name) {
      where.name = { [Op.like]: `%${query.name}%` };
    }
    if (query.role) {
      roleWhere.id = query.role;
    }
    return await ctx.model.Sys.User.findAndCountAll({
      distinct: true, // 不加distinct，count和实际不符
      include: {
        model: ctx.model.Sys.Role,
        attributes: [ 'id', 'name', 'code' ],
        where: roleWhere,
      },
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
      order: [[ 'created_at', 'desc' ]],
    });
  }

  async create(body) {
    const { app, ctx } = this;
    const default_password = '888888';
    // 密码加盐加密
    body.password = md5(md5(default_password) + app.config.password_salt);

    const { userid } = ctx.state.user;
    body.created_id = userid;
    body.updated_id = userid;

    try {
      const exit = await ctx.model.Sys.User.findOne({
        where: { username: body.username },
      });
      if (exit) {
        return { success: false, msg: '账号已经存在！' };
      }

      return await ctx.model.transaction(async t => {

        // 创建用户信息
        const createUser = await ctx.model.Sys.User.create(body, { transaction: t });
        const userRoleArr = body.roles.map(item => {
          return { role_id: item, user_id: createUser.id };
        });
        // 创建用户角色
        const res = await ctx.model.Sys.UserRole.bulkCreate(userRoleArr, { transaction: t });

        return { success: res.length > 0 };
      });
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async update(body) {
    const { ctx } = this;
    // 密码不在这里修改，单独写接口
    delete body.password;
    const { userid } = ctx.state.user;
    body.updated_at = ctx.helper.formatTime(new Date());
    body.updated_id = userid;
    body.upt_act = 'U';
    try {
      return await ctx.model.transaction(async t => {

        // 更新用户信息
        await ctx.model.Sys.User.update(body, {
          transaction: t,
          where: {
            id: body.id,
          },
        });
        if (body.roles) {
          const userRoleArr = body.roles.map(item => {
            return { role_id: item, user_id: body.id };
          });
          // 删除角色信息
          await ctx.model.Sys.UserRole.destroy({
            where: {
              user_id: body.id,
            },
            transaction: t,
          });
          // 创建用户角色
          const res = await ctx.model.Sys.UserRole.bulkCreate(userRoleArr, { transaction: t });
          return { success: res.length > 0 };
        }
        return { success: false };
      });
    } catch (error) {
      console.log(error);
      return { success: false };
    }
  }

  async delete({ id }) {
    const { ctx } = this;
    const body = {
      upt_act: 'D',
      updated_at: ctx.helper.formatTime(new Date()),
      updated_id: ctx.state.user.userid,
    };
    // 更新用户信息
    try {
      return await ctx.model.Sys.User.update(body, {
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @param {*} role_code 角色代码
   * @param {*} name 用户姓名
   */
  async getUsersByRole(role_code, name) {
    const { app, ctx } = this;

    const Op = app.Sequelize.Op;
    const where = { upt_act: { [Op.ne]: 'D' } };
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
    }

    try {
      const users = await ctx.model.Sys.User.findAll({
        attributes: [ 'id', 'name' ],
        include: {
          model: ctx.model.Sys.Role,
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

module.exports = SysUserService;
