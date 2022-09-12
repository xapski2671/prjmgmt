import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main()
{
  await prisma.client.create({
    data:{
      name: "Bruce Banners",
      email: "thehulk@gmail.com",
      phone: "999-333-4444",
    }
  })

  await prisma.project.create({
    data: {
      name: "Kill Ultron",
      description: "vaporize ultron",
      status: "PENDING",
      client: {
        create: {
          name: "Tony Stark",
          email: "ironman@gmail.com",
          phone: "444-777-2222"
        }
      }
    }
  })

  // await prisma.client.create({
  //   data: {
  //     name: "Nick Fury",
  //     email: "shieldagent001@gamil.com",
  //     phone: "888-888-2222",
  //     projects: {
  //       createMany: {
  //         data: [
  //           { 
  //             name: "Find Thanos",
  //             description: "operation find thanos",
  //             status: "PENDING"
  //           },
  //           {
  //             name: "Kill Loki",
  //             description: "gods 'a fallen",
  //             status: "COMPLETED"
  //           }
  //         ]
  //       }
  //     }
  //   }
  // })
}

main()
  .catch((e)=>{
    console.log(e)
    process.exit(1)
  })
  .finally(async ()=>{
    await prisma.$disconnect()
  })