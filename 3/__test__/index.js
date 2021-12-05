/*
    Выполните npm init
    Это даcт вам доступ к двум библиотекам:
    esprima – http://esprima.org
    esquery – https://github.com/estools/esquery
    Затем вам нужно получить доступ к файлу app.js с помощью fs и path и проверить его на соответствие заданию
*/

const fs = require('fs');
const path = require('path');
const esprima = require('esprima')
const esquery = require('esquery');

/*
  В этом комментарии напишите список, что бы вы проверили в коде студента:
  - Модуль http загружен
  - Метод createServer вызывается у той же переменной, в которую был импортирован модуль http
  - Аргумент метода createServer является функцией
  - Тело функции аргумента метода createServer содержит в себе console.log
  - Метод listen вызывается у той же переменной, в которую был передан объект сервера
  - Метод листер вызывается с аргументом 3000
*/

const errors = [];

const sourceCode = readFile('../post/app.js');

const ast = esprima.parse(sourceCode);

it('Модуль http загружен', function() {
  const matches = esquery(ast, 'CallExpression:has(Identifier[name="require"]):has(Literal[value="http"])');
  console.log(matches);
});

function readFile (filePath) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const data = fs.readFileSync(fullPath).toString();
  return data;
};

function it(name, test) {
  test();
}

console.log(errors);