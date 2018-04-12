var db = firebase.database().ref().child("Testes");
var email = sessionStorage.getItem('email');
var acertos = 0;
var nivel = '';


(function () {
    var __acertos = 0;
    var __nivel = '';
    var __email = '';
    var index = 0;
    db.once("value").then(snap => {
        snap.forEach(snapChild => {
            index = 0;
            snapChild.forEach(snapGrandChild => {
                index++;
                if (index === 1) {
                    acertos = snapGrandChild._e.T;
                }
                else if (index === 3) {
                    nivel = snapGrandChild._e.T;
                }
                else if (index === 2) {
                    email = snapGrandChild._e.T;
                }
            });
            if (__email === email) {
                acertos = __acertos;
                nivel = __nivel;
            }
        });
    });
})();