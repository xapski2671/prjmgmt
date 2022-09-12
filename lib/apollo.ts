import { ApolloClient, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming){return incoming}
        },
        projects: {
          merge(existing, incoming){return incoming}
        }
      }
    }
  }
})

const apolloClient = new ApolloClient({
  uri: "https://prj-mgmt.herokuapp.com/api/graphql",
  cache: cache
})

export default apolloClient