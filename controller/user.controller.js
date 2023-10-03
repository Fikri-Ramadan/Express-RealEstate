import asyncHandler from 'express-async-handler';

export const register = asyncHandler(async (req, res) => {
  console.log(req.body)
  res.status(200).json({ message: 'user register successfuly' });
});
