class ConfigManager {
  constructor() {
    // State
    this.initiated = false;

    // Calculated
    this.floors = [];
    this.floorsIndex = {};
    this.systems = [];
    this.systemsIndex = {};

    // From config
    this.rooms = [];
    this.roomsIndex = {};
    this.devices = [];
    this.devicesIndex = {};
  }

  isInitiated() {
    return this.initiated;
  }

  getRoomById(id) {
    return this.roomsIndex[id];
  }

  getRooms() {
    return this.rooms;
  }

  getFloorById(id) {
    return this.floorsIndex[id];
  }

  getFloors() {
    return this.floors;
  }

  getDeviceById(id) {
    return this.devicesIndex[id];
  }
  getDevices() {
    return this.devices;
  }

  updateIndexes() {
    this.roomsIndex = {};
    this.rooms.forEach((r) => (this.roomsIndex[r.id] = r));

    this.floorsIndex = {};
    this.floors.forEach((r) => (this.floorsIndex[r.id] = r));

    this.devicesIndex = {};
    this.devices.forEach((r) => (this.devicesIndex[r.id] = r));

    this.systemsIndex = {};
    this.systems.forEach((r) => (this.systemsIndex[r.id] = r));
  }

  setConfig(config) {
    this.rooms = config.rooms;
    this.devices = config.devices;
    this.initiated = true;
    this.floors = config.floors;
    this.categories = [
      ...new Set(this.devices.map((d) => d.categories).flat(1)),
    ].map((c, i) => ({ id: i + 1, name: c }));
    this.updateIndexes();
  }
}

export default new ConfigManager();
