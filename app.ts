interface Twist {
  text: string;
  timestamp: Date;
}

const formulario = document.getElementById('formulario') as HTMLFormElement;
const input = document.getElementById('twistInput') as HTMLInputElement;
const twistsDiv = document.getElementById('twists') as HTMLDivElement;

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    publicarTwist({ text, timestamp: new Date() });
    input.value = '';
  }
});

function publicarTwist(twist: Twist) {
  const div = document.createElement('div');
  div.className = 'twist';
  div.textContent = `${twist.text} - ${twist.timestamp.toLocaleTimeString()}`;
  twistsDiv.prepend(div);
}