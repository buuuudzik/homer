class ConfigManager {
    constructor() {
        // State
        this.initiated = false;

        // Calculated
        this.floors = [];
        this.systems = [];

        // From config
        this.rooms = [];
        this.devices = [];
    }

    isInitiated() {
        return this.initiated;
    }

    getRooms() {
        return this.rooms;
    }

    getFloors() {
        return this.floors;
    }

    setConfig(config) {
        this.rooms = config.rooms;
        this.devices = config.devices;
        this.initiated = true;
        this.floors = [...new Set(this.rooms.map((r, i) => ({id: i+1, name: r.floor})))];
        this.categories = [...new Set(this.devices.map(d => d.categories).flat(1))].map((c,i) => ({id: i+1, name: c}));
    }
}

export default new ConfigManager();