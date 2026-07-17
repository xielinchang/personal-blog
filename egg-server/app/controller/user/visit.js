'use strict';

const Controller = require('../base');

class VisitController extends Controller {
  async createVisitAndSession() {
    const { ctx } = this;
    const visit = await ctx.service.user.visit.createVisitAndSession(ctx.request.body);
    ctx.body = visit;
  }
  async queryVisit() {
    const { ctx } = this;
    const visit = await ctx.service.user.visit.queryVisit(ctx.request.body);
    ctx.body = visit;
  }
  async updateLeaveTime() {
    const { ctx } = this;
    const visit = await ctx.service.user.visit.updateLeaveTime(ctx.request.body);
    ctx.body = visit;
  }
}

module.exports = VisitController;
