# Repository sorgenti per test tecnologici
Nella presente cartella sono raccolti i sorgenti utilizzati per testare il funzionamento delle varie tecnologie utilizzabili per il progetto.

Ogni tecnologia testata è racchiusa inn una ulteriore cartella dedicata e può essere lanciata dalla root tramite il comando

``` bash
npm run 'nome'
```

Di seguito sono elencate le tecnologie presenti.

## CSV
L'esempio consiste in una applicazione che all'inizio presenta una tabella con il contenuto della directory. 

Per ogni file o cartella sono riportate informazioni prelevate tramite funzione specifica della libreria <span style="color:yellow">*fs*</span>, mentre ogni directory è rappresentata in <span style="color:red">rosso</span> con l'evento doppio-click che permette di navigare la cartella.

Se viene trovato un file con estensione **CSV** allora il doppio-click apre una finestra con il contenuto del file inserito in una tabella interattiva. 

Per questa tabella è stata usata l'estensione __datatables.net__

## ORM
Test di utilizzo di database in formato SQLite tramite libreria TypeORM, che permette di utilizzare il database come se fossero classi javascript.

## VUE
Test per l'uso del framework Vue.js

Permette di inserire all'interno del codice html variabili, funzioni, template e form in modo reattivo direttamente collegate a strutture presenti nel codice javascript. 