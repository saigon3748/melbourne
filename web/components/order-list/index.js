import fs from 'fs';
import controller from './controller.js';

const template = fs.readFileSync(__dirname + '/template.html', 'utf8');

export default {
  controller: controller,
  template: template
}
