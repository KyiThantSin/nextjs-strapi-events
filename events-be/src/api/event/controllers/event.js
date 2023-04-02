"use strict";

/**
 * event controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }

    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });
    if (!data) {
      return ctx.notFound();
    }

    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },

   // Create an event
   async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await strapi.service("api::event.event").create(ctx.request.body);
    return entity;
  },
  // Update event
  async update(ctx) {
    const { id } = ctx.params;
    const query = {
      filters: {
        id: id,
        user: { id: ctx.state.user.id },
      },
    };
    ctx.query = query;
 
    const user = await strapi.entityService.findOne("api::event.event", id, {
      populate: { user: true },
    });
 
    if (user.user.id === ctx.state.user.id) {
      return await super.update(ctx);
    } else {
      return ctx.unauthorized(`You can't update this entry`);
    }
  },

  // Delete event
  async delete(ctx) {
    const { id } = ctx.params;
 
    const user = await strapi.entityService.findOne("api::event.event", id, {
      populate: { user: true },
    });
 
    if (user.user.id === ctx.state.user.id) {
      const deletedEvent = await strapi.entityService.delete(
        "api::event.event",
        id
      );
      const sanitizedDeletedEvent = await this.sanitizeOutput(deletedEvent);
      return this.transformResponse(sanitizedDeletedEvent);
    } else {
      return ctx.unauthorized(`You can only delete events you own`);
    }
  },


}));
