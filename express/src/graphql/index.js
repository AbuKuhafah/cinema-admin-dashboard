const { buildSchema } = require("graphql");
const db = require("../database");
const { encodeBase64, decodeBase64 } = require('base64-arraybuffer');

const graphql = {};

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  
  type User {
    email: String,
    username: String,
    password_hash: String,
    first_name: String,
    last_name: String,
    joined_in: String,
    locked: Boolean
  }

  type Post {
    post_id: Int,
    review: String,
    rating: Int,
    email: String,
    title: String
  }

  type Movie {
    title: String,
    rating: Int,
    description: String,
    image_path: String,
    views: Int
  }

  type UserSession {
    email: String,
    tickets: Int,
    booked_in: Date
  }
  scalar Date
  # The input type can be used for incoming data.
  input UserInput {
    email: String,
    locked: Boolean
  }

  # The input type can be used for incoming data.
  input PostInput {
    post_id: Int,
    review: String
  }

  input MovieInput {
    title: String,
    rating: Int,
    description: String,
    image_path: String,
    views: Int
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    user(email: String): User,
    all_posts: [Post],
    post(review: String): Post,
    all_movies: [Movie],
    movie(title: String): Movie,
    all_sessions: [UserSession]
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    block_user(input: UserInput): User,
    unblock_user(input: UserInput): User,
    update_review(input: PostInput): Post,
    update_movie(input: MovieInput): Movie,
    create_movie(input: MovieInput): Movie
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  },
  user: async (args) => {
    return await db.user.findByPk(args.email);
  },

  all_posts: async () => {
    return await db.post.findAll();
  },
  post: async (args) => {
    return await db.post.findByPk(args.post_id);
  },

  all_movies: async () => {
    return await db.movie.findAll();
  },
  movie: async (args) => {
    return await db.movie.findByPk(args.title);
  },
  all_sessions: async () => {
    return await db.user_session.findAll();
  },

  // // Mutations.
  // create_owner: async (args) => {
  //   const owner = await db.owner.create(args.input);

  //   return owner;
  // },
  block_user: async (args) => {
    const user = await db.user.findByPk(args.input.email);

    // Update owner fields.
    user.locked = true;

    await user.save();

    return user;
  },
  unblock_user: async (args) => {
    const user = await db.user.findByPk(args.input.email);

    // Update owner fields.
    user.locked = false;

    await user.save();

    return user;
  },
  update_review: async (args) => {
    const post = await db.post.findByPk(args.input.post_id);

    // Update owner fields.
    post.review = "[**** This review has been deleted by the admin ***]";

    await post.save();

    return post;
  },

  update_movie: async (args) => {
    const movie = await db.movie.findByPk(args.input.title);

    // Update owner fields.
    movie.description = args.input.description;

    movie.rating = args.input.rating;

    await movie.save();

    return movie;
  },
  create_movie: async (args) => {
    const { title, rating, description, image_path, views } = args.input;

    try {
      const movie = await db.movie.create({
        title,
        rating,
        description,
        image_path,
        views,
      });

      return movie;
    } catch (error) {
      throw new Error('Error creating movie: ' + error.message);
    }
  }
  // ,
  // delete_owner: async (args) => {
  //   const owner = await db.owner.findByPk(args.email);

  //   if(owner === null)
  //     return false;

  //   // First remove all pets owned by the owner.
  //   await db.pet.destroy({ where: { email: owner.email } });
  //   await owner.destroy();

  //   return true;
  // }
};

module.exports = graphql;
