const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost', // minecraft server ip
  username: 'email@example.com', // minecraft username
  auth: 'offine' // for offline mode servers, you can set this to 'offline'
  // port: 25565,                // only set if you need a port that isn't 25565
  // version: false,             // only set if you need a specific version or snapshot (ie: "1.8.9" or "1.16.5"), otherwise it's set automatically
  // password: '12345678'        // set if you want to use password-based auth (may be unreliable)
})


const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
bot.once('spawn', () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: true }) // port is the minecraft server port, if first person is false, you get a bird's-eye view
  bot.autoEat.options.priority = 'saturation'
  bot.autoEat.options.startAt = 16
})

const autoeat = require('mineflayer-auto-eat').plugin


bot.on('chat', (username, message) => {
  if (username === bot.username) return
  bot.chat(message)
})

bot.loadPlugin(require('mineflayer-dashboard')({
  chatPattern: /^» \w+? » /
}))

bot.once('inject_allowed', () => {
  global.console.log = bot.dashboard.log
  global.console.error = bot.dashboard.log
})

bot.loadPlugin(require('mineflayer-dashboard'))

// Log errors and kick reasons:
bot.on('kicked', console.log)
bot.on('error', console.log)