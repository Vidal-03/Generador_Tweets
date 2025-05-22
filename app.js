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
            var replyContent = replyInput.value.trim();
            if (replyContent !== '') {
                var reply = new Twist(replyContent);
                _this.replies.push(reply);
                repliesContainer.appendChild(reply.render());
                replyInput.value = '';
            }
        });
        // Armar el twist
        twistElement.appendChild(contentText);
        twistElement.appendChild(replyButton);
        twistElement.appendChild(replyInput);
        twistElement.appendChild(sendReplyBtn);
        twistElement.appendChild(repliesContainer);
        return twistElement;
    };
    return Twist;
}());
var twists = [];
publishBtn.addEventListener('click', function () {
    var content = twistInput.value.trim();
    if (content !== '') {
        var newTwist = new Twist(content);
        twists.push(newTwist);
        twistThread.appendChild(newTwist.render());
        twistInput.value = '';
    }
});
