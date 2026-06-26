# bedrock-whatsapp-bot
A simple Node.js program to bridge WhatsApp and Minecraft Bedrock server chat.

## Installation
You must have [Node.js](https://nodejs.org/en/download) installed

``` shell
# Clone the repository
git clone https://github.com/Kanuiet/bedrock-whatsapp-bot/
```
or you can just download [this](https://github.com/Kanuiet/bedrock-whatsapp-bot/archive/refs/heads/main.zip)
```
cd bedrock-whatsapp-bot

# Install dependencies
npm install

# Start the bot
node .
```

After starting, you can follow the setup wizard. A QR code also appear for connecting WhatsApp.

After the bot starts successfully, send `/forward` in a group chat to forward Minecraft chat to the WhatsApp group chat.

## Important
You need to grant the bot Operator status so the bot is able to broadcast the WhatsApp message (for `/say` command)

## List of WhatsApp Commands
```
/about - shows information about the bot
/help <page> - provides list of commands
/op <phoneNumber> - grants operator status to a whatsapp user
/deop <phoneNumber> - revokes operator status from a whatsapp user
/forward - forward minecraft chat messages to this group chat
/unforward - stop forwarding minecraft chat messages to this group chat
/status <ip> <port> - shows the current status for any minecraft bedrock server
/list - shows the names of all currently-connected players in the minecraft server
/say - send your message to the minecraft server
```
