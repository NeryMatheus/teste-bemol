import { hash } from 'bcrypt';

export async function HashPassword(password: string) {
  const passwordHash = await hash(password, 8);

  return passwordHash;
}
