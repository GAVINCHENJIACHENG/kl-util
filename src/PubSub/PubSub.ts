module.exports = function PubSub() {
    PubSub.prototype.subscribers = {};

    /**
     * 订阅
     * @param name
     * @param callback
     */
    PubSub.prototype.subscriber = function (name: string, callback: Function) {
        this.subscribers[name] = callback;
    }

    PubSub.prototype.publish = function (name: string, ...args: any) {
        if(!this.subscribers[name])return;
        this.subscribers[name](...args);
    }
}