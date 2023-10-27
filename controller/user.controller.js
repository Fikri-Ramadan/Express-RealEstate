import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// Create new user
export const register = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(201).json({ message: 'user already exist' });
    }

    const newUser = await prisma.user.create({
      data: {
        email: email,
      },
    });

    res
      .status(200)
      .json({ message: 'user created successfuly', user: newUser });
  } catch (error) {
    throw new Error(error.message);
  }
});

// Add new bookedVisits user
export const bookVisit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, date } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        bookedVisits: true,
      },
    });

    if (user.bookedVisits.some((element) => element.id === id)) {
      return res
        .status(400)
        .json({ message: 'this residency is already booked by you' });
    }

    const userAddBooking = await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: { push: { id, date } },
      },
      select: {
        bookedVisits: true,
      },
    });

    res.status(200).json({
      message: 'your visit booked successfuly',
      bookedVisits: userAddBooking.bookedVisits,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get all bookedVisits of user
export const getAllBookedVisits = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        bookedVisits: true,
      },
    });

    res.status(200).json({ bookedVisits: user.bookedVisits });
  } catch (error) {
    throw new Error(error.message);
  }
});

// Cancel/Remove bookedVisits
export const cancelBookedVisits = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });

    const index = user.bookedVisits.findIndex((element) => element.id === id);

    if (index === -1) {
      return res.status(404).json({ message: 'residency is not found' });
    }

    user.bookedVisits.splice(index, 1);
    await prisma.user.update({
      where: { email },
      data: {
        bookedVisits: user.bookedVisits,
      },
    });

    res.status(200).json({ message: 'your booked canceled successfuly' });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const toggleFavorite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesId: true },
    });

    if (user.favResidenciesId.includes(id)) {
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesId: {
            set: user.favResidenciesId.filter((favId) => favId !== id),
          },
        },
      });

      return res
        .status(200)
        .json({ message: 'favorites updated successfuly', user: updatedUser });
    }

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        favResidenciesId: { push: id },
      },
    });

    res
      .status(200)
      .json({ message: 'favorites updated successfuly', user: updatedUser });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const favorites = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesId: true },
    });

    res.status(200).json({ favorites: favorites.favResidenciesId });
  } catch (error) {
    throw new Error(error.message);
  }
});
