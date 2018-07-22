require('dotenv').config()
const express = require('express');
const path = require('path');
const Bootstrap = require('../../infra/bootstrap');

new Bootstrap().start();

console.log('Worker running');
