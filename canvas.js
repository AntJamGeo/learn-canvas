const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext('2d');

const maxSize = 100;

for (let i = 0; i < 10; i++) {
  c.fillRect(
    Math.random()*(window.innerWidth-maxSize),
    Math.random()*(window.innerHeight-maxSize),
    Math.random()*maxSize, 
    Math.random()*maxSize
  );
}