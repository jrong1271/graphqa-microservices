// resolvers.js
const pool = require('./db');

const resolvers = {
  Query: {
    users: async () => {
      const result = await pool.query('SELECT * FROM public."Users"');
      return result.rows;
    },
    user: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM "Users" WHERE id = $1', [id]);
      return result.rows[0];
    },
    products: async () => {
      const result = await pool.query('SELECT * FROM public."Products"');
      return result.rows;
    },
    product: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM "Products" WHERE id = $1', [id]);
      return result.rows[0];
    },
    userProducts: async () => {
      const result = await pool.query('SELECT * FROM public."UserProducts"');
      return result.rows;
    },
    userProduct: async (_, { id }) => {
      const result = await pool.query('SELECT * FROM "UserProducts" WHERE id = $1', [id]);
      return result.rows[0];
    },
  },
  UserProduct: {
    user: async (parent) => {
      const result = await pool.query(
        'SELECT * FROM "Users" WHERE id = $1',
        [parent.userId]
      );
      return result.rows[0];
    },
    product: async (parent) => {
      const result = await pool.query(
        'SELECT * FROM "Products" WHERE id = $1',
        [parent.productId]
      );
      return result.rows[0];
    },
  },
  Mutation: {
    addUser: async (_, { name, email }) => {
      const result = await pool.query(
        'INSERT INTO public."Users" (name, email, "createdAt", "updatedAt") VALUES ($1, $2, NOW(), NOW()) RETURNING *',
        [name, email]
      );
      return result.rows[0];
    },
  },
};

module.exports = resolvers;