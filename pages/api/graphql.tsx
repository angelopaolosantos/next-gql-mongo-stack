// pages/api/graphql.js
import { ApolloServer, gql } from 'apollo-server-micro'
import { makeExecutableSchema } from 'graphql-tools'
import { MongoClient } from 'mongodb'

const typeDefs = gql`
  type Customer {
    id: Int!
    firstName: String!
    lastName: String!
  }

  type Query {
    customers: [Customer]!
  }
`

const resolvers = {
  Query: {
    customers: (_parent, _args, _context, _info) => {
      const result  = _context.db
        .collection('customers')
        .find()
        .toArray()

      return result
    },
  },
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

let db

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
      if (!db) {
          try {
              const dbClient = new MongoClient(process.env.NEXT_PUBLIC_MONGO_DB_URI,
                  {
                      useNewUrlParser: true,
                      useUnifiedTopology: true,
                  }
              )

              if (!dbClient.isConnected()) await dbClient.connect()
              db = dbClient.db('galeah_db') // database name
              console.log("connected to database: ", dbClient.isConnected())
          } catch (e) {
              console.log('--->error while connecting with graphql context (db)', e)
          }
      }

      return { db }
  },
})

export const config = {
  api: {
      bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })