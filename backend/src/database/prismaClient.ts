import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const createUserTable = async () => {
  // The tables are created automatically based on the Prisma schema
  // You can use Prisma Client to interact with the database
  await prisma.$connect();
  console.log("Connected to the database");
};

// Example of creating a user
// export const createUser = async (userData: {
//   email: string;
//   name: string;
//   program_name: string;
//   referrer_bonus_amount: number;
//   referee_bonus_amount: number;
//   referee_email: string;
// }) => {
//   const user = await prisma.user.create({
//     data: userData,
//   });
//   return user;
// };