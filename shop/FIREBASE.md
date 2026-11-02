# Shop data setup

The site uses Firebase project `sunniejaeshop`. GitHub Pages serves the website;
Firebase provides Firestore and anonymous Authentication. No Firebase Hosting
migration is needed.

## Required Firebase console steps

1. Create the default Cloud Firestore database in production mode.
2. In Authentication → Sign-in method, enable **Anonymous**.
3. Publish the contents of the repository's `firestore.rules` in Firestore → Rules.
   Alternatively, sign in with the Firebase CLI and run
   `npx firebase-tools@15.34.2 deploy --only firestore:rules --project sunniejaeshop`
   from the repository root. This replaces the project's Firestore rules; review
   existing rules first if other apps share this database.
4. In Firestore, create a `products` collection. Add product documents using the
   fields below. The initial catalog is in `products.js`; use document IDs `1`
   through `8` to match existing wishlists.

Product fields:

| Field | Type | Example |
| --- | --- | --- |
| title | string | Astrology Planner: 2026 |
| price | string | $50 |
| image | string | https://example.com/product.png |
| description | string | A guided astrology planner. |
| type | string | exclusive (request) or direct (retailer link) |
| link | string | HTTPS retailer URL, for direct products |
| available | boolean | true (false hides the product) |

A successful database read uses the saved catalog, including an empty catalog.
If Firebase is unreachable or not configured, the original catalog appears with
an availability notice. The public site never creates or edits product documents.
Manage products and read `saleRequests` using the Firebase console with an
appropriately authorized Google account. Console/server access uses IAM rather
than the website's rules. All product document fields are publicly readable;
never store private information in that collection.

## Sale requests

The wishlist form saves the name, email, message, product IDs/titles/quantities,
anonymous customer ID, server timestamp, and status `new` in `saleRequests`.
It preserves the wishlist on failure, and clears it only after Firestore confirms
success. Requests are not payments or binding prices. Confirm product availability
and pricing before fulfilling them. No email notifications are configured;
check the Firebase console for new requests.

The included rules deny public reads, updates, and deletes of requests and
validate authenticated submissions and each item. Anonymous authentication does
not prevent spam. Before promoting the form widely, configure Firebase App Check
with a web provider and enforce it for Firestore after registering the web client,
or route submissions through a rate-limited backend. Set retention and deletion
practices for customer contact data. Do not use open test-mode rules.

## Validation

Local DOM tests exercise catalog loading/failure, safe rendering, wishlist
quantity/removal, and request success/failure using a mocked Firebase adapter.
Live requests require the console steps above; the Firebase web config alone
does not authorize database setup or deployment.
