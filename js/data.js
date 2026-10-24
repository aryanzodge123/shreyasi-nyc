/*
  All trip content lives here: stops, menus, packing list, flights.
  A stop with "pending" shows a soft "to be added" note until you fill in the details.
  Menus are highlights only. Every menu links to the official full menu.
  Last checked against official sources on October 20, 2026. Prices change.
*/
window.NYC_DATA = (function () {
  var HOTEL = { name: "Hotel Le Bleu", text: "370 4th Ave, Brooklyn, NY 11215" };

  /* ---------- Menus (highlights) ---------- */

  var MENU_LELABAR = {
    title: "Lelabar",
    updated: "Official food page, checked Oct 20, 2026",
    note: "Prices can change. Over 700 wines, and most come by the glass if you order two glasses (Champagne excluded). Happy hour runs daily from 4 to 6 PM, and we are right in it.",
    full: { label: "Open the full menu", url: "https://www.lelabar.com/menu/food" },
    extra: [{ label: "Wines by the bottle", url: "https://www.lelabar.com/menu/wine" }, { label: "Happy hour", url: "https://www.lelabar.com/menu/wine-1" }],
    sections: [
      { title: "Cheese and charcuterie", note: "2 for $16, 3 for $21, 4 for $24", items: [
        ["Cheese", "La Tur, Pyrenees Brebis, Fromager d'Affinois, Fourme d'Ambert, Epoisses and more"],
        ["Meat", "Hungarian pick salami, Istrian pork loin, hot coppa, hunter sausage and more"]
      ]},
      { title: "Pressed sandwiches", note: "$16, served with a green salad", items: [
        ["Prosciutto", ""], ["Cheese trio", ""]
      ]},
      { title: "Small bites", items: [
        ["Market oysters", "When available", "$4 each"],
        ["Marinated olives", "", "$9"],
        ["Pan de queso", "", "$16"],
        ["Burrata", "", "$20"],
        ["Baked feta", "", "$22"],
        ["Grilled octopus", "", "$23"],
        ["Meatball pita", "", "$26"]
      ]},
      { title: "Conservas", note: "Tinned seafood with sliced bread", items: [
        ["Ortiz anchovies", "See the official menu for current prices"],
        ["Tuna belly", ""]
      ]}
    ]
  };

  var MENU_MEDUZA = {
    title: "Mēdüzā Mediterrania",
    updated: "Dish names from published reviews, checked Oct 20, 2026. Prices were not available, so see the official menu.",
    note: "Dinner is served nightly. The menu changes, so tap the official link for the latest.",
    full: { label: "Open the official menus", url: "https://www.meduza33.com/menus" },
    extra: [{ label: "Reservations", url: "https://www.meduza33.com/reservations" }],
    sections: [
      { title: "Raw bar", items: [
        ["Blue fin and caviar", "Truffle ponzu, white sesame"],
        ["Half shell oysters", "Diced olive, shallots, chili infused olive oil"],
        ["Torre de mare", "A tower of oysters, clams, lobster, shrimp and more"]
      ]},
      { title: "Mezze", items: [
        ["Roasted garlic hummus", ""], ["Whipped smoked aubergine", ""], ["Tabbouleh", ""], ["Dolmas", ""]
      ]},
      { title: "Robata grill", items: [
        ["Wagyu kafta", "Beef, tomato, roasted garlic, basil, shaved parmesan"],
        ["Tsukune", "Jidori chicken meatball, ginger scallion, panko, tare"],
        ["Butterfish", "Honey miso reduction"]
      ]},
      { title: "Also on the menu", items: [
        ["Pastas, seafood and steaks", ""], ["Craft cocktails", ""], ["Desserts", ""]
      ]}
    ]
  };

  var MENU_DELLAROCCO = {
    title: "Dellarocco's",
    updated: "Menu names from its online ordering page, checked Oct 20, 2026",
    note: "Neapolitan style pies from a wood burning oven. There is a gluten-free crust and there are vegan pizzas. Ask about current prices when we order.",
    full: { label: "Open the online menu", url: "https://slicelife.com/restaurants/ny/brooklyn-heights/11201/dellarocco-s-of-brooklyn/menu" },
    extra: [],
    sections: [
      { title: "Red pizzas", items: [
        ["Margherita", ""], ["Margherita STG", ""], ["Arrabbiata", ""], ["Salsiccia", ""],
        ["Meatball", ""], ["Capricciosa", ""], ["Napoli", ""], ["Quattro gusti", "Four sections, four pizzas in one"]
      ]},
      { title: "White pizzas", items: [
        ["Dellarocco", "Smoked buffalo mozzarella, broccoli rabe, sweet sausage"],
        ["Burrata Parma", ""], ["Porcini", ""], ["Tartufata", ""], ["Taleggio", ""], ["Four cheese", ""], ["Pesto", ""]
      ]},
      { title: "Vegan", items: [
        ["Braccio di Ferro", ""], ["Lei", ""]
      ]},
      { title: "Salad", items: [["Rughetta salad", "", "$14"]] }
    ]
  };

  var MENU_ISLA = {
    title: "Isla & Co. Midtown",
    updated: "Official Midtown page, checked Oct 20, 2026",
    note: "They serve brunch, dinner, cocktails and coffee. We will check which menu is running at 1:00 PM when we get there.",
    full: { label: "Open the official menus", url: "https://www.isla-co.com/midtown#menu" },
    extra: [{ label: "Reserve on Resy", url: "https://resy.com/cities/ny/isla-and-co-midtown" }],
    sections: [
      { title: "Brunch favorites", items: [
        ["Smashed avocado toast", "Sourdough, everything yogurt, snap peas, watermelon radish", "$18"],
        ["Salmon benedict", "Poached eggs, scallion cream cheese, green goddess hollandaise", "$25"],
        ["Big brekkie", "Focaccia, avocado, bacon, fried halloumi, hash browns, eggs", "$27"],
        ["Chorizo burrito", "Brown butter scramble, double cheddar, guajillo sauce", "$24"],
        ["Isla burger", "Short rib patty, double cheddar, nuoc cham mayo, fries", "$24"],
        ["Spicy vodka rigatoni", "Prawns, pomodoro, calabrian chili", "$25"],
        ["Yuzu hotcake", "Whipped ricotta, lemon curd, blueberries", "$24"]
      ]},
      { title: "For the table", items: [
        ["Whipped feta", "Grilled focaccia, truffle, confit garlic", "$14"],
        ["Brussels sprouts", "Gochujang sweet chili, pickled onions", "$14"],
        ["Kangaroo skewers", "Pearl onions, celeriac purée, zhoug", "$22"],
        ["House sausage rolls", "Beef, scamorza, puff pastry", "$15"]
      ]},
      { title: "Cocktails", items: [
        ["Espresso martini", "Vodka, Mr. Black coffee liqueur, fresh espresso", "$16"],
        ["Isla mimosa", "", "$13"],
        ["Bloody Mary", "", "$14"],
        ["Margot Robbie", "Tequila, peach, green chile, lime, soda", "$16"],
        ["Smoke Show", "Mezcal, passionfruit, lime, habanero", "$16"]
      ]},
      { title: "Coffee", items: [
        ["Flat white", "", "$5.50"], ["Latte", "", "$6"], ["Cappuccino", "", "$5.50"], ["Cold brew", "", "$6"]
      ]}
    ]
  };

  var MENU_HARRIETS = {
    title: "Harriet's Rooftop",
    updated: "Official rooftop menu, checked Oct 20, 2026",
    note: "A 20% gratuity is suggested and added to checks. Rooftop service depends on the weather, so we keep our fingers crossed.",
    full: { label: "Open the official menu", url: "https://www.1hotels.com/brooklyn-bridge/taste/harriets-rooftop#menu" },
    extra: [{ label: "Book a table", url: "https://www.sevenrooms.com/reservations/harrietsbrooklynbridge" }],
    sections: [
      { title: "Cocktails", items: [
        ["Harriet's margarita", "Shishito pepper infused tequila, lime, agave, celery salt", "$26"],
        ["Purple haze", "Prosecco, pear vodka, St. Germain, lychee, hibiscus", "$28"],
        ["Espresso martini", "Organic vodka, coffee liqueur, spent espresso and orange peel syrup", "$29"],
        ["Smoke in the air", "Mezcal, coffee, Suze", "$27"],
        ["Celadon", "Vodka, sake, dry vermouth, kiwi, lemon", "$25"],
        ["Crimson sun", "Raspberry infused tequila, orgeat, lime, pineapple", "$26"],
        ["Brooklyn Brewery beers", "Lager, pilsner, hazy IPA, pale ale", "$14"]
      ]},
      { title: "Bubbles", items: [
        ["Ca' Furlan prosecco", "By the glass", "$24"],
        ["Lallier brut", "Champagne, by the glass", "$50"],
        ["Perrier Jouët rosé", "Champagne, by the glass", "$60"]
      ]},
      { title: "Bites", items: [
        ["Umami edamame", "", "$16"],
        ["Shishito peppers", "Togarashi", "$17"],
        ["Okonomiyaki fries", "", "$21"],
        ["Chicken gyoza", "", "$23"],
        ["Mushroom bao", "Fried oyster mushroom, hoisin", "$22"],
        ["Crispy rice and spicy tuna", "", "$29"],
        ["Rock shrimp", "Spicy aioli, lime, flying fish roe", "$32"],
        ["East Coast oysters", "Half dozen", "$27"]
      ]},
      { title: "Dessert", items: [
        ["Mango sticky rice", "Butterfly pea rice, coconut cream", "$24"],
        ["Matcha purin", "Passion fruit caramel, black sesame", "$19"],
        ["Mochi", "Seasonal flavors", "$12"]
      ]}
    ]
  };

  var MENU_SANMARZANO = {
    title: "San Marzano",
    updated: "Official site, checked Oct 20, 2026",
    note: "Dinner reservations for four or more require the prix fixe: $58 per person on Friday and Saturday, plus tax and a 20% gratuity. That covers 90 minutes of unlimited house wine, draft beer or sangria, family style appetizers, and one main course each. The dinner menu below shows the dishes. Individual prices only apply without the prix fixe.",
    full: { label: "Open the dinner menu (PDF)", url: "https://www.sanmarzanonyc.com/SanMarzano-DinnerMenu.pdf?v=260521" },
    extra: [{ label: "Cocktails and wine (PDF)", url: "https://www.sanmarzanonyc.com/SanMarzano-CocktailWineMenu.pdf?v=260710" }],
    sections: [
      { title: "Starters", items: [
        ["Burrata", ""], ["Arancini", ""], ["Brussels sprouts", ""], ["Meatballs", ""], ["Antipasto", ""], ["Garlic bread", "With or without mozzarella"]
      ]},
      { title: "Fresh pasta: pick a shape", items: [
        ["Rigatoni", ""], ["Pappardelle", ""], ["Campanelle", ""], ["Spaghetti", ""], ["Whole wheat rigatoni", ""], ["Gluten free mini rigatoni", ""]
      ]},
      { title: "Fresh pasta: pick a sauce", items: [
        ["Maialino", ""], ["Vecchia Bettola", ""], ["Wild boar ragù", ""], ["Butternut squash and sausage", ""],
        ["Puttanesca", ""], ["Alla norma", ""], ["Bolognese", ""], ["Meatballs", ""], ["Kale pesto", ""], ["Shrimp scampi", ""]
      ]},
      { title: "Also", items: [
        ["Pear and gorgonzola ravioli", ""], ["Chicken parmigiana", ""], ["Eggplant parm", ""]
      ]},
      { title: "Dessert", items: [
        ["Tiramisu", ""], ["Cannoli", ""], ["Gelato", ""], ["Flourless chocolate cake", ""]
      ]}
    ]
  };

  /* ---------- Days ---------- */

  var days = [
    {
      id: "thu", short: "Thu", name: "Thursday", date: "2026-10-29", label: "Oct 29",
      tag: "Wheels up",
      intro: "We fly out, drop the bags, and then we go absolutely wild. Birthday weekend starts NOW.",
      wx: ["clt", "nyc"],
      stops: [
        {
          id: "fly-out", timeLabel: "5:00 PM", time: "17:00", emoji: "✈️", kind: "travel",
          title: "Wheels up! Charlotte to New York",
          blurb: "Delta from Charlotte (CLT) to LaGuardia (LGA). We take off at 5:00 PM and land at 6:59 PM. Birthday weekend, here we come.",
          address: { name: "Charlotte Douglas International Airport (CLT)", text: "5501 Josh Birmingham Pkwy, Charlotte, NC 28208" },
          notes: [
            "Get to the airport about two hours before takeoff. That is exactly when this page unlocks, so hi, you are right on time.",
            "Boarding passes go in your phone wallet, and keep a photo ID within reach.",
            "Costume props can cause drama at security. Double check the TSA rules for anything sword shaped or sharp."
          ],
          wx: [{ city: "clt", time: "17:00", label: "Charlotte at takeoff" }, { city: "nyc", time: "19:00", label: "New York at landing" }],
          links: [{ label: "Delta", url: "https://www.delta.com/" }]
        },
        {
          id: "hotel-in", timeLabel: "After landing", emoji: "🏨", kind: "stay",
          title: "Home sweet hotel: Hotel Le Bleu",
          blurb: "Our home base on the edge of Park Slope in Brooklyn, near Prospect Park. Drop the bags, fix the hair, and let's go out.",
          address: HOTEL,
          notes: [
            "A rideshare from LaGuardia is the easiest way in. Plan on roughly 30 to 50 minutes depending on traffic.",
            "If traffic looks scary, the free Q70 LaGuardia Link bus connects to the subway.",
            "The 4 Av-9 St subway station (R train, plus the F and G) is about a five block walk from the hotel."
          ]
        },
        {
          id: "thu-friends", timeLabel: "Thursday night", emoji: "🎉", kind: "social",
          title: "LET'S GO CRAZY",
          blurb: "Drinks, food, and friends on our first night in the city. Birthday eve energy only.",
          pending: "Time and place coming soon"
        }
      ]
    },
    {
      id: "fri", short: "Fri", name: "Friday", date: "2026-10-30", label: "Oct 30",
      tag: "Your birthday",
      intro: "IT'S YOUR BIRTHDAY! Coffee, pizza, wine, dinner, a rooftop, and then mermaid and pirate night.",
      wx: ["nyc"],
      stops: [
        {
          id: "fri-coffee", timeLabel: "Morning", emoji: "☕", kind: "food",
          title: "Birthday coffee with friends",
          blurb: "A slow start to the best day of the year. Caffeine first, chaos later.",
          pending: "Spot coming soon"
        },
        {
          id: "dellarocco", timeLabel: "Lunch", emoji: "🍕", kind: "food",
          title: "Pizza lunch at Dellarocco's",
          blurb: "Wood fired Neapolitan pizza in Brooklyn Heights, with friends. Pizza on your birthday is non negotiable.",
          address: { name: "Dellarocco's Brick Oven Pizza", text: "214 Hicks St, Brooklyn, NY 11201" },
          phone: "(718) 858-1010",
          notes: [
            "Its online ordering page lists a 12:00 PM opening time, so no showing up early. They are not open yet.",
            "One local guide says cash only, so bring some cash just in case.",
            "There is a gluten-free crust and a few vegan pies if you want them."
          ],
          travel: "About 30 to 40 minutes from the hotel by subway. The MTA app has the live route.",
          menu: MENU_DELLAROCCO,
          links: [{ label: "Review and details", url: "https://www.theinfatuation.com/new-york/reviews/dellaroccos" }]
        },
        {
          id: "lelabar", timeLabel: "5:00 PM", time: "17:00", emoji: "🍷", kind: "drinks",
          title: "Cheers at Lelabar",
          blurb: "Our 5:00 PM reservation is at the bar. A cozy West Village wine room built around a big oval bar, very us.",
          address: { name: "Lelabar", text: "422 Hudson St, New York, NY 10014", extra: "Between St Luke's Pl and Morton St" },
          phone: "(212) 206-0594",
          notes: [
            "Our reservation is for seats at the bar.",
            "Happy hour runs daily from 4 to 6 PM, so we land right inside it at 5:00. Ask what it covers.",
            "Most of the wine list is available by the glass if you order two glasses (Champagne excluded).",
            "Casual dress. Reservations go through Resy, and walk-ins are welcome too."
          ],
          travel: "Plan on about 40 to 50 minutes by subway from Brooklyn Heights, so leave lunch with time to spare.",
          menu: MENU_LELABAR,
          links: [{ label: "Official site", url: "https://www.lelabar.com/" }]
        },
        {
          id: "meduza", timeLabel: "6:45 PM", time: "18:45", emoji: "🍽️", kind: "food",
          title: "Birthday dinner at Mēdüzā Mediterrania",
          blurb: "Our 6:45 PM reservation. Lively Mediterranean dinner at the base of the Gansevoort Hotel. Big birthday dinner energy.",
          address: { name: "Mēdüzā Mediterrania", text: "657 Hudson St, New York, NY 10014" },
          phone: "(646) 435-6544",
          notes: [
            "It is a loud, fun room, and there is a DJ on some nights.",
            "Dinner runs nightly from 5:00 PM to midnight.",
            "The menu is big on mezze, a raw bar, robata grill dishes, pastas and steaks. Come hungry."
          ],
          travel: "About a 15 minute walk north on Hudson St from Lelabar. Easy.",
          menu: MENU_MEDUZA,
          links: [{ label: "Reservations", url: "https://www.meduza33.com/reservations" }, { label: "Official site", url: "https://www.meduza33.com" }]
        },
        {
          id: "wv-walk", timeLabel: "After dinner", emoji: "🌃", kind: "fun",
          title: "Stroll through the West Village",
          blurb: "Brownstones, cobblestones, and a slow walk with my favorite person. No plan, just us."
        },
        {
          id: "harriets", timeLabel: "Late evening", emoji: "🥂", kind: "drinks",
          title: "Rooftop drinks at Harriet's",
          blurb: "Skyline views of Manhattan and the Brooklyn Bridge from the 11th floor of 1 Hotel Brooklyn Bridge. Yes, it is as pretty as it sounds.",
          address: { name: "Harriet's Rooftop at 1 Hotel Brooklyn Bridge", text: "60 Furman St, Brooklyn, NY 11201" },
          phone: "(347) 696-2554",
          notes: [
            "The rooftop depends on the weather. Check @harrietsbk on Instagram, and ask about Harriet's Lounge on the 10th floor as an indoor backup.",
            "Rooftop hours on Fridays are 11:00 AM to midnight.",
            "Dress warm. Late October on a rooftop is cold, so bring layers.",
            "A 20% gratuity is suggested and added to checks."
          ],
          travel: "From the West Village, allow 30 to 45 minutes by subway or rideshare.",
          menu: MENU_HARRIETS,
          links: [{ label: "Official page", url: "https://www.1hotels.com/brooklyn-bridge/taste/harriets-rooftop" }, { label: "Book a table", url: "https://www.sevenrooms.com/reservations/harrietsbrooklynbridge" }]
        },
        {
          id: "costume-fri", timeLabel: "10:30 PM", time: "22:30", emoji: "🧜‍♀️", kind: "fun",
          title: "Costume time! Back to the hotel",
          blurb: "Around 10:30 PM we change into our costumes. You are a mermaid and I am a pirate. Arrr.",
          address: HOTEL,
          notes: [
            "A rideshare from DUMBO to the hotel takes roughly 20 to 30 minutes.",
            "Pack safety pins and tape for costume emergencies."
          ]
        },
        {
          id: "fri-night", timeLabel: "Late night", emoji: "🏴‍☠️", kind: "social",
          title: "Out with friends in costume",
          blurb: "One mermaid and one pirate, out with friends and ready for trouble.",
          pending: "Meeting spot coming soon"
        }
      ]
    },
    {
      id: "sat", short: "Sat", name: "Saturday", date: "2026-10-31", label: "Oct 31",
      tag: "Halloween",
      intro: "Coffee in Brooklyn, lunch in Midtown, a boat in Central Park, a Fifth Ave shopping spree, a quick costume change, then pasta, sangria and a second costume night.",
      wx: ["nyc"],
      stops: [
        {
          id: "sat-coffee", timeLabel: "10:30 AM", time: "10:30", emoji: "☕", kind: "food",
          title: "Coffee at Café Grumpy",
          blurb: "Really good coffee in Park Slope before we head into the city. Get whatever you want, plus a treat.",
          address: { name: "Café Grumpy Park Slope", text: "383 7th Ave, Brooklyn, NY 11215" },
          notes: [
            "Open 7 AM to 6 PM every day, so there is no rush.",
            "It is about three blocks from two stations on the F and G lines (7 Av and 15 St-Prospect Park). The F goes straight to Midtown.",
            "We leave by about 12:00 PM to catch the F to 42 St-Bryant Park in time for our 1:00 PM lunch."
          ],
          travel: "Roughly a 20 minute walk from the hotel, or a short rideshare.",
          links: [{ label: "Café Grumpy page", url: "https://cafegrumpy.com/locations/park-slope" }]
        },
        {
          id: "isla", timeLabel: "1:00 PM", time: "13:00", emoji: "🥂", kind: "food",
          title: "Lunch at Isla & Co.",
          blurb: "Our 1:00 PM reservation. Australian inspired all day dining in Midtown, on the ground floor of Hotel Hendricks. The espresso martinis are calling.",
          address: { name: "Isla & Co. Midtown", text: "25 W 38th St, New York, NY 10018" },
          phone: "(332) 241-7369",
          notes: [
            "It is known for its espresso martini, plus coffee, brunch and dinner menus.",
            "Bryant Park and Times Square are a few blocks away.",
            "The official site points to Google Maps for hours, so check the day of."
          ],
          travel: "Take the F from Park Slope to 42 St-Bryant Park, then walk a few blocks. Budget 40 to 50 minutes door to door.",
          menu: MENU_ISLA,
          links: [{ label: "Official site", url: "https://www.isla-co.com/midtown" }, { label: "Reserve on Resy", url: "https://resy.com/cities/ny/isla-and-co-midtown" }]
        },
        {
          id: "boat", timeLabel: "3:15 PM", time: "15:15", emoji: "🚣‍♀️", kind: "fun",
          title: "Rowboat ride in Central Park",
          blurb: "Just us on the lake at the Loeb Boathouse. Very romantic movie scene.",
          address: { name: "The Loeb Boathouse", text: "E 72nd St & Park Dr N, New York, NY 10021" },
          notes: [
            "Rentals are first come, first served. There are no reservations.",
            "It opens daily at 10 AM and runs until dusk. The last boat leaves an hour before dusk, and dusk on October 31 is roughly 5:45 PM. Arriving around 3:15 gives us plenty of time.",
            "It is $30 per hour from Friday to Sunday. The Boathouse is cashless, so bring a card or phone.",
            "No food or drinks on the boats. Life jackets are provided.",
            "Its website does not list seasonal or weather closures, so check before we go."
          ],
          travel: "Allow 30 to 40 minutes from Isla by subway or rideshare, then a short walk through the park. We leave lunch around 2:30 PM.",
          links: [{ label: "Boathouse info", url: "https://www.centralparkboathouse.com/" }]
        },
        {
          id: "shopping", timeLabel: "4:45 PM", time: "16:45", emoji: "🛍️", kind: "fun",
          title: "Fifth Ave shopping spree",
          blurb: "We are going to Fifth Ave and you can pick out whatever you want. It's on me ;)",
          address: { name: "Fifth Avenue at 59th St", text: "5th Ave & 59th St, New York, NY" },
          notes: [
            "We start near Grand Army Plaza at the corner of Central Park and wander south from there.",
            "Store hours vary, so check the ones you really want to hit.",
            "It is Halloween Saturday, so expect crowds and costumes everywhere."
          ],
          travel: "About a 20 to 25 minute walk from the Boathouse through the park, or a short rideshare. We head back to the hotel around 6:00 PM."
        },
        {
          id: "costume-sat", timeLabel: "6:45 PM", time: "18:45", emoji: "🍋", kind: "fun",
          title: "Back to the hotel to glam up",
          blurb: "Time to become a lemon drop martini and a bartender. Quick change, big entrance.",
          address: HOTEL,
          notes: [
            "From Fifth Ave at 59th St, the R train runs to 4 Av-9 St near the hotel. Plan on about 40 to 45 minutes door to door, and check the MTA app for weekend service changes.",
            "Leaving Fifth Ave around 6:00 PM gets us to the hotel around 6:45 PM, with about an hour to change.",
            "We head back out around 7:45 PM."
          ],
          travel: "About 40 to 45 minutes by subway from Fifth Ave."
        },
        {
          id: "sat-friends", timeLabel: "Evening", emoji: "👯", kind: "social",
          title: "Meet up with friends in costume",
          blurb: "Costumes on, friends together, Halloween night officially starts.",
          notes: [
            "From the hotel, the R train to 8 St-NYU takes roughly 30 to 35 minutes, plus a short walk to the East Village. Leaving around 7:45 PM puts us there around 8:30 PM.",
            "Costumes on the subway on Halloween are totally normal, so no stress."
          ],
          pending: "Spot and time coming soon"
        },
        {
          id: "sanmarzano", timeLabel: "Dinner", emoji: "🍝", kind: "food",
          title: "All you can eat pasta at San Marzano",
          blurb: "Fresh pasta and bottomless sangria with friends in the East Village. Carbs and cocktails, our love language.",
          address: { name: "San Marzano", text: "117 2nd Ave, New York, NY 10003", extra: "Between 6th St and 7th St" },
          phone: "(212) 777-3600",
          notes: [
            "Reservations are for parties of four or more and have to include the dinner prix fixe.",
            "The Friday and Saturday dinner prix fixe is $58 per person plus tax and a 20% gratuity. It covers 90 minutes of unlimited house wine, draft beer or sangria, family style appetizers, and one main course each.",
            "The room is loud and lively, which is perfect for Halloween.",
            "Double check the reservation time and party size."
          ],
          menu: MENU_SANMARZANO,
          links: [{ label: "Official site", url: "https://www.sanmarzanonyc.com" }]
        },
        {
          id: "sat-night", timeLabel: "Late night", emoji: "🍹", kind: "drinks",
          title: "Halloween night out",
          blurb: "One lemon drop martini and one bartender, out with friends. Somebody is going to need a drink, and I know a guy.",
          pending: "Spot coming soon"
        }
      ]
    },
    {
      id: "sun", short: "Sun", name: "Sunday", date: "2026-11-01", label: "Nov 1",
      tag: "Heading home",
      intro: "A slower morning, then home. Sad, but what a weekend.",
      wx: ["nyc", "clt"],
      stops: [
        {
          id: "checkout", timeLabel: "Morning", emoji: "🧳", kind: "stay",
          title: "Check out and head to LaGuardia",
          blurb: "Pack the costumes, grab one last coffee, and hit the road.",
          address: HOTEL,
          notes: [
            "Clocks go back one hour at 2:00 AM on Sunday, November 1. Your phone adjusts on its own, and we get a free extra hour of sleep. Yay.",
            "Our flight leaves at 11:43 AM. Leaving the hotel around 8:45 AM is a comfortable plan, and earlier is safer if the morning is slow."
          ]
        },
        {
          id: "fly-home", timeLabel: "11:43 AM", time: "11:43", emoji: "✈️", kind: "travel",
          title: "Fly home: New York to Charlotte",
          blurb: "Delta from LaGuardia (LGA). We take off at 11:43 AM and are scheduled to land in Charlotte at 5:33 PM. Best weekend ever.",
          address: { name: "LaGuardia Airport (LGA)", text: "Queens, NY 11371" },
          notes: [
            "Boarding passes go in your phone wallet, and keep a photo ID within reach.",
            "Check the Delta app the morning of the flight for gate and terminal updates."
          ],
          wx: [{ city: "nyc", time: "11:43", label: "New York at takeoff" }, { city: "clt", time: "17:33", label: "Charlotte at landing" }],
          links: [{ label: "Delta", url: "https://www.delta.com/" }]
        }
      ]
    }
  ];

  /* ---------- Packing, costumes, info ---------- */

  var packing = [
    { title: "Travel", items: [
      "Photo ID", "Phone and charger", "Boarding passes in the phone wallet", "A card or phone for tap to pay (the Boathouse is cashless)", "Cash for Dellarocco's"
    ]},
    { title: "Costumes", items: [
      "Mermaid costume (Friday)", "Pirate costume (Friday)", "Lemon drop martini costume (Saturday)", "Bartender costume (Saturday)", "Safety pins and tape", "Makeup and wig supplies"
    ]},
    { title: "Bundle up", items: [
      "A warm layer for rooftops and evenings", "Comfy shoes for all the walking (hello, Fifth Ave)", "Umbrella or rain jacket", "Gloves and a hat in case it gets chilly"
    ]},
    { title: "For the birthday girl", items: [
      "Birthday card", "Any medications you need", "Headphones for the flights"
    ]}
  ];

  var costumes = [
    { day: "Friday", you: "Mermaid", me: "Pirate", emoji: "🧜‍♀️" },
    { day: "Saturday", you: "Lemon drop martini", me: "Bartender", emoji: "🍹" }
  ];

  var flights = [
    { leg: "Thursday, Oct 29", route: "Charlotte (CLT) to LaGuardia (LGA)", times: "Departs 5:00 PM, arrives 6:59 PM", airline: "Delta" },
    { leg: "Sunday, Nov 1", route: "LaGuardia (LGA) to Charlotte (CLT)", times: "Departs 11:43 AM, arrives 5:33 PM", airline: "Delta" }
  ];

  var sources = [
    { label: "Lelabar official site", url: "https://www.lelabar.com/" },
    { label: "Mēdüzā Mediterrania on NYC Tourism", url: "https://www.nyctourism.com/restaurants/meduza-mediterrania/" },
    { label: "Isla & Co. Midtown", url: "https://www.isla-co.com/midtown" },
    { label: "Harriet's Rooftop at 1 Hotel Brooklyn Bridge", url: "https://www.1hotels.com/brooklyn-bridge/taste/harriets-rooftop" },
    { label: "San Marzano official site", url: "https://www.sanmarzanonyc.com" },
    { label: "Dellarocco's on Slice", url: "https://slicelife.com/restaurants/ny/brooklyn-heights/11201/dellarocco-s-of-brooklyn/menu" },
    { label: "Central Park Loeb Boathouse", url: "https://www.centralparkboathouse.com/" },
    { label: "Weather by Open-Meteo", url: "https://open-meteo.com/" }
  ];

  return { hotel: HOTEL, days: days, packing: packing, costumes: costumes, flights: flights, sources: sources };
})();
