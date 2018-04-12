const auth = firebase.auth();

auth.onAuthStateChanged(firebaseUser => {
    sessionStorage.setItem('email', firebaseUser.email);
    if (!firebaseUser) {
        window.location.replace('https://renanmarcell.github.io/dev_jobcodes/index.html');
    }
});

$('#logout').click(function(){
    auth().signOut();
    window.location.replace('https://renanmarcell.github.io/dev_jobcodes/index.html');
});
