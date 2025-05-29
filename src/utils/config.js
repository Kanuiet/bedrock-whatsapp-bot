const { log } = require('./log');
const fs = require('node:fs');
const chokidar = require('chokidar');
const path = require('node:path');

class Config {
  constructor(fileName = 'config.json') {
    this.path = path.resolve(__dirname, '../..', fileName);
    this.config = {};

    chokidar.watch(this.path).on('change', () => {
      this.load();
    });
  }

  load() {
    try {
      if (!fs.existsSync(this.path)) {
        log('Config', `Can't find ${this.path}. Creating one...`);
        fs.writeFileSync(this.path, JSON.stringify({}, null, 2));
      }

      const raw = fs.readFileSync(this.path, 'utf-8');
      this.config = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to load config:', err.message);
    }
  }

  save() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.config, null, 2));
    } catch (err) {
      console.error('Failed to save config:', err.message);
    }
  }

  get(key) {
    const keys = key.split('.');
    let result = this.config;

    for (const key of keys) {
      if (result[key] === undefined) return null;
      result = result[key];
    }

    return result;
  }

  append(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let obj = this.config;

    for (const key of keys) {
      if (typeof obj[key] !== 'object' || obj[key] === null) {
        obj[key] = {};
      }
      obj = obj[key];
    }

    if (!Array.isArray(obj[lastKey])) {
      obj[lastKey] = [];
    }

    obj[lastKey].push(value);
    this.save();
  }

  set(key, value) {
    const keys = key.split('.');
    const lastKey = keys.pop();
    let obj = this.config;

    for (const key of keys) {
      if (typeof obj[key] !== 'object' || obj[key] === null) {
        obj[key] = {};
      }
      obj = obj[key];
    }

    obj[lastKey] = value;
    this.save();
  }

  remove(key, value) {
    if (!Array.isArray(this.config[key])) return;

    this.config[key] = this.config[key].filter(
      (item) => JSON.stringify(item) !== JSON.stringify(value),
    );
    this.save();
  }

  hasValue(key, value) {
    if (!Array.isArray(this.config[key])) return false;

    if (typeof value !== 'object') {
      return this.config[key].includes(value);
    }

    return this.config[key].some(
      (item) =>
        item.groupJid === value.groupJid && item.userJid === value.userJid,
    );
  }

  getPath() {
    return this.path;
  }
}

module.exports = new Config();
