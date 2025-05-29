var publishBtn = document.getElementById('publishBtn');
var twistInput = document.getElementById('twistInput');
var twistThread = document.getElementById('twistThread');
var Twist = /** @class */ (function () {
    function Twist(content, timestamp) {
        if (timestamp === void 0) { timestamp = new Date(); }
        this.content = content;
        this.timestamp = timestamp;
        this.replies = [];
    }
    Twist.prototype.render = function () {
        var _this = this;
        var twistElement = document.createElement('div');
        twistElement.className = 'twist';
        // Contenido principal
        var contentText = document.createElement('p');
        contentText.textContent = this.content + ' (' + this.timestamp.toLocaleTimeString() + ')';
        // Botón de respuesta
        var replyButton = document.createElement('button');
        replyButton.textContent = 'Responder';
        replyButton.style.marginTop = '5px';
        // Contenedor de respuestas
        var repliesContainer = document.createElement('div');
        repliesContainer.className = 'replies';
        // Botón de ocultar/mostrar respuestas
        var toggleRepliesBtn = document.createElement('button');
        toggleRepliesBtn.textContent = 'Ocultar respuestas';
        toggleRepliesBtn.style.display = 'none';
        toggleRepliesBtn.addEventListener('click', function () {
            if (repliesContainer.style.display === 'none') {
                repliesContainer.style.display = 'block';
                toggleRepliesBtn.textContent = 'Ocultar respuestas';
            }
            else {
                repliesContainer.style.display = 'none';
                toggleRepliesBtn.textContent = 'Mostrar respuestas';
            }
        });
        // Campo para nueva respuesta
        var replyInput = document.createElement('textarea');
        replyInput.placeholder = 'Escribe una respuesta...';
        replyInput.rows = 2;
        replyInput.style.display = 'none';
        var sendReplyBtn = document.createElement('button');
        sendReplyBtn.textContent = 'Enviar respuesta';
        sendReplyBtn.style.display = 'none';
        // Mostrar campo al hacer clic en "Responder"
        replyButton.addEventListener('click', function () {
            replyInput.style.display = 'block';
            sendReplyBtn.style.display = 'inline-block';
        });
        // Lógica para agregar respuesta
        sendReplyBtn.addEventListener('click', function () {
            var replyText = replyInput.value.trim();
            if (replyText) {
                var reply = new Twist(replyText);
                _this.replies.push(reply);
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
    };
    return Twist;
}());
publishBtn.addEventListener('click', function () {
    var content = twistInput.value.trim();
    if (content) {
        var newTwist = new Twist(content);
        twistThread.appendChild(newTwist.render());
        twistInput.value = '';
    }
});
