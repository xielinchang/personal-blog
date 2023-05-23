/*
 * @Descripttion:
 * @version:
 * @Author: Liu ZiJie
 * @Date: 2022-03-13 17:52:39
 * @LastEditors: Liu ZiJie
 * @LastEditTime: 2022-07-20 15:29:51
 */
'use strict';

const fs = require('fs');
const path = require('path');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');
const Controller = require('./base');

class FileController extends Controller {
  /**
   * @description 文件上传
   */
  async upload() {
    const { ctx } = this;
    const stream = await ctx.getFileStream();

    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000
    )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      }
      if (mkdirsSync(path.dirname(dirname))) {
        fs.mkdirSync(dirname);
        return true;
      }
    }
    mkdirsSync(path.join(uplaodBasePath, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
    // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
    // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.error();
    }
    // const { port, hostname } = this.app.config.cluster.listen;
    // const url = Base64.encode([ '/public/uploads/', dirname, '/', filename ].join(''));
    const imgUrl = [ '/public/uploads/', dirname, '/', filename ].join('');
    ctx.body = {
      errno: 0, // 注意：值是数字，不能是字符串
      data: {
        url: imgUrl, // 图片 src ，必须
        alt: '无', // 图片描述文字，非必须
        href: '无', // 图片的链接，非必须
      },
    };
  }
}

module.exports = FileController;
