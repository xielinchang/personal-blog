'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/api/file', controller.file.upload);
  router.post('/login', controller.manager.login);

  router.post('/record/query', controller.recreation.queryRecord);
  router.post('/record/delete', controller.recreation.deleteRecord);
  router.post('/record/create', controller.recreation.createRecord);

  router.post('/user/ip', controller.user.queryUserIp);

  router.post('/blog/bg', controller.bg.queryBg);
  router.post('/blog/bg/gif', controller.bg.queryBgGif);

  router.post('/essay/query', controller.essay.queryEssay);
  router.post('/essay/create', controller.essay.createEssay);
  router.post('/essay/update', controller.essay.updateEssay);
  router.post('/essay/delete', controller.essay.deleteEssay);
  router.post('/essay/save', controller.essay.saveEssay);
  router.post('/essay/querysave', controller.essay.querySaveEssay);

  router.post('/share/query', controller.share.queryShare);
  router.post('/share/create', controller.share.createShare);
  router.post('/share/update', controller.share.updateShare);
  router.post('/share/delete', controller.share.deleteShare);
  router.post('/share/save', controller.share.saveShare);
  router.post('/share/querysave', controller.share.querySaveShare);

  router.post('/comments/query', controller.comments.queryComments);
  router.post('/comments/create', controller.comments.createComments);
  router.post('/comments/delete', controller.comments.deleteComments);
  router.post('/comments/update', controller.comments.updateComments);
};
