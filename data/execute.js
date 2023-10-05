import { readFile } from 'fs/promises';
import { prisma } from '../config/prismaConfig.js';

const populate = async () => {
  const residency = JSON.parse(
    await readFile(new URL('./Residency.json', import.meta.url))
  );

  try {
    await prisma.residency.createMany({
      data: residency,
    });

    console.log('injecting...');
    console.log('on process...');
    console.log('inject successfuly!!!');
  } catch (error) {
    throw new Error(error.message);
  }
};

populate();
