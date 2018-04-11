const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser=> {
    if (!firebaseUser) {
        window.location.replace('https://renanmarcell.github.io/dev_jobcodes/login.html');
    }
});

$('#logout').click(function(){
    firebase.auth().signOut();
    window.location.replace('https://renanmarcell.github.io/dev_jobcodes/login.html');
});

$('#login').click(function() {
    if (isValid()) {
        const email = $('#EMAIL')[0].value;
        const password = $('#PASSWORD')[0].value;
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.then(user => {
            window.location.replace('https://renanmarcell.github.io/dev_jobcodes/welcome.html')
        });
        promise.catch(e => handleErrors(e));
    }
});

$('#register').click(function() {
    if (isValid()) {
        const email = $('#EMAIL')[0].value;
        const password = $('#PASSWORD')[0].value;

        const promise = auth.createUserWithEmailAndPassword(email, password);
        promise.then(user => {
            window.location.replace('https://renanmarcell.github.io/dev_jobcodes/welcome.html')
        });
        promise.catch(e => handleErrors(e));

    }
});

function showDiv(div, time) {
    div.style.display = 'block';
    div.focus();
    setTimeout(function() {
        div.style.display = 'none'
    }, time);
}

function handleErrors(e) {
    var $failureDiv = document.querySelector('#error-message');
    if (e.message == 'There is no user record corresponding to this identifier. The user may have been deleted.') {
        $failureDiv.innerHTML = "Usuário não cadastrado";
        showDiv($failureDiv, 2000);
    } else if (e.message == "Password should be at least 6 characters") {
        $failureDiv.innerHTML = "Senha deve ser maior que 5 digitos";
        showDiv($failureDiv, 2000);
    } else if (e.message == "The email address is already in use by another account.") {
        $failureDiv.innerHTML = "Email já cadastrado";
        showDiv($failureDiv, 2000);
    } else if (e.message == "The password is invalid or the user does not have a password.") {
        $failureDiv.innerHTML = "Combinação de senha e usuário incorreta";
        showDiv($failureDiv, 2000);
    }
}

function isValid() {
    var email = $('#EMAIL')[0].value;
    var $failureDiv = document.querySelector('#error-message');
    if (email === '' || email.indexOf('.') === -1 || email.indexOf('@') === -1) {
        $failureDiv.innerHTML = "Email inválido";
        showDiv($failureDiv, 2000);
        return false;
    } else {
        return true;
    }
}