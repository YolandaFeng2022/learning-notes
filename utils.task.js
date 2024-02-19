// Async tasks relative APIs

/**
 * @class TaskShield
 * If some type of result is affected by different tasks.
 * Bound and execute the tasks together, and shield to protect the steady of the gotten result.
 * The result would be more steady if it is visited later.
 */
class TaskShield {
    #inqueue = [];
    #dequeue = [];

    /**
     *
     * @param {String} type - The type of shield
     * @param {Function | Nullable} resHook - The hook for shielded result
     * @param {Number} span - The hijack time for getting result
     */
    constructor(type = 'unset', resHook = null, span = 500) {
        this.type = type;
        this.resHook = resHook;
        this.span = span;
    }

    task(runner = () => {}, callback = () => {}) {
        this.#inqueue.push({
            runner,
            callback
        });
        return this.#run();
    }

    #run() {
        if (!this.#inqueue.length) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res(this.#resolve());
                }, this.span);
            });
        }

        const task = this.#inqueue.shift();
        return Promise.resolve(task.runner()).finally(() => {
            this.#dequeue.push(task);
            return this.#run();
        });
    }

    #resolve(commonRes) {
        if (this.#inqueue.length) {
            return this.#run();
        }

        if (commonRes || !this.resHook) {
            return this.#dequeueTask(commonRes);
        }

        return Promise.resolve(this.resHook()).then(res => {
            return this.#resolve({ res });
        });
    }

    #dequeueTask(commonRes) {
        const dequeue = this.#dequeue.concat();
        this.#dequeue = [];
        return Promise.allSettled(dequeue.map(t => {
            if (t.callback) {
                return commonRes ? t.callback(commonRes.res) : t.callback();
            }
        }));
    }
}

/**
 * Push a new task into the task shield
 * @function getTaskShield
 * @param {String} [type] - The type of task shield
 * @param {Function} [resHook] - The hook for shielded result
 * @param {Number} [span] - The hijack time for getting result
 * @returns {TaskShield}
 */
export const getTaskShield = function(type = 'unset', resHook, span) {
    window.top.TYPED_TASK_SHIELDS = window.top.TYPED_TASK_SHIELDS || {};
    window.top.TYPED_TASK_SHIELDS[type] = window.top.TYPED_TASK_SHIELDS[type] || new TaskShield(type, resHook, span);
    return window.top.TYPED_TASK_SHIELDS[type];
};

/**
 * Make sure the same task only been executed one time in a certain time period.
 * During the time period, the task executiong will be suspended.
 * The suspend time will be recounted if encounter another task execution.
 * When the suspend time is timeoff, then the task will be actual executed.
 * @function debounceTask
 * @param {Object} context - The task execute context and scope
 * @param {String | Function} task - The debounced task
 * @param {Number} [wait] - The debounce timespan
 * @param {Array} [args] - The arguments which are passed to the concurrent task
 */
export const debounceTask = function(context, task, wait = 100, args = []) {
    context = context || window.top;
    if (typeof task === 'string') {
        task = context[task];
    }

    if (typeof task !== 'function') {
        return;
    }

    const call = function(task) {
        // original function
        if (typeof task.prototype === 'object') {
            task.call(context, ... args);
            return;
        }

        // bound function or arrow function
        task.call(context, ... args);
    };

    context.__debounce = context.__debounce || {};
    const queue = context.__debounce;

    const delay = function() {
        queue[task] = null;
        call(task);
    };

    const timer = task.name;
    clearTimeout(queue[timer]);
    queue[timer] = setTimeout(delay, wait);
};

/**
 * Control the total count of concurrent asynchronous tasks, start the next task when last task has been completely completed
 * @function batchAsyncTasks
 * @param {Array} tasks - Asynchronous task list
 * @param {Number} limit - The maximum execute count of concurrent asynchronous tasks at one time
 * @returns {Promise}
 */
export const batchAsyncTasks = function(tasks, limit = 5) {
    const results = [];
    const pool = [];
    const run = () => {
        if (!tasks.length) {
            return Promise.resolve();
        }

        const task = tasks.splice(0, 1)[0];
        const result = Promise.resolve(task()).catch(err => err);
        results.push(result);

        const promise = result.then(() => {
            pool.splice(pool.indexOf(promise), 1);
        });
        pool.push(promise);

        let r = Promise.resolve();
        if (pool.length >= limit) {
            r = Promise.race(pool);
        }

        return r.then(() => run());
    };
    return run().then(() => {
        return Promise.all(results);
    });
};
