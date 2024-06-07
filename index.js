import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

/*
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

inquirer
  .prompt([
    {
      message: 'Type in your URL: ',
      name: 'URL',
    },
  ])
  .then((answer) => {
    const url = answer.URL;
    const qrPng = qr.image(url, { type: 'png' });
    qrPng.pipe(fs.createWriteStream('qr_image.png'));

    fs.writeFile('./URL.txt', url, (err) => {
      if (err) throw err;
      console.log('QR has been saved!');
    });
  })
  .catch((err) => {
    console.log(err);
  });
