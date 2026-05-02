let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    if (input === 'exit') {
      console.log('Todo List:');
      for (let i = 0; i < todos.length; i++) {
        console.log(`${i + 1}. ${todos[i]}`);
      }
      rl.close();
      return;
    }

    if (input === '') {
      console.log('Todo tidak boleh kosong');
    } else {
      todos.push(input);
    }

    tanya();
  });
}

tanya();
