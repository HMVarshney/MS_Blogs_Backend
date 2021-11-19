'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            data.author = ctx.state.user.id;

            let searchTags = data.tagNames;
            searchTags.push(`${ctx.state.user.name}`);
            data.search_tags = searchTags;

            entity = await strapi.services['unapproved-blogs'].create(data, { files });
        } else {
            ctx.request.body.author = ctx.state.user.id;

            let searchTags = ctx.request.body.tagNames;
            searchTags.push(`${ctx.state.user.name}`);
            ctx.request.body.search_tags = searchTags;

            entity = await strapi.services['unapproved-blogs'].create(ctx.request.body);
        }
        return sanitizeEntity(entity, { model: strapi.models['unapproved-blogs'] });
    },

    async update(ctx) {
        const { id } = ctx.params;

        let entity;
        if (ctx.is('multipart')) {
            const { data, files } = parseMultipartData(ctx);
            entity = await strapi.services['unapproved-blogs'].update({ id }, data, { files });
        } else {
            entity = await strapi.services['unapproved-blogs'].update({ id }, ctx.request.body);
        }

        return sanitizeEntity(entity, { model: strapi.models['unapproved-blogs'] });
    },

    async delete(ctx){
        const { id } = ctx.params;

        const entity = await strapi.services['unapproved-blogs'].delete({ id });

        if(entity.ImageUrl.length > 0){
            strapi.plugins["upload"].services.upload.remove({id: entity.ImageUrl[0].id});
        }

        if(entity.content_images && entity.content_images.length > 0){
            entity.content_images.forEach((item)=>{
                strapi.plugins['upload'].services.upload.remove({ id: item.id });
            });
        }

        return sanitizeEntity(entity, { model: strapi.models['unapproved-blogs'] });
    },

    async findCustom(ctx){
        const requestQuery = ctx.query;
        let populates = [];
        let removal = "";
        if(requestQuery._populate){
          populates = requestQuery._populate;
          delete requestQuery._populate
        }
    
        if(requestQuery._remove){
          removal = requestQuery._remove;
          delete requestQuery._remove;
        }
    
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.blogs.search(requestQuery);
        } else {
          entities = await strapi.query('unapproved-blogs').find(requestQuery, populates);
        }
    
        return entities.map(entity => {
          delete entity[removal];
          return sanitizeEntity(entity, { model: strapi.models['unapproved-blogs'] })
        });
    }
};
