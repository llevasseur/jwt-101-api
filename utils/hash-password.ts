import bcrypt from "bcrypt";

export async function hashPassword(plainPassword: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  inputPassword: string,
  storedHash: string
) {
  const match = await bcrypt.compare(inputPassword, storedHash);
  return match;
}
