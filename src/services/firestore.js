import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
} from "firebase/firestore";
import { db } from "./firebase";

export const getSweets = async () => {
  const querySnapshot = await getDocs(collection(db, "sweets"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const addSweet = async (sweetData) => {
  return addDoc(collection(db, "sweets"), {
    ...sweetData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateSweet = async (id, sweetData) => {
  return updateDoc(doc(db, "sweets", id), {
    ...sweetData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteSweet = async (id) => {
  return deleteDoc(doc(db, "sweets", id));
};

export const purchaseSweet = async (id) => {
  return updateDoc(doc(db, "sweets", id), {
    quantity: increment(-1),
    updatedAt: serverTimestamp(),
  });
};

export const searchSweets = async (searchTerm) => {
  const q = query(
    collection(db, "sweets"),
    where("name", ">=", searchTerm),
    where("name", "<=", searchTerm + "\uf8ff")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
