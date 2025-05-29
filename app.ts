document.addEventListener("DOMContentLoaded", () => {
  interface Tweet {
    id: string;
    content: string;
    createdAt: Date;
    replies: Tweet[];
    showReplies: boolean; // Nuevo estado de visibilidad
  }

  const tweets: Tweet[] = [];

  const tweetInput = document.getElementById("tweetInput") as HTMLTextAreaElement;
  const postButton = document.getElementById("postButton") as HTMLButtonElement;
  const tweetContainer = document.getElementById("tweetContainer") as HTMLDivElement;

  function generateId(): string {
    return crypto.randomUUID();
  }

  function createTweet(content: string): Tweet {
    return {
      id: generateId(),
      content,
      createdAt: new Date(),
      replies: [],
      showReplies: true, // Se inicializa como visibles
    };
  }

  function renderTweet(tweet: Tweet, depth = 0): HTMLElement {
    const div = document.createElement("div");
    div.className = "tweet";
    div.style.marginLeft = `${depth * 20}px`;

    const contentP = document.createElement("p");
    contentP.textContent = tweet.content;

    const timestamp = document.createElement("small");
    timestamp.textContent = tweet.createdAt.toLocaleString();

    const replyButton = document.createElement("button");
    replyButton.textContent = "Responder";
    replyButton.className = "reply-button";

    const replyInput = document.createElement("textarea");
    replyInput.placeholder = "Escribe tu respuesta...";
    replyInput.className = "reply-input";
    replyInput.style.display = "none";

    const submitReplyButton = document.createElement("button");
    submitReplyButton.textContent = "Enviar respuesta";
    submitReplyButton.style.display = "none";
    submitReplyButton.className = "submit-reply";

    replyButton.addEventListener("click", () => {
      const isVisible = replyInput.style.display === "block";
      replyInput.style.display = isVisible ? "none" : "block";
      submitReplyButton.style.display = isVisible ? "none" : "inline-block";
    });

    submitReplyButton.addEventListener("click", () => {
      const replyContent = replyInput.value.trim();
      if (replyContent) {
        const replyTweet = createTweet(replyContent);
        tweet.replies.push(replyTweet);
        replyInput.value = "";
        tweet.showReplies = true; // Mostrar respuestas cuando se añade una nueva
        renderTweets(); // Volver a dibujar todo
      }
    });

    div.appendChild(contentP);
    div.appendChild(timestamp);
    div.appendChild(document.createElement("br"));
    div.appendChild(replyButton);
    div.appendChild(replyInput);
    div.appendChild(submitReplyButton);

    if (tweet.replies.length > 0) {
      const toggleRepliesButton = document.createElement("button");
      toggleRepliesButton.textContent = tweet.showReplies ? "Ocultar respuestas" : "Ver respuestas";
      toggleRepliesButton.className = "replies-toggle";
      toggleRepliesButton.addEventListener("click", () => {
        tweet.showReplies = !tweet.showReplies;
        renderTweets(); // ⚠️ Necesitamos esta función definida globalmente
      });
      div.appendChild(document.createElement("br"));
      div.appendChild(toggleRepliesButton);
    }

    if (tweet.replies.length > 0 && tweet.showReplies) {
      tweet.replies.forEach(reply => {
        div.appendChild(renderTweet(reply, depth + 1));
      });
    }

    return div;
  }

  function renderTweets(): void {
    tweetContainer.innerHTML = "";
    tweets.forEach(t => {
      tweetContainer.appendChild(renderTweet(t));
    });
  }

  postButton.addEventListener("click", () => {
    const content = tweetInput.value.trim();
    if (content) {
      const tweet = createTweet(content);
      tweets.push(tweet);
      tweetInput.value = "";
      renderTweets(); // Usamos la función general de renderizado
    }
  });

const toggleButton = document.getElementById("darkModeToggle");

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Cambiar ícono de luna a sol o viceversa
      if (document.body.classList.contains("dark-mode")) {
        toggleButton.textContent = "☀️";
      } else {
        toggleButton.textContent = "🌙";
      }
    });
  }

});