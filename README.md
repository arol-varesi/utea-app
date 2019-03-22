# utea-app

## Operazioni da eseguire al momento del clone
Appena scaricato i sorgenti tramite operazione di "clone" del repository GIT sarà necessario effettuare l'installazione di tutti i moduli node.js necessari.

```
npm install
```

## Note per l'utilizzo di SQLite con Electron
SQLite non è un modulo nativo node.js per cui questo modulo viene scaricato come eseguibile precompilato per la piattaforma durante la fase di `npm install` 

Purtroppo il modulo precompilato è precompilato per poter funzionare con Node.js, ma non funziona con Electron. Per poter funzionare occorre effettuare una ricompilazione tramite il comando seguente:

```
npm run rebuild
```


## Note per l'utilizzo in Windows
Purtroppo la compilazione del modulo SQLite difficilmente andra a termine correttamente sotto piattaforma Windows. Questo perchè, mentre nei sistemi operativi a base Un*x sono praticamente sempre presenti tutti gli strumenti necessari per la compilazione. 
Questo è tutt'altro che vero per quanto riguarda il sistema operativo di Microsoft.

Sarà quindi necessario predisporre il sistema operativo con tutti gli strumenti corretti.

### Installazione dei "windows-build-tools"
Tramite il comando seguente verranno installati Python e gli trumenti di compilazione di "Visual Studio"

```
npm install -r windows-build-tools
```
Questa operazione a volte non viene completata correttamente al primo colpo. Siccome viene richiesta una installazione parallela di più pacchetti, il sistema operativo di Microsoft a volte si rifiuta di cooperare e manda in timeout una parte dell'installazione.

In questi casi occorre ripetere il comando precedente con fiducia e ottimismo...

Purtroppo la semplice operazione di installazione non è sufficiente per poter permettere la compilazione del modulo SQLite. Occcorre agire direttamente sulla configurazione del sistema Visual Studio ed attivare l'aggiunta di un pacchetto di compilazione ulteriore. 

Seguire i seguenti passi:

1. Posizionarsi in "C:\Programmi (x86)\Microsoft Visual Studio\Installer\ e lanciare **vs_installer.exe**
2. Selezionare "Modifica" nella sezione _Visual Studio Build Tools 2017_
3. Selezionare la voce "VC++ 2015.3 v14.00 (v140) toolset for desktop" dal menù che si presenta sulla destra

Alla fine dell'installazione riavviare il computer

A questo punto dovrebbe essere possibile dare il comando

```
npm run rebuild
```
e ottenere una corretta compilazione.