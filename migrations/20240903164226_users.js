/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
    exports.up = async function(knex) {
        return knex.schema.createTable("users",table=>{
           table.uuid('id').unique()
           table.string("name").notNullable()
           table.string("email").unique()
            table.integer('otp').notNullable();
            table.bigint('otp_expire').notNullable();
           table.string("password").notNullable()
        
       })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
