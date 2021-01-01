const canvas = document.querySelector("canvas");

canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext("2d");

const radius = 5;

const center = {
  x: canvas.width / 2 - 2 * radius,
  y: canvas.height / 2 - 2 * radius,
}

let angle = 0;
let xSpeed = 10;
let ySpeed = 10;
let reverse = 0;
let clockWise = 0;

const colors = ["#D2F6FC", "#7984EE", "#F9E3A2", "#23374D", "#DB1D4B"];

const particles = [];

function Particle(radius, color) {
  this.radius = radius;
  this.color = color;
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.fillRect(0,0, canvas.width,  canvas.height);
  for(let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    ctx.beginPath();
    const deg = clockWise ? angle : 360 - angle;
    const radian = ((reverse && i % 2 ? 360 - deg : deg) * Math.PI) / 180;
    ctx.arc(canvas.width / 2 + particle.radius * Math.cos(xSpeed * radian),  canvas.height / 2 + particle.radius * Math.sin(ySpeed * radian), radius, 0, 2 * Math.PI);
    ctx.fillStyle = particle.color;
    ctx.fill();
    ctx.closePath();
  }
  angle++;
  angle %= 360;
}

for(let i = 0; i < 30; i++) {
  particles.push(new Particle(300 - i * 10, colors[i % 5]));
}

function onXSpeedChange(v) {
  xSpeed = parseFloat(v);
}

function onYSpeedChange(v) {
  ySpeed = parseFloat(v);
}

function onClockWiseChange(v) {
  clockWise = parseInt(v);
}

function onReverseChange(v) {
  reverse = parseInt(v);
}

animate();