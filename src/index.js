const express = require('express');
const app = express();

app.route('/', (req, res) => {
    res.json({saludar: "holi"});
});

app.listen(8000);
console.log('Server on port 8000');