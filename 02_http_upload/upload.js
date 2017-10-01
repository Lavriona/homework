const http = require('http');
const fs   = require('fs');
const port = 3000;

const server = http.createServer( (req, res) => {
    const fileStream = fs.createWriteStream('copy_users.csv');
    let responseTxt;
    let data;
    const reg = /(^(\-)+(WebKit)(.*))|((.*)(text\/csv)$)|(^(Content)(.*))/gm;

    if (req.method == 'POST'){
        if (req.headers['content-type'] == 'multipart/form-data'){
            let i = 0; data = '';
            req.on('data',(chunk) => {
                data += chunk;
            });
        }
    } else {
        responseTxt = 'There is nothing to upload!';
    }

    req.on('end', () => {
        let titles  = [];
        let obj     = [];
        data = data.replace(reg,'').trim();
        data.split('\n').forEach((item, key) => {
            let users = {};
            item = item.split(',');    
            item.forEach((value, index) => {
                if ( key == 0 ){
                    titles.push(value.trim());
                } else {
                    users[titles[index]] = value;
                }
            });
            if (key > 0)
                obj.push(users);
        });
        responseTxt = JSON.stringify(obj);
        fileStream.write(data);
        fileStream.end();        
        res.write(responseTxt);
        res.end();
    });
});

server.listen(port, 'localhost',() => {
    console.log(`server listen on port ${port}`);
});

