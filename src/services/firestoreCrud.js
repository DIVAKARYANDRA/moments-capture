import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Creates a reusable CRUD interface for a single Firestore collection.
 * Keeps Firebase query logic out of UI components entirely.
 */
export function createCrudService(collectionName) {
  const colRef = collection(db, collectionName);

  async function getAll({ orderByField, direction = "asc", filters = [] } = {}) {
    let q = colRef;
    const constraints = filters.map((f) => where(f.field, f.op, f.value));
    if (orderByField) constraints.push(orderBy(orderByField, direction));
    if (constraints.length) q = query(colRef, ...constraints);
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  async function getById(id) {
    const ref = doc(db, collectionName, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  }

  async function add(data) {
    const ref = await addDoc(colRef, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return ref.id;
  }

  async function update(id, data) {
    const ref = doc(db, collectionName, id);
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  }

  async function remove(id) {
    const ref = doc(db, collectionName, id);
    await deleteDoc(ref);
  }

  return { getAll, getById, add, update, remove };
}
