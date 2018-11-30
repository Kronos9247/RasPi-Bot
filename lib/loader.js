class CommandLoader {
	constructor() {
		this.defaultpath = true;
		this.pattern = /(\".*\")|(\S*)/;
		this.bracketp = /\"(.*)\"/;
		this.spattern = /^\s/;
	}

	parse(cmd) {
		var list = cmd.split(this.pattern);
		var result = [];
		for (var i = 0; i < list.length; i++) {
			if(list[i] !== undefined && list[i].length > 0 && !this.spattern.test(list[i])) {
				if(this.bracketp.test(list[i])) {
					let ar = this.bracketp.exec(list[i]);

					result.push(ar[1]);
				}
				else {
					result.push(list[i]);
				}
			}
		}

		return result;
	}
}

module.exports = {
    Loader: CommandLoader
};