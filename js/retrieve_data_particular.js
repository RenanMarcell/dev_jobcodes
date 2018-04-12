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
                    __acertos = snapGrandChild._e.T;
                }
                else if (index === 3) {
                    __nivel = snapGrandChild._e.T;
                }
                else if (index === 2) {
                    __email = snapGrandChild._e.T;
                }
            });
            if (__email === email) {
                acertos = __acertos;
                nivel = __nivel;
            }
        });

        document.querySelector('#answers-qtd').innerHTML = ((acertos).toString() + '/11');
        document.querySelector('#dev-level').innerHTML = 'Nível ' + nivel;
    });
})();