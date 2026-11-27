# gray zone

A space for unfinished thoughts. Two files, `index.html` and `samples.js` (the sample rooms), no build step. The logomark lives in `graphics/logomark01/`; the browser tab icon is loaded from there, and the header and welcome card draw it inline.

It has three scales:

- **galaxy**: your own thoughts. They gather into constellations by the words they share, and each thought's panel says which words gathered it. You can refine a thought (it asks you a question back, such as "what would change your mind?", and keeps your answer in its notes), keep notes beside it, and connect any two stars (and disconnect them again from the star's panel). "Explore related nebulae" suggests rooms that share a thought's words. Signed in with Google, your galaxy is saved to your account and follows you to any device. Signed out, it stays in that browser.
- **nebulae**: small rooms. You can glance at one, join it, reply, resonate, or found your own. Replies show as smaller stars beside what they answer, and are indented under it in the room's list. You can connect any two stars in a room; those connections are only yours. Five sample rooms are included so the sky isn't empty. Their threads are written by five recurring sample voices (mara, theo, juno, kofi and ines), marked with a dotted ring so they never pass for real people. **sample nebulae** in the nebulae list hides or shows them at once; your replies, joins and votes in them are kept either way. The sample content lives in `samples.js`, plain data you can edit without touching the app.
- **open sky**: send a thought outward. Before you search, it offers places to start: your recent searches, your latest thoughts and the rooms' questions. Results come back as stars grouped by theme or by source, and each one opens in a new tab. Anything from the web is drawn with a small four-point glint, so it stays recognisable after you keep it in your galaxy or bring it into a nebula ("bring to a nebula" lets you say where it sits on the room's spectrum, so it takes part in the pulls). The same page can't be kept or brought to the same place twice. A thought that weighs two options ("x or y", "x vs y") searches each side separately, so neither one gets dropped.

### Getting around

- **+ thought** (or `n`) writes a new thought in the side panel and lets you choose where it goes: your galaxy, a nebula you've joined, or the open sky. **+ add a thought** on a star, constellation or room puts it right there.
- **What's new.** A star that slowly breathes is new since you last looked: someone else's words in a nebula, something you kept from the open sky (it lands in your galaxy out of sight), something added to your galaxy on another device, or a new room's question among the open sky's places to start. It stops once you open it. A small red dot on **galaxy**, **nebulae** or **open sky** means something new arrived there; it clears when you go there. Search results never count as new. These marks stay in that browser.
- Arrow keys move between stars and Enter opens one. In a star's panel, ‹ › step through its group; on a phone, swipe sideways on the panel.
- **pulls** (`p`) slides each thought toward the end of its spectrum it leans to. **spread** (`s`) gives the stars more room. You can drag any star with a mouse to tidy your view; the spot is kept only in that browser, and **reset layout** puts things back.
- The welcome card appears when you open the page. The × or Esc closes it, and "new here? see how it works" opens a short tour (six steps; ‹ › or the arrow keys).
- Hovering over (or tabbing to) the **gray zone** logo shows a short about card; clicking the logo refreshes the page (it asks first if you have unsaved words).
- **help** (or `?`) has four sections: start here, controls (with what each kind of star means), keys (hidden on touch screens) and your traces.
- **Clearing your traces** lives under **you**. Tick what to clear: your galaxy (all of it, or only the constellations you pick), searches, your part in the rooms, layout and new marks, or everything (here and in your account, after which the page starts over). It asks twice, and your thoughts in shared nebulae stay; remove those from each star.

## Put it on a link with GitHub Pages (free)

1. Create a GitHub account if you don't have one, then make a new **public** repository, for example `gray-zone`.
2. Upload `index.html`, `samples.js` and the `graphics` folder (and this README if you like) to the repository.
3. In the repository, open **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. After a minute or two the site is live at `https://YOUR-USERNAME.github.io/gray-zone/`. Send that link to friends.

To update the site later, upload a new `index.html` (and `samples.js`, if it changed) over the old one.

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

- **What is stored where.** Signed in, your galaxy, display name, saved searches and your part in the sample rooms (replies, joins, votes, connections, and whether the samples are shown) are in your Firebase project under `users/<your account id>`, readable only by you. A copy is cached in the browser for speed and removed when you sign out. Signed out, they are in that browser only. Shared nebulae are in your Firebase project. Signed out, your part in the sample rooms and any nebulae you found stay in the browser, and they are set aside (not merged) while you're signed in. Clearing your traces while signed in clears the same things from your account's copy. A Firestore document holds up to 1 MB, which is room for several thousand thoughts. If a galaxy grows past that, saved searches are kept without their results. Thoughts you post in a shared nebula carry your Google profile photo, so others can tell who wrote what (people without a photo get the first letter of their name). Your recent searches and the pulls/spread toggles follow your account; stars you've dragged stay in that browser. "Hide my profile" posts as "someone" with no photo, but your Google account id is still stored with each post so that only you can edit it.
- **The open sky sends your search words to the sources that are switched on.** You can switch sources off under **searches**.
- **Theme grouping is simple.** Results are gathered around the words they share. It runs in the browser and makes no extra requests.
- **Free limits.** The Spark plan has daily read and write quotas. A group of friends will not come close, but when a quota runs out Firebase pauses until the next day rather than charging.
- **Testing.** There is no automated test suite. Changes are checked by hand in a browser against the live sources and the real Firebase project, including two signed-in accounts for shared rooms. If a source doesn't answer, the page says so and the doorways still work.
- **If someone is struggling.** A thought with crisis language is not placed. The page points to <https://findahelpline.com> and to 988 in Canada and the US instead.
