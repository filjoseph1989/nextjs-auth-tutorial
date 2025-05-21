import { v4 as uuidv4 } from 'uuid';
import { db } from './db';
import { getVerificationTokenByEmail } from '@/data/verification-token';

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expired = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expired,
    }
  });

  return verificationToken;
}