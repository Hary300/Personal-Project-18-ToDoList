let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // exit
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

    // check if it's done
    if (input.startsWith('done')) {
      const number = Number(input.slice(4).trim());

      if (isNaN(number)) {
        console.log('=== Nomor todo gak tepat ===');
        tanya();
        return;
      }

      const index = number - 1;
      if (todos[index] === undefined) {
        console.log(`=== Tidak ada todo  ${number} ===`);
        tanya();
        return;
      }

      const isDone = todos[index].done;
      if (isDone) {
        console.log(
          `=== Todo ${number} tidak bisa ditandai lagi karena sudah selesai ===`
        );
        tanya();
        return;
      }

      todos[index].done = true;
      console.log(`=== Todo ${number} sudah ditandai ===`);
      tanya();
      return;
    }

    // empty or not?
    if (input === '') {
      console.log('=== Todo tidak boleh kosong ===');
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
