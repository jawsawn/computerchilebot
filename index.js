// const express = require("express");
// const app = express();
// const port = 3000;
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
// app.listen(port, () => {
//   console.log(`project is ready`);
// });

const fs = require("fs");
//DISCORDJS ----
const { Client, Events, EmbedBuilder, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
})

// const { Client, Intents, EmbedBuilder } = require("discord.js");

// const client = new Client({
//   intents: [
//     Intents.FLAGS.GUILDS,
//     Intents.FLAGS.GUILD_MESSAGES,
//     Intents.FLAGS.MESSAGE_CONTENT,
//     Intents.FLAGS.GUILD_MESSAGE_REACTIONS
//   ],
// });

client.once("ready", () => {
  console.log("Bot is ready!");
});

//REACTIONS ----------------------
client.on("messageCreate", (message) => {
  if (message.content.toLowerCase().includes("help")) {
    message.react("😭");
  }
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase().includes("chile")) {
    message.react("💅");
  }
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase().includes("squirt")) {
    message.react("💦");
  }
});

//ournple
client.on("messageCreate", (message) => {
  if (message.author.id === "1222738488701747360") {
    if (Math.random * 2 % 2 === 1)
      message.react("🍅");
  }
});
//purr
client.on("messageCreate", (message) => {
  if (message.content.toLowerCase().includes("purr") || message.content.toLowerCase().includes("period")) {
    ["🇵", "🇪", "🇷", "🇮", "🇴", "🇩"].forEach((character) => {
      message.react(character);
    });
  }
});
//REACTIONS ----------------------

//moneydb
let userData = {};
try {
  userData = JSON.parse(fs.readFileSync("userdata.json"));
} catch (err) {
  console.error("Error loading user data:", err);
}

//!commands
const prefix = "!";
client.on("messageCreate", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const user = message.mentions.users.first();
    if (!user)
      return message.channel.send("You need to mention a user to ping!");

    for (let i = 0; i < 5; i++) {
      message.channel.send(`<@${user.id}>`);
    }
  }
  //sheninigans
  if (command === "sex") {
    message.channel.send("yeah!");
  }

  if (command === "madonnasfossil") {
    message.channel.send("ended purrchile 😂😜😹");
  }
  //money
  if (
    command === "money" ||
    command === "work" ||
    command === "wjork" ||
    command === "twerk" ||
    command === "daily"
  ) {
    const userId = message.author.id;
    if (!userData[userId]) userData[userId] = { money: 0, lastDaily: 0 };

    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const lastDaily = userData[userId].lastDaily || 0;

    if (now - lastDaily < oneDay) {
      message.reply("You have already claimed your daily money. Please wait.");
      return;
    }

    userData[userId].money += 100; // Give 100 money as daily reward
    userData[userId].lastDaily = now;
    fs.writeFileSync("userdata.json", JSON.stringify(userData, null, 2));
    message.reply("You have claimed your daily 100 money!");
  }
  //bal
  if (command === "balance" || command === "bal") {
    const userId = message.author.id;
    if (!userData[userId]) userData[userId] = { money: 0, lastDaily: 0 };

    const money = userData[userId].money;
    message.reply(`You have ${money} money.`);
  }
  //leaderboard
  if (command === "lb") {
    const sortedUserData = Object.entries(userData).sort(
      (a, b) => b[1].money - a[1].money,
    ); // Sort users by money

    // Create a table with user data
    const tableRows = sortedUserData.map(([userId, data], index) => {
      const user = client.users.cache.get(userId);
      const username = user ? user.tag : "Unknown User";
      return `${index + 1}. ${username}: ${data.money} krona`;
    });

    // Create an embed with the leaderboard table
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("Leaderboard")
      .setDescription(tableRows.join("\n"));

    message.channel.send({ embeds: [embed] });
  }

  //lb hole
  if (command === "lbhole") {
    const sortedUserData = Object.entries(userData).sort(
      (a, b) => b[1].hole - a[1].hole,
    ); // Sort users by money

    // Create a table with user data
    const tableRows = sortedUserData.map(([userId, data], index) => {
      const user = client.users.cache.get(userId);
      const username = user ? user.tag : "Unknown User";
      return `${index + 1}. ${username}: ${data.hole} inches`;
    });

    // Create an embed with the leaderboard table
    const embed = new EmbedBuilder()
      .setColor("#ffb3c3")
      .setTitle("Hole Leaderboard")
      .setDescription(tableRows.join("\n"));

    message.channel.send({ embeds: [embed] });
  }


});

//prostitute
client.on("messageCreate", (message) => {
  const userId = message.author.id;
  if (!userData[userId]) userData[userId] = { money: 0, lastDaily: 0, hole: 0 };
  fs.writeFileSync("userdata.json", JSON.stringify(userData, null, 2));
  if (message.content === "!prostitute") {
    if (userData[userId].hole >= 5) {
      message.reply(`You are too loose... I'm so sorry dear but you are up for elimination`);
      return;
    }
    userData[userId].money += 5; // Give 100 money as daily reward
    userData[userId].hole += 1; // Give 100 money as daily reward
    message.reply(`You have profaned thyself, your hole diameter is now ${userData[userId].hole} inches!`);
  }
});

// //poetry
// client.on("messageCreate", async (message) => {
//   const command = "!blake"
//   if (message.content.startsWith(command)) {
//     const query = message.content.slice(command.length + 1);
//     const response = await fetch(`https://poetrydb.org/author,title/William%20Blake;${query}`);
//     const poems = await response.json();
//     const poem = poems[0]; // Assuming you want the first poem in the response

//     if (poem) {
//       const poemText = poem.lines.join("\n");

//       const embed = new EmbedBuilder()
//         .setColor("#ffb3c3")
//         .setTitle(poem.title)
//         .setDescription(poemText);

//       message.channel.send({ embeds: [embed] });
//     } else {
//       message.channel.send("Poem not found");
//     }
//   }
// });

//poetry
client.on("messageCreate", async (message) => {
  const command = "!poem";
  if (message.content.startsWith(command)) {
    const query_raw = message.content.slice(command.length + 1);
    if (query_raw) {
      const query = query_raw.split("-");

      if (query.length >= 2) { // Check if query has at least 2 parts
        const response = await fetch(`https://poetrydb.org/author,title/${query[0].trim()};${query[1].trim()}`);
        const poems = await response.json();
        const poem = poems[0]; // Assuming you want the first poem in the response

        if (poem) {
          const poemText = poem.lines.join("\n");

          const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle(poem.title)
            .setDescription(poemText.length >= 4095 ? poemText.slice(0, 4092) + "..." : poemText)
            .setFooter({ text: poem.author });

          message.channel.send({ embeds: [embed] });
        } else {
          message.channel.send("Poem not found");
        }
      } else {
        message.channel.send(`Please provide both author and poem title separated by a "-"`);
      }
    } else {
      message.channel.send(`Search up poems with "!poem author - poem"`);
    }
  }
});

/* //freakypoem
client.on("messageCreate", async (message) => {
  
  const command = "!freakypoem"
  if (message.content.startsWith(command)) {
    const query_raw = message.content.slice(command.length + 1);
    const query = query_raw.split("-")
    const response = await fetch(`https://poetrydb.org/author,title/${query[0].trim()};${query[1].trim()}`);
    const poems = await response.json();
    const poem = poems[0]; // Assuming you want the first poem in the response

    if (poem) {
      const poemText = poem.lines.join("😜💋💦\n");

      const embed = new EmbedBuilder()
        .setColor("#ffb3c3")
        .setTitle("Freaky " + poem.title)
        .setDescription(poemText);

      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send("Poem not found");
    }

  } else {
    message.channel.send(`Search up poems with "!poem author - poem `);
  }
}); */

//starboard
//const starredMessages = new Map();
const starboardChannelId = "1236017044336410725";
const starThreshhold = 1;

// client.on("messageReactionAdd", (reaction, user) => {
//   console.log("first check");
//   if (reaction.emoji.name === "❤") {
//   console.log("second check");
//   }
// });

//STARBOARD ---------

client.on('messageReactionAdd', (reaction, user) => {
  console.log('Reaction added:', reaction.emoji.name);
  if (reaction.emoji.name === '⭐️') {
    console.log(`${user.username} reacted with a star to: ${reaction.message.content}`);
  }
});

/*client.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return; // Ignore reactions from bots

  const message = reaction.message;

  // Ignore reactions on messages not in the starboard channel
  if (message.channel.id !== starboardChannelId) {
    const starCount = reaction.count;

    if (starCount >= starThreshhold) {
      // Change this threshold as needed
      if (!starredMessages.has(message.id)) {
        const starboardChannel =
          await client.channels.fetch(starboardChannelId);

        const embed = new EmbedBuilder()
          .setColor("#ffd700") // Gold color
          .setTitle("Starred Message")
          .setDescription(message.content)
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setTimestamp(message.createdAt);

        if (message.attachments.size > 0) {
          const attachment = message.attachments.first();
          embed.setImage(attachment.url);
        }

        const starboardMessage = await starboardChannel.send({
          embeds: [embed],
        });
        starredMessages.set(message.id, starboardMessage.id);
      }
    }
  }
  */

//money

client.login(process.env.token);
