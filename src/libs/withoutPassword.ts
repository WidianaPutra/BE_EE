import { User } from "@prisma/client";

export const withoutPassword = (data: User) => {
  const { password, ...withoutPassword } = data;
  return withoutPassword;
};
