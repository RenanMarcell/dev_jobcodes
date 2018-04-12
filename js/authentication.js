const auth = firebase.auth();

if (auth.currentUser) {
    sessionStorage.setItem('email', auth.currentUser.email)
} else {
    window.location.replace('https://renanmarcell.github.io/dev_jobcodes/index.html');
}

$('#logout').click(function(){
    auth().signOut();
    window.location.replace('https://renanmarcell.github.io/dev_jobcodes/index.html');
});
