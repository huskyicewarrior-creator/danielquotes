// Daniel's Quotes API — Vercel Serverless Function
// Uses ioredis to connect to Redis via REDIS_URL environment variable.

const Redis = require("ioredis");

const QUOTES_KEY = "daniel:quotes";

function getClient() {
  if (!process.env.REDIS_URL) throw new Error("REDIS_URL not set");
  return new Redis(process.env.REDIS_URL, { tls: { rejectUnauthorized: false } });
}

async function getQuotes() {
  const client = getClient();
  try {
    const raw = await client.get(QUOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } finally {
    client.disconnect();
  }
}

async function saveQuotes(quotes) {
  const client = getClient();
  try {
    await client.set(QUOTES_KEY, JSON.stringify(quotes));
  } finally {
    client.disconnect();
  }
}

// Daniel's real quotes — seeded on first deploy
const SEED_QUOTES = [
  "Sometimes you might not enjoy some activity, or hangout, or even an entire day, but what you need to realize is that there can't be good days without bad, so just let the bad days be bad days, and move on.",
  "Comparison is the thief of joy.",
  "More challenge means more failure means more improvement means more fulfilling successes.",
  "An easy life is a happy life is a stable life is a well off life is a hardworking life is a difficult life.",
  "While there are many good people in the world it is usually the bad people that express their voice.",
  "Don't wait for others to congratulate you, be your own supporter.",
  "To experience happiness you must first experience sadness.",
  "Don't think about the future, prepare for it.",
  "Sadness and anger are just a state of mind.",
  "A man who is too afraid to fall will never touch the sky.",
  "The quality of a day does not depend on the events but instead on your outlook toward it.",
  "Joy comes in the multitude of small things not in the magnitude of large things.",
  "The mind is very powerful, it believes what you tell it to believe, so use it for good and believe in good.",
  "A ruined morning does not mean a ruined day.",
  "You can't hate yourself because in the end you are the only person you can count on.",
  "You will always regret missed opportunities.",
  "Worry controls everything yet defines nothing.",
  "If you want to live a life without stress be prepared to go through a lot of stress to get there.",
  "Life should not be measured by time but by experience, adventure, and love.",
  "The only time you should accept defeat is after you have been defeated.",
  "If it isn't ok to be mean to others why are we mean to ourselves.",
  "Jealousy is the root cause of all bad human emotions, remove it from your life and live eternally happy.",
  "Pain builds character.",
  "Laughter is the epitome of joy.",
  "Don't let life restrict you, find a way for it to open up new paths instead.",
  "Pleasure and happiness are two different things, pleasure comes from material things while happiness comes from experience.",
  "As the sorrow of grief begins to unsheath, a joyful life becomes a languid sleep.",
  "Love your profession and you will never work a day in your life.",
  "Sometimes you don't have to take what life throws at you, instead try catching it.",
  "Strength isn't found but slowly built with weakness upon weakness.",
  "The world's beauty is not because of the black and white, but instead in the multitude of grays.",
  "Don't suppress fear, that only leads to worry, instead, confront it and find it will disappear.",
  "Don't resist life's chaos, live around it.",
  "While at your lowest point you may feel like you don't have purpose, you need to remember those who love you and you will find purpose in them.",
  "You are a pawn in life's game of chess, always fighting and climbing to reach your full potential, and once you have made it through you can see yourself powerful, capable, and dominating. Reach that part of yourself that will never be easy to obtain. Be the pawn that climbs to the top.",
  "The pawn that climbs the board can never do it alone.",
  "Some days it seems like everyone and everything is against you, so why does it help for you to join in.",
  "Don't change yourself to fit into your life, change your life to fit you.",
  "People say expect low of yourself and you will always achieve higher, I say expect highly of yourself and meet those expectations to achieve the highest.",
  "Don't let the high adrenaline exciting moments pass you by, experience them to the fullest whether others want to join or not.",
  "Life is going to change, so don't resist changing with it.",
  "A wish is a miracle that you ask to happen, a dream is a goal that you reach for. Don't make wishes, have dreams instead.",
  "A goal with no plan is just a dream.",
  "If you can do something for others but not yourself, then can you really do it.",
  "Don't judge yourself based on your worst days, but instead on everything else.",
  "Belief makes the impossible possible.",
  "Don't let the need for money take away emotion and pleasure from your life.",
  "You don't have to overachieve, just overprepare.",
  "Tired leads to bad quote. (This is a genuine quote)",
  "Define your life by controlling your emotions.",
  "If you find yourself going one step forward and two steps back, stop walking, find your balance, and keep going.",
  "A hard day's work is never appreciated on the day of but instead in the days to come.",
  "Practice doesn't make perfect, it makes progress.",
  "You can't expect yourself to enter an ideal state of mind, you need to put yourself there.",
  "Actions always carry more weight than words.",
  "To do things out of spite is to have no self respect.",
  "Productivity does not come from hours of work, but instead from spread out sessions with breaks.",
  "Pure hard work will always overpower skill and luck if you try hard enough.",
  "A day is composed of hours, minutes, and seconds the same way your mental state is composed of your mood, attitude, and most of all your outlook on current events.",
  "A win needs a struggle to feel fulfilling.",
  "You can't control others so stop trying to.",
  "The only thing you can control in your own life is the effort you put in to lead a good one.",
  "Anger is a fuel for your actions, it is your choice what you do with that fuel.",
  "Everything has a good and bad aspect to it, it is your choice which one you look at.",
  "A door, like an obstacle in your path, always has a handle.",
  "Never let the people around you define your emotions and your life.",
  "Don't think about what it could be and what you could've done with that, think about what it is and what you can do with that.",
  "Find a joy for you that brings joy to all others.",
  "I should've → I can.",
  "Everybody is going to get a chance to do something great, the hard part isn't how you take that opportunity, it's recognizing it for what it is.",
  "It isn't the number of exercises that you can do, it's the exercises you can do after your muscles start to burn that provide growth.",
  "Live your day with the people you love most and you will never have anything to complain about.",
  "Use forgiveness to move on from conflict.",
  "Your worth isn't what others see in you, it's what you see in yourself.",
  "You can't live a full life without embracing your full self.",
  "It's easier to prevent the embers than it is to smother the flames.",
  "Some people reach their goals and settle, others reach their goals and use that as motivation to reach more.",
  "You have problems, the hard part isn't finding them, it's acknowledging them and fixing them. That's what people can't do.",
  "Don't dig yourself a grave because you tripped and fell.",
  "Sometimes, all it takes to throw yourself into the dark is a mere flip of a switch.",
  "Imperfection adds flavor to life.",
  "Normal is a myth.",
  "A hardworking man has no worries.",
  "The hours of the day aren't appreciated until they have come to an end.",
  "A stream of water will go down the path of least resistance, not try to carve a path where there isn't one.",
  "The farther you climb the farther you can fall, but if you reach the top, the distance you climb will determine the beauty of the view.",
  "If you go into a day waiting for its end, don't expect to get anything done.",
  "Life will be life, you can be annoyed and angry, but at least realize that you can't do anything about life if it's doing what it's doing.",
  "Imagining yourself as a better person does nothing, hoping you become that person without commitment is pointless. So before you make that resolution, ask yourself how much you are willing to commit.",
  "Emotions only consume you because you don't fight back.",
  "For a person to improve in anything the desire to get better must outweigh the desire to do nothing and rest.",
  "A rest well deserved is a sign of struggle and hard work.",
  "For someone to be a friend they don't have to understand you, they just have to try.",
  "Your parents get you through elementary school by dropping you off, your teachers get you through middle and high school by forcing you to learn, but only you can finish that journey through dedication and discipline.",
  "Peer pressure doesn't crack you, it bends you.",
  "In an hour, the floor could collapse, you could take a test, you could fall asleep in a class, you could sit around and do nothing, or the world could stop spinning. What happens in the hour shouldn't be your focus, it should be what you can do in that hour.",
  "While befriending someone you dislike may seem useless, it may have some unseen benefits.",
  "Sometimes you will look back and be surprised at how far you've come. Just make sure that when you look forward you still see something to reach for.",
  "When people piss you off, you either have to figure out what's happening, or give up on them.",
  "Before you take an insult to heart, consider where it's coming from.",
  "The mental strength of anyone is tested when they push themselves to a point where their mind and body beg to stop, and they either quit or keep going.",
  "If you aren't tired at the end of a day, then you have done something wrong.",
  "Your skill is like water, the slightest pebble can ruin the stability, fluctuating and disrupting it. Just know that the water will eventually settle and your skill will settle.",
  "You waste an hour of a day and seem to forget there are 24 more for you to fill tomorrow.",
  "Live your life and don't mess with others'.",
  "What use is four people hammering at the same nail.",
  "Don't tell yourself a loss is a learning experience, because that does nothing and helps with nothing. Instead figure out why you lost, what you could've done to prevent it, and how you can do that in the future.",
  "Make friends that complement your personality.",
  "If you can make your inner voice louder than the voice of pain and discomfort, you can achieve anything.",
  "Don't spend your childhood stressing over grades and worrying about colleges, just enjoy it and living de-stressed will help you succeed.",
  "Life may not be fun or happy, but that doesn't mean that you can't do anything about it.",
  "Doing things to get credit is the mindset of a player, doing things to get better is the mindset of a winner.",
  "Who you think you are might matter, but what matters more is how you act to become the kind of person you think you are.",
  "Don't compare yourself to others, compare yourself to the best version of yourself.",
  "If I feed you today, tomorrow you will just open your mouth. But if I give you a fishing rod and teach you how to fish, you will never bother me again.",
  "Congratulate, don't glaze.",
  "The worst part about life is that nothing is guaranteed unless it's already happened.",
  "One of the greatest joys in life is the ability to turn back and appreciate the hard work that you did to get to where you are.",
  "Sometimes an easy path is a greater detriment to progress than a tiring one.",
  "You will never give up doing something that you think has purpose, no matter how difficult it might be.",
  "Never burn yourself out, you can push yourself but please take breaks.",
  "Sleep, it's good for you.",
  "A man is not great because he achieves great things, but because he surpasses great obstacles.",
  "Know when you need to lock in a day before you actually lock in to prepare yourself.",
  "Don't just live in the moment, also live for the future.",
  "Every once in a while make sure you enjoy your life.",
  "Why ever take advice or criticism from an enemy.",
  "Every child needs therapy, just not from a therapist.",
  "When you pick up a pencil, know that pencil could write a poem for the ages, it could draw a blueprint for an extravagant mansion, it could sketch a masterpiece with just lines and curves, or it could be broken in half, and tossed in the trash. You are a pencil, make sure you never break.",
  "Respect others if you want to be taken seriously.",
  "It's never too early to think about what you want to do with your life, just know you don't have to think too far ahead.",
  "A hero lives his life with the purpose to make others' better.",
  "Stop looking for things to worry about.",
  "Everyone's opportunity for greatness will come, the question is how long you will wait for it and how quickly you recognize it.",
  "Motivation drives — but what drives motivation? You and only you.",
  "A man of great security can find purpose in improving his life rather than trying to manipulate others'.",
  "Learn how to love and you will never have to hate.",
  "Your life is an empty library that you fill with books, just make sure they are the right ones.",
  "There is no reason to maintain a leisurely activity when you no longer enjoy attending to it.",
  "Your goal in anything you do is to walk out knowing you could never do better than what you just did.",
  "The only things that you can never return are those that are not yours to give, so don't try to take it away from others.",
  "No one will hear the soft murmurs if they are in a crowd of screams.",
  "No egg can become a cookie without flour and sugar.",
  "No man who can stand tall in the face of a challenge will fail to make himself successful.",
  "Learn to live with the sun in your eyes so you can take advantage when there is finally shade.",
  "Remind yourself of your worth so you don't lose value in your eyes.",
  "Bravery isn't a gene, you just need to find someone to be brave for.",
  "Life isn't unfair by nature, but because of the people who refuse to try and make it fair.",
  "In moments of stress and sadness, you will find that friends are the only remedy.",
  "Consistent practice makes consistent success.",
  "The only way to reach your successful tomorrow is to stop thinking about it and think about your successful today.",
  "Learning how to learn might be the best life skill out there.",
  "What's the point of letting your anger out if it's still going to carry over after.",
  "Beginning a journey toward something with a friend is a great motivation, but the best way to make that journey is beside each other.",
  "Focus on your strengths to dwindle insecurity, focus on your weaknesses to get rid of it.",
  "Anger over something means you care, the bigger issue isn't the anger over what you care about, it's the anger directed at yourself.",
  "Improvement isn't a highway, it's a hike up a mountain, the path isn't always straight.",
  "The life of a human is a miserable slot machine.",
  "Sometimes the most understanding thing you can do for a friend is to stop trying to understand.",
  "If you are ever to lose to someone make sure you lose only because they are amazing at what they do and not because you are horrible at what you do.",
  "A person's determination is not measured in what they have accomplished but in what they still strive to accomplish.",
  "Thinking is what causes the roadblock as well as what takes it down.",
  "The utmost desires of a man are to prove his self worth for it to be acknowledged by his peers.",
  "A wish becomes a wish when you stop believing it as a possibility.",
  "If you could control the weather, it would be sunny and happy every day, so why is it that while you may be able to control your emotions, you choose a downpouring thunderstorm over a warm summer breeze.",
  "The ability to realize one's mistakes and try to fix them isn't what makes them perfect, it's the willingness to put in the work and the hours to fix the mistake.",
  "No one wants to live a life they forget, so start doing things you will forever remember.",
  "A slice of humble pie will open up a lot of room to grow, so don't be afraid to take it.",
  "There is a reason to your mistakes, be curious rather than ignorant.",
  "When you think of improvement you might think of doing better in school, being the best at a sport, or being in shape. But what a lot of people don't focus on is becoming a kinder human being, which might be the most important improvement of all.",
  "Comparing yourself to those better will bring you down, comparing yourself to those worse will keep you the same, so compare yourself to you yesterday and find yourself a better man tomorrow.",
  "Don't be mad at yourself, because if you know you can do better and you have the motivation to do better then you will do better.",
  "Stupid habits lead to stupid lifestyles.",
  "Seeing a problem as something to be avoided deprives yourself of the opportunity to improve, so don't avoid your weaknesses but build on them.",
  "Embrace the indefinite of the upcoming and the element of the up and coming, not by worrying about what is becoming but by preparing for what could be coming.",
  "The only way to know how far you can go is to keep going until you can go no further.",
  "Live a life without regret.",
  "The difference between the people behind you and the people in front of you is that the people in front don't know what's coming.",
  "I believe in making myself the man I want to be, not hoping that it happens without me willing it to.",
  "Look back at where you came from, look forward to where you want to be, and then stop and notice the present, the only thing you can guarantee.",
  "A lonely man will find himself stranded, but an outgoing guy will find the joys of his days expanded.",
  "The best thing about meeting someone new is you have a fresh start on who you are, so present yourself intentionally.",
  "Love is so powerful because it finds a way to package rage, despair, and elation all into one feeling.",
  "While opposites may attract and birds of a feather flock together, making a friend does not take a similarity or difference in pastime, sport, or academics, but plainly just similar values in each of their lives.",
  "When we live in such a giant world, it makes our lives seem insignificant, so I'm glad I can call you my friend to bring more meaning to the tiny grain of sand that is my life in the ocean of space.",
  "Be a positivity deity.",
  "The decisions that make your tomorrow are not the decisions that come from yesterday but the choices you choose to make today.",
  "Your ability to perform a task does not matter as much as the belief that you are able to.",
  "Live life consciously, happily, and peacefully.",
  "The difficult journey is only appreciated once it ends, and then yearned for only when the beauty is seen in the struggle."
].map((text, i) => ({
  id: i + 1,
  text,
  date: new Date(Date.now() - (200 - i) * 86400000).toISOString(),
  night: `Night ${i + 1}`
}));

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  const url = req.url.replace(/^\/api/, "");

  // GET /quotes
  if (req.method === "GET" && (url === "/quotes" || url === "/quotes/")) {
    try {
      let quotes = await getQuotes();
      if (quotes.length === 0) {
        quotes = SEED_QUOTES;
        await saveQuotes(quotes);
      }
      return res.status(200).json({
        current: quotes[quotes.length - 1],
        previous: [...quotes].slice(0, -1).reverse(),
        total: quotes.length
      });
    } catch (err) {
      return res.status(500).json({ error: "Storage unavailable.", detail: err.message });
    }
  }

  // POST /quotes
  if (req.method === "POST" && (url === "/quotes" || url === "/quotes/")) {
    let body = "";
    req.on("data", chunk => { body += chunk; });
    return new Promise(resolve => {
      req.on("end", async () => {
        try {
          const { text, night } = JSON.parse(body);
          if (!text || typeof text !== "string" || text.trim() === "") {
            res.status(400).json({ error: "Quote text is required." });
            return resolve();
          }
          const quotes = await getQuotes();
          const nextId = quotes.length > 0 ? Math.max(...quotes.map(q => q.id)) + 1 : 1;
          const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
          const newQuote = {
            id: nextId,
            text: text.trim(),
            date: new Date().toISOString(),
            night: night || days[new Date().getDay()] + " Night"
          };
          quotes.push(newQuote);
          await saveQuotes(quotes);
          res.status(201).json(newQuote);
          resolve();
        } catch (err) {
          res.status(400).json({ error: "Invalid request.", detail: err.message });
          resolve();
        }
      });
    });
  }

  return res.status(404).json({ error: "Not found." });
};
