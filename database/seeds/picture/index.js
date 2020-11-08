const fs = require('fs');
const path = require('path');

module.exports = {
  default: fs.readFileSync(path.join(__dirname, 'default.png')),
  egg: fs.readFileSync(path.join(__dirname, 'egg.png')),
  sugar: fs.readFileSync(path.join(__dirname, 'sugar.png')),
  carrot: fs.readFileSync(path.join(__dirname, 'carrot.png')),
  lettuce: fs.readFileSync(path.join(__dirname, 'lettuce.png')),
  beer: fs.readFileSync(path.join(__dirname, 'beer.png')),
  alcohol: fs.readFileSync(path.join(__dirname, 'alcohol.png')),
  apple: fs.readFileSync(path.join(__dirname, 'apple.png')),
  banana: fs.readFileSync(path.join(__dirname, 'banana.png'))
};
