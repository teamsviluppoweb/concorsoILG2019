

/**
 * To get started install
 * express bodyparser jsonwebtoken express-jwt
 * via npm
 * command :-
 * npm install express bodyparser jsonwebtoken express-jwt --save
 */

// Bringing all the dependencies in
const express = require('express');
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const get = require('simple-get')

var expiresIn = 30000;
// Instantiating the express app
const app = express();
  
   var data = {
    domanda: {
        id: '1',
        idDomanda: '1',
        versione: 1,
        stato: 1,
        istanzaJSON: '',
        dataInvio: '12/12/1995',
        dataModifica: '12/12/1995',
        anagCandidato: {
            codiceFiscale: 'TRTRRERERRE',
            cognome: 'Turturica',
            nome: 'Robert',
            dataNascita: '02/12/1995',
            comuneNascita: {
                codice: 'H501',
                nome: 'Roma',
                codiceProvincia: 'RM'
            },
            residenza: 'Roma',
            telefono: '1111',
            email: 'mail@me.com'
        },
        titoloStudioPosseduto: {
            tipologia: {
                id: '',
                desc: ''
            },
            titolo:  {
                id: '',
                desc: ''
            },
            indirizzo: null,
            dataConseguimento: null,
            istituto: null,
            luogoIstituto: null,
            indirizzoIstituto: null,
        },
        lingua: null,
        lstRiserve: [],
        lstTitoliPreferenziali: [],
        numeroFigli: 0,
        invaliditaCivile: null,
    },
     errore: 'no',
     operazione: 0
   }
   
   

// See the react auth blog in which cors is required for access
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    next();
});

// Setting up bodyParser to use json and set it to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// INstantiating the express-jwt middleware
const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


// MOCKING DB just for test
let users = [
    {
        id: 1,
        username: 'demo',
        password: 'demo'
    }
];

// LOGIN ROUTE
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Use your DB ORM logic here to find user and compare password
    for (let user of users) { // I am using a simple array users which i made above
        if (username == user.username && password == user.password /* Use your password hash checking logic here !*/) {
            //If all credentials are correct do this
            let token = jwt.sign({ id: user.id, username: user.username }, 'keyboard cat 4 ever', { expiresIn }); // Sigining the token
            res.json({
                sucess: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
});

app.get('/GetDomanda', jwtMW /* Using the express jwt MW here */, (req, res) => {
    
    res.send(data); //Sending some response when authenticated
});

app.post('/SalvaDomanda', jwtMW /* Using the express jwt MW here */, (req, res) => {
    data.domanda = req.body;
    data.operazione = 1;
    console.log(data);
    res.json({
        sucess: true,
    });});

app.get('/TitoliPreferenziali', jwtMW /* Using the express jwt MW here */, (req, res) => {
    let titoli = [
        {
            id: '1',
            descrizione: 'Titolo 1',
        },
        {
            id: '2',
            descrizione: 'Titolo 2',
        },
        {
            id: 17,
            descrizione: 'Titolo 3',
        }
    ]
    res.send(titoli);
});

app.get('/Riserve', jwtMW /* Using the express jwt MW here */, (req, res) => {
    let riserve = [
        {
            id: '1',
            descrizione: 'Riserva 1',
        },
        {
            id: '2',
            descrizione: 'Riserva 2',
        },
        {
            id: '3',
            descrizione: 'Riserva 3',
        }
    ]
    res.send(riserve);
});

app.get('/Lingue', jwtMW /* Using the express jwt MW here */, (req, res) => {
    let riserve = [
        {
            id: '1',
            descrizione: 'Inglese',
        },
        {
            id: '2',
            descrizione: 'Francese',
        },
        {
            id: '3',
            descrizione: 'Spagnolo',
        },
        {
            id: '4',
            descrizione: 'Tedesco',
        }
    ]
    res.send(riserve);
});

app.get('/Province', jwtMW /* Using the express jwt MW here */, (req, res) => {
    let province = [
        {
            codice: '1',
            nome: ' Alessandria',
        },
        {
            codice: '2',
            nome: ' Ancona',
        },
        {
            codice: '3',
            nome: 'Roma',
        }
    ]
    res.send(province);
});

app.get('/Province/:id', jwtMW /* Using the express jwt MW here */, (req, res) => {
    const alessandria = [ {codice: '11', nome: 'Alessandria', codiceProvincia: 'LO'}, {codice: '21', nome: 'Novi Ligure', codiceProvincia: 'LO'}, {codice: '31', nome  : 'Predosa', codiceProvincia: 'LO'}];
    const ancona = [ {codice: '12', nome: 'Ancona', codiceProvincia: 'LO'}, {codice: '22', nome: 'Senigallia', codiceProvincia: 'LO'}, {codice: '32', nome  : 'Jesi', codiceProvincia: 'LO'}];
    const roma = [ {codice: '13', nome: 'Roma', codiceProvincia: 'LO'}, {codice: '23', nome: 'Pomezia', codiceProvincia: 'LO'}, {codice: '33', nome  : 'Ciampino', codiceProvincia: 'LO'}];

    console.log(req.params.id);
    switch(req.params.id) {
        case '1':  res.send(alessandria); break;
        case '2':  res.send(ancona); break;
        case '3':  res.send(roma); break;
        default: res.send(roma); break;
    }

});

app.get('/TitoliStudio/Tipologie', jwtMW /* Using the express jwt MW here */, (req, res) => {
    let tipologie = [
        {
            id: '1',
            desc: 'Testo 1',
        }
    ]
    res.send(tipologie);
});

app.get('/TitoliStudio/titoli/:id', jwtMW /* Using the express jwt MW here */, (req, res) => {
    
    let titoli = [ {id: 1, desc: 'titolo 1'}, {id: '2', desc: 'END'} ];

    switch(req.params.id) {
        case '1': res.send(titoli); break;
        case '2': res.send([]); break;
    }
});

app.get('/TitoliStudio/indirizzi/:id', jwtMW /* Using the express jwt MW here */, (req, res) => {
    
    let indirizzi = [ {id: 1, desc: 'indirizzo 1'}, {id: 2, desc: 'END'}, {id: "341", desc: 'ALTRO'}];

    if(req.params.id === '2') {
        res.send([]);
    } 
    if(req.params.id === 'undefined') {
        res.send([]);
    }
    else {
        res.send(indirizzi);
    }

});

app.get('/info', jwtMW /* Using the express jwt MW here */, (req, res) => {
    let infoConcorso = {
        nomeConcorso: 'Mock',
        titoloConcorso: 'Concorso Mock',
        dataInizioDomanda: '02/12/1995',
        dataFineDomanda: '02/12/1995',
        dataFineConcorso: '02/12/1995'
    };

    res.send(infoConcorso);
});




// Error handling
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { // Send the error rather than to show it on the console
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

// Starting the app on PORT 3000
const PORT = 8080;
app.listen(PORT, '192.168.1.152', () => {
    // eslint-disable-next-line
    console.log(`Magic happens on port ${PORT}`);
});
