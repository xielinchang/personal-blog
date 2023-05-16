'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.post('/api/file', controller.file.upload);

  // 登录、注册
  router.post('/login', controller.user.user.login);
  router.post('/register', controller.user.user.register);

  // 当前用户信息
  router.get('/user/info', jwt, controller.user.user.getUserInfo);

  // 通过角色获取对应的用户
  router.post('/users/by/role', jwt, controller.user.user.getUsersByRole);

  // 角色列表
  router.post('/role/list', controller.user.role.queryRoleList);

  // 每个用户对应的角色id
  router.post('/user/role', controller.user.userRole.queryUserRole);

  // 获取用户ip
  router.post('/user/ip', controller.user.user.queryUserIp);

  // 用户列表以及删改
  router.post('/user', controller.user.user.queryUser);
  router.post('/user/update', controller.user.user.updateUser);
  router.post('/user/delete', controller.user.user.deleteUser);

  // 用户信息修改
  router.post('/user/detail/update', controller.user.userDetail.updateUserDetail);

  // 记录的增删改查
  router.post('/record/query', controller.blog.recreation.queryRecord);
  router.post('/record/delete', controller.blog.recreation.deleteRecord);
  router.post('/record/create', controller.blog.recreation.createRecord);
  router.post('/record/default/query', controller.blog.recreation.queryRecordDefault);
  router.post('/record/default/update', controller.blog.recreation.updateRecordDefault);

  // 默认头像列表
  router.post('/default/portrait', controller.blog.defaultPortrait.queryDefaultPortrait);

  // 背景图片
  router.post('/blog/bg', controller.blog.bg.queryBg);
  router.post('/blog/bg/gif', controller.blog.bg.queryBgGif);

  // 文章的增删改查
  router.post('/essay/query', controller.blog.essay.queryEssay);
  router.post('/essay/create', controller.blog.essay.createEssay);
  router.post('/essay/update', controller.blog.essay.updateEssay);
  router.post('/essay/delete', controller.blog.essay.deleteEssay);

  // 保存草稿
  router.post('/essay/save', controller.blog.essay.saveEssay);
  router.post('/essay/querysave', controller.blog.essay.querySaveEssay);

  // 文章的评论
  router.post('/essay/comments/query', controller.blog.essayComments.queryEssayComments);
  router.post('/essay/comments/create', controller.blog.essayComments.createEssayComments);
  router.post('/essay/comments/delete', controller.blog.essayComments.deleteEssayComments);

  // 文章详情
  router.post('/essay/detail/update', controller.blog.essayDetail.updateEssayDetail);

  // 博客留言
  router.post('/comments/query', controller.blog.comments.queryComments);
  router.post('/comments/create', controller.blog.comments.createComments);
  router.post('/comments/delete', controller.blog.comments.deleteComments);

  // 留言回复
  router.post('/comments/reply/create', controller.blog.commentsReply.createCommentsReply);
  router.post('/comments/reply/delete', controller.blog.commentsReply.deleteCommentsReply);

  // '关于我'详情
  router.post('/aboutme/detail/query', controller.blog.aboutmeDetail.queryAboutme);
  router.post('/aboutme/detail/update', controller.blog.aboutmeDetail.updateAboutme);

  // 项目的增删改查
  router.post('/project/query', controller.blog.project.queryProject);
  router.post('/project/update', controller.blog.project.updateProject);
  router.post('/project/delete', controller.blog.project.deleteProject);
  router.post('/project/create', controller.blog.project.createProject);
};
