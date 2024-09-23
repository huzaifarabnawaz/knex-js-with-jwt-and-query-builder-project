const { table } = require("../db/dbconnection");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('images', (table) => {
      table.increments('id').primary();
      table.uuid('user_id').notNullable(); 
      table.string('image_url').notNullable(); 
      table
        .foreign('user_id')
        .references('id')
        .inTable('users') 
        .onDelete('CASCADE'); 
      table.timestamp('upload_time').defaultTo(knex.fn.now()); 
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
