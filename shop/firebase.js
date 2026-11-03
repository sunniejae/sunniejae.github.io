import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, where, orderBy, limit } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const app = initializeApp({
  apiKey: "AIzaSyBogkjbxka2icoAUtKlmkcFHmpSp1doAGM",
  authDomain: "sunniejaeshop.firebaseapp.com",
  projectId: "sunniejaeshop",
  storageBucket: "sunniejaeshop.firebasestorage.app",
  messagingSenderId: "101322105652",
  appId: "1:101322105652:web:2054e148bd7b5e67077b61",
  measurementId: "G-4HP970S5XM"
});
export const db = getFirestore(app);
export const auth = getAuth(app);
let customerSignIn;

function authDeadline(promise) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error("Shop sign-in did not respond. Please try again.")), 15000);
  })]).finally(() => clearTimeout(timer));
}
async function customer() {
  await authDeadline(auth.authStateReady());
  if (auth.currentUser) return auth.currentUser;
  customerSignIn ||= authDeadline(signInAnonymously(auth)).then(result => result.user).finally(() => { customerSignIn = undefined; });
  return customerSignIn;
}

export async function loadProducts() {
  const snapshot = await getDocs(collection(db, "products"));
  const catalog = { exclusive: [], direct: [] };
  for (const doc of snapshot.docs) {
    const data = doc.data();
    if (data.available === false) continue;
    if (!["exclusive", "direct"].includes(data.type) || typeof data.title !== "string" || typeof data.price !== "string") continue;
    catalog[data.type].push({ ...data, id: doc.id });
  }
  return catalog;
}
export async function saveSaleRequest(request) {
  const user = await customer();
  return addDoc(collection(db, "saleRequests"), {
    ...request, customerId: user.uid, status: "new", createdAt: serverTimestamp()
  });
}

export async function loadMyRequests() {
  const user = await customer();
  const snapshot = await getDocs(query(collection(db, "saleRequests"),
    where("customerId", "==", user.uid), orderBy("createdAt", "desc"), limit(25)));
  return snapshot.docs.map(item => ({ ...item.data(), id: item.id }));
}
