# Shreyasi's birthday weekend site

A static site (HTML, CSS, plain JavaScript). No build step. Works on GitHub Pages.

## What it does

The front page has two parts, switched by the bar at the top.

- **Birthday games** is always open. It has the slide puzzle and the memory match. Finishing a game unlocks its gift card ("Come find me, your gift is waiting"). It holds no trip details, so she can play it before the countdown ends. Progress is saved on her phone. Open the link once with `?resetgifts=1` to clear it.
- **Our trip** shows the countdown until the unlock, then the full trip page. The dinner games (Who's most likely to and the quiz) live here, on the trip page.


- Shows a boarding-pass countdown until Thursday, Oct 29, 2026, 3:00 PM ET (2 hours before the 5:00 PM flight). The full site opens by itself at that time.
- Before the unlock, the page does not load any trip details. The itinerary, menus and addresses are in separate files that load only after unlock.
- Itinerary for Thursday to Sunday with time, address (copy button and Maps link), notes, travel tips, menus for six venues, and weather.
- Weather: daily summary, plus the forecast for the hour of each stop (Open-Meteo, free, no key).
- Games: a 4x4 sliding puzzle (15 tiles, swipe or tap) and a memory match (match a photo to the sentence about where it was taken) in Birthday games, and two dinner games on the trip page (a two phone Who's most likely to, and the Who knows who better? quiz).
- Packing list (checks saved on the device), costumes, flights and hotel info.

## Preview before the unlock

Open `index.html?preview=jolly-roger-1030` (it opens on the trip part) (on GitHub Pages: `https://USERNAME.github.io/REPO/?preview=jolly-roger-1030`). Change the code in `js/config.js` (`previewCode`).

## Add your photos and sentences

1. Puzzle photo: put a square photo at `assets/puzzle/us.jpg`, then in `js/config.js` set `puzzle.image` to `"assets/puzzle/us.jpg"`. A square crop (for example 1200 x 1200) gives the cleanest tiles.
2. Memory photos: put 8 photos in `assets/memory/` (for example `photo-1.jpg` to `photo-8.jpg`, square or 3:4 crops work best).
3. In `js/config.js`, edit each entry of `memoryPairs`: set `image`, `alt` and `tag` (the sentence about where the photo was taken). Keep exactly 8 entries (16 tiles).

## Who's most likely to

This is a two phone dinner game on the trip page. The names and the 25 prompts are in `js/config.js` under `mostLikely`. Each prompt finishes the sentence "Who's most likely to ...?". Keep the same order on both phones, because the game moves question by question together. The phones do not talk to each other, so after each reveal each person taps "Same pick" or "Different picks" to keep score. Progress is saved on each phone.

## Who knows who better? (quiz) and the answers form

- **Quiz:** on the trip page, next to Most likely to. A switch picks who is playing. Aryan guesses Shreyasi's answers and the other way around. Four choices per question (the real answer and three decoys), and a percentage with a cute saying at the end. The data is in `js/quiz-data.js`. It holds filler answers marked "(replace me)" until the real answers and decoys go in. A question missing an answer or with fewer than 3 decoys is skipped, and the score is out of the complete questions.
- **Answers form:** in the Birthday games part (it is open before the trip page unlocks). Shreyasi can copy all 25 questions, gives one short answer to each (saved on her phone as she types), and then makes a .txt file. A web page cannot send email by itself, so the Email button opens her mail app with Aryan's address and her answers in the body, and the .txt file downloads so she can attach it. On phones that support it, a Share button can attach the file directly. The questions and the email address are in `js/config.js` under `feedbackForm`.
- **Remove the form:** set `feedbackForm.enabled` to `false` in `js/config.js`.

## Fill in the pending stops

In `js/data.js`, stops with `pending: true` show "to be added". Replace the title, time, address and notes, and remove `pending: true`. Pending now: Thursday friends, Friday coffee, Friday late night, Saturday friends, Saturday night out. Also add the San Marzano reservation time if there is one. The Saturday timeline (coffee 10:30 AM, boat 3:15 PM, shopping 4:45 PM, hotel change 6:45 PM, leave for friends 7:45 PM) is a proposal built from approximate subway times, so edit the `timeLabel` and `time` fields in `js/data.js` to change it.

## Deploy on GitHub Pages

1. Create a repository and upload everything in this folder (keep the `.nojekyll` file).
2. Settings, Pages, Source: Deploy from a branch, branch `main`, folder `/ (root)`.
3. Share the `https://USERNAME.github.io/REPO/` link only with her.

## Caveats

- The unlock uses the device clock. Someone who changes their clock, or reads the public files in the repository, can see the trip details early. Use a private repository if your GitHub plan allows Pages from private repos, or accept this as a surprise-level lock, not security.
- The page has `noindex`, but a link is still a link. Anyone with it can open it.
- Menus and hours were checked on Oct 20, 2026 and can change. Each menu links to the official page.
- Travel times are approximate.
