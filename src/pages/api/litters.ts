// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const litters = async (req: NextApiRequest, res: NextApiResponse) => {
  const litters = await prisma.litter.findMany();
  res.status(200).json(litters);
};

export default litters;
