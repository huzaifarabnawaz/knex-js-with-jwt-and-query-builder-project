/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', table => {
      table.uuid('id').primary().unique();
      table.uuid('post_id').references('id').inTable('posts').onDelete('CASCADE'); 
      table.string('content').notNullable();
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('create_at').defaultTo(knex.fn.now()); 
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
