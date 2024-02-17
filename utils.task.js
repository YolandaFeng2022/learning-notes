// Async tasks relative APIs

/**
 * If some type of result is affected by different tasks
 * Bound and execute the tasks together, shield to protect the steady of the gotten result
 * The result would be more steady if it is visited later
 * @constructor(type: string, span: number, resGetter: null|function)
 * @return Promise
 */
class TaskShield {
    constructor(type = 'unset', resGetter = null, span = 500) {
        this.type = type;
        this.resGetter = resGetter;
        this.span = span;
    }

    inqueue = [];
    dequeue = [];
    task(runner = () => {}, callback = () => {}) {
        this.inqueue.push({
            runner,
            callback
        });
        return this.__run();
    }

    __run() {
        if (!this.inqueue.length) {
            return new Promise((res, rej) => {
                setTimeout(() => {
                    res(this.__resolve());
                }, this.span);
            });
        }

        const task = this.inqueue.shift();
        return Promise.resolve(task.runner()).finally(() => {
            this.dequeue.push(task);
            return this.__run();
        });
    }

    __resolve(commonRes) {
        if (this.inqueue.length) {
            return this.__run();
        }

        if (commonRes || !this.resGetter) {
            return this.__dequeueTask(commonRes);
        }

        return Promise.resolve(this.resGetter()).then(res => {
            return this.__resolve({ res });
        });
    }

    __dequeueTask(commonRes) {
        const dequeue = this.dequeue.concat();
        this.dequeue = [];
        return Promise.allSettled(dequeue.map(t => {
            if (t.callback) {
                return commonRes ? t.callback(commonRes.res) : t.callback();
            }
        }));
    }
}

/**
 *
 * @param {type: string} The type of task shield
 * @param {runner: function} The task execute content
 * @param {callback: function} The callback that been called after all the shield tasks has been executed
 * @returns Promise
 */
export const shieldTask = function(type, resGetter, span) {
    window.top.STEADY_TASKS = window.top.STEADY_TASKS || {};
    window.top.STEADY_TASKS[type] = window.top.STEADY_TASKS[type] || new TaskShield(type, resGetter, span);
    return window.top.STEADY_TASKS[type];
};

/**
 * Make sure the same task only been executed one time in a certain time period
 * During the time period, the task executiong will be suspended.
 * The suspend time will be recounted if encounter another task execution.
 * When the suspend time is timeoff, then the task will be actual executed.
 * @param {context: any} The task execute context and scope
 * @param {task: string || function} The debounced task
 * @param {wait: number} The debounce timespan
 * @param {args array} The arguments which are passed to the concurrent task
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
 * @param {Array<AsyncTask>} tasks: asynchronous task list
 * @param {Integer} limit: The maximum execute count of concurrent asynchronous tasks at one time
 * @returns Promise
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
