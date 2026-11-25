# gray zone

A place for thoughts that aren't finished yet. One file, `index.html`, no build step.

It has three scales:

- **galaxy**: your own thoughts. They gather into constellations by the words they share. You can refine them, keep notes beside them, and connect any two stars (and disconnect them again from the star's panel). Signed in with Google, your galaxy is saved to your account and follows you to any device. Signed out, it stays in that browser.
- **nebulae**: small rooms. You can glance at one, join it, reply, resonate, or found your own. You can also connect any two stars in a room; those connections are only yours and stay in that browser. The **pulls** toggle (or the `p` key) shows which end of a room's spectrum each thought leans toward. Eight sample rooms with seeded voices are included so the sky isn't empty.
- **open sky**: send a thought outward. Results come back as stars grouped by theme or by source, and each one opens in a new tab. A thought that weighs two options ("x or y", "x vs y") searches each side separately, so neither one gets dropped.

## Put it on a link with GitHub Pages (free)

1. Create a GitHub account if you don't have one, then make a new **public** repository, for example `gray-zone`.
2. Upload `index.html` (and this README if you like) to the repository.
3. In the repository, open **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/gray-zone/`. Send that link to friends.

To update the site later, upload a new `index.html` over the old one.

## What works with no setup

- The galaxy, the sample nebulae, and nebulae you found for yourself (those stay in your browser).
- Open sky results from five free sources that need no key: Wikipedia, Hacker News, Crossref (papers), Open Library (books) and the Internet Archive.
- "Doorways": stars that open a Google, Reddit, YouTube, Google Scholar or Bluesky search for your thought in a new tab.

Each friend who opens the link gets their own private galaxy. Nothing is shared between people until you do the next part.

## Share nebulae with friends: Google sign-in (free, about 10 minutes)

GitHub Pages only serves the file. To let people sign in with Google and see the same rooms, the page needs somewhere shared to keep them. This uses Firebase's free Spark plan, which doesn't ask for a payment method.

The names of the buttons in the Firebase console change now and then, so treat these as a guide.

1. Go to <https://console.firebase.google.com> and **create a project**. You can turn Analytics off.
2. In the project, **add a web app** (the `</>` icon). Give it any name. Firebase shows a `firebaseConfig` block. Keep that tab open.
3. Open **Authentication → Sign-in method**, choose **Google**, and enable it.
4. Open **Authentication → Settings → Authorized domains** and add `YOUR-USERNAME.github.io`.
5. Open **Firestore Database** and **create a database**. Start in production mode. Any location is fine.
6. Open the **Rules** tab of Firestore, replace what's there with the rules below, and publish.
7. Open `index.html` in a text editor. Near the top you'll find:

   ```js
   window.GRAY_ZONE_FIREBASE = null;
   ```

   Replace `null` with the config from step 2, for example:

   ```js
   window.GRAY_ZONE_FIREBASE = {
     apiKey: "…",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     appId: "…"
   };
   ```

8. Upload the edited `index.html` to GitHub.

Now the **you** button shows "sign in with google". Once signed in:

- **Your galaxy is kept in your Google account.** Your thoughts, constellations, notes, lines, display name and saved searches are stored in Firestore under your account. Sign in with the same account on a phone or another computer and the same galaxy appears, and changes made on one device show up on the others. Each person who signs in gets their own private galaxy that only they can read.
- **Signed-out work stays separate.** What you write while signed out is kept in that browser only and is not added to your account. Signing out brings that browser's own galaxy back.
- A nebula you found is shared with everyone signed in to your copy, and its panel has a **copy invite link** button.

The config values are not secrets. They identify your project, and the rules below are what protect the data.

### Firestore rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // each person's own galaxy: only they can read or change it
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /nebulae/{room} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.owner == request.auth.uid;
      allow update: if request.auth != null
        && (resource.data.owner == request.auth.uid
          || request.resource.data.diff(resource.data).affectedKeys().hasOnly(['members']));
      allow delete: if request.auth != null
        && resource.data.owner == request.auth.uid;

      match /thoughts/{thought} {
        allow read: if request.auth != null;
        allow create: if request.auth != null
          && request.resource.data.uid == request.auth.uid;
        allow update: if request.auth != null
          && (resource.data.uid == request.auth.uid
            || request.resource.data.diff(resource.data).affectedKeys().hasOnly(['res']));
        allow delete: if request.auth != null
          && resource.data.uid == request.auth.uid;
      }
    }
  }
}
```

With these rules, anyone who signs in to your copy with a Google account can read every nebula and join any of them. Only a thought's author can change or delete it, and only a nebula's founder can rename it. That is prototype-level privacy. To keep it to a known group, replace `request.auth != null` with a list of addresses, for example `request.auth.token.email in ['a@gmail.com', 'b@gmail.com']`.

## Things to know

- **What is stored where.** Signed in, your galaxy, display name and saved searches are in your Firebase project under `users/<your account id>`, readable only by you. A copy is cached in the browser for speed and removed when you sign out. Signed out, they are in that browser only. Shared nebulae are in your Firebase project. Your choices in the sample rooms (replies, joins, votes) and nebulae you found while signed out stay in the browser. "Clear my traces" while signed in also erases your account's copy. A Firestore document holds up to 1 MB, which is room for several thousand thoughts. If a galaxy grows past that, saved searches are kept without their results. Thoughts you post in a shared nebula carry your Google profile photo, so others can tell who wrote what. "Hide my profile" posts as "someone" with no photo, but your Google account id is still stored with each post so that only you can edit it.
- **The open sky sends your search words to the sources that are switched on.** You can switch sources off under **searches**.
- **Theme grouping is simple.** Results are gathered around the words they share. It runs in the browser and makes no extra requests.
- **Free limits.** The Spark plan has daily read and write quotas. A group of friends will not come close, but when a quota runs out Firebase pauses until the next day rather than charging.
- **Testing.** The live sources and the real Firebase service could not be reached from where this was built. The search code was tested against stand-in responses in the documented shapes, and sign-in and rooms against a stand-in for Firebase. If a source doesn't answer, the page says so and the doorways still work.
- **If someone is struggling.** A thought with crisis language is not placed. The page points to <https://findahelpline.com> and to 988 in Canada and the US instead.
