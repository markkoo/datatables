
import './style.scss';

// import _ from 'lodash';
// console.log(_);

import { cube } from './math';
console.log(cube);


import * as $ from 'jquery';

console.log($);

const set1 = new Set([1, 2, 3, 4, 5]);
console.log(set1.has(1));



// if (process.env.NODE_ENV !== 'production') {
//   console.log('Looks like we are in development mode!');
// }

console.log('dada!');
function component() {
  var element = document.createElement('div');
  element.innerHTML = 'hello world';
  element.classList.add('big');
  element.style.width = '500px';
  element.style.height = '500px';

  console.log('alibaba!!!');
  return element;
}

document.body.appendChild(component());