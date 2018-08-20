require('dotenv').config()
const express = require('express');
const path = require('path');
const Bootstrap = require('../../infra/bootstrap');
const Database = require('./database');

console.log('Worker running');

new Bootstrap().start();

Database.run();
