'use strict';
const XLSX = require('xlsx');
// 文件操作对象
const fs = require('fs');
// 路径操作对象
const path = require('path');
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

const nodeExcel = require('excel-export');

const Controller = require('egg').Controller;

class PublicController extends Controller {
    //上传xlsx
    async uploadfile() {
        const { ctx } = this;

        const stream = await ctx.getFileStream();
        /**************** 获取文件内容 ****************/
        // 存储获取到的数据
        let exceldata = [];
        console.log(1111, stream)
        stream.on('data', function (chunk) {

            // 读取内容
            const workbook = XLSX.read(chunk, { type: 'buffer' });
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    exceldata = exceldata.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }

            console.log(123424, exceldata);  // 打印解析出来的Excel 内容
        });

        /**************** 保存文件内容 ****************/
        //新建一个文件名    
        const filename = stream.filename.split('.')[0] + path
            .extname(stream.filename)
            .toLocaleLowerCase();

        //文件生成绝对路径
        const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
        //生成一个文件写入 文件流
        const writeStream = fs.createWriteStream(target);
        try {
            //把文件流 写入

            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //出错则关闭管道
            await sendToWormhole(stream);
            throw err;
        }

        ctx.body = {
            success: true
        };
    }

    async exportFile(req, res) {
        const { ctx } = this;
        const data = await this.ctx.service.user.find();
        let conf = {};
        conf.cols = [{
            caption: '姓名',
            type: 'string',
        },
        {
            caption: '密码',
            type: 'string'

        }];
        conf.rows = data;

        var result = nodeExcel.execute(conf);
        const target = path.join(this.config.baseDir, 'app/public/uploads', "aaa.xlsx");
        var uploadDir = './public/uploads';
        var filePath = uploadDir + "aaa.xlsx";  //文件名
        fs.writeFile(target, result, 'binary', function (err,res) {
            console.log(111,res, err)
            if (err) {
                console.log(err);
            }
        });

        excel.createExcel({
            data:conf,
            savePath: target,
            cb:function(path){
                excel.download(path,req, res,true);
            }
        });

        ctx.body = {
            row: data
        };
    }
}

module.exports = PublicController;
