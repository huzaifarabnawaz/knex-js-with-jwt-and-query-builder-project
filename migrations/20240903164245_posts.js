/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("posts",table=>{
        table.uuid('id')
        table.string("title").notNullable()
        table.string('body').notNullable()
        table.uuid('userId').references('id').inTable('users')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
