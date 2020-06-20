window.localbus.init("http://4n.lv:7999/", `admin:admin`);

// storage
// storagemask
// alerts

// Add remove listener
if (!window.localbus.unlisten) {
    window.localbus.unlisten = function(type, id) {
        if (type === "groupinit") {
            this.listeners.groupinit.length = 0;
        } else if (type.indexOf("group") >= 0 || type === "object") {
            id = this.encodega(id);
            if (id) delete this.listeners[type][id];
        }
    };
}

export default window.localbus;