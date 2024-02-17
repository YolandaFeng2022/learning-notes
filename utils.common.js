// Common APIs

export default {
    isPlainObject(obj) {
        const class2type = {};
        const getProto = Object.getPrototypeOf;
        const toString = class2type.toString;
        const hasOwn = class2type.hasOwnProperty;
        const fnToString = hasOwn.toString;
        const ObjectFunctionString = fnToString.call(Object);

        return (function isPlainObject(obj) {
            if (!obj || toString.call(obj) !== '[object Object]') {
                return false;
            }
            const proto = getProto(obj);
            if (!proto) {
                return true;
            }
            const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
            return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
        })(obj);
    },

    isEmptyObject(obj) {
        if (typeof obj === 'string') {
            return obj.length === 0;
        }
        if (obj) {
            return !Object.keys(obj).length;
        }
        return true;
    },

    isArray(obj) {
        return Array.isArray(obj);
    },

    replace(str, obj, defaultValue) {
        if (!(typeof str === 'string' && str && obj)) {
            return str;
        }

        str = str.replace(/\{([^}]+)\}/g, function(match, key) {
            if (!obj.hasOwnProperty(key)) {
                if (typeof defaultValue !== 'undefined') {
                    return defaultValue;
                }
                return match;
            }

            let val = obj[key];

            if (typeof val === 'function') {
                val = val(obj, key);
            }

            if (typeof val === 'undefined') {
                val = '';
            }

            return val;
        });
        return str;
    },

    getValue(data, dotPathStr, defaultValue) {
        if (!dotPathStr) {
            return defaultValue;
        }
        let current = data;
        const list = dotPathStr.split('.');
        const lastKey = list.pop();
        while (current && list.length) {
            const item = list.shift();
            current = current[item];
        }
        if (current && current.hasOwnProperty(lastKey)) {
            const value = current[lastKey];
            if (typeof value !== 'undefined') {
                return value;
            }
        }
        return defaultValue;
    },

    /**
     *
     * @param {any} value
     * @returns {string} 'Object|Null|Undefined|String|Number|Boolean|Map|Set|Date|Function|HTMLDocument|SVGElement|HTMLDivElement...'
     */
    getType(value) {
        const type = Object.prototype.toString.apply(value);
        return type.substr(8).split(']')[0];
    },

    /**
     * get a url path query string, reference $.param
     * @param {any} data
     * @returns {string}
     */
    param(data) {
        if (!data) {
            return '';
        }

        const params = [];
        const addParam = function(obj, trailStart) {
            Object.keys(obj).forEach(key => {
                const valueOrFunction = obj[key];
                const value = typeof valueOrFunction === 'function' ? valueOrFunction() : valueOrFunction;
                const trail = trailStart ? `${trailStart}[${key}]` : key;
                if (typeof value === 'object') {
                    addParam(value, trail);
                } else if (value !== undefined) {
                    params[params.length] = `${encodeURIComponent(trail)}=${encodeURIComponent(value === null ? '' : value)}`;
                }
            });
        };

        addParam(data);

        return params.join('&');
    },

    /**
     * Parse the params from URL，pase '?a=1&b=1' to '{a:1, b:2}'
     */
    getURLParams(path) {
        const params = {};
        if (path) {
            let item;
            const strs = path.split('?').pop().split('&');
            for (let i = 0, len = strs.length; i < len; i++) {
                item = strs[i].split('=');
                params[item[0]] = decodeURIComponent(item[1]);
            }
        }
        return params;
    },

    loadStatic(id, url, succCall, errorCall, timeout) {
        const domType = url.endsWith('.css') ? 'link' : 'script';
        const domId = `${id}_${domType}`;
        let elem = document.getElementById(domId);
        if (elem) {
            if (elem.getAttribute('data-succ') === '1') {
                succCall && succCall();
                return Promise.resolve();
            }
            (succCall || errorCall) && elem._promise.then(succCall, errorCall);
            return elem._promise;
        }
        elem = document.createElement(domType);

        elem.id = domId;
        if (domType === 'link') {
            elem.rel = 'stylesheet';
            elem.type = 'text/css';
            elem.href = url;
        } else {
            elem.src = url;
        }
        document.head.appendChild(elem);

        let timer = 0;
        const promise = new Promise(function(resolve, reject) {
            elem.onload = function() {
                timer && clearTimeout(timer);
                elem.setAttribute('data-succ', '1');
                resolve();
            };
            elem.onerror = function(err) {
                elem.parentNode.removeChild(elem);
                console.warn(`加载URL: ${url} 失败`, err);
                reject(err);
            };
            timer = (timeout && setTimeout(elem.onerror, timeout)) || 0;
        });
        elem._promise = promise;
        (succCall || errorCall) && promise.then(succCall, errorCall);
        return promise;
    },

    /**
     * deep clone an object
     * Failed when clone an object with: {...obj}, Object.assign({}, obj), JSON.parse(JSON.stringify(obj)), Object.create(obj)
     * @param {Object} obj
     * @returns Object
     */
    deepClone(obj) {
        if (typeof obj !== 'object') {
            return obj;
        }

        const seen = new WeakSet();
        return JSON.parse(JSON.stringify(obj, (... args) => {
            const value = args[1];
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        }));
    },

    /**
     * Delay or block some time, can be used to replace setTimeout
     * @param {Integer} ms: The milliseconds of delay or block
     * @returns Promise
     */
    delay(ms) {
        return new Promise(res => {
            if (ms) {
                setTimeout(res, ms);
            } else {
                setTimeout(res, 0);
            }
        });
    },

    getDaysBetween(date1, date2) {
        const time1 = Date.parse(date1);
        const time2 = Date.parse(date2);
        const days = (time1 - time2) / (1 * 24 * 60 * 60 * 1000);
        return Math.ceil(Math.abs(days));
    },

    /**
     * Date 转 '2015-01-01 10:30:00'字符串格式
     */
    date2Str(inputDate, start, end) {
        let date;
        if (this.getType(inputDate) === 'Date') {
            date = inputDate;
        } else if (this.getType(inputDate) === 'String') {
            if (inputDate.charAt(10) === 'T') {
                date = new Date(inputDate);
            } else {
                date = new Date(inputDate.replace(/-/g, '/').substr(0, 19));
            }
        } else {
            date = new Date(inputDate);
        }
        if (date.getYear()) {
            return new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000)
                .toISOString()
                .slice(start || 0, end || 19)
                .replace('T', ' ');
        }
        return '';
    },

    swapKeysAndValues(obj) {
        const swapped = Object.entries(obj).map(([key, value]) => {
            if (value) {
                return {
                    [value]: key
                };
            }
        });
        return this.deepClone(swapped);
    },

    /**
     * 获取多级对象时默认填充{}
     */
    getDeepVal(obj, keyStr, defaultVal = {}) {
        const keys = keyStr.split('.');
        const len = keys.length;
        keys.forEach((key, index) => {
            if (obj[key] === undefined) {
                if (index === len - 1) {
                    obj[key] = defaultVal;
                } else {
                    obj[key] = {};
                }
            }
            obj = obj[key];
        });
        return obj;
    }
};
