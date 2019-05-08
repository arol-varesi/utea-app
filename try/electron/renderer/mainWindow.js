'use strict';

// const sqlite = require('sqlite3');
// const typeorm = require('typeorm');
// const { createConnection, getRepository } = typeorm;

const mainProcess = require('electron').remote.require('../main/main')


function menuHome() {
    mainProcess.openMainWindow();
}


function menuSimboli() {
    mainProcess.openSimboliWindow();
}

function menuComponenti() {
    mainProcess.openComponentiWindow();
}

function menuComponentiQ() {
    mainProcess.openComponentiQWindow();
}

function menuTestQuasar() {
    mainProcess.openTestQuasarWindow();
}


