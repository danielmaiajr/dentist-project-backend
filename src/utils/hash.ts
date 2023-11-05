import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const saltRounds = 10;

  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export async function verifyPassword(password: string, hash: string) {
  const verify = await bcrypt.compare(password, hash);
  return verify;
}
