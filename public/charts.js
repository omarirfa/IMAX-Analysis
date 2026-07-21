/* IMAX through the years — chart rendering (Chart.js).
   Ported verbatim from the original study. Guards against a missing Chart
   global so a CDN failure degrades gracefully (nav still works). */
(function(){
  if (window.__imaxChartsInit) return;
  window.__imaxChartsInit = true;
/* ---------- REAL DATA (computed from films_full_from_wikipedia.csv) ---------- */
const YEARS=[1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026];
const FILMS=[11,13,15,12,10,19,12,16,22,10,16,7,12,12,13,15,18,30,36,41,43,51,57,70,85,66,41,76,68,80,100,113,74];
const NATIVE=[11,13,15,12,10,19,10,15,16,7,12,3,5,6,4,4,2,6,2,5,2,4,2,4,1,1,4,1,1,2,0,5,3];
const CERT=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,4,3,0,0,0,1,1,1,2,1,6,8,8,8,14,14];
const DMR=[0,0,0,0,0,0,2,1,6,3,4,4,7,6,9,9,14,20,31,36,41,47,54,65,83,63,36,69,59,70,92,94,57];
const LASER=[0,0,0,0,0,0,0,0,9,0,6,0,0,0,8,13,6,3,11,10,9,6,11,14,11,14,7,12,15,11,8,15,18];
const SCREENX=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,4,7,12,21,15,8,22,21,25,19,22];
const FOURDX=[0,0,0,0,10,0,0,6,0,0,12,29,0,8,8,13,11,3,11,51,70,33,70,39,46,45,24,38,38,45,39,31,35];
const THREED=[0,0,0,0,0,0,0,0,0,0,0,0,17,8,8,33,50,53,56,54,58,51,70,51,45,45,24,20,16,12,14,11,16];
const SCATTER=[{"x":2000,"y":27.5,"c":"native","t":"Cirque du Soleil: Journey of Man"},{"x":2024,"y":0.1,"c":"certified","t":"Dancing Village: The Curse Begins"},{"x":2002,"y":0.0,"c":"native","t":"Horses: The Story of Equus"},{"x":2020,"y":169.6,"c":"native","t":"Wonder Woman 1984"},{"x":2023,"y":440.2,"c":"certified","t":"Aquaman and the Lost Kingdom"},{"x":2009,"y":0.0,"c":"native","t":"Journey to Mecca"},{"x":2024,"y":207.5,"c":"certified","t":"Joker: Folie à Deux"},{"x":2013,"y":15.0,"c":"native","t":"Journey to the South Pacific"},{"x":2006,"y":98.2,"c":"native","t":"Deep Sea 3D"},{"x":2007,"y":0.7,"c":"native","t":"The Alps"},{"x":2024,"y":2.6,"c":"certified","t":"The Blue Angels"},{"x":2026,"y":340.5,"c":"certified","t":"Star Wars: The Mandalorian and Grogu"},{"x":2012,"y":23.7,"c":"native","t":"To the Arctic 3D"},{"x":2019,"y":2799.4,"c":"certified","t":"Avengers: Endgame"},{"x":2012,"y":335.3,"c":"certified","t":"Journey 2: The Mysterious Island"},{"x":2009,"y":55.9,"c":"native","t":"Under the Sea"},{"x":2011,"y":1123.8,"c":"certified","t":"Transformers: Dark of the Moon"},{"x":2001,"y":1.0,"c":"native","t":"The Human Body"},{"x":2010,"y":76.0,"c":"native","t":"Hubble"},{"x":2025,"y":317.9,"c":"certified","t":"Final Destination Bloodlines"},{"x":2008,"y":0.4,"c":"native","t":"Grand Canyon Adventure: River at Risk"},{"x":2001,"y":6.8,"c":"native","t":"China: The Panda Adventure"},{"x":2025,"y":521.9,"c":"certified","t":"The Fantastic Four: First Steps"},{"x":2025,"y":382.4,"c":"certified","t":"Thunderbolts*"},{"x":2001,"y":19.6,"c":"native","t":"Shackleton's Antarctic Adventure"},{"x":2002,"y":0.4,"c":"native","t":"Skydance, Rendezvous à Paris"},{"x":2007,"y":50.7,"c":"native","t":"Sea Monsters: A Prehistoric Adventure"},{"x":2010,"y":400.1,"c":"certified","t":"Tron: Legacy"},{"x":2021,"y":410.7,"c":"certified","t":"Dune"},{"x":2022,"y":955.8,"c":"certified","t":"Doctor Strange in the Multiverse of Ma"},{"x":2025,"y":415.1,"c":"certified","t":"Captain America: Brave New World"},{"x":2003,"y":29.4,"c":"native","t":"Bugs! A Rainforest Adventure"},{"x":2009,"y":0.1,"c":"native","t":"Van Gogh: Brush with Genius"},{"x":2017,"y":0.0,"c":"native","t":"Dream Big: Engineering Our World"},{"x":2021,"y":402.1,"c":"certified","t":"Eternals"},{"x":2020,"y":0.0,"c":"native","t":"Into America’s Wild"},{"x":2022,"y":6.1,"c":"certified","t":"Notre-Dame on Fire"},{"x":2022,"y":171.2,"c":"native","t":"Nope"},{"x":2001,"y":18.0,"c":"native","t":"Bears"},{"x":2018,"y":105.7,"c":"native","t":"First Man"},{"x":2007,"y":4.8,"c":"native","t":"Dinosaurs: Giants of Patagonia"},{"x":2001,"y":1.0,"c":"native","t":"All Access: Front Row. Backstage. Live"},{"x":2022,"y":859.2,"c":"certified","t":"Black Panther: Wakanda Forever"},{"x":2006,"y":0.2,"c":"native","t":"Greece: Secrets of the Past"},{"x":2018,"y":2052.4,"c":"certified","t":"Avengers: Infinity War"},{"x":2002,"y":11.0,"c":"native","t":"Adrenaline Rush: The Science of Risk"},{"x":2023,"y":476.1,"c":"certified","t":"Ant-Man and the Wasp: Quantumania"},{"x":2019,"y":1662.0,"c":"native","t":"The Lion King"},{"x":2013,"y":467.4,"c":"native","t":"Star Trek Into Darkness"},{"x":2020,"y":461.4,"c":"certified","t":"The Eight Hundred"},{"x":2011,"y":0.2,"c":"native","t":"Tornado Alley"},{"x":2025,"y":598.8,"c":"certified","t":"Mission: Impossible – The Final Reckon"},{"x":2026,"y":119.3,"c":"certified","t":"Supergirl"},{"x":2013,"y":865.2,"c":"native","t":"The Hunger Games: Catching Fire"},{"x":2000,"y":13.4,"c":"native","t":"SolarMax"},{"x":2002,"y":0.7,"c":"native","t":"Australia: Land Beyond Time"},{"x":2025,"y":0.5,"c":"certified","t":"Dongji Rescue"},{"x":2025,"y":618.7,"c":"certified","t":"Superman"},{"x":2001,"y":0.2,"c":"native","t":"The Princess and the Pea"},{"x":2021,"y":1921.4,"c":"certified","t":"Spider-Man: No Way Home"},{"x":2026,"y":23.9,"c":"certified","t":"The Bride!"},{"x":2001,"y":1.8,"c":"native","t":"' N Sync: Bigger Than Live"},{"x":2006,"y":11.0,"c":"native","t":"Roving Mars"},{"x":2002,"y":0.5,"c":"native","t":"In Five Minutes, The Feature"},{"x":2013,"y":9.3,"c":"native","t":"Jerusalem"},{"x":2002,"y":0.3,"c":"native","t":"The Trip"},{"x":2024,"y":572.1,"c":"certified","t":"Godzilla x Kong: The New Empire"},{"x":2023,"y":7.0,"c":"certified","t":"Leo"},{"x":2004,"y":22.2,"c":"native","t":"NASCAR 3D: The IMAX Experience"},{"x":2011,"y":42.9,"c":"native","t":"Born to Be Wild"},{"x":2013,"y":0.4,"c":"native","t":"Hidden Universe 3D"},{"x":2015,"y":161.1,"c":"native","t":"Star Wars: The Force Awakens"},{"x":2004,"y":1.1,"c":"native","t":"Sacred Planet"},{"x":2011,"y":694.7,"c":"native","t":"Mission: Impossible – Ghost Protocol"},{"x":2011,"y":157.9,"c":"certified","t":"Final Destination 5"},{"x":2011,"y":1046.7,"c":"certified","t":"Pirates of the Caribbean: On Stranger "},{"x":2014,"y":764.3,"c":"native","t":"Interstellar"},{"x":2019,"y":405.0,"c":"certified","t":"Alita: Battle Angel"},{"x":2000,"y":21.5,"c":"native","t":"Ski to the Max"},{"x":2017,"y":0.0,"c":"native","t":"Dream Big"},{"x":2023,"y":571.1,"c":"certified","t":"Mission: Impossible – Dead Reckoning P"},{"x":2026,"y":129.5,"c":"certified","t":"Mortal Kombat II"},{"x":2008,"y":1.2,"c":"native","t":"Wild Ocean"},{"x":2023,"y":845.6,"c":"certified","t":"Guardians of the Galaxy Vol. 3"},{"x":2009,"y":836.3,"c":"native","t":"Transformers: Revenge of the Fallen"},{"x":2012,"y":609.0,"c":"certified","t":"Life of Pi"},{"x":2002,"y":13.7,"c":"native","t":"Lewis & Clark: Great Journey West"},{"x":2021,"y":168.7,"c":"certified","t":"The Suicide Squad"},{"x":2000,"y":21.5,"c":"native","t":"Michael Jordan to the Max"},{"x":2016,"y":874.4,"c":"native","t":"Batman v Superman: Dawn of Justice"},{"x":2022,"y":760.9,"c":"certified","t":"Thor: Love and Thunder"},{"x":2004,"y":0.2,"c":"native","t":"Roar: Lions of the Kalahari"},{"x":2023,"y":276.1,"c":"certified","t":"Creed III"},{"x":2016,"y":0.0,"c":"native","t":"National Parks Adventure"},{"x":2012,"y":1085.4,"c":"native","t":"The Dark Knight Rises"},{"x":2002,"y":10.1,"c":"native","t":"Pulse: A Stomp Odyssey"},{"x":2006,"y":7.8,"c":"native","t":"Ride Around the World"},{"x":2022,"y":902.5,"c":"certified","t":"The Battle at Lake Changjin II"},{"x":2020,"y":376.6,"c":"native","t":"Tenet"},{"x":2009,"y":23.2,"c":"certified","t":"Jonas Brothers: The 3D Concert Experie"},{"x":2007,"y":0.6,"c":"native","t":"Dinosaurs Alive!"},{"x":2002,"y":128.4,"c":"native","t":"Space Station 3D"},{"x":2014,"y":16.9,"c":"native","t":"Island of Lemurs: Madagascar"},{"x":2002,"y":4.8,"c":"native","t":"Ultimate X: The Movie"},{"x":2008,"y":1008.5,"c":"native","t":"The Dark Knight"},{"x":2024,"y":478.9,"c":"certified","t":"Venom: The Last Dance"},{"x":2017,"y":605.4,"c":"certified","t":"Transformers: The Last Knight"},{"x":2026,"y":54.7,"c":"certified","t":"Mercy"},{"x":2023,"y":975.8,"c":"native","t":"Oppenheimer"},{"x":2008,"y":0.1,"c":"native","t":"Mysteries of the Great Lakes"},{"x":2005,"y":40.3,"c":"native","t":"Magnificent Desolation: Walking on the"},{"x":2023,"y":130.8,"c":"certified","t":"Blue Beetle"},{"x":2024,"y":714.8,"c":"certified","t":"Dune: Part Two"},{"x":2025,"y":142.2,"c":"certified","t":"Tron: Ares"},{"x":2026,"y":340.6,"c":"native","t":"The Mandalorian and Grogu"},{"x":2026,"y":21.8,"c":"native","t":"The Odyssey"},{"x":2025,"y":634.1,"c":"certified","t":"F1"},{"x":2011,"y":59.4,"c":"native","t":"The Tree of Life"},{"x":2025,"y":636.6,"c":"certified","t":"How to Train Your Dragon (2025)"},{"x":2021,"y":902.5,"c":"certified","t":"The Battle at Lake Changjin"},{"x":2023,"y":0.2,"c":"native","t":"Deep Sky"},{"x":2021,"y":774.2,"c":"native","t":"No Time to Die"},{"x":2016,"y":243.9,"c":"certified","t":"Sully"},{"x":2017,"y":550.0,"c":"native","t":"Dunkirk"},{"x":2002,"y":0.0,"c":"native","t":"India: Kingdom of the Tiger"},{"x":2001,"y":0.0,"c":"native","t":"Ocean Men: Extreme Dive"},{"x":2003,"y":9.6,"c":"native","t":"The Young Black Stallion"},{"x":2009,"y":2923.7,"c":"certified","t":"James Cameron's Avatar"},{"x":2025,"y":636.6,"c":"native","t":"How to Train Your Dragon"},{"x":2012,"y":34.2,"c":"certified","t":"Cirque du Soleil: Worlds Away"},{"x":2011,"y":108.6,"c":"certified","t":"Sanctum"},{"x":2026,"y":684.0,"c":"certified","t":"Project Hail Mary"},{"x":2025,"y":21.1,"c":"native","t":"The Smashing Machine"},{"x":2023,"y":615.0,"c":"certified","t":"The Wandering Earth 2"},{"x":2007,"y":0.0,"c":"native","t":"Mummies 3D: Secrets of the Pharaohs"},{"x":2022,"y":1503.3,"c":"certified","t":"Top Gun: Maverick"},{"x":2025,"y":371.4,"c":"native","t":"Sinners"},{"x":2021,"y":432.2,"c":"certified","t":"Shang-Chi and the Legend of the Ten Ri"},{"x":2010,"y":300.2,"c":"certified","t":"Resident Evil: Afterlife"},{"x":2025,"y":0.0,"c":"certified","t":"Escape from the Outland"},{"x":2025,"y":2.5,"c":"dmr","t":"The Colors Within"},{"x":2026,"y":152.9,"c":"dmr","t":"Dhurandhar: The Revenge"},{"x":2008,"y":164.2,"c":"dmr","t":"The Spiderwick Chronicles"},{"x":2025,"y":3.3,"c":"dmr","t":"Death Whisperer 3"},{"x":2025,"y":274.1,"c":"dmr","t":"Evil Unbound"},{"x":2024,"y":306.9,"c":"dmr","t":"Article 20"},{"x":2016,"y":677.8,"c":"dmr","t":"Doctor Strange"},{"x":2018,"y":428.1,"c":"dmr","t":"Rampage"},{"x":2017,"y":290.1,"c":"dmr","t":"Paddington 2"},{"x":2018,"y":66.3,"c":"dmr","t":"Mile 22"},{"x":2001,"y":489.7,"c":"dmr","t":"Shrek"},{"x":2022,"y":21.9,"c":"dmr","t":"Ponniyin Selvan: I"},{"x":2015,"y":1159.5,"c":"dmr","t":"Minions"},{"x":2026,"y":656.5,"c":"dmr","t":"Pegasus 3"},{"x":2019,"y":393.9,"c":"dmr","t":"Once Upon a Time in Hollywood"},{"x":2019,"y":387.3,"c":"dmr","t":"Godzilla: King of the Monsters"},{"x":2026,"y":9.9,"c":"dmr","t":"Gintama: Yoshiwara in Flames"},{"x":2026,"y":115.1,"c":"dmr","t":"Moana"},{"x":2017,"y":3.1,"c":"dmr","t":"Salyut-7"},{"x":2024,"y":162.6,"c":"dmr","t":"The Beekeeper"},{"x":2014,"y":211.8,"c":"dmr","t":"Fury"},{"x":2013,"y":205.4,"c":"dmr","t":"White House Down"},{"x":2024,"y":404.6,"c":"dmr","t":"Bad Boys: Ride or Die"},{"x":2013,"y":1215.6,"c":"dmr","t":"Iron Man 3"},{"x":2020,"y":70.0,"c":"dmr","t":"Mulan"},{"x":2017,"y":10.8,"c":"dmr","t":"Ajin: Demi-Human"},{"x":2025,"y":34.9,"c":"dmr","t":"Warfare"},{"x":2021,"y":19.1,"c":"dmr","t":"Dear Evan Hansen"},{"x":2002,"y":22.8,"c":"dmr","t":"Santa vs. the Snowman 3D"},{"x":2018,"y":553.0,"c":"dmr","t":"Dr. Seuss' The Grinch"},{"x":2022,"y":2334.5,"c":"dmr","t":"Avatar: The Way of Water"},{"x":2015,"y":547.7,"c":"dmr","t":"American Sniper"},{"x":2023,"y":269.7,"c":"dmr","t":"The Nun II"},{"x":2022,"y":147.9,"c":"dmr","t":"Everything Everywhere All at Once"},{"x":2013,"y":98.3,"c":"dmr","t":"Riddick"},{"x":2019,"y":1662.0,"c":"dmr","t":"The Lion King (2019)"},{"x":2014,"y":86.1,"c":"dmr","t":"John Wick"},{"x":2022,"y":104.4,"c":"dmr","t":"Halloween Ends"},{"x":2018,"y":785.9,"c":"dmr","t":"Deadpool 2"},{"x":2006,"y":384.3,"c":"dmr","t":"Happy Feet"},{"x":2014,"y":337.6,"c":"dmr","t":"300: Rise of an Empire"},{"x":2013,"y":68.3,"c":"dmr","t":"Stalingrad"},{"x":2024,"y":186.0,"c":"dmr","t":"Red One"},{"x":2000,"y":90.9,"c":"dmr","t":"Fantasia 2000"},{"x":2023,"y":104.3,"c":"dmr","t":"The Creator"},{"x":2026,"y":2.0,"c":"dmr","t":"Border 2"},{"x":2018,"y":60.5,"c":"dmr","t":"Padmaavat"},{"x":2017,"y":29.8,"c":"dmr","t":"The Disaster Artist"},{"x":2017,"y":226.0,"c":"dmr","t":"Valerian and the City of a Thousand Pl"},{"x":2024,"y":182.0,"c":"dmr","t":"Nosferatu"},{"x":2002,"y":653.8,"c":"dmr","t":"Star Wars: Episode II – Attack of the "},{"x":2013,"y":226.3,"c":"dmr","t":"Hansel & Gretel: Witch Hunters"},{"x":2015,"y":94.3,"c":"dmr","t":"In the Heart of the Sea"},{"x":2023,"y":122.3,"c":"dmr","t":"A Haunting in Venice"},{"x":2024,"y":202.0,"c":"dmr","t":"Ghostbusters: Frozen Empire"},{"x":2014,"y":381.1,"c":"dmr","t":"Edge of Tomorrow"},{"x":2014,"y":773.4,"c":"dmr","t":"Guardians of the Galaxy"},{"x":2024,"y":2.6,"c":"dmr","t":"Bade Miyan Chote Miyan"},{"x":2025,"y":23.3,"c":"dmr","t":"God Save The Tuches"},{"x":2025,"y":45.2,"c":"dmr","t":"Springsteen: Deliver Me from Nowhere"},{"x":2022,"y":21.4,"c":"dmr","t":"Emergency Declaration"},{"x":2025,"y":11.3,"c":"dmr","t":"Chien 51"},{"x":2023,"y":106.8,"c":"dmr","t":"Detective Conan: Black Iron Submarine"},{"x":2012,"y":868.6,"c":"dmr","t":"The Twilight Saga: Breaking Dawn – Par"},{"x":2018,"y":275.0,"c":"dmr","t":"Tomb Raider"},{"x":2022,"y":67.3,"c":"dmr","t":"Moonfall"},{"x":2020,"y":489.5,"c":"dmr","t":"Demon Slayer: Kimetsu no Yaiba the Mov"},{"x":2020,"y":39.9,"c":"dmr","t":"Bloodshot"},{"x":2025,"y":960.4,"c":"dmr","t":"A Minecraft Movie"},{"x":2014,"y":114.2,"c":"dmr","t":"Seventh Son"},{"x":2021,"y":64.7,"c":"dmr","t":"Belle"},{"x":2005,"y":375.6,"c":"dmr","t":"Batman Begins"},{"x":2015,"y":859.1,"c":"dmr","t":"Inside Out"},{"x":2017,"y":405.6,"c":"dmr","t":"Your Name"},{"x":2016,"y":110.2,"c":"dmr","t":"10 Cloverfield Lane"},{"x":2017,"y":100.5,"c":"dmr","t":"Life"},{"x":2023,"y":36.3,"c":"dmr","t":"Kingdom 3"},{"x":2020,"y":144.5,"c":"dmr","t":"The Invisible Man"},{"x":2017,"y":410.9,"c":"dmr","t":"Kingsman: The Golden Circle"},{"x":2026,"y":0.3,"c":"dmr","t":"Kattalan"},{"x":2019,"y":69.5,"c":"dmr","t":"Exit"},{"x":2018,"y":15.7,"c":"dmr","t":"Raid"},{"x":2020,"y":426.5,"c":"dmr","t":"Bad Boys for Life"},{"x":2023,"y":114.0,"c":"dmr","t":"Godzilla Minus One"},{"x":2026,"y":233.3,"c":"dmr","t":"Disclosure Day"},{"x":2019,"y":55.1,"c":"dmr","t":"Hellboy"},{"x":2024,"y":0.7,"c":"dmr","t":"Kanguva"},{"x":2025,"y":1.5,"c":"dmr","t":"IU Concert: The Winning"},{"x":2018,"y":259.9,"c":"dmr","t":"Halloween"},{"x":2006,"y":181.7,"c":"dmr","t":"Poseidon"},{"x":2022,"y":0.1,"c":"dmr","t":"Only Fools Rush In"},{"x":2017,"y":383.9,"c":"dmr","t":"Cars 3"},{"x":2014,"y":42.0,"c":"dmr","t":"Bang Bang!"},{"x":2018,"y":1243.2,"c":"dmr","t":"Incredibles 2"},{"x":2017,"y":881.0,"c":"dmr","t":"Spider-Man: Homecoming"},{"x":2015,"y":542.4,"c":"dmr","t":"Cinderella"},{"x":2025,"y":44.5,"c":"dmr","t":"Jujutsu Kaisen: Execution"},{"x":2021,"y":221.8,"c":"dmr","t":"My Country, My Parents"},{"x":2012,"y":654.2,"c":"dmr","t":"Men in Black 3"},{"x":2023,"y":15.8,"c":"dmr","t":"Shin Kamen Rider"},{"x":2021,"y":157.4,"c":"dmr","t":"The Matrix"},{"x":2018,"y":856.1,"c":"dmr","t":"Venom"},{"x":2023,"y":289.9,"c":"dmr","t":"The Boy and the Heron"},{"x":2017,"y":277.9,"c":"dmr","t":"Blade Runner 2049"},{"x":2013,"y":375.7,"c":"dmr","t":"G.I. Joe: Retaliation"},{"x":2022,"y":35.0,"c":"dmr","t":"Kingdom 2: Far and Away"},{"x":2018,"y":97.3,"c":"dmr","t":"Alpha"},{"x":2019,"y":173.5,"c":"dmr","t":"Gemini Man"},{"x":2015,"y":0.6,"c":"dmr","t":"Game of Thrones"},{"x":2021,"y":27.2,"c":"dmr","t":"The Last Warrior: A Messenger of Darkn"},{"x":2021,"y":379.8,"c":"dmr","t":"Black Widow"},{"x":2021,"y":130.4,"c":"dmr","t":"Raya and the Last Dragon"},{"x":2025,"y":0.1,"c":"dmr","t":"Se7en"},{"x":2018,"y":297.8,"c":"dmr","t":"Ocean's 8"},{"x":2009,"y":243.0,"c":"dmr","t":"Cloudy with a Chance of Meatballs"},{"x":2026,"y":46.3,"c":"dmr","t":"Colony"},{"x":2010,"y":177.5,"c":"dmr","t":"Paranormal Activity 2"},{"x":2022,"y":2.2,"c":"dmr","t":"The Beatles: Get Back – The Rooftop Co"},{"x":2015,"y":440.6,"c":"dmr","t":"Terminator Genisys"},{"x":2025,"y":0.7,"c":"dmr","t":"Pabrik Gula"},{"x":2018,"y":290.9,"c":"dmr","t":"Pacific Rim Uprising"},{"x":2020,"y":4.8,"c":"dmr","t":"Streltsov"},{"x":2026,"y":891.4,"c":"dmr","t":"Toy Story 5"},{"x":2012,"y":306.9,"c":"dmr","t":"Rise of the Guardians"},{"x":2011,"y":449.3,"c":"dmr","t":"Thor"},{"x":2016,"y":389.7,"c":"dmr","t":"Independence Day: Resurgence"},{"x":2017,"y":795.9,"c":"dmr","t":"Pirates of the Caribbean: Dead Men Tel"},{"x":2015,"y":569.7,"c":"dmr","t":"Fifty Shades of Grey"},{"x":2024,"y":0.5,"c":"dmr","t":"Captain Miller"},{"x":2010,"y":2923.7,"c":"dmr","t":"Avatar: Special Edition"},{"x":2023,"y":11.7,"c":"dmr","t":"Tiger 3"},{"x":2025,"y":26.0,"c":"dmr","t":"Mobile Suit Gundam GQuuuuuuX: Beginnin"},{"x":2022,"y":393.5,"c":"dmr","t":"Black Adam"},{"x":2016,"y":1058.7,"c":"dmr","t":"Rogue One: A Star Wars Story"},{"x":2017,"y":103.0,"c":"dmr","t":"Jigsaw"},{"x":2022,"y":2.8,"c":"dmr","t":"Seventeen Power of Love: The Movie"},{"x":2017,"y":1266.1,"c":"dmr","t":"Beauty and the Beast (2017)"},{"x":2025,"y":2.0,"c":"dmr","t":"Thamma"},{"x":2024,"y":129.4,"c":"dmr","t":"Transformers One"},{"x":2017,"y":0.8,"c":"dmr","t":"Extreme Weather"},{"x":2016,"y":543.9,"c":"dmr","t":"X-Men: Apocalypse"},{"x":2022,"y":12.1,"c":"dmr","t":"Alienoid"},{"x":2023,"y":447.1,"c":"dmr","t":"John Wick: Chapter 4"},{"x":2019,"y":1054.3,"c":"dmr","t":"Aladdin"},{"x":2016,"y":194.7,"c":"dmr","t":"The BFG"},{"x":2012,"y":86.9,"c":"dmr","t":"Frankenweenie"},{"x":2016,"y":52.1,"c":"dmr","t":"The Finest Hours"},{"x":2023,"y":205.5,"c":"dmr","t":"Dungeons & Dragons: Honor Among Thieve"},{"x":2024,"y":1698.9,"c":"dmr","t":"Inside Out 2"},{"x":2023,"y":158.8,"c":"dmr","t":"Killers of the Flower Moon"},{"x":2026,"y":72.9,"c":"dmr","t":"Crime 101"},{"x":2014,"y":716.9,"c":"dmr","t":"The Amazing Spider-Man 2"},{"x":2023,"y":261.7,"c":"dmr","t":"Taylor Swift: The Eras Tour"},{"x":2006,"y":574.5,"c":"dmr","t":"Night at the Museum"},{"x":2004,"y":329.0,"c":"dmr","t":"The Polar Express"},{"x":2012,"y":1017.5,"c":"dmr","t":"The Hobbit: An Unexpected Journey"},{"x":2026,"y":113.4,"c":"dmr","t":"Masters of the Universe"},{"x":2024,"y":0.4,"c":"dmr","t":"Maidaan"},{"x":2026,"y":208.0,"c":"dmr","t":"Scream 7"},{"x":2025,"y":0.0,"c":"dmr","t":"Esaaf"},{"x":2025,"y":1.0,"c":"dmr","t":"One to One: John & Yoko"},{"x":2013,"y":286.1,"c":"dmr","t":"Elysium"},{"x":2014,"y":217.1,"c":"dmr","t":"Dracula Untold"},{"x":2009,"y":413.1,"c":"dmr","t":"Night at the Museum: Battle of the Smi"},{"x":2011,"y":136.5,"c":"dmr","t":"Contagion"},{"x":2024,"y":62.1,"c":"dmr","t":"Kraven the Hunter"},{"x":2019,"y":5.7,"c":"dmr","t":"Saaho"},{"x":2023,"y":441.7,"c":"dmr","t":"Transformers: Rise of the Beasts"},{"x":2022,"y":940.5,"c":"dmr","t":"Minions: The Rise of Gru"},{"x":2018,"y":468.0,"c":"dmr","t":"Bumblebee"}];
const INTLSHARE=[[2000,28],[2001,43],[2002,50],[2003,63],[2004,57],[2005,58],[2006,53],[2007,60],[2008,58],[2009,62],[2010,66],[2011,69],[2012,66],[2013,64],[2014,69],[2015,67],[2016,64],[2017,70],[2018,65],[2019,67],[2020,76],[2021,70],[2022,65],[2023,65],[2024,60],[2025,68],[2026,62]];
const NETWORK=[[2001,220],[2002,225],[2003,235],[2004,240],[2005,261],[2006,280],[2007,296],[2008,320],[2009,403],[2010,470],[2011,583],[2012,689],[2013,767],[2014,880],[2015,1008],[2016,1145],[2017,1302],[2018,1443],[2019,1568],[2020,1632],[2021,1664],[2022,1703],[2023,1731],[2024,1788],[2025,1829],[2026,1865]];
const NET_VS_FILMS=[{"x":220,"y":16,"yr":2001},{"x":225,"y":22,"yr":2002},{"x":235,"y":10,"yr":2003},{"x":240,"y":16,"yr":2004},{"x":261,"y":7,"yr":2005},{"x":280,"y":12,"yr":2006},{"x":296,"y":12,"yr":2007},{"x":320,"y":13,"yr":2008},{"x":403,"y":15,"yr":2009},{"x":470,"y":18,"yr":2010},{"x":583,"y":30,"yr":2011},{"x":689,"y":36,"yr":2012},{"x":767,"y":41,"yr":2013},{"x":880,"y":43,"yr":2014},{"x":1008,"y":51,"yr":2015},{"x":1145,"y":57,"yr":2016},{"x":1302,"y":70,"yr":2017},{"x":1443,"y":85,"yr":2018},{"x":1568,"y":66,"yr":2019},{"x":1632,"y":41,"yr":2020},{"x":1664,"y":76,"yr":2021},{"x":1703,"y":68,"yr":2022},{"x":1731,"y":80,"yr":2023},{"x":1788,"y":100,"yr":2024},{"x":1829,"y":113,"yr":2025},{"x":1865,"y":74,"yr":2026}];
const OPENING_VS_TOTAL=[{"x":53.0,"y":312,"t":"The Lego Batman Movie"},{"x":166.0,"y":874,"t":"Batman v Superman: Dawn of Jus"},{"x":18.8,"y":195,"t":"The BFG"},{"x":8.9,"y":45,"t":"Springsteen: Deliver Me from N"},{"x":13.4,"y":40,"t":"Snake Eyes"},{"x":1.9,"y":12,"t":"Tiger 3"},{"x":211.4,"y":1338,"t":"Deadpool & Wolverine"},{"x":16.9,"y":152,"t":"Red Sparrow"},{"x":35.3,"y":655,"t":"Sing"},{"x":155.1,"y":1059,"t":"Rogue One: A Star Wars Story"},{"x":40.7,"y":178,"t":"Paranormal Activity 2"},{"x":0.1,"y":12,"t":"Dark Nuns"},{"x":17.0,"y":226,"t":"Valerian and the City of a Tho"},{"x":0.9,"y":23,"t":"U2 3D"},{"x":35.0,"y":482,"t":"Mamma Mia! Here We Go Again"},{"x":7.1,"y":24,"t":"The Bride!"},{"x":3.4,"y":88,"t":"Dhoom 3"},{"x":30.1,"y":134,"t":"Shazam! Fury of the Gods"},{"x":4.0,"y":22,"t":"Ponniyin Selvan: II"},{"x":26.3,"y":174,"t":"Furiosa: A Mad Max Saga"},{"x":5.0,"y":221,"t":"Suzume"},{"x":12.8,"y":695,"t":"Mission: Impossible – Ghost Pr"},{"x":54.3,"y":631,"t":"The Martian"},{"x":6.0,"y":26,"t":"Mountain"},{"x":14.3,"y":73,"t":"Crime 101"},{"x":9.1,"y":16,"t":"I Still Believe"},{"x":36.2,"y":414,"t":"Kingsman: The Secret Service"},{"x":43.7,"y":495,"t":"How to Train Your Dragon (2010"},{"x":30.4,"y":574,"t":"Night at the Museum"},{"x":169.2,"y":1343,"t":"Harry Potter and the Deathly H"},{"x":5.8,"y":21,"t":"The Smashing Machine"},{"x":86.2,"y":626,"t":"Fast Five"},{"x":41.0,"y":390,"t":"Independence Day: Resurgence"},{"x":45.0,"y":338,"t":"300: Rise of an Empire"},{"x":32.8,"y":252,"t":"Dark Phoenix"},{"x":54.6,"y":289,"t":"Divergent"},{"x":21.4,"y":409,"t":"Ice Age: Collision Course"},{"x":125.5,"y":786,"t":"Deadpool 2"},{"x":0.0,"y":28,"t":"Cirque du Soleil: Journey of M"},{"x":0.8,"y":1,"t":"Baahubali: The Epic"},{"x":75.0,"y":972,"t":"Despicable Me 4"},{"x":15.0,"y":96,"t":"Challengers"},{"x":1.7,"y":6,"t":"War 2"},{"x":71.3,"y":402,"t":"Eternals"},{"x":144.2,"y":761,"t":"Thor: Love and Thunder"},{"x":0.0,"y":15,"t":"Journey to the South Pacific"},{"x":59.3,"y":382,"t":"Monsters vs. Aliens"},{"x":10.0,"y":153,"t":"Dhurandhar: The Revenge"},{"x":75.4,"y":432,"t":"Shang-Chi and the Legend of th"},{"x":0.5,"y":3,"t":"Bade Miyan Chote Miyan"},{"x":0.7,"y":98,"t":"Deep Sea 3D"},{"x":38.5,"y":129,"t":"Mortal Kombat II"},{"x":34.6,"y":191,"t":"The Equalizer 3"},{"x":1.2,"y":30,"t":"The Disaster Artist"},{"x":1.2,"y":40,"t":"Thugs of Hindostan"},{"x":32.1,"y":186,"t":"Red One"},{"x":52.2,"y":262,"t":"A Quiet Place: Day One"},{"x":9.2,"y":40,"t":"Bloodshot"},{"x":0.6,"y":446,"t":"1917"},{"x":27.5,"y":196,"t":"Beowulf"},{"x":0.1,"y":1,"t":"One to One: John & Yoko"},{"x":10.3,"y":241,"t":"Assassin's Creed"},{"x":23.5,"y":363,"t":"Mary Poppins Returns"},{"x":45.4,"y":529,"t":"The Meg"},{"x":0.9,"y":26,"t":"Mobile Suit Gundam GQuuuuuuX: "},{"x":88.4,"y":1109,"t":"Skyfall"},{"x":160.9,"y":1085,"t":"The Dark Knight Rises"},{"x":0.2,"y":274,"t":"Evil Unbound"},{"x":39.1,"y":142,"t":"Onward"},{"x":0.1,"y":903,"t":"The Battle at Lake Changjin"},{"x":88.8,"y":415,"t":"Captain America: Brave New Wor"},{"x":0.0,"y":6,"t":"The Duelist"},{"x":0.0,"y":0,"t":"Search for the Great Sharks"},{"x":29.2,"y":261,"t":"The Lone Ranger"},{"x":41.3,"y":521,"t":"Kung Fu Panda 3"},{"x":0.0,"y":9,"t":"The Young and Prodigious T.S. "},{"x":6.5,"y":93,"t":"Animal"},{"x":29.7,"y":246,"t":"Dark Shadows"},{"x":4.0,"y":22,"t":"Ponniyin Selvan: I"},{"x":0.4,"y":2,"t":"The Colors Within"},{"x":116.1,"y":1025,"t":"Alice in Wonderland"},{"x":21.1,"y":87,"t":"Dragon Ball Super: Super Hero"},{"x":122.7,"y":855,"t":"Thor: Ragnarok"},{"x":0.3,"y":12,"t":"Beau Is Afraid"},{"x":6.9,"y":113,"t":"Pathaan"},{"x":3.6,"y":65,"t":"Babylon"},{"x":53.5,"y":368,"t":"Shazam!"},{"x":0.5,"y":215,"t":"Blades of The Guardians"},{"x":85.7,"y":645,"t":"Thor: The Dark World"},{"x":19.0,"y":127,"t":"Ad Astra"},{"x":8.3,"y":35,"t":"Warfare"},{"x":47.8,"y":387,"t":"Godzilla: King of the Monsters"},{"x":56.2,"y":529,"t":"Ralph Breaks the Internet"},{"x":6.4,"y":31,"t":"Amsterdam"},{"x":11.0,"y":290,"t":"Paddington 2"},{"x":12.5,"y":101,"t":"Life"},{"x":1.0,"y":4,"t":"Fighter"},{"x":6.1,"y":32,"t":"Jawan"},{"x":0.0,"y":1,"t":"Light & Life"},{"x":0.0,"y":23,"t":"Santa vs. the Snowman 3D"},{"x":80.5,"y":684,"t":"Project Hail Mary"},{"x":55.5,"y":711,"t":"Mission: Impossible – Rogue Na"},{"x":0.1,"y":3,"t":"Flying Swords of Dragon Gate"},{"x":32.7,"y":100,"t":"Where the Wild Things Are"},{"x":120.9,"y":1074,"t":"Toy Story 4"},{"x":54.7,"y":963,"t":"The Hobbit: The Battle of the "},{"x":27.3,"y":335,"t":"Journey 2: The Mysterious Isla"},{"x":33.2,"y":142,"t":"Tron: Ares"},{"x":65.6,"y":485,"t":"Teenage Mutant Ninja Turtles"},{"x":24.1,"y":206,"t":"The Conjuring: The Devil Made "},{"x":24.2,"y":288,"t":"Maze Runner: The Death Cure"},{"x":100.0,"y":1105,"t":"Transformers: Age of Extinctio"},{"x":11.2,"y":94,"t":"Ben-Hur"},{"x":51.6,"y":318,"t":"Final Destination Bloodlines"},{"x":61.0,"y":442,"t":"Transformers: Rise of the Beas"},{"x":107.0,"y":940,"t":"Minions: The Rise of Gru"},{"x":77.0,"y":2924,"t":"Avatar: Special Edition"},{"x":8.7,"y":52,"t":"Ambulance"},{"x":148.0,"y":1309,"t":"Jurassic World: Fallen Kingdom"},{"x":97.9,"y":1124,"t":"Transformers: Dark of the Moon"},{"x":69.4,"y":760,"t":"Maleficent"},{"x":19.7,"y":226,"t":"Hansel & Gretel: Witch Hunters"},{"x":35.0,"y":244,"t":"Sully"},{"x":57.2,"y":519,"t":"Ant-Man"},{"x":13.5,"y":91,"t":"Lee Cronin's The Mummy"},{"x":42.2,"y":206,"t":"Snow White"},{"x":0.5,"y":2,"t":"Thamma"},{"x":16.8,"y":135,"t":"American Made"},{"x":6.6,"y":78,"t":"Cats"},{"x":179.1,"y":1155,"t":"Captain America: Civil War"},{"x":0.8,"y":656,"t":"Pegasus 3"},{"x":182.7,"y":1243,"t":"Incredibles 2"},{"x":51.1,"y":403,"t":"Prometheus"},{"x":0.0,"y":11,"t":"Alienoid: Return to the Future"},{"x":44.5,"y":233,"t":"Disclosure Day"},{"x":84.4,"y":393,"t":"Solo: A Star Wars Story"},{"x":0.6,"y":10,"t":"The Young Black Stallion"},{"x":158.4,"y":1008,"t":"The Dark Knight"},{"x":60.3,"y":747,"t":"Madagascar 3: Europe's Most Wa"},{"x":24.9,"y":305,"t":"Skyscraper"},{"x":26.9,"y":300,"t":"Alice Through the Looking Glas"},{"x":16.7,"y":82,"t":"Catwoman"},{"x":13.1,"y":145,"t":"The Foreigner"},{"x":39.0,"y":635,"t":"Wonka"},{"x":162.8,"y":960,"t":"A Minecraft Movie"},{"x":0.8,"y":18,"t":"Mobile Suit Gundam: Hathaway"},{"x":125.0,"y":961,"t":"Harry Potter and the Deathly H"},{"x":8.6,"y":33,"t":"Borderlands"},{"x":20.4,"y":124,"t":"The Lego Ninjago Movie"},{"x":207.4,"y":1521,"t":"The Avengers"},{"x":17.8,"y":203,"t":"Need for Speed"},{"x":152.5,"y":695,"t":"The Hunger Games"},{"x":0.4,"y":263,"t":"Parasite"},{"x":0.3,"y":50,"t":"The Brutalist"},{"x":39.0,"y":167,"t":"Morbius"},{"x":1.1,"y":14,"t":"Sword Art Online Progressive: "},{"x":1.5,"y":12,"t":"Laal Singh Chaddha"},{"x":31.5,"y":226,"t":"Ford v Ferrari"},{"x":104.4,"y":876,"t":"The Secret Life of Pets"},{"x":0.5,"y":39,"t":"Nomadland"},{"x":7.7,"y":2267,"t":"Ne Zha 2"},{"x":10.7,"y":157,"t":"The Matrix Resurrections"},{"x":147.0,"y":541,"t":"Wicked: For Good"},{"x":0.1,"y":461,"t":"The Eight Hundred"},{"x":0.6,"y":22,"t":"Turning Red"},{"x":80.4,"y":380,"t":"Black Widow"},{"x":21.8,"y":44,"t":"Renaissance: A Film by Beyoncé"},{"x":21.7,"y":182,"t":"Nosferatu"},{"x":10.8,"y":55,"t":"Mercy"},{"x":33.5,"y":228,"t":"The Green Hornet"},{"x":10.6,"y":76,"t":"West Side Story"},{"x":10.7,"y":157,"t":"The Matrix"},{"x":33.5,"y":302,"t":"Wrath of the Titans"},{"x":88.4,"y":619,"t":"Logan"},{"x":25.5,"y":303,"t":"Battleship"},{"x":46.1,"y":206,"t":"The Marvels"},{"x":32.5,"y":348,"t":"The Maze Runner"},{"x":0.5,"y":534,"t":"The Revenant"},{"x":16.6,"y":163,"t":"The Beekeeper"},{"x":29.8,"y":286,"t":"Elysium"},{"x":97.2,"y":980,"t":"Michael"},{"x":27.3,"y":299,"t":"Real Steel"},{"x":3.0,"y":10,"t":"Kin"},{"x":60.2,"y":632,"t":"Kung Fu Panda"},{"x":53.7,"y":384,"t":"Cars 3"},{"x":10.2,"y":42,"t":"Overlord"},{"x":1.3,"y":42,"t":"Bang Bang!"},{"x":54.7,"y":571,"t":"Mission: Impossible – Dead Rec"},{"x":63.6,"y":208,"t":"Scream 7"},{"x":46.0,"y":353,"t":"Dumbo"},{"x":24.7,"y":110,"t":"10 Cloverfield Lane"},{"x":16.1,"y":140,"t":"Legend of the Guardians: The O"},{"x":8.6,"y":77,"t":"I, Frankenstein"},{"x":159.7,"y":891,"t":"Toy Story 5"},{"x":81.7,"y":341,"t":"The Mandalorian and Grogu"},{"x":31.2,"y":289,"t":"Elvis"},{"x":16.6,"y":103,"t":"Jigsaw"},{"x":18.6,"y":94,"t":"Speed Racer"},{"x":0.6,"y":22,"t":"Ski to the Max"},{"x":5.3,"y":18,"t":"Bears"},{"x":14.4,"y":59,"t":"Rock of Ages"},{"x":37.7,"y":208,"t":"Joker: Folie à Deux"},{"x":7.4,"y":19,"t":"Dear Evan Hansen"},{"x":102.7,"y":900,"t":"Harry Potter and the Goblet of"},{"x":48.0,"y":371,"t":"Sinners"},{"x":13.1,"y":75,"t":"Crimson Peak"},{"x":139.8,"y":1059,"t":"Moana 2"},{"x":49.5,"y":622,"t":"How to Train Your Dragon 2 (20"},{"x":56.2,"y":672,"t":"Big Hero 6"},{"x":51.1,"y":911,"t":"Bohemian Rhapsody"},{"x":33.0,"y":209,"t":"Tomorrowland"},{"x":32.8,"y":278,"t":"Blade Runner 2049"},{"x":0.0,"y":0,"t":"The Trip"},{"x":46.0,"y":322,"t":"Megamind"},{"x":8.3,"y":104,"t":"Wrath of Man"},{"x":0.0,"y":11,"t":"Back to the Future"},{"x":103.3,"y":968,"t":"The Jungle Book"},{"x":0.9,"y":192,"t":"Marty Supreme"},{"x":0.5,"y":128,"t":"Space Station 3D"},{"x":3.2,"y":10,"t":"The Alto Knights"}];
const OPENING_R=0.82;
const FRANCHISE={"fran_med":709,"std_med":108,"fran_n":117,"std_n":783};
const BYFRAN=[{"name":"Avatar","median":2923,"n":4,"total":9667},{"name":"Jurassic","median":1308,"n":4,"total":4851},{"name":"Lord of the Rings/Hobbit","median":962,"n":4,"total":2960},{"name":"Harry Potter/Wizarding","median":941,"n":8,"total":6961},{"name":"Marvel/MCU","median":773,"n":41,"total":35509},{"name":"Transformers","median":709,"n":7,"total":4951},{"name":"Fast & Furious","median":704,"n":5,"total":4092},{"name":"Hunger Games","median":695,"n":4,"total":2587},{"name":"Mission: Impossible","median":694,"n":5,"total":3399},{"name":"Godzilla/Kong","median":470,"n":7,"total":2719},{"name":"DC","median":391,"n":19,"total":9735},{"name":"Star Wars","median":340,"n":7,"total":2976}];
const SEASON=[{"m":"Jan","count":69,"median":52,"n":55},{"m":"Feb","count":78,"median":108,"n":51},{"m":"Mar","count":105,"median":152,"n":87},{"m":"Apr","count":77,"median":95,"n":52},{"m":"May","count":95,"median":336,"n":73},{"m":"Jun","count":97,"median":391,"n":77},{"m":"Jul","count":93,"median":373,"n":66},{"m":"Aug","count":80,"median":95,"n":54},{"m":"Sep","count":94,"median":123,"n":65},{"m":"Oct","count":92,"median":100,"n":71},{"m":"Nov","count":77,"median":261,"n":63},{"m":"Dec","count":85,"median":166,"n":59}];
const PYRAMID=[{"band":"$1B+","count":52},{"band":"$500M–1B","count":133},{"band":"$250–500M","count":158},{"band":"$100–250M","count":180},{"band":"$25–100M","count":144},{"band":"<$25M","count":233}];
const CONCENTRATION={"top10pct_share":40,"n":900,"total_bn":267.8};
const PROJECTION=[{"fmt":"Digital (xenon)","median":124,"n":770},{"fmt":"70mm film","median":400,"n":20},{"fmt":"Single laser","median":407,"n":90},{"fmt":"GT dual-laser","median":521,"n":20}];
const LEGS=[{"tier":"native","pct":15,"n":51},{"tier":"certified","pct":37,"n":55},{"tier":"dmr","pct":35,"n":614}];
const EFFICIENCY=[{"y":2001,"per_screen":8,"median_m":1},{"y":2002,"per_screen":21,"median_m":4},{"y":2003,"per_screen":125,"median_m":29},{"y":2004,"per_screen":343,"median_m":82},{"y":2005,"per_screen":1439,"median_m":375},{"y":2006,"per_screen":481,"median_m":134},{"y":2007,"per_screen":663,"median_m":196},{"y":2008,"per_screen":294,"median_m":93},{"y":2009,"per_screen":665,"median_m":267},{"y":2010,"per_screen":1053,"median_m":494},{"y":2011,"per_screen":391,"median_m":227},{"y":2012,"per_screen":440,"median_m":303},{"y":2013,"per_screen":318,"median_m":243},{"y":2014,"per_screen":408,"median_m":359},{"y":2015,"per_screen":295,"median_m":297},{"y":2016,"per_screen":262,"median_m":299},{"y":2017,"per_screen":223,"median_m":290},{"y":2018,"per_screen":200,"median_m":288},{"y":2019,"per_screen":161,"median_m":252},{"y":2020,"per_screen":43,"median_m":69},{"y":2021,"per_screen":57,"median_m":94},{"y":2022,"per_screen":51,"median_m":86},{"y":2023,"per_screen":76,"median_m":130},{"y":2024,"per_screen":60,"median_m":108},{"y":2025,"per_screen":14,"median_m":26},{"y":2026,"per_screen":45,"median_m":84}];
const INSTITUTIONAL=[{"y":2018,"inst_pct":5.8,"inst":84,"commercial":1359,"total":1443},{"y":2019,"inst_pct":5.4,"inst":82,"commercial":1423,"total":1505},{"y":2020,"inst_pct":5.0,"inst":81,"commercial":1543,"total":1624},{"y":2021,"inst_pct":4.6,"inst":76,"commercial":1574,"total":1650},{"y":2022,"inst_pct":4.3,"inst":72,"commercial":1611,"total":1683},{"y":2023,"inst_pct":4.1,"inst":71,"commercial":1645,"total":1716},{"y":2024,"inst_pct":3.8,"inst":67,"commercial":1705,"total":1772},{"y":2025,"inst_pct":3.4,"inst":61,"commercial":1746,"total":1807},{"y":2026,"inst_pct":3.1,"inst":58,"commercial":1806,"total":1864}];
const MINUTES_CORR={"r":0.02,"n":54};
const GLOSSARY=[{"term":"DMR","full":"Digital Media Remastering","def":"IMAX's proprietary process for converting a film NOT shot on IMAX cameras into an IMAX-compatible format. It upscales resolution, reduces grain and adjusts colour so an ordinary film looks acceptable blown up onto a giant screen. Introduced in 2002 with the re-release of Apollo 13 and Star Wars: Episode II. The image keeps its original shape — DMR makes the picture bigger, not taller."},{"term":"Native / 15/70","full":"15-perforation 70mm film","def":"The original 'true' IMAX film format: 70mm-wide film running horizontally through the projector, each frame 15 perforations wide — the largest film frame in commercial cinema. Extremely rare today; only 10–20 venues worldwide still project full features this way. An Interstellar 70mm print weighs over 270kg."},{"term":"Certified digital","full":"IMAX-certified digital capture","def":"Films shot on digital cameras that IMAX has approved as meeting its image standard. They can open up to the taller 1.90:1 IMAX ratio for key scenes, but have no physical film negative. Most modern 'Filmed for IMAX' blockbusters fall here."},{"term":"GT Laser","full":"Grand Theatre dual-laser projector","def":"IMAX's top-tier projection system: two 4K laser projectors working together, the only digital setup that can show the full 1.43:1 aspect ratio. Introduced in 2015. Brighter, sharper and higher-contrast than the older xenon-lamp systems."},{"term":"CoLa / XT","full":"Commercial Laser / single-projector laser","def":"Single-projector IMAX laser systems (CoLa and XT), limited to the 1.90:1 ratio — they cannot open to the full 1.43:1 frame that dual GT-Laser and 15/70 film venues can. This is why the same film shows more picture in some IMAX cinemas than others."},{"term":"Aspect ratio (1.43 / 1.90 / 2.39)","full":"the shape of the projected image","def":"How tall the picture is relative to its width. Standard cinema 'scope' is 2.39:1 — wide and short. IMAX opens the frame VERTICALLY: 1.90:1 shows ~26% more image height, and the full 1.43:1 fills a giant screen top-to-bottom. IMAX gives you a taller image, not a wider one."},{"term":"PLF","full":"Premium Large Format","def":"The umbrella term (coined by exhibition analysts in the 2010s) for branded big-screen, big-sound auditoriums charging a ticket surcharge. Includes IMAX, Dolby Cinema, Cinemark XD, Regal RPX, ScreenX and 4DX. IMAX dislikes the label — it positions itself as an end-to-end technology company, not just a screen."},{"term":"Dolby Cinema","full":"Dolby's premium-format brand","def":"IMAX's main premium-format rival, launched 2014. Combines Dolby Vision (high-dynamic-range dual-4K laser projection, contrast over 1,000,000:1) with Dolby Atmos object-based sound. Unlike IMAX it doesn't emphasise a taller frame — it competes on contrast, colour and audio."},{"term":"ScreenX / 4DX","full":"panoramic & motion premium formats","def":"Two format add-ons (from Korean company CJ 4DPLEX). ScreenX projects onto the side walls for a 270° panoramic image; 4DX adds moving seats, wind, water and scent. Films can stack these on top of an IMAX release."},{"term":"Filmed for IMAX","full":"IMAX's capture-certification programme","def":"A marketing label for films shot wholly or partly on IMAX-approved cameras (film or certified digital), as opposed to DMR-converted afterwards. These are the films that actually open up to a taller frame in IMAX venues."},{"term":"SEC / EDGAR","full":"U.S. Securities and Exchange Commission / its filings database","def":"The U.S. financial regulator. Public companies file audited annual and quarterly reports with it; those filings are published in a database called EDGAR. IMAX Corporation's screen counts and reported financials on this page come from these filings — the most authoritative public source."},{"term":"GBO","full":"gross box office","def":"Total ticket revenue a film earns, before splitting with cinemas and before subtracting costs. 'Worldwide GBO' sums domestic (US & Canada) and international. Not adjusted for inflation on this page."},{"term":"ROI","full":"return on investment","def":"Here, worldwide gross box office divided by production budget — a rough measure of commercial efficiency. It ignores marketing spend and the studio's share, so it overstates true profit, but it is comparable across films."},{"term":"TMDB","full":"The Movie Database","def":"A community-maintained public film database. Production budgets and original-language data on this page are sourced from it where studio figures are not disclosed."}];
const IMMERSION=[{"t":"The Odyssey","y":"2026","frac":100,"g":22,"fm":null,"tot":null},{"t":"Dunkirk","y":"2017","frac":75,"g":550,"fm":79,"tot":106},{"t":"Project Hail Mary","y":"2026","frac":75,"g":684,"fm":117,"tot":157},{"t":"Tenet","y":"2020","frac":50,"g":377,"fm":75,"tot":150},{"t":"The Dark Knight Rises","y":"2012","frac":44,"g":1085,"fm":72,"tot":164},{"t":"The Mandalorian and Grogu","y":"2026","frac":40,"g":341,"fm":53,"tot":132},{"t":"Interstellar","y":"2014","frac":39,"g":764,"fm":66,"tot":169},{"t":"Dune","y":"2021","frac":39,"g":411,"fm":60,"tot":155},{"t":"Nope","y":"2022","frac":38,"g":171,"fm":49,"tot":130},{"t":"Joker: Folie à Deux","y":"2024","frac":36,"g":208,"fm":54,"tot":148},{"t":"The Hunger Games: Catching Fire","y":"2013","frac":35,"g":865,"fm":48,"tot":136},{"t":"Lightyear","y":"2022","frac":26,"g":226,"fm":27,"tot":105},{"t":"Dune: Part Two","y":"2024","frac":24,"g":715,"fm":40,"tot":166},{"t":"Oppenheimer","y":"2023","frac":22,"g":976,"fm":40,"tot":180},{"t":"Sinners","y":"2025","frac":20,"g":371,"fm":28,"tot":137},{"t":"Mission: Impossible – Ghost Protocol","y":"2011","frac":19,"g":695,"fm":25,"tot":133},{"t":"The Lion King","y":"2019","frac":19,"g":1662,"fm":23,"tot":118},{"t":"The Dark Knight","y":"2008","frac":18,"g":1008,"fm":28,"tot":152},{"t":"Batman v Superman: Dawn of Justice","y":"2016","frac":18,"g":874,"fm":27,"tot":151},{"t":"No Time to Die","y":"2021","frac":12,"g":774,"fm":20,"tot":163},{"t":"First Man","y":"2018","frac":7,"g":106,"fm":10,"tot":141},{"t":"Transformers: Revenge of the Fallen","y":"2009","frac":6,"g":836,"fm":9,"tot":150},{"t":"The Fantastic 4: First Steps","y":"2025","frac":5,"g":null,"fm":6,"tot":114},{"t":"Star Wars: The Force Awakens","y":"2015","frac":4,"g":161,"fm":5,"tot":135},{"t":"Eternals","y":"2021","frac":4,"g":402,"fm":6,"tot":156},{"t":"Megalopolis","y":"2024","frac":4,"g":14,"fm":5,"tot":138}];
const DOLBY={"both_med":372,"imax_med":125,"both_n":130,"imax_n":770,"overlap":135,"dolby_total":179,"dual":[{"y":2014,"pct":0,"n":0},{"y":2015,"pct":0,"n":0},{"y":2016,"pct":0,"n":0},{"y":2017,"pct":1,"n":1},{"y":2018,"pct":6,"n":5},{"y":2019,"pct":11,"n":7},{"y":2020,"pct":10,"n":4},{"y":2021,"pct":11,"n":8},{"y":2022,"pct":26,"n":18},{"y":2023,"pct":31,"n":25},{"y":2024,"pct":17,"n":17},{"y":2025,"pct":24,"n":27},{"y":2026,"pct":31,"n":23}]};
const STACKING=[{"n":0,"count":394,"median":29},{"n":1,"count":240,"median":167},{"n":2,"count":207,"median":393},{"n":3,"count":59,"median":522}];
const ERA3D=[{"era":"2010–14","d3":411,"non":212},{"era":"2015–19","d3":393,"non":149},{"era":"2020–26","d3":432,"non":50}];
const DECADE=[{"era":"pre-2005","median":13,"n":68},{"era":"05–09","median":185,"n":55},{"era":"10–14","median":303,"n":138},{"era":"15–19","median":260,"n":243},{"era":"20–26","median":88,"n":396}];
const TIERS=[{"k":"shotfilm","name":"IMAX 70mm","desc":"Shot on IMAX 70mm film cameras (15 perforations per frame). The negative is far larger than the projected image. Presented in IMAX’s Expanded Aspect Ratio (1.43:1) — the tallest, sharpest picture available.","n":26,"ngross":23,"median":549,"ex":["Captain America: Civil War","Transformers: Age of Extin","The Dark Knight Rises"]},{"k":"certdig","name":"Filmed for IMAX","desc":"Shot on IMAX-certified digital cameras, such as the ARRI Alexa IMAX. Opens to the Expanded Aspect Ratio (1.90:1) for key scenes, but has no film negative.","n":110,"ngross":81,"median":440,"ex":["James Cameron's Avatar","Avengers: Endgame","Avengers: Infinity War"]},{"k":"dmr","name":"IMAX DMR","desc":"Shot on standard cameras, then converted with IMAX DMR (Digital Media Remastering). The image is upscaled and sharpened for the big screen, but keeps its original aspect ratio. This is most IMAX releases.","n":973,"ngross":711,"median":160,"ex":["Avatar: Special Edition","Avatar: The Way of Water","Ne Zha 2"]},{"k":"native","name":"IMAX 70mm (museum originals)","desc":"The original IMAX format: documentaries made in 70mm film for science-museum domes. Technically the purest IMAX, but small commercial releases.","n":297,"ngross":85,"median":6,"ex":["The Lion King","How to Train Your Dragon","The Mandalorian and Grogu"]}];
const ASPECTS=[{"r":"1.43","n":38,"note":"full-height frame \u2014 43% more image than scope","film":"Oppenheimer, Dunkirk"},{"r":"1.90","n":93,"note":"the digital-IMAX shape \u2014 26% taller than scope","film":"most Marvel IMAX"},{"r":"2.39","n":3,"note":"cinemascope \u2014 black bars remain top and bottom","film":"a few scope titles"}];
const CATMED={"dmr":162,"native":13,"certified":415};
const GEO_H2H=[{"country": "United States", "imax": 181, "dolby": 178}, {"country": "China", "imax": 69, "dolby": 41}, {"country": "Japan", "imax": 29, "dolby": 11}, {"country": "France", "imax": 22, "dolby": 13}, {"country": "South Korea", "imax": 16, "dolby": 14}, {"country": "United Kingdom", "imax": 20, "dolby": 8}, {"country": "Canada", "imax": 28, "dolby": 0}, {"country": "Saudi Arabia", "imax": 8, "dolby": 7}, {"country": "India", "imax": 11, "dolby": 4}, {"country": "Netherlands", "imax": 6, "dolby": 5}, {"country": "Germany", "imax": 5, "dolby": 6}, {"country": "Taiwan", "imax": 5, "dolby": 6}];
const GEO_REG=[{"region": "Americas", "n": 220}, {"region": "Asia", "n": 182}, {"region": "Europe", "n": 83}, {"region": "Oceania", "n": 5}, {"region": "Africa", "n": 2}];
const GEO_FMT=[{"fmt": "IMAX 1.90 (Digital)", "n": 372}, {"fmt": "IMAX 1.43 (True/GT)", "n": 84}, {"fmt": "IMAX Dome", "n": 26}, {"fmt": "Other/Unknown", "n": 10}];
const GEO_143=[{"country": "United States", "n": 33}, {"country": "Canada", "n": 15}, {"country": "China", "n": 8}, {"country": "United Kingdom", "n": 6}, {"country": "France", "n": 3}, {"country": "Japan", "n": 2}, {"country": "Thailand", "n": 2}, {"country": "Germany", "n": 2}];
const GEO_TOT=492;const GEO_143N=84;const GEO_DOLBY_TOT=308;
const GEO_SIZE=[{"fmt":"IMAX 70mm (1.43:1)","area":447,"h":18.3,"w":24.6,"n":83},{"fmt":"Filmed for IMAX (1.90:1)","area":197,"h":10.5,"w":19.0,"n":257}];
const DEC_FUNNEL=[{"stage":"Released in IMAX theatres","n":1406,"note":"the full slate, 1994–2026"},{"stage":"Shot with IMAX / large-format cameras","n":408,"note":"the rest are DMR post-conversions"},{"stage":"Used the full 1.43 frame","n":38,"note":"designed for the tallest screens"}];
const DEC_BUDGET=[{"grp":"DMR-only (converted)","med":85},{"grp":"Camera-shot","med":165}];
const ECON_GBO=[{"t":"2002-11","m":17.2},{"t":"2003-05","m":7.6},{"t":"2004-02","m":7.6},{"t":"2005-05","m":1.5},{"t":"2008-03","m":5.2},{"t":"2009-05","m":29.9},{"t":"2009-08","m":84.2},{"t":"2009-11","m":57.6},{"t":"2010-03","m":101.0},{"t":"2010-04","m":232.2},{"t":"2010-07","m":114.6},{"t":"2010-10","m":97.7},{"t":"2011-04","m":62.1},{"t":"2011-07","m":107.7},{"t":"2011-10","m":149.3},{"t":"2012-02","m":97.6},{"t":"2012-04","m":121.7},{"t":"2012-07","m":173.5},{"t":"2012-10","m":173.2},{"t":"2013-02","m":152.0},{"t":"2013-04","m":128.7},{"t":"2013-07","m":219.7},{"t":"2014-02","m":244.5},{"t":"2014-04","m":138.5},{"t":"2014-07","m":216.0},{"t":"2014-10","m":169.0},{"t":"2015-02","m":226.9},{"t":"2015-04","m":165.6},{"t":"2015-07","m":343.0},{"t":"2015-10","m":189.8},{"t":"2016-02","m":288.4},{"t":"2016-04","m":272.0},{"t":"2016-07","m":260.8},{"t":"2016-10","m":186.3},{"t":"2017-02","m":246.5},{"t":"2017-04","m":212.1},{"t":"2017-07","m":268.9},{"t":"2018-02","m":278.1},{"t":"2018-10","m":206.5},{"t":"2019-02","m":236.7},{"t":"2019-04","m":256.3},{"t":"2019-07","m":364.9},{"t":"2019-10","m":246.1},{"t":"2022-04","m":173.2},{"t":"2022-07","m":247.7},{"t":"2022-10","m":177.1},{"t":"2023-04","m":273.4},{"t":"2023-07","m":268.3},{"t":"2023-10","m":347.1},{"t":"2024-04","m":261.0},{"t":"2024-07","m":196.0},{"t":"2025-07","m":281.1},{"t":"2025-10","m":367.6}];
const MAP_DATA={"paths":[{"n":"Fiji","d":"M1000.0,294.6 1000.0,296.0 998.2,296.7 996.5,297.3 996.1,296.2 997.5,295.6 998.4,295.5 1000.0,294.6ZM994.8,298.6 995.5,298.2 996.4,299.0 996.0,300.4 994.3,300.8 992.7,300.5 992.5,299.2 993.5,298.3 994.8,298.6ZM0.6,294.5 0.2,295.8 0.0,296.0 0.0,294.6 0.6,294.5Z","i":0,"y":0},{"n":"Tanzania","d":"M594.2,252.6 594.6,252.9 604.7,258.6 604.9,260.2 608.9,263.0 607.6,266.4 607.8,268.0 609.6,269.0 609.6,269.7 608.9,271.4 609.0,272.2 608.9,273.6 609.8,275.3 611.0,278.1 612.0,278.7 612.0,278.7 609.8,280.3 606.7,281.3 605.1,281.3 604.1,282.1 602.2,282.2 601.4,282.6 598.1,281.8 596.0,282.0 595.2,278.2 594.3,276.9 593.7,276.2 591.0,275.6 589.4,274.8 587.7,274.3 586.5,273.9 585.4,273.2 585.4,273.2 583.9,269.7 582.3,268.1 581.7,266.5 582.0,265.1 581.5,262.5 582.6,262.4 583.7,261.4 584.7,259.9 585.4,259.3 585.4,258.4 584.8,257.8 584.6,256.7 584.6,256.7 585.4,256.4 585.6,254.7 584.5,253.2 585.5,252.8 588.5,252.9 594.2,252.6Z","i":0,"y":0},{"n":"W. Sahara","d":"M475.9,173.2 475.9,173.4 475.9,173.9 475.9,178.1 466.8,178.0 466.8,185.1 464.2,185.3 463.6,186.7 464.1,190.8 453.2,190.7 452.6,191.7 452.7,190.5 452.8,190.5 459.0,190.3 459.4,189.3 460.5,188.0 461.4,184.2 465.3,181.2 466.6,177.7 467.4,177.5 468.4,175.3 470.7,175.0 471.7,175.4 473.0,175.4 473.9,174.8 475.6,174.7 475.5,173.2 475.9,173.2Z","i":0,"y":0},{"n":"Canada","d":"M158.8,113.9 158.4,113.9 153.0,111.2 151.0,110.0 146.0,108.8 144.5,106.3 144.9,104.6 141.3,103.5 140.8,101.2 137.5,99.2 137.4,97.8 137.4,97.8 138.9,96.4 138.9,94.7 134.1,92.9 131.3,89.7 129.6,87.7 127.0,86.5 125.2,85.4 123.7,83.9 120.9,84.8 118.2,86.4 115.7,84.5 113.8,83.3 111.1,82.6 108.3,82.5 108.4,66.7 108.4,56.4 108.4,56.4 113.6,57.0 117.9,58.4 120.8,58.6 123.3,57.5 126.6,56.6 130.8,56.9 134.9,55.7 139.5,55.0 141.4,56.2 143.4,55.5 144.1,54.2 146.0,54.5 150.7,57.0 154.4,55.1 154.8,57.2 158.2,56.8 159.2,56.0 162.6,56.1 166.8,57.3 173.3,58.3 177.1,58.8 179.9,58.6 183.6,60.0 179.7,61.4 184.7,62.0 192.2,61.6 194.6,61.2 197.6,62.8 200.6,61.4 197.7,60.2 199.5,59.3 202.9,59.2 205.1,58.9 207.4,59.6 210.2,61.1 213.3,60.8 218.2,62.1 222.5,61.7 226.5,61.7 226.2,60.0 228.7,59.5 233.0,60.4 233.0,63.1 234.8,60.9 237.0,60.9 238.2,58.1 235.3,56.4 232.0,55.3 232.2,52.2 235.5,50.2 239.2,50.7 242.0,51.9 245.8,55.0 243.3,56.4 248.5,57.0 248.5,59.8 252.2,57.6 255.5,59.4 254.7,61.5 257.4,63.3 260.3,61.3 262.3,58.9 262.4,55.9 266.4,56.1 270.5,56.5 274.2,57.9 274.4,59.3 272.3,60.7 274.3,62.2 273.9,63.6 268.5,65.5 264.6,66.0 261.8,65.1 260.9,66.5 258.2,68.9 257.4,70.1 254.2,71.9 250.2,72.1 248.0,73.3 247.9,75.1 244.6,75.5 241.2,77.7 238.2,80.8 237.1,83.0 237.0,86.3 241.1,86.7 242.3,89.3 243.6,91.4 247.5,90.9 252.7,92.1 255.4,93.1 257.4,94.4 260.9,95.2 263.9,96.4 268.4,96.5 271.5,96.8 271.0,99.2 271.9,102.0 273.9,105.1 278.0,107.8 280.2,106.9 281.7,104.0 280.2,99.6 278.3,98.1 282.7,96.8 285.8,94.9 287.4,93.0 287.2,91.1 285.3,88.7 281.9,86.7 285.2,83.7 284.0,81.2 283.0,76.9 285.0,76.2 289.7,77.0 292.6,77.3 294.9,76.5 297.5,77.5 300.9,79.1 301.7,80.2 306.7,80.4 306.6,82.7 307.5,86.2 310.1,86.7 312.1,88.3 316.1,86.8 318.8,83.7 320.6,82.4 322.8,84.9 326.4,88.4 329.5,91.8 328.3,93.5 332.0,95.1 334.5,96.7 339.0,97.4 340.7,98.3 341.8,100.6 344.0,101.0 345.1,102.0 345.3,105.1 343.3,106.2 341.3,107.2 336.7,108.2 333.2,110.4 328.5,110.9 322.6,110.3 318.4,110.3 315.6,110.5 313.2,112.5 309.7,113.7 305.7,117.4 302.5,119.9 304.8,119.5 309.3,115.8 315.1,113.5 319.3,113.2 321.7,114.6 319.1,116.5 320.0,119.5 320.9,121.6 324.5,122.9 329.1,122.5 331.9,119.4 332.1,121.4 333.9,122.4 330.4,124.3 324.3,125.9 321.5,127.0 318.4,129.0 316.3,128.8 316.2,126.5 321.0,124.2 316.6,124.3 313.5,124.6 311.7,123.0 311.7,119.3 310.5,118.5 308.6,118.9 307.7,118.2 305.6,120.3 304.7,122.5 303.7,123.7 302.5,124.2 301.7,124.3 301.4,125.0 296.3,125.0 292.0,125.0 290.8,125.5 287.8,127.5 287.5,127.7 286.6,128.8 284.1,128.8 281.3,128.8 280.1,129.3 280.5,129.8 280.8,130.7 280.7,130.9 277.1,132.3 274.2,132.8 271.0,134.2 270.3,134.2 269.4,133.8 269.1,133.4 269.1,133.1 269.7,132.1 271.0,130.6 271.8,129.0 271.3,126.6 270.7,124.0 267.8,122.7 268.1,122.2 267.7,121.9 267.0,121.9 266.4,121.5 266.3,120.8 265.7,121.1 265.0,121.0 265.2,120.7 264.5,120.5 264.2,119.7 262.1,118.8 259.8,117.9 257.1,116.8 254.5,115.8 252.0,116.6 251.1,116.6 247.7,115.9 245.4,116.3 242.8,115.4 239.9,115.0 238.0,114.8 237.1,114.3 236.6,112.8 235.7,112.8 235.7,113.9 229.9,113.9 220.4,113.9 211.0,113.9 202.6,113.9 194.3,113.9 186.1,113.9 177.6,113.9 174.9,113.9 166.7,113.9 158.8,113.9ZM266.7,76.5 268.7,75.2 272.6,75.3 272.5,75.8 269.3,77.3 267.3,77.3 266.7,76.5ZM278.4,47.8 275.3,46.3 275.5,45.3 276.8,45.1 283.2,45.4 287.9,46.9 288.2,47.7 285.2,47.6 282.2,47.6 279.2,47.9 278.4,47.8ZM276.9,77.5 278.0,76.7 279.1,76.8 279.8,77.3 278.7,78.8 277.5,78.6 276.8,77.7 276.9,77.5ZM240.0,41.7 238.5,42.8 234.4,42.6 231.1,41.9 232.5,40.6 236.5,39.9 239.0,40.8 240.0,41.7ZM239.3,34.7 238.1,34.7 232.9,34.6 232.1,33.8 237.7,33.8 239.7,34.3 239.3,34.7ZM231.2,31.2 234.6,32.2 233.8,33.2 229.7,33.7 227.4,33.1 226.2,32.1 226.0,30.9 229.6,31.0 231.2,31.2ZM255.1,43.4 250.7,43.0 243.3,42.1 242.3,40.6 242.0,39.2 239.2,38.0 233.4,37.7 230.2,36.8 231.3,35.7 237.0,35.8 240.1,36.7 245.5,36.7 247.9,37.6 247.3,38.7 250.5,39.3 252.3,40.0 256.0,40.1 260.1,40.3 264.5,39.7 270.1,39.5 274.6,39.7 277.6,40.7 278.2,41.9 276.5,42.6 272.4,43.2 268.8,42.9 260.8,43.3 255.1,43.4ZM190.9,32.9 194.8,33.3 193.9,34.2 188.7,35.0 184.6,34.1 186.9,33.2 190.9,32.9ZM191.8,31.1 195.4,31.7 192.0,32.2 187.4,32.2 187.4,31.8 190.3,31.0 191.8,31.1ZM345.6,107.5 344.1,109.2 342.2,111.6 344.0,110.7 345.9,111.3 344.9,112.3 347.4,113.0 348.7,112.3 351.5,113.2 350.6,115.2 352.5,114.8 352.9,116.2 353.8,118.0 352.6,120.4 351.3,120.5 349.5,120.0 350.1,117.7 349.3,117.4 346.1,119.8 344.5,119.7 346.4,118.4 343.7,117.7 340.8,117.9 335.4,117.8 334.9,116.9 336.7,116.0 335.5,115.2 337.8,113.5 340.7,109.1 342.4,107.5 344.8,106.6 346.1,106.7 345.6,107.5ZM267.0,69.1 270.0,70.1 273.2,71.0 273.5,72.3 275.5,72.1 277.5,73.0 275.0,73.9 270.7,73.2 269.1,71.9 266.4,73.4 262.4,74.9 261.5,73.2 257.7,73.5 260.1,72.1 260.5,69.9 261.4,67.4 263.4,67.6 264.0,68.8 265.4,68.4 267.0,69.1ZM281.2,49.0 283.8,47.9 290.0,49.3 293.8,50.6 294.2,51.9 299.3,51.2 302.2,53.0 308.9,54.1 311.3,55.2 314.0,57.8 308.9,59.1 315.4,60.9 319.8,61.5 323.8,64.1 328.2,64.3 327.3,66.2 322.4,69.4 319.0,68.3 314.7,65.6 311.1,65.9 310.7,67.5 313.6,69.1 317.4,70.4 318.6,71.2 320.4,73.9 319.4,75.9 315.9,75.2 308.9,72.9 312.9,75.3 315.8,77.0 316.2,78.0 308.7,76.9 302.7,75.2 299.3,73.9 300.3,73.1 296.2,71.7 292.1,70.3 292.2,71.1 284.1,71.6 281.8,70.6 283.6,68.6 288.8,68.5 294.6,68.2 293.6,67.2 294.6,65.8 298.2,63.1 297.4,61.9 296.4,60.9 292.1,59.6 286.5,58.6 288.3,57.9 285.3,56.2 282.9,56.0 280.7,55.1 279.2,55.9 274.2,56.3 264.0,55.6 258.2,54.8 253.7,54.4 251.4,53.4 254.3,52.2 250.3,52.2 249.4,49.3 251.6,46.9 254.4,45.7 261.6,45.0 259.5,46.8 261.7,48.5 264.3,46.3 271.3,45.1 276.1,48.0 275.7,49.8 281.2,49.0ZM237.5,44.1 243.3,44.2 248.6,44.8 244.4,47.3 241.1,47.9 238.1,49.9 235.0,49.8 233.2,47.4 233.3,46.0 234.7,44.8 237.5,44.1ZM158.7,38.6 158.7,38.6 163.5,36.5 169.2,34.7 173.4,34.7 177.2,34.3 176.8,36.5 174.7,37.4 172.1,37.6 166.9,38.7 162.5,39.2 158.7,38.6ZM131.4,99.9 134.0,99.7 133.2,102.8 135.6,105.1 134.5,105.0 132.8,103.8 131.8,102.5 130.4,101.6 129.9,100.4 130.1,99.5 131.4,99.9ZM207.0,29.7 212.4,30.1 219.9,31.1 222.1,32.4 223.1,33.6 218.6,33.3 214.0,32.4 207.8,32.3 210.5,31.5 207.2,30.8 207.0,29.7ZM156.9,115.2 155.5,115.6 151.0,114.4 150.1,113.4 147.6,112.4 147.1,111.6 144.3,111.1 143.2,109.6 143.4,109.0 146.4,109.6 148.1,110.0 150.7,110.3 151.6,111.2 153.0,112.6 155.8,113.7 156.9,115.2ZM162.4,43.2 166.4,43.8 173.5,43.9 176.2,44.7 179.1,45.9 175.6,46.6 168.8,48.6 165.4,50.5 165.4,51.7 158.1,53.1 156.6,51.8 150.2,50.4 151.4,49.2 153.3,47.2 155.7,45.3 153.0,43.6 162.4,43.2ZM200.5,39.3 203.0,38.9 205.9,39.0 206.4,40.3 204.7,41.7 195.3,42.1 188.3,43.3 184.0,43.3 183.7,42.4 189.5,41.2 176.9,41.5 173.0,41.0 176.8,38.3 179.4,37.6 187.2,38.5 192.2,40.1 197.0,40.4 193.1,37.7 195.6,36.7 198.5,37.0 199.4,38.3 200.5,39.3ZM204.1,47.0 207.2,48.1 209.0,50.8 209.8,52.8 214.5,54.2 219.5,55.5 219.2,56.7 214.6,56.9 216.4,58.0 215.5,59.0 210.4,58.6 205.7,57.8 202.4,58.0 197.2,58.9 190.2,59.4 185.2,59.6 183.7,58.3 179.9,57.6 177.5,57.9 174.1,55.7 175.9,55.4 180.2,54.9 184.1,55.0 187.7,54.5 182.4,53.9 176.4,54.1 172.5,54.1 171.0,53.0 177.5,51.9 173.2,52.0 168.3,51.2 170.7,49.1 172.6,48.0 180.0,46.3 182.9,46.9 181.5,48.2 187.7,47.3 191.5,48.7 194.7,47.3 197.2,48.2 199.5,51.0 200.9,49.8 198.9,47.0 201.3,46.6 204.1,47.0ZM221.0,48.0 217.9,46.2 221.2,44.9 224.5,45.5 229.5,45.1 230.2,45.9 227.6,47.2 231.8,48.4 231.3,50.9 226.8,52.0 224.1,51.8 222.2,50.7 215.3,48.6 215.3,47.7 221.0,48.0ZM203.9,45.6 207.6,45.4 209.7,46.1 207.3,47.9 202.9,45.9 203.9,45.6ZM226.4,36.9 228.5,38.2 228.6,39.6 227.3,41.7 222.8,42.0 219.8,41.5 219.8,39.9 215.3,40.1 215.1,38.0 218.1,38.0 222.3,37.1 226.2,37.3 226.4,36.9ZM233.3,26.1 235.2,25.3 238.1,25.1 236.8,24.4 243.3,24.3 246.9,25.8 251.5,26.4 256.1,26.9 258.3,28.7 261.6,29.6 257.8,30.4 252.7,32.5 247.8,32.7 242.0,32.4 239.0,31.2 239.1,30.2 241.3,29.5 236.2,29.5 233.1,28.6 231.4,27.3 233.3,26.1ZM245.6,22.5 249.7,22.0 253.0,21.9 258.4,21.4 262.5,20.4 265.9,20.6 268.9,21.3 271.1,19.8 274.7,19.4 279.7,19.1 288.2,19.0 289.7,19.3 297.7,18.8 303.7,19.0 309.7,19.1 317.1,19.4 323.1,19.7 328.2,20.5 328.1,21.2 321.3,22.4 314.6,23.0 312.1,23.6 318.1,23.6 311.6,25.3 307.0,26.1 302.3,28.3 296.5,28.8 294.8,29.4 286.4,29.7 290.2,30.0 288.3,30.5 290.6,31.9 287.9,32.8 283.6,33.6 282.3,34.7 278.4,35.5 278.8,36.2 283.6,36.0 283.6,36.7 276.2,38.4 269.0,37.6 260.8,38.1 256.7,37.7 251.4,37.6 251.1,36.2 256.2,35.6 254.8,33.6 256.5,33.4 264.0,34.6 260.2,32.8 255.7,32.3 257.9,31.2 262.8,30.6 263.6,29.6 259.7,28.5 258.5,27.1 266.1,27.2 268.3,27.5 272.6,26.5 266.4,26.2 256.7,26.3 251.8,25.4 249.4,24.3 246.2,23.5 245.6,22.5ZM291.1,62.7 289.3,63.5 286.1,63.6 285.5,62.3 286.6,60.7 289.2,60.3 291.3,61.1 291.4,62.3 291.1,62.7ZM232.6,57.0 234.3,58.0 232.6,59.0 228.8,58.2 226.6,58.5 222.8,57.2 225.2,56.4 227.2,55.2 230.1,55.9 231.8,56.4 232.6,57.0ZM320.8,111.5 321.7,111.2 325.4,111.9 328.2,113.1 328.3,113.6 327.0,113.6 323.4,112.8 320.8,111.5ZM322.2,119.3 323.2,120.7 325.2,121.1 327.7,121.0 326.4,122.1 325.3,122.3 321.8,121.1 321.1,120.2 322.2,119.3Z","i":28,"y":0},{"n":"United States of America","d":"M158.8,113.9 166.7,113.9 174.9,113.9 177.6,113.9 186.1,113.9 194.3,113.9 202.6,113.9 211.0,113.9 220.4,113.9 229.9,113.9 235.7,113.9 235.7,112.8 236.6,112.8 237.1,114.3 238.0,114.8 239.9,115.0 242.8,115.4 245.4,116.3 247.7,115.9 251.1,116.6 252.0,116.6 254.5,115.8 257.1,116.8 259.8,117.9 262.1,118.8 264.2,119.7 264.5,120.5 265.2,120.7 265.0,121.0 265.7,121.1 266.3,120.8 266.4,121.5 267.0,121.9 267.7,121.9 268.1,122.2 267.8,122.7 270.7,124.0 271.3,126.6 271.8,129.0 271.0,130.6 269.7,132.1 269.1,133.1 269.1,133.4 269.4,133.8 270.3,134.2 271.0,134.2 274.2,132.8 277.1,132.3 280.7,130.9 280.8,130.7 280.5,129.8 280.1,129.3 281.3,128.8 284.1,128.8 286.6,128.8 287.5,127.7 287.8,127.5 290.8,125.5 292.0,125.0 296.3,125.0 301.4,125.0 301.7,124.3 302.5,124.2 303.7,123.7 304.7,122.5 305.6,120.3 307.7,118.2 308.6,118.9 310.5,118.5 311.7,119.3 311.7,123.0 313.5,124.6 314.0,125.5 311.0,126.9 308.2,127.8 305.2,128.7 303.8,130.3 303.3,130.9 303.3,132.4 304.2,133.9 305.3,133.9 305.0,132.9 305.9,133.5 305.7,134.3 303.8,134.8 302.4,134.7 300.4,135.2 299.2,135.4 297.6,135.5 295.2,136.3 299.3,135.8 300.2,136.3 296.3,137.1 294.5,137.1 294.6,136.8 293.7,137.6 294.5,137.7 293.9,139.7 291.9,141.8 291.7,141.1 291.1,141.0 290.2,140.3 290.8,141.8 291.5,142.3 291.5,143.3 290.6,144.4 289.1,146.6 288.8,146.5 289.7,144.6 288.2,143.6 287.9,141.3 287.4,142.5 288.0,144.2 286.1,143.8 288.1,144.7 288.2,147.3 289.0,147.5 289.3,148.5 289.6,151.2 287.9,153.3 285.0,154.1 283.2,155.8 281.8,155.9 280.4,157.0 280.0,157.9 276.9,159.7 275.4,161.0 274.1,162.7 273.6,164.6 274.1,166.6 275.1,168.9 276.3,170.9 276.3,172.1 277.6,175.3 277.5,177.2 277.4,178.3 276.7,180.0 275.9,180.3 274.5,180.0 274.1,178.8 273.0,178.1 271.6,175.8 270.3,173.6 269.8,172.5 270.4,170.7 269.6,169.2 267.5,166.8 266.4,166.4 263.6,167.7 263.1,167.5 261.7,166.2 260.0,165.6 256.9,165.9 254.4,165.6 252.3,165.8 251.1,166.2 251.6,167.0 251.6,168.1 252.2,168.6 251.6,169.0 250.6,168.6 249.6,169.1 247.6,169.0 245.5,167.6 243.1,167.9 241.0,167.3 239.3,167.5 237.0,168.1 234.4,170.2 231.7,171.4 230.2,172.7 229.5,173.9 229.5,175.9 229.6,177.2 230.2,178.1 229.1,178.2 227.1,177.6 224.9,176.8 224.2,175.4 223.6,173.5 221.9,171.9 221.0,170.3 219.6,168.4 217.6,167.3 215.3,167.3 213.6,169.5 211.3,168.7 209.8,167.9 209.2,166.3 208.2,164.9 206.6,163.7 205.2,162.8 204.1,161.8 199.3,161.8 199.3,162.9 197.1,162.9 191.6,163.0 185.3,161.0 181.1,159.7 181.3,159.1 177.8,159.4 174.6,159.6 174.2,158.2 172.4,156.6 171.1,156.3 170.8,155.5 169.2,155.3 168.2,154.6 165.6,154.3 164.9,153.9 164.6,152.3 161.9,149.6 159.6,145.7 159.7,145.0 158.5,144.1 156.3,141.8 155.9,139.5 154.4,138.0 155.1,135.7 155.0,133.3 154.1,131.2 155.2,128.6 155.5,126.1 155.8,123.5 155.3,119.8 154.5,117.4 153.6,116.2 154.0,115.6 158.0,116.6 159.5,119.2 160.2,118.4 159.7,116.2 158.8,113.9ZM68.3,194.2 68.8,194.5 69.3,194.8 70.0,195.8 69.9,196.0 68.8,196.6 67.9,197.0 67.5,197.5 66.8,197.1 66.9,196.3 66.5,195.3 66.6,195.0 67.1,194.5 66.9,194.0 67.1,193.7 67.3,193.8 68.3,194.2ZM66.7,192.3 66.4,192.7 65.5,192.9 65.0,192.3 64.7,192.0 64.7,191.9 65.0,191.6 66.0,191.9 66.7,192.3ZM64.6,191.2 64.5,191.5 63.0,191.4 63.2,191.1 64.6,191.2ZM61.0,189.7 61.3,189.9 62.1,190.8 61.9,190.9 61.7,190.9 60.8,190.8 60.4,190.2 60.3,190.1 61.0,189.7ZM57.3,188.3 57.4,188.9 57.0,189.2 56.1,188.7 56.3,188.5 56.7,188.2 57.3,188.3ZM37.6,82.3 39.8,82.5 40.1,83.6 38.4,84.0 36.5,83.5 34.8,82.7 37.6,82.3ZM74.4,89.0 76.2,89.2 77.4,90.0 75.0,91.3 72.2,92.4 70.8,91.7 70.4,90.4 72.9,89.4 74.4,89.0ZM108.4,56.4 108.4,56.4 108.4,66.7 108.3,82.5 111.1,82.6 113.8,83.3 115.7,84.5 118.2,86.4 120.9,84.8 123.7,83.9 125.2,85.4 127.0,86.5 129.6,87.7 131.3,89.7 134.1,92.9 138.9,94.7 138.9,96.4 137.4,97.8 137.4,97.8 137.4,97.8 135.9,96.7 133.4,95.8 132.6,93.4 129.1,91.2 127.6,88.5 124.9,88.4 120.5,88.3 117.2,87.5 111.5,84.6 108.8,84.1 104.0,83.1 100.1,83.3 94.7,82.1 91.3,80.9 88.3,81.5 88.8,83.4 87.3,83.6 84.1,84.2 81.6,85.1 78.6,85.7 78.2,84.0 79.4,81.3 82.4,80.5 81.6,79.8 78.1,81.3 76.2,83.2 72.2,85.1 74.2,86.5 71.6,88.5 68.6,89.6 65.8,90.5 65.1,91.7 60.8,93.2 59.9,94.5 56.7,95.6 54.8,95.4 52.2,96.2 49.3,97.2 47.0,98.1 42.3,98.9 41.8,98.4 44.9,97.1 47.6,96.3 50.5,94.7 54.0,94.4 55.4,93.3 59.2,91.6 59.8,91.1 61.9,90.1 62.4,88.0 63.8,86.3 60.6,87.2 59.7,86.7 58.2,87.7 56.4,86.3 55.6,87.3 54.6,85.9 51.8,87.0 50.1,87.0 49.8,85.4 50.3,84.4 48.6,83.4 44.9,83.9 42.6,82.6 40.7,81.9 40.7,80.4 38.6,79.2 39.6,77.6 41.9,76.0 42.9,74.6 45.1,74.4 47.0,74.8 49.3,73.5 51.3,73.7 53.4,72.9 52.9,71.6 51.3,71.1 53.4,70.0 51.7,70.1 48.7,70.7 47.9,71.3 45.7,70.7 41.8,71.0 37.7,70.3 36.5,69.2 33.0,67.6 36.9,66.4 43.1,65.1 45.4,65.1 45.0,66.5 50.9,66.3 48.6,64.6 45.2,63.6 43.2,62.2 40.6,61.0 36.8,60.1 38.3,58.7 43.2,58.6 46.8,57.3 47.4,55.9 50.3,54.6 53.0,54.3 58.2,53.1 60.8,53.3 65.1,51.8 69.3,52.4 71.3,53.6 72.5,53.1 77.2,53.3 77.0,53.9 81.3,54.4 84.1,54.1 90.0,55.0 95.3,55.2 97.4,55.6 101.1,55.1 105.4,56.0 108.4,56.4 108.4,56.4ZM23.0,72.8 24.7,73.4 26.4,73.1 28.7,73.8 31.4,74.2 31.2,74.5 29.1,75.1 27.0,74.5 25.9,74.0 23.5,74.1 22.8,73.9 23.0,72.8Z","i":181,"y":178},{"n":"Kazakhstan","d":"M742.7,113.3 740.6,115.1 738.2,115.4 738.1,118.2 736.6,119.4 731.1,118.5 729.1,123.5 727.6,124.1 722.1,125.2 724.6,130.1 722.7,130.8 722.9,132.4 721.2,132.0 719.8,131.0 715.7,130.7 711.1,130.6 710.1,130.9 706.1,129.7 704.6,130.3 704.1,131.9 699.6,131.0 697.7,131.4 697.1,132.6 695.5,133.1 691.9,135.0 690.6,137.0 689.6,137.0 688.8,135.7 685.3,135.6 684.8,133.4 683.4,133.3 683.6,130.6 680.3,128.5 675.5,128.7 672.3,129.2 669.6,126.7 667.3,125.6 663.0,123.6 662.5,123.4 655.4,125.0 655.5,135.3 654.0,135.4 652.1,133.2 650.2,132.4 647.1,133.0 645.8,133.9 645.7,133.3 646.4,132.1 645.8,131.1 642.6,130.2 641.4,127.7 639.8,127.0 639.7,126.1 642.4,126.3 642.5,124.3 644.9,123.9 647.3,124.3 647.8,121.6 647.3,119.9 644.6,120.0 642.2,119.3 639.0,120.5 636.4,121.1 635.0,120.7 635.3,119.2 633.5,117.4 631.4,117.5 629.1,115.6 630.7,113.5 629.9,112.9 632.1,109.8 634.9,111.5 635.3,109.4 641.0,106.4 645.4,106.3 651.5,108.3 654.8,109.4 657.7,108.2 662.1,108.2 665.7,109.6 666.5,108.8 670.4,108.9 671.1,107.6 666.6,105.7 669.2,104.3 668.7,103.6 671.4,102.8 669.4,100.9 670.7,100.0 681.1,99.0 682.4,98.3 689.4,97.3 691.9,96.2 696.8,96.8 697.7,99.6 700.6,99.0 704.2,99.9 704.0,101.4 706.6,101.3 713.6,98.6 712.6,99.5 716.1,101.7 722.3,108.7 723.8,107.3 727.6,108.9 731.6,108.1 733.2,108.6 734.5,110.2 736.4,110.8 737.6,112.0 741.2,111.6 742.7,113.3Z","i":0,"y":0},{"n":"Uzbekistan","d":"M655.5,135.3 655.4,125.0 662.5,123.4 663.0,123.6 667.3,125.6 669.6,126.7 672.3,129.2 675.5,128.7 680.3,128.5 683.6,130.6 683.4,133.3 684.8,133.4 685.3,135.6 688.8,135.7 689.6,137.0 690.6,137.0 691.9,135.0 695.5,133.1 697.1,132.6 697.9,132.9 695.6,134.7 697.7,135.7 699.6,135.0 702.9,136.5 699.4,138.5 697.3,138.2 696.1,138.3 695.7,137.5 696.3,136.2 692.6,136.9 691.7,138.6 690.4,140.2 688.1,140.1 687.3,141.3 689.4,141.9 690.0,144.0 688.4,146.8 686.3,146.2 684.8,146.2 684.9,144.5 681.2,143.3 678.3,142.0 676.4,140.7 673.3,138.7 671.9,135.9 671.0,135.4 668.0,135.5 666.9,134.9 666.6,132.7 662.9,131.2 660.5,132.9 658.1,133.8 658.6,135.2 655.5,135.3Z","i":0,"y":0},{"n":"Papua New Guinea","d":"M891.7,257.2 896.5,259.1 901.6,260.7 903.5,262.1 905.1,263.5 905.5,265.2 910.1,266.9 910.8,268.4 908.3,268.7 908.9,270.5 911.3,272.3 913.2,275.3 914.7,275.2 914.6,276.4 916.8,276.9 915.9,277.4 918.9,278.6 918.6,279.4 916.7,279.6 916.1,278.9 913.7,278.6 910.9,278.1 908.7,276.4 907.1,274.8 905.7,272.4 902.1,271.2 899.7,272.0 898.0,272.9 898.4,275.0 896.2,275.9 894.6,275.4 891.8,275.3 891.7,266.3 891.7,257.2ZM924.0,260.2 925.1,261.1 925.4,262.5 924.5,263.2 924.0,261.6 923.4,260.5 922.1,259.6 920.5,258.4 918.5,257.6 919.3,256.9 920.8,257.7 921.7,258.3 922.9,259.0 924.0,260.2ZM920.3,266.2 918.8,266.9 917.3,267.5 915.9,267.5 913.6,266.7 912.0,266.0 912.2,265.1 914.7,265.5 916.2,265.3 916.7,264.0 917.1,263.9 917.3,265.4 918.9,265.2 919.7,264.2 921.2,263.2 920.9,261.6 922.6,261.5 923.2,262.0 923.1,263.5 922.2,265.2 920.7,265.4 920.3,266.2ZM929.9,264.8 930.7,265.5 932.1,267.2 933.4,268.2 933.0,268.9 932.2,269.2 931.0,268.2 929.8,266.4 929.2,264.3 929.6,264.0 929.9,264.8Z","i":0,"y":0},{"n":"Indonesia","d":"M891.7,257.2 891.7,266.3 891.8,275.3 889.3,273.0 886.5,272.5 885.8,273.3 882.3,273.4 883.4,271.1 885.2,270.3 884.5,267.3 883.1,265.0 877.7,262.6 875.5,262.4 871.3,259.8 870.5,261.2 869.4,261.4 868.8,260.4 868.8,259.2 866.6,257.8 869.6,256.8 871.6,256.9 871.4,256.2 867.3,256.1 866.2,254.5 863.7,254.0 862.6,252.6 866.3,251.9 867.7,251.0 872.2,252.2 872.6,253.2 873.4,257.7 876.3,259.4 878.6,256.4 881.8,254.7 884.2,254.7 886.6,255.7 888.7,256.7 891.7,257.2ZM847.1,274.7 847.4,275.2 847.5,276.1 845.7,278.2 843.3,278.8 842.9,278.4 843.2,277.5 844.4,275.8 847.1,274.7ZM872.8,269.2 872.5,267.1 873.0,266.1 873.6,265.1 874.2,265.9 874.2,267.3 872.8,269.2ZM827.5,238.5 825.9,241.0 827.9,243.6 827.4,244.9 830.5,247.5 827.3,247.8 826.3,249.7 826.4,252.2 823.8,254.1 823.7,256.9 822.6,261.1 822.2,260.2 819.1,261.4 818.0,259.7 816.0,259.6 814.6,258.7 811.3,259.7 810.3,258.3 808.5,258.5 806.2,258.2 805.8,254.4 804.4,253.7 803.0,251.3 802.6,248.8 803.0,246.3 804.6,244.4 805.1,246.3 807.0,247.9 808.8,247.3 810.5,247.5 812.2,246.1 813.5,245.8 816.1,246.6 818.4,246.0 819.8,242.2 820.9,241.2 821.8,238.0 825.0,238.0 827.5,238.5ZM859.4,257.8 862.4,258.6 863.4,260.7 861.1,259.6 858.8,259.3 857.2,259.5 855.3,259.4 855.9,257.9 859.4,257.8ZM852.4,260.5 850.5,260.0 850.0,258.8 852.8,258.7 853.5,259.6 852.4,260.5ZM855.4,244.0 855.6,245.5 857.2,245.7 857.5,246.9 857.3,249.3 855.9,249.0 855.5,250.7 856.6,252.2 855.8,252.5 854.7,250.7 853.9,247.2 854.4,245.0 855.4,244.0ZM841.5,247.6 844.7,247.5 847.4,245.4 847.9,246.1 845.7,248.8 843.6,249.3 840.9,248.8 836.3,248.9 833.8,249.3 833.4,251.4 835.9,253.9 837.4,252.7 842.6,251.7 842.4,253.0 841.2,252.6 840.0,254.2 837.5,255.3 840.2,258.9 839.6,259.8 842.1,263.0 842.1,264.8 840.6,265.7 839.5,264.7 840.9,262.4 838.2,263.5 837.5,262.7 837.8,261.6 835.8,260.0 836.0,257.3 834.2,258.1 834.4,261.4 834.5,265.4 832.8,265.8 831.6,264.9 832.4,262.4 831.9,259.7 830.8,259.7 829.9,257.8 831.1,256.0 831.5,253.8 832.8,249.6 833.4,248.4 835.8,246.4 838.0,247.2 841.5,247.6ZM834.2,278.5 830.5,276.5 833.1,276.0 834.5,276.8 835.5,277.7 835.3,278.4 834.2,278.5ZM837.1,273.7 838.9,273.5 841.4,272.5 841.0,274.0 836.8,274.8 833.1,274.5 833.1,273.5 835.3,272.9 837.1,273.7ZM828.5,273.2 830.2,273.0 830.9,274.2 827.7,274.7 825.8,275.1 824.3,275.1 825.2,273.5 826.8,273.5 827.5,272.5 828.5,273.2ZM801.4,267.8 801.7,268.8 807.1,269.1 807.7,268.0 812.8,269.3 813.8,271.1 818.0,271.6 821.4,273.3 818.2,274.3 815.2,273.2 812.7,273.3 809.8,273.1 807.2,272.6 804.0,271.5 801.9,271.2 800.8,271.6 795.7,270.4 795.2,269.2 792.7,269.0 794.6,266.4 798.0,266.5 800.2,267.6 801.4,267.8ZM789.9,253.0 790.4,255.0 791.4,256.5 793.4,256.7 794.7,258.5 794.0,262.0 793.9,266.3 790.9,266.3 788.5,264.0 785.0,261.7 783.8,260.0 781.7,257.8 780.3,255.7 778.2,251.8 775.7,249.5 774.9,247.1 773.9,244.9 771.4,243.2 769.9,240.8 767.8,239.3 764.9,236.2 764.7,234.8 766.5,234.9 770.8,235.4 773.2,238.1 775.4,240.0 776.9,241.2 779.6,244.2 782.4,244.2 784.7,246.1 786.3,248.4 788.4,249.7 787.3,252.0 788.9,252.9 789.9,253.0Z","i":9,"y":0},{"n":"Argentina","d":"M309.3,396.2 310.4,397.5 311.8,399.6 315.4,401.2 319.3,401.9 318.1,403.3 315.4,403.5 314.0,402.5 312.3,402.4 309.4,402.4 309.3,396.2ZM339.9,333.9 339.2,336.2 338.5,339.0 338.5,341.8 337.9,342.4 337.7,344.2 337.5,345.6 341.0,348.0 340.7,349.9 342.4,351.1 342.3,352.5 339.6,356.1 335.5,357.6 329.9,358.1 326.8,357.9 327.4,359.5 326.9,361.6 327.4,363.0 325.7,364.0 322.9,364.4 320.2,363.3 319.1,364.1 319.5,366.8 321.4,367.7 322.9,366.8 323.7,368.2 321.2,369.1 318.9,370.8 318.5,373.6 317.9,375.1 315.3,375.1 313.1,376.5 312.3,378.6 315.0,380.6 317.7,381.2 316.7,383.7 313.4,385.3 311.6,388.5 309.1,389.6 307.9,390.9 308.8,393.8 310.7,395.4 309.5,395.3 306.9,394.8 300.2,394.5 299.1,392.8 299.1,390.8 297.3,390.9 296.3,389.9 296.1,387.0 298.2,385.8 299.1,384.0 298.8,382.6 300.2,380.2 301.2,376.6 300.9,374.9 302.2,374.4 301.9,373.4 300.6,372.8 301.5,371.6 300.2,370.6 299.6,367.4 300.7,366.8 300.2,363.4 300.9,360.6 301.6,358.1 303.3,357.1 302.4,354.4 302.4,351.8 304.5,350.0 304.5,347.7 306.1,345.0 306.1,342.4 305.3,341.9 304.1,337.1 305.8,334.3 305.5,331.6 306.5,329.1 308.3,326.4 310.3,324.7 309.5,323.6 310.0,322.7 310.0,318.1 313.0,316.7 313.9,313.9 313.6,313.2 315.9,310.6 319.5,311.3 321.2,313.3 322.3,311.1 325.4,311.2 325.9,311.8 331.0,316.3 333.3,316.8 336.6,318.8 339.5,319.9 339.9,321.1 337.2,325.3 340.0,326.1 343.1,326.5 345.3,326.1 347.8,323.9 348.3,321.5 349.6,321.0 351.0,322.6 351.0,324.8 348.6,326.3 346.8,327.4 343.6,330.1 339.9,333.9Z","i":0,"y":0},{"n":"Chile","d":"M309.3,396.2 309.4,402.4 312.3,402.4 314.0,402.5 313.1,403.6 310.7,404.5 309.3,404.4 307.7,404.2 305.7,403.3 302.8,402.9 299.3,401.4 296.4,399.9 292.6,396.8 294.9,397.4 298.8,399.2 302.5,400.2 303.9,398.9 304.8,397.0 307.4,395.9 309.3,396.2ZM306.7,298.8 308.1,300.7 308.4,302.7 309.9,303.9 309.0,306.6 310.5,309.7 311.6,313.5 313.6,313.2 313.9,313.9 313.0,316.7 310.0,318.1 310.0,322.7 309.5,323.6 310.3,324.7 308.3,326.4 306.5,329.1 305.5,331.6 305.8,334.3 304.1,337.1 305.3,341.9 306.1,342.4 306.1,345.0 304.5,347.7 304.5,350.0 302.4,351.8 302.4,354.4 303.3,357.1 301.6,358.1 300.9,360.6 300.2,363.4 300.7,366.8 299.6,367.4 300.2,370.6 301.5,371.6 300.6,372.8 301.9,373.4 302.2,374.4 300.9,374.9 301.2,376.6 300.2,380.2 298.8,382.6 299.1,384.0 298.2,385.8 296.1,387.0 296.3,389.9 297.3,390.9 299.1,390.8 299.1,392.8 300.2,394.5 306.9,394.8 309.5,395.3 307.1,395.3 305.7,395.9 303.2,396.9 302.8,399.5 301.6,399.6 298.5,398.7 295.3,396.8 295.3,396.8 291.8,395.2 290.9,393.4 291.7,391.8 290.3,389.9 290.0,385.2 291.2,382.5 294.1,380.4 289.9,379.6 292.5,377.1 293.5,372.5 296.6,373.5 298.0,367.7 296.1,367.0 295.3,370.5 293.5,370.1 294.4,366.1 295.3,361.0 296.6,359.1 295.8,356.3 295.6,353.2 296.8,353.1 298.5,348.6 300.4,344.2 301.6,340.1 300.9,335.9 301.7,333.6 301.4,330.2 303.0,326.8 303.5,321.4 304.4,315.6 305.3,309.4 305.1,304.9 304.5,301.0 305.9,300.3 306.7,298.8Z","i":0,"y":0},{"n":"Dem. Rep. Congo","d":"M581.5,262.5 582.0,265.1 581.7,266.5 582.3,268.1 583.9,269.7 585.4,273.2 585.4,273.2 584.3,272.9 580.6,273.4 579.8,273.7 579.0,275.5 579.6,276.7 579.2,280.0 578.8,282.8 579.6,283.3 581.5,284.3 582.3,283.8 582.5,286.8 580.4,286.8 579.2,285.3 578.2,284.1 576.1,283.7 575.5,282.2 573.8,283.1 571.5,282.7 570.6,281.5 568.8,281.2 567.5,281.3 567.4,280.4 566.4,280.4 565.2,280.2 563.4,280.6 562.2,280.5 561.5,280.8 561.7,277.5 560.8,276.5 560.6,274.7 561.0,273.1 560.4,272.0 560.4,270.3 557.0,270.3 557.2,269.3 555.8,269.3 555.7,269.8 553.9,269.9 553.2,271.5 552.8,272.2 551.3,271.8 550.4,272.2 548.5,272.4 547.5,271.0 546.8,270.1 546.0,268.4 545.4,266.3 537.2,266.3 536.2,266.6 535.4,266.6 534.2,266.9 533.8,266.1 534.5,265.8 534.6,264.6 535.1,263.9 536.1,263.3 536.8,263.6 537.8,262.5 539.3,262.5 539.5,263.3 540.5,263.8 542.1,262.1 543.8,260.7 544.5,259.8 544.4,257.5 545.6,254.8 546.8,253.4 548.7,252.1 549.0,251.2 549.1,250.2 549.5,249.2 549.4,247.6 549.7,245.2 550.3,243.4 551.1,241.9 551.3,240.3 551.5,238.3 552.6,236.9 554.1,236.0 556.4,237.0 558.1,238.0 560.2,238.3 562.2,238.8 563.1,237.1 563.4,236.9 564.7,237.2 567.8,235.8 568.9,236.4 569.8,236.3 570.2,235.6 571.3,235.4 573.3,235.7 575.1,235.8 576.0,235.5 577.7,237.8 579.0,238.1 579.7,237.6 581.0,237.8 582.5,237.2 583.2,238.4 585.6,240.3 585.6,240.3 585.5,243.5 586.6,243.9 585.7,244.9 584.6,245.6 583.6,247.0 583.0,248.3 582.8,250.6 582.2,251.6 582.2,253.7 581.4,254.5 581.3,256.2 580.9,256.4 580.6,257.9 581.3,259.1 581.5,262.5Z","i":0,"y":0},{"n":"Somalia","d":"M615.5,254.7 613.9,252.4 613.8,242.3 616.3,239.1 617.0,238.2 618.8,238.2 621.3,236.2 624.9,236.1 632.7,227.8 634.7,225.5 635.9,223.7 635.9,222.3 635.9,219.5 636.0,218.3 636.0,218.3 636.0,218.3 636.9,218.2 638.1,217.8 639.6,217.6 640.9,216.6 642.0,216.6 642.0,217.4 641.8,219.0 641.8,220.4 641.2,221.4 640.4,224.4 639.1,227.6 637.4,231.1 635.0,235.2 632.6,238.3 629.3,242.1 626.6,244.3 622.4,247.1 619.8,249.2 616.8,252.6 616.1,254.0 615.5,254.7Z","i":0,"y":0},{"n":"Kenya","d":"M608.9,263.0 604.9,260.2 604.7,258.6 594.6,252.9 594.2,252.6 594.1,249.7 594.9,248.6 596.3,246.7 597.3,244.7 596.1,241.5 595.8,240.1 594.5,238.2 596.2,236.5 598.1,234.7 599.5,235.2 599.5,236.7 600.4,237.6 602.4,237.6 605.9,240.0 606.8,240.0 607.4,240.0 608.0,240.3 609.9,240.5 610.7,239.3 613.2,238.2 614.4,239.1 616.3,239.1 613.8,242.3 613.9,252.4 615.5,254.7 613.6,255.8 612.9,256.9 611.8,257.1 611.4,259.1 610.6,260.2 610.0,262.1 608.9,263.0Z","i":0,"y":0},{"n":"Sudan","d":"M568.2,227.1 566.1,225.9 565.2,225.1 565.0,224.3 565.4,223.1 565.4,222.0 563.8,220.2 563.5,219.0 563.5,218.4 562.5,217.6 562.5,215.9 561.9,214.9 560.9,215.0 561.2,214.0 561.9,212.9 561.6,211.7 562.5,210.9 562.0,210.2 562.7,208.5 564.0,206.4 566.4,206.6 566.2,195.6 566.2,194.4 569.4,194.4 569.4,188.9 580.6,188.9 591.4,188.9 602.4,188.9 603.3,191.6 602.7,192.1 603.1,195.0 604.1,198.3 605.2,199.0 606.7,200.0 605.3,201.6 603.2,202.0 602.4,202.9 602.1,204.7 600.9,208.8 601.2,209.9 600.8,212.3 599.6,215.1 597.9,216.4 596.8,218.6 596.5,219.7 595.2,220.5 594.3,223.4 594.4,225.9 594.3,223.7 594.0,223.7 594.0,222.3 593.7,221.3 592.2,220.2 591.9,218.2 592.2,216.2 591.0,216.0 590.8,216.6 589.1,216.7 589.8,217.6 590.0,219.2 588.5,220.7 587.1,222.7 585.7,223.0 583.3,221.4 582.3,222.0 582.0,222.8 580.6,223.3 580.5,223.9 577.7,223.9 577.3,223.3 575.3,223.2 574.3,223.7 573.5,223.5 572.1,221.8 571.6,221.1 569.6,221.5 568.9,222.7 568.2,225.2 567.2,225.8 566.4,226.1 568.2,227.1Z","i":0,"y":0},{"n":"Chad","d":"M566.2,195.6 566.4,206.6 564.0,206.4 562.7,208.5 562.0,210.2 562.5,210.9 561.6,211.7 561.9,212.9 561.2,214.0 560.9,215.0 561.9,214.9 562.5,215.9 562.5,217.6 563.5,218.4 563.5,219.0 561.8,219.5 560.3,220.6 558.3,223.7 555.7,225.0 553.0,224.8 552.3,225.0 552.5,226.0 551.1,227.0 549.9,228.1 546.4,229.1 545.7,228.5 545.3,228.5 544.7,229.2 542.4,229.4 542.9,228.6 542.0,226.7 541.6,225.6 540.4,225.1 538.8,223.5 539.4,222.2 540.6,222.4 541.4,222.2 543.0,222.3 541.5,219.7 541.6,217.9 541.4,216.1 540.3,214.3 540.5,213.0 538.8,212.9 538.8,211.1 537.6,210.1 538.8,206.4 542.4,203.8 542.5,200.2 543.6,194.6 544.2,193.4 543.0,192.4 543.0,191.5 541.9,190.8 541.3,186.5 544.1,185.0 555.1,190.3 566.2,195.6Z","i":0,"y":0},{"n":"Haiti","d":"M300.8,195.2 301.0,196.8 300.8,197.8 300.2,198.3 300.9,199.1 300.8,199.9 299.0,199.4 297.7,199.6 296.0,199.4 294.7,199.9 293.2,199.0 293.4,198.2 296.0,198.5 298.1,198.8 299.1,198.1 297.8,196.9 297.8,195.9 296.1,195.4 296.7,194.7 298.4,194.8 300.8,195.2Z","i":0,"y":0},{"n":"Dominican Rep.","d":"M300.8,199.9 300.9,199.1 300.2,198.3 300.8,197.8 301.0,196.8 300.8,195.2 301.1,194.8 303.3,194.8 305.0,195.5 305.7,195.4 306.2,196.4 307.7,196.4 307.6,197.2 308.9,197.3 310.2,198.3 309.2,199.4 307.9,198.8 306.6,198.9 305.7,198.8 305.2,199.3 304.1,199.5 303.7,198.8 302.8,199.2 301.7,201.1 301.0,200.7 300.8,199.9Z","i":0,"y":0},{"n":"Russia","d":"M996.5,52.5 1000.0,51.3 1000.0,53.2 997.0,53.4 996.5,52.5ZM636.4,121.1 635.1,122.8 632.4,123.2 629.7,126.1 632.2,128.7 631.9,130.6 635.0,133.9 635.0,133.9 633.3,135.0 632.8,135.7 631.6,135.5 629.7,133.8 628.9,133.7 627.2,133.1 626.3,131.9 623.7,131.4 622.0,131.8 621.5,131.3 617.8,129.9 613.7,129.5 611.3,129.0 611.0,129.3 607.4,127.0 604.3,126.0 601.9,124.3 603.9,123.9 606.2,121.6 604.6,120.5 608.7,119.3 608.7,118.7 606.2,119.2 606.3,117.9 607.7,117.2 610.4,116.9 610.8,116.0 610.2,114.5 611.3,113.0 611.3,112.2 607.2,111.3 605.6,111.3 603.9,110.0 601.7,110.5 598.2,109.5 598.3,109.0 597.3,107.8 595.1,107.6 594.8,106.8 595.5,106.2 593.8,104.6 590.9,104.9 590.0,104.8 589.3,105.4 588.3,105.3 588.3,105.3 587.6,103.5 587.0,102.6 587.5,102.3 589.7,102.4 590.8,101.8 590.0,101.1 588.1,100.6 588.3,100.1 587.2,99.6 585.4,97.7 586.0,97.0 585.8,95.7 583.0,95.0 581.6,95.4 581.2,94.7 578.3,94.0 577.4,92.3 577.1,91.0 575.8,90.3 577.0,89.5 576.2,86.9 578.1,85.3 577.7,84.8 577.7,84.8 580.9,83.3 578.0,81.9 578.0,81.9 583.9,78.4 586.5,76.8 587.5,75.4 583.4,73.5 584.6,71.7 582.1,69.6 583.9,67.2 580.7,64.0 583.3,61.9 579.0,60.1 579.4,58.2 581.7,57.9 586.4,56.8 586.4,56.8 589.3,55.8 593.8,57.5 601.4,58.2 611.9,61.3 614.1,62.6 614.2,64.5 611.2,65.9 606.6,66.7 594.2,64.6 592.2,64.9 596.7,66.9 596.9,68.2 597.1,71.1 600.6,71.9 602.8,72.6 603.2,71.3 601.5,70.1 603.3,69.0 610.0,70.8 612.3,70.1 610.5,68.1 616.9,65.3 619.5,65.5 622.1,66.5 623.7,64.6 621.4,62.9 622.7,61.2 620.7,59.5 628.5,60.4 630.1,62.0 626.5,62.3 626.6,63.9 628.7,64.8 633.0,64.2 633.7,62.4 639.5,61.1 649.2,58.7 651.3,58.9 648.6,60.6 652.0,60.8 654.0,59.9 659.2,59.8 663.3,58.7 666.5,60.3 669.7,58.5 666.8,56.9 668.2,56.0 676.4,56.8 680.2,57.7 690.3,60.9 692.2,59.4 689.3,57.9 689.3,57.3 685.9,57.1 686.8,55.8 685.3,53.6 685.3,52.7 690.4,50.2 692.2,47.7 694.3,47.1 701.6,47.8 702.2,49.4 699.6,51.6 701.3,52.5 702.2,54.5 701.6,58.3 704.6,60.0 703.4,61.8 698.0,65.8 701.2,66.2 702.3,65.2 705.3,64.5 706.1,63.1 708.5,61.8 706.9,60.2 708.2,58.4 705.1,58.1 704.4,56.6 706.7,53.8 703.1,51.5 708.0,49.7 707.4,47.7 708.8,47.6 710.2,49.2 709.1,51.8 712.1,52.4 710.8,50.3 715.5,49.3 721.3,49.1 726.4,50.7 723.9,48.4 723.6,45.4 728.5,44.9 735.2,45.0 741.2,44.6 738.9,43.2 742.1,41.3 745.3,41.3 750.7,39.9 758.1,39.5 759.0,38.8 766.3,38.5 768.6,39.1 774.8,37.6 779.9,37.7 780.7,36.5 783.3,35.3 789.9,34.2 794.6,35.1 790.8,35.8 797.1,36.2 797.9,37.6 800.4,36.9 808.5,36.9 814.8,38.3 817.0,39.3 816.3,40.8 813.3,41.6 806.0,43.1 803.9,43.9 807.3,44.3 811.4,45.0 813.9,44.5 815.4,46.3 816.6,45.6 821.0,45.1 829.9,45.6 830.6,46.9 842.2,47.3 842.4,45.2 848.3,45.7 852.7,45.7 857.2,47.1 858.5,48.9 856.8,50.1 860.3,52.2 864.7,53.4 867.4,50.5 871.8,51.7 876.6,51.0 881.9,51.8 884.0,51.0 888.5,51.4 886.5,48.8 890.2,47.6 915.3,49.4 917.6,51.1 924.9,53.2 936.1,52.7 941.7,53.1 944.0,54.3 943.6,56.3 947.1,57.1 950.8,56.5 955.7,56.5 960.9,57.0 966.2,56.7 971.0,59.2 974.5,58.3 972.2,56.5 973.5,55.3 982.3,56.1 988.1,55.9 996.1,57.2 1000.0,58.4 1000.0,69.5 1000.0,69.5 996.4,70.7 992.8,70.5 995.3,72.0 997.0,74.3 998.3,75.0 998.6,76.2 997.9,76.9 992.7,76.3 984.9,78.4 982.4,78.7 978.2,80.7 974.2,82.4 973.1,83.7 969.2,81.7 961.9,83.9 960.7,82.9 958.0,84.1 954.3,83.7 953.4,85.5 950.0,88.2 950.1,89.3 953.3,90.0 952.9,94.0 950.4,94.1 949.2,96.4 950.3,97.6 945.5,99.0 944.5,102.2 940.4,102.9 939.5,105.7 935.5,108.3 934.5,106.4 933.3,102.3 931.8,96.2 933.1,92.3 935.4,90.7 935.6,89.4 939.9,88.7 944.9,85.2 949.6,82.4 954.6,80.2 956.9,76.2 953.5,76.5 951.8,78.8 944.8,81.8 942.5,78.4 935.3,79.3 928.4,84.0 930.7,85.7 924.5,86.4 920.2,86.7 920.4,84.7 916.1,84.3 912.6,85.7 904.1,85.2 895.0,86.0 886.0,91.4 875.4,98.0 879.7,98.3 881.1,100.1 883.8,100.7 885.6,99.3 888.6,99.5 892.6,102.5 892.7,104.9 890.5,107.7 890.3,111.0 889.1,115.4 884.9,119.4 883.9,121.4 880.2,124.6 876.4,127.8 874.6,129.4 870.9,131.1 869.2,131.1 867.4,129.8 863.7,131.8 863.3,132.7 863.3,132.7 863.3,132.7 863.3,132.7 862.9,132.2 862.9,132.2 862.9,130.8 864.3,130.8 864.7,127.5 864.0,125.1 866.3,124.1 869.7,124.6 871.6,121.9 872.5,118.9 873.6,117.8 875.1,115.3 870.5,116.2 868.1,117.3 863.9,117.2 862.7,114.6 859.4,112.7 854.6,111.8 853.6,109.1 852.6,107.4 851.6,106.2 849.9,103.4 847.4,102.3 843.3,101.5 839.6,101.6 836.1,102.1 833.8,103.5 835.3,104.1 835.4,105.7 833.8,106.5 831.3,109.5 831.4,110.7 827.4,112.5 824.1,111.4 820.8,111.7 819.3,110.7 817.7,110.4 813.6,112.4 809.9,112.8 807.4,113.5 803.9,113.1 801.3,113.1 799.6,111.7 796.9,110.3 794.1,110.0 790.6,110.3 788.0,110.9 784.0,109.7 783.5,107.6 780.2,106.9 777.7,106.6 774.6,105.4 771.7,108.3 772.9,109.9 770.2,111.9 766.2,111.2 763.4,111.1 761.5,109.8 758.6,109.7 756.2,108.9 752.0,110.2 746.7,112.6 743.8,113.1 742.7,113.3 741.2,111.6 737.6,112.0 736.4,110.8 734.5,110.2 733.2,108.6 731.6,108.1 727.6,108.9 723.8,107.3 722.3,108.7 716.1,101.7 712.6,99.5 713.6,98.6 706.6,101.3 704.0,101.4 704.2,99.9 700.6,99.0 697.7,99.6 696.8,96.8 691.9,96.2 689.4,97.3 682.4,98.3 681.1,99.0 670.7,100.0 669.4,100.9 671.4,102.8 668.7,103.6 669.2,104.3 666.6,105.7 671.1,107.6 670.4,108.9 666.5,108.8 665.7,109.6 662.1,108.2 657.7,108.2 654.8,109.4 651.5,108.3 645.4,106.3 641.0,106.4 635.3,109.4 634.9,111.5 632.1,109.8 629.9,112.9 630.7,113.5 629.1,115.6 631.4,117.5 633.5,117.4 635.3,119.2 635.0,120.7 636.4,121.1ZM760.5,24.9 766.5,24.3 771.9,25.7 778.3,28.4 777.6,30.9 771.5,31.2 763.8,30.4 759.2,29.4 757.1,27.4 753.3,26.8 760.5,24.9ZM785.7,29.8 792.7,31.4 791.9,32.5 776.2,33.6 781.3,29.9 783.6,29.6 785.7,29.8ZM885.6,38.5 893.0,38.6 903.0,40.1 900.8,42.2 890.6,42.1 886.0,42.7 880.5,40.9 882.0,39.0 885.6,38.5ZM911.7,40.7 918.7,41.4 915.5,42.5 911.0,42.3 905.9,41.2 906.6,40.3 911.7,40.7ZM888.5,46.2 891.1,45.1 894.6,44.8 898.6,45.9 898.9,46.6 894.7,46.7 889.0,46.3 888.5,46.2ZM624.6,26.1 630.0,25.6 634.2,25.6 634.8,26.3 636.4,25.7 639.0,25.2 643.1,25.8 642.0,26.3 638.3,26.6 635.8,26.8 635.4,27.3 632.2,27.7 629.2,27.1 630.8,26.2 624.6,26.1ZM563.1,99.1 558.0,99.1 554.6,98.8 555.2,97.6 559.1,96.7 562.0,97.2 563.2,97.6 562.9,98.4 563.1,99.1ZM648.6,45.1 655.3,42.7 654.5,41.4 660.7,40.0 669.9,38.2 679.2,37.7 683.9,36.6 689.3,36.3 691.3,37.4 689.4,38.2 679.5,39.6 671.1,40.9 662.4,43.6 658.3,46.3 653.9,49.0 654.5,51.3 659.8,53.6 658.2,53.8 649.1,53.4 648.4,52.2 643.3,51.5 642.9,50.0 645.8,49.4 645.7,47.8 651.2,45.5 648.6,45.1ZM897.0,100.8 897.9,103.5 897.9,106.2 899.0,109.0 901.8,114.0 897.7,113.0 896.0,117.1 898.7,119.9 898.6,121.8 896.5,120.2 894.7,122.3 894.2,120.0 894.5,117.3 894.2,114.3 894.8,112.2 894.9,108.5 893.3,105.7 893.6,101.9 896.1,100.7 895.0,99.4 896.3,99.0 897.0,100.8ZM14.1,63.3 13.8,65.0 15.7,65.7 15.1,63.7 22.6,64.1 28.1,66.7 25.3,67.9 20.7,68.2 20.7,70.9 19.6,71.5 17.0,71.4 14.9,70.5 11.2,69.7 10.5,68.5 7.7,68.0 4.6,68.4 3.0,67.4 3.6,66.4 0.3,67.0 1.6,68.3 0.0,69.5 0.0,58.4 6.8,60.6 14.1,63.3ZM3.6,53.1 0.0,53.2 0.0,51.3 0.4,51.2 2.7,51.2 6.7,52.0 6.5,52.4 3.6,53.1ZM592.9,122.3 593.6,121.6 595.6,122.2 596.5,122.3 596.8,122.9 597.3,123.0 597.3,123.2 598.6,123.9 601.5,123.7 600.9,124.7 597.9,125.2 594.1,126.8 592.6,126.2 593.2,124.9 590.2,124.1 590.6,123.6 593.3,122.6 592.9,122.3Z","i":0,"y":0},{"n":"Bahamas","d":"M280.6,175.6 281.9,175.4 283.8,175.4 283.8,176.2 280.8,176.6 280.6,175.6ZM283.9,174.9 286.1,176.1 285.6,178.1 285.1,177.8 285.2,176.3 283.9,175.2 283.9,174.9ZM282.8,180.0 283.6,180.1 284.6,182.4 284.6,184.0 283.9,184.1 283.2,182.5 282.2,181.7 282.8,180.0Z","i":0,"y":0},{"n":"Falkland Is.","d":"M330.0,394.0 333.3,392.4 335.7,393.1 337.4,391.9 339.6,393.2 338.8,394.2 335.0,395.0 333.8,394.0 331.4,395.3 330.0,394.0Z","i":0,"y":0},{"n":"Norway","d":"M542.1,28.7 543.1,27.7 547.2,27.6 550.7,28.6 559.8,30.7 552.9,31.8 551.3,33.8 548.9,34.3 547.6,36.6 544.2,36.7 538.2,35.1 540.7,34.1 536.6,33.3 531.2,30.9 529.0,28.7 536.6,27.7 538.1,28.7 542.1,28.7ZM586.4,56.8 581.7,57.9 579.4,58.2 580.6,56.2 577.0,55.1 572.7,56.0 571.4,58.1 568.7,59.3 565.7,58.6 562.1,58.8 559.0,57.3 557.3,58.0 555.6,58.2 555.2,60.0 550.0,59.5 549.2,61.1 546.6,61.1 544.7,63.0 542.0,66.1 537.7,70.0 538.7,71.0 537.7,72.1 534.9,72.0 533.1,74.6 533.3,78.3 535.1,79.7 534.2,83.0 531.9,84.9 530.6,86.5 528.8,84.8 523.3,88.0 519.6,88.7 515.7,87.3 514.7,84.3 513.9,77.9 516.4,76.1 523.8,73.7 529.2,70.9 534.3,67.0 541.0,61.6 545.7,59.5 553.3,56.1 559.4,54.8 564.0,55.0 568.2,52.7 573.3,52.8 578.2,52.3 586.9,54.3 583.3,55.0 586.4,56.8ZM576.1,27.6 572.0,29.1 564.0,29.4 555.8,29.0 555.3,28.2 551.3,28.2 548.2,26.9 556.8,26.1 560.9,26.8 563.7,26.0 570.7,26.6 576.1,27.6ZM568.7,33.7 562.5,34.9 557.6,34.2 559.5,33.5 557.8,32.6 563.6,32.1 564.7,33.1 568.7,33.7Z","i":1,"y":1},{"n":"Greenland","d":"M370.1,20.5 379.4,18.8 389.2,18.9 392.7,17.9 402.5,17.7 424.7,18.0 442.1,20.2 437.0,21.3 426.3,21.4 411.4,21.7 412.8,22.2 422.6,21.9 431.0,22.8 436.4,22.0 438.7,23.0 435.6,24.6 442.7,23.5 456.2,22.5 464.5,23.0 466.1,24.2 454.8,26.2 453.2,26.8 444.3,27.3 450.7,27.4 447.5,29.4 445.3,31.2 445.4,34.3 448.7,36.2 444.3,36.3 439.8,37.1 444.9,38.6 445.6,41.0 442.6,41.2 446.2,43.6 440.0,43.8 443.2,45.0 442.3,45.9 438.4,46.4 434.5,46.4 438.0,48.3 438.1,49.5 432.6,48.3 431.1,49.1 434.9,49.8 438.5,51.5 439.6,53.7 434.6,54.2 432.5,53.2 429.0,51.6 430.0,53.5 426.8,54.9 434.1,55.0 437.9,55.2 430.5,57.6 422.9,59.8 414.8,60.8 411.7,60.8 408.9,61.8 405.0,64.8 399.0,66.7 397.1,66.8 393.4,67.5 389.4,68.2 387.0,69.9 387.0,71.8 385.6,73.7 381.1,75.9 382.2,78.1 380.9,80.3 379.5,83.1 375.6,83.2 371.5,81.0 365.9,80.9 363.2,79.4 361.4,76.7 356.6,73.3 355.2,71.4 354.8,69.0 350.9,66.4 351.9,64.3 350.1,63.4 352.8,60.1 357.0,59.1 358.1,57.9 358.7,55.8 355.5,56.7 354.0,57.1 351.5,57.5 348.1,56.6 347.9,54.8 349.0,53.3 351.6,53.2 357.2,54.0 352.5,52.2 350.0,51.3 347.2,51.6 344.9,51.0 348.0,48.4 346.3,47.3 344.1,45.4 340.8,42.5 337.2,41.4 337.3,40.2 329.8,38.6 323.9,38.4 316.5,38.5 309.7,38.7 306.5,37.8 301.7,36.1 309.0,35.2 314.5,35.1 302.7,34.3 296.4,33.2 296.8,32.1 307.3,30.8 317.5,29.5 318.5,28.4 311.0,27.5 313.5,26.3 323.1,24.4 327.1,24.1 326.0,22.9 332.5,22.1 341.1,21.7 349.6,21.7 352.7,22.5 360.0,21.0 366.7,22.0 370.6,22.3 376.3,23.2 369.7,21.7 370.1,20.5Z","i":0,"y":0},{"n":"Fr. S. Antarctic Lands","d":"M691.5,385.1 693.3,385.9 695.9,386.3 696.0,386.8 695.2,388.1 691.0,388.3 690.9,386.8 691.3,385.6 691.5,385.1Z","i":0,"y":0},{"n":"Timor-Leste","d":"M847.1,274.7 847.5,274.0 849.9,273.4 851.8,273.3 852.7,273.0 853.7,273.3 852.7,274.1 849.8,275.3 847.5,276.1 847.4,275.2 847.1,274.7Z","i":0,"y":0},{"n":"South Africa","d":"M545.4,329.4 546.7,328.0 547.8,328.8 548.3,330.0 549.5,330.2 551.3,330.7 552.8,330.5 555.3,329.1 555.3,318.8 556.0,319.2 557.7,321.9 557.4,323.5 558.0,324.5 560.0,324.2 561.4,323.0 562.7,322.2 563.4,320.8 564.8,320.2 565.9,320.5 567.3,321.3 569.5,321.4 571.3,320.8 571.6,319.9 572.1,318.6 573.6,318.4 574.4,317.3 575.3,315.5 577.8,313.4 581.8,311.4 582.9,311.4 584.2,311.9 585.2,311.5 586.6,311.8 588.0,315.7 588.7,317.7 588.2,320.8 588.4,321.8 587.0,321.3 586.2,321.5 586.0,322.3 585.2,323.3 585.2,324.3 586.9,325.8 588.5,325.5 589.1,324.3 591.2,324.3 590.5,326.3 590.2,328.6 589.5,329.9 587.6,331.3 587.0,331.7 585.8,333.1 585.1,334.5 583.5,336.5 580.3,339.4 578.4,341.0 576.3,342.3 573.4,343.4 572.0,343.5 571.6,344.3 569.9,343.9 568.5,344.4 565.5,343.9 563.9,344.2 562.7,344.1 559.8,345.2 557.5,345.6 555.8,346.7 554.5,346.7 553.3,345.7 552.4,345.7 551.2,344.4 551.0,344.8 550.7,344.1 550.7,342.4 549.8,340.6 550.7,340.1 550.6,337.9 548.8,335.3 547.4,333.0 547.4,333.0 545.4,329.4ZM580.5,330.4 579.3,329.6 578.0,330.1 576.5,331.2 575.0,333.0 577.1,335.1 578.1,334.8 578.6,334.0 580.1,333.5 580.6,332.6 581.5,331.3 580.5,330.4Z","i":1,"y":0},{"n":"Lesotho","d":"M580.5,330.4 581.5,331.3 580.6,332.6 580.1,333.5 578.6,334.0 578.1,334.8 577.1,335.1 575.0,333.0 576.5,331.2 578.0,330.1 579.3,329.6 580.5,330.4Z","i":0,"y":0},{"n":"Mexico","d":"M174.6,159.6 177.8,159.4 181.3,159.1 181.1,159.7 185.3,161.0 191.6,163.0 197.1,162.9 199.3,162.9 199.3,161.8 204.1,161.8 205.2,162.8 206.6,163.7 208.2,164.9 209.2,166.3 209.8,167.9 211.3,168.7 213.6,169.5 215.3,167.3 217.6,167.3 219.6,168.4 221.0,170.3 221.9,171.9 223.6,173.5 224.2,175.4 224.9,176.8 227.1,177.6 229.1,178.2 230.2,178.1 229.1,180.6 228.6,182.6 228.4,186.3 228.1,187.7 228.6,189.2 229.5,190.5 230.0,192.7 231.9,194.7 232.5,196.3 233.6,197.7 236.6,198.4 237.7,199.6 240.1,198.8 242.3,198.5 244.3,198.0 246.1,197.6 247.9,196.4 248.5,194.8 248.7,192.5 249.2,191.7 251.1,190.9 254.0,190.3 256.5,190.4 258.2,190.2 258.9,190.7 258.8,192.1 257.3,193.7 256.6,195.4 257.1,195.9 256.7,197.1 256.0,199.3 255.3,198.6 254.7,198.6 254.2,198.6 253.2,200.3 252.7,200.0 252.4,200.1 252.4,200.5 249.8,200.5 247.2,200.5 247.2,202.1 246.0,202.1 247.0,203.0 248.0,203.6 248.3,204.2 248.8,204.4 248.7,205.4 245.1,205.4 243.8,207.6 244.2,208.2 243.9,208.8 243.8,209.6 240.7,206.6 239.2,205.7 237.0,205.0 235.4,205.2 233.2,206.2 231.8,206.5 229.8,205.8 227.7,205.3 225.1,204.0 223.1,203.6 219.9,202.3 217.6,201.0 216.9,200.2 215.3,200.1 212.5,199.2 211.3,197.9 208.4,196.3 207.0,194.6 206.3,193.2 207.2,193.0 206.9,192.2 207.6,191.5 207.6,190.5 206.7,189.2 206.4,188.1 205.5,186.7 203.0,184.0 200.2,181.8 198.9,180.1 196.5,178.9 196.0,178.3 196.4,176.5 195.0,175.9 193.4,174.5 192.7,172.6 191.2,172.4 189.6,170.9 188.3,169.6 188.1,168.7 186.6,166.6 185.7,164.5 185.7,163.4 183.7,162.3 182.8,162.4 181.2,161.7 180.7,162.8 181.2,164.1 181.5,166.2 182.4,167.4 184.5,169.3 184.9,169.9 185.4,170.1 185.7,171.1 186.2,171.0 186.8,172.8 187.6,173.5 188.2,174.5 190.0,175.9 190.9,178.5 191.7,179.7 192.5,181.0 192.6,182.5 194.0,182.6 195.1,183.9 196.1,185.1 196.0,185.6 194.8,186.6 194.4,186.6 193.6,184.9 191.8,183.3 189.8,182.0 188.4,181.3 188.5,179.2 188.1,177.7 186.7,176.9 184.8,175.6 184.5,176.0 183.8,175.3 182.0,174.6 180.4,173.0 180.6,172.8 181.7,172.9 182.8,171.9 182.9,170.6 180.7,168.7 179.1,167.9 178.1,166.2 177.1,164.3 175.8,162.1 174.6,159.6Z","i":3,"y":0},{"n":"Uruguay","d":"M339.9,333.9 341.7,333.6 344.5,335.8 345.6,335.7 348.4,337.5 350.6,339.0 352.2,340.9 351.0,342.2 351.7,343.8 350.5,345.5 347.4,347.1 345.3,346.5 343.8,346.8 341.3,345.6 339.4,345.7 337.7,344.2 337.9,342.4 338.5,341.8 338.5,339.0 339.2,336.2 339.9,333.9Z","i":0,"y":0},{"n":"Brazil","d":"M351.7,343.8 351.0,342.2 352.2,340.9 350.6,339.0 348.4,337.5 345.6,335.7 344.5,335.8 341.7,333.6 339.9,333.9 343.6,330.1 346.8,327.4 348.6,326.3 351.0,324.8 351.0,322.6 349.6,321.0 348.3,321.5 348.8,319.9 349.2,318.3 349.2,316.7 348.2,316.2 347.1,316.7 346.1,316.5 345.8,315.5 345.5,312.9 345.0,312.1 343.1,311.4 342.0,311.9 339.1,311.4 339.2,307.6 338.4,306.0 339.3,305.5 339.0,303.9 339.8,302.7 340.3,300.5 339.6,298.8 338.1,298.0 337.8,296.9 338.2,295.3 332.9,295.2 331.8,291.9 332.6,291.9 332.6,290.7 332.1,289.9 331.9,288.3 330.3,287.4 328.6,287.5 327.4,286.7 325.5,286.1 324.5,285.1 321.3,284.6 318.3,282.1 318.6,280.3 318.2,279.2 318.5,277.1 314.9,277.6 313.4,278.6 311.0,279.8 310.4,280.6 308.9,280.7 306.9,280.4 305.3,280.9 304.0,280.6 304.2,276.4 301.9,278.0 299.5,277.9 298.4,276.4 296.6,276.3 297.2,275.1 295.6,273.4 294.5,270.9 295.2,270.4 295.2,269.2 296.9,268.4 296.6,266.9 297.3,265.9 297.5,264.7 300.7,262.8 303.0,262.2 303.3,261.8 305.9,261.9 307.1,254.3 307.2,253.1 306.7,251.5 305.5,250.5 305.5,248.5 307.1,248.0 307.6,248.3 307.7,247.3 306.1,247.0 306.1,245.2 311.5,245.3 312.4,244.3 313.2,245.2 313.7,246.9 314.2,246.5 315.8,248.0 317.9,247.8 318.5,247.0 320.5,246.3 321.7,245.9 322.0,244.7 324.0,243.9 323.8,243.3 321.5,243.1 321.1,241.3 321.2,239.5 320.0,238.7 320.5,238.5 322.5,238.8 324.7,239.5 325.5,238.9 327.5,238.4 330.6,237.4 331.7,236.3 331.3,235.6 332.7,235.4 333.4,236.1 333.0,237.3 334.0,237.7 334.6,239.0 333.8,240.0 333.4,242.3 334.1,243.8 334.3,245.0 336.0,246.3 337.4,246.5 337.7,245.9 338.6,245.8 339.8,245.3 340.7,244.6 342.3,244.8 342.9,244.7 344.5,245.0 344.7,244.4 344.2,243.8 344.5,243.0 345.6,243.3 347.0,243.0 348.5,243.6 349.8,244.2 350.6,243.4 351.2,243.5 351.6,244.3 352.9,244.1 354.0,243.0 354.9,241.0 356.5,238.5 357.5,238.3 358.1,239.9 359.7,244.7 361.2,245.2 361.3,247.1 359.2,249.4 360.0,250.2 364.9,250.7 365.0,253.4 367.2,251.6 370.6,252.6 375.3,254.3 376.6,255.9 376.2,257.5 379.4,256.6 384.8,258.1 388.9,258.0 393.1,260.3 396.6,263.4 398.7,264.2 401.1,264.3 402.1,265.2 403.1,268.7 403.5,270.4 402.4,275.0 401.0,276.8 397.1,280.7 395.3,283.8 393.3,286.2 392.6,286.3 391.8,288.3 392.0,293.5 391.2,297.8 390.9,299.6 390.0,300.7 389.6,304.4 386.7,308.1 386.3,310.9 384.0,312.1 383.4,313.8 380.3,313.8 376.0,314.9 374.0,316.1 370.9,316.9 367.6,319.1 365.3,321.9 364.9,324.0 365.3,325.5 364.8,328.3 364.2,329.7 362.3,331.2 359.2,336.1 356.7,338.3 354.8,339.6 353.6,342.2 351.7,343.8Z","i":1,"y":0},{"n":"Bolivia","d":"M306.9,280.4 308.9,280.7 310.4,280.6 311.0,279.8 313.4,278.6 314.9,277.6 318.5,277.1 318.2,279.2 318.6,280.3 318.3,282.1 321.3,284.6 324.5,285.1 325.5,286.1 327.4,286.7 328.6,287.5 330.3,287.4 331.9,288.3 332.1,289.9 332.6,290.7 332.6,291.9 331.8,291.9 332.9,295.2 338.2,295.3 337.8,296.9 338.1,298.0 339.6,298.8 340.3,300.5 339.8,302.7 339.0,303.9 339.3,305.5 338.4,306.0 338.4,305.2 335.8,303.8 333.2,303.7 328.4,304.5 327.0,307.0 327.0,308.5 325.9,311.8 325.4,311.2 322.3,311.1 321.2,313.3 319.5,311.3 315.9,310.6 313.6,313.2 311.6,313.5 310.5,309.7 309.0,306.6 309.9,303.9 308.4,302.7 308.1,300.7 306.7,298.8 308.4,295.8 307.3,293.5 307.9,292.6 307.4,291.5 308.5,290.1 308.5,287.8 308.7,285.8 309.3,284.9 306.9,280.4Z","i":0,"y":0},{"n":"Peru","d":"M305.9,261.9 303.3,261.8 303.0,262.2 300.7,262.8 297.5,264.7 297.3,265.9 296.6,266.9 296.9,268.4 295.2,269.2 295.2,270.4 294.5,270.9 295.6,273.4 297.2,275.1 296.6,276.3 298.4,276.4 299.5,277.9 301.9,278.0 304.2,276.4 304.0,280.6 305.3,280.9 306.9,280.4 309.3,284.9 308.7,285.8 308.5,287.8 308.5,290.1 307.4,291.5 307.9,292.6 307.3,293.5 308.4,295.8 306.7,298.8 305.9,300.3 304.5,301.0 301.7,299.4 301.5,298.2 296.0,295.4 291.0,292.4 288.9,290.7 287.7,288.4 288.2,287.6 285.8,284.0 283.1,278.8 280.5,273.3 279.3,272.0 278.4,270.0 276.3,268.2 274.3,267.0 275.2,265.8 273.9,263.2 274.7,261.2 276.9,259.5 277.3,260.6 276.5,261.3 276.5,262.3 277.7,262.1 278.8,262.4 280.0,263.8 281.6,262.6 282.1,260.8 283.8,258.3 287.1,257.2 290.2,254.3 291.0,252.5 290.6,250.4 291.4,250.2 293.2,251.5 294.1,252.8 295.4,253.5 297.0,256.4 299.1,256.8 300.6,256.0 301.6,256.5 303.3,256.3 305.4,257.6 303.6,260.4 304.5,260.5 305.9,261.9Z","i":1,"y":0},{"n":"Colombia","d":"M314.2,246.5 313.7,246.9 313.2,245.2 312.4,244.3 311.5,245.3 306.1,245.2 306.1,247.0 307.7,247.3 307.6,248.3 307.1,248.0 305.5,248.5 305.5,250.5 306.7,251.5 307.2,253.1 307.1,254.3 305.9,261.9 304.5,260.5 303.6,260.4 305.4,257.6 303.3,256.3 301.6,256.5 300.6,256.0 299.1,256.8 297.0,256.4 295.4,253.5 294.1,252.8 293.2,251.5 291.4,250.2 290.6,250.4 289.4,249.8 288.1,248.8 287.3,249.3 284.9,248.9 284.3,247.7 283.7,247.8 281.0,246.2 280.6,245.3 281.6,245.1 281.5,243.7 282.1,242.7 283.5,242.5 284.7,240.8 285.8,239.3 284.7,238.6 285.3,237.0 284.6,234.5 285.2,233.8 284.8,231.4 283.7,229.9 284.0,228.6 284.9,228.8 285.4,228.0 284.8,226.3 285.1,225.9 286.6,226.0 288.6,224.1 289.8,223.8 289.8,222.8 290.3,220.5 291.9,219.2 293.7,219.2 293.9,218.6 296.1,218.8 298.3,217.4 299.3,216.8 300.7,215.5 301.7,215.6 302.4,216.4 301.9,217.3 300.1,217.8 299.4,219.1 298.3,219.9 297.5,221.0 297.1,223.0 296.4,224.6 297.8,224.8 298.2,226.0 298.8,226.7 299.0,227.8 298.7,228.8 298.8,229.4 299.4,229.6 300.1,230.6 303.7,230.3 305.3,230.7 307.3,233.1 308.4,232.8 310.4,232.9 312.0,232.6 312.9,233.1 312.4,234.6 311.8,235.5 311.6,237.5 312.2,239.3 313.0,240.2 313.0,240.8 311.6,242.2 312.6,242.8 313.4,243.7 314.2,246.5Z","i":2,"y":0},{"n":"Panama","d":"M285.1,225.9 284.8,226.3 285.4,228.0 284.9,228.8 284.0,228.6 283.7,229.9 282.7,229.1 282.1,227.6 282.8,226.9 282.1,226.7 281.6,225.8 280.2,225.0 279.0,225.2 278.4,226.2 277.3,226.9 276.7,226.9 276.4,227.5 277.8,229.0 277.0,229.4 276.6,229.8 275.3,229.9 274.8,228.3 274.5,228.8 273.6,228.6 273.0,227.5 271.9,227.3 271.1,227.0 269.9,227.0 269.9,227.6 269.5,227.2 269.7,226.6 269.9,226.0 269.8,225.5 270.2,225.2 269.6,224.8 269.6,223.7 270.7,223.4 271.7,224.4 271.6,225.0 272.8,225.1 273.0,224.9 273.8,225.6 275.1,225.4 276.3,224.7 278.0,224.1 279.0,223.3 280.5,223.5 280.4,223.7 281.9,223.8 283.2,224.3 284.1,225.1 285.1,225.9Z","i":0,"y":0},{"n":"Costa Rica","d":"M270.7,223.4 269.6,223.7 269.6,224.8 270.2,225.2 269.8,225.5 269.9,226.0 269.7,226.6 269.5,227.2 268.0,226.5 267.5,226.0 267.8,225.5 267.7,224.9 266.9,224.2 265.8,223.6 264.9,223.3 264.7,222.5 264.0,222.0 264.1,222.8 263.6,223.5 262.9,222.7 262.1,222.4 261.7,221.8 261.7,221.0 262.1,220.1 261.3,219.7 261.9,219.2 262.3,218.8 264.2,219.6 264.8,219.2 265.7,219.4 266.1,220.0 267.0,220.2 267.6,219.6 268.3,221.1 269.4,222.2 270.7,223.4Z","i":0,"y":0},{"n":"Nicaragua","d":"M267.6,219.6 267.0,220.2 266.1,220.0 265.7,219.4 264.8,219.2 264.2,219.6 262.3,218.8 261.9,219.2 260.9,218.3 259.7,217.2 259.0,216.3 257.9,215.4 256.5,214.1 256.8,213.7 257.2,214.1 257.5,213.9 258.3,213.8 258.7,213.2 259.1,213.2 259.0,211.8 259.7,211.7 260.2,211.7 260.8,211.0 261.7,211.6 261.9,211.2 262.5,210.9 263.4,210.1 263.5,209.6 263.7,209.6 264.1,208.9 264.4,208.8 264.9,209.3 265.4,209.4 266.0,209.0 266.7,209.0 267.7,208.7 268.1,208.3 269.0,208.3 268.8,208.6 268.7,209.2 268.9,210.2 268.3,211.2 268.0,212.3 267.9,213.5 268.1,214.3 268.1,215.5 267.7,215.8 267.4,217.0 267.6,217.7 267.1,218.4 267.2,219.2 267.6,219.6Z","i":0,"y":0},{"n":"Honduras","d":"M269.0,208.3 268.1,208.3 267.7,208.7 266.7,209.0 266.0,209.0 265.4,209.4 264.9,209.3 264.4,208.8 264.1,208.9 263.7,209.6 263.5,209.6 263.4,210.1 262.5,210.9 261.9,211.2 261.7,211.6 260.8,211.0 260.2,211.7 259.7,211.7 259.0,211.8 259.1,213.2 258.7,213.2 258.3,213.8 257.5,213.9 257.0,213.1 256.1,212.8 256.3,211.7 255.9,211.4 255.4,211.2 254.2,211.5 254.1,211.2 253.2,210.7 252.6,210.2 251.8,209.9 252.4,209.2 252.2,208.7 252.3,208.1 253.7,207.4 254.9,206.3 255.2,206.4 255.8,205.9 256.6,205.9 256.9,206.1 257.3,206.0 258.6,206.2 259.9,206.2 260.8,205.9 261.1,205.5 262.0,205.7 262.7,205.9 263.4,205.8 263.9,205.6 265.2,206.0 265.6,206.0 266.5,206.5 267.3,207.2 268.3,207.6 269.0,208.3Z","i":0,"y":0},{"n":"El Salvador","d":"M251.8,209.9 252.6,210.2 253.2,210.7 254.1,211.2 254.2,211.5 255.4,211.2 255.9,211.4 256.3,211.7 256.1,212.8 255.8,213.5 254.2,213.4 253.2,213.2 252.1,212.6 250.5,212.4 249.7,211.8 249.8,211.4 250.8,210.7 251.3,210.4 251.1,210.1 251.8,209.9Z","i":0,"y":0},{"n":"Guatemala","d":"M243.8,209.6 243.9,208.8 244.2,208.2 243.8,207.6 245.1,205.4 248.7,205.4 248.8,204.4 248.3,204.2 248.0,203.6 247.0,203.0 246.0,202.1 247.2,202.1 247.2,200.5 249.8,200.5 252.4,200.5 252.4,202.7 252.1,205.9 253.0,205.9 253.9,206.4 254.1,206.0 254.9,206.3 253.7,207.4 252.3,208.1 252.2,208.7 252.4,209.2 251.8,209.9 251.1,210.1 251.3,210.4 250.8,210.7 249.8,211.4 249.7,211.8 248.3,211.4 246.6,211.3 245.3,210.8 243.8,209.6Z","i":0,"y":0},{"n":"Belize","d":"M252.4,200.5 252.4,200.1 252.7,200.0 253.2,200.3 254.2,198.6 254.7,198.6 254.7,199.0 255.3,199.0 255.2,199.8 254.8,201.0 255.0,201.4 254.7,202.4 254.9,202.7 254.6,204.1 254.0,204.8 253.5,204.9 253.0,205.9 252.1,205.9 252.4,202.7 252.4,200.5Z","i":0,"y":0},{"n":"Venezuela","d":"M331.3,235.6 331.7,236.3 330.6,237.4 327.5,238.4 325.5,238.9 324.7,239.5 322.5,238.8 320.5,238.5 320.0,238.7 321.2,239.5 321.1,241.3 321.5,243.1 323.8,243.3 324.0,243.9 322.0,244.7 321.7,245.9 320.5,246.3 318.5,247.0 317.9,247.8 315.8,248.0 314.2,246.5 313.4,243.7 312.6,242.8 311.6,242.2 313.0,240.8 313.0,240.2 312.2,239.3 311.6,237.5 311.8,235.5 312.4,234.6 312.9,233.1 312.0,232.6 310.4,232.9 308.4,232.8 307.3,233.1 305.3,230.7 303.7,230.3 300.1,230.6 299.4,229.6 298.8,229.4 298.7,228.8 299.0,227.8 298.8,226.7 298.2,226.0 297.8,224.8 296.4,224.6 297.1,223.0 297.5,221.0 298.3,219.9 299.4,219.1 300.1,217.8 301.9,217.3 301.8,217.9 300.1,218.3 301.1,219.5 301.0,221.0 299.8,222.6 300.8,224.8 302.0,224.6 302.7,222.6 301.8,221.6 301.7,219.5 305.1,218.4 304.7,217.1 305.7,216.2 306.7,218.2 308.7,218.2 310.5,219.8 310.6,220.7 313.1,220.7 316.0,220.4 317.6,221.7 319.7,222.0 321.3,221.1 321.3,220.4 324.8,220.3 328.1,220.2 325.7,221.1 326.7,222.4 328.9,222.6 331.0,223.9 331.5,226.2 332.9,226.1 334.0,226.8 331.8,228.4 331.6,229.4 332.5,230.4 331.8,231.0 330.1,231.4 330.2,232.7 329.4,233.4 331.3,235.6Z","i":0,"y":0},{"n":"Guyana","d":"M342.9,244.7 342.3,244.8 340.7,244.6 339.8,245.3 338.6,245.8 337.7,245.9 337.4,246.5 336.0,246.3 334.3,245.0 334.1,243.8 333.4,242.3 333.8,240.0 334.6,239.0 334.0,237.7 333.0,237.3 333.4,236.1 332.7,235.4 331.3,235.6 329.4,233.4 330.2,232.7 330.1,231.4 331.8,231.0 332.5,230.4 331.6,229.4 331.8,228.4 334.0,226.8 335.8,227.8 337.5,229.6 337.6,231.0 338.7,231.1 340.2,232.4 341.3,233.4 340.8,235.9 339.1,236.6 339.3,237.3 338.8,238.7 340.0,240.7 340.9,240.7 341.2,242.3 342.9,244.7Z","i":0,"y":0},{"n":"Suriname","d":"M348.5,243.6 347.0,243.0 345.6,243.3 344.5,243.0 344.2,243.8 344.7,244.4 344.5,245.0 342.9,244.7 341.2,242.3 340.9,240.7 340.0,240.7 338.8,238.7 339.3,237.3 339.1,236.6 340.8,235.9 341.3,233.4 344.6,234.0 344.9,233.5 347.1,233.3 350.1,234.0 348.7,236.4 348.9,238.3 350.0,239.9 349.5,241.1 349.3,242.4 348.5,243.6Z","i":0,"y":0},{"n":"France","d":"M356.5,238.5 354.9,241.0 354.0,243.0 352.9,244.1 351.6,244.3 351.2,243.5 350.6,243.4 349.8,244.2 348.5,243.6 349.3,242.4 349.5,241.1 350.0,239.9 348.9,238.3 348.7,236.4 350.1,234.0 351.1,234.3 353.1,235.0 356.0,237.3 356.5,238.5ZM517.2,112.6 518.5,113.3 522.5,113.8 521.1,115.7 520.7,117.7 520.0,118.2 518.7,117.9 518.8,118.6 516.8,120.2 516.7,121.5 518.1,121.0 519.0,122.2 518.9,123.0 519.7,124.1 518.7,124.9 519.5,127.1 521.0,127.4 520.7,128.6 518.1,130.2 512.7,129.4 508.6,130.3 508.3,132.0 505.1,132.4 501.9,131.1 500.9,131.7 495.8,130.5 494.7,129.4 496.2,127.7 496.7,122.2 493.8,119.3 491.8,117.9 487.5,116.8 487.2,114.8 490.8,114.2 495.5,114.9 494.6,111.7 497.3,112.9 503.7,110.8 504.6,108.5 507.0,107.9 507.4,108.9 508.7,108.9 510.0,110.1 511.9,111.4 513.3,111.2 515.8,112.4 516.4,112.7 517.2,112.6ZM524.3,131.6 526.1,130.5 526.6,132.9 525.6,135.1 524.4,134.5 523.7,132.6 524.3,131.6Z","i":22,"y":13},{"n":"Ecuador","d":"M290.6,250.4 291.0,252.5 290.2,254.3 287.1,257.2 283.8,258.3 282.1,260.8 281.6,262.6 280.0,263.8 278.8,262.4 277.7,262.1 276.5,262.3 276.5,261.3 277.3,260.6 276.9,259.5 278.4,257.4 277.8,256.2 276.8,257.5 275.1,256.2 275.7,255.5 275.2,252.9 276.2,252.5 276.7,250.8 277.7,249.0 277.5,247.9 279.0,247.3 281.0,246.2 283.7,247.8 284.3,247.7 284.9,248.9 287.3,249.3 288.1,248.8 289.4,249.8 290.6,250.4Z","i":1,"y":0},{"n":"Puerto Rico","d":"M315.9,198.6 317.3,198.8 317.8,199.4 317.1,200.1 315.0,200.1 313.4,200.1 313.2,199.0 313.6,198.6 315.9,198.6Z","i":0,"y":0},{"n":"Jamaica","d":"M284.5,198.6 286.4,198.9 287.9,199.6 288.3,200.3 286.4,200.4 285.5,200.8 284.0,200.4 282.4,199.4 282.7,198.7 283.9,198.5 284.5,198.6Z","i":0,"y":0},{"n":"Cuba","d":"M271.5,185.6 273.9,185.8 276.1,185.8 278.7,186.8 279.8,187.8 282.4,187.5 283.4,188.1 285.7,189.8 287.4,191.1 288.3,191.1 290.0,191.6 289.8,192.4 291.9,192.5 293.9,193.7 293.6,194.3 291.8,194.7 289.9,194.8 288.0,194.6 284.0,194.8 285.9,193.3 284.7,192.6 283.0,192.4 282.0,191.6 281.3,190.0 279.8,190.1 277.2,189.4 276.3,188.8 272.7,188.4 271.8,187.8 272.8,187.1 270.1,187.0 268.1,188.4 266.9,188.5 266.5,189.1 265.1,189.4 264.0,189.2 265.4,188.3 266.0,187.3 267.3,186.7 268.7,186.2 270.8,185.9 271.5,185.6Z","i":0,"y":0},{"n":"Zimbabwe","d":"M586.6,311.8 585.2,311.5 584.2,311.9 582.9,311.4 581.8,311.4 580.0,310.1 577.8,309.7 577.0,307.9 577.0,306.9 575.8,306.6 572.7,303.6 571.8,302.0 571.2,301.5 570.2,299.3 573.3,299.6 574.2,299.9 575.1,299.8 576.7,298.0 579.1,295.7 580.1,295.5 580.4,294.6 582.0,293.5 584.1,293.1 584.3,294.1 586.6,294.1 587.9,294.6 588.5,295.3 589.8,295.5 591.2,296.4 591.2,299.9 590.7,301.9 590.6,303.9 591.0,304.8 590.7,306.4 590.3,306.7 589.6,308.7 586.6,311.8Z","i":0,"y":0},{"n":"Botswana","d":"M581.8,311.4 577.8,313.4 575.3,315.5 574.4,317.3 573.6,318.4 572.1,318.6 571.6,319.9 571.3,320.8 569.5,321.4 567.3,321.3 565.9,320.5 564.8,320.2 563.4,320.8 562.7,322.2 561.4,323.0 560.0,324.2 558.0,324.5 557.4,323.5 557.7,321.9 556.0,319.2 555.3,318.8 555.3,310.7 558.0,310.6 558.1,300.7 560.2,300.6 564.4,299.6 565.5,300.8 567.3,299.7 568.1,299.7 569.7,299.1 570.2,299.3 571.2,301.5 571.8,302.0 572.7,303.6 575.8,306.6 577.0,306.9 577.0,307.9 577.8,309.7 580.0,310.1 581.8,311.4Z","i":0,"y":0},{"n":"Namibia","d":"M555.3,318.8 555.3,329.1 552.8,330.5 551.3,330.7 549.5,330.2 548.3,330.0 547.8,328.8 546.7,328.0 545.4,329.4 543.3,327.3 542.3,325.3 541.6,322.5 541.0,320.5 540.0,316.3 540.0,312.9 539.6,311.4 538.5,310.3 537.1,308.0 535.6,304.6 535.0,302.9 532.8,300.2 532.6,298.1 533.9,297.5 535.6,297.1 537.4,297.1 539.1,298.4 539.5,298.2 550.7,298.1 552.7,299.4 559.4,299.8 564.5,298.7 566.8,298.0 568.6,298.2 569.7,298.8 569.7,299.1 568.1,299.7 567.3,299.7 565.5,300.8 564.4,299.6 560.2,300.6 558.1,300.7 558.0,310.6 555.3,310.7 555.3,318.8Z","i":0,"y":0},{"n":"Senegal","d":"M453.6,212.2 452.4,210.1 451.0,209.1 452.3,208.6 453.6,206.6 454.3,205.2 455.2,204.3 456.6,204.5 458.0,203.9 459.5,203.9 460.8,204.7 462.7,205.4 464.4,207.5 466.2,209.4 466.3,211.1 466.9,212.7 467.9,213.5 468.1,214.6 468.0,215.4 467.6,215.6 466.1,215.4 465.9,215.7 465.3,215.7 463.3,215.1 461.9,215.0 456.8,214.9 456.1,215.2 455.1,215.1 453.7,215.6 453.2,213.5 455.7,213.5 456.4,213.1 456.9,213.1 457.9,212.5 459.1,213.1 460.3,213.1 461.5,212.5 461.0,211.7 460.1,212.2 459.2,212.1 458.1,211.5 457.2,211.5 456.6,212.2 453.6,212.2Z","i":0,"y":0},{"n":"Mali","d":"M468.0,215.4 468.1,214.6 467.9,213.5 466.9,212.7 466.3,211.1 466.2,209.4 467.1,208.9 467.6,207.3 468.5,207.2 470.4,208.0 472.0,207.4 473.1,207.6 473.5,207.0 484.6,206.9 485.2,205.0 484.8,204.7 483.4,192.7 482.1,180.7 486.3,180.6 495.7,186.7 505.1,192.7 505.7,194.0 507.5,194.8 508.7,195.3 508.8,197.1 511.9,196.8 511.9,203.2 510.3,205.0 510.1,206.8 507.6,207.2 503.8,207.4 502.8,208.4 501.0,208.5 499.3,208.5 498.6,208.0 497.0,208.4 494.4,209.6 493.9,210.4 491.8,211.7 491.4,212.4 490.2,213.0 488.9,212.6 488.1,213.3 487.7,215.2 485.5,217.5 485.6,218.4 484.8,219.6 485.0,221.2 483.8,221.6 483.2,222.0 482.8,220.8 482.0,221.1 481.5,221.0 481.0,221.8 478.8,221.8 478.1,221.4 477.7,221.6 476.8,220.8 477.0,220.0 476.6,219.7 476.1,220.0 476.2,219.1 476.7,218.4 475.6,217.2 475.3,216.4 474.6,215.8 474.1,215.7 473.4,216.1 472.5,216.5 471.8,217.1 470.6,216.9 469.8,216.2 469.3,216.1 468.6,216.5 468.2,216.5 468.0,215.4Z","i":0,"y":0},{"n":"Mauritania","d":"M452.6,191.7 453.2,190.7 464.1,190.8 463.6,186.7 464.2,185.3 466.8,185.1 466.8,178.0 475.9,178.1 475.9,173.9 486.3,180.6 482.1,180.7 483.4,192.7 484.8,204.7 485.2,205.0 484.6,206.9 473.5,207.0 473.1,207.6 472.0,207.4 470.4,208.0 468.5,207.2 467.6,207.3 467.1,208.9 466.2,209.4 464.4,207.5 462.7,205.4 460.8,204.7 459.5,203.9 458.0,203.9 456.6,204.5 455.2,204.3 454.3,205.2 454.0,203.7 454.8,202.3 455.1,199.7 454.8,197.0 454.5,195.6 454.8,194.2 454.1,192.9 452.6,191.7Z","i":0,"y":0},{"n":"Benin","d":"M507.5,232.6 505.2,232.9 504.5,231.0 504.6,224.6 504.1,224.1 504.0,222.7 503.0,221.7 502.1,220.9 502.5,219.5 503.5,219.1 504.0,217.9 505.4,217.7 506.0,216.8 506.9,216.0 507.9,216.0 510.0,217.6 509.9,218.5 510.5,220.2 510.0,221.3 510.3,222.0 508.9,223.8 508.1,224.6 507.6,226.4 507.6,228.1 507.5,232.6Z","i":0,"y":0},{"n":"Niger","d":"M541.3,186.5 541.9,190.8 543.0,191.5 543.0,192.4 544.2,193.4 543.6,194.6 542.5,200.2 542.4,203.8 538.8,206.4 537.6,210.1 538.8,211.1 538.8,212.9 540.5,213.0 540.3,214.3 539.5,214.4 539.4,215.3 538.9,215.4 537.0,212.3 536.3,212.2 534.2,213.8 532.0,213.0 530.5,212.8 529.7,213.2 528.1,213.1 526.5,214.3 525.0,214.4 521.7,212.9 520.4,213.6 518.9,213.6 517.9,212.5 515.1,211.5 512.1,211.8 511.4,212.4 511.0,214.0 510.2,215.1 510.0,217.6 507.9,216.0 506.9,216.0 506.0,216.8 506.0,214.9 502.8,214.3 502.8,213.0 501.2,211.1 500.8,209.9 501.0,208.5 502.8,208.4 503.8,207.4 507.6,207.2 510.1,206.8 510.3,205.0 511.9,203.2 511.9,196.8 515.8,195.6 523.8,190.1 533.3,184.8 537.7,186.0 539.3,187.5 541.3,186.5Z","i":0,"y":0},{"n":"Nigeria","d":"M507.5,232.6 507.6,228.1 507.6,226.4 508.1,224.6 508.9,223.8 510.3,222.0 510.0,221.3 510.5,220.2 509.9,218.5 510.0,217.6 510.2,215.1 511.0,214.0 511.4,212.4 512.1,211.8 515.1,211.5 517.9,212.5 518.9,213.6 520.4,213.6 521.7,212.9 525.0,214.4 526.5,214.3 528.1,213.1 529.7,213.2 530.5,212.8 532.0,213.0 534.2,213.8 536.3,212.2 537.0,212.3 538.9,215.4 539.4,215.3 540.5,216.4 540.2,216.9 540.0,217.9 537.7,220.0 537.0,221.8 536.6,223.2 536.0,223.8 535.4,225.8 533.9,226.9 533.5,228.3 532.9,229.5 532.6,230.6 530.7,231.5 529.2,230.4 528.1,230.4 526.5,232.1 525.6,232.1 524.3,234.8 523.6,236.7 520.7,237.7 519.7,237.6 518.6,238.2 516.4,238.2 514.9,236.4 514.0,234.4 512.0,232.6 509.9,232.6 507.5,232.6Z","i":0,"y":0},{"n":"Cameroon","d":"M540.3,214.3 541.4,216.1 541.6,217.9 541.5,219.7 543.0,222.3 541.4,222.2 540.6,222.4 539.4,222.2 538.8,223.5 540.4,225.1 541.6,225.6 542.0,226.7 542.9,228.6 542.4,229.4 541.0,232.2 540.4,232.7 540.2,234.9 540.4,236.0 540.2,236.9 541.5,238.3 541.8,239.3 542.8,240.7 544.1,241.6 544.2,242.9 544.5,243.7 544.3,245.2 542.1,244.5 539.8,243.8 536.3,243.7 536.0,243.6 534.3,243.9 532.6,243.5 531.3,243.7 526.8,243.7 527.2,241.5 526.1,239.6 524.9,239.2 524.3,237.9 523.6,237.5 523.6,236.7 524.3,234.8 525.6,232.1 526.5,232.1 528.1,230.4 529.2,230.4 530.7,231.5 532.6,230.6 532.9,229.5 533.5,228.3 533.9,226.9 535.4,225.8 536.0,223.8 536.6,223.2 537.0,221.8 537.7,220.0 540.0,217.9 540.2,216.9 540.5,216.4 539.4,215.3 539.5,214.4 540.3,214.3Z","i":0,"y":0},{"n":"Togo","d":"M502.5,219.5 502.1,220.9 503.0,221.7 504.0,222.7 504.1,224.1 504.6,224.6 504.5,231.0 505.2,232.9 502.9,233.5 502.3,232.6 501.6,230.8 501.4,229.4 502.0,226.9 501.3,225.9 501.0,223.7 501.0,221.7 499.9,220.3 500.1,219.4 502.5,219.5Z","i":0,"y":0},{"n":"Ghana","d":"M500.1,219.4 499.9,220.3 501.0,221.7 501.0,223.7 501.3,225.9 502.0,226.9 501.4,229.4 501.6,230.8 502.3,232.6 502.9,233.5 498.6,235.2 497.0,236.1 494.5,236.9 492.1,236.1 492.2,235.0 491.0,232.6 491.7,229.5 492.9,227.2 492.1,223.2 491.8,221.1 491.8,219.5 496.7,219.4 497.9,219.6 498.8,219.2 500.1,219.4Z","i":0,"y":0},{"n":"C\u00f4te d'Ivoire","d":"M477.7,221.6 478.1,221.4 478.8,221.8 481.0,221.8 481.5,221.0 482.0,221.1 482.8,220.8 483.2,222.0 483.8,221.6 485.0,221.2 486.2,221.8 486.7,222.7 488.0,223.3 488.9,222.6 490.2,222.5 492.1,223.2 492.9,227.2 491.7,229.5 491.0,232.6 492.2,235.0 492.1,236.1 490.8,236.2 488.9,235.6 487.1,235.6 483.8,236.1 481.9,236.9 479.1,237.9 478.6,237.9 478.8,235.6 479.1,235.2 479.0,234.1 477.8,233.0 476.9,232.8 476.1,232.0 476.7,230.8 476.4,229.5 476.6,228.6 477.0,228.6 477.2,227.4 476.9,226.9 477.2,226.5 478.2,226.2 477.6,224.0 476.9,222.8 477.1,221.9 477.7,221.6Z","i":0,"y":0},{"n":"Guinea","d":"M461.9,215.0 463.3,215.1 465.3,215.7 465.9,215.7 466.1,215.4 467.6,215.6 468.0,215.4 468.2,216.5 468.6,216.5 469.3,216.1 469.8,216.2 470.6,216.9 471.8,217.1 472.5,216.5 473.4,216.1 474.1,215.7 474.6,215.8 475.3,216.4 475.6,217.2 476.7,218.4 476.2,219.1 476.1,220.0 476.6,219.7 477.0,220.0 476.8,220.8 477.7,221.6 477.1,221.9 476.9,222.8 477.6,224.0 478.2,226.2 477.2,226.5 476.9,226.9 477.2,227.4 477.0,228.6 476.6,228.6 475.8,228.6 475.2,229.7 474.4,229.7 473.9,229.1 474.1,228.0 472.9,226.3 472.2,226.6 471.6,226.6 470.8,226.8 470.8,225.8 470.4,225.1 470.5,224.3 469.9,223.1 469.1,222.1 466.9,222.1 466.2,222.6 465.5,222.7 465.0,223.3 464.7,224.0 463.2,225.3 462.0,223.6 460.9,222.5 460.2,222.2 459.5,221.6 459.2,220.4 458.8,219.8 458.0,219.3 459.2,218.0 460.0,218.0 460.8,217.6 461.4,217.6 461.8,217.2 461.6,216.3 461.9,216.0 461.9,215.0Z","i":0,"y":0},{"n":"Guinea-Bissau","d":"M453.7,215.6 455.1,215.1 456.1,215.2 456.8,214.9 461.9,215.0 461.9,216.0 461.6,216.3 461.8,217.2 461.4,217.6 460.8,217.6 460.0,218.0 459.2,218.0 458.0,219.3 456.5,218.2 455.3,218.0 454.7,217.2 454.7,216.8 453.9,216.2 453.7,215.6Z","i":0,"y":0},{"n":"Liberia","d":"M476.6,228.6 476.4,229.5 476.7,230.8 476.1,232.0 476.9,232.8 477.8,233.0 479.0,234.1 479.1,235.2 478.8,235.6 478.6,237.9 477.8,237.9 475.0,236.6 472.5,234.5 470.1,232.9 468.2,231.2 468.9,230.3 469.0,229.5 470.3,227.9 471.6,226.6 472.2,226.6 472.9,226.3 474.1,228.0 473.9,229.1 474.4,229.7 475.2,229.7 475.8,228.6 476.6,228.6Z","i":0,"y":0},{"n":"Sierra Leone","d":"M463.2,225.3 464.7,224.0 465.0,223.3 465.5,222.7 466.2,222.6 466.9,222.1 469.1,222.1 469.9,223.1 470.5,224.3 470.4,225.1 470.8,225.8 470.8,226.8 471.6,226.6 470.3,227.9 469.0,229.5 468.9,230.3 468.2,231.2 467.5,230.9 465.5,229.8 464.0,228.3 463.5,227.3 463.2,225.3Z","i":0,"y":0},{"n":"Burkina Faso","d":"M485.0,221.2 484.8,219.6 485.6,218.4 485.5,217.5 487.7,215.2 488.1,213.3 488.9,212.6 490.2,213.0 491.4,212.4 491.8,211.7 493.9,210.4 494.4,209.6 497.0,208.4 498.6,208.0 499.3,208.5 501.0,208.5 500.8,209.9 501.2,211.1 502.8,213.0 502.8,214.3 506.0,214.9 506.0,216.8 505.4,217.7 504.0,217.9 503.5,219.1 502.5,219.5 500.1,219.4 498.8,219.2 497.9,219.6 496.7,219.4 491.8,219.5 491.8,221.1 492.1,223.2 490.2,222.5 488.9,222.6 488.0,223.3 486.7,222.7 486.2,221.8 485.0,221.2Z","i":0,"y":0},{"n":"Central African Rep.","d":"M576.0,235.5 575.1,235.8 573.3,235.7 571.3,235.4 570.2,235.6 569.8,236.3 568.9,236.4 567.8,235.8 564.7,237.2 563.4,236.9 563.1,237.1 562.2,238.8 560.2,238.3 558.1,238.0 556.4,237.0 554.1,236.0 552.6,236.9 551.5,238.3 551.3,240.3 549.5,240.1 547.6,239.6 545.9,241.1 544.5,243.7 544.2,242.9 544.1,241.6 542.8,240.7 541.8,239.3 541.5,238.3 540.2,236.9 540.4,236.0 540.2,234.9 540.4,232.7 541.0,232.2 542.4,229.4 544.7,229.2 545.3,228.5 545.7,228.5 546.4,229.1 549.9,228.1 551.1,227.0 552.5,226.0 552.3,225.0 553.0,224.8 555.7,225.0 558.3,223.7 560.3,220.6 561.8,219.5 563.5,219.0 563.8,220.2 565.4,222.0 565.4,223.1 565.0,224.3 565.2,225.1 566.1,225.9 568.2,227.1 569.8,228.3 569.8,229.2 571.7,230.6 572.8,231.8 573.5,233.5 575.6,234.6 576.0,235.5Z","i":0,"y":0},{"n":"Congo","d":"M551.3,240.3 551.1,241.9 550.3,243.4 549.7,245.2 549.4,247.6 549.5,249.2 549.1,250.2 549.0,251.2 548.7,252.1 546.8,253.4 545.6,254.8 544.4,257.5 544.5,259.8 543.8,260.7 542.1,262.1 540.5,263.8 539.5,263.3 539.3,262.5 537.8,262.5 536.8,263.6 536.1,263.3 535.1,262.3 534.2,262.8 533.1,264.0 530.8,261.1 532.9,259.5 531.9,257.7 532.8,257.0 534.7,256.6 534.9,255.4 536.4,256.7 538.9,256.9 539.7,255.6 540.1,253.7 539.8,251.5 538.5,249.9 539.7,246.7 539.0,246.1 536.9,246.3 536.1,244.9 536.3,243.7 539.8,243.8 542.1,244.5 544.3,245.2 544.5,243.7 545.9,241.1 547.6,239.6 549.5,240.1 551.3,240.3Z","i":0,"y":0},{"n":"Gabon","d":"M531.3,243.7 532.6,243.5 534.3,243.9 536.0,243.6 536.3,243.7 536.1,244.9 536.9,246.3 539.0,246.1 539.7,246.7 538.5,249.9 539.8,251.5 540.1,253.7 539.7,255.6 538.9,256.9 536.4,256.7 534.9,255.4 534.7,256.6 532.8,257.0 531.9,257.7 532.9,259.5 530.8,261.1 528.0,258.2 526.1,256.0 524.4,253.1 524.5,252.2 525.1,251.3 525.8,249.3 526.4,247.2 527.3,247.0 531.3,247.1 531.3,243.7Z","i":0,"y":0},{"n":"Eq. Guinea","d":"M526.8,243.7 531.3,243.7 531.3,247.1 527.3,247.0 526.4,247.2 525.8,246.8 526.8,243.7Z","i":0,"y":0},{"n":"Zambia","d":"M585.4,273.2 586.5,273.9 587.7,274.3 589.4,274.8 591.0,275.6 592.3,276.9 593.0,279.2 592.5,280.0 592.0,282.2 592.5,284.5 591.6,285.5 590.8,288.1 592.3,288.8 583.8,291.1 584.1,293.1 582.0,293.5 580.4,294.6 580.1,295.5 579.1,295.7 576.7,298.0 575.1,299.8 574.2,299.9 573.3,299.6 570.2,299.3 569.7,299.1 569.7,298.8 568.6,298.2 566.8,298.0 564.5,298.7 562.7,296.9 560.8,294.7 560.9,285.8 566.7,285.9 566.5,284.9 566.9,283.9 566.4,282.6 566.7,281.2 566.4,280.4 567.4,280.4 567.5,281.3 568.8,281.2 570.6,281.5 571.5,282.7 573.8,283.1 575.5,282.2 576.1,283.7 578.2,284.1 579.2,285.3 580.4,286.8 582.5,286.8 582.3,283.8 581.5,284.3 579.6,283.3 578.8,282.8 579.2,280.0 579.6,276.7 579.0,275.5 579.8,273.7 580.6,273.4 584.3,272.9 585.4,273.2Z","i":0,"y":0},{"n":"Malawi","d":"M591.0,275.6 593.7,276.2 594.3,276.9 595.2,278.2 596.0,282.0 595.2,284.1 596.0,287.7 597.0,287.7 598.0,288.6 599.1,290.6 599.4,294.2 598.2,294.7 597.3,296.7 595.5,295.0 595.3,293.0 595.9,291.7 595.7,290.6 594.6,289.9 593.9,290.1 592.3,288.8 590.8,288.1 591.6,285.5 592.5,284.5 592.0,282.2 592.5,280.0 593.0,279.2 592.3,276.9 591.0,275.6Z","i":0,"y":0},{"n":"Mozambique","d":"M596.0,282.0 598.1,281.8 601.4,282.6 602.2,282.2 604.1,282.1 605.1,281.3 606.7,281.3 609.8,280.3 612.0,278.7 612.0,278.7 612.0,278.7 612.4,279.9 612.3,282.7 612.7,285.1 612.8,289.4 613.3,290.8 612.4,292.8 611.4,294.7 609.6,296.4 607.1,297.5 603.9,298.9 600.8,301.8 599.7,302.3 597.8,304.3 596.6,305.0 596.4,306.9 597.7,309.0 598.3,310.7 598.3,311.5 598.8,311.4 598.7,314.1 598.3,315.4 598.9,315.9 598.5,317.0 597.3,318.0 595.0,318.9 591.7,320.4 590.5,321.5 590.7,322.6 591.4,322.8 591.2,324.3 589.1,324.3 588.8,323.0 588.4,321.8 588.2,320.8 588.7,317.7 588.0,315.7 586.6,311.8 589.6,308.7 590.3,306.7 590.7,306.4 591.0,304.8 590.6,303.9 590.7,301.9 591.2,299.9 591.2,296.4 589.8,295.5 588.5,295.3 587.9,294.6 586.6,294.1 584.3,294.1 584.1,293.1 583.8,291.1 592.3,288.8 593.9,290.1 594.6,289.9 595.7,290.6 595.9,291.7 595.3,293.0 595.5,295.0 597.3,296.7 598.2,294.7 599.4,294.2 599.1,290.6 598.0,288.6 597.0,287.7 596.0,287.7 595.2,284.1 596.0,282.0Z","i":0,"y":0},{"n":"eSwatini","d":"M589.1,324.3 588.5,325.5 586.9,325.8 585.2,324.3 585.2,323.3 586.0,322.3 586.2,321.5 587.0,321.3 588.4,321.8 588.8,323.0 589.1,324.3Z","i":0,"y":0},{"n":"Angola","d":"M536.1,263.3 535.1,263.9 534.6,264.6 534.5,265.8 533.8,266.1 533.1,264.0 534.2,262.8 535.1,262.3 536.1,263.3ZM534.2,266.9 535.4,266.6 536.2,266.6 537.2,266.3 545.4,266.3 546.0,268.4 546.8,270.1 547.5,271.0 548.5,272.4 550.4,272.2 551.3,271.8 552.8,272.2 553.2,271.5 553.9,269.9 555.7,269.8 555.8,269.3 557.2,269.3 557.0,270.3 560.4,270.3 560.4,272.0 561.0,273.1 560.6,274.7 560.8,276.5 561.7,277.5 561.5,280.8 562.2,280.5 563.4,280.6 565.2,280.2 566.4,280.4 566.7,281.2 566.4,282.6 566.9,283.9 566.5,284.9 566.7,285.9 560.9,285.8 560.8,294.7 562.7,296.9 564.5,298.7 559.4,299.8 552.7,299.4 550.7,298.1 539.5,298.2 539.1,298.4 537.4,297.1 535.6,297.1 533.9,297.5 532.6,298.1 532.3,296.3 532.7,293.9 533.7,291.3 533.8,290.1 534.7,287.6 535.4,286.5 537.0,284.7 537.9,283.4 538.2,281.4 538.0,279.8 537.2,278.8 536.4,277.1 535.8,275.5 535.9,274.9 536.8,273.8 535.9,271.1 535.4,269.2 534.0,267.5 534.2,266.9Z","i":0,"y":0},{"n":"Burundi","d":"M584.6,256.7 584.8,257.8 585.4,258.4 585.4,259.3 584.7,259.9 583.7,261.4 582.6,262.4 581.5,262.5 581.3,259.1 580.6,257.9 582.3,258.1 583.2,256.5 584.6,256.7Z","i":0,"y":0},{"n":"Israel","d":"M599.2,159.1 598.7,160.0 597.7,159.6 597.2,161.5 597.8,161.8 597.1,162.2 597.0,162.9 598.3,162.5 598.4,163.6 597.0,168.1 596.7,167.3 595.2,163.3 595.2,163.3 595.2,163.3 596.0,162.4 595.8,162.2 596.5,160.9 597.1,158.8 597.5,158.1 597.6,158.1 598.5,158.1 598.8,157.6 599.5,157.6 599.5,158.7 599.2,159.1 599.2,159.1Z","i":0,"y":0},{"n":"Lebanon","d":"M599.5,157.6 598.8,157.6 598.5,158.1 597.6,158.1 598.6,155.8 599.9,153.9 600.0,153.8 601.2,153.9 601.7,155.0 600.2,156.0 599.5,157.6Z","i":0,"y":0},{"n":"Madagascar","d":"M637.6,284.6 638.4,285.8 639.0,287.7 639.5,291.0 640.2,292.3 639.9,293.6 639.4,294.4 638.5,292.8 638.0,293.6 638.5,295.7 638.3,296.9 637.5,297.5 637.3,299.9 636.2,303.1 634.9,306.9 633.1,312.2 632.1,316.1 630.8,319.3 628.6,319.9 626.1,321.1 624.5,320.4 622.3,319.4 621.6,317.9 621.4,315.5 620.4,313.3 620.2,311.3 620.6,309.3 621.9,308.8 621.9,307.9 623.3,305.8 623.5,304.0 622.9,302.7 622.3,300.9 622.1,298.4 623.1,296.8 623.5,295.0 624.8,294.9 626.4,294.4 627.4,293.9 628.6,293.8 630.2,292.3 632.5,290.5 633.3,289.1 633.0,288.0 634.1,288.3 635.7,286.4 635.7,284.7 636.7,283.4 637.6,284.6Z","i":0,"y":0},{"n":"Palestine","d":"M598.3,162.5 597.0,162.9 597.1,162.2 597.8,161.8 597.2,161.5 597.7,159.6 598.7,160.0 598.7,161.7 598.3,162.5Z","i":0,"y":0},{"n":"Gambia","d":"M453.6,212.2 456.6,212.2 457.2,211.5 458.1,211.5 459.2,212.1 460.1,212.2 461.0,211.7 461.5,212.5 460.3,213.1 459.1,213.1 457.9,212.5 456.9,213.1 456.4,213.1 455.7,213.5 453.2,213.5 453.6,212.2Z","i":0,"y":0},{"n":"Tunisia","d":"M526.3,165.8 525.2,160.8 523.4,159.7 523.4,159.0 521.1,157.4 520.9,155.3 522.6,153.7 523.3,151.4 522.8,148.8 523.4,147.4 526.4,146.3 528.4,146.6 528.3,148.0 530.6,147.0 530.8,147.5 529.4,148.9 529.4,150.1 530.4,150.8 530.0,153.2 528.2,154.6 528.7,156.2 530.2,156.2 530.9,157.5 531.9,158.0 531.8,160.1 530.4,160.9 529.5,161.8 527.6,162.8 527.9,164.0 527.7,165.2 526.3,165.8Z","i":0,"y":0},{"n":"Algeria","d":"M475.9,173.9 475.9,173.4 475.9,173.2 475.9,169.9 480.4,167.8 483.2,167.4 485.4,166.7 486.5,165.3 489.7,164.2 489.9,162.1 491.5,161.9 492.7,160.8 496.4,160.4 496.9,159.3 496.1,158.7 495.2,155.8 495.0,154.1 494.0,152.3 496.6,150.8 499.6,150.3 501.4,149.2 504.1,148.3 508.8,147.8 513.4,147.6 514.8,148.0 517.4,146.9 520.4,146.9 521.5,147.5 523.4,147.4 522.8,148.8 523.3,151.4 522.6,153.7 520.9,155.3 521.1,157.4 523.4,159.0 523.4,159.7 525.2,160.8 526.3,165.8 527.2,168.3 527.4,169.6 526.9,171.8 527.1,173.1 526.7,174.6 527.0,176.4 525.9,177.5 527.5,179.5 527.6,180.7 528.6,182.3 529.9,181.8 532.1,183.1 533.3,184.8 523.8,190.1 515.8,195.6 511.9,196.8 508.8,197.1 508.7,195.3 507.5,194.8 505.7,194.0 505.1,192.7 495.7,186.7 486.3,180.6 475.9,173.9Z","i":0,"y":0},{"n":"Jordan","d":"M598.7,160.0 599.2,159.1 602.3,160.2 607.8,157.3 608.9,160.7 608.3,161.1 602.8,162.5 605.6,165.3 604.6,165.7 604.2,166.7 602.1,167.0 601.4,168.0 600.2,168.9 597.1,168.5 597.0,168.1 598.4,163.6 598.3,162.5 598.7,161.7 598.7,160.0Z","i":0,"y":0},{"n":"United Arab Emirates","d":"M643.3,182.7 643.8,182.5 643.9,183.3 646.0,182.8 648.3,182.9 650.0,183.0 651.9,181.1 654.0,179.3 655.8,177.6 656.3,178.6 656.7,180.8 655.2,180.8 655.0,182.6 655.5,183.0 654.2,183.5 654.2,184.7 653.4,185.8 653.4,186.9 652.8,187.5 644.4,186.1 643.4,183.3 643.3,182.7Z","i":2,"y":4},{"n":"Qatar","d":"M641.1,181.2 641.0,179.2 641.7,177.8 642.5,177.5 643.3,178.3 643.4,180.0 642.7,181.6 642.0,181.8 641.1,181.2Z","i":1,"y":0},{"n":"Kuwait","d":"M633.3,166.7 633.8,168.0 633.6,168.6 634.5,170.7 632.5,170.8 631.8,169.4 629.4,169.2 631.4,166.5 633.3,166.7Z","i":2,"y":3},{"n":"Iraq","d":"M608.9,160.7 607.8,157.3 613.9,154.4 615.0,151.0 614.7,149.0 616.2,148.3 617.6,146.6 618.8,146.2 622.1,146.5 623.0,147.2 624.4,146.7 626.2,150.1 628.0,150.9 628.2,152.5 626.8,153.5 626.2,155.6 628.1,158.3 631.5,159.8 632.9,161.9 632.5,163.9 633.3,163.9 633.4,165.4 634.9,166.9 633.3,166.7 631.4,166.5 629.4,169.2 624.2,168.9 616.4,163.4 612.2,161.4 608.9,160.7Z","i":0,"y":0},{"n":"Oman","d":"M653.4,186.9 653.4,185.8 654.2,184.7 654.2,183.5 655.5,183.0 655.0,182.6 655.2,180.8 656.7,180.8 657.9,182.7 659.5,183.7 661.5,184.0 663.1,184.5 664.4,186.1 665.1,187.1 666.1,187.4 666.1,188.0 665.1,189.7 664.7,190.5 663.5,191.3 662.5,193.3 661.2,193.1 660.6,193.8 660.2,195.2 660.5,197.0 660.3,197.4 659.0,197.4 657.2,198.4 657.0,199.8 656.3,200.3 654.6,200.3 653.5,201.0 653.5,202.1 652.2,202.9 650.7,202.7 648.8,203.6 647.5,203.7 646.6,201.8 644.4,197.2 652.8,194.4 654.6,188.9 653.4,186.9ZM656.3,178.6 655.8,177.6 656.6,176.7 656.9,176.9 656.6,178.1 656.3,178.6Z","i":1,"y":0},{"n":"Vanuatu","d":"M964.5,294.1 966.2,295.7 965.3,296.1 964.4,294.9 964.5,294.1ZM963.3,293.5 962.9,292.8 962.9,290.6 964.2,291.5 964.6,293.7 963.9,293.4 963.3,293.5Z","i":0,"y":0},{"n":"Cambodia","d":"M785.0,216.1 784.3,212.8 786.1,210.5 789.7,210.0 792.3,210.4 794.6,211.4 795.8,209.5 798.3,210.5 798.9,212.4 798.6,215.7 793.9,217.9 795.1,219.6 792.2,219.8 789.8,220.9 787.5,220.5 786.4,219.0 785.0,216.1Z","i":0,"y":0},{"n":"Thailand","d":"M792.3,210.4 789.7,210.0 786.1,210.5 784.3,212.8 785.0,216.1 782.5,214.9 780.1,214.9 780.5,212.7 778.0,212.8 777.8,215.8 776.3,219.9 775.4,222.3 775.6,224.3 777.4,224.4 778.6,227.0 779.1,229.4 780.6,231.0 782.3,231.3 783.7,232.7 782.8,233.9 781.0,234.2 780.8,232.8 778.5,231.5 778.0,232.0 776.9,231.0 776.4,229.6 775.0,228.0 773.6,226.7 773.2,228.3 772.6,226.8 772.9,225.1 773.8,222.4 775.1,219.6 776.6,217.0 775.5,214.4 775.6,213.1 775.3,211.6 773.4,209.4 772.8,208.0 773.7,207.5 774.7,205.1 773.6,203.2 771.8,201.2 770.5,198.8 771.7,198.3 772.9,195.3 774.9,195.1 776.5,193.9 778.1,193.3 779.3,194.1 779.5,195.8 781.3,195.9 780.7,198.9 780.7,201.4 783.6,199.7 784.5,200.2 786.1,200.1 786.7,199.1 788.8,199.3 790.9,201.6 791.1,204.3 793.3,206.7 793.2,209.1 792.3,210.4Z","i":10,"y":1},{"n":"Laos","d":"M798.3,210.5 795.8,209.5 794.6,211.4 792.3,210.4 793.2,209.1 793.3,206.7 791.1,204.3 790.9,201.6 788.8,199.3 786.7,199.1 786.1,200.1 784.5,200.2 783.6,199.7 780.7,201.4 780.7,198.9 781.3,195.9 779.5,195.8 779.3,194.1 778.1,193.3 778.7,192.3 781.1,190.5 781.3,191.1 782.8,191.2 782.4,188.0 783.8,187.6 785.4,189.8 786.7,192.3 790.1,192.3 791.2,194.8 789.4,195.5 788.6,196.5 791.9,198.1 794.2,201.4 796.0,203.9 798.1,205.8 798.8,207.8 798.3,210.5Z","i":0,"y":0},{"n":"Myanmar","d":"M778.1,193.3 776.5,193.9 774.9,195.1 772.9,195.3 771.7,198.3 770.5,198.8 771.8,201.2 773.6,203.2 774.7,205.1 773.7,207.5 772.8,208.0 773.4,209.4 775.3,211.6 775.6,213.1 775.5,214.4 776.6,217.0 775.1,219.6 773.8,222.4 773.5,220.3 774.3,218.2 773.4,216.6 773.6,213.5 772.5,212.1 771.6,208.8 771.1,205.3 769.9,203.0 768.1,204.4 764.9,206.3 763.4,206.1 761.6,205.5 762.6,202.0 762.0,199.4 759.8,196.2 760.2,195.2 758.6,194.8 756.6,192.6 756.4,190.3 757.4,190.8 757.4,188.8 758.8,188.1 758.5,186.9 759.1,186.0 759.2,183.1 761.4,183.7 762.6,181.5 762.8,180.1 764.3,177.8 764.2,176.2 767.8,174.3 769.8,174.8 769.6,173.1 770.6,172.5 770.4,171.5 772.0,171.3 772.9,172.9 774.1,173.6 774.2,175.7 774.1,178.0 771.5,180.3 771.1,183.6 774.1,183.2 774.7,185.7 776.5,186.3 775.7,188.6 777.7,189.6 778.9,190.1 781.0,189.3 781.1,190.5 778.7,192.3 778.1,193.3Z","i":0,"y":0},{"n":"Vietnam","d":"M789.8,220.9 792.2,219.8 795.1,219.6 793.9,217.9 798.6,215.7 798.9,212.4 798.3,210.5 798.8,207.8 798.1,205.8 796.0,203.9 794.2,201.4 791.9,198.1 788.6,196.5 789.4,195.5 791.2,194.8 790.1,192.3 786.7,192.3 785.4,189.8 783.8,187.6 785.3,186.9 787.5,186.9 790.2,186.6 792.6,185.1 793.9,186.2 796.5,186.7 796.0,188.3 797.3,189.4 800.1,190.1 796.4,192.5 794.1,195.1 793.5,197.1 795.6,200.0 798.2,203.6 800.7,205.3 802.4,207.6 803.7,212.7 803.3,217.6 801.0,219.4 797.8,221.2 795.6,223.5 792.1,226.1 791.1,224.3 791.9,222.4 789.8,220.9Z","i":3,"y":1},{"n":"North Korea","d":"M863.3,132.7 863.3,132.7 863.3,132.7 863.3,132.7ZM862.9,132.2 862.9,132.2 863.3,132.7 862.2,132.6 861.0,133.5 860.2,134.4 860.3,136.4 858.9,137.1 858.4,137.5 857.3,138.4 855.5,138.8 854.3,139.6 854.2,140.8 853.8,141.1 855.0,141.5 856.5,142.7 856.1,143.4 854.9,143.6 853.0,143.7 851.9,145.0 850.7,144.9 850.5,145.1 849.1,144.6 848.8,145.1 848.0,145.4 847.9,144.8 847.2,144.6 846.4,144.1 847.2,142.9 847.8,142.6 847.6,142.1 848.3,140.6 848.1,140.1 846.5,139.8 845.2,139.1 847.4,137.3 850.5,135.8 852.4,133.8 853.7,134.7 856.1,134.8 855.7,133.3 860.0,132.2 861.1,130.6 862.9,132.2Z","i":0,"y":0},{"n":"South Korea","d":"M850.5,145.1 850.7,144.9 851.9,145.0 853.0,143.7 854.9,143.6 856.1,143.4 856.5,142.7 858.9,146.0 859.6,147.8 859.6,151.0 858.6,152.5 856.1,153.1 853.9,154.2 851.3,154.5 851.0,153.0 851.6,150.9 850.3,148.0 852.4,147.5 850.5,145.1Z","i":16,"y":14},{"n":"Mongolia","d":"M743.8,113.1 746.7,112.6 752.0,110.2 756.2,108.9 758.6,109.7 761.5,109.8 763.4,111.1 766.2,111.2 770.2,111.9 772.9,109.9 771.7,108.3 774.6,105.4 777.7,106.6 780.2,106.9 783.5,107.6 784.0,109.7 788.0,110.9 790.6,110.3 794.1,110.0 796.9,110.3 799.6,111.7 801.3,113.1 803.9,113.1 807.4,113.5 809.9,112.8 813.6,112.4 817.7,110.4 819.3,110.7 820.8,111.7 824.1,111.4 822.8,113.5 820.8,116.3 821.5,117.4 823.1,117.1 825.8,117.5 828.0,116.5 830.2,117.4 832.7,119.3 832.4,120.3 830.2,120.0 826.2,120.4 824.2,121.1 822.2,123.0 817.9,124.1 815.2,125.5 812.3,125.0 810.8,124.7 809.3,126.5 810.2,127.6 810.6,128.5 808.7,129.4 806.7,130.9 803.5,131.9 799.3,132.0 794.8,133.0 791.6,134.5 790.3,133.6 787.0,133.6 782.9,131.9 780.1,131.5 776.4,131.9 770.7,131.3 767.6,131.3 766.0,129.7 764.7,127.1 763.0,126.8 759.7,125.1 755.9,124.7 752.6,124.2 751.6,123.0 752.7,119.8 750.8,117.5 746.8,116.5 744.5,115.0 743.8,113.1Z","i":0,"y":0},{"n":"India","d":"M770.4,171.5 770.6,172.5 769.6,173.1 769.8,174.8 767.8,174.3 764.2,176.2 764.3,177.8 762.8,180.1 762.6,181.5 761.4,183.7 759.2,183.1 759.1,186.0 758.5,186.9 758.8,188.1 757.4,188.8 756.0,184.4 755.2,184.4 754.7,186.2 753.2,184.7 754.1,183.1 755.3,183.0 756.6,180.6 755.0,180.1 752.4,180.2 749.8,179.8 749.5,177.9 748.2,177.7 746.0,176.5 745.0,178.4 747.0,179.9 745.3,180.9 744.7,181.9 746.4,182.7 745.9,184.4 746.9,186.4 747.3,188.7 746.9,189.7 745.0,189.7 741.6,190.3 741.8,192.4 740.3,194.0 736.3,195.9 733.2,199.2 731.1,200.9 728.3,202.7 728.3,204.0 726.9,204.7 724.4,205.7 723.1,205.8 722.3,208.0 722.9,211.6 723.0,213.9 721.8,216.5 721.8,221.2 720.4,221.4 719.1,223.5 720.0,224.4 717.4,225.2 716.5,227.1 715.4,227.9 712.8,225.3 711.5,221.4 710.4,218.6 709.4,217.3 708.0,214.6 707.3,211.1 706.8,209.4 704.3,205.6 703.1,200.2 702.3,196.6 702.3,193.3 701.8,190.7 697.7,192.3 695.8,192.0 692.1,188.6 693.5,187.6 692.6,186.5 689.4,184.2 691.2,182.3 697.3,182.3 696.8,180.0 695.2,178.5 694.9,176.4 693.1,175.2 696.2,172.3 699.4,172.5 702.3,169.6 704.0,166.7 706.7,163.9 706.7,162.0 709.1,160.4 706.8,159.0 705.8,157.1 704.9,154.7 706.2,153.5 710.4,154.2 713.5,153.7 716.2,151.4 719.2,154.7 718.9,156.9 720.0,158.3 719.9,159.8 717.9,159.4 718.7,162.5 721.4,164.2 725.3,166.2 723.5,167.4 722.5,170.0 725.2,171.1 727.8,172.4 731.4,174.0 735.2,174.3 736.8,175.8 739.0,176.0 742.3,176.7 744.6,176.6 744.9,175.5 744.6,173.8 744.8,172.6 746.5,172.0 746.7,174.2 746.8,174.7 749.3,175.8 751.0,175.3 753.4,175.5 755.6,175.4 755.8,173.7 754.7,172.9 757.0,172.5 759.5,170.4 762.7,168.7 765.0,169.4 767.0,168.2 768.3,169.9 767.4,171.1 770.4,171.5Z","i":11,"y":4},{"n":"Bangladesh","d":"M757.4,188.8 757.4,190.8 756.4,190.3 756.6,192.6 755.8,191.1 755.6,189.7 755.1,188.4 753.9,186.8 751.4,186.7 751.6,187.8 750.8,189.3 749.6,188.8 749.2,189.3 748.4,189.0 747.3,188.7 746.9,186.4 745.9,184.4 746.4,182.7 744.7,181.9 745.3,180.9 747.0,179.9 745.0,178.4 746.0,176.5 748.2,177.7 749.5,177.9 749.8,179.8 752.4,180.2 755.0,180.1 756.6,180.6 755.3,183.0 754.1,183.1 753.2,184.7 754.7,186.2 755.2,184.4 756.0,184.4 757.4,188.8Z","i":0,"y":0},{"n":"Bhutan","d":"M754.7,172.9 755.8,173.7 755.6,175.4 753.4,175.5 751.0,175.3 749.3,175.8 746.8,174.7 746.7,174.2 748.5,172.1 750.0,171.4 752.0,172.0 753.5,172.1 754.7,172.9Z","i":0,"y":0},{"n":"Nepal","d":"M744.8,172.6 744.6,173.8 744.9,175.5 744.6,176.6 742.3,176.7 739.0,176.0 736.8,175.8 735.2,174.3 731.4,174.0 727.8,172.4 725.2,171.1 722.5,170.0 723.5,167.4 725.3,166.2 726.5,165.5 728.7,166.3 731.5,168.2 733.1,168.6 734.0,169.9 736.1,170.4 738.4,171.7 741.5,172.3 744.8,172.6Z","i":0,"y":0},{"n":"Pakistan","d":"M716.2,151.4 713.5,153.7 710.4,154.2 706.2,153.5 704.9,154.7 705.8,157.1 706.8,159.0 709.1,160.4 706.7,162.0 706.7,163.9 704.0,166.7 702.3,169.6 699.4,172.5 696.2,172.3 693.1,175.2 694.9,176.4 695.2,178.5 696.8,180.0 697.3,182.3 691.2,182.3 689.4,184.2 687.3,183.5 686.5,181.5 684.4,179.4 679.3,179.9 674.7,179.9 670.8,180.3 671.9,177.1 675.9,175.7 675.6,174.4 674.3,173.9 674.2,171.5 671.6,170.3 670.5,168.6 669.1,167.1 673.7,168.6 676.5,168.1 678.2,168.5 678.8,167.9 680.7,168.1 684.3,167.0 684.4,164.6 685.9,163.0 688.0,163.0 688.3,162.3 690.4,161.9 691.5,162.2 692.5,161.4 692.4,159.7 693.6,158.0 695.3,157.3 694.3,155.5 696.9,155.6 697.7,154.6 697.5,153.5 698.9,152.4 698.6,151.0 698.0,149.8 699.6,148.6 702.6,148.0 705.7,147.7 707.2,147.2 708.8,146.9 710.8,148.1 711.6,150.3 716.2,151.4Z","i":0,"y":0},{"n":"Afghanistan","d":"M684.8,146.2 686.3,146.2 688.4,146.8 689.3,147.2 691.3,146.3 692.2,146.8 693.1,145.5 694.8,145.6 695.2,145.2 695.5,144.1 696.7,143.1 698.2,143.7 697.9,144.6 698.7,144.7 698.5,147.0 699.6,147.9 700.5,147.4 701.8,147.1 703.5,145.8 705.4,146.1 708.3,146.1 708.8,146.9 707.2,147.2 705.7,147.7 702.6,148.0 699.6,148.6 698.0,149.8 698.6,151.0 698.9,152.4 697.5,153.5 697.7,154.6 696.9,155.6 694.3,155.5 695.3,157.3 693.6,158.0 692.4,159.7 692.5,161.4 691.5,162.2 690.4,161.9 688.3,162.3 688.0,163.0 685.9,163.0 684.4,164.6 684.3,167.0 680.7,168.1 678.8,167.9 678.2,168.5 676.5,168.1 673.7,168.6 669.1,167.1 671.6,164.6 671.4,162.8 669.3,162.4 669.1,160.6 668.2,158.4 669.3,156.9 668.1,156.5 668.9,154.4 670.0,151.0 672.9,152.0 675.0,151.7 675.5,150.4 677.7,150.0 679.3,149.1 679.9,146.9 682.2,146.4 682.6,145.4 683.9,146.1 684.8,146.2Z","i":0,"y":0},{"n":"Tajikistan","d":"M688.4,146.8 690.0,144.0 689.4,141.9 687.3,141.3 688.1,140.1 690.4,140.2 691.7,138.6 692.6,136.9 696.3,136.2 695.7,137.5 696.1,138.3 697.3,138.2 696.2,139.1 693.2,138.6 693.0,140.2 696.0,140.0 699.4,140.9 704.7,140.5 705.4,143.0 706.3,142.8 708.0,143.4 707.9,144.5 708.3,146.1 705.4,146.1 703.5,145.8 701.8,147.1 700.5,147.4 699.6,147.9 698.5,147.0 698.7,144.7 697.9,144.6 698.2,143.7 696.7,143.1 695.5,144.1 695.2,145.2 694.8,145.6 693.1,145.5 692.2,146.8 691.3,146.3 689.3,147.2 688.4,146.8Z","i":0,"y":0},{"n":"Kyrgyzstan","d":"M697.1,132.6 697.7,131.4 699.6,131.0 704.1,131.9 704.6,130.3 706.1,129.7 710.1,130.9 711.1,130.6 715.7,130.7 719.8,131.0 721.2,132.0 722.9,132.4 722.6,133.0 718.2,134.5 717.2,135.6 713.6,135.9 712.6,137.7 709.6,137.3 707.7,137.9 705.1,139.2 705.4,139.8 704.7,140.5 699.4,140.9 696.0,140.0 693.0,140.2 693.2,138.6 696.2,139.1 697.3,138.2 699.4,138.5 702.9,136.5 699.6,135.0 697.7,135.7 695.6,134.7 697.9,132.9 697.1,132.6Z","i":0,"y":0},{"n":"Turkmenistan","d":"M645.8,133.9 647.1,133.0 650.2,132.4 652.1,133.2 654.0,135.4 655.5,135.3 658.6,135.2 658.1,133.8 660.5,132.9 662.9,131.2 666.6,132.7 666.9,134.9 668.0,135.5 671.0,135.4 671.9,135.9 673.3,138.7 676.4,140.7 678.3,142.0 681.2,143.3 684.9,144.5 684.8,146.2 683.9,146.1 682.6,145.4 682.2,146.4 679.9,146.9 679.3,149.1 677.7,150.0 675.5,150.4 675.0,151.7 672.9,152.0 670.0,151.0 669.8,148.6 667.7,148.5 664.5,146.1 662.3,145.8 659.3,144.4 657.3,144.1 656.1,144.6 654.2,144.5 652.2,146.1 649.8,146.7 649.3,144.7 649.7,141.8 647.5,140.9 648.2,139.0 646.4,138.8 647.0,136.5 649.6,137.1 652.0,136.2 650.0,134.6 649.2,133.0 647.0,133.7 646.7,135.7 645.8,133.9Z","i":0,"y":0},{"n":"Iran","d":"M634.9,166.9 633.4,165.4 633.3,163.9 632.5,163.9 632.9,161.9 631.5,159.8 628.1,158.3 626.2,155.6 626.8,153.5 628.2,152.5 628.0,150.9 626.2,150.1 624.4,146.7 624.4,146.7 622.8,144.5 623.4,143.7 622.5,140.5 624.4,139.7 624.9,140.7 626.3,142.0 628.2,142.4 629.2,142.3 632.5,140.3 633.5,140.0 634.3,140.9 633.4,142.2 635.1,143.7 635.8,143.6 636.7,145.6 639.3,146.2 641.2,147.6 645.2,148.1 649.5,147.3 649.8,146.7 652.2,146.1 654.2,144.5 656.1,144.6 657.3,144.1 659.3,144.4 662.3,145.8 664.5,146.1 667.7,148.5 669.8,148.6 670.0,151.0 668.9,154.4 668.1,156.5 669.3,156.9 668.2,158.4 669.1,160.6 669.3,162.4 671.4,162.8 671.6,164.6 669.1,167.1 670.5,168.6 671.6,170.3 674.2,171.5 674.3,173.9 675.6,174.4 675.9,175.7 671.9,177.1 670.8,180.3 665.6,179.5 662.6,178.9 659.4,178.5 658.3,175.1 656.9,174.6 654.8,175.1 652.0,176.4 648.6,175.5 645.8,173.4 643.1,172.6 641.3,170.0 639.2,166.3 637.7,166.7 635.9,165.8 634.9,166.9Z","i":0,"y":0},{"n":"Syria","d":"M599.2,159.1 599.2,159.1 599.5,158.7 599.5,157.6 600.2,156.0 601.7,155.0 601.2,153.9 600.0,153.8 599.7,151.6 600.4,150.5 601.2,149.9 601.9,149.3 602.1,147.7 603.0,148.3 606.0,147.5 607.5,148.0 609.8,148.0 613.0,147.0 614.5,147.0 617.6,146.6 616.2,148.3 614.7,149.0 615.0,151.0 613.9,154.4 607.8,157.3 602.3,160.2 599.2,159.1Z","i":0,"y":0},{"n":"Armenia","d":"M629.2,142.3 628.2,142.4 627.0,140.8 627.1,140.4 625.8,140.4 625.0,139.6 624.4,139.7 623.3,138.9 621.3,138.2 621.5,136.8 621.1,135.9 624.9,135.4 625.5,136.2 626.6,136.6 626.0,137.3 627.5,138.3 626.7,139.2 627.9,139.9 629.1,140.4 629.2,142.3Z","i":0,"y":0},{"n":"Sweden","d":"M530.6,86.5 531.9,84.9 534.2,83.0 535.1,79.7 533.3,78.3 533.1,74.6 534.9,72.0 537.7,72.1 538.7,71.0 537.7,70.0 542.0,66.1 544.7,63.0 546.6,61.1 549.2,61.1 550.0,59.5 555.2,60.0 555.6,58.2 557.3,58.0 561.1,59.4 565.4,61.3 565.5,65.6 566.4,66.6 561.6,67.4 558.9,69.4 559.4,71.1 554.9,73.3 549.6,75.7 547.6,79.6 549.5,81.6 552.2,83.1 549.6,86.2 546.7,86.9 545.7,91.6 544.1,94.2 540.7,93.9 539.2,96.1 536.0,96.2 535.1,93.6 532.7,90.4 530.6,86.5Z","i":3,"y":0},{"n":"Belarus","d":"M578.3,94.0 581.2,94.7 581.6,95.4 583.0,95.0 585.8,95.7 586.0,97.0 585.4,97.7 587.2,99.6 588.3,100.1 588.1,100.6 590.0,101.1 590.8,101.8 589.7,102.4 587.5,102.3 587.0,102.6 587.6,103.5 588.3,105.3 588.3,105.3 585.9,105.4 585.1,106.0 584.9,107.4 583.8,107.2 581.3,107.3 580.5,106.7 579.5,107.1 578.4,106.7 576.3,106.7 573.2,106.0 570.4,105.8 568.2,105.9 566.7,106.6 565.4,106.7 565.3,105.5 564.4,104.2 566.1,103.6 566.1,102.5 565.4,101.5 565.2,100.2 567.9,100.3 570.9,99.2 571.6,97.6 573.9,96.8 573.6,95.5 575.3,95.0 578.3,94.0Z","i":0,"y":0},{"n":"Ukraine","d":"M588.3,105.3 589.3,105.4 590.0,104.8 590.9,104.9 593.8,104.6 595.5,106.2 594.8,106.8 595.1,107.6 597.3,107.8 598.3,109.0 598.2,109.5 601.7,110.5 603.9,110.0 605.6,111.3 607.2,111.3 611.3,112.2 611.3,113.0 610.2,114.5 610.8,116.0 610.4,116.9 607.7,117.2 606.3,117.9 606.2,119.2 604.0,119.4 602.1,120.3 599.5,120.4 597.1,121.5 597.3,123.0 596.8,122.9 596.5,122.3 595.6,122.2 593.6,121.6 592.9,122.3 592.5,122.0 588.2,121.3 588.0,120.3 585.4,120.6 584.4,122.1 582.2,124.2 581.0,123.7 579.7,124.2 578.4,123.6 579.1,123.3 579.6,122.4 580.4,121.5 580.2,121.0 580.8,120.8 581.0,121.2 582.7,121.3 583.4,121.0 582.9,120.8 583.1,120.3 582.1,119.6 581.7,118.5 580.7,118.0 580.9,117.1 579.6,116.3 578.5,116.2 576.5,115.4 574.6,115.6 573.9,116.1 572.8,116.1 572.1,116.7 570.0,117.0 569.1,117.4 567.8,116.7 566.0,116.7 564.3,116.4 563.1,117.0 562.9,116.2 561.3,115.5 561.9,114.4 562.7,113.7 563.3,113.8 562.6,112.6 565.1,110.3 566.5,109.9 566.7,109.2 565.4,106.7 566.7,106.6 568.2,105.9 570.4,105.8 573.2,106.0 576.3,106.7 578.4,106.7 579.5,107.1 580.5,106.7 581.3,107.3 583.8,107.2 584.9,107.4 585.1,106.0 585.9,105.4 588.3,105.3Z","i":3,"y":0},{"n":"Poland","d":"M565.2,100.2 565.4,101.5 566.1,102.5 566.1,103.6 564.4,104.2 565.3,105.5 565.4,106.7 566.7,109.2 566.5,109.9 565.1,110.3 562.6,112.6 563.3,113.8 562.7,113.7 560.0,112.6 558.0,113.0 556.7,112.7 555.1,113.3 553.7,112.3 552.5,112.7 552.4,112.5 551.1,111.1 549.0,111.0 548.8,110.1 546.9,109.8 546.4,110.5 544.9,109.9 545.1,109.2 543.0,108.9 541.7,108.0 540.6,106.3 540.8,105.3 540.1,103.8 539.1,102.8 539.9,102.1 539.2,100.7 541.1,99.9 545.5,98.6 549.0,97.6 551.7,98.1 551.9,98.8 554.6,98.8 558.0,99.1 563.1,99.1 564.6,99.4 565.2,100.2Z","i":1,"y":0},{"n":"Austria","d":"M547.2,116.3 547.0,117.5 545.4,117.5 545.9,118.1 545.0,119.9 544.5,120.3 542.0,120.4 540.6,121.0 538.4,120.8 534.4,120.1 533.8,119.1 531.0,119.6 530.7,120.1 529.0,119.7 527.6,119.7 526.3,119.2 526.8,118.5 526.7,118.0 527.5,117.8 528.9,118.6 529.3,117.9 531.7,118.0 533.7,117.5 535.1,117.6 535.9,118.1 536.2,117.7 535.8,115.9 536.8,115.5 537.8,114.2 539.8,115.1 541.4,114.0 542.4,113.8 544.5,114.6 545.8,114.5 547.1,115.0 546.9,115.4 547.2,116.3Z","i":5,"y":5},{"n":"Hungary","d":"M561.3,115.5 562.9,116.2 563.1,117.0 561.4,117.6 560.1,119.5 558.4,121.3 556.2,121.9 554.4,121.7 552.3,122.5 552.3,122.5 551.3,122.9 549.0,122.4 546.9,121.2 546.0,120.8 545.5,119.9 545.0,119.9 545.9,118.1 545.4,117.5 547.0,117.5 547.2,116.3 548.6,117.0 549.6,117.3 551.9,117.0 552.2,116.4 553.3,116.4 554.6,115.9 554.9,116.1 556.2,115.8 556.9,115.1 557.8,114.9 560.8,115.8 561.3,115.5Z","i":0,"y":0},{"n":"Moldova","d":"M573.9,116.1 574.6,115.6 576.5,115.4 578.5,116.2 579.6,116.3 580.9,117.1 580.7,118.0 581.7,118.5 582.1,119.6 583.1,120.3 582.9,120.8 583.4,121.0 582.7,121.3 581.0,121.2 580.8,120.8 580.2,121.0 580.4,121.5 579.6,122.4 579.1,123.3 578.4,123.6 577.9,122.4 578.2,121.2 578.1,120.0 576.5,118.3 575.6,117.1 574.8,116.3 573.9,116.1Z","i":0,"y":0},{"n":"Romania","d":"M578.4,123.6 579.7,124.2 581.0,123.7 582.2,124.2 582.3,124.9 580.9,125.5 580.1,125.2 579.3,128.6 577.7,128.3 575.7,127.3 572.4,127.9 571.0,128.6 566.9,128.5 564.8,128.1 563.7,128.3 562.9,127.1 562.4,126.6 563.1,126.2 562.4,125.8 561.5,126.4 559.9,125.6 559.7,124.5 558.0,123.8 557.7,123.0 556.2,121.9 558.4,121.3 560.1,119.5 561.4,117.6 563.1,117.0 564.3,116.4 566.0,116.7 567.8,116.7 569.1,117.4 570.0,117.0 572.1,116.7 572.8,116.1 573.9,116.1 574.8,116.3 575.6,117.1 576.5,118.3 578.1,120.0 578.2,121.2 577.9,122.4 578.4,123.6Z","i":0,"y":0},{"n":"Lithuania","d":"M573.6,95.5 573.9,96.8 571.6,97.6 570.9,99.2 567.9,100.3 565.2,100.2 564.6,99.4 563.1,99.1 562.9,98.4 563.2,97.6 562.0,97.2 559.1,96.7 558.5,94.4 561.7,93.5 566.3,93.7 569.1,93.4 569.4,94.0 570.9,94.2 573.6,95.5Z","i":0,"y":0},{"n":"Latvia","d":"M575.8,90.3 577.1,91.0 577.4,92.3 578.3,94.0 575.3,95.0 573.6,95.5 570.9,94.2 569.4,94.0 569.1,93.4 566.3,93.7 561.7,93.5 558.5,94.4 558.6,92.3 559.9,90.5 562.6,89.6 564.8,91.6 567.0,91.6 567.5,89.5 569.9,89.0 571.1,89.3 573.5,90.3 575.8,90.3Z","i":1,"y":0},{"n":"Estonia","d":"M577.7,84.8 577.7,84.8 578.1,85.3 576.2,86.9 577.0,89.5 575.8,90.3 573.5,90.3 571.1,89.3 569.9,89.0 567.5,89.5 567.9,87.8 566.8,88.2 565.1,87.2 564.8,85.6 568.3,84.8 571.8,84.4 574.9,84.9 577.7,84.8 577.7,84.8Z","i":0,"y":0},{"n":"Germany","d":"M539.2,100.7 539.9,102.1 539.1,102.8 540.1,103.8 540.8,105.3 540.6,106.3 541.7,108.0 540.5,108.3 539.7,108.0 539.0,108.5 537.1,109.1 536.0,109.8 534.0,110.4 534.5,111.2 534.8,112.4 536.2,113.0 537.8,114.2 536.8,115.5 535.8,115.9 536.2,117.7 535.9,118.1 535.1,117.6 533.7,117.5 531.7,118.0 529.3,117.9 528.9,118.6 527.5,117.8 526.7,118.0 523.7,117.1 523.1,117.7 520.7,117.7 521.1,115.7 522.5,113.8 518.5,113.3 517.2,112.6 517.3,111.4 516.8,110.8 517.1,108.9 516.6,106.0 518.3,106.0 519.0,104.9 519.7,102.4 519.2,101.4 519.7,100.9 522.0,100.7 522.6,101.3 524.4,99.9 523.8,98.9 523.7,97.3 525.8,97.7 527.6,97.3 527.6,98.3 530.4,99.0 530.4,100.0 533.2,99.5 534.8,98.7 537.9,99.8 539.2,100.7Z","i":5,"y":6},{"n":"Bulgaria","d":"M562.9,127.1 563.7,128.3 564.8,128.1 566.9,128.5 571.0,128.6 572.4,127.9 575.7,127.3 577.7,128.3 579.3,128.6 577.9,129.7 576.9,131.7 577.8,133.3 575.4,132.9 572.5,133.8 572.5,135.2 570.0,135.5 568.0,134.5 565.8,135.3 563.8,135.2 563.6,133.3 562.2,132.4 562.6,132.1 562.3,131.7 562.8,130.8 563.9,130.0 562.5,128.8 562.3,127.8 562.9,127.1Z","i":0,"y":0},{"n":"Greece","d":"M573.0,151.9 572.7,152.8 568.7,153.0 568.7,152.5 565.3,152.0 565.8,150.8 567.4,151.8 569.5,151.6 571.6,151.8 571.5,152.3 573.0,151.9ZM563.8,135.2 565.8,135.3 568.0,134.5 570.0,135.5 572.5,135.2 572.5,133.8 573.9,134.5 573.0,136.3 572.4,136.6 570.7,136.5 569.2,136.3 565.9,137.0 567.8,138.5 566.4,139.0 564.8,139.0 563.4,137.6 562.9,138.2 563.5,139.8 564.9,141.1 563.8,141.7 565.4,143.0 566.7,143.8 566.8,145.4 564.2,144.7 565.0,146.1 563.3,146.4 564.3,148.8 562.5,148.9 560.2,147.7 559.2,145.4 558.7,143.6 557.6,142.3 556.2,140.7 556.0,139.9 557.3,138.6 557.4,137.7 558.3,137.3 558.4,136.5 560.2,136.3 561.3,135.7 562.8,135.7 563.2,135.3 563.8,135.2Z","i":0,"y":0},{"n":"Turkey","d":"M624.4,146.7 623.0,147.2 622.1,146.5 618.8,146.2 617.6,146.6 614.5,147.0 613.0,147.0 609.8,148.0 607.5,148.0 606.0,147.5 603.0,148.3 602.1,147.7 601.9,149.3 601.2,149.9 600.4,150.5 599.4,149.2 600.4,148.2 598.8,148.4 596.4,147.8 594.5,149.4 590.3,149.7 588.1,148.2 585.1,148.1 584.4,149.3 582.5,149.6 579.8,148.1 576.8,148.2 575.1,145.4 573.1,143.9 574.5,141.7 572.7,140.4 575.8,137.7 580.1,137.6 581.2,135.5 586.5,135.9 589.9,134.1 593.1,133.3 597.7,133.2 602.5,135.2 606.5,136.3 609.8,135.8 612.1,136.1 615.4,134.6 618.4,134.5 621.1,135.9 621.5,136.8 621.3,138.2 623.3,138.9 624.4,139.7 622.5,140.5 623.4,143.7 622.8,144.5 624.4,146.7 624.4,146.7ZM572.5,133.8 575.4,132.9 577.8,133.3 578.1,134.4 580.5,135.3 580.0,136.0 576.7,136.1 575.5,137.0 573.2,138.5 572.3,137.2 572.4,136.6 573.0,136.3 573.9,134.5 572.5,133.8Z","i":0,"y":0},{"n":"Albania","d":"M558.4,136.5 558.3,137.3 557.4,137.7 557.3,138.6 556.0,139.9 555.5,139.7 555.4,139.1 553.9,138.2 553.7,136.9 553.9,135.0 554.3,134.1 553.8,133.7 553.8,133.7 553.6,132.8 554.8,131.4 555.0,131.9 555.8,131.7 556.3,132.4 557.0,132.7 557.2,133.7 557.2,133.7 556.8,134.7 557.2,135.9 558.4,136.5Z","i":0,"y":0},{"n":"Croatia","d":"M546.0,120.8 546.9,121.2 549.0,122.4 551.3,122.9 552.3,122.5 553.0,123.6 553.9,124.3 552.8,125.4 551.5,124.8 549.6,124.8 547.2,124.4 545.9,124.4 545.3,125.0 544.3,124.4 543.8,125.5 545.1,126.8 545.7,127.7 547.0,128.7 548.0,129.3 549.1,130.5 551.6,131.5 551.3,132.0 551.3,132.0 548.6,131.0 547.0,130.0 544.5,129.1 542.2,127.1 542.7,126.9 541.4,125.7 541.4,124.8 539.6,124.4 538.8,125.5 537.9,124.6 538.0,123.7 538.1,123.6 540.0,123.7 540.5,123.2 541.5,123.7 542.6,123.7 542.6,123.0 543.5,122.7 543.8,121.6 546.0,120.8Z","i":0,"y":0},{"n":"Switzerland","d":"M526.7,118.0 526.8,118.5 526.3,119.2 527.6,119.7 529.0,119.7 528.8,120.9 527.6,121.3 525.5,121.0 524.9,122.1 523.6,122.2 523.1,121.8 521.5,122.7 520.2,122.8 519.0,122.2 518.1,121.0 516.7,121.5 516.8,120.2 518.8,118.6 518.7,117.9 520.0,118.2 520.7,117.7 523.1,117.7 523.7,117.1 526.7,118.0Z","i":4,"y":0},{"n":"Luxembourg","d":"M516.8,110.8 517.3,111.4 517.2,112.6 516.4,112.7 515.8,112.4 516.1,110.9 516.8,110.8Z","i":0,"y":0},{"n":"Belgium","d":"M517.1,108.9 516.8,110.8 516.1,110.9 515.8,112.4 513.3,111.2 511.9,111.4 510.0,110.1 508.7,108.9 507.4,108.9 507.0,107.9 509.2,107.4 509.2,107.4 509.2,107.4 511.2,107.6 513.8,107.0 515.6,108.2 517.1,108.9Z","i":4,"y":0},{"n":"Netherlands","d":"M519.2,101.4 519.7,102.4 519.0,104.9 518.3,106.0 516.6,106.0 517.1,108.9 515.6,108.2 513.8,107.0 511.2,107.6 509.2,107.4 509.2,107.4 510.6,106.6 513.1,102.5 516.9,101.4 519.2,101.4Z","i":6,"y":5},{"n":"Portugal","d":"M474.9,133.7 475.9,133.0 477.0,132.6 477.7,133.9 479.4,133.9 479.9,133.6 481.5,133.7 482.3,135.1 481.0,135.8 480.9,138.0 480.5,138.4 480.4,139.7 479.2,139.9 480.3,141.6 479.5,143.4 480.5,144.2 480.1,145.0 479.1,146.0 479.3,147.0 478.2,147.7 476.7,147.3 475.3,147.6 475.7,145.4 475.4,143.7 474.2,143.4 473.5,142.4 473.8,140.6 474.9,139.6 475.1,138.4 475.6,136.8 475.6,135.6 475.0,134.6 474.9,133.7Z","i":1,"y":0},{"n":"Spain","d":"M479.3,147.0 479.1,146.0 480.1,145.0 480.5,144.2 479.5,143.4 480.3,141.6 479.2,139.9 480.4,139.7 480.5,138.4 480.9,138.0 481.0,135.8 482.3,135.1 481.5,133.7 479.9,133.6 479.4,133.9 477.7,133.9 477.0,132.6 475.9,133.0 474.9,133.7 475.0,131.7 473.9,130.5 477.8,128.5 481.2,129.0 485.0,129.0 487.9,129.4 490.2,129.3 494.7,129.4 495.8,130.5 500.9,131.7 501.9,131.1 505.1,132.4 508.3,132.0 508.4,133.6 505.8,135.5 502.3,136.1 502.0,137.0 500.3,138.5 499.2,140.8 500.3,142.4 498.7,143.6 498.1,145.4 496.0,146.0 494.0,148.1 490.5,148.2 487.9,148.1 486.1,149.1 485.1,150.1 483.7,149.9 482.7,149.0 481.9,147.4 479.3,147.0Z","i":2,"y":0},{"n":"Ireland","d":"M482.8,100.4 483.2,102.4 481.1,104.8 476.2,106.5 472.3,106.1 474.5,103.2 473.1,100.3 476.9,98.2 479.0,96.9 479.5,98.3 479.0,99.8 480.7,99.8 482.8,100.4Z","i":0,"y":0},{"n":"New Caledonia","d":"M960.5,308.6 962.8,310.3 964.2,311.6 963.2,312.2 961.6,311.5 959.7,310.2 957.9,308.7 956.0,306.8 955.6,305.8 956.8,305.9 958.4,306.8 959.6,307.8 960.5,308.6Z","i":0,"y":0},{"n":"Solomon Is.","d":"M950.3,279.1 951.1,280.1 949.2,280.1 948.1,278.3 949.8,279.0 950.3,279.1ZM949.1,276.7 948.7,277.2 946.6,274.8 946.1,273.1 947.0,273.1 948.0,275.3 949.1,276.7ZM946.8,277.4 945.7,277.5 944.0,277.2 943.4,276.8 943.6,275.7 945.5,276.1 946.4,276.7 946.8,277.4ZM943.4,272.3 944.1,273.2 944.2,273.7 942.0,272.5 940.5,271.5 939.5,270.6 939.9,270.3 941.2,271.0 943.4,272.3ZM936.5,269.5 937.6,270.4 937.1,270.6 935.8,269.9 934.7,268.8 934.8,268.3 936.5,269.5Z","i":0,"y":0},{"n":"New Zealand","d":"M991.3,361.3 990.3,362.8 988.9,364.7 986.8,365.8 986.3,365.1 985.1,364.7 986.7,362.4 985.8,360.9 982.8,359.7 982.9,358.7 984.9,357.8 985.4,355.6 985.3,353.8 984.1,352.0 984.2,351.5 982.9,350.3 980.7,347.9 979.5,345.9 980.6,345.7 982.1,347.2 984.2,348.0 985.0,350.4 987.0,353.4 987.1,351.5 988.4,352.2 988.8,354.3 991.0,355.2 992.9,355.4 994.5,354.4 995.9,354.7 995.2,357.2 994.4,358.8 992.2,358.7 991.5,359.6 991.8,360.8 991.3,361.3ZM971.3,371.0 973.7,369.5 975.3,368.1 976.6,366.0 977.6,365.3 978.0,363.8 980.0,362.5 980.6,363.7 981.2,364.8 983.2,363.7 984.0,364.9 984.0,366.0 983.0,367.3 981.2,369.4 979.8,370.5 980.8,371.8 978.6,371.8 976.3,372.9 975.5,374.7 973.9,377.5 971.8,378.8 970.4,379.6 967.8,379.5 966.0,378.6 963.0,378.4 962.5,377.4 964.0,375.3 967.5,372.6 969.3,372.0 971.3,371.0Z","i":2,"y":0},{"n":"Australia","d":"M910.2,363.4 911.9,363.5 912.1,366.8 911.2,367.8 910.9,370.0 909.9,369.3 908.0,371.2 907.4,371.1 905.7,371.0 904.0,368.6 903.6,366.8 902.0,364.3 902.1,363.1 903.9,363.3 906.6,364.3 908.1,363.9 910.2,363.4ZM850.4,339.5 847.5,340.9 845.1,341.6 844.5,343.0 843.5,344.1 841.1,344.2 839.4,344.5 836.9,343.9 834.9,344.3 833.0,344.4 831.4,345.9 830.6,345.7 829.2,346.5 827.8,347.4 825.8,347.3 824.0,347.3 821.0,345.5 819.5,345.0 819.6,343.4 821.0,343.0 821.4,342.4 821.3,341.4 821.7,339.5 821.4,337.8 819.9,335.0 819.4,333.4 819.6,331.8 818.4,330.0 818.4,329.2 817.1,328.1 816.8,325.9 815.2,323.7 814.8,322.5 816.1,323.7 815.1,321.2 816.5,322.0 817.3,323.1 817.3,321.6 815.9,319.4 815.6,318.6 815.0,317.7 815.3,316.1 815.9,315.4 816.2,314.1 815.9,312.4 817.1,310.4 817.3,312.5 818.5,310.6 820.7,309.7 822.1,308.5 824.2,307.5 825.5,307.3 826.2,307.6 828.4,306.6 830.1,306.3 830.5,305.7 831.3,305.4 832.8,305.5 835.7,304.7 837.2,303.4 837.9,302.0 839.6,300.5 839.7,299.4 839.8,297.9 841.7,295.6 842.9,298.0 844.1,297.4 843.1,296.1 843.9,294.8 845.2,295.4 845.5,293.2 847.0,291.9 847.7,290.8 849.1,290.3 849.1,289.5 850.3,289.9 850.4,289.2 851.6,288.8 853.0,288.4 855.0,289.7 856.6,291.3 858.3,291.3 860.1,291.6 859.5,290.1 860.8,287.8 862.1,287.1 861.6,286.4 862.8,284.8 864.5,283.8 865.9,284.2 868.3,283.7 868.2,282.2 866.2,281.3 867.7,280.9 869.5,281.6 871.0,282.7 873.3,283.5 874.1,283.2 875.8,284.0 877.5,283.2 878.5,283.5 879.1,282.9 880.4,284.3 879.7,285.8 878.6,286.9 877.7,287.0 878.0,288.1 877.2,289.5 876.2,290.9 876.4,291.7 878.6,293.2 880.7,294.1 882.2,295.0 884.2,296.7 885.0,296.7 886.4,297.4 886.8,298.3 889.5,299.2 891.3,298.2 891.9,296.8 892.4,295.5 892.8,294.0 893.6,291.8 893.2,290.4 893.4,289.6 893.1,288.1 893.5,286.0 894.0,285.4 893.6,284.5 894.2,283.0 894.8,281.5 894.8,280.7 895.9,279.6 896.7,281.0 896.9,282.7 897.5,283.1 897.7,284.2 898.7,285.7 898.9,287.2 898.8,288.2 899.8,290.4 901.6,289.4 902.5,290.5 903.8,291.6 903.5,292.9 904.1,295.2 904.5,296.6 905.2,297.0 906.0,299.3 905.7,300.8 906.6,302.7 909.6,304.1 911.6,305.4 913.5,306.6 913.1,307.3 914.7,309.1 915.8,312.1 916.9,311.5 918.0,312.7 918.7,312.2 919.2,315.2 921.1,316.9 922.4,317.9 924.6,320.2 925.4,322.4 925.4,324.0 925.3,325.7 926.6,328.1 926.4,330.5 925.9,331.8 925.2,334.3 925.2,335.9 924.7,337.9 923.5,340.4 921.4,341.8 920.4,343.9 919.5,345.3 918.7,347.7 917.6,349.1 916.9,351.2 916.5,353.1 916.7,354.0 915.1,354.9 912.0,355.0 909.4,356.2 908.1,357.2 906.4,358.4 904.1,357.2 902.4,356.7 902.9,355.3 901.3,355.8 898.9,357.8 896.5,357.1 894.9,356.6 893.4,356.4 890.7,355.6 888.9,353.9 888.4,351.8 887.7,350.4 886.3,349.3 883.7,348.9 884.6,347.6 883.9,345.5 882.6,347.4 880.1,347.9 881.5,346.4 882.0,344.8 883.0,343.4 882.8,341.4 880.5,343.8 878.8,344.7 877.7,346.9 875.6,345.8 875.7,344.3 873.9,342.3 872.5,341.2 873.0,340.6 869.4,338.9 867.5,338.8 864.8,337.5 859.8,337.8 856.2,338.7 853.1,339.7 850.4,339.5Z","i":3,"y":0},{"n":"Sri Lanka","d":"M727.2,229.1 726.8,232.0 725.6,232.8 723.2,233.4 721.9,231.2 721.4,227.2 722.6,222.7 724.6,224.3 725.8,226.2 727.2,229.1Z","i":0,"y":0},{"n":"China","d":"M804.1,199.5 801.8,198.6 801.7,196.2 803.1,194.9 806.1,194.2 807.7,194.2 808.4,195.3 807.1,196.5 806.5,198.1 804.1,199.5ZM722.9,132.4 722.7,130.8 724.6,130.1 722.1,125.2 727.6,124.1 729.1,123.5 731.1,118.5 736.6,119.4 738.1,118.2 738.2,115.4 740.6,115.1 742.7,113.3 743.8,113.1 744.5,115.0 746.8,116.5 750.8,117.5 752.7,119.8 751.6,123.0 752.6,124.2 755.9,124.7 759.7,125.1 763.0,126.8 764.7,127.1 766.0,129.7 767.6,131.3 770.7,131.3 776.4,131.9 780.1,131.5 782.9,131.9 787.0,133.6 790.3,133.6 791.6,134.5 794.8,133.0 799.3,132.0 803.5,131.9 806.7,130.9 808.7,129.4 810.6,128.5 810.2,127.6 809.3,126.5 810.8,124.7 812.3,125.0 815.2,125.5 817.9,124.1 822.2,123.0 824.2,121.1 826.2,120.4 830.2,120.0 832.4,120.3 832.7,119.3 830.2,117.4 828.0,116.5 825.8,117.5 823.1,117.1 821.5,117.4 820.8,116.3 822.8,113.5 824.1,111.4 827.4,112.5 831.4,110.7 831.3,109.5 833.8,106.5 835.4,105.7 835.3,104.1 833.8,103.5 836.1,102.1 839.6,101.6 843.3,101.5 847.4,102.3 849.9,103.4 851.6,106.2 852.6,107.4 853.6,109.1 854.6,111.8 859.4,112.7 862.7,114.6 863.9,117.2 868.1,117.3 870.5,116.2 875.1,115.3 873.6,117.8 872.5,118.9 871.6,121.9 869.7,124.6 866.3,124.1 864.0,125.1 864.7,127.5 864.3,130.8 862.9,130.8 862.9,132.2 861.1,130.6 860.0,132.2 855.7,133.3 856.1,134.8 853.7,134.7 852.4,133.8 850.5,135.8 847.4,137.3 845.2,139.1 841.3,139.9 839.3,141.2 836.3,142.0 837.7,140.7 837.2,139.6 839.4,137.7 837.9,136.3 835.5,137.2 832.3,139.2 830.6,141.0 827.9,141.1 826.5,142.4 827.9,144.3 830.2,144.7 830.3,146.0 832.5,146.8 835.6,144.8 838.1,145.9 839.9,146.0 840.3,147.4 836.4,148.2 835.1,149.7 832.4,151.1 831.0,153.0 834.0,154.6 835.1,157.3 836.7,159.8 838.6,162.0 838.6,164.0 836.8,164.8 837.5,166.3 839.1,167.1 838.7,169.4 838.0,171.6 836.5,171.8 834.4,174.9 832.2,178.5 829.6,181.8 825.8,184.4 821.9,186.7 818.8,187.0 817.1,188.3 816.1,187.4 814.6,188.7 810.7,190.1 807.7,190.6 806.8,193.5 805.2,193.7 804.5,191.6 805.2,190.6 801.5,189.7 800.1,190.1 797.3,189.4 796.0,188.3 796.5,186.7 793.9,186.2 792.6,185.1 790.2,186.6 787.5,186.9 785.3,186.9 783.8,187.6 782.4,188.0 782.8,191.2 781.3,191.1 781.1,190.5 781.0,189.3 778.9,190.1 777.7,189.6 775.7,188.6 776.5,186.3 774.7,185.7 774.1,183.2 771.1,183.6 771.5,180.3 774.1,178.0 774.2,175.7 774.1,173.6 772.9,172.9 772.0,171.3 770.4,171.5 767.4,171.1 768.3,169.9 767.0,168.2 765.0,169.4 762.7,168.7 759.5,170.4 757.0,172.5 754.7,172.9 753.5,172.1 752.0,172.0 750.0,171.4 748.5,172.1 746.7,174.2 746.5,172.0 744.8,172.6 741.5,172.3 738.4,171.7 736.1,170.4 734.0,169.9 733.1,168.6 731.5,168.2 728.7,166.3 726.5,165.5 725.3,166.2 721.4,164.2 718.7,162.5 717.9,159.4 719.9,159.8 720.0,158.3 718.9,156.9 719.2,154.7 716.2,151.4 711.6,150.3 710.8,148.1 708.8,146.9 708.3,146.1 707.9,144.5 708.0,143.4 706.3,142.8 705.4,143.0 704.7,140.5 705.4,139.8 705.1,139.2 707.7,137.9 709.6,137.3 712.6,137.7 713.6,135.9 717.2,135.6 718.2,134.5 722.6,133.0 722.9,132.4Z","i":69,"y":41},{"n":"Taiwan","d":"M838.3,182.2 836.6,186.7 835.4,189.0 833.9,186.6 833.6,184.6 835.3,181.8 837.5,179.7 838.8,180.6 838.3,182.2Z","i":5,"y":6},{"n":"Italy","d":"M529.0,119.7 530.7,120.1 531.0,119.6 533.8,119.1 534.4,120.1 538.4,120.8 538.1,122.2 538.7,123.4 536.5,123.0 534.2,123.9 534.4,125.3 534.1,126.1 535.0,127.5 537.6,128.9 539.0,131.2 542.1,133.5 544.2,133.4 544.9,134.1 544.1,134.6 546.6,135.6 548.7,136.5 551.0,137.9 551.3,138.4 550.8,139.4 549.3,138.1 546.9,137.7 545.7,139.5 547.7,140.5 547.4,141.9 546.2,142.1 544.7,144.5 543.6,144.7 543.6,143.8 544.1,142.4 544.7,141.8 543.7,140.2 542.8,138.8 541.7,138.4 540.8,137.2 539.1,136.7 537.9,135.6 535.8,135.4 533.6,134.2 531.1,132.3 529.2,130.7 528.3,128.0 527.0,127.7 524.7,126.8 523.4,127.1 521.8,128.4 520.7,128.6 521.0,127.4 519.5,127.1 518.7,124.9 519.7,124.1 518.9,123.0 519.0,122.2 520.2,122.8 521.5,122.7 523.1,121.8 523.6,122.2 524.9,122.1 525.5,121.0 527.6,121.3 528.8,120.9 529.0,119.7ZM541.0,144.0 543.1,143.8 542.1,146.0 542.5,146.8 541.9,148.3 539.8,147.2 538.4,146.9 534.5,145.5 534.9,144.1 538.2,144.3 541.0,144.0ZM524.2,136.4 525.6,135.5 527.2,137.5 526.9,141.2 525.6,141.0 524.5,141.9 523.4,141.2 523.3,137.8 522.7,136.2 524.2,136.4Z","i":1,"y":0},{"n":"Denmark","d":"M527.6,97.3 525.8,97.7 523.7,97.3 522.6,95.8 522.5,92.9 522.9,92.2 523.7,91.4 526.2,91.2 527.2,90.4 529.4,89.6 529.3,91.1 528.5,92.0 528.8,92.8 530.3,93.2 529.6,94.2 528.8,93.9 526.8,95.9 527.6,97.3ZM534.4,94.1 535.3,95.5 533.6,97.8 530.7,96.2 530.3,95.1 534.4,94.1Z","i":0,"y":0},{"n":"United Kingdom","d":"M482.8,100.4 480.7,99.8 479.0,99.8 479.5,98.3 479.0,96.9 481.3,96.7 484.3,98.5 482.8,100.4ZM491.4,101.7 491.4,101.7 491.8,100.0 490.0,98.3 489.9,98.3 486.5,97.8 485.9,97.1 486.9,95.8 486.0,95.0 484.5,96.4 484.3,93.7 482.9,92.3 483.9,89.4 486.1,87.1 488.3,87.4 491.7,87.1 488.7,90.1 491.5,89.7 494.6,89.8 493.8,92.0 491.3,94.5 494.2,94.7 494.4,95.0 496.9,98.3 498.8,98.7 500.5,101.9 501.3,103.0 504.7,103.5 504.3,105.3 502.9,106.1 504.0,107.5 501.5,109.0 497.8,109.0 493.1,109.7 491.8,109.2 490.0,110.5 487.4,110.2 485.4,111.2 484.0,110.7 488.0,107.7 490.5,107.1 490.5,107.1 486.2,106.7 485.4,105.6 488.3,104.7 486.7,103.2 487.3,101.4 491.4,101.7Z","i":20,"y":8},{"n":"Iceland","d":"M459.7,65.4 459.1,67.2 462.2,69.1 458.6,71.2 450.6,73.1 448.2,73.6 444.5,73.2 436.8,72.3 439.5,71.1 433.5,69.7 438.4,69.2 438.3,68.4 432.4,67.7 434.3,65.9 438.5,65.5 442.8,67.4 447.1,65.9 450.6,66.7 455.1,65.2 459.7,65.4Z","i":0,"y":0},{"n":"Azerbaijan","d":"M628.9,133.7 629.7,133.8 631.6,135.5 632.8,135.7 633.3,135.0 635.0,133.9 636.4,135.3 637.8,137.3 639.1,137.4 640.0,138.2 637.7,138.4 637.2,140.6 636.7,141.5 635.7,142.2 635.8,143.6 635.1,143.7 633.4,142.2 634.3,140.9 633.5,140.0 632.5,140.3 629.2,142.3 629.1,140.4 627.9,139.9 626.7,139.2 627.5,138.3 626.0,137.3 626.6,136.6 625.5,136.2 624.9,135.4 625.6,135.0 627.7,135.8 629.2,135.9 629.5,135.6 628.2,134.1 628.9,133.7ZM628.2,142.4 626.3,142.0 624.9,140.7 624.4,139.7 625.0,139.6 625.8,140.4 627.1,140.4 627.0,140.8 628.2,142.4Z","i":0,"y":0},{"n":"Georgia","d":"M611.0,129.3 611.3,129.0 613.7,129.5 617.8,129.9 621.5,131.3 622.0,131.8 623.7,131.4 626.3,131.9 627.2,133.1 628.9,133.7 628.2,134.1 629.5,135.6 629.2,135.9 627.7,135.8 625.6,135.0 624.9,135.4 621.1,135.9 618.4,134.5 615.4,134.6 615.8,133.4 615.1,131.5 613.5,130.5 612.0,130.2 611.0,129.3Z","i":0,"y":0},{"n":"Philippines","d":"M835.6,214.7 834.2,212.6 836.6,212.7 837.6,213.7 836.8,216.1 835.6,214.7ZM840.5,222.3 841.2,221.5 841.5,219.8 843.1,219.6 842.6,221.5 844.7,218.8 844.4,221.4 843.4,222.4 842.5,224.1 841.7,224.9 839.9,223.0 840.5,222.3ZM851.0,226.6 851.3,228.5 851.5,230.0 850.5,232.6 849.5,229.7 848.2,231.1 849.1,233.2 848.3,234.5 845.1,232.9 844.3,230.9 845.1,229.6 843.4,228.2 842.5,229.4 841.2,229.3 839.1,230.8 838.7,230.0 839.8,227.7 841.5,226.9 843.0,225.9 844.0,227.1 846.1,226.3 846.6,225.1 848.5,225.0 848.4,222.9 850.6,224.2 850.9,225.6 851.0,226.6ZM829.2,224.1 825.5,226.8 826.8,224.8 828.9,223.1 830.5,221.2 832.0,218.4 832.5,220.7 830.6,222.2 829.2,224.1ZM839.8,199.4 839.4,200.5 840.3,202.5 839.6,204.8 838.0,205.7 837.5,208.0 838.1,210.2 839.6,210.5 840.8,210.2 844.3,211.7 844.0,213.2 844.9,213.9 844.7,215.2 842.5,213.8 841.5,212.4 840.8,213.4 839.0,211.7 836.5,212.1 835.1,211.5 835.2,210.4 836.1,209.7 835.3,209.0 834.9,210.0 833.5,208.4 833.1,207.2 833.0,204.5 834.1,205.5 834.4,201.1 835.3,198.6 837.0,198.6 838.7,199.4 839.6,198.7 839.8,199.4ZM839.0,218.3 838.6,217.0 840.2,217.8 842.0,217.8 841.9,219.0 840.7,220.2 838.9,221.0 838.8,219.7 839.0,218.3ZM848.6,216.2 849.4,219.3 847.3,218.6 847.3,219.5 848.0,221.2 846.7,221.8 846.6,219.9 845.7,219.8 845.3,218.1 846.9,218.3 846.9,217.2 845.2,215.1 847.9,215.2 848.6,216.2Z","i":2,"y":0},{"n":"Malaysia","d":"M778.0,232.0 778.5,231.5 780.8,232.8 781.0,234.2 782.8,233.9 783.7,232.7 784.4,233.0 786.0,234.7 787.2,236.5 787.3,238.4 787.0,239.6 787.3,240.6 787.5,242.2 788.5,243.0 789.6,245.5 789.5,246.4 787.6,246.6 784.9,244.5 781.6,242.3 781.3,240.9 779.7,239.1 779.3,236.8 778.3,235.2 778.6,233.2 778.0,232.0ZM827.5,238.5 825.0,238.0 821.8,238.0 820.9,241.2 819.8,242.2 818.4,246.0 816.1,246.6 813.5,245.8 812.2,246.1 810.5,247.5 808.8,247.3 807.0,247.9 805.1,246.3 804.6,244.4 806.7,245.4 808.8,244.9 809.4,242.5 810.5,242.0 813.9,241.4 815.9,239.2 817.2,237.4 818.5,238.9 819.1,237.9 820.4,238.0 820.6,236.2 820.7,234.9 822.8,232.9 824.2,230.8 825.4,230.8 826.8,232.2 826.9,233.4 828.7,234.1 831.1,235.0 830.9,236.1 829.0,236.2 829.5,237.6 827.5,238.5Z","i":7,"y":0},{"n":"Brunei","d":"M820.7,234.9 820.6,236.2 820.4,238.0 819.1,237.9 818.5,238.9 817.2,237.4 818.3,236.4 820.7,234.9Z","i":0,"y":0},{"n":"Slovenia","d":"M538.4,120.8 540.6,121.0 542.0,120.4 544.5,120.3 545.0,119.9 545.5,119.9 546.0,120.8 543.8,121.6 543.5,122.7 542.6,123.0 542.6,123.7 541.5,123.7 540.5,123.2 540.0,123.7 538.1,123.6 538.7,123.4 538.1,122.2 538.4,120.8Z","i":0,"y":0},{"n":"Finland","d":"M579.4,58.2 579.0,60.1 583.3,61.9 580.7,64.0 583.9,67.2 582.1,69.6 584.6,71.7 583.4,73.5 587.5,75.4 586.5,76.8 583.9,78.4 578.0,81.9 578.0,81.9 578.0,81.9 572.9,82.2 568.0,83.2 563.5,83.8 561.9,82.2 559.2,81.3 559.8,78.6 558.5,76.1 559.8,74.5 562.3,72.7 568.7,69.7 570.6,69.1 570.3,68.0 566.4,66.6 565.5,65.6 565.4,61.3 561.1,59.4 557.3,58.0 559.0,57.3 562.1,58.8 565.7,58.6 568.7,59.3 571.4,58.1 572.7,56.0 577.0,55.1 580.6,56.2 579.4,58.2Z","i":1,"y":0},{"n":"Slovakia","d":"M562.7,113.7 561.9,114.4 561.3,115.5 560.8,115.8 557.8,114.9 556.9,115.1 556.2,115.8 554.9,116.1 554.6,115.9 553.3,116.4 552.2,116.4 551.9,117.0 549.6,117.3 548.6,117.0 547.2,116.3 546.9,115.4 547.1,115.0 547.5,114.4 548.7,114.4 549.7,114.2 549.8,113.9 550.3,113.8 550.5,113.1 551.1,113.0 551.5,112.5 552.4,112.5 552.5,112.7 553.7,112.3 555.1,113.3 556.7,112.7 558.0,113.0 560.0,112.6 562.7,113.7Z","i":0,"y":0},{"n":"Czechia","d":"M541.7,108.0 543.0,108.9 545.1,109.2 544.9,109.9 546.4,110.5 546.9,109.8 548.8,110.1 549.0,111.0 551.1,111.1 552.4,112.5 551.5,112.5 551.1,113.0 550.5,113.1 550.3,113.8 549.8,113.9 549.7,114.2 548.7,114.4 547.5,114.4 547.1,115.0 545.8,114.5 544.5,114.6 542.4,113.8 541.4,114.0 539.8,115.1 537.8,114.2 536.2,113.0 534.8,112.4 534.5,111.2 534.0,110.4 536.0,109.8 537.1,109.1 539.0,108.5 539.7,108.0 540.5,108.3 541.7,108.0Z","i":1,"y":0},{"n":"Eritrea","d":"M601.2,209.9 600.9,208.8 602.1,204.7 602.4,202.9 603.2,202.0 605.3,201.6 606.7,200.0 608.3,203.2 609.1,205.8 610.6,207.1 614.4,209.7 615.9,211.3 617.4,212.9 618.3,213.9 619.7,214.7 618.8,215.4 617.6,215.2 616.7,214.3 615.6,212.6 614.3,211.7 613.6,210.8 611.2,209.7 609.3,209.6 608.6,209.1 607.0,209.7 605.3,208.4 604.4,210.5 601.2,209.9Z","i":0,"y":0},{"n":"Japan","d":"M894.1,141.2 891.6,144.0 891.6,146.8 890.6,149.0 891.0,150.4 889.6,152.4 886.0,153.7 881.2,153.9 877.2,157.0 875.3,156.0 875.2,153.9 870.4,154.5 867.1,155.8 863.9,155.9 866.7,157.9 864.8,162.6 863.0,163.8 861.7,162.7 862.4,160.2 860.6,159.4 859.5,157.5 862.1,156.7 863.6,154.9 866.3,153.5 868.4,151.6 873.9,150.7 876.9,151.3 879.8,146.4 881.6,147.7 885.7,144.9 887.3,143.8 889.0,140.4 888.6,137.3 889.7,135.6 892.7,135.1 894.2,138.9 894.1,141.2ZM901.7,127.9 903.7,126.7 904.3,129.8 900.2,130.6 897.7,133.3 893.4,131.4 891.9,134.5 888.8,134.5 888.4,131.8 889.8,129.6 892.7,129.5 893.5,125.6 894.4,123.5 897.6,126.4 899.8,127.3 901.7,127.9ZM867.7,157.0 869.2,155.4 870.8,155.7 872.0,154.5 874.0,155.1 874.4,156.1 872.8,157.8 871.6,156.9 870.2,157.5 869.5,159.2 867.7,158.4 867.7,157.0Z","i":29,"y":11},{"n":"Paraguay","d":"M338.4,306.0 339.2,307.6 339.1,311.4 342.0,311.9 343.1,311.4 345.0,312.1 345.5,312.9 345.8,315.5 346.1,316.5 347.1,316.7 348.2,316.2 349.2,316.7 349.2,318.3 348.8,319.9 348.3,321.5 347.8,323.9 345.3,326.1 343.1,326.5 340.0,326.1 337.2,325.3 339.9,321.1 339.5,319.9 336.6,318.8 333.3,316.8 331.0,316.3 325.9,311.8 327.0,308.5 327.0,307.0 328.4,304.5 333.2,303.7 335.8,303.8 338.4,305.2 338.4,306.0Z","i":0,"y":0},{"n":"Yemen","d":"M644.4,197.2 646.6,201.8 647.5,203.7 645.5,204.5 645.0,205.7 644.9,206.7 642.1,207.8 637.7,209.1 635.2,211.1 634.0,211.3 633.2,211.1 631.5,212.2 629.8,212.8 627.4,212.9 626.7,213.1 626.1,213.8 625.4,214.0 625.0,214.7 623.6,214.7 622.7,215.0 620.8,214.9 620.1,213.3 620.1,211.8 619.7,210.9 619.1,208.9 618.3,207.7 618.9,207.6 618.6,206.3 619.0,205.8 618.8,204.6 620.1,203.7 619.8,202.5 620.5,201.2 621.6,201.9 622.4,201.6 625.6,201.6 626.1,201.9 628.8,202.1 629.9,202.0 630.6,202.9 631.9,202.5 633.8,199.5 636.4,198.3 644.4,197.2Z","i":0,"y":0},{"n":"Saudi Arabia","d":"M597.1,168.5 600.2,168.9 601.4,168.0 602.1,167.0 604.2,166.7 604.6,165.7 605.6,165.3 602.8,162.5 608.3,161.1 608.9,160.7 612.2,161.4 616.4,163.4 624.2,168.9 629.4,169.2 631.8,169.4 632.5,170.8 634.5,170.7 635.6,173.1 636.9,173.7 637.4,174.7 639.3,175.9 639.5,177.0 639.2,177.9 639.6,178.9 640.4,179.6 640.7,180.6 641.1,181.2 642.0,181.8 642.7,181.6 643.3,182.7 643.4,183.3 644.4,186.1 652.8,187.5 653.4,186.9 654.6,188.9 652.8,194.4 644.4,197.2 636.4,198.3 633.8,199.5 631.9,202.5 630.6,202.9 629.9,202.0 628.8,202.1 626.1,201.9 625.6,201.6 622.4,201.6 621.6,201.9 620.5,201.2 619.8,202.5 620.1,203.7 618.8,204.6 618.5,203.4 617.6,202.6 617.4,201.5 616.0,200.5 614.5,198.1 613.7,195.9 611.8,194.0 610.6,193.5 608.7,190.9 608.4,188.9 608.5,187.3 606.9,184.2 605.6,183.1 604.1,182.5 603.2,180.9 603.4,180.3 602.6,178.9 601.8,178.3 600.7,176.2 599.0,174.0 597.6,172.0 596.2,172.1 596.6,170.5 596.8,169.6 597.1,168.5Z","i":8,"y":7},{"n":"N. Cyprus","d":"M590.9,152.4 591.1,152.4 591.5,151.7 593.5,151.7 596.0,150.9 594.2,152.1 594.4,152.6 594.1,152.5 593.5,152.7 593.1,152.7 593.0,152.8 592.9,152.5 592.7,152.3 592.2,152.3 591.4,152.5 590.9,152.4Z","i":0,"y":0},{"n":"Cyprus","d":"M590.9,152.4 591.4,152.5 592.2,152.3 592.7,152.3 592.9,152.5 593.0,152.8 593.1,152.7 593.5,152.7 594.1,152.5 594.4,152.6 594.5,152.8 591.6,154.0 590.3,153.6 589.6,152.5 590.9,152.4Z","i":0,"y":0},{"n":"Morocco","d":"M494.0,152.3 495.0,154.1 495.2,155.8 496.1,158.7 496.9,159.3 496.4,160.4 492.7,160.8 491.5,161.9 489.9,162.1 489.7,164.2 486.5,165.3 485.4,166.7 483.2,167.4 480.4,167.8 475.9,169.9 475.9,173.2 475.5,173.2 475.6,174.7 473.9,174.8 473.0,175.4 471.7,175.4 470.7,175.0 468.4,175.3 467.4,177.5 466.6,177.7 465.3,181.2 461.4,184.2 460.5,188.0 459.4,189.3 459.0,190.3 452.8,190.5 452.7,190.5 452.9,189.2 453.9,188.4 454.8,187.0 454.6,186.1 455.6,184.1 457.1,182.3 458.1,181.9 458.8,180.3 458.9,178.8 459.9,177.1 461.7,176.1 463.5,173.2 463.6,173.2 464.9,172.1 467.5,171.8 469.7,169.9 471.1,169.2 473.4,166.9 472.7,163.4 473.8,161.0 474.2,159.5 476.0,157.7 478.7,156.4 480.8,155.2 482.7,152.4 483.5,150.7 485.6,150.7 487.2,151.9 489.9,151.7 492.8,152.3 494.0,152.3Z","i":1,"y":0},{"n":"Egypt","d":"M602.4,188.9 591.4,188.9 580.6,188.9 569.4,188.9 569.4,178.7 569.4,168.8 568.6,166.5 569.3,164.8 568.9,163.6 569.9,162.3 573.6,162.3 576.3,163.0 579.0,163.8 580.3,164.2 582.5,163.4 583.6,162.6 586.0,162.3 588.0,162.7 588.8,164.1 589.4,163.2 591.6,163.8 593.8,164.0 595.2,163.3 595.2,163.3 596.7,167.3 597.0,168.1 596.2,169.2 595.6,171.3 594.9,172.7 594.2,173.2 593.3,172.3 592.0,171.1 590.1,167.1 589.8,167.3 590.9,170.3 592.6,173.1 594.7,177.4 595.8,178.9 596.7,180.5 599.1,183.5 598.6,184.0 598.7,185.8 601.9,188.3 602.4,188.9Z","i":0,"y":0},{"n":"Libya","d":"M569.4,188.9 569.4,194.4 566.2,194.4 566.2,195.6 555.1,190.3 544.1,185.0 541.3,186.5 539.3,187.5 537.7,186.0 533.3,184.8 532.1,183.1 529.9,181.8 528.6,182.3 527.6,180.7 527.5,179.5 525.9,177.5 527.0,176.4 526.7,174.6 527.1,173.1 526.9,171.8 527.4,169.6 527.2,168.3 526.3,165.8 527.7,165.2 527.9,164.0 527.6,162.8 529.5,161.8 530.4,160.9 531.8,160.1 531.9,158.0 535.2,158.9 536.3,158.7 538.7,159.1 542.3,160.4 543.6,162.8 546.1,163.4 550.1,164.5 553.0,165.9 554.4,165.2 555.7,163.9 555.1,161.8 555.9,160.4 557.9,159.1 559.8,158.8 563.6,159.3 564.5,160.6 565.6,160.6 566.5,161.1 569.2,161.4 569.9,162.3 568.9,163.6 569.3,164.8 568.6,166.5 569.4,168.8 569.4,178.7 569.4,188.9Z","i":0,"y":0},{"n":"Ethiopia","d":"M632.7,227.8 624.9,236.1 621.3,236.2 618.8,238.2 617.0,238.2 616.3,239.1 614.4,239.1 613.2,238.2 610.7,239.3 609.9,240.5 608.0,240.3 607.4,240.0 606.8,240.0 605.9,240.0 602.4,237.6 600.4,237.6 599.5,236.7 599.5,235.2 598.1,234.7 596.4,231.7 595.1,231.0 594.7,229.9 593.2,228.6 591.5,228.4 592.5,226.8 594.0,226.7 594.4,225.9 594.3,223.4 595.2,220.5 596.5,219.7 596.8,218.6 597.9,216.4 599.6,215.1 600.8,212.3 601.2,209.9 604.4,210.5 605.3,208.4 607.0,209.7 608.6,209.1 609.3,209.6 611.2,209.7 613.6,210.8 614.3,211.7 615.6,212.6 616.7,214.3 617.6,215.2 616.7,216.4 615.7,217.7 615.9,218.5 616.0,219.3 617.5,219.3 618.2,219.2 618.8,219.6 618.2,220.6 619.2,222.2 620.3,223.5 621.3,224.5 630.4,227.8 632.7,227.8Z","i":0,"y":0},{"n":"Djibouti","d":"M617.6,215.2 618.8,215.4 619.7,214.7 620.3,215.6 620.2,216.7 618.7,217.4 619.8,218.2 618.8,219.6 618.2,219.2 617.5,219.3 616.0,219.3 615.9,218.5 615.7,217.7 616.7,216.4 617.6,215.2Z","i":0,"y":0},{"n":"Somaliland","d":"M636.0,218.3 636.0,218.3 636.0,218.3 635.9,219.5 635.9,222.3 635.9,223.7 634.7,225.5 632.7,227.8 630.4,227.8 621.3,224.5 620.3,223.5 619.2,222.2 618.2,220.6 618.8,219.6 619.8,218.2 620.8,218.7 621.3,219.8 622.5,221.0 623.9,221.0 626.5,220.3 629.6,220.0 632.0,219.1 633.4,218.9 634.4,218.4 636.0,218.3 636.0,218.3Z","i":0,"y":0},{"n":"Uganda","d":"M594.2,252.6 588.5,252.9 585.5,252.8 584.5,253.2 582.8,254.0 582.2,253.7 582.2,251.6 582.8,250.6 583.0,248.3 583.6,247.0 584.6,245.6 585.7,244.9 586.6,243.9 585.5,243.5 585.6,240.3 585.6,240.3 586.8,239.5 588.6,240.1 590.8,239.5 592.8,239.5 594.5,238.2 595.8,240.1 596.1,241.5 597.3,244.7 596.3,246.7 594.9,248.6 594.1,249.7 594.2,252.6Z","i":0,"y":0},{"n":"Rwanda","d":"M584.5,253.2 585.6,254.7 585.4,256.4 584.6,256.7 584.6,256.7 583.2,256.5 582.3,258.1 580.6,257.9 580.9,256.4 581.3,256.2 581.4,254.5 582.2,253.7 582.8,254.0 584.5,253.2Z","i":0,"y":0},{"n":"Bosnia and Herz.","d":"M551.6,131.5 549.1,130.5 548.0,129.3 547.0,128.7 545.7,127.7 545.1,126.8 543.8,125.5 544.3,124.4 545.3,125.0 545.9,124.4 547.2,124.4 549.6,124.8 551.5,124.8 552.8,125.4 552.8,125.4 553.8,125.4 553.1,126.6 554.4,127.7 554.0,129.0 553.4,129.1 552.9,129.4 552.0,130.0 551.6,131.5Z","i":0,"y":0},{"n":"North Macedonia","d":"M562.2,132.4 563.6,133.3 563.8,135.2 563.2,135.3 562.8,135.7 561.3,135.7 560.2,136.3 558.4,136.5 557.2,135.9 556.8,134.7 557.2,133.7 557.2,133.7 557.5,133.8 557.7,133.2 559.3,132.8 559.9,132.7 560.9,132.5 562.2,132.4Z","i":0,"y":0},{"n":"Serbia","d":"M552.3,122.5 552.3,122.5 554.4,121.7 556.2,121.9 557.7,123.0 558.0,123.8 559.7,124.5 559.9,125.6 561.5,126.4 562.4,125.8 563.1,126.2 562.4,126.6 562.9,127.1 562.3,127.8 562.5,128.8 563.9,130.0 562.8,130.8 562.3,131.7 562.6,132.1 562.2,132.4 560.9,132.5 559.9,132.7 559.8,132.4 560.2,132.1 560.5,131.4 560.1,131.5 559.6,130.9 559.1,130.8 558.7,130.4 558.2,130.2 557.8,129.8 557.3,130.0 556.9,130.9 556.3,131.1 556.5,130.8 555.4,130.3 554.5,130.0 554.1,129.6 553.4,129.1 554.0,129.0 554.4,127.7 553.1,126.6 553.8,125.4 552.8,125.4 552.8,125.4 553.9,124.3 553.0,123.6 552.3,122.5Z","i":1,"y":0},{"n":"Montenegro","d":"M555.8,131.7 555.0,131.9 554.8,131.4 553.6,132.8 553.8,133.7 553.2,133.5 552.5,132.6 551.3,132.0 551.6,131.5 552.0,130.0 552.9,129.4 553.4,129.1 554.1,129.6 554.5,130.0 555.4,130.3 556.5,130.8 556.3,131.1 555.8,131.7Z","i":0,"y":0},{"n":"Kosovo","d":"M557.2,133.7 557.0,132.7 556.3,132.4 555.8,131.7 556.3,131.1 556.9,130.9 557.3,130.0 557.8,129.8 558.2,130.2 558.7,130.4 559.1,130.8 559.6,130.9 560.1,131.5 560.5,131.4 560.2,132.1 559.8,132.4 559.9,132.7 559.3,132.8 557.7,133.2 557.5,133.8 557.2,133.7Z","i":0,"y":0},{"n":"Trinidad and Tobago","d":"M328.7,220.1 330.3,219.8 330.8,219.8 330.7,221.9 328.4,222.2 327.9,222.0 328.7,221.2 328.7,220.1Z","i":0,"y":0},{"n":"S. Sudan","d":"M585.6,240.3 583.2,238.4 582.5,237.2 581.0,237.8 579.7,237.6 579.0,238.1 577.7,237.8 576.0,235.5 575.6,234.6 573.5,233.5 572.8,231.8 571.7,230.6 569.8,229.2 569.8,228.3 568.2,227.1 566.4,226.1 567.2,225.8 568.2,225.2 568.9,222.7 569.6,221.5 571.6,221.1 572.1,221.8 573.5,223.5 574.3,223.7 575.3,223.2 577.3,223.3 577.7,223.9 580.5,223.9 580.6,223.3 582.0,222.8 582.3,222.0 583.3,221.4 585.7,223.0 587.1,222.7 588.5,220.7 590.0,219.2 589.8,217.6 589.1,216.7 590.8,216.6 591.0,216.0 592.2,216.2 591.9,218.2 592.2,220.2 593.7,221.3 594.0,222.3 594.0,223.7 594.3,223.7 594.4,225.9 594.0,226.7 592.5,226.8 591.5,228.4 593.2,228.6 594.7,229.9 595.1,231.0 596.4,231.7 598.1,234.7 596.2,236.5 594.5,238.2 592.8,239.5 590.8,239.5 588.6,240.1 586.8,239.5 585.6,240.3Z","i":0,"y":0}],"imaxBubbles":[{"c":"United States","n":181,"x":226.1,"y":139.4},{"c":"China","n":69,"x":789.4,"y":150.3},{"c":"Japan","n":29,"x":884.2,"y":149.4},{"c":"Canada","n":28,"x":204.7,"y":94.2},{"c":"France","n":22,"x":506.1,"y":121.7},{"c":"United Kingdom","n":20,"x":494.4,"y":100.0},{"c":"South Korea","n":16,"x":855.3,"y":148.6},{"c":"India","n":11,"x":719.4,"y":192.8},{"c":"Thailand","n":10,"x":780.6,"y":205.8},{"c":"Indonesia","n":9,"x":827.8,"y":256.9},{"c":"Saudi Arabia","n":8,"x":625.3,"y":183.6},{"c":"Malaysia","n":7,"x":783.1,"y":238.3},{"c":"Netherlands","n":6,"x":514.7,"y":105.3},{"c":"Taiwan","n":5,"x":835.8,"y":184.2},{"c":"Austria","n":5,"x":540.6,"y":118.1},{"c":"Germany","n":5,"x":528.9,"y":107.8},{"c":"Belgium","n":4,"x":512.5,"y":109.7},{"c":"Switzerland","n":4,"x":522.8,"y":120.0},{"c":"Mexico","n":3,"x":215.3,"y":184.4},{"c":"Hong Kong","n":3,"x":817.2,"y":188.1},{"c":"Singapore","n":3,"x":788.3,"y":246.3},{"c":"Vietnam","n":3,"x":800.8,"y":210.8},{"c":"Sweden","n":3,"x":551.7,"y":83.1},{"c":"Ukraine","n":3,"x":586.7,"y":115.6},{"c":"Australia","n":3,"x":871.7,"y":320.3},{"c":"Colombia","n":2,"x":293.6,"y":237.2},{"c":"Kuwait","n":2,"x":631.9,"y":168.6},{"c":"Philippines","n":2,"x":838.3,"y":214.2},{"c":"United Arab Emirates","n":2,"x":649.4,"y":185.0},{"c":"Spain","n":2,"x":489.7,"y":137.5},{"c":"New Zealand","n":2,"x":977.8,"y":366.1},{"c":"Aruba","n":1,"x":305.6,"y":215.3},{"c":"Bahamas","n":1,"x":285.0,"y":180.6},{"c":"Brazil","n":1,"x":355.8,"y":289.4},{"c":"Cura\u00e7ao","n":1,"x":308.3,"y":216.1},{"c":"Ecuador","n":1,"x":282.8,"y":255.0},{"c":"Peru","n":1,"x":291.7,"y":275.6},{"c":"Bahrain","n":1,"x":640.3,"y":177.8},{"c":"Oman","n":1,"x":655.3,"y":190.3},{"c":"Qatar","n":1,"x":642.2,"y":179.7},{"c":"Czechia","n":1,"x":543.1,"y":111.7},{"c":"Finland","n":1,"x":571.4,"y":78.1},{"c":"Italy","n":1,"x":535.0,"y":133.6},{"c":"Latvia","n":1,"x":568.3,"y":91.9},{"c":"Luxembourg","n":1,"x":516.9,"y":111.7},{"c":"Norway","n":1,"x":523.6,"y":81.9},{"c":"Poland","n":1,"x":553.1,"y":105.8},{"c":"Portugal","n":1,"x":477.2,"y":140.6},{"c":"Serbia","n":1,"x":558.3,"y":127.8},{"c":"Morocco","n":1,"x":480.3,"y":161.7},{"c":"South Africa","n":1,"x":563.6,"y":335.0}],"dolbyBubbles":[{"c":"Austria","n":5,"x":540.6,"y":118.1},{"c":"China","n":41,"x":789.4,"y":150.3},{"c":"France","n":13,"x":506.1,"y":121.7},{"c":"Germany","n":6,"x":528.9,"y":107.8},{"c":"India","n":4,"x":719.4,"y":192.8},{"c":"Japan","n":11,"x":884.2,"y":149.4},{"c":"Kuwait","n":3,"x":631.9,"y":168.6},{"c":"Netherlands","n":5,"x":514.7,"y":105.3},{"c":"Norway","n":1,"x":523.6,"y":81.9},{"c":"Saudi Arabia","n":7,"x":625.3,"y":183.6},{"c":"South Korea","n":14,"x":855.3,"y":148.6},{"c":"Taiwan","n":6,"x":835.8,"y":184.2},{"c":"Thailand","n":1,"x":780.6,"y":205.8},{"c":"United Arab Emirates","n":4,"x":649.4,"y":185.0},{"c":"United Kingdom","n":8,"x":494.4,"y":100.0},{"c":"United States","n":178,"x":226.1,"y":139.4},{"c":"Vietnam","n":1,"x":800.8,"y":210.8}]};
const SHARE_HITS=[{"film":"Project Hail Mary","imax":"$16.4M","share":"20%","note":"of the North American debut on just 1% of screens","src":"IMAX PR","conf":"high"},{"film":"Avatar: Fire and Ash","imax":"$13.5M","share":"23%","note":"of the film's opening in China","src":"IMAX PR","conf":"high"},{"film":"Demon Slayer: Infinity Castle","imax":"\u2014","share":"4.2%","note":"of global box office in the quarter","src":"Deadline","conf":"low"}];
const ECON_ROI=[{"cat":"65mm film","roi":3.5,"n":19,"budget_med":185,"gross_med":550},{"cat":"DMR","roi":2.85,"n":590,"budget_med":90,"gross_med":236},{"cat":"certified","roi":2.66,"n":44,"budget_med":188,"gross_med":469},{"cat":"native","roi":1.86,"n":7,"budget_med":32,"gross_med":59}];
const ECON_LANG=[{"y":2010,"English":15,"Chinese":1,"Japanese":0,"Other":1,"nonEngPct":12},{"y":2011,"English":25,"Chinese":1,"Japanese":0,"Other":1,"nonEngPct":7},{"y":2012,"English":30,"Chinese":0,"Japanese":0,"Other":1,"nonEngPct":3},{"y":2013,"English":28,"Chinese":0,"Japanese":1,"Other":4,"nonEngPct":15},{"y":2014,"English":28,"Chinese":0,"Japanese":0,"Other":2,"nonEngPct":7},{"y":2015,"English":34,"Chinese":1,"Japanese":3,"Other":0,"nonEngPct":11},{"y":2016,"English":40,"Chinese":1,"Japanese":1,"Other":1,"nonEngPct":7},{"y":2017,"English":43,"Chinese":2,"Japanese":3,"Other":6,"nonEngPct":20},{"y":2018,"English":49,"Chinese":2,"Japanese":1,"Other":7,"nonEngPct":17},{"y":2019,"English":42,"Chinese":2,"Japanese":1,"Other":4,"nonEngPct":14},{"y":2020,"English":19,"Chinese":4,"Japanese":2,"Other":5,"nonEngPct":37},{"y":2021,"English":40,"Chinese":5,"Japanese":7,"Other":4,"nonEngPct":29},{"y":2022,"English":31,"Chinese":4,"Japanese":8,"Other":16,"nonEngPct":47},{"y":2023,"English":38,"Chinese":5,"Japanese":6,"Other":12,"nonEngPct":38},{"y":2024,"English":40,"Chinese":3,"Japanese":7,"Other":17,"nonEngPct":40},{"y":2025,"English":41,"Chinese":7,"Japanese":6,"Other":25,"nonEngPct":48},{"y":2026,"English":23,"Chinese":4,"Japanese":5,"Other":12,"nonEngPct":48}];
const ECON_N=660;

// COL reads the live theme tokens from CSS custom properties, so the charts
// pick up whichever theme (dark or light) is active. It is refreshed on every
// theme switch (see window.__imaxRefreshCharts below) before charts rebuild.
const COL={};
// AXC holds axis colours (tick text + gridlines). It is a live object kept in
// sync with the active theme by refreshCOL(), so all axes recolour on a theme
// switch. (Previously these were hardcoded dark values, which left axis labels
// mis-coloured in light mode.)
const AXC={ink3:'#6d7686',grid:'#232833'};
function refreshCOL(){
  const cs=getComputedStyle(document.documentElement);
  const v=n=>cs.getPropertyValue(n).trim();
  COL.native=v('--native')||'#f2b705';
  COL.certified=v('--certified')||'#4bb39a';
  COL.film65=v('--film65')||'#e07a54';
  COL.dmr=v('--dmr')||'#5f6779';
  COL.ink3=v('--ink-3')||'#6d7686';
  COL.ink2=v('--ink-2')||'#a7afbe';
  COL.grid=v('--grid')||'#232833';
  COL.beam=v('--beam-fill')||'#f2b705';
  COL.paper=v('--paper')||COL.paper;
  COL.panel=v('--panel')||COL.panel;
  COL.tint=v('--beam-tint')||COL.tint;
  // keep the axis-colour object in sync
  AXC.ink3=COL.ink3;
  AXC.grid=COL.grid;
}
refreshCOL();

// Money formatter. Data values are in millions of dollars ($M). On log axes
// Chart.js emits fractional ticks (0.04, 0.1, 0.7, 1, 3, 10 …), so "$"+v+"M"
// prints the confusing "$0.04M". fmtMoneyM covers the whole range: sub-million
// ticks render as $K (so $0.04M reads "$40K"), and large values read "$1B"/"$3B".
function fmtMoneyM(v){
  if (v == null || isNaN(v)) return '';
  if (v <= 0) return '$0';
  if (v < 1){ return '$' + Math.round(v * 1000) + 'K'; }
  if (v < 1000){ return '$' + Math.round(v) + 'M'; }
  var b = v / 1000;
  return '$' + (Number.isInteger(b) ? b : Math.round(b * 10) / 10) + 'B';
}
// Year ticks: render a bare integer year ("2000") with NO thousands separator.
// Chart.js's default numeric formatter is locale-aware and turns 2000 into
// "2,000", which reads wrong for a year axis.
function fmtYear(v){ return '' + Math.round(v); }
// Log-money ticks: on a logarithmic axis Chart.js emits many intermediate
// ticks (1,2,3,5 within each decade), so the $-labels overlap. Only label the
// clean power-of-10 gridlines ($1M, $10M, $100M, $1B ...) and blank the rest.
function fmtMoneyLog(v){
  if (v == null || isNaN(v) || v <= 0) return '';
  var e = Math.log10(v);
  return Math.abs(e - Math.round(e)) < 0.01 ? fmtMoneyM(v) : '';
}
// Guard: only touch Chart defaults if the library actually loaded. Without
// this guard a blocked/slow CDN throws here at parse time and aborts the whole
// script — taking the map, primer, and glossary down with it.
// Tooltip text colours must track the active theme. Chart.js defaults the
// tooltip title/body to white, which is invisible on the light theme's light
// panel. Setting these globally (rather than per-chart) fixes every tooltip at
// once and keeps them dark-on-light / light-on-dark after a theme switch.
function applyTooltipDefaults(){
  if (typeof Chart === 'undefined' || !Chart.defaults.plugins) return;
  const tt = Chart.defaults.plugins.tooltip;
  if (!tt) return;
  tt.backgroundColor = COL.panel;
  tt.borderColor = COL.grid;
  tt.borderWidth = 1;
  tt.titleColor = COL.ink2;
  tt.bodyColor = COL.ink2;
  tt.footerColor = COL.ink3;
}
if (typeof Chart !== 'undefined') {
  Chart.defaults.color=COL.ink2;
  Chart.defaults.font.family="'IBM Plex Mono','Inter',monospace";
  Chart.defaults.font.size=11;
  applyTooltipDefaults();
  // Consistent rounded bars (matches the reference: rounded corners, grown from
  // the baseline). borderSkipped:false lets the radius apply cleanly.
  if (Chart.defaults.elements && Chart.defaults.elements.bar){
    Chart.defaults.elements.bar.borderSkipped = false;
    Chart.defaults.elements.bar.borderRadius = 3;
  }

  // Draw-on animation is configured by applyChartMotion() (defined below), which
  // is also reused on theme/motion changes. Calling it here keeps one source of
  // truth and avoids the function-valued top-level `delay` that could trip
  // Chart.js's interpolator ("this._fn is not a function").
  applyChartMotion();
}

/* aperture ticks in hero */
(function(){const a=document.getElementById('aperture');const hs=[22,40,30,54,64,48,36];
 hs.forEach(h=>{const i=document.createElement('i');i.style.height=h+'px';a.appendChild(i);});})();

const gridCfg={color:COL.grid,drawTicks:false};
const xTime={grid:{display:false},ticks:{maxRotation:0,autoSkip:true,maxTicksLimit:9,color:COL.ink3},title:{display:true,text:'Year',color:COL.ink3,font:{size:11}}};

/* ---------- 1 · growth ---------- */
/* network series aligned to YEARS (null before 2001) */
const NETBYYEAR=(()=>{const m=Object.fromEntries(NETWORK);return YEARS.map(y=>m[y]??null);})();
let c1, netOn=false;
function draw1(mode){
  if(c1)c1.destroy();
  const ctx=document.getElementById('c1');
  let datasets;
  if(mode==='stack'){
    datasets=[
      {label:'IMAX 70mm',data:NATIVE,backgroundColor:COL.native,borderColor:COL.native,fill:true,stack:'s',pointRadius:0,borderWidth:0,tension:.25,yAxisID:'y'},
      {label:'Filmed for IMAX',data:CERT,backgroundColor:COL.certified,borderColor:COL.certified,fill:true,stack:'s',pointRadius:0,borderWidth:0,tension:.25,yAxisID:'y'},
      {label:'IMAX DMR',data:DMR,backgroundColor:COL.dmr,borderColor:COL.dmr,fill:true,stack:'s',pointRadius:0,borderWidth:0,tension:.25,yAxisID:'y'},
    ];
  }else if(mode==='total'){
    datasets=[{label:'films released',data:FILMS,borderColor:COL.beam,fill:true,pointRadius:0,borderWidth:2,tension:.25,
      backgroundColor:COL.tint,yAxisID:'y'}];
  }else{
    const share=YEARS.map((_,i)=> FILMS[i]? Math.round(100*NATIVE[i]/FILMS[i]):0);
    datasets=[{label:'IMAX 70mm share',data:share,borderColor:COL.native,backgroundColor:COL.tint,fill:true,pointRadius:0,borderWidth:2,tension:.25,yAxisID:'y'}];
  }
  if(netOn){
    datasets.push({label:'IMAX systems worldwide',data:NETBYYEAR,borderColor:COL.film65,backgroundColor:COL.film65,
      borderWidth:2,borderDash:[5,4],pointRadius:0,tension:.3,fill:false,yAxisID:'yNet',spanGaps:true});
  }
  const scales={x:xTime,
    y:{stacked:mode==='stack',grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},
       title:{display:true,text:mode==='share'?'% IMAX 70mm':'films released',color:COL.ink3,font:{size:11}},
       max:mode==='share'?100:undefined}};
  if(netOn){
    scales.yNet={position:'right',grid:{display:false},border:{display:false},
      ticks:{color:COL.film65,callback:v=>v>=1000?(v/1000)+'k':v},
      title:{display:true,text:'IMAX screens installed',color:COL.film65,font:{size:11}}};
  }
  c1=new Chart(ctx,{type:'line',data:{labels:YEARS,datasets},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
        callbacks:{title:(t)=>t[0].label,
          label:(c)=>c.dataset.yAxisID==='yNet'? ` ${c.dataset.label}: ${c.parsed.y?.toLocaleString()}`
                     : ` ${c.dataset.label}: ${c.parsed.y}${mode==='share'?'%':' films'}`}}},
      scales}});
}
document.querySelectorAll('#s1seg button').forEach(b=>b.onclick=()=>{
  if(b.dataset.v==='net'){                    /* network is a toggle, not a mode */
    netOn=!netOn; b.setAttribute('aria-pressed',netOn?'true':'false');
    draw1(document.querySelector('#s1seg button[data-mode="1"][aria-pressed="true"]')?.dataset.v||curMode1);
    return;
  }
  document.querySelectorAll('#s1seg button[data-mode="1"]').forEach(x=>x.setAttribute('aria-pressed','false'));
  b.setAttribute('aria-pressed','true'); curMode1=b.dataset.v;
  document.getElementById('s1legend').style.display = b.dataset.v==='stack'?'flex':'none';
  draw1(b.dataset.v);
});
let curMode1='stack';

/* ---------- 2 · format adoption ---------- */
const S2={'3d':{data:THREED,colorKey:'native',label:'3D'},
          'laser':{data:LASER,colorKey:'certified',label:'Laser'},
          'screenx':{data:SCREENX,colorKey:'screenx',label:'ScreenX'},
          'fourdx':{data:FOURDX,colorKey:'film65',label:'4DX'}};
// Resolve a categorical colour from the live theme tokens at draw time, so a
// theme switch recolours these series correctly (module-level consts would
// otherwise freeze the colours captured at first load).
function catColor(key){
  if (key === 'screenx') return '#7b9be0';   // ScreenX has no token; fixed blue
  return COL[key] || '#7b9be0';
}
const s2on={'3d':true,'laser':true,'screenx':true,'fourdx':true};
let c2;
function draw2(){
  if(c2)c2.destroy();
  const ds=Object.keys(S2).filter(k=>s2on[k]).map(k=>({
    label:S2[k].label,data:S2[k].data,borderColor:catColor(S2[k].colorKey),backgroundColor:catColor(S2[k].colorKey),
    pointRadius:0,borderWidth:2,tension:.35,fill:false}));
  c2=new Chart(document.getElementById('c2'),{type:'line',data:{labels:YEARS,datasets:ds},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>` ${c.dataset.label}: ${c.parsed.y}%`}}},
      scales:{x:{...xTime,min:2005},y:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3,callback:v=>v+'%'},
        title:{display:true,text:'Share of the year\u2019s slate (%)',color:COL.ink3,font:{size:11}},min:0,max:80}}}});
}
document.querySelectorAll('#s2seg button').forEach(b=>b.onclick=()=>{
  s2on[b.dataset.k]=!s2on[b.dataset.k];
  b.setAttribute('aria-pressed',s2on[b.dataset.k]?'true':'false');
  draw2();
});

/* ---------- 3 · scatter (REAL BOM-joined data) ---------- */
function CATC(k){ return COL[k] || '#7b9be0'; }
/* median WW gross per year across all films -> the "year-expected" baseline for detrend */
const YEAR_MED=(()=>{
  const by={}; SCATTER.forEach(p=>{(by[p.x]=by[p.x]||[]).push(p.y);});
  const med={}; Object.keys(by).forEach(y=>{const a=by[y].sort((m,n)=>m-n);med[y]=a[Math.floor(a.length/2)];});
  return med;
})();
function pts3(mode){
  const groups={native:[],certified:[],dmr:[]};
  SCATTER.forEach(p=>{
    let y=p.y;
    if(mode==='detrend'){ const base=YEAR_MED[p.x]||1; y=(p.y||0.1)/base; }
    else { y=Math.max(0.2,p.y); }   // log scale: floor $0 films to 0.2 so they still plot
    groups[p.c].push({x:p.x,y,t:p.t,raw:p.y});
  });
  return groups;
}
let c3;
function draw3(mode){
  if(c3)c3.destroy();
  const g=pts3(mode);
  const ds=Object.keys(g).map(k=>({label:k,data:g[k],backgroundColor:CATC(k),pointRadius:4,pointHoverRadius:7}));
  const logMode = mode!=='detrend';
  c3=new Chart(document.getElementById('c3'),{type:'scatter',data:{datasets:ds},
    options:{responsive:true,maintainAspectRatio:false,layout:{padding:{top:6,right:10}},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>{const d=c.raw; return ` ${d.t} · ${c.parsed.x} · $${d.raw}M worldwide`;}}}},
      scales:{
        x:{type:'linear',grid:gridCfg,border:{display:false},
           ticks:{color:COL.ink3,precision:0,maxRotation:0,autoSkipPadding:16,callback:fmtYear},
           title:{display:true,text:'Release year',color:COL.ink3,font:{size:11}}},
        y:{type:logMode?'logarithmic':'linear',grid:gridCfg,border:{display:false},
           ticks:{color:COL.ink3,autoSkip:false,maxTicksLimit:12,
                  callback:v=> mode==='detrend'? v+'\u00d7 median' : fmtMoneyLog(v)},
           title:{display:true,
             text:mode==='detrend'?'gross vs that year\u2019s median film':'worldwide gross, log scale',
             color:COL.ink3,font:{size:11}}}}}});
}
document.querySelectorAll('#s3seg button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#s3seg button').forEach(x=>x.setAttribute('aria-pressed','false'));
  b.setAttribute('aria-pressed','true');draw3(b.dataset.v);
});

/* ---------- 4 · forecaster removed ---------- */

/* ---------- 2 · format explainer (static render) ---------- */
function renderExplainer(){
  const barCol={shotfilm:COL.native,certdig:COL.certified,dmr:COL.dmr,native:COL.beam};
  const tagCol={shotfilm:'var(--native)',certdig:'var(--certified)',dmr:'var(--ink-2)',native:'#b09a5a'};
  document.getElementById('tierCards').innerHTML=TIERS.map(t=>`
    <div class="tier">
      <div class="cap-bar" style="background:${barCol[t.k]}"></div>
      <div class="tag2" style="color:${tagCol[t.k]}">${t.k==='dmr'?'imax dmr':t.k==='shotfilm'?'imax 70mm':t.k==='certdig'?'filmed for imax':'imax 70mm'}</div>
      <h4>${t.name}</h4>
      <p class="desc">${t.desc}</p>
      <div class="med" style="color:${barCol[t.k]}">$${t.median}M</div>
      <div class="medlab">median worldwide · n=${t.ngross}</div>
      <div class="exs"><b>e.g.</b> ${t.ex.join(', ')}</div>
    </div>`).join('');

  const H={'1.43':150,'1.90':112,'2.39':64};   // box heights encode relative frame height
  document.getElementById('arWrap').innerHTML=ASPECTS.map(a=>`
    <div class="ar-item">
      <div class="ar-box" style="height:${H[a.r]}px">
        ${a.r!=='2.39'?'<div class="scope-ghost" style="height:64px"></div>':''}
      </div>
      <div class="ar-lab">${a.r}:1</div>
      <div class="ar-note">${a.note}</div>
    </div>`).join('');
}


/* ---------- glossary ---------- */
function renderGlossary(){
  document.getElementById('glossGrid').innerHTML=GLOSSARY.map(g=>`
    <div class="gdef">
      <dt>${g.term}<span class="gfull">${g.full}</span></dt>
      <dd>${g.def}</dd>
    </div>`).join('');
}

/* ---------- top primer ladder ---------- */
function renderPrimer(){
  const rungs=[
    {c:'#f2b705',k:'imax 70mm',name:'IMAX 70mm',d:'Shot on IMAX 70mm film cameras (15 perforations per frame). The negative is larger than the projected image. Presented in the Expanded Aspect Ratio (1.43:1) — the tallest, sharpest picture available.'},
    {c:'#4bb39a',k:'filmed for imax',name:'Filmed for IMAX',d:'Shot on IMAX-certified digital cameras (such as the ARRI Alexa IMAX). Opens to the Expanded Aspect Ratio (1.90:1) for key scenes, but has no film negative.'},
    {c:'#5f6779',k:'imax dmr',name:'IMAX DMR',d:'Shot on ordinary cameras, then converted with IMAX DMR (Digital Media Remastering). The image is upscaled and sharpened, but keeps its original aspect ratio. This is most IMAX releases.'},
    {c:'#8a7a4a',k:'imax 70mm',name:'IMAX 70mm (museum originals)',d:'The original IMAX format: 70mm film documentaries made for science-museum domes. Technically the purest IMAX, but small commercial releases.'},
  ];
  const med={shotfilm:0,certdig:0,dmr:0,native:0};
  TIERS.forEach(t=>med[t.k]=t.median);
  const order=[med.shotfilm,med.certdig,med.dmr,med.native];
  document.getElementById('primerLadder').innerHTML=rungs.map((r,i)=>`
    <div class="rung">
      <div class="rnum" style="color:${r.c}">${i+1}</div>
      <div class="rname">${r.name}<small style="color:${r.c}">${r.k}</small></div>
      <div class="rdesc">${r.d}</div>
      <div class="rgross" style="color:${r.c}">$${order[i]}M<small>median gross</small></div>
    </div>`).join('');
}

/* ---------- 2b · immersion showcase (horizontal bars) ---------- */
let cImm;
function drawImmersion(){
  const data=IMMERSION.slice().sort((a,b)=>b.frac-a.frac);
  // One consistent amber for every bar — the bar's LENGTH already encodes the
  // immersion fraction, so varying the shade too was redundant and, on the
  // light theme, washed the low-fraction bars out to near-white.
  cImm=new Chart(document.getElementById('cImmersion'),{type:'bar',
    data:{labels:data.map(d=>d.t),
      datasets:[{data:data.map(d=>d.frac),
        backgroundColor:COL.beam,
        borderRadius:3,barPercentage:.82}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{title:(t)=>t[0].label,
          label:(c)=>{const d=data[c.dataIndex];
            const mins=d.fm? ` (${d.fm}/${d.tot} min)`:' (entire film)';
            const g=d.g? ` · $${d.g}M WW`:'';
            return ` ${d.frac}% in full 1.43:1${mins}${g}`;}}}},
      layout:{padding:{right:8}},
      scales:{x:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},
        ticks:{color:AXC.ink3,callback:v=>v+'%'},max:100,
        title:{display:true,text:'Runtime in IMAX 70mm 1.43:1 (%)',color:AXC.ink3,font:{size:11}}},
        y:{grid:{display:false},
           ticks:{color:AXC.ink2,font:{size:10.5},autoSkip:false,
             callback:function(v){const lbl=this.getLabelForValue(v);return lbl.length>22?lbl.slice(0,21)+'\u2026':lbl;}}}}}});
}

/* ---------- 5 · what drives reach (three charts) ---------- */
let cStack,cEra,cDec,cDolby,cDual,cProj;
function drawDrivers(){
  const yGross={grid:{color:AXC.grid,drawTicks:false},border:{display:false},
    ticks:{color:AXC.ink3,callback:fmtMoneyM},title:{display:true,text:'Median worldwide gross',color:AXC.ink3,font:{size:11}}};
  cStack=new Chart(document.getElementById('cStack'),{type:'bar',
    data:{labels:STACKING.map(s=>s.n+(s.n===1?' format':' formats')),
      datasets:[{data:STACKING.map(s=>s.median),backgroundColor:COL.native,borderRadius:3,barPercentage:.62}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' $'+c.parsed.y+'M · n='+STACKING[c.dataIndex].count}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,autoSkip:false,maxRotation:0,minRotation:0,font:{size:10}},title:{display:true,text:'Premium formats stacked',color:AXC.ink3,font:{size:11}}},y:yGross}}});

  cEra=new Chart(document.getElementById('cEra3d'),{type:'bar',
    data:{labels:ERA3D.map(e=>e.era),datasets:[
      {label:'3D',data:ERA3D.map(e=>e.d3),backgroundColor:COL.certified,borderRadius:3,categoryPercentage:.62},
      {label:'non-3D',data:ERA3D.map(e=>e.non),backgroundColor:COL.dmr,borderRadius:3,categoryPercentage:.62}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' '+c.dataset.label+': $'+c.parsed.y+'M'}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0},title:{display:true,text:'Era',color:AXC.ink3,font:{size:11}}},y:yGross}}});

  cDec=new Chart(document.getElementById('cDecade'),{type:'bar',
    data:{labels:DECADE.map(d=>d.era),
      datasets:[{data:DECADE.map(d=>d.median),
        backgroundColor:DECADE.map(d=>d.era==='20–26'?COL.film65:COL.beam),borderRadius:3,barPercentage:.66}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{title:(t)=>t[0].label,label:(c)=>' $'+c.parsed.y+'M · n='+DECADE[c.dataIndex].n+' films'}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0},title:{display:true,text:'Decade',color:AXC.ink3,font:{size:11}}},y:yGross}}});

  cDolby=new Chart(document.getElementById('cDolby'),{type:'bar',
    data:{labels:['IMAX only','IMAX + Dolby'],
      datasets:[{data:[DOLBY.imax_med,DOLBY.both_med],backgroundColor:[COL.beam,'#9b6cd6'],borderRadius:3,barPercentage:.5}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' $'+c.parsed.y+'M median · n='+(c.dataIndex? DOLBY.both_n:DOLBY.imax_n)}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0},title:{display:true,text:'Format availability',color:AXC.ink3,font:{size:11}}},y:yGross}}});

  cDual=new Chart(document.getElementById('cDual'),{type:'line',
    data:{labels:DOLBY.dual.map(d=>d.y),
      datasets:[{data:DOLBY.dual.map(d=>d.pct),borderColor:'#9b6cd6',backgroundColor:'rgba(155,108,214,0.12)',
        fill:true,pointRadius:0,borderWidth:2,tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' '+c.parsed.y+'% also in Dolby · '+DOLBY.dual[c.dataIndex].n+' films'}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0,autoSkip:true,maxTicksLimit:8},title:{display:true,text:'Year',color:AXC.ink3,font:{size:11}}},
        y:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3,callback:v=>v+'%'},min:0,
           title:{display:true,text:'IMAX slate also in Dolby (%)',color:AXC.ink3,font:{size:11}}}}}});

  // projection-tier gradient
  cProj=new Chart(document.getElementById('cProj'),{type:'bar',
    data:{labels:PROJECTION.map(p=>p.fmt),
      datasets:[{data:PROJECTION.map(p=>p.median),
        backgroundColor:[COL.dmr,COL.film65,COL.certified,COL.beam],borderRadius:3,barPercentage:.7}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' $'+c.parsed.x+'M median · n='+PROJECTION[c.dataIndex].n}}},
      scales:{x:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3,callback:fmtMoneyM},title:{display:true,text:'Median worldwide gross',color:AXC.ink3,font:{size:11}}},
        y:{grid:{display:false},ticks:{color:AXC.ink2,font:{size:11}}}}}});
}

/* ---------- 6 · franchise ---------- */
let cFranBar,cFranRank;
function drawFranchise(){
  const yG={grid:{color:AXC.grid,drawTicks:false},border:{display:false},
    ticks:{color:AXC.ink3,callback:fmtMoneyM},title:{display:true,text:'Median worldwide gross',color:AXC.ink3,font:{size:11}}};
  cFranBar=new Chart(document.getElementById('cFranBar'),{type:'bar',
    data:{labels:['Franchise','Standalone'],
      datasets:[{data:[FRANCHISE.fran_med,FRANCHISE.std_med],backgroundColor:[COL.beam,COL.dmr],borderRadius:3,barPercentage:.5}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' $'+c.parsed.y+'M median · n='+(c.dataIndex? FRANCHISE.std_n:FRANCHISE.fran_n)}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3},title:{display:true,text:'Film type',color:AXC.ink3,font:{size:11}}},y:yG}}});

  const fr=BYFRAN.slice().sort((a,b)=>b.median-a.median);
  cFranRank=new Chart(document.getElementById('cFranRank'),{type:'bar',
    data:{labels:fr.map(f=>f.name),
      datasets:[{data:fr.map(f=>f.median),
        backgroundColor:fr.map(f=>f.name.startsWith('Marvel')?COL.beam:COL.certified),borderRadius:3,barPercentage:.82}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>{const d=fr[c.dataIndex];return ' $'+d.median+'M median · '+d.n+' films · $'+(d.total>=1000?(d.total/1000).toFixed(1)+'B':d.total+'M')+' total';}}}},
      scales:{x:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3,callback:fmtMoneyM},title:{display:true,text:'Median worldwide gross',color:AXC.ink3,font:{size:11}}},
        y:{grid:{display:false},ticks:{color:AXC.ink2,font:{size:11}}}}}});
}

/* ---------- 7 · rhythm & concentration ---------- */
let cSeason,cPyramid,cConc;
function drawRhythm(){
  cSeason=new Chart(document.getElementById('cSeason'),{
    data:{labels:SEASON.map(s=>s.m),
      datasets:[
        {type:'bar',label:'films released',data:SEASON.map(s=>s.count),backgroundColor:COL.dmr,borderRadius:3,yAxisID:'y',order:2},
        {type:'line',label:'median worldwide gross',data:SEASON.map(s=>s.median),borderColor:COL.beam,backgroundColor:COL.beam,
          borderWidth:2,pointRadius:2,tension:.3,yAxisID:'yG',order:1}]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>c.dataset.label==='films'? ' '+c.parsed.y+' films':' $'+c.parsed.y+'M median'}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0,font:{size:10}},title:{display:true,text:'Release month',color:AXC.ink3,font:{size:11}}},
        y:{position:'left',grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3},title:{display:true,text:'Films released',color:AXC.ink3,font:{size:11}}},
        yG:{position:'right',grid:{display:false},border:{display:false},ticks:{color:COL.beam,callback:fmtMoneyM},title:{display:true,text:'median worldwide gross',color:COL.beam,font:{size:11}}}}}});

  const py=PYRAMID.slice();
  cPyramid=new Chart(document.getElementById('cPyramid'),{type:'bar',
    data:{labels:py.map(p=>p.band),
      datasets:[{data:py.map(p=>p.count),
        backgroundColor:['#f2b705','#e8b04a','#4bb39a','#5f8a7a','#5f6779','#464c58'],borderRadius:3,barPercentage:.8}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' '+c.parsed.x+' films'}}},
      scales:{x:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3},title:{display:true,text:'Number of films',color:AXC.ink3,font:{size:11}}},
        y:{grid:{display:false},ticks:{color:AXC.ink2,font:{size:11}}}}}});

  const share=CONCENTRATION.top10pct_share;
  const centerText={id:'centerText',afterDraw(chart){
    const {ctx,chartArea:{left,right,top,bottom}}=chart;
    const cx=(left+right)/2, cy=(top+bottom)/2;
    ctx.save();
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillStyle=COL.beam; ctx.font='600 34px "IBM Plex Mono",monospace';
    ctx.fillText(share+'%', cx, cy-8);
    ctx.fillStyle=COL.ink3; ctx.font='11px "IBM Plex Mono",monospace';
    ctx.fillText('of all gross', cx, cy+18);
    ctx.restore();
  }};
  cConc=new Chart(document.getElementById('cConc'),{type:'doughnut',
    data:{labels:['Top 10% of films','Other 90%'],
      datasets:[{data:[share,100-share],backgroundColor:[COL.beam,COL.grid],borderWidth:0}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:'68%',
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' '+c.label+': '+c.parsed+'% of gross'}}}},
    plugins:[centerText]});
}

/* ---------- 8 · relationships (scatters w/ trendline + cross-tab) ---------- */
function linreg(pts){ // returns {m,b} for y=mx+b
  const n=pts.length, sx=pts.reduce((a,p)=>a+p.x,0), sy=pts.reduce((a,p)=>a+p.y,0);
  const sxx=pts.reduce((a,p)=>a+p.x*p.x,0), sxy=pts.reduce((a,p)=>a+p.x*p.y,0);
  const m=(n*sxy-sx*sy)/(n*sxx-sx*sx); const b=(sy-m*sx)/n; return {m,b};
}
let cNetFilms,cOpenTotal,cCrossTab;
function drawRelations(){
  // 1. network vs films/year (linear) with trendline
  const nf=NET_VS_FILMS.map(d=>({x:d.x,y:d.y}));
  const {m,b}=linreg(nf);
  const xmin=Math.min(...nf.map(p=>p.x)), xmax=Math.max(...nf.map(p=>p.x));
  cNetFilms=new Chart(document.getElementById('cNetFilms'),{type:'scatter',
    data:{datasets:[
      {label:'year',data:NET_VS_FILMS.map(d=>({x:d.x,y:d.y,yr:d.yr})),backgroundColor:COL.beam,pointRadius:4,pointHoverRadius:6},
      {label:'trend',type:'line',data:[{x:xmin,y:m*xmin+b},{x:xmax,y:m*xmax+b}],
        borderColor:COL.film65,borderDash:[6,4],borderWidth:1.5,pointRadius:0,fill:false}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        filter:(i)=>i.datasetIndex===0,
        callbacks:{label:(c)=>{const d=c.raw;return ' '+(d.yr||'')+': '+d.x.toLocaleString()+' screens · '+d.y+' films';}}}},
      scales:{
        x:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3,callback:v=>v>=1000?(v/1000)+'k':v},
           title:{display:true,text:'IMAX screens installed',color:AXC.ink3,font:{size:11}}},
        y:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3},
           title:{display:true,text:'Films released',color:AXC.ink3,font:{size:11}}}}}});

  // 2. opening vs total (log-log)
  cOpenTotal=new Chart(document.getElementById('cOpenTotal'),{type:'scatter',
    data:{datasets:[{label:'film',data:OPENING_VS_TOTAL,backgroundColor:'rgba(75,179,154,0.65)',pointRadius:3,pointHoverRadius:5}]},
    options:{responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>{const d=c.raw;return ' '+d.t+' · open $'+d.x+'M → WW $'+d.y+'M';}}}},
      scales:{
        x:{type:'logarithmic',grid:{color:AXC.grid,drawTicks:false},border:{display:false},
           ticks:{color:AXC.ink3,autoSkip:false,maxTicksLimit:12,callback:fmtMoneyLog},
           title:{display:true,text:'Domestic opening weekend, log scale',color:AXC.ink3,font:{size:11}}},
        y:{type:'logarithmic',grid:{color:AXC.grid,drawTicks:false},border:{display:false},
           ticks:{color:AXC.ink3,autoSkip:false,maxTicksLimit:12,callback:fmtMoneyLog},
           title:{display:true,text:'Worldwide gross, log scale',color:AXC.ink3,font:{size:11}}}}}});

  // 3. cross-tab stacked 100% (franchise vs standalone capture mix)
  cCrossTab=new Chart(document.getElementById('cCrossTab'),{type:'bar',
    data:{labels:['Franchise','Standalone'],datasets:[
      {label:'IMAX 70mm',data:[20,5],backgroundColor:COL.native,borderRadius:3},
      {label:'IMAX DMR',data:[72,71],backgroundColor:COL.dmr,borderRadius:3},
      {label:'Filmed for IMAX',data:[8,24],backgroundColor:COL.certified,borderRadius:3}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' '+c.dataset.label+': '+c.parsed.x+'%'}}},
      scales:{
        x:{stacked:true,grid:{color:AXC.grid,drawTicks:false},border:{display:false},max:100,ticks:{color:AXC.ink3,callback:v=>v+'%'},
           title:{display:true,text:'Share of films by capture tier (%)',color:AXC.ink3,font:{size:11}}},
        y:{stacked:true,grid:{display:false},ticks:{color:AXC.ink2,font:{size:12}}}}}});
}

/* ---------- 10 · network structure ---------- */
let cEff,cInst;
function drawStructure(){
  cEff=new Chart(document.getElementById('cEff'),{type:'line',
    data:{labels:EFFICIENCY.map(e=>e.y),
      datasets:[{data:EFFICIENCY.map(e=>e.per_screen),borderColor:COL.film65,backgroundColor:'rgba(224,122,84,0.12)',
        fill:true,pointRadius:0,borderWidth:2,tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>' $'+c.parsed.y+'K per screen · median film $'+EFFICIENCY[c.dataIndex].median_m+'M'}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0,autoSkip:true,maxTicksLimit:8},title:{display:true,text:'Year',color:AXC.ink3,font:{size:11}}},
        y:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3,callback:v=>'$'+v+'K'},
           title:{display:true,text:'Median gross per screen',color:AXC.ink3,font:{size:11}}}}}});

  cInst=new Chart(document.getElementById('cInst'),{type:'line',
    data:{labels:INSTITUTIONAL.map(i=>i.y),
      datasets:[{data:INSTITUTIONAL.map(i=>i.inst_pct),borderColor:'#7b9be0',backgroundColor:'rgba(123,155,224,0.12)',
        fill:true,pointRadius:2,borderWidth:2,tension:.3}]},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:AXC.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>{const d=INSTITUTIONAL[c.dataIndex];return ' '+c.parsed.y+'% institutional ('+d.inst+' of '+d.total+' screens)';}}}},
      scales:{x:{grid:{display:false},ticks:{color:AXC.ink3,maxRotation:0},title:{display:true,text:'Year',color:AXC.ink3,font:{size:11}}},
        y:{grid:{color:AXC.grid,drawTicks:false},border:{display:false},ticks:{color:AXC.ink3,callback:v=>v+'%'},min:0,
           title:{display:true,text:'Institutional screens (%)',color:AXC.ink3,font:{size:11}}}}}});
}

let c5;
function draw5(mode){
  if(c5)c5.destroy();
  const labels=INTLSHARE.map(d=>d[0]);
  const share=INTLSHARE.map(d=>d[1]);
  const netMap=Object.fromEntries(NETWORK);
  const datasets=[{label:'International share',data:share,borderColor:COL.certified,
    backgroundColor:'rgba(75,179,154,0.12)',fill:true,pointRadius:0,borderWidth:2,tension:.3,yAxisID:'y'}];
  const scales={x:{grid:{display:false},ticks:{color:COL.ink3,maxRotation:0,autoSkip:true,maxTicksLimit:9},title:{display:true,text:'Year',color:COL.ink3,font:{size:11}}},
    y:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3,callback:v=>v+'%'},min:0,max:100,
       title:{display:true,text:'International share (%)',color:COL.ink3,font:{size:11}}}};
  if(mode==='withnet'){
    datasets.push({label:'IMAX systems worldwide',data:labels.map(y=>netMap[y]??null),
      borderColor:COL.film65,borderDash:[5,4],pointRadius:0,borderWidth:2,tension:.3,fill:false,yAxisID:'yNet',spanGaps:true});
    scales.yNet={position:'right',grid:{display:false},border:{display:false},
      ticks:{color:COL.film65,callback:v=>v>=1000?(v/1000)+'k':v},
      title:{display:true,text:'IMAX screens installed',color:COL.film65,font:{size:11}}};
  }
  c5=new Chart(document.getElementById('c5'),{type:'line',data:{labels,datasets},
    options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
        callbacks:{label:(c)=>c.dataset.yAxisID==='yNet'? ` systems: ${c.parsed.y?.toLocaleString()}` : ` international: ${c.parsed.y}%`}}},
      scales}});
}
document.querySelectorAll('#s5seg button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#s5seg button').forEach(x=>x.setAttribute('aria-pressed','false'));
  b.setAttribute('aria-pressed','true');draw5(b.dataset.v);
});

/* ---------- 11 · economics (TMDB budgets + language) ---------- */
function drawEcon(){
  const base={responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10}}};

  /* return on budget — 65mm highlighted in beam, rest muted */
  const roiColors=ECON_ROI.map(d=>d.cat==='65mm film'?COL.beam:COL.dmr);
  new Chart(document.getElementById('cEconRoi'),{
    type:'bar',
    data:{
      labels:ECON_ROI.map(d=>d.cat),
      datasets:[{data:ECON_ROI.map(d=>d.roi),backgroundColor:roiColors,borderWidth:0,barPercentage:0.72}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:'y',
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
          callbacks:{
            label:(c)=>' '+c.parsed.x+'\u00d7 return',
            afterLabel:(c)=>{const d=ECON_ROI[c.dataIndex];return '  median budget $'+d.budget_med+'M \u00b7 gross $'+d.gross_med+'M \u00b7 n='+d.n;}
          }
        }
      },
      scales:{
        x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3,callback:v=>v+'\u00d7'},
          title:{display:true,text:'Worldwide gross \u00f7 budget',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2}}
      }
    }
  });

  /* language of the slate — stacked bars */
  const langDs=[
    {label:'English',key:'English',color:COL.dmr},
    {label:'Chinese',key:'Chinese',color:COL.beam},
    {label:'Japanese',key:'Japanese',color:COL.certified},
    {label:'Other',key:'Other',color:COL.film65}
  ];
  new Chart(document.getElementById('cEconLang'),{
    type:'bar',
    data:{
      labels:ECON_LANG.map(d=>d.y),
      datasets:langDs.map(l=>({label:l.label,data:ECON_LANG.map(d=>d[l.key]),
        backgroundColor:l.color,borderWidth:0,stack:'lang',barPercentage:0.92,categoryPercentage:0.9}))
    },
    options:{
      responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
          callbacks:{
            label:(c)=>' '+c.dataset.label+': '+c.parsed.y,
            footer:(items)=>'non-English: '+ECON_LANG[items[0].dataIndex].nonEngPct+'%'
          }
        }
      },
      scales:{
        x:{stacked:true,grid:{display:false},border:{display:false},
          ticks:{color:COL.ink3,maxRotation:0,autoSkip:true,maxTicksLimit:9},
          title:{display:true,text:'Year',color:COL.ink3,font:{size:11}}},
        y:{stacked:true,grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},
          title:{display:true,text:'Films released',color:COL.ink3,font:{size:11}}}
      }
    }
  });
}

/* ---------- 12 · world map (choropleth + bubbles) ---------- */
function drawMap(){
  const svg=document.getElementById('worldMap');
  const gC=document.getElementById('mapCountries');
  const gB=document.getElementById('mapBubbles');
  const legend=document.getElementById('mapLegend');
  const wrap=svg.parentNode;
  if(!svg||!gC) return;
  let net='imax', view='choro';

  // tooltip
  let tip=wrap.querySelector('.map-tip');
  if(!tip){ tip=document.createElement('div'); tip.className='map-tip'; wrap.appendChild(tip); }

  // Colour ramp for the choropleth (amber for IMAX, teal for Dolby). Both ramps
  // scale OPACITY with the country's count so "more" reads as a deeper fill.
  // The amber ramp previously topped out around alpha 0.94, which — over the
  // light theme's pale paper — never actually looked amber (it washed out to
  // near-white, so a high-count country was indistinguishable from a low one).
  // Using the same alpha range as the teal ramp keeps small values visible
  // while letting high counts render as a solid, saturated amber on both themes.
  function ramp(v, max, isDolby){
    if(v<=0) return null;
    const t=Math.pow(v/max, 0.42); // gamma so small values stay visible
    const a=(0.22+0.74*t).toFixed(3);
    return isDolby ? 'rgba(75,179,154,'+a+')' : 'rgba(242,183,5,'+a+')';
  }

  // build country paths once
  const maxImax=Math.max.apply(null, MAP_DATA.paths.map(p=>p.i));
  const maxDolby=Math.max.apply(null, MAP_DATA.paths.map(p=>p.y));
  gC.innerHTML='';
  MAP_DATA.paths.forEach(p=>{
    const el=document.createElementNS('http://www.w3.org/2000/svg','path');
    el.setAttribute('d', p.d);
    el.setAttribute('class', 'country');
    el.__data=p;
    el.addEventListener('mousemove', (e)=>{
      const val=net==='imax'?p.i:p.y;
      if(val<=0){ tip.style.opacity=0; return; }
      const r=wrap.getBoundingClientRect();
      tip.innerHTML='<b>'+p.n+'</b> \u00b7 '+val+' '+(net==='imax'?'IMAX venues':'Dolby screens');
      tip.style.left=(e.clientX-r.left+12)+'px';
      tip.style.top=(e.clientY-r.top+12)+'px';
      tip.style.opacity=1;
    });
    el.addEventListener('mouseleave', ()=>{ tip.style.opacity=0; });
    gC.appendChild(el);
  });

  // build bubbles once
  gB.innerHTML='';
  function bubbleRadius(n, max){ return 3 + 22*Math.sqrt(n/max); }
  function renderBubbles(){
    gB.innerHTML='';
    const data=net==='imax'?MAP_DATA.imaxBubbles:MAP_DATA.dolbyBubbles;
    const max=Math.max.apply(null, data.map(d=>d.n));
    data.slice().sort((a,b)=>b.n-a.n).forEach(d=>{
      const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('cx', d.x); c.setAttribute('cy', d.y);
      c.setAttribute('r', bubbleRadius(d.n, max).toFixed(1));
      c.setAttribute('class', 'bubble'+(net==='dolby'?' dolby':''));
      c.addEventListener('mousemove', (e)=>{
        const r=wrap.getBoundingClientRect();
        tip.innerHTML='<b>'+d.c+'</b> \u00b7 '+d.n+' '+(net==='imax'?'IMAX venues':'Dolby screens');
        tip.style.left=(e.clientX-r.left+12)+'px';
        tip.style.top=(e.clientY-r.top+12)+'px';
        tip.style.opacity=1;
      });
      c.addEventListener('mouseleave', ()=>{ tip.style.opacity=0; });
      gB.appendChild(c);
    });
  }

  function paint(){
    const isDolby=net==='dolby';
    const max=isDolby?maxDolby:maxImax;
    // choropleth fills
    Array.prototype.forEach.call(gC.childNodes, el=>{
      const p=el.__data;
      const val=isDolby?p.y:p.i;
      if(view==='choro'){
        const col=ramp(val, max, isDolby);
        el.style.fill = col || '';
        el.classList.toggle('has-data', val>0);
      } else {
        el.style.fill = '';
        el.classList.remove('has-data');
      }
    });
    // bubbles visibility
    gB.style.display = view==='bubble' ? 'block' : 'none';
    if(view==='bubble') renderBubbles();
    // legend
    const label=isDolby?'Dolby screens':'IMAX venues';
    // Legend swatch mirrors the choropleth ramp: a low→high gradient in the
    // network's colour. The IMAX end used --beam-tint for BOTH stops, so the
    // swatch was a flat, near-invisible pale block (worse on the light theme);
    // use the same amber low→high pair the fills use so it reads like Dolby's.
    const colHi=isDolby?'rgba(75,179,154,0.9)':'rgba(242,183,5,0.9)';
    const colLo=isDolby?'rgba(75,179,154,0.2)':'rgba(242,183,5,0.22)';
    if(view==='choro'){
      legend.innerHTML='<div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-3);margin-bottom:5px">'+label+' per country</div>'+
        '<div class="lg-row"><span class="lg-sw" style="background:linear-gradient(90deg,'+colLo+','+colHi+')"></span>few \u2192 many (max '+max+')</div>';
    } else {
      legend.innerHTML='<div style="font-family:\'IBM Plex Mono\',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--ink-3);margin-bottom:5px">'+label+'</div>'+
        '<div class="lg-row">circle area \u221d screen count</div>';
    }
  }

  // wire toggles
  document.querySelectorAll('#mapNet button').forEach(b=>{
    b.addEventListener('click', ()=>{
      net=b.getAttribute('data-net');
      document.querySelectorAll('#mapNet button').forEach(x=>x.setAttribute('aria-pressed', x===b?'true':'false'));
      paint();
    });
  });
  document.querySelectorAll('#mapView button').forEach(b=>{
    b.addEventListener('click', ()=>{
      view=b.getAttribute('data-view');
      document.querySelectorAll('#mapView button').forEach(x=>x.setAttribute('aria-pressed', x===b?'true':'false'));
      paint();
    });
  });

  paint();
}

/* ---------- 11 · geography (venue registries) ---------- */
function drawGeo(){
  const barBase={responsive:true,maintainAspectRatio:false,
    plugins:{legend:{display:false},tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10}}};

  /* IMAX vs Dolby head-to-head — grouped horizontal bars */
  new Chart(document.getElementById('cGeoH2H'),{type:'bar',
    data:{labels:GEO_H2H.map(d=>d.country),
      datasets:[
        {label:'IMAX',data:GEO_H2H.map(d=>d.imax),backgroundColor:COL.beam,borderWidth:0,barPercentage:0.9,categoryPercentage:0.72},
        {label:'Dolby',data:GEO_H2H.map(d=>d.dolby),backgroundColor:COL.certified,borderWidth:0,barPercentage:0.9,categoryPercentage:0.72}]},
    options:{...barBase,indexAxis:'y',
      plugins:{...barBase.plugins,tooltip:{...barBase.plugins.tooltip,callbacks:{label:(c)=>` ${c.dataset.label}: ${c.parsed.x} venues`}}},
      scales:{x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},title:{display:true,text:'Venues',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2}}}}});

  /* Region distribution */
  new Chart(document.getElementById('cGeoReg'),{type:'bar',
    data:{labels:GEO_REG.map(d=>d.region),
      datasets:[{data:GEO_REG.map(d=>d.n),backgroundColor:COL.beam,borderWidth:0,barPercentage:0.68}]},
    options:{...barBase,
      plugins:{...barBase.plugins,tooltip:{...barBase.plugins.tooltip,callbacks:{label:(c)=>` ${c.parsed.y} venues · ${Math.round(100*c.parsed.y/GEO_TOT)}%`}}},
      scales:{x:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2},title:{display:true,text:'Region',color:COL.ink3,font:{size:11}}},
        y:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},title:{display:true,text:'Venues',color:COL.ink3,font:{size:11}}}}}});

  /* Format-class — colour 1.43 in beam, the rest muted */
  const fmtColors=GEO_FMT.map(d=>d.fmt.indexOf('1.43')>=0?COL.beam:COL.dmr);
  new Chart(document.getElementById('cGeoFmt'),{type:'bar',
    data:{labels:GEO_FMT.map(d=>d.fmt),
      datasets:[{data:GEO_FMT.map(d=>d.n),backgroundColor:fmtColors,borderWidth:0,barPercentage:0.78}]},
    options:{...barBase,indexAxis:'y',
      plugins:{...barBase.plugins,tooltip:{...barBase.plugins.tooltip,callbacks:{label:(c)=>` ${c.parsed.x} venues · ${Math.round(100*c.parsed.x/GEO_TOT)}%`}}},
      scales:{x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},title:{display:true,text:'Venues',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2,font:{size:10}}}}}});

  /* True-1.43 by country */
  new Chart(document.getElementById('cGeo143'),{type:'bar',
    data:{labels:GEO_143.map(d=>d.country),
      datasets:[{data:GEO_143.map(d=>d.n),backgroundColor:COL.beam,borderWidth:0,barPercentage:0.8}]},
    options:{...barBase,indexAxis:'y',
      plugins:{...barBase.plugins,tooltip:{...barBase.plugins.tooltip,callbacks:{label:(c)=>` ${c.parsed.x} IMAX 70mm (1.43:1) screens`}}},
      scales:{x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3,precision:0},title:{display:true,text:'IMAX 70mm (1.43:1) screens',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2}}}}});

  /* screen area by format-class — 1.43 in beam, 1.90 muted */
  new Chart(document.getElementById('cGeoSize'),{
    type:'bar',
    data:{
      labels:GEO_SIZE.map(d=>d.fmt),
      datasets:[{data:GEO_SIZE.map(d=>d.area),backgroundColor:GEO_SIZE.map(d=>d.fmt.indexOf('1.43')>=0?COL.beam:COL.dmr),borderWidth:0,barPercentage:0.62}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:'y',
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
          callbacks:{
            label:(c)=>' '+c.parsed.x+' m\u00b2 median',
            afterLabel:(c)=>{const d=GEO_SIZE[c.dataIndex];return '  ~'+d.h+'m tall \u00d7 '+d.w+'m wide \u00b7 n='+d.n;}
          }
        }
      },
      scales:{
        x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},
          title:{display:true,text:'Median screen area (m\u00b2)',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2}}
      }
    }
  });
}

/* ---------- 15 · IMAX reported financials ---------- */
function drawFinancials(){
  const labels=ECON_GBO.map(d=>d.t);
  const vals=ECON_GBO.map(d=>d.m);
  new Chart(document.getElementById('cFinGBO'),{
    type:'line',
    data:{
      labels:labels,
      datasets:[{
        data:vals,
        borderColor:COL.beam,
        backgroundColor:COL.tint,
        borderWidth:2,
        pointRadius:2.5,
        pointBackgroundColor:COL.beam,
        pointHoverRadius:5,
        tension:0.25,
        fill:true,
        spanGaps:false
      }]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
          callbacks:{
            title:(items)=>'Filed '+items[0].label,
            label:(c)=>' $'+c.parsed.y+'M gross box office'
          }
        }
      },
      scales:{
        x:{grid:{display:false},border:{display:false},
          title:{display:true,text:'Fiscal year filed',color:COL.ink3,font:{size:11}},
          ticks:{color:COL.ink3,maxRotation:0,autoSkip:true,maxTicksLimit:10,
            callback:function(v){const l=this.getLabelForValue(v);return l?l.slice(0,4):l;}}},
        y:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3,callback:fmtMoneyM},
          title:{display:true,text:'Worldwide gross box office, as filed',color:COL.ink3,font:{size:11}}}
      }
    }
  });
}

/* ---------- 14 · producer's decision ---------- */
function drawDecision(){
  /* commitment funnel — horizontal bars, narrowing */
  const funLabels=DEC_FUNNEL.map(d=>d.stage);
  const funData=DEC_FUNNEL.map(d=>d.n);
  const funColors=[COL.dmr, COL.certified, COL.beam];
  new Chart(document.getElementById('cDecFunnel'),{
    type:'bar',
    data:{
      labels:funLabels,
      datasets:[{data:funData,backgroundColor:funColors,borderWidth:0,barPercentage:0.72}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:'y',
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
          callbacks:{
            label:(c)=>' '+c.parsed.x.toLocaleString()+' films',
            afterLabel:(c)=>{const d=DEC_FUNNEL[c.dataIndex];return '  '+Math.round(100*d.n/1406)+'% of the slate \u00b7 '+d.note;}
          }
        }
      },
      scales:{
        x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3},
          title:{display:true,text:'Number of films',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2,font:{size:11}}}
      }
    }
  });

  /* budget gate — DMR vs camera-shot */
  new Chart(document.getElementById('cDecBudget'),{
    type:'bar',
    data:{
      labels:DEC_BUDGET.map(d=>d.grp),
      datasets:[{data:DEC_BUDGET.map(d=>d.med),backgroundColor:DEC_BUDGET.map(d=>d.grp.indexOf('Camera')>=0?COL.beam:COL.dmr),borderWidth:0,barPercentage:0.6}]
    },
    options:{
      responsive:true,maintainAspectRatio:false,indexAxis:'y',
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:COL.panel,borderColor:COL.grid,borderWidth:1,padding:10,
          callbacks:{label:(c)=>' $'+c.parsed.x+'M median budget'}
        }
      },
      scales:{
        x:{grid:gridCfg,border:{display:false},ticks:{color:COL.ink3,callback:fmtMoneyM},
          title:{display:true,text:'Median production budget',color:COL.ink3,font:{size:11}}},
        y:{grid:{display:false},border:{display:false},ticks:{color:COL.ink2,font:{size:11}}}
      }
    }
  });
}

/* init — deferred to after layout + fonts settle, so every chart's
   container has a real computed height when Chart.js measures it.
   Running synchronously here can give a chart a zero-height box and
   render it "empty"; waiting for load avoids that. */
function buildAll(){
  // Non-chart DOM content always renders (does not need Chart.js).
  try { renderPrimer(); renderGlossary(); renderExplainer(); }
  catch(e){ console.error('IMAX: content render failed', e); }

  // The world map is hand-built SVG, not Chart.js — render it regardless.
  try { drawMap(); } catch(e){ console.error('IMAX: map render failed', e); }



  // Everything below needs the Chart.js global. If the CDN failed to load,
  // skip the charts but leave the rest of the page fully usable.
  if (typeof Chart === 'undefined') {
    console.warn('IMAX: Chart.js not available — charts skipped, page still usable.');
    return;
  }
  // Each chart is drawn when its canvas nears the viewport, so lines and bars
  // animate in as you scroll rather than all firing on load. Charts already
  // on screen draw immediately. (draw1/2/3/5 also power the interactive
  // toggles; deferring only their *first* paint doesn't affect that.)
  var CHART_JOBS = [
    ['cImmersion', function(){ drawImmersion(); }],
    ['c1',         function(){ draw1('stack'); }],
    ['c2',         function(){ draw2(); }],
    ['c3',         function(){ draw3('log'); }],
    ['cStack',     function(){ drawDrivers(); }],
    ['cFranBar',   function(){ drawFranchise(); }],
    ['cSeason',    function(){ drawRhythm(); }],
    ['cNetFilms',  function(){ drawRelations(); }],
    ['c5',         function(){ draw5('share'); }],
    ['cEconRoi',   function(){ drawEcon(); }],
    ['cGeoH2H',    function(){ drawGeo(); }],
    ['cEff',       function(){ drawStructure(); }],
    ['cDecFunnel', function(){ drawDecision(); }],
    ['cFinGBO',    function(){ drawFinancials(); }]
  ];
  scheduleCharts(CHART_JOBS);
}

// Draw each chart when its trigger canvas approaches the viewport. Falls back to
// drawing everything immediately if IntersectionObserver is unavailable or a
// trigger element is missing. Safe to call repeatedly (theme/motion rebuilds):
// it disconnects any previous observer first.
var _chartObserver = null;
function runChartJob(job){
  try { job[1](); } catch(e){ console.error('IMAX: chart render failed ('+job[0]+')', e); }
}
function scheduleCharts(jobs){
  if (_chartObserver){ _chartObserver.disconnect(); _chartObserver = null; }
  var supported = ('IntersectionObserver' in window);
  var motionOn = document.documentElement.getAttribute('data-motion') === 'on';
  // When motion is off there's nothing to stagger — just draw everything now.
  if (!supported || !motionOn){
    jobs.forEach(runChartJob);
    return;
  }
  var jobByEl = new Map();
  var pending = [];
  jobs.forEach(function(job){
    var el = document.getElementById(job[0]);
    if (!el){ runChartJob(job); return; }   // no trigger → draw now
    jobByEl.set(el, job);
    pending.push(el);
  });
  _chartObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting){
        var job = jobByEl.get(e.target);
        if (job){ runChartJob(job); }
        _chartObserver.unobserve(e.target);
        jobByEl.delete(e.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
  pending.forEach(function(el){ _chartObserver.observe(el); });
}
function runInit(){
  // two RAFs guarantee layout has flushed before the first measure
  requestAnimationFrame(()=>requestAnimationFrame(buildAll));
}
if(document.readyState==='complete'){ runInit(); }
else { window.addEventListener('load', runInit); }

// Theme switching: re-read the CSS tokens for the now-active theme, update the
// Chart.js defaults, and rebuild every chart with the new colours. The toggle
// in nav.js calls this after flipping data-theme on <html>.
// Destroy every live Chart.js instance so a rebuild never collides with a
// canvas that's already in use. (Most charts here aren't stored in variables,
// so we ask Chart.js itself which canvases it owns.)
function destroyAllCharts(){
  if (typeof Chart === 'undefined') return;
  document.querySelectorAll('canvas').forEach(function(cv){
    var inst = Chart.getChart(cv);
    if (inst) inst.destroy();
  });
}

// Tracks whether a chart has finished its first (staggered) draw, so per-item
// delays only apply on initial render — never on hover/update.
var _chartDelayed = false;
function applyChartMotion(){
  if (typeof Chart === 'undefined') return;
  var reduce = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            || document.documentElement.getAttribute('data-motion') !== 'on';

  // Helper to write an animation config onto a chart-type's overrides.
  function setType(type, anim, animations){
    if (!Chart.overrides[type]) return;
    Chart.overrides[type].animation = anim;
    Chart.overrides[type].animations = animations || {};
  }

  if (reduce) {
    // No motion anywhere: instant draw for every type.
    Chart.defaults.animation = false;
    Chart.defaults.animations = {};
    ['bar','line','scatter','bubble','doughnut','pie'].forEach(function(t){
      if (Chart.overrides[t]){ Chart.overrides[t].animation = false; Chart.overrides[t].animations = {}; }
    });
    return;
  }

  _chartDelayed = false;

  // Shared first-draw guard + stagger function (used by bar & scatter).
  function staggerDelay(perItem, cap){
    return function(ctx){
      if (ctx.type === 'data' && ctx.mode === 'default' && !_chartDelayed){
        return Math.min(ctx.dataIndex * perItem + ctx.datasetIndex * 60, cap);
      }
      return 0;
    };
  }
  var markDone = function(){ _chartDelayed = true; };

  // A sensible default (covers any type we don't special-case).
  Chart.defaults.animation = { duration: 650, easing: 'easeOutQuart' };
  Chart.defaults.animations = {};

  // BAR — grow up from the baseline, one bar a beat after the previous.
  // (Matches the reference SVG: scaleY-style rise with a per-bar stagger.)
  setType('bar', {
    duration: 700, easing: 'easeOutQuart', onComplete: markDone,
    delay: staggerDelay(22, 520)
  }, {
    // animate the bar's extent from the baseline, not its position
    y: { from: function(ctx){ return ctx.chart.scales.y ? ctx.chart.scales.y.getPixelForValue(0) : undefined; } }
  });

  // LINE — draw left-to-right: the whole line sweeps in rather than each point
  // popping. We animate x across the plot and grow y from the bottom together,
  // with NO per-point delay (a sweep, not a stagger).
  setType('line', {
    duration: 1000, easing: 'easeOutQuart', onComplete: markDone
  }, {
    // The line draws in real-time, left to right: each point's x eases into
    // place a beat after the previous one, so you watch the line extend across
    // the plot and connect as it goes.
    x: {
      type: 'number', easing: 'easeOutCubic', duration: 300,
      from: function(ctx){
        // start each point at the previous point's x (or the left edge for the
        // first), so segments unfurl one after another instead of all at once
        if (ctx.type === 'data' && ctx.chart.scales.x){
          if (ctx.dataIndex === 0) return ctx.chart.scales.x.left;
          var prev = ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.dataIndex - 1];
          return prev ? prev.x : ctx.chart.scales.x.left;
        }
        return undefined;
      },
      delay: function(ctx){
        if (ctx.type === 'data' && ctx.mode === 'default' && !_chartDelayed){
          return ctx.dataIndex * 26;   // stronger per-point stagger = visible draw
        }
        return 0;
      }
    },
    // points rise from their predecessor's height so the line "connects" smoothly
    y: {
      type: 'number', easing: 'easeOutCubic', duration: 300,
      from: function(ctx){
        if (ctx.type === 'data' && ctx.chart.scales.y){
          if (ctx.dataIndex === 0) return ctx.chart.scales.y.getPixelForValue(ctx.chart.scales.y.min);
          var prev = ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.dataIndex - 1];
          return prev ? prev.y : undefined;
        }
        return undefined;
      },
      delay: function(ctx){
        if (ctx.type === 'data' && ctx.mode === 'default' && !_chartDelayed){
          return ctx.dataIndex * 26;
        }
        return 0;
      }
    }
  });

  // SCATTER — points fade + pop in (radius grows from 0), lightly staggered.
  setType('scatter', {
    duration: 500, easing: 'easeOutBack', onComplete: markDone,
    // stronger, uncapped-ish stagger so points visibly pop in one after another
    delay: staggerDelay(10, 900)
  }, {
    radius: { from: 0, duration: 450, easing: 'easeOutBack' }
  });

  // DOUGHNUT — sweep radially (rotate + scale), the idiomatic pie/doughnut reveal.
  if (Chart.overrides.doughnut){
    Chart.overrides.doughnut.animation = {
      duration: 800, easing: 'easeOutQuart',
      animateRotate: true, animateScale: true, onComplete: markDone
    };
    Chart.overrides.doughnut.animations = {};
  }
}

window.__imaxRefreshCharts = function(){
  try {
    refreshCOL();
    if (typeof Chart !== 'undefined') {
      Chart.defaults.color = COL.ink2;
      applyTooltipDefaults();
    }
    applyChartMotion();
    gridCfg.color = COL.grid;
    xTime.ticks.color = COL.ink3;
    destroyAllCharts();
    requestAnimationFrame(()=>requestAnimationFrame(buildAll));
  } catch(e){ console.error('IMAX: theme refresh failed', e); }
};

// Called by settings.js when the user toggles the motion setting: re-applies
// the animation defaults and redraws so charts start/stop animating to match.
window.__imaxRefreshMotion = function(){
  try { applyChartMotion(); destroyAllCharts();
    requestAnimationFrame(()=>requestAnimationFrame(buildAll)); }
  catch(e){ console.error('IMAX: motion refresh failed', e); }
};

// ---------------------------------------------------------------
// Multi-monitor / DPI invariance.
// Chart.js sizes its canvases responsively, but it does NOT re-rasterize when
// the *device pixel ratio* changes — which is exactly what happens when a
// window is dragged from a Retina/HiDPI screen to a standard one (or the OS
// zoom changes). Without this, charts look blurry or over-sharp until the next
// manual resize. We watch for DPR changes and resize every live chart so it
// re-renders crisply at the new ratio. Charts are NOT rebuilt (no re-animation)
// — resize() re-rasterizes in place.
// ---------------------------------------------------------------
(function watchPixelRatio(){
  if (typeof window.matchMedia !== 'function') return;
  var mql = null;
  function resizeAllCharts(){
    if (typeof Chart === 'undefined') return;
    document.querySelectorAll('canvas').forEach(function(cv){
      var inst = Chart.getChart(cv);
      if (inst){ try { inst.resize(); } catch(e){} }
    });
  }
  function listen(){
    var dpr = window.devicePixelRatio || 1;
    // a media query that is true only at the CURRENT ratio; it flips the moment
    // the ratio changes, which is our signal to re-register and redraw.
    mql = window.matchMedia('(resolution: ' + dpr + 'dppx)');
    var onChange = function(){
      resizeAllCharts();
      // re-arm for the new ratio
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else if (mql.removeListener) mql.removeListener(onChange);
      listen();
    };
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else if (mql.addListener) mql.addListener(onChange);   // older Safari
  }
  listen();
  // Belt-and-braces: also redraw on window resize (covers browsers that don't
  // fire the resolution query, and window moves that change size). Debounced.
  var t;
  window.addEventListener('resize', function(){
    clearTimeout(t);
    t = setTimeout(resizeAllCharts, 180);
  }, { passive: true });
})();
})();
