import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
//const allUsers = await prisma.user.findMany()
//  console.log(allUsers)


async function main() {
  await prisma.artist.create({
    data: {
      name: 'Tana',
      email: 'tana@techdocs.io',
      songs: 'Hello Bearn',
      profile: 'Bonjour',
    },
  })

  const allArtists = await prisma.artist.findMany({
  take: 5
  cursor:1,  

  include: {
      songs: true,
      profile: true,
    },
  })
  console.dir(allArtists, { depth: null })
}
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
