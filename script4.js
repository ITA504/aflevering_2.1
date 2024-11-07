/* Jeg ville gerne lave en tabel med dataen fra albums.json,
med en knap der kunne vise tracklisten.
Så jeg undersøgte hvordan man kunne gøre dette. */

/* Først fetcher vi dataen fra json filen,
så forklarer jeg maskinen at det er jason data og
så får jeg det logget i consollen
for at se om det virker.
*/

fetch('albums.json')
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);

/* Så laver jeg derefter nogle objekter
og bruger DOM-manipulation til at
lave websiden.
Her tager jeg fat på en div som ligger i min html fil,
den har jeg kaldt content,
og skaber så et table inde i den div */

    const tableContainer = document.getElementById('content');
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

/* Nu laver jeg så nogle titler til mine table headers.
Dette skriver jeg ind i et array.
Også her har jeg brugt create.element til at skabe en tableheader.
Jeg laver en ekstra colonne end jeg egentlig skal bruge,
så der kan blive plads til en knap senere.
Her begynder jeg at bruge appendChild, så den tilføjer headersne */

    ['Kunstner', 'Album', 'Udgivelsesår', 'Artistens hjemmeside', 'Trackliste'].forEach(function(headerText) {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });
    table.appendChild(headerRow);

/* Her skaber jeg så selve rækkerne og smider dataen ind.
Her har jeg været inde i json filen og set hvad
de forskellige kategorier hed.
Jeg har sørget for at det bliver smidt ind i samme rækkefølge,
som jeg har lavet titler til mine headers. */

    data.forEach(function(album) {
        const row = document.createElement('tr');
        ['artistName', 'albumName', 'productionYear', 'artistWebsite'].forEach(function(key) {
            const cell = document.createElement('td');
            cell.textContent = album[key];
            row.appendChild(cell);
        });

/* Her laver jeg en ekstra celle som indeholder en knap,
hvorpå der vil stå "Vis numre".
Jeg bruger getElementById til at fortælle hvor boksen skal poppe op.
Bruger event listener til at gøre den clickbar.
Her vælger vi også at der skal ske noget i en anden div
som jeg har kaldt tracklisteContainer.
Jeg bruger innerHTML med et tomt feldt for,
at der ikke kommer flere tracklister oven i hinanden. */

 const buttonCell = document.createElement('td');
    const button = document.createElement('button');
    button.textContent = 'Vis numre';
    button.addEventListener('click', function() {
        const tracklisteContainer = document.getElementById('tracklisteContainer');
        tracklisteContainer.innerHTML = '';

/* Her indsætter vi selve tracklisten og indexerer den,
så alle sangene får et nummer.
Dette vil blive lavet som en liste inden i den nye div.
*/

        album.trackList.forEach(function(track, index) {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${track.trackTitle}`;
            tracklisteContainer.appendChild(li);
        });
    });

/* Koden herunder sørger for at det ovenstående rent
faktisk kommer op på min html side. */

    buttonCell.appendChild(button);
    row.appendChild(buttonCell);

        table.appendChild(row);
    });

    tableContainer.appendChild(table);
})

/* Skulle det utænkelige ske at der opstod en fejl i indhentningen af data,
vil der i consollen komme en fejlmelding.
Her er der brugt => istedet for function. */
.catch(error => console.error('Error fetching data:', error));


