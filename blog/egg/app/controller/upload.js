'use strict';
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const mkdirp = require('mkdirp');

const Controller = require('egg').Controller;
class UploadController extends Controller {
  async uploadAvatar() {
    const { ctx, config } = this;
    try {
      // 0、获取文件
      const file = ctx.request.files[0];
      console.log('获取文件', file);
      // ctx.request.files[0] 表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
      const fileData = fs.readFileSync(file.filepath);
      console.log('fileData', fileData);
      // 1、获取当前日期
      const day = moment(new Date()).format('YYYYMMDD');
      console.log('1、获取当前日期', day);
      // 2、创建图片保存的路径
      const dir = path.join(config.uploadAvatarDir, day);
      console.log('2、创建图片保存的路径', dir);
      // 3、创建目录
      await mkdirp(dir);
      // 4、生成路径返回
      const date = Date.now(); // 毫秒数
      const tempDir = path.join(dir, date + path.extname(file.filename)); // 返回图片保存的路径
      console.log('毫秒数 extname', date, path.extname(file.filename));
      console.log('返回图片保存的路径', tempDir);
      // 5、写入文件夹
      fs.writeFileSync(tempDir, fileData);
      ctx.body = {
        errno: 0, // 注意：值是数字，不能是字符串
        data: {
          url: tempDir, // 图片 src ，必须
          alt: '无', // 图片描述文字，非必须
          href: '无', // 图片的链接，非必须
        },
      };
    } catch (error) {
      ctx.body = {
        errno: 1, // 只要不等于 0 就行
        message: '上传失败',
      };
    } finally {
      // 6、清除临时文件
      ctx.cleanupRequestFiles();
    }
  }
}

module.exports = UploadController;

