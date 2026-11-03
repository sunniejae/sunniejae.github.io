import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

async function setup(authOverrides = {}) {
  const calls = [];
  const auth = { currentUser: null, authStateReady: async () => {}, ...authOverrides };
  const sdk = {
    initializeApp: () => ({}), getFirestore: () => ({}), getAuth: () => auth,
    collection: (db, name) => ({ name }), serverTimestamp: () => "server-time",
    where: (...args) => ({ where: args }), orderBy: (...args) => ({ orderBy: args }), limit: value => ({ limit: value }),
    query: (collection, ...constraints) => ({ collection, constraints }),
    signInAnonymously: async () => { calls.push(["sign-in"]); auth.currentUser = { uid: "guest-uid" }; return { user: auth.currentUser }; },
    addDoc: async (collection, values) => { calls.push(["save", values]); return { id: "r" }; },
    getDocs: async query => { calls.push(["query", query]); return { docs: [] }; }
  };
  const key = `customerTest${Math.random().toString().slice(2)}`;
  globalThis[key] = sdk;
  const source = (await fs.readFile(new URL("../shop/firebase.js", import.meta.url), "utf8"))
    .replace(/^import \{([^}]+)\} from "[^"]+";$/gm, (_, names) => `const {${names}} = globalThis.${key};`);
  const api = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  delete globalThis[key];
  return { api, calls, auth };
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
