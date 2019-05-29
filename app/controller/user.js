'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async add() {
        const {ctx} = this;
        const userName = ctx.request.query.userName;　
        this.ctx.body = this.ctx.service.user.add(userName);
    }
    async find() {
        const data = await this.ctx.service.user.find();
        this.ctx.body = data;
    }
}

module.exports = UserController;