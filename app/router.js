'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/add', controller.user.add);
  router.get('/user/find', controller.user.find);
  router.post('/uploadfile', controller.public.uploadfile);
  router.post('/exportFile', controller.public.exportFile);
};
