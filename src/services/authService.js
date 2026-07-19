import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

export const authService = {
  login: (email, password) => signInWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
  onChange: (cb) => onAuthStateChanged(auth, cb),
  async getRole(uid) {
    const snap = await getDoc(doc(db, "users", uid));
    return snap.exists() ? snap.data().role : null;
  },
};
