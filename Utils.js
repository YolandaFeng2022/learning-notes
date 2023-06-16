const Utils = {
  /**
 * Control the async tasks total acount, one has been fullfiled then add and run another until all tasks are fullfiled.
 * @param {Array[asyncTask]} tasks The async tasks list
 * @param {Integer} limit The maximum count of the tasks which can run the same time
 * @returns Promise.all()
 */
  batchAsyncTasks(tasks, limit = 5) => {
      const results = [];
      const pool = [];
      const run = () => {
          if (!tasks.length) {
              return Promise.resolve();
          }

          const task = tasks.splice(0, 1)[0];
          const result = Promise.resolve(task());
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
      }
      return run().then(() => {
          return Promise.all(results);
      });
  },
}
export default Utils;
export {Utils};


// Mock async tasks to test the function batchAsyncTasks
let total = 0;
let mockTasks = [];
for (i = 0; i < 9; i++) {
	mockTasks.push(function() {
		return new Promise(res => {
			setTimeout(() => {
				total += 1;
        res();
			}, 1000);
		});
	});
}
console.time('t_marker');
await Utils.batchAsyncTasks(mockTasks, 3);
console.timeEnd('t_marker');
console.log(total);
