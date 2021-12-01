/*
  В этом комментарии напишите список, что бы вы проверили в коде студента:
  - roman должно быть функцией
  - Корректность преобразования арабских цифр в римские в соответствии правилам
  - Корректность преобразования сложных чисел из арабских цифр в римские
  - Корректность преобразования римских цифр в арабские в соответствии правилам
  - Корректность преобразования сложных чисел из римских цифр в арабские
  - Выход за диапазон от 1 до 3999 вызывает ошибку
  - Ошибка, при передаче в аргументе не числа и не строки
  - Ошибка, если аргумент содержит данные, которые не могут быть обработаны
*/

const roman = require('../post/src/index.js').default;

const errors = [];

const RULES_MAP = {
  1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X',
  10: 'X', 20: 'XX', 30: 'XXX', 40: 'XL', 50: 'L', 60: 'LX', 70: 'LXX', 80: 'LXXX', 90: 'XC',
  100: 'C', 200: 'CC', 300: 'CCC', 400: 'CD', 500: 'D', 600: 'DC', 700: 'DCC', 800: 'DCCC', 900: 'CM',
  1000: 'M', 2000: 'MM', 3000: 'MMM', 
}

const COMPOSITE_MAP = {
  17: 'XVII', 45: 'XLV', 99: 'XCIX',
  326: 'CCCXXVI', 878: 'DCCCLXXVIII',
  2042: 'MMXLII', 3999: 'MMMCMXCIX'
}

// здесь напишите ваш код проверок
it('roman должно быть функцией', function() {
  if(typeof roman !== 'function') {
    errors.push('roman не является функцией');
  }
});

it('Корректность преобразования арабских цифр в римские в соответствии правилам', function() {
  try {
    const incorrect = Object.entries(RULES_MAP).filter(([arabicNum, romanNum]) => roman(arabicNum) !== romanNum);

    const additionalErrors = incorrect.map(([arabicNum, romanNum]) => {
      return `Неправильное преобразование ${arabicNum} в ${romanNum}`;
    });

    if(additionalErrors.length) {
      errors.push(additionalErrors);
    }

  } catch(e) {
    if(e.name === 'Error') {
      errors.push('Преобразование арабских цифр не выходящих за диапазон от 1 до 3999 не должно вызывать исключений');
    }
  }
});

it('Корректность преобразования сложных чисел из арабских цифр в римские', function() {
  try {
    const incorrect = Object.entries(COMPOSITE_MAP).filter(([arabicNum, romanNum]) => roman(parseInt(arabicNum)) !== romanNum);

    const additionalErrors = incorrect.map(([arabicNum, romanNum]) => {
      return `Неправильное преобразование ${arabicNum} в ${romanNum}`;
    });

    if(additionalErrors.length) {
      errors.push(additionalErrors);
    }

  } catch(e) {
    if(e.name === 'Error') {
      errors.push('Преобразование из арабских цифр не выходящих за диапазон от 1 до 3999 не должно вызывать исключений');
    }
  }
});

it('Корректность преобразования римских цифр в арабские в соответствии правилам', function() {
  try {
    const incorrect = Object.entries(RULES_MAP).filter(([arabicNum, romanNum]) => roman(romanNum) !== parseInt(arabicNum));

    const additionalErrors = incorrect.map(([arabicNum, romanNum]) => {
      return `Неправильное преобразование ${romanNum} в ${arabicNum}`;
    });

    if(additionalErrors.length) {
      errors.push(additionalErrors);
    }

  } catch(e) {
    if(e.name === 'Error') {
      errors.push('Преобразование из арабских цифр не выходящих за диапазон от 1 до 3999 не должно вызывать исключений');
    }
  }
});

it('Корректность преобразования сложных чисел из римских цифр в арабские', function() {
  try {
    const incorrect = Object.entries(COMPOSITE_MAP).filter(([arabicNum, romanNum]) => roman(romanNum) !== parseInt(arabicNum));

    const additionalErrors = incorrect.map(([arabicNum, romanNum]) => {
      return `Неправильное преобразование ${romanNum} в ${arabicNum}`;
    });

    if(additionalErrors.length) {
      errors.push(additionalErrors);
    }

  } catch(e) {
    if(e.name === 'Error') {
      errors.push('Преобразование из арабских цифр не выходящих за диапазон от 1 до 3999 не должно вызывать исключений');
    }
  }
});

it('Выход за диапазон от 1 до 3999 вызывает ошибку', function() {
    const data = [-100, 0, 4000, 53422];
    data.forEach((num) => {
      if(isNotError(roman, num)) {
        errors.push(`${num} - выходит за диапазон от 1 до 3999. Должно вызывать ошибку`);
      }
    });
});

it('Ошибка, при передаче в аргументе не числа и не строки', function() {
    const data = [{}, [], null, undefined, function() {}];
    data.forEach((item) => {
      if(isNotError(roman, item)) {
        errors.push(`${type(item)} в аргументе должно вызывать ошибку`);
      }
    });
});

it('Ошибка, если аргумент содержит данные, которые не могут быть обработаны', function() {
  const data = [
    {
      value: NaN,
      symbols: 'NaN',
    },
    {
      value: 123.33,
      symbols: 'Числа с плавающей точкой',
    },
    {
      value: ':,-.;!?',
      symbols: 'Знаки пунктуации',
    },
    {
      value: 'ASD',
      symbols: 'Неподходящие буквы латиницы',
    },
  ];

  data.forEach(({value, symbols}) => {
    if(isNotError(roman, value)) {
      errors.push(`Некорректная обработка данных, которые не должен содержать аргумент: ${symbols}`);
    }
  });
});

function isError(fn, ...arg) {
  try {
    fn(...arg);

    return false;
  } catch(e) {
    if(e.name === 'Error') {
      return true
    }

    return false;
  }
}

function isNotError(fn, ...arg) {
  return !isError(fn, ...arg);
}

function type(arg) {
  return Object.prototype.toString.call(arg).slice(8, -1);
}

function it(name, test) {
  test();
}

console.log(errors);