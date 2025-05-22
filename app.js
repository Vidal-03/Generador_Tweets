var formulario = document.getElementById('formulario');
var input = document.getElementById('twistInput');
var twistsDiv = document.getElementById('twists');
formulario.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (text) {
        publicarTwist({ text: text, timestamp: new Date() });
        input.value = '';
    }
});
function publicarTwist(twist) {
    var div = document.createElement('div');
    div.className = 'twist';
    div.textContent = "".concat(twist.text, " - ").concat(twist.timestamp.toLocaleTimeString());
    twistsDiv.prepend(div);
}
