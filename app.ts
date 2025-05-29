const publishBtn = document.getElementById('publishBtn') as HTMLButtonElement;
const twistInput = document.getElementById('twistInput') as HTMLTextAreaElement;
const twistThread = document.getElementById('twistThread') as HTMLElement;

class Twist {
  public replies: Twist[] = [];

  constructor(public content: string, public timestamp: Date = new Date()) {}

  render(): HTMLElement {
    const twistElement = document.createElement('div');
    twistElement.className = 'twist';

    const contentText = document.createElement('p');
    contentText.textContent = this.content;

    const timestamp = document.createElement('small');
    timestamp.textContent = this.timestamp.toLocaleString();

    const replyButton = document.createElement('button');
    replyButton.textContent = 'Responder';
    replyButton.className = 'reply-button';

    const toggleRepliesBtn = document.createElement('button');
    toggleRepliesBtn.textContent = 'Ocultar respuestas';
    toggleRepliesBtn.className = 'replies-toggle';
    toggleRepliesBtn.style.display = 'none';

    const repliesContainer = document.createElement('div');
    repliesContainer.className = 'replies';

    const replyBox = document.createElement('div');
    replyBox.className = 'reply-box';
    replyBox.style.display = 'none';

    const replyInput = document.createElement('textarea');
    replyInput.rows = 2;
    replyInput.placeholder = 'Escribe una respuesta...';

    const sendReplyBtn = document.createElement('button');
    sendReplyBtn.textContent = 'Enviar';
    sendReplyBtn.className = 'submit-reply';

    replyButton.addEventListener('click', () => {
      replyBox.style.display = replyBox.style.display === 'none' ? 'flex' : 'none';
    });

    toggleRepliesBtn.addEventListener('click', () => {
      const hidden = repliesContainer.style.display === 'none';
      repliesContainer.style.display = hidden ? 'block' : 'none';
      toggleRepliesBtn.textContent = hidden ? 'Ocultar respuestas' : 'Mostrar respuestas';
    });

    sendReplyBtn.addEventListener('click', () => {
      const replyText = replyInput.value.trim();
      if (replyText) {
        const reply = new Twist(replyText);
        this.replies.push(reply);
        repliesContainer.appendChild(reply.render());
        replyInput.value = '';
        repliesContainer.style.display = 'block';
        toggleRepliesBtn.style.display = 'inline';
      }
    });

    replyBox.appendChild(replyInput);
    replyBox.appendChild(sendReplyBtn);

    twistElement.appendChild(contentText);
    twistElement.appendChild(timestamp);
    twistElement.appendChild(replyButton);
    twistElement.appendChild(replyBox);
    twistElement.appendChild(toggleRepliesBtn);
    twistElement.appendChild(repliesContainer);

    return twistElement;
  }
}

publishBtn.addEventListener('click', () => {
  const content = twistInput.value.trim();
  if (content) {
    const newTwist = new Twist(content);
    twistThread.prepend(newTwist.render());
    twistInput.value = '';
  }
});