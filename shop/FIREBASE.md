# Shop data setup

The site uses Firebase project `sunniejaeshop`. The static website can run on
GitHub Pages or Firebase Hosting. Firebase supplies Firestore and Authentication;
Firebase Cloud Functions can queue optional order emails; there is no payment processing.

## Cart accounts and email updates

The customer contact address is `shop@sunniejae.com` for order updates, issues,
and inquiries. It appears in the storefront footer, cart, My requests, help,
and order notification text. Listing this address does not configure SMTP delivery.

The cart offers **Sign up to save your order and get email updates**. New accounts
link Email/Password credentials to the current anonymous Firebase user, preserving
the UID and access to that browser's earlier guest requests. The cart is retained.
Signing in later restores saved requests on another device. Creating a new account
preserves guest history; signing in to an existing account does not merge a different
guest identity. That distinction is shown before existing-account sign-in.

The cart includes sign-in/out, password reset, verification email/resend, account
refresh, and order-email preferences. Passwords go only to Firebase Authentication;
they are never written to Firestore or browser cart storage. Customer accounts do
not gain staff privileges. Email preference documents live at `customers/{uid}`.

Email delivery remains **off** until an SMTP sender is configured. The cart says
that order email updates are unavailable until the public availability flag is
enabled; it does not silently opt customers in. When enabled, opt-in is unchecked
by default and delivery requires a verified email. See `functions/README.md` for
the Firebase Trigger Email extension, SMTP, billing, queue producer deployment,
and end-to-end delivery checks. Do not enable `shopSettings/notifications.emailUpdatesEnabled`
before that setup. Authentication verification/password-reset emails are separate.

## Shop office: products, supplies, and inventory

### Studio Ken storefront and public categories

The storefront's **Shop Studio Ken** / **Shop Sunnie Jae** button switches theme
and product listings. `/shop/home.html?shop=studio-ken` opens Studio Ken directly;
the existing Studio Ken portfolio's Shop link uses that URL. Studio Ken products
must be assigned in inventory before they appear. No portfolio artwork or prices
are automatically turned into sale listings.

In the Products editor, choose **Shop** and **Public category**, then save. The
inventory list has an **Inventory shop** filter. Products with no `shop` field,
including original and K-pop imports, default to Sunnie Jae. Duplicates keep the
original shop and category. Supplies have no shop field or brand filter: they
remain shared and can be used in either shop's recipes. Stock quantities and
private inventory collections stay unchanged when you change a product's shop.

Use the admin **Shop categories** tab to create root categories and nested
subcategories for each shop, then assign them to products. Parent categories must
belong to the same shop; a product cannot use another shop's category. Categories
can be renamed, but shop/parent links stay fixed after creation. They live in the
public `shopCategories` collection; do not put private stock/supply labels there.
The private `stockCollections` tree is separate and is never sent to shoppers.

Shoppers can filter by category and successive subcategories, including all items
under the selected parent. Search combines with shop/category filters and matches
product titles, descriptions, and category names, ignoring case and accents.
Clear filters resets category/search while keeping the shop. The URL records shop,
category, and search for sharing. Both shops share one cart and customer account;
cart items show their shop. Switching shops does not remove other items or make
their availability depend on the current search filter.

Deploy Firestore rules and Hosting together for public category access and the
new product fields. No extra composite index is required for these client-side
catalog filters. Existing products remain valid without a migration.

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
Supplies can be archived and products hidden when you want to retain their records.
Product visibility and stock are independent: zero-stock products
may still accept custom requests. Requests do not reserve or deduct inventory;
record a negative product adjustment when shipping or selling an item. Changing
a request status alone does not move stock or take payment.

### Deleting products and supplies

Use **Delete product** or **Delete supply** on an inventory card, then confirm the
name and current stock in the browser confirmation. Cancelling makes no change.
Product deletion removes both the public catalog record and its private inventory
record in a transaction; customers cannot add it after a catalog refresh. Existing
sale requests and stock movement records are retained. Supply deletion is blocked
while any product recipe references it. Remove those recipe entries or delete the
associated products first. Stale open editors cannot silently recreate a deleted
item; refresh and use New product/New supply to create a new one.

These deletes are permanent and may discard nonzero current stock. Use Hide or
Archive instead if you only want to stop using an item. Deleted original/K-pop
catalog products can be imported again, starting with zero stock. Recipe saves
update referenced supply timestamps to coordinate with concurrent deletion. The
website's recipe reference check is a business safeguard; trusted admins using
the console or raw SDK must maintain references themselves. Movement history and
customer requests still cannot be deleted through the website.

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
npx firebase-tools@15.34.2 deploy --only firestore,hosting --project sunniejaeshop
```

Review rules for any other apps sharing the project before replacing them. The
included Hosting configuration excludes tests and development dependencies.
Run the tests in `tests/README.md` before deploying the new rules. Deployment,
staff creation, and live production requests were not performed by this change.

## K-pop transfers in the shop office

Open **K-pop catalog** in `/shop/admin.html`, choose a group, and select the design
versions you want. The catalog is shared with the original `/kpop/shop.html` page:
six product types across seven groups, with 127 group/design variants. Fixed IZNA
collage images appear only for IZNA; group placeholders are resolved for each
other gallery. Image filename capitalization and version order are preserved.

Choose a destination collection in the collections browser, then:

- **Transfer selected as drafts** adds hidden product and inventory records.
- **Transfer selected to live shop** creates visible products that appear at
  `/shop/home.html`, plus zero-stock inventory records.
- **Edit saved product** opens that record's editor on the same admin page. Set
  its price, retailer link, supply recipe, visibility, and other details there.

The original K-pop catalog did not specify prices. Imported custom designs use
`Price on request`; retailer designs use `See retailer`. Two original retailer
links contain `YOUR-SHOP` placeholders. These designs can only transfer as drafts
until you add a real URL and enable visibility in the product editor. Hidden
retailer drafts may have an empty link; visible retailer products require a link.

Each image/design version becomes its own product, with a stable `kpop-…` ID and
SKU, so it does not collide with the original products numbered 1–8. Repeating
a transfer never overwrites edited details, visibility, collections, or existing
stock. Existing records are marked **Already transferred**. Transfers do not
deduct supplies or create stock; use adjustments and production batches afterward.
This changes inventory and the main live shop; the original K-pop page keeps its
existing browsing and wishlist workflow.

## Required Firebase console steps

1. Create the default Cloud Firestore database in production mode.
2. In Authentication → Sign-in method, enable **Anonymous**.
3. Publish the contents of the repository's `firestore.rules` in Firestore → Rules.
   Alternatively, sign in with the Firebase CLI and run
   `npx firebase-tools@15.34.2 deploy --only firestore --project sunniejaeshop`
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

The storefront flow is **Add to cart → Optional account → Review → Send request → My requests**.
There is no external form or required email. Name and email are optional; unnamed
customers are saved as `Guest customer` with an empty email string. Notes and
customization can be added during review. Saved requests contain the customer ID,
items, server timestamp, and status `new`. Checkout rechecks catalog visibility
and clears the cart only after Firestore confirms a save. The confirmation shows
the request reference. Requests are not payments, price quotes, or stock reservations.
Retailer products still link to the retailer's own checkout and tracking.

**My requests** shows the latest 25 requests belonging to the current Firebase
user, with status and the current `shopMessage`. Anonymous sign-in is automatic
and waits for restored sessions before creating a new guest identity. The query
filters by `customerId`, orders by `createdAt`, and uses the composite index in
`firestore.indexes.json`. Deploy the index with the rules; its first build may take
time. Refresh My requests to retrieve later updates. Verified accounts that opt in
can receive order emails after the optional sender pipeline is activated.

Guest history is tied to the same browser profile, website origin, and Firebase
identity. Clearing site data, changing device/domain, signing out, or replacing
the anonymous session with a different login can remove access to that history.
The request reference is a reference only, not an access credential. Automated
payments are not part of this flow. Sign up through the cart before discarding a
guest session to preserve its history. Existing-account sign-in does not merge
another guest UID's requests.

Staff use the shop office's Sale requests tab to change status and save a customer-
visible shop message (up to 2,000 characters). It is one current message, not a
chat thread. Customer email may be absent, so use that message for next steps.
Do not put internal staff notes or secrets in request documents: their owners can
read the entire document. Public visitors cannot browse other customers' requests.

The rules allow owners to read only their own requests, require authenticated and
validated submissions, and allow staff to update only status and `shopMessage`.
Customers cannot edit requests or impersonate shop replies. Anonymous authentication does
not prevent spam. Before promoting the form widely, configure Firebase App Check
with a web provider and enforce it for Firestore after registering the web client,
or route submissions through a rate-limited backend. Set retention and deletion
practices for customer contact data. Do not use open test-mode rules.

## Validation

`npm --prefix tests ci` then `npm --prefix tests test` runs inventory calculation,
admin interface, customer data access, and storefront checkout tests with mocked
Firebase. The separate emulator suite covers
database permissions and concurrent stock transactions; it requires the official
Firestore emulator download. See `tests/README.md`. Live requests require the
console steps above; the Firebase web config alone does not authorize database
setup or deployment.
