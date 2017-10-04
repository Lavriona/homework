const fs   = require('fs');
const path = require('path');

const homework = './hlam';
const ext      = '.css';
const combine  = 'app.css';

const streamWrite = fs.createWriteStream(combine);
let stream;

fs.readdir(homework).forEach(file => {
    if (path.extname(file) === ext){
        stream = fs.createReadStream(homework+'/'+file);
        stream.pipe(streamWrite,{end:false});

    }    
});

stream.on('end',() => {
    streamWrite.end('JoyCasino.com');   
});
