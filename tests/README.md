# Shop tests

Requires Node 20.19+ (Node 24 recommended).

```sh
npm --prefix tests ci
npm --prefix tests test
```

This runs inventory calculations, admin DOM tests, and backend write orchestration
using an in-memory transactional adapter. These mocks do not prove deployed
database access, security rule correctness, or Firestore's real retry behavior.

For rules, real Firestore transactions, concurrent batch consumption, and audit
records, install Java 21+ and run from the repository root:

```sh
npx firebase-tools@15.34.2 emulators:exec --only firestore --project demo-sunniejae-inventory --config tests/firebase.emulator.json "npm --prefix tests run test:rules"
```

This uses an isolated demo project and does not require Firebase credentials or
connect to production. The first run downloads the official emulator from
`storage.googleapis.com`. Use the demo project ID exactly as shown.

The managed cloud environment blocked that download, so the emulator suite was
added but could not be executed here. Run it before deploying new security rules.
