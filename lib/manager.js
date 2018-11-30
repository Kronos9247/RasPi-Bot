const loader = require('./loader');
class Manager {
    constructor(config, parser) {
        this.config = config;
        this.parser = parser;
        this.methods = [];

        if (!parser) this.parser = new loader.Loader();
    }

    use(client) {
        client.on('message', this.emit.bind(this));
    }

    on(name, callback) {
        this.methods[name.toLowerCase()] = callback;
    }

    emit(msg) {
        let content = msg.content;

        if(content.startsWith(this.config.prefix)) {
            let args = this.parser.parse(content);
            args = args.slice(1);

            if(args.length >= 1) {
                let methodName = args[0].toLowerCase();
                let method = this.methods[methodName];

                if (method)
                    method(methodName, args.slice(1), msg);
            }
        }
    }
}

module.exports = {
    Manager: Manager
}