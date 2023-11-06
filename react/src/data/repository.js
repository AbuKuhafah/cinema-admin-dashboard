import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4000/graphql";

// --- Owner ---------------------------------------------------------------------------------------
async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
  {
    all_users {
      email,
      username,
      password_hash,
      first_name,
      last_name,
      joined_in,
      locked
    }
  }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_users;
}

async function getReviews() {
  // Simply query with no parameters.
  const query = gql`
  {
    all_posts {
      post_id,
      review,
      rating,
      email,
      title
    }
  }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_posts;
}

async function getMovies() {
  // Simply query with no parameters.
  const query = gql`
  {
    all_movies {
      title,
      description,
      rating,
      views
    }
  }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_movies;
}

async function getUserSessions() {
  // Simply query with no parameters.
  const query = gql`
  {
    all_sessions {
      tickets,
      booked_in
    }
  }
  `;

  const data = await request(GRAPH_QL_URL, query);

  return data.all_sessions;
}



async function getUser(email) {
  // Query with parameters (variables).
  const query = gql`
    query ($email: String) {
      owner(email: $email) {
        email,
        username,
        password_hash,
        first_name,
        last_name,
        joined_in,
        locked
      }
    }
  `;

  const variables = { email };

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.user;
}

// async function getUserExists(email) {
//   const query = gql`
//     query ($email: String) {
//       owner_exists(email: $email)
//     }
//   `;

//   const variables = { email };

//   const data = await request(GRAPH_QL_URL, query, variables);

//   return data.owner_exists;
// }

// async function createOwner(owner) {
//   const query = gql`
//     mutation ($email: String, $first_name: String, $last_name: String) {
//       create_owner(input: {
//         email: $email,
//         first_name: $first_name,
//         last_name: $last_name
//       }) {
//         email,
//         first_name,
//         last_name
//       }
//     }
//   `;

//   const variables = owner;

//   const data = await request(GRAPH_QL_URL, query, variables);

//   return data.create_owner;
// }

async function blockUser(user) {
  const query = gql`
    mutation ($email: String) {
      block_user(input: {
        email: $email,
        locked: true
      }) {
        email,
        locked
      }
    }
  `;



  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_user;
}

async function unblockUser(user) {
  const query = gql`
    mutation ($email: String) {
      unblock_user(input: {
        email: $email,
        locked: false
      }) {
        email,
        locked
      }
    }
  `;



  const variables = user;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_user;
}


async function updateReview(post) {
  const query = gql`
    mutation ($post_id: Int) {
      update_review(input: {
        post_id: $post_id
      }) {
        post_id
      }
    }
  `;

  const variables = post;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_review;
}

async function updateMovie(movie) {
  const query = gql`
    mutation ($title: String, $description: String, $rating: Int) {
      update_movie(input: {
        title: $title,
        description: $description,
        rating: $rating
      }) {
        title,
        description,
        rating
      }
    }
  `;

  const variables = movie;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.update_movie;
}

async function createMovie(movie) {
  const query = gql`
    mutation ($title: String, $rating: Int, $description: String, $image_path: String) {
      create_movie(input: {
        title: $title,
        rating: $rating,
        description: $description,
        image_path: $image_path
      }) {
        title,
        rating,
        description,
        image_path
      }
    }
  `;

  const variables = movie;

  const data = await request(GRAPH_QL_URL, query, variables);

  return data.create_movie;
}

export {
  getUsers, getUser, blockUser, unblockUser,
  getReviews, updateReview, getMovies, getUserSessions, 
  updateMovie, createMovie
  /*, getUserExists, createOwner, updateUser, deleteOwner*/
}
