'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async findCustom(ctx){
        const requestQuery = ctx.query;
        let populates = [];
        let removal = "";
        let forPage = "";

        if(requestQuery._populate){
            populates = requestQuery._populate;
            delete requestQuery._populate
        }

        if(requestQuery._remove){
            removal = requestQuery._remove;
            delete requestQuery._remove;
        }

        if(requestQuery._for){
            forPage = requestQuery._for;
            delete requestQuery._for;
        }

        let entities;
        if (ctx.query._q) {
        entities = await strapi.query('categories').search(requestQuery);
        } else {
        entities = await strapi.query('categories').find(requestQuery, populates);
        }

        return entities.map(entity => {
            delete entity[removal];

             if(!entity.blogs)
                entity.blogs = [];

            if(forPage == 'homepage'){
                entity.blogs = entity.blogs.length;
            }

            return sanitizeEntity(entity, { model: strapi.query('categories').model })
        });
    }

    // async findCustom(ctx){
    //     const requestQuery = ctx.query;
    //     let populates = [];
    //     let removal = [];
    //     let forPage = "";

    //     if(requestQuery._populate){
    //         populates = requestQuery._populate;
    //         delete requestQuery._populate
    //     }

    //     if(requestQuery._remove){
    //         removal = requestQuery._remove;
    //         delete requestQuery._remove;
    //     }

    //     if(requestQuery._for){
    //         forPage = requestQuery._for;
    //         delete requestQuery._for;
    //     }

    //     let entities;
    //     if (ctx.query._q) {
    //     entities = await strapi.quer('categories').search(requestQuery);
    //     } else {
    //     entities = await strapi.services['categories'].find(requestQuery, populates);
    //     }

    //     return entities.map(entity => {
    //         delete entity[removal];

    //         if(forPage == 'homepage'){
    //             entity.blogs = entity.blogs.length;
    //         }
    //         // if(!entity.blogs)
    //         //     entity.blogs = [];
    //     return sanitizeEntity(entity, { model: strapi.query('categories').model })
    //     });
    // }
};
