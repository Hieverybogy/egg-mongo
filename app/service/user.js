'use strict';

const Service = require('egg').Service;
class UserService extends Service {
    // 更新用户信息
    async add(userName) {
        const {
            ctx,
        } = this;
        const result = await ctx.model.User.create({
            userName: userName,
        });
        return result;
    }
    // 查询用户信息
    async find() {
        const {
            ctx,
        } = this;
        const result = await ctx.model.User.find();
        // let list = new Array();
        // result.map((o1) => {
        //     list.push(o1.userName)
        // })
        return result;
    }
}
module.exports = UserService;