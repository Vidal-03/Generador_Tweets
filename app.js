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
        var contentText = document.createElement('p');
        contentText.textContent = this.content;
        var timestamp = document.createElement('small');
        timestamp.textContent = this.timestamp.toLocaleString();
        var replyButton = document.createElement('button');
        replyButton.textContent = 'Responder';
        replyButton.className = 'reply-button';
        var toggleRepliesBtn = document.createElement('button');
        toggleRepliesBtn.textContent = 'Ocultar respuestas';
        toggleRepliesBtn.className = 'replies-toggle';
        toggleRepliesBtn.style.display = 'none';
        var repliesContainer = document.createElement('div');
        repliesContainer.className = 'replies';
        var replyBox = document.createElement('div');
        replyBox.className = 'reply-box';
        replyBox.style.display = 'none';
        var replyInput = document.createElement('textarea');
        replyInput.rows = 2;
        replyInput.placeholder = 'Escribe una respuesta...';
        var sendReplyBtn = document.createElement('button');
        sendReplyBtn.textContent = 'Enviar';
        sendReplyBtn.className = 'submit-reply';
        replyButton.addEventListener('click', function () {
            replyBox.style.display = replyBox.style.display === 'none' ? 'flex' : 'none';
        });
        toggleRepliesBtn.addEventListener('click', function () {
            var hidden = repliesContainer.style.display === 'none';
            repliesContainer.style.display = hidden ? 'block' : 'none';
            toggleRepliesBtn.textContent = hidden ? 'Ocultar respuestas' : 'Mostrar respuestas';
        });
        sendReplyBtn.addEventListener('click', function () {
            var replyText = replyInput.value.trim();
            if (replyText) {
                var reply = new Twist(replyText);
                _this.replies.push(reply);
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
    };
    return Twist;
}());
publishBtn.addEventListener('click', function () {
    var content = twistInput.value.trim();
    if (content) {
        var newTwist = new Twist(content);
        twistThread.prepend(newTwist.render());
        twistInput.value = '';
    }
});
