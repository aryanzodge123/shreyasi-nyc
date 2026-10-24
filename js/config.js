/*
  Things you can change without touching any other file.

  unlockAt     When the countdown ends and the site opens. Two hours before the 5:00 PM flight
               on Thursday, October 29, 2026, Eastern time (UTC-4).
  previewCode  Open the site with ?preview=THIS_CODE at the end of the link to skip the countdown
               while you test. Example: https://yourname.github.io/your-repo/?preview=jolly-roger-1030
               This is not security. Anyone who reads the files on GitHub can see it.
  puzzle       The one photo that gets split into the 4x4 sliding puzzle.
  feedbackForm The answers form for Shreyasi (25 questions, .txt file, email to Aryan).
  gifts        The words for the always open Birthday games part.
  mostLikely   The two player names and the 25 "Who's most likely to" prompts.
  memoryPairs  Exactly 8 photos, each with the sentence that describes where it was taken.
               The memory game turns these into 16 tiles: 8 photos and 8 sentences.
*/
window.NYC_CONFIG = {
  recipient: "Shreyasi",
  unlockAt: "2026-10-29T15:00:00-04:00",
  previewCode: "jolly-roger-1030",


  /*
    Who's most likely to: 25 prompts, played on two phones at the same table. Each question finishes
    the sentence "Who's most likely to ...?". Change the names or the questions freely. Keep the order
    the same on both phones, because the game moves question by question together.
  */
  mostLikely: {
    names: ["Aryan", "Shreyasi"],
    questions: [
      "get lost on the subway",
      "be late leaving the hotel",
      "cry at a movie",
      "order dessert without asking",
      "become best friends with a stranger in under five minutes",
      "fall asleep first tonight",
      "try the weirdest thing on the menu",
      "take 100 photos of the same thing",
      "hog the blanket",
      "get hangry first",
      "spend the whole budget on shopping",
      "start a dance party in public",
      "hit snooze five times",
      "get tired of rowing the boat first",
      "have a costume malfunction",
      "sing karaoke with zero shame",
      "say \"I don't care where we eat\" and then care a lot",
      "lose their phone",
      "pack way too much",
      "stop to pet every dog on the street",
      "plan a surprise party",
      "be the last one to leave a party",
      "text back the slowest",
      "win a hot dog eating contest",
      "cry happy tears on the last day of the trip"
    ]
  },

  /*
    gifts  Text for the Birthday games part of the page. That part is always open (it is not behind
           the countdown). Finishing a game unlocks its gift card. Edit the words freely, but keep them
           free of trip details, because this part opens before the countdown ends.
  */
  gifts: {
    intro: "Two games, two gifts. Finish each game and come find me when it says you are done.",
    puzzle: {
      label: "Slide puzzle",
      locked: "Put the puzzle back together to unlock this gift.",
      unlocked: "Puzzle solved! Come find me. Your first gift is waiting."
    },
    memory: {
      label: "Memory match",
      locked: "Match every photo with its sentence to unlock this gift.",
      unlocked: "All matched! Come find me. Your second gift is waiting."
    },
    both: "Both games done! Come find me, your gifts are waiting."
  },

  /*
    feedbackForm  A short form for Shreyasi to answer 25 questions, one short answer each. She copies the
                  questions if she wants, then makes a .txt file and emails it to the address below.
                  The page cannot send email by itself, so the Email button opens her mail app with the
                  answers filled in. To remove the form, set enabled to false.
  */
  feedbackForm: {
    enabled: true,
    email: "aryanzodge1@gmail.com",
    title: "A few questions from Aryan",
    intro: "Answer each question with one short answer. Your answers save on this phone as you type. When all of them are filled in, make the file and send it to Aryan.",
    questions: [
      "What is your favorite food or cuisine?",
      "What is your go-to coffee shop order (or drink of choice)?",
      "What is your favorite movie or TV show?",
      "What is your favorite dessert?",
      "What is your favorite way to spend a lazy Sunday?",
      "Are you a morning person or a night owl?",
      "What is your biggest pet peeve?",
      "How do you handle stress (talk it out, go quiet, exercise, distract yourself)?",
      "What is your comfort food on a bad day?",
      "What is your most dramatic reaction to a minor inconvenience?",
      "Where was our first date?",
      "When did you first realize you were falling for me?",
      "What small thing do I do that makes you feel loved?",
      "What is your favorite memory of us together?",
      "What song makes you think of us?",
      "What is one thing about me you hope never changes?",
      "What is one trip or adventure you want us to take together?",
      "If you were an animal, what would you be?",
      "What would you do first during a zombie apocalypse?",
      "What is your go-to karaoke song?",
      "What snack would you never share?",
      "What is the weirdest food combination you enjoy?",
      "If you were a cartoon character, who would you be?",
      "If you won the lottery tomorrow, what is the first thing you would buy or do?",
      "What would your perfect date night look like?"
    ]
  },

  puzzle: {
    image: "assets/puzzle/us.svg",
    alt: "A photo of the two of us"
  },

  memoryPairs: [
    { image: "assets/memory/photo-1.svg", alt: "Filler photo 1", tag: "Filler tag 1: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-2.svg", alt: "Filler photo 2", tag: "Filler tag 2: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-3.svg", alt: "Filler photo 3", tag: "Filler tag 3: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-4.svg", alt: "Filler photo 4", tag: "Filler tag 4: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-5.svg", alt: "Filler photo 5", tag: "Filler tag 5: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-6.svg", alt: "Filler photo 6", tag: "Filler tag 6: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-7.svg", alt: "Filler photo 7", tag: "Filler tag 7: replace this with the sentence about where this photo was taken." },
    { image: "assets/memory/photo-8.svg", alt: "Filler photo 8", tag: "Filler tag 8: replace this with the sentence about where this photo was taken." }
  ]
};
