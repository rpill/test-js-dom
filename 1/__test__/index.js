/*
  В этом комментарии напишите список, что бы вы проверили в коде студента:
  - Для div.content задано свойство height: 100vh
  - Свойство должно быть указано div с классом content
  - Файл index.html не содержит тег style
  - Свойство height: 100vh не должно быть указано инлайново
*/

const errors = [];

it('Для div.content задана высота в 100vh', function () {
  const element = document.querySelector('div.content');
  const height = getStyle(element, 'height');
  const vh = getVH();

  if(vh !== height) {
    errors.push('Неправильное значение свойства height у элемента div.content')
  }
});

it('Свойство height должно быть указано у div с классом content', function () {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const element = document.querySelector('div:not(.content)');
  const height = getStyle(element, 'height');
  const vh = getVH();

  if(vh === height) {
    errors.push('Свойство должно быть указано у div с классом content');
  }
});

it('Файл index.html не содержит тег style', function () {
  const element = document.querySelector('style');

  if(element !== null) {
    errors.push('В файле index.html не должно быть элементом с тегом style');
  }
});

it('Свойство height не должно быть указано инлайново', function () {
  const element = document.querySelector('div.content');

  const inlineHeight = element.style.height;

  if(inlineHeight) {
    errors.push('Свойство height не должно быть указано инлайново');
  }
});

function it(name, test) {
  test();
}

function getVH() {
  return Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
}

function getStyle(el, property) {
  const value = window.getComputedStyle(el, null).getPropertyValue(property);
  return parseFloat(value);
}

console.log(errors);