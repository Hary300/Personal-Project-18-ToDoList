# flow

## 1. Buat readline untuk interaksi dengan user di node JS

### `readline`

```js
// Import readline
const readline = require('readline');

// Create the interface (make the program able to talk to the user)
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask a question
rl.question('What is your name? ', (answer) => {
  console.log(`Hello, ${answer}!`);

  // Always close the interface to avoid memory leaks
  rl.close();
});
```

## 2. Validasi input kosong (jika user langsung tekan enter) menggunakan `trim()`

```js
let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Masukan todo: ', (answer) => {
  if (answer.trim() === '') {
    console.log('Todo tidak boleh kosong');
  } else {
    todos.push(answer);
    console.log('Todo List:');
    for (let i = 0; i < todos.length; i++) {
      console.log(`${i + 1}. ${todos[i]}`);
    }
  }

  rl.close();
});
```

## 3. Bisa input banyak todo menggunakan recursion (panggil functionnya lagi)

```js
let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    if (answer.trim() === 'exit') {
      console.log('Todo List:');
      for (let i = 0; i < todos.length; i++) {
        console.log(`${i + 1}. ${todos[i]}`);
      }
      rl.close();
      return;
    }

    if (answer.trim() === '') {
      console.log('Todo tidak boleh kosong');
    } else {
      todos.push(answer);
    }

    tanya();
  });
}

tanya();
```

## 4. Bisa memberi status dari todo

```js
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
```
