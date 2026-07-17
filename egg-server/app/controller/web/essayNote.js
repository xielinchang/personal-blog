'use strict';

const Controller = require('egg').Controller;

class EssayNoteController extends Controller {
  async queryEssayNote() {
    const { ctx } = this;
    const msg = await ctx.service.web.essayNote.queryEssayNote(ctx.request.body);
    ctx.body = msg;
  }
  async getUserNotes() {
    const { ctx } = this;
    const msg = await ctx.service.web.essayNote.getUserNotes(ctx.request.body);
    ctx.body = msg;
  }
  async updateEssayNote() {
    const { ctx } = this;
    const msg = await ctx.service.web.essayNote.updateEssayNote(ctx.request.body);
    ctx.body = msg;
  }
  async deleteEssayNote() {
    const { ctx } = this;
    const note = await ctx.service.web.essayNote.deleteEssayNote(ctx.request.body);
    ctx.body = note;
  }
}

module.exports = EssayNoteController;
