const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

let kontaktit = [
  { id: 1, etunimi: 'Raimo', sukunimi: 'Paananen', numero: '0501231231' },
  { id: 2, etunimi: 'Erkki', sukunimi: 'Esimerkki', numero: '014123123' },
  { id: 3, etunimi: 'Janni', sukunimi: 'Nieminen', numero: '091239292' },
  { id: 4, etunimi: 'Maija', sukunimi: 'Meikäläinen', numero: '0401231232' },
  { id: 5, etunimi: 'Simo', sukunimi: 'Tapio', numero: '0441230202' },
  { id: 6, etunimi: 'Antti', sukunimi: 'Annala', numero: '014123123' },
  { id: 7, etunimi: 'Senni', sukunimi: 'Bern', numero: '091239292' },
  { id: 8, etunimi: 'Tapani', sukunimi: 'Heikkinen', numero: '0401231322' },
  { id: 9, etunimi: 'Terttu', sukunimi: 'Rimpiläinen', numero: '0441232022' },
  { id: 11, etunimi: 'Matti', sukunimi: 'Kekäläinen', numero: '0501231123' },
  { id: 12, etunimi: 'Jaakko', sukunimi: 'Latvala', numero: '0505005000' },
  { id: 13, etunimi: 'Osmo', sukunimi: 'Janhunen', numero: '0400889999' },
  { id: 14, etunimi: 'Satu', sukunimi: 'Niemi', numero: '0400123456' },
  { id: 15, etunimi: 'Timo', sukunimi: 'Olli', numero: '0501234567' },
  { id: 16, etunimi: 'Joonas', sukunimi: 'Uusitalo', numero: '0441234567' },
  { id: 17, etunimi: 'Leena', sukunimi: 'Savioja', numero: '014123456' },
  { id: 18, etunimi: 'Mikko', sukunimi: 'Åström', numero: '0501244231' },
  { id: 19, etunimi: 'Lauri', sukunimi: 'Ihanainen', numero: '014122223' },
  { id: 20, etunimi: 'Seppo', sukunimi: 'Liikanen', numero: '091239992' },
  { id: 21, etunimi: 'Aino', sukunimi: 'Ylitalo', numero: '0401266232' },
  { id: 22, etunimi: 'Maarit', sukunimi: 'Komulainen', numero: '0441255202' },
  { id: 23, etunimi: 'Saija', sukunimi: 'Turunen', numero: '0400400400' },
  { id: 24, etunimi: 'Jaana', sukunimi: 'Vatanen', numero: '0505005000' },
  { id: 25, etunimi: 'Arto', sukunimi: 'Häkkinen', numero: '041233569' },
  { id: 26, etunimi: 'Ilari', sukunimi: 'Viikki', numero: '0441239512' },
  { id: 27, etunimi: 'Mirva', sukunimi: 'Paakkanen', numero: '0400233566' },
  { id: 28, etunimi: 'Reino', sukunimi: 'Pulkkinen', numero: '0500988655' },
  { id: 29, etunimi: 'Raija', sukunimi: 'Janhunen', numero: '06123987' },
  { id: 30, etunimi: 'Terhi', sukunimi: 'Alakylä', numero: '09987654' },
];

app.get('/', (request, response) => {
  response.send('<h1>SERVERI</h1>');
});

app.get('/api/kontaktit', (request, response) => {
  response.json(kontaktit);
});

app.post('/api/kontaktit', (request, response) => {
  const body = request.body;
  let lastElement;
  let idOfNewContact;
  if (kontaktit.length < 1) {
    idOfNewContact = 1;
  }
  if (kontaktit.length > 0) {
    lastElement = kontaktit[kontaktit.length - 1];
    idOfNewContact = lastElement.id + 1;
  }

  kontaktit.push({ id: idOfNewContact, ...body });
  kontaktit = kontaktit;
  response.json('Kontakti lisätty');
});

app.delete('/api/kontaktit/:id', (request, response) => {
  const kontaktitKopio = [...kontaktit];
  const poistettavaId = request.params.id;
  const poistettavaElementti = kontaktitKopio.indexOf(
    kontaktitKopio.find((kontakti) => kontakti.id === Number(poistettavaId))
  );
  kontaktitKopio.splice(poistettavaElementti, 1);
  kontaktit = [...kontaktitKopio];
  response.json('Kontakti poistettu');
});

app.put('/api/kontaktit/:id', (request, response) => {
  const kontaktitKopio = [...kontaktit];
  const paivitettavaId = request.params.id;
  const paivitettavaElementti = kontaktitKopio.indexOf(
    kontaktitKopio.find((kontakti) => kontakti.id === Number(paivitettavaId))
  );
  kontaktitKopio[paivitettavaElementti].etunimi = request.body.data.etunimi;
  kontaktitKopio[paivitettavaElementti].sukunimi = request.body.data.sukunimi;
  kontaktitKopio[paivitettavaElementti].numero = request.body.data.numero;
  kontaktit = [...kontaktitKopio];
  response.json(kontaktit);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
