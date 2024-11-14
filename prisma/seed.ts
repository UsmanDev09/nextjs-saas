// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const softSkills = [
    { name: 'Communication' },
    { name: 'Emotional Intelligence' },
    { name: 'Critical Thinking' },
    { name: 'Collaboration' },
    { name: 'Adaptability' },
    { name: 'Time Management' },
    { name: 'Leadership' },
    { name: 'Customer Service' },
    { name: 'Digital Literacy' },
    { name: 'Work Ethic' },
  ];

  await prisma.softSkill.createMany({
    data: softSkills,
    skipDuplicates: true,
  });

  await prisma.notificationType.create({
    data: {
      notificationName: 'User Signup Notification',
      isSystemGeneratedype: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
