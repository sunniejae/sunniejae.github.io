import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

async function setup(authOverrides = {}) {
  const calls = [];
  const documents = new Map();
  const auth = { currentUser: null, authStateReady: async () => {}, ...authOverrides };
  const sdk = {
    initializeApp: () => ({}), getFirestore: () => ({}), getAuth: () => auth,
    collection: (db, name) => ({ name }), serverTimestamp: () => "server-time",
    where: (...args) => ({ where: args }), orderBy: (...args) => ({ orderBy: args }), limit: value => ({ limit: value }),
    query: (collection, ...constraints) => ({ collection, constraints }),
    signInAnonymously: async () => { calls.push(["sign-in"]); auth.currentUser = { uid: "guest-uid", isAnonymous: true }; return { user: auth.currentUser }; },
    doc: (db, name, id) => ({ path: `${name}/${id}` }),
    getDoc: async ref => ({ exists: () => documents.has(ref.path), data: () => documents.get(ref.path) }),
    setDoc: async (ref, data) => { documents.set(ref.path, data); calls.push(["profile", ref.path, data]); },
    EmailAuthProvider: { credential: (email, password) => ({ email, password }) },
    setPersistence: async () => {}, browserLocalPersistence: {},
    linkWithCredential: async (user, credential) => { calls.push(["link", user.uid]); Object.assign(user, { isAnonymous: false, email: credential.email, emailVerified: false }); return { user }; },
    sendEmailVerification: async user => { calls.push(["verify", user.uid]); },
    signInWithEmailAndPassword: async () => {}, signOut: async () => {}, sendPasswordResetEmail: async () => {},
    addDoc: async (collection, values) => { calls.push(["save", values]); return { id: "r" }; },
    getDocs: async query => { calls.push(["query", query]); return { docs: [] }; }
  };
  const key = `customerTest${Math.random().toString().slice(2)}`;
  globalThis[key] = sdk;
  const source = (await fs.readFile(new URL("../shop/firebase.js", import.meta.url), "utf8"))
    .replace(/^import \{([^}]+)\} from "[^"]+";$/gm, (_, names) => `const {${names}} = globalThis.${key};`);
  const api = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  delete globalThis[key];
  return { api, calls, auth, documents };
}

test("request history filters by the authenticated customer and orders the latest 25", async () => {
  const { api, calls } = await setup();
  await api.loadMyRequests();
  const query = calls.find(call => call[0] === "query")[1];
  assert.deepEqual(query.constraints, [{ where: ["customerId", "==", "guest-uid"] }, { orderBy: ["createdAt", "desc"] }, { limit: 25 }]);
});

test("the saved request uses the authenticated owner and server-controlled initial fields", async () => {
  const { api, calls } = await setup({ currentUser: { uid: "existing-user" } });
  await api.saveSaleRequest({ name: "Guest", email: "", customerId: "spoofed", status: "fulfilled", createdAt: "fake" });
  const values = calls.find(call => call[0] === "save")[1];
  assert.equal(values.customerId, "existing-user"); assert.equal(values.status, "new"); assert.equal(values.createdAt, "server-time");
  assert.equal(calls.filter(call => call[0] === "sign-in").length, 0);
});

test("restored sessions are awaited instead of creating a new anonymous owner", async () => {
  const { api, calls, auth } = await setup();
  auth.authStateReady = async () => { auth.currentUser = { uid: "restored-user" }; };
  await api.loadMyRequests();
  assert.equal(calls.filter(call => call[0] === "sign-in").length, 0);
  assert.equal(calls.find(call => call[0] === "query")[1].constraints[0].where[2], "restored-user");
});

test("sign-up links the anonymous identity and preserves access to guest order history", async () => {
  const { api, calls, auth, documents } = await setup();
  await api.registerCustomer("buyer@example.com", "test-password", true);
  assert.equal(auth.currentUser.uid, "guest-uid"); assert.equal(auth.currentUser.isAnonymous, false);
  assert.deepEqual(calls.find(call => call[0] === "link"), ["link", "guest-uid"]);
  assert.deepEqual(documents.get("customers/guest-uid"), { email: "buyer@example.com", orderEmailUpdates: true, updatedAt: "server-time" });
  await api.loadMyRequests();
  assert.equal(calls.find(call => call[0] === "query")[1].constraints[0].where[2], "guest-uid");
  assert.equal(calls.filter(call => call[0] === "verify").length, 1);
  assert.equal([...documents.keys()].some(key => key.startsWith("admins/")), false);
  await assert.rejects(api.registerCustomer("other@example.com", "test-password", false), /already signed in/);
});

test("email preferences can be opted out and sender availability is off until configured", async () => {
  const { api, documents } = await setup({ currentUser: { uid: "u", email: "buyer@example.com", isAnonymous: false, emailVerified: true } });
  await api.saveEmailPreference(false);
  assert.equal(documents.get("customers/u").orderEmailUpdates, false);
  assert.equal((await api.customerAccount()).emailEnabled, false);
  documents.set("shopSettings/notifications", { emailUpdatesEnabled: true });
  assert.equal((await api.customerAccount()).emailEnabled, true);
});
