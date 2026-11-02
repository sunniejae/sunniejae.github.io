# Shop data setup

The site uses Firebase project `sunniejaeshop`. The static website can run on
GitHub Pages or Firebase Hosting. Firebase supplies Firestore and Authentication;
there is no custom server or payment processing in this implementation.

## Shop office: products, supplies, and inventory

Open `/shop/admin.html` on your deployed website. The shop office includes:

- Public product details and visibility, plus private SKUs, stock, and reorder thresholds.
- Supplies with units, quantity, cost per unit in USD, supplier, notes, and archiving.
- A recipe editor selecting the supplies needed for one finished product.
- Positive and negative stock adjustments with a required reason.
- Production batches that consume supplies and add finished stock in one Firestore transaction.
- Low-stock indicators, a movement history, and customer sale requests with status updates.

All stock operations use transactions. Concurrent updates retry against the latest
balances, and insufficient stock rejects the whole operation. Supply and product
metadata edits preserve their current quantities. New items start at zero;
receive stock with **Adjust stock**. Finished-product quantities must be whole
numbers; supplies can use fractions (calculations round to six decimal places).
Archive supplies instead of deleting them, and hide products instead of deleting
their history. Product visibility and stock are independent: zero-stock products
may still accept custom requests. Requests do not reserve or deduct inventory;
record a negative product adjustment when shipping or selling an item. Changing
a request status alone does not move stock or take payment.

### First staff account (required)

1. In Firebase Authentication, enable **Email/Password** in addition to Anonymous.
2. In Authentication → Users, create your staff user and copy its **UID**.
3. In Firestore, create the collection `admins`. Create a document whose ID is
   exactly that UID, with a string field `role` set to `owner`.
4. Deploy the updated `firestore.rules` (or paste them into Firestore → Rules
   and Publish). Deploy the website files, then sign in at `/shop/admin.html`.

Only the Firebase console or a trusted server using IAM can grant membership.
The website cannot add admins. An `admins/{uid}` document grants full staff
access; the `role` field is descriptive, not a separate permission level. Delete
that document in the console to revoke access. Changing its role or adding
`enabled: false` does not revoke access. Staff can see customer contact data and
modify inventory, so grant access only to people who need those capabilities.
Staff sessions use browser session persistence. There is no public signup page.

An empty catalog can be populated with **Import original catalog** after signing
in. Import creates missing product and inventory records using the original IDs;
it never overwrites saved products. Use **New product** and **New supply** for new
items. Add supplies first, receive their stock, and then select them in a product's
recipe. **Make a batch** is available for products with a saved recipe.

Use **Duplicate** on a product to reuse its catalog details, low-stock threshold,
and supply recipe. Enter a new product name in the editor and click **Save product**.
The copy receives a new ID, zero stock, and a blank SKU. Supply IDs in the recipe
are shared references to the existing supplies, not new supply records. Use
**Duplicate** on a supply to reuse its unit, cost, supplier, notes, threshold, and
active setting with a new name and zero stock. No copy is written until you save;
the original item and its stock remain unchanged.

### Collections and subcollections

The Collections browser organizes both product inventory and supplies. Create a
root collection from **All stock** or **Unfiled / root**, open it, then use
**Create collection here** to add a subcollection. Repeat at any level; there is
no fixed application nesting limit. Collections are stored as private parent-linked
records in `stockCollections`, not deeply nested Firestore paths.

Use the **Collection** selector in a product or supply editor to move that item.
New items default to the collection you are viewing. Items without an assignment
remain **Unfiled**; **All stock** shows everything. Breadcrumbs navigate back up,
and **Include stock from subcollections** includes descendants of the selected
collection. Search works within the selected collection. Duplicates inherit the
original item's collection. Collection names can be changed. Parent links are
fixed after creation, and collections cannot be deleted, preventing circular
trees and orphaned stock. These are organizational collections; they do not
create new stock balances or duplicate items.

Stock numbers omit their unit labels. Unit information is retained in the supply
editor, cost-per-unit details, and recipes for accurate production calculations.
Existing stock records do not require a migration. Deploy **both rules and
Hosting** for this update, because loading the dashboard now reads stock collections.

### Deploy from VS Code

From the repository root after signing into the Firebase CLI:

```sh
npx firebase-tools@15.34.2 deploy --only firestore:rules,hosting --project sunniejaeshop
```

Review rules for any other apps sharing the project before replacing them. The
included Hosting configuration excludes tests and development dependencies.
Run the tests in `tests/README.md` before deploying the new rules. Deployment,
staff creation, and live production requests were not performed by this change.

## Required Firebase console steps

1. Create the default Cloud Firestore database in production mode.
2. In Authentication → Sign-in method, enable **Anonymous**.
3. Publish the contents of the repository's `firestore.rules` in Firestore → Rules.
   Alternatively, sign in with the Firebase CLI and run
   `npx firebase-tools@15.34.2 deploy --only firestore:rules --project sunniejaeshop`
   from the repository root. This replaces the project's Firestore rules; review
   existing rules first if other apps share this database.
4. Follow the staff setup above and import or add products in the shop office.
   Alternatively, create a `products` collection in the Firebase console using
   the fields below. Original product IDs `1` through `8` match existing wishlists.

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
Manage products and read `saleRequests` using the shop office or Firebase console.
Console/server access uses IAM rather than the website's rules. All product document
fields are publicly readable; never store private information in that collection.
Private records live in `productInventory`, `supplies`, and `inventoryMovements`.
Movement records cannot be edited or deleted by the website. Trusted staff can
write inventory directly through the SDK; this is an operational history of app
changes, not a tamper-proof financial ledger. Offline inventory writes are not
supported; transactions need a live Firebase connection.

## Sale requests

The wishlist form saves the name, email, message, product IDs/titles/quantities,
anonymous customer ID, server timestamp, and status `new` in `saleRequests`.
It preserves the wishlist on failure, and clears it only after Firestore confirms
success. Requests are not payments or binding prices. Confirm product availability
and pricing before fulfilling them. No email notifications are configured;
check the Firebase console for new requests.

The included rules deny public reads, updates, and deletes of requests, allow
staff to read requests and update only their status, and validate authenticated
submissions and each item. Anonymous authentication does
not prevent spam. Before promoting the form widely, configure Firebase App Check
with a web provider and enforce it for Firestore after registering the web client,
or route submissions through a rate-limited backend. Set retention and deletion
practices for customer contact data. Do not use open test-mode rules.

## Validation

`npm --prefix tests ci` then `npm --prefix tests test` runs inventory calculation
and admin interface tests with mocked Firebase. The separate emulator suite covers
database permissions and concurrent stock transactions; it requires the official
Firestore emulator download. See `tests/README.md`. Live requests require the
console steps above; the Firebase web config alone does not authorize database
setup or deployment.
