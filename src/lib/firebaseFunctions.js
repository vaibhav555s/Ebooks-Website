import {
  getDocs,
  collection,
  doc,
  updateDoc,
  increment,
  getDoc,
} from "firebase/firestore";

import { db } from "../../firebaseConfig";

export async function likeBook(bookId) {
  const alreadyLiked = localStorage.getItem(`liked-${bookId}`);
  if (alreadyLiked) return false;

  try {
    const ref = doc(db, "books", bookId);
    await updateDoc(ref, {
      likes: increment(1),
    });
    localStorage.setItem(`liked-${bookId}`, true);
    return true;
  } catch (error) {
    console.error("Failed to like book:", error);
    return false;
  }
}

export async function getBookLikes(bookId) {
  try {
    const ref = doc(db, "books", bookId);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data().likes : 0;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return 0;
  }
}

export async function getAllBookLikes() {
  const snapshot = await getDocs(collection(db, "books"));
  const likesMap = {};
  snapshot.forEach((doc) => {
    likesMap[doc.id] = doc.data().likes || 0;
  });
  return likesMap;
}
