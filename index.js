import express from 'express'

const app = express();

app.use(express.static('public'));
import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: false }));



 const port = 8000;
app.listen(port, () => {
 console.log(`Server is running at http://localhost:${port}`);
});
