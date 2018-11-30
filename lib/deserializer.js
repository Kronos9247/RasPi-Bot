module.exports = {
    fromStatus: function (status) {
        if(typeof status === "boolean") return status;

        if(typeof status === "number") return (status == 1 ? true : false);
        if(typeof status === "string") {
            if (status == '1' || status == '0') return (status == '1' ? true : false);

            return (status == 'on' ? true : false);
        }

        throw new Error('unsupported type')
    },
    toStatus: function (status) { //this method shouldn't be here. meh I am too lazy 
        return status ? 'on' : 'off';
    }
}