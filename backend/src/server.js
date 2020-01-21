const app = require('./index');

const port = 3333;

app.listen(port, () => {
  console.log(`Sevidor rodando na porta: ${port}.`);
});
