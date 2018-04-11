var db = firebase.database().ref().child("Perguntas");

var perguntas = [];
var alternativas = [];
var _____a = [];
var r = [];
var remaining_questions = [];

(function () {
    var index = 0;
    db.once("value").then(snap => {
        snap.forEach(snapChild => {
            index = 0;
            snapChild.forEach(snapGrandChild => {
                index++;
                if (index === 3) {
                    _____a.push(snapGrandChild._e.T);
                }
                else if (index === 2) {
                    perguntas.push(snapGrandChild._e.T);
                }
                snapGrandChild.forEach(snapW => {
                    alternativas.push(snapW._e.T);
                })
            })
        });
        remaining_questions = create_dinamic_div();
    });
    setTimeout( () => {
        alert("Tempo esgotado");
        sessionStorage.setItem('Nivel', 'Esgotado');

    }, 600000);
    setTimeout( () => {
        alert("Resta 1 minuto");
    }, 540000);
    setTimeout( () => {
        alert("Restam 5 minutos");
    }, 300000);
})();

function create_dinamic_div() {
    var i = 0;
    var divs = [];
    while (perguntas.length > 0) {
        var first_div = document.createElement("div");
        first_div.classList.add('form-group');
        first_div.id = 'pergunta' + (i+1);
        var question = document.createElement('h3');
        question.innerHTML = perguntas.shift();
        first_div.appendChild(question);
        for (var j = 0; j < 4; j++) {
            var form_div = document.createElement("div");
            form_div.classList.add('form-check');
            var input = document.createElement('input');
            input.type = 'radio';
            input.required = true;
            input.classList.add('form-check-input');
            input.name = 'pergunta' + (i + 1);
            input.id = 'pergunta' + (i + 1) + 'resposta' + (j + 1);
            input.value = String((j + 1));
            var label = document.createElement('label');
            label.innerText = alternativas.shift();
            label.for = 'pergunta' + (i + 1) + 'resposta' + (j + 1);
            form_div.appendChild(input);
            form_div.appendChild(label);
            first_div.appendChild(form_div);
        }
        i++;
        divs.push(first_div);
    }
    return divs;
}

$('#Form').submit(function() {
    r.push($('#Form input:checked').val());
    if (remaining_questions.length) {
        $('.form-group').fadeOut(() => {
            $('.form-group').remove();
            document.querySelector('#Form').insertBefore(remaining_questions.shift(), document.querySelector('#submit-button'));
        })
    } else {
        var years = r.shift();
        var correct_answers = count(r, _____a);
        if (years == 1 && correct_answers > 8 ) {
            sessionStorage.setItem('Nivel', 'Junior');
        } else if (years == 1) {
            sessionStorage.setItem('Nivel', 'Estagiario');
        } else if (years == 2 && correct_answers < 8) {
            sessionStorage.setItem('Nivel', 'Junior');
        } else if (years == 2 && correct_answers != 11) {
            sessionStorage.setItem('Nivel', 'Pleno');
        } else if (years == 2) {
            sessionStorage.setItem('Nivel', 'Senior');
        } else if (years == 3 && correct_answers < 6) {
            sessionStorage.setItem('Nivel', 'Pleno');
        } else if (years == 3) {
            sessionStorage.setItem('Nivel', 'Senior');
        } else if (years == 4 && correct_answers < 5) {
            sessionStorage.setItem('Nivel', 'Pleno');
        } else {
            sessionStorage.setItem('Nivel', 'Senior');
        }
        db = firebase.database().ref('/Testes/').push({
            Acertos: correct_answers,
            email: 'oi'
        });
        window.location.replace('https://renanmarcell.github.io/dev_jobcodes/result.html');
    }
    return false;
});

function count(respostas, gabarito){
    var i = 0;
    var corretas = 0;
    for (i; i < respostas.length; i++){
        if (respostas[i] == gabarito[i]) corretas += 1;
    }
    return corretas;
}