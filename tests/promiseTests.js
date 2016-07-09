var bcrypt = require('../dist/bcrypt.js');

var asyncMethodNames = [
 'hash',
 'genSalt',
 'compare'
];

asyncMethodNames.forEach(function(methodName) {
  insatnceTest(methodName);
  insatnceTestWithCallback(methodName);
});

functionalityTest('test', 'test')
.then(function() {
  functionalityTest('test', 'invalid');
});

function insatnceTest(methodName) {
  var instanceOfPromise = bcrypt[methodName]() instanceof Promise;

  console.log('Calling ' + methodName + ' returns a Promise instance: ' + instanceOfPromise);
}

function insatnceTestWithCallback(methodName) {
  var instanceOfPromise = bcrypt[methodName](function(){}) instanceof Promise;

  console.log('Calling ' + methodName + ' with a callback returns a Promise instance: ' + !instanceOfPromise);
}


function functionalityTest(pass, comparison){
  console.log('\nTesting main functionality');
  console.log('Generating salt...')
  return bcrypt.genSalt(8)
  .then(function(salt) {
    console.log('Generated salt: ' + salt);
    console.log('Generating hash for password `' + pass + '`...')
    return bcrypt.hash(pass, salt);
  })
  .then(function(hash) {
    console.log('Generated hash: ' + hash);
    console.log('Testing against password `' + comparison + '`...')
    return bcrypt.compare(comparison, hash);
  })
  .then(function(result) {
    if (result) console.log('Password valid');
    else console.log('Password invalid');
  });
}
