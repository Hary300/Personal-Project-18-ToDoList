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
        const number = i + 1;
        const status = todos[i].done ? '[x]' : '[ ]';
        const textTodo = todos[i].text;
        console.log(`${number}. ${status} ${textTodo}`);
      }
      rl.close();
      return;
    }

    if (input === '') {
      console.log('Todo tidak boleh kosong');
    } else {
      let objInput = {
        text: input,
        done: false,
      };

      todos.push(objInput);
    }

    tanya();
  });
}

tanya();
