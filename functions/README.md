# Order email setup

Account creation and saved requests work without an SMTP service. Automatic order
emails are **off by default**. No SMTP credentials or sender are configured by
this repository, and no delivery has been tested. Firebase Authentication sends
its own verification and password-reset emails independently of this pipeline.

To activate order emails:

1. Enable Firebase Email/Password and Anonymous Authentication. Confirm your
   website's domain in Authentication → Settings → Authorized domains. Deploy the
   latest website and Firestore rules first.
2. Obtain an SMTP connection from the host of your business mailbox, or choose
   a transactional SMTP service. The shop contact address is `shop@sunniejae.com`.
   Your business email address alone is not an SMTP
   connection. Use the host's supported authentication method and verified sender.
   Enter credentials securely in the extension setup, never in chat or source files.
3. The owner has confirmed this project is already on Blaze, so no plan upgrade
   is needed. Cloud Functions and extension usage can still incur charges.
   Installing and configuring the sender remain operator steps.
4. Install the official Firebase **Trigger Email** extension (`firebase/firestore-send-email`)
   from the Firebase console's Extensions section. Configure its email documents
   collection as `mail`, SMTP connection, and default From address. You can use
   your business address when your SMTP service authorizes it.
5. From the repository root, install and deploy the queue producer:

   ```sh
   npm --prefix functions ci
   npx firebase-tools@15.34.2 deploy --only functions --project sunniejaeshop
   ```

   The runtime is Node 22. The `SHOP_URL` parameter defaults to
   `https://sunniejae.com/shop/home.html`. Keep the trusted shop URL; never build
   message links from customer-provided fields.
6. In Firestore, create `shopSettings/notifications` with a boolean field
   `emailUpdatesEnabled: true`. This enables the cart opt-in control and the queue
   producer. Keep it false or absent until both the extension and function are ready.
7. Test with your own customer account: sign up, opt in, verify its address, then
   submit a request. Confirm one receipt arrives. Change the request's status or
   shop message in the admin area, and confirm one update arrives. Opt out through
   the cart and confirm later updates do not enqueue more mail. Monitor the extension's
   delivery results in the Firebase console if delivery fails.

The queue producer checks the current account, verified email, opt-in preference,
and availability flag before enqueueing. The recipient comes from Firebase Auth,
never the contact email on a request. Duplicate invocations of the same Firestore
event use a deterministic mail document ID. Unchanged status/messages do not send.
Only plain-text order notifications are produced; there is no marketing subscription.
Opting out prevents future enqueueing but cannot retract messages already queued.
Turning off the availability flag likewise does not cancel existing queued mail.

Clients cannot read or create `mail` documents. Account preferences are private to
the matching authenticated UID. Store no credentials in customer documents.
Configure mail retention in the extension/Firestore to suit your business.
