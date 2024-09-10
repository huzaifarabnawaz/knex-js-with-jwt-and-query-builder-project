/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
  return knex.schema.createTable('posts',table=>{
    table.uuid('id').primary().unique()
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.uuid('user_id')
    .references('id').inTable('users').onDelete('CASCADE')
    table.timestamp(true,true)

  })  

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
