/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-13 17:52:39
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-20 15:30:37
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  // 后台用户登录
  router.post('/api/user/login', controller.sys.user.login);
  // 后台当前用户信息
  router.get('/api/user/info', jwt, controller.sys.user.getCurUserInfo);
  // 修改用户密码
  router.post('/api/change/psw', jwt, controller.sys.user.changePsw);
  // 重置用户密码
  router.post('/api/reset/psw', jwt, controller.sys.user.resetPsw);

  // 文件上传
  router.post('/api/file', controller.file.upload);
  // 图片下载
  router.get('/api/images', controller.sys.file.getImagesByPath);

  // 分页获取用户管理数据
  router.get('/api/user/page', jwt, controller.sys.user.page);
  // 新增用户管理数据
  router.post('/api/user/create', jwt, controller.sys.user.create);
  // 修改用户管理数据
  router.post('/api/user/update', jwt, controller.sys.user.update);
  // 删除用户管理数据
  router.post('/api/user/delete', jwt, controller.sys.user.delete);

  // 查询所有角色
  router.get('/api/role/query', jwt, controller.sys.role.query);
  // 分页查询角色
  router.get('/api/role/page', jwt, controller.sys.role.page);
  // 新增角色
  router.post('/api/role/create', jwt, controller.sys.role.create);
  // 修改角色
  router.post('/api/role/update', jwt, controller.sys.role.update);
  // 删除角色
  router.post('/api/role/delete', jwt, controller.sys.role.delete);

  // 查询所有菜单
  router.get('/api/menu/query/tree', jwt, controller.sys.menu.queryTree);
  // 添加菜单
  router.post('/api/menu/create', jwt, controller.sys.menu.create);
  // 修改菜单
  router.post('/api/menu/update', jwt, controller.sys.menu.update);
  // 删除菜单
  router.post('/api/menu/delete', jwt, controller.sys.menu.delete);
  // 更新角色菜单
  router.post('/api/role/menu/update', jwt, controller.sys.menu.setRoleMenu);
  // 根据角色id查询菜单
  router.get('/api/role/menu', jwt, controller.sys.menu.getRoleMenu);
  // 获取当前用户菜单
  router.get('/api/user/menu', jwt, controller.sys.menu.getCurUserMenu);
  // 通过角色获取对应的用户
  router.get('/api/users/by/role', jwt, controller.sys.user.getUsersByRole);

  // 字典值类型查询
  router.get('/api/dict/page', controller.sys.dict.page);
  // 字典值查询
  router.get('/api/dict/type/page', jwt, controller.sys.dict.pageByType);
  // 新增字典值类型
  router.post('/api/dict/create', jwt, controller.sys.dict.create);
  // 新增字典值
  router.post('/api/dict/type/create', jwt, controller.sys.dict.createByType);
  // 修改字典值类型
  router.post('/api/dict/update', jwt, controller.sys.dict.update);
  // 修改字典值
  router.post('/api/dict/type/update', jwt, controller.sys.dict.updateByType);
  // 删除字典值类型
  router.post('/api/dict/delete', jwt, controller.sys.dict.delete);
  // 删除字典值
  router.post('/api/dict/type/delete', jwt, controller.sys.dict.deleteByType);

  // 前台字典值查询
  router.get('/api/dict', controller.sys.dict.query);

  //* **********前端接口 */

  // 前台登录、注册、重置密码、修改密码
  router.post('/login', controller.user.user.login);
  router.post('/register', controller.user.user.register);
  router.post('/user/reset/psw', jwt, controller.user.user.resetPsw);
  router.post('/user/change/psw', jwt, controller.user.user.changePsw);

  // 获取用户ip
  router.post('/user/ip', controller.user.user.queryUserIp);

  // 当前前台用户信息
  router.get('/user/info', jwt, controller.user.user.getUserInfo);

  // 用户列表
  router.post('/user', controller.user.user.queryUser);
  router.post('/user/update', controller.user.user.updateUser);
  router.post('/user/delete', controller.user.user.deleteUser);

  // 用户信息修改
  router.post('/user/detail/update', jwt, controller.user.userDetail.updateUserDetail);

  // 记录的增删改查
  router.post('/record/query', controller.web.recreation.queryRecord);
  router.post('/record/delete', jwt, controller.web.recreation.deleteRecord);
  router.post('/record/create', jwt, controller.web.recreation.createRecord);
  router.post('/record/default/query', controller.web.recreation.queryRecordDefault);
  router.post('/record/default/update', jwt, controller.web.recreation.updateRecordDefault);

  // 默认头像列表
  router.post('/default/portrait', controller.web.defaultPortrait.queryDefaultPortrait);

  // 背景图片
  router.post('/blog/bg', controller.web.bg.queryBg);
  router.post('/blog/bg/gif', controller.web.bg.queryHomeBg);

  // 文章的增删改查
  router.post('/essay/query', controller.web.essay.queryEssay);
  router.post('/essay/create', jwt, controller.web.essay.createEssay);
  router.post('/essay/update', jwt, controller.web.essay.updateEssay);
  router.post('/essay/delete', jwt, controller.web.essay.deleteEssay);
  router.post('/essay/change/state', controller.web.essay.changeState);
  // 查询已发布的文章
  router.post('/essay/query/state', controller.web.essay.queryEssayState);

  // 保存草稿
  router.post('/essay/save', controller.web.essay.saveEssay);
  router.post('/essay/querysave', controller.web.essay.querySaveEssay);

  // 文章的评论
  router.post('/essay/comments/query', controller.web.essayComments.queryEssayComments);
  router.post('/essay/comments/create', jwt, controller.web.essayComments.createEssayComments);
  router.post('/essay/comments/delete', jwt, controller.web.essayComments.deleteEssayComments);

  // 文章详情修改
  router.post('/essay/detail/update', controller.web.essayDetail.updateEssayDetail);

  // 博客留言
  router.post('/message/query', controller.web.message.queryMessage);
  router.post('/message/create', jwt, controller.web.message.createMessage);
  router.post('/message/delete', jwt, controller.web.message.deleteMessage);

  // 留言回复

  router.post('/message/reply/create', jwt, controller.web.messageReply.createMessageReply);
  router.post('/message/reply/delete', jwt, controller.web.messageReply.deleteMessageReply);
  router.post('/message/reply/update', jwt, controller.web.messageReply.updateMessageReply);

  // '关于我'详情
  router.post('/aboutme/detail/query', controller.web.aboutmeDetail.queryAboutme);
  router.post('/aboutme/detail/update', jwt, controller.web.aboutmeDetail.updateAboutme);

  // 项目的增删改查
  router.post('/project/query', controller.web.project.queryProject);
  router.post('/project/query/state', controller.web.project.queryProjectState);
  router.post('/project/update/state', controller.web.project.changeState);

  router.post('/project/update', jwt, controller.web.project.updateProject);
  router.post('/project/delete', jwt, controller.web.project.deleteProject);
  router.post('/project/create', jwt, controller.web.project.createProject);

  router.post('/project/query/save', controller.web.project.queryProjectSave);
  router.post('/project/save', jwt, controller.web.project.updateProjectSave);
};
