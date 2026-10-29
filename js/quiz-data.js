/*
  Data for the "Who knows who better?" quiz. It loads only after the trip page unlocks.

  Every question has:
    q        The question, written about one person. {name} is the person whose answer is being guessed.
             {other} is the person who is playing.
    answers  The real answer from each person.
    decoys   Three believable wrong answers for each person's answer.

  When Aryan plays, he guesses Shreyasi's answers: the real answer is answers.Shreyasi and the wrong
  options are decoys.Shreyasi. When Shreyasi plays, it is the other way around.

  A question that is missing an answer or has fewer than 3 decoys for a person is skipped, and the score is
  always out of the questions that are complete.
*/
window.NYC_QUIZ = {
  "names": [
    "Aryan",
    "Shreyasi"
  ],
  "questions": [
    {
      "q": "What is {name}'s favorite food or cuisine?",
      "answers": {
        "Aryan": "Ramen",
        "Shreyasi": "Thai"
      },
      "decoys": {
        "Aryan": [
          "Sushi",
          "Mexican",
          "Pizza"
        ],
        "Shreyasi": [
          "Italian",
          "Mexican",
          "Indian"
        ]
      }
    },
    {
      "q": "What is {name}'s go-to coffee shop order (or drink of choice)?",
      "answers": {
        "Aryan": "Iced Americano",
        "Shreyasi": "Cold brew with 2 pumps brown sugar"
      },
      "decoys": {
        "Aryan": [
          "Iced latte",
          "Flat white",
          "Cappuccino"
        ],
        "Shreyasi": [
          "Iced latte with oat milk",
          "Vanilla latte",
          "Iced matcha"
        ]
      }
    },
    {
      "q": "What is {name}'s favorite movie or TV show?",
      "answers": {
        "Aryan": "Zindagi",
        "Shreyasi": "Rocky Aur Rani"
      },
      "decoys": {
        "Aryan": [
          "3 Idiots",
          "Brooklyn Nine-Nine",
          "Breaking Bad"
        ],
        "Shreyasi": [
          "Jab We Met",
          "Friends",
          "Yeh Jawaani Hai Deewani"
        ]
      }
    },
    {
      "q": "What is {name}'s favorite dessert?",
      "answers": {
        "Aryan": "Ice cream",
        "Shreyasi": "Gajar halwa"
      },
      "decoys": {
        "Aryan": [
          "Tiramisu",
          "Brownies",
          "Cheesecake"
        ],
        "Shreyasi": [
          "Gulab jamun",
          "Rasmalai",
          "Tiramisu"
        ]
      }
    },
    {
      "q": "What is {name}'s favorite way to spend a lazy Sunday?",
      "answers": {
        "Aryan": "Watch movies",
        "Shreyasi": "Walk a lot and watch a movie"
      },
      "decoys": {
        "Aryan": [
          "Play golf",
          "Sleep in",
          "Cook a big breakfast"
        ],
        "Shreyasi": [
          "Sleep in and order food",
          "Brunch and shopping",
          "Read at a cafe"
        ]
      }
    },
    {
      "q": "Is {name} a morning person or a night owl?",
      "answers": {
        "Aryan": "Night owl",
        "Shreyasi": "Night owl"
      },
      "decoys": {
        "Aryan": [
          "Morning person",
          "Both, depends on the day",
          "Morning person on weekdays only"
        ],
        "Shreyasi": [
          "Morning person",
          "Both, depends on the day",
          "Morning person on weekends only"
        ]
      }
    },
    {
      "q": "What is {name}'s biggest pet peeve?",
      "answers": {
        "Aryan": "Backseat driving",
        "Shreyasi": "Loud chewing"
      },
      "decoys": {
        "Aryan": [
          "Slow walkers",
          "Being late",
          "Messy kitchens"
        ],
        "Shreyasi": [
          "Slow walkers",
          "Being interrupted",
          "Cold food"
        ]
      }
    },
    {
      "q": "How does {name} handle stress?",
      "answers": {
        "Aryan": "Go quiet",
        "Shreyasi": "Talk it out"
      },
      "decoys": {
        "Aryan": [
          "Talk it out",
          "Exercise",
          "Distract himself"
        ],
        "Shreyasi": [
          "Go quiet",
          "Exercise",
          "Distract herself"
        ]
      }
    },
    {
      "q": "What is {name}'s comfort food on a bad day?",
      "answers": {
        "Aryan": "Noodles",
        "Shreyasi": "Buffalo chicken sandwich and fries"
      },
      "decoys": {
        "Aryan": [
          "Pizza",
          "Mac and cheese",
          "Fried rice"
        ],
        "Shreyasi": [
          "Mac and cheese",
          "Biryani",
          "Grilled cheese and tomato soup"
        ]
      }
    },
    {
      "q": "What is {name}'s most dramatic reaction to a minor inconvenience?",
      "answers": {
        "Aryan": "Bruh",
        "Shreyasi": "Crying"
      },
      "decoys": {
        "Aryan": [
          "Dramatic sigh",
          "Long rant",
          "Eye roll"
        ],
        "Shreyasi": [
          "Dramatic sigh",
          "Flopping on the floor",
          "Texting everyone about it"
        ]
      }
    },
    {
      "q": "According to {name}, where was your first date?",
      "answers": {
        "Aryan": "Ikea",
        "Shreyasi": "Sushi Hana"
      },
      "decoys": {
        "Aryan": [
          "Starbucks",
          "A mini golf course",
          "A movie theater"
        ],
        "Shreyasi": [
          "Thai Orchid",
          "Casa Verde",
          "Sakura Hibachi"
        ]
      }
    },
    {
      "q": "When did {name} first realize they were falling for {other}?",
      "answers": {
        "Aryan": "After your first bite of food",
        "Shreyasi": "Watching you golf"
      },
      "decoys": {
        "Aryan": [
          "The first time you laughed at my joke",
          "When you fell asleep on my shoulder",
          "The first time you drove us"
        ],
        "Shreyasi": [
          "When you cooked for me",
          "The first time you made me laugh",
          "Our first long phone call"
        ]
      }
    },
    {
      "q": "What small thing does {other} do that makes {name} feel loved?",
      "answers": {
        "Aryan": "Listen",
        "Shreyasi": "Random kisses"
      },
      "decoys": {
        "Aryan": [
          "Give hugs",
          "Plan surprises",
          "Send random texts"
        ],
        "Shreyasi": [
          "Bringing home snacks",
          "Remembering little details",
          "Holding hands"
        ]
      }
    },
    {
      "q": "What is {name}'s favorite memory of the two of you together?",
      "answers": {
        "Aryan": "Dinner at Tremont",
        "Shreyasi": "Mallorca"
      },
      "decoys": {
        "Aryan": [
          "The Durga Puja night",
          "Walking the rail trail",
          "New Year's Eve together"
        ],
        "Shreyasi": [
          "Barcelona",
          "San Francisco",
          "Our first Durga Puja"
        ]
      }
    },
    {
      "q": "What song makes {name} think of the two of you?",
      "answers": {
        "Aryan": "Soch Na Sake",
        "Shreyasi": "Soch Na Sake"
      },
      "decoys": {
        "Aryan": [
          "Tum Hi Ho",
          "Kesariya",
          "Raataan Lambiyan"
        ],
        "Shreyasi": [
          "Tum Hi Ho",
          "Kesariya",
          "Perfect"
        ]
      }
    },
    {
      "q": "What is one thing about {other} that {name} hopes never changes?",
      "answers": {
        "Aryan": "Your goofiness",
        "Shreyasi": "Ambition and drive"
      },
      "decoys": {
        "Aryan": [
          "Your laugh",
          "Your kindness",
          "Your stubbornness"
        ],
        "Shreyasi": [
          "Kindness",
          "Sense of humor",
          "Competitive streak"
        ]
      }
    },
    {
      "q": "What is one trip or adventure {name} wants the two of you to take together?",
      "answers": {
        "Aryan": "Buying iphones together",
        "Shreyasi": "Italy"
      },
      "decoys": {
        "Aryan": [
          "Buying a couch together",
          "Adopting a dog together",
          "Building a PC together"
        ],
        "Shreyasi": [
          "Japan",
          "Greece",
          "Bali"
        ]
      }
    },
    {
      "q": "If {name} were an animal, what would they be?",
      "answers": {
        "Aryan": "Whale shark",
        "Shreyasi": "Monkey"
      },
      "decoys": {
        "Aryan": [
          "Dolphin",
          "Sloth",
          "Tiger"
        ],
        "Shreyasi": [
          "Cat",
          "Panda",
          "Otter"
        ]
      }
    },
    {
      "q": "What would {name} do first during a zombie apocalypse?",
      "answers": {
        "Aryan": "Find food and water",
        "Shreyasi": "Cry"
      },
      "decoys": {
        "Aryan": [
          "Find a weapon",
          "Build a shelter",
          "Head for high ground"
        ],
        "Shreyasi": [
          "Hide",
          "Panic and run",
          "Call mom"
        ]
      }
    },
    {
      "q": "What is {name}'s go-to karaoke song?",
      "answers": {
        "Aryan": "Chasin you",
        "Shreyasi": "Girls Just Wanna Have Fun"
      },
      "decoys": {
        "Aryan": [
          "Last Night",
          "Wagon Wheel",
          "Cruise"
        ],
        "Shreyasi": [
          "Dancing Queen",
          "Wannabe",
          "I Wanna Dance with Somebody"
        ]
      }
    },
    {
      "q": "What snack would {name} never share?",
      "answers": {
        "Aryan": "Chips",
        "Shreyasi": "Jalapeño chips"
      },
      "decoys": {
        "Aryan": [
          "Gummy bears",
          "Chocolate",
          "Popcorn"
        ],
        "Shreyasi": [
          "Takis",
          "Cheddar popcorn",
          "Dark chocolate"
        ]
      }
    },
    {
      "q": "What is the weirdest food combination {name} enjoys?",
      "answers": {
        "Aryan": "Cottage cheese and jam",
        "Shreyasi": "Chips and biryani"
      },
      "decoys": {
        "Aryan": [
          "Peanut butter and pickles",
          "Ice cream and fries",
          "Hummus and chocolate"
        ],
        "Shreyasi": [
          "Mango with chili powder",
          "Pickles and ice cream",
          "Fries dipped in a milkshake"
        ]
      }
    },
    {
      "q": "If {name} were a cartoon character, who would they be?",
      "answers": {
        "Aryan": "Ferb",
        "Shreyasi": "Mort from Madagascar"
      },
      "decoys": {
        "Aryan": [
          "Patrick Star",
          "Shaggy",
          "Dexter"
        ],
        "Shreyasi": [
          "Dory",
          "Olaf",
          "Minnie Mouse"
        ]
      }
    },
    {
      "q": "If {name} won the lottery tomorrow, what is the first thing {name} would buy or do?",
      "answers": {
        "Aryan": "Invest",
        "Shreyasi": "Go on a trip"
      },
      "decoys": {
        "Aryan": [
          "Buy a house",
          "Buy a new car",
          "Donate to charity"
        ],
        "Shreyasi": [
          "Buy a house",
          "Go shopping",
          "Pay off loans"
        ]
      }
    },
    {
      "q": "What would {name}'s perfect date night look like?",
      "answers": {
        "Aryan": "Drinks, ambience and tapas/small plates",
        "Shreyasi": "Boat day"
      },
      "decoys": {
        "Aryan": [
          "Dinner and a movie",
          "Rooftop sunset and cocktails",
          "Cooking together at home"
        ],
        "Shreyasi": [
          "Picnic in the park",
          "Fancy dinner",
          "Dancing and cocktails"
        ]
      }
    }
  ]
};
