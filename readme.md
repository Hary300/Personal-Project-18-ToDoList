# readline

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

# flow

1. Buat readline untuk interaksi dengan user di node JS
2. Validasi input kosong (jika user langsung tekan enter) menggunakan `trim()`
3. Bisa input banyak todo
