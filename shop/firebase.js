import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, query, where, orderBy, limit, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
import { getAuth, signInAnonymously, EmailAuthProvider, linkWithCredential, signInWithEmailAndPassword, setPersistence, browserLocalPersistence, sendEmailVerification, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

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

export async function customerAccount() {
  await authDeadline(auth.authStateReady());
  const user = auth.currentUser;
  const settings = await getDoc(doc(db, "shopSettings", "notifications"));
  const emailEnabled = settings.exists() && settings.data().emailUpdatesEnabled === true;
  if (!user || user.isAnonymous) return { user: null, emailEnabled, emailUpdates: false };
  const profile = await getDoc(doc(db, "customers", user.uid));
  return { user: { email: user.email, verified: user.emailVerified }, emailEnabled, emailUpdates: profile.exists() && profile.data().orderEmailUpdates === true };
}

export async function saveEmailPreference(enabled) {
  await authDeadline(auth.authStateReady());
  const user = auth.currentUser;
  if (!user || user.isAnonymous || !user.email) throw new Error("Sign in to save email preferences.");
  await setDoc(doc(db, "customers", user.uid), { email: user.email, orderEmailUpdates: !!enabled, updatedAt: serverTimestamp() });
}

export async function registerCustomer(email, password, emailUpdates) {
  const guest = await customer();
  if (!guest.isAnonymous) throw new Error("You are already signed in. Sign out to use a different account.");
  await authDeadline(setPersistence(auth, browserLocalPersistence));
  const credential = EmailAuthProvider.credential(email.trim(), password);
  const result = await authDeadline(linkWithCredential(guest, credential));
  // Linking preserves the UID, including requests already placed as a guest.
  try { await saveEmailPreference(emailUpdates); }
  catch { throw new Error("Your account was created, but email preferences could not be saved. Refresh your account options and try Save email preference."); }
  try { await authDeadline(sendEmailVerification(result.user)); }
  catch { throw new Error("Your account was created. The verification email could not be sent; use Send verification email to try again."); }
}

export async function loginCustomer(email, password) {
  await authDeadline(setPersistence(auth, browserLocalPersistence));
  await authDeadline(signInWithEmailAndPassword(auth, email.trim(), password));
}
export async function logoutCustomer() { await signOut(auth); }
export async function verifyCustomerEmail() {
  if (!auth.currentUser || auth.currentUser.isAnonymous) throw new Error("Sign in first.");
  await authDeadline(sendEmailVerification(auth.currentUser));
}
export async function refreshCustomerAccount() {
  if (auth.currentUser && !auth.currentUser.isAnonymous) {
    await authDeadline(auth.currentUser.reload());
    await authDeadline(auth.currentUser.getIdToken(true));
  }
  return customerAccount();
}
export async function resetCustomerPassword(email) {
  if (!email.trim()) throw new Error("Enter your account email first.");
  await authDeadline(sendPasswordResetEmail(auth, email.trim()));
}
