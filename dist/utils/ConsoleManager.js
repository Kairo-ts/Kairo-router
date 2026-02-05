export var ConsoleTimeFormat;
(function (ConsoleTimeFormat) {
    ConsoleTimeFormat["TimeOnly"] = "time";
    ConsoleTimeFormat["DateTime"] = "datetime";
    ConsoleTimeFormat["None"] = "none";
})(ConsoleTimeFormat || (ConsoleTimeFormat = {}));
export class ConsoleManager {
    static init(properties) {
        if (this.properties) {
            throw new Error("[ConsoleManager] ConsoleManager is already initialized.");
        }
        this.properties = properties;
    }
    static requireInitialized() {
        if (!this.properties) {
            throw new Error("[ConsoleManager] ConsoleManager is not initialized. Call ConsoleManager.init(properties) first.");
        }
        return this.properties;
    }
    static getJstDate() {
        return new Date(Date.now() + this.JST_OFFSET_MS);
    }
    static pad(value, length = 2) {
        return value.toString().padStart(length, "0");
    }
    static formatTime(format) {
        if (format === ConsoleTimeFormat.None)
            return "";
        const d = this.getJstDate();
        const date = `${d.getUTCFullYear()}/${this.pad(d.getUTCMonth() + 1)}/${this.pad(d.getUTCDate())}`;
        const time = `${this.pad(d.getUTCHours())}:${this.pad(d.getUTCMinutes())}:${this.pad(d.getUTCSeconds())}.${this.pad(d.getUTCMilliseconds(), 3)}`;
        switch (format) {
            case ConsoleTimeFormat.DateTime:
                return `${date} ${time}`;
            case ConsoleTimeFormat.TimeOnly:
            default:
                return time;
        }
    }
    static buildPrefix(level, timeFormat) {
        const properties = this.requireInitialized();
        const time = this.formatTime(timeFormat);
        return time
            ? `[${properties.header.name}][${time}][${level}]`
            : `[${properties.header.name}][${level}]`;
    }
    static log(message, timeFormat = ConsoleTimeFormat.TimeOnly) {
        console.log(`${this.buildPrefix("Log", timeFormat)} ${message}`);
    }
    static warn(message, timeFormat = ConsoleTimeFormat.TimeOnly) {
        console.warn(`${this.buildPrefix("Warning", timeFormat)} ${message}`);
    }
    static error(message, timeFormat = ConsoleTimeFormat.TimeOnly) {
        console.error(`${this.buildPrefix("Error", timeFormat)} ${message}`);
    }
}
ConsoleManager.JST_OFFSET_MS = 9 * 60 * 60 * 1000;
ConsoleManager.properties = null;
