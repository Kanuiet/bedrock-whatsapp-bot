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

  /**
   * Loads the config file.
   */
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

  /**
   * Saves the config into json file.
   */
  save() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.config, null, 2));
    } catch (err) {
      console.error('Failed to save config:', err.message);
    }
  }

  /**
   * Gets the value of the key from the config file.
   *
   * @param {string} key
   * @returns {*} The value of the key
   */
  get(key) {
    const keys = key.split('.');
    let result = this.config;

    for (const key of keys) {
      if (result[key] === undefined) return null;
      result = result[key];
    }

    return result;
  }

  /**
   * Appends a value to the array from the given key.
   *
   * @param {string} key
   * @param {*} value
   */
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

  /**
   * Sets a value for the given key.
   *
   * @param {string} key
   * @param {*} value
   */
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

  /**
   * Removes a value in the array from the given key.
   *
   * @param {string} key
   * @param {*} value
   */
  remove(key, value) {
    if (!Array.isArray(this.config[key])) return;

    this.config[key] = this.config[key].filter(
      (item) => JSON.stringify(item) !== JSON.stringify(value),
    );
    this.save();
  }

  /**
   * Checks the value of the array if it exists for the given key.
   *
   * @param {string} key
   * @param {*} value
   * @returns {boolean} `true` if the value exists, otherwise `false`
   */
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

  /**
   * Gets the path to the config file.
   *
   * @returns {string} The config file path
   */
  getPath() {
    return this.path;
  }
}

module.exports = new Config();
