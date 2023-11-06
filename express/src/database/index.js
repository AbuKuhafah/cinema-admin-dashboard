const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");


const db = {
  Op: Sequelize.Op
};
// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});
// console.log("Test: ",db.sequelize)
// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.movie = require("./models/movie.js")(db.sequelize, DataTypes);
db.session = require("./models/session.js")(db.sequelize, DataTypes);

// Relate post, user and movie.
db.post.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });
db.post.belongsTo(db.movie, { foreignKey: { name: "title", allowNull: false } });

// Many-to-many relationship between users and sessions;
db.user_session = require("./models/user_session.js")(db, DataTypes);
db.user.belongsToMany(db.session, { through: db.user_session, as: "sessions", foreignKey: "email" });
db.session.belongsToMany(db.user, { through: db.user_session, as: "users", foreignKey: "session_id" });


// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0)
    return;

  // const argon2 = require("argon2");
  // let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  // await db.user.create({ email: "marco@example.com", username: "Marco", password_hash: hash, first_name: "Marco", last_name: "Lai", joined_in: Date('25-09-2023') });

  // hash = await argon2.hash("abc123", { type: argon2.argon2id });
  // await db.user.create({ email: "abu@example.com", username: "Abu", password_hash: hash, first_name: "Abu", last_name: "Kuhafah", joined_in: Date('25-09-2023') });

}

module.exports = db;
