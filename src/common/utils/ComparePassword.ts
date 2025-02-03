import { compare } from 'bcrypt';

export async function ComparePassword(password: string, passwordHash: string) {
  return compare(password, passwordHash);
}
