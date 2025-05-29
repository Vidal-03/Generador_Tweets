const publishBtn = document.getElementById('publishBtn') as HTMLButtonElement;
const twistInput = document.getElementById('twistInput') as HTMLTextAreaElement;
const twistThread = document.getElementById('twistThread') as HTMLElement;

class Twist {
  public replies: Twist[] = [];

  constructor(public content: string, public timestamp: Date = new Date()) {}

  render(): HTMLElement {
    const twistElement = document.createElement('div');
    twistElement.className = 'twist';

    // Contenido principal
    const contentText = document.createElement('p');
    contentText.textContent = this.content + ' (' + this.timestamp.toLocaleTimeString() + ')';

    // Botón de respuesta
    const replyButton = document.createElement('button');
    replyButton.textContent = 'Responder';
    replyButton.style.marginTop = '5px';

    // Contenedor de respuestas
    const repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies';

    // Botón de ocultar/mostrar respuestas
    const toggleRepliesBtn = document.createElement('button');
    toggleRepliesBtn.textContent = 'Ocultar respuestas';
    toggleRepliesBtn.style.display = 'none';
    toggleRepliesBtn.addEventListener('click', () => {
      if (repliesContainer.style.display === 'none') {
        repliesContainer.style.display = 'block';
        toggleRepliesBtn.textContent = 'Ocultar respuestas';
      } else {
        repliesContainer.style.display = 'none';
        toggleRepliesBtn.textContent = 'Mostrar respuestas';
      }
    });

    // Campo para nueva respuesta
    const replyInput = document.createElement('textarea');
    replyInput.placeholder = 'Escribe una respuesta...';
    replyInput.rows = 2;
    replyInput.style.display = 'none';

    const sendReplyBtn = document.createElement('button');
    sendReplyBtn.textContent = 'Enviar respuesta';
    sendReplyBtn.style.display = 'none';

    // Mostrar campo al hacer clic en "Responder"
    replyButton.addEventListener('click', () => {
      replyInput.style.display = 'block';
      sendReplyBtn.style.display = 'inline-block';
    });

    // Lógica para agregar respuesta
    sendReplyBtn.addEventListener('click', () => {
      const replyText = replyInput.value.trim();
      if (replyText) {
        const reply = new Twist(replyText);
        this.replies.push(reply);
        repliesContainer.appendChild(reply.render());
        replyInput.value = '';
        replyInput.style.display = 'none';
        sendReplyBtn.style.display = 'none';
        toggleRepliesBtn.style.display = 'inline-block';
      }
    });

    // Armar el twist
    twistElement.appendChild(contentText);
    twistElement.appendChild(replyButton);
    twistElement.appendChild(replyInput);
    twistElement.appendChild(sendReplyBtn);
    twistElement.appendChild(toggleRepliesBtn);
    twistElement.appendChild(repliesContainer);

    return twistElement;
  }
}

publishBtn.addEventListener('click', () => {
  const content = twistInput.value.trim();
  if (content) {
    const newTwist = new Twist(content);
    twistThread.appendChild(newTwist.render());
    twistInput.value = '';
  }
});