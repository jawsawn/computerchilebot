const express = require("express");
const app = express();
const port = 3000;
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(port, () => {
  console.log(`project is ready`);
});

const { Client, Intents, MessageEmbed } = require("discord.js");
const fs = require("fs");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.MESSAGE_CONTENT,
  ],
});

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase().includes("help")) {
    message.react("😭");
  }
});
//ournple
client.on("messageCreate", (message) => {
  if (message.author.id === "1222738488701747360") {
    message.react("🍅");
  }
});
//jawsawn
/*client.on("messageCreate", (message) => {
  if (message.author.id === "139017711911960576") {
    ["🇵", "🇪", "🇷", "🇮", "🇴", "🇩"].forEach((character) => {
      message.react(character);
    });
  }
});
*/

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

    for (let i = 0; i < 10; i++) {
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
    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Leaderboard")
      .setDescription(tableRows.join("\n"));

    message.channel.send({ embeds: [embed] });
  }

  //
});

//starboard
//const starredMessages = new Map();
const starboardChannelId = "1236017044336410725";
const starThreshhold = 1;

client.on("messageReactionAdd", (reaction, user) => {
  console.log("first check");
  //if (reaction.emoji.name === "❤") {
  console.log("second check");
  //}
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

        const embed = new MessageEmbed()
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
