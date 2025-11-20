import prisma from "../utils/db.js";
import generateCode from "../utils/generateCode.js";

export const serviceCreateLink = async ({ url, code }) => {
  if (!code) code = generateCode();

  return prisma.link.create({
    data: {
      code,
      url,
      totalClicks: 0,
      lastClicked: null,
    },
  });
};

export const serviceGetAllLinks = () => {
  return prisma.link.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const serviceGetLinkStats = (code) => {
  return prisma.link.findUnique({
    where: { code },
  });
};

export const serviceDeleteLink = (code) => {
  return prisma.link.delete({
    where: { code },
  });
};
