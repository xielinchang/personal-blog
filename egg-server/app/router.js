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

  // 背景

  // 背景图片列表
  router.post('/blog/home/bg', controller.web.bg.queryHomeBg);
  router.post('/blog/home/bg/create', controller.web.bg.createHomeBg);
  router.post('/blog/home/bg/delete', controller.web.bg.deleteHomeBg);
  // 当前背景图片
  router.post('/blog/home/bg/now', controller.web.bg.queryHomeBgNow);
  router.post('/blog/home/bg/now/update', controller.web.bg.updateHomeBgNow);

  // 背景图片列表
  router.post('/blog/home/bg/night', controller.web.bg.queryHomeBgNight);
  router.post('/blog/home/bg/night/create', controller.web.bg.createHomeBgNight);
  router.post('/blog/home/bg/night/delete', controller.web.bg.deleteHomeBgNight);
  // 当前背景图片
  router.post('/blog/home/bg/now/night', controller.web.bg.queryHomeBgNowNight);
  router.post('/blog/home/bg/now/night/update', controller.web.bg.updateHomeBgNowNight);


  // 文章的增删改查
  router.post('/essay/query', controller.web.essay.queryEssay);
  router.post('/essay/create', jwt, controller.web.essay.createEssay);
  router.post('/essay/update', jwt, controller.web.essay.updateEssay);
  router.post('/essay/delete', jwt, controller.web.essay.deleteEssay);
  router.post('/essay/change/state', controller.web.essay.changeState);
  router.post('/essay/reading', controller.web.essay.addReadingNum);
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

  // 轮播图
  router.post('/essay/banner/query', controller.web.banner.queryBanner);
  router.post('/essay/banner/create', jwt, controller.web.banner.createBanner);
  router.post('/essay/banner/update', jwt, controller.web.banner.updateBanner);
  router.post('/essay/banner/delete', jwt, controller.web.banner.deleteBanner);

  // 文章笔记
  router.post('/essay/note/query', controller.web.essayNote.queryEssayNote);
  router.post('/essay/note/update', jwt, controller.web.essayNote.updateEssayNote);
  router.post('/essay/note/delete', jwt, controller.web.essayNote.deleteEssayNote);
  router.post('/essay/note/query/userNote', jwt, controller.web.essayNote.getUserNotes);

  // 照片墙
  router.post('/blog/photo/query', controller.web.photoWall.queryPhoto);
  router.post('/blog/photo/create', controller.web.photoWall.createPhoto);
  router.post('/blog/photo/delete', controller.web.photoWall.deletePhoto);
  router.post('/blog/photo/update', controller.web.photoWall.updatePhoto);

  // 随笔
  router.post('/blog/casual/query', controller.web.casual.queryCasual);
  router.post('/blog/casual/create', controller.web.casual.createCasual);
  router.post('/blog/casual/delete', controller.web.casual.deleteCasual);
  router.post('/blog/casual/update', controller.web.casual.updateCasual);

  // 游客访问记录
  router.post('/visit/create', controller.user.visit.createVisitAndSession);
  router.post('/visit/query', controller.user.visit.queryVisit);
  router.post('/visit/update/leavetime', controller.user.visit.updateLeaveTime);

  router.post('/piggy/gaming/supermarry/map/query', controller.gaming.superMarry.queryMarryMap);
  router.post('/piggy/gaming/supermarry/map/create', controller.gaming.superMarry.createMarryMap);
  router.post('/piggy/gaming/supermarry/map/update', controller.gaming.superMarry.updateMarryMap);
  router.post('/piggy/gaming/supermarry/map/delete', controller.gaming.superMarry.deleteMarryMap);

};
