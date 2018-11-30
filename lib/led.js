const Gpio = require('onoff').Gpio;

class LED {
	constructor(id, pin) {
		this.id = id;
		this.pin = pin;
		this.status = false;

		this.gpio = new Gpio(this.pin, 'out');
		this.setState(false);
	}

	setState(value) {
		let val;
		if(typeof value === "number") {
			val = value;

			if(value >= 1) val = 0;
			if(value <= 0) val = 1;
		}

		if(typeof value === "boolean") val = (value ? 0 : 1);
		this.gpio.writeSync(val);
		this.status = (val == 0 ? false : true);
	}

	toggle() {
		this.status = !this.status;
		this.setState(this.status);
	}
}


class LEDManager {
	constructor(config) {
		this.config = config;
		this.leds = [];
	}

	load() {
		let configLeds = this.config.leds;
		let keys = Object.keys(configLeds);

		for(let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let led = configLeds[key];

			if (led.pin)
				this.leds[key] = new LED(key, led.pin);
		}
	}

	exists(id) {
		return this.leds[id] !== undefined;
	}

	getState(id) {
		let led = this.leds[id];

		if (led)
			return led.status;
	}

	ledSingle(id, callback) {
		let led = this.leds[id];

		if (led)
			callback(led);
	}

	turn(id, status) {
		this.ledSingle(id, (led) => led.setState(status));
	}

	turnAll(status) {
		let keys = Object.keys(this.leds);
		for(let i = 0; i < keys.length; i++) {
			let key = keys[i];
			this.turn(key, status);
		}
	}
}

module.exports = {
	LED: LED,
	Manager: LEDManager
}