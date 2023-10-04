import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

export const create = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    city,
    country,
    image,
    facilities,
    userEmail,
  } = req.body;

  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        city,
        country,
        image,
        facilities,
        userEmail,
      },
    });

    res
      .status(200)
      .json({ message: 'residency created successfuly', residency });
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('a residency with address already there');
    }
    throw new Error(error.message);
  }
});

export const getAll = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany();

    return res.status(200).json({ residencies });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: {
        id,
      },
    });

    if (!residency) {
      return res.status(404).json({ message: 'residency not found' });
    }

    return res.status(200).json({ residency });
  } catch (error) {
    throw new Error(error.message);
  }
});