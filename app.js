document.addEventListener("DOMContentLoaded", function () {
    var tweets = [];
    var tweetInput = document.getElementById("tweetInput");
    var postButton = document.getElementById("postButton");
    var tweetContainer = document.getElementById("tweetContainer");
    function generateId() {
        return crypto.randomUUID();
    }
    function createTweet(content) {
        return {
            id: generateId(),
            content: content,
            createdAt: new Date(),
            replies: [],
            showReplies: true, // Se inicializa como visibles
        };
    }
    function renderTweet(tweet, depth) {
        if (depth === void 0) { depth = 0; }
        var div = document.createElement("div");
        div.className = "tweet";
        div.style.marginLeft = "".concat(depth * 20, "px");
        var contentP = document.createElement("p");
        contentP.textContent = tweet.content;
        var timestamp = document.createElement("small");
        timestamp.textContent = tweet.createdAt.toLocaleString();
        var replyButton = document.createElement("button");
        replyButton.textContent = "Responder";
        replyButton.className = "reply-button";
        var replyInput = document.createElement("textarea");
        replyInput.placeholder = "Escribe tu respuesta...";
        replyInput.className = "reply-input";
        replyInput.style.display = "none";
        var submitReplyButton = document.createElement("button");
        submitReplyButton.textContent = "Enviar respuesta";
        submitReplyButton.style.display = "none";
        submitReplyButton.className = "submit-reply";
        replyButton.addEventListener("click", function () {
            var isVisible = replyInput.style.display === "block";
            replyInput.style.display = isVisible ? "none" : "block";
            submitReplyButton.style.display = isVisible ? "none" : "inline-block";
        });
        submitReplyButton.addEventListener("click", function () {
            var replyContent = replyInput.value.trim();
            if (replyContent) {
                var replyTweet = createTweet(replyContent);
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
            var toggleRepliesButton = document.createElement("button");
            toggleRepliesButton.textContent = tweet.showReplies ? "Ocultar respuestas" : "Ver respuestas";
            toggleRepliesButton.className = "replies-toggle";
            toggleRepliesButton.addEventListener("click", function () {
                tweet.showReplies = !tweet.showReplies;
                renderTweets(); // ⚠️ Necesitamos esta función definida globalmente
            });
            div.appendChild(document.createElement("br"));
            div.appendChild(toggleRepliesButton);
        }
        if (tweet.replies.length > 0 && tweet.showReplies) {
            tweet.replies.forEach(function (reply) {
                div.appendChild(renderTweet(reply, depth + 1));
            });
        }
        return div;
    }
    function renderTweets() {
        tweetContainer.innerHTML = "";
        tweets.forEach(function (t) {
            tweetContainer.appendChild(renderTweet(t));
        });
    }
    postButton.addEventListener("click", function () {
        var content = tweetInput.value.trim();
        if (content) {
            var tweet = createTweet(content);
            tweets.push(tweet);
            tweetInput.value = "";
            renderTweets(); // Usamos la función general de renderizado
        }
    });
    var toggleButton = document.getElementById("darkModeToggle");
    if (toggleButton) {
        toggleButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
            // Cambiar ícono de luna a sol o viceversa
            if (document.body.classList.contains("dark-mode")) {
                toggleButton.textContent = "☀️";
            }
            else {
                toggleButton.textContent = "🌙";
            }
        });
    }
});
