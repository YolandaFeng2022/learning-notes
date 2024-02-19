// Reference from: https://es6.ruanyifeng.com/#docs/class-extends#Mixin-%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%AE%9E%E7%8E%B0
function copyProperties(target, source) {
    for (const key of Reflect.ownKeys(source)) {
        if (key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
        ) {
            const desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

function mix(... mixins) {
    class Mix {
        constructor() {
            for (const Mixin of mixins) {
                // Copy the properties of instance
                copyProperties(this, new Mixin());
            }
        }
    }

    for (const mixin of mixins) {
        // Copy static properties
        copyProperties(Mix, mixin);
        // Copy prototype properties
        copyProperties(Mix.prototype, mixin.prototype);
    }

    return Mix;
}


// Usage
class Loggable { };
class Serializable { };
class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
}
