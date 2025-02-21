import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { auth1 } from "../config/config";

export const signin = (
  email: string,
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth1, email, password);
};
