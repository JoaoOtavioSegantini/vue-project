const { ApolloServer, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');

// Import typeDefs and resolvers
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

// Import Environment Variables and Mongoose Models
require("dotenv").config({ path: "variables.env" });
const User = require("./models/User");
const Post = require("./models/Post");

// Connect to MLab Database
const DB = process.env.MONGO_URI.replace('<PASSWORD>', process.env.MONGO_PASS);

mongoose
  .connect(
    DB, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true}
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));


  mongoose.Promise = global.Promise;

  const getUser = async token => {
    if(token) {
            try {
               return await jwt.verify(token, process.env.SECRET_JWT);
              //  console.log(user);
            } catch (err) {
              throw new AuthenticationError('Sua sessão terminou, por favor logue-se novamente!')
            }
    }
  }
// Create Apollo/GraphQL Server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => ({name: error.name, message: error.message.replace('Context creation failed:',"")}),
  context: async ({ req }) => {
    const token = req.headers['authorization'];
  return { User,
          Post,
          currentUser: await getUser(token)
        }
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
