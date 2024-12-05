/**
 * Created by Ankit Chuahan on 13/01/24
 * File Name: babel.config.js
 * Product Name: WebStorm
 * Project Name: owe_web_app
 * Path: /
 */

module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};
