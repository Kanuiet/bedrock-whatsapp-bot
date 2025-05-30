# bedrock-whatsapp-bot

A simple self-host Node.js program that connect your Minecraft bedrock server to a WhatsApp group chat using the [Baileys](https://github.com/WhiskeySockets/Baileys) and [bedrock-protocol](https://github.com/PrismarineJS/bedrock-protocol) libraries.

You need to turn off online-mode to allow your bot join the server.

## Features
- Send message through WhatsApp group to Minecraft (/send)
- Forward your Minecraft server chat and events (such as joined, left, and death) to WhatsApp (/forward)
- Ping a Minecraft bedrock server (/status)
- Show list of online players in your Minecraft Server (/list)

## Installation

``` shell
# Clone the repository
git clone https://github.com/Kanuiet/bedrock-whatsapp-bot/
cd bedrock-whatsapp-bot

# Install dependency
npm install

# Start the bot
node .
```

## Lists WhatsApp Commands

```
/about - shows information about the bot
/help <page> - provides list of commands
/op <phoneNumber> - grants operator status to a whatsapp user
/deop <phoneNumber> - revokes operator status from a whatsapp user
/forward - forward minecraft chat messages to this group chat
/unforward - stop forwarding minecraft chat messages to this group chat
/status <ip> <port> - shows the current status for any minecraft bedrock server
/list - shows the names of all currently-connected players in the minecraft server
/send <message> - send your message to the minecraft server
```

## Config

Example `config.json`:

``` json
{
  "bedrockServer": { // The Minecraft bedrock server that bot connected to.
      "ip": "example.com",
      "port": 19132
  },
  "botName": "@", // The name of the bot.
  "operators": [ // Allow the user use commands '/forward' and '/unforward'
    {
      "groupJid": "xxxx@g.us",
      "userJid": "xxxx@s.whatsapp.net"
    },
    {
      "groupJid": "xxxx@g.us",
      "userJid": "xxxx@s.whatsapp.net"
    }
  ],
  "groupIds": [ // Forward the minecraft server chat to these WhatsApp group
    "xxxx@g.us"
  ]
}
```
