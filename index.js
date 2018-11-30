const Discord = require('discord.js');
const client = new Discord.Client();

const manager = require('./lib/manager');
const led = require('./lib/led');
const config = require('./config');

var Leds = new led.Manager(config); Leds.load();
var Manager = new manager.Manager(config);
Manager.use(client);

const deserializer = require('./lib/deserializer');
var ledsUsage = function (msg) {
	msg.reply(`Usage \`\`\`${config.prefix} leds <id> (on/off)\n${config.prefix} leds all (on/off)\n${config.prefix} leds list\`\`\``);
}
Manager.on('leds', function (cmd, args, msg) {
	if (args.length == 1) {
		if(args[0].toLowerCase() === 'list') {
			let message = `LEDs: \n\t`;

			let keys = Object.keys(Leds.leds);
			for(let i = 0; i < keys.length; i++) {
				let led = keys[i];
				message += `${led}${i < keys.length - 1 ? ', ' : ''}`;
			}

			msg.reply(message);
		}
		else ledsUsage(msg);
	}
	else if (args.length != 2) ledsUsage(msg);
	else {
		let id = args[0], status = args[1];
		status = deserializer.fromStatus(status);

		if(id.toLowerCase() === 'all') {
			Leds.turnAll(status);

			msg.reply(`Turned all leds ${deserializer.toStatus(status)}`);
		}
		else {
			if(Leds.exists(id)) {
				Leds.turn(id, status);

				msg.reply(`LED ${id} ${deserializer.toStatus(!Leds.getState(id))}`);
			}
			else msg.reply(`LED ${id} doesn't exist!`);
		}
	}
});


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.login(config.token);
