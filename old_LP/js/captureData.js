var ip = '';
$.getJSON('//ipinfo.io/json', function(data) {
    ip = JSON.parse(JSON.stringify(data, null, 2));
});


function adicionaDados(event) {
    event.preventDefault();
    if (ip !== '') {
        ip = ip['ip'] || '';
    }
    var data = new Date();
    data = `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()} ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    let typeLead = $('input[name=escolhaLEAD]:checked', '#form-id').val();
    let hadProblems = $('input[name=problema2]:checked', '#form-id').val();
    let problem3 = $("#Q3A1")[0].value;
    let problem4 = $("#Q4A1")[0].value;
    let problem5 = $("#Q5A1")[0].value;
    let nome = $("#nome")[0].value;
    let email = $("#email")[0].value;
    var db = firebase.database();
    var object = {
        name: nome,
        email: email,
        ip: ip,
        horario: data,
        answers: {
            answer1: typeLead,
            answer2: hadProblems,
            answer3: problem3,
            answer4: problem4,
            answer5: problem5
        }
    };
    if (typeLead === 'desenvolvedor'){
        db.ref('/B2C/').push(object);
        $('#button-submit').prop('disabled', true);
        $('.onSuccess').css('display', 'block');
    } else {
        db.ref('/B2B/').push(object);
        $('#button-submit').prop('disabled', true);
        $('.onSuccess').css('display', 'block');
    }
}