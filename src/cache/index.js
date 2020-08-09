const redis = require("redis");
const { promisify } = require("util");

const client = redis.createClient({
  // redis options
});

client.on("error", (err) => {
  console.error(err);
});

const getAsync = promisify(client.get).bind(client);

// set a key-value that expires in one second
// client.set('key', 'value','EX', 1)
// get said key-value
// getAsync('key').then(res => console.log(res))
// wait two seconds and it returns null
// setTimeout(() => {
//   getAsync('key').then(res => console.log(res)).catch(e => console.log(e))
// }, 2000)

module.exports = {client, getAsync}