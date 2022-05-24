import "reflect-metadata";
import "dotenv-safe/config";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import { createConnection } from "typeorm";
import { join } from "path";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import { createComplexityLimitRule } from 'graphql-validation-complexity';

import { __prod__ } from "./constants";
import { PostResolver } from "./resolvers/postResolver/PostResolver";
import { CommentResolver } from "./resolvers/commentResolver/CommentResolver";
import { UserResolver } from "./resolvers/userResolver/UserResolver";
import { AnnouncementResolver } from "./resolvers/announcementResolver/AnnouncementResolver";
import { Suggestionsolver } from "./resolvers/suggestionResolver/SuggestionResolver";
import { HelloResolver } from "./resolvers/hello";
import { TrendResolver } from "./resolvers/trendResolver/TrendResolver";
import { ViewResolver } from "./resolvers/viewResolver/ViewResolver";
import depthLimit from "graphql-depth-limit";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    logging: !__prod__,
    synchronize: true,
    entities: [join(__dirname, "./domain/**/*.*")],
  });

  const app = express();

  app.use(
    cors({
      origin: "*",
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PostResolver,
        CommentResolver,
        UserResolver,
        AnnouncementResolver,
        Suggestionsolver,
        HelloResolver,
        TrendResolver,
        ViewResolver,
      ],
      validate: false,
    }),
    validationRules: [ 
      depthLimit(5),
      createComplexityLimitRule(10000, {
        scalarCost: 1,
        objectCost: 5,
        listFactor: 10,
        formatErrorMessage: (cost) =>{
          return `Query exceeds complexity limit. Calculated Cost: ${cost}`
        },
        onCost: (cost) =>{
          console.log(`Calculated Cost: ${cost}`)
        }
      })
     ],
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }: any) => ({ req, res }),
    introspection: true,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(!__prod__ ? 5050 : process.env.PORT!, () => {
    console.log(
      `Server started on ${
        !__prod__
          ? `http://localhost:5050`
          : `https://api-board-graphql.herokuapp.com`
      }${apolloServer.graphqlPath}`
    );
  });
};

main();
