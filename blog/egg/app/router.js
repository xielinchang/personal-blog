'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.post('/api/file', controller.file.upload);
  router.post('/login', controller.user.login);
  router.post('/register', controller.user.register);
  router.post('/validate', jwt, controller.user.validate);
  router.post('/record/query', controller.recreation.queryRecord);
  router.post('/record/delete', controller.recreation.deleteRecord);
  router.post('/record/create', controller.recreation.createRecord);
  router.post('/record/default/query', controller.recreation.queryRecordDefault);
  router.post('/record/default/update', controller.recreation.updateRecordDefault);

  router.post('/user/ip', controller.user.queryUserIp);
  router.post('/user', controller.user.queryUser);
  router.post('/user/update', controller.user.updateUser);
  router.post('/user/delete', controller.user.deleteUser);

  router.post('/default/portrait', controller.defaultPortrait.queryDefaultPortrait);
  router.post('/blog/bg', controller.bg.queryBg);
  router.post('/blog/bg/gif', controller.bg.queryBgGif);

  router.post('/essay/query', controller.essay.queryEssay);
  router.post('/essay/create', controller.essay.createEssay);
  router.post('/essay/update', controller.essay.updateEssay);
  router.post('/essay/delete', controller.essay.deleteEssay);
  router.post('/essay/save', controller.essay.saveEssay);
  router.post('/essay/querysave', controller.essay.querySaveEssay);


  router.post('/essay/comments/query', controller.essayComments.queryEssayComments);
  router.post('/essay/comments/create', controller.essayComments.createEssayComments);
  router.post('/essay/comments/delete', controller.essayComments.deleteEssayComments);

  router.post('/essay/detail/update', controller.essayDetail.updateEssayDetail);
  router.post('/user/detail/update', controller.userDetail.updateUserDetail);

  router.post('/comments/query', controller.comments.queryComments);
  router.post('/comments/create', controller.comments.createComments);
  router.post('/comments/delete', controller.comments.deleteComments);

  router.post('/comments/reply/create', controller.commentsReply.createCommentsReply);
  router.post('/comments/reply/delete', controller.commentsReply.deleteCommentsReply);
};
