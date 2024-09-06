/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    exports.up = async function(knex) {
        return knex.schema.createTable("users",table=>{
           table.uuid('id').unique()
           table.string("name").notNullable()
           table.string("email").unique()
           table.string("password").notNullable()
           
       })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
