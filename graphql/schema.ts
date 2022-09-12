import { gql } from "apollo-server-micro"
import prisma from "../lib/prisma"

const typeDefs = gql`
  type Client {
    id: ID!
    name: String
    email: String
    phone: String
  }

  type Project {
    id: ID!
    name: String
    description: String
    status: String
    client: Client
  }


  type Query {
    projects: [Project]
    project(id: ID!): Project
    clients: [Client]
    client(id: ID!): Client
  }


  type Mutation {
    addClient(name: String!, email: String!, phone: String!): Client
    deleteClient(id: ID!): Client
    updateClient(id: ID!, name: String, email: String, phone: String): Client
    addProject(name: String!, description: String!, status: ProjectStatus = PENDING, clientId: ID!): Project
    deleteProject(id: ID!): Project
    updateProject(id: ID!, name: String, description: String, status: ProjectStatusUpdate, clientId: ID): Project
  }

  enum ProjectStatus {
    PENDING
    INPROGRESS
    COMPLETED
  }

  enum ProjectStatusUpdate {
    PENDING
    INPROGRESS
    COMPLETED
  }
`

const resolvers = 
{
  Project: {
    client: async (parent, args)=>{
      return await prisma.client.findUnique({ where:{ id: parent.clientId } })
    }
  },

  ProjectStatus: {
    PENDING: "Pending",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
  },

  ProjectStatusUpdate: {
    PENDING: "Pending",
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
  },

  Query: {
    projects: async (parent, args)=>{return await prisma.project.findMany()},
    project: async (parent, args)=>{return await prisma.project.findUnique({ where:{ id:args.id } })},
    clients: async (parent, args)=>{return await prisma.client.findMany()},
    client: async (parent, args)=>{return await prisma.client.findUnique({ where:{ id:args.id } })},
  },

  Mutation: {
    addClient: async (parent, args)=>{
      return await prisma.client.create({
        data: {
          name: args.name,
          email: args.email,
          phone: args.phone
        }
      })
    },

    deleteClient: async(parent, args)=>{
      return await prisma.client.delete({ where:{ id: args.id } })
    },

    updateClient: async(parent, args)=>{
      const update = {
        name: args.name,
        email: args.email,
        phone: args.phone
      }

      return await prisma.client.upsert({
        where: {
          id: args.id
        },
        update:{ ...update },
        create:{ ...update }
      })
    },

    addProject: async(parent, args)=>{
      return await prisma.project.create({
        data:{
          name: args.name,
          description: args.description,
          status: args.status,
          clientId: args.clientId,
        }
      })
    },

    deleteProject: async(parent, args)=>{
      return await prisma.project.delete({ where:{ id: args.id } })
    },

    updateProject: async(parent, args)=>{
      const update = {
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId,
      }

      return await prisma.project.upsert({
        where:{ id: args.id },
        update:{ ...update },
        create:{ ...update }
      })
    },
  }
}

export { typeDefs, resolvers }