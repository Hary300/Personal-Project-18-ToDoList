# flow

## 1. Membuat program mampu berinteraksi dengan user

Menggunakan: `readline`

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

⚠️ Note: Belum ada validasi input

## 2. Validasi input kosong

Case: input kosong (user langsung tekan enter)
Method pendukung: `trim()`

```js
let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Masukan todo: ', (answer) => {
  const input = answer.trim();

  // Validate input (empty or not?)
  if (input === '') {
    console.log('=== Todo tidak boleh kosong ===');
  } else {
    todos.push(answer);
  }

  rl.close();
});
```

⚠️ Note: Hanya bisa nambah satu todo

## 3. Input banyak todo dan exit

Ide:
Input banyak:

1. Masukan kedalam function
2. Menggunakan recursion (panggil functionnya berkali/loop)

Exit:

1. jika input kata exit
2. tampilkan salam penutup

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    // exit
    if (input === 'exit') {
      console.log('Sampai Jumpa');
      rl.close();
      return;
    }

    // Validate input (empty or not?)
    if (answer.trim() === '') {
      console.log('=== Todo tidak boleh kosong ===');
    } else {
      todos.push(answer);
    }

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```

⚠️ Note: Setiap todo belum mempunyai status

## 4. Menambah tempat untuk status todo

Ide:

- simpan todo dari user dalam bentuk object
- setiap todo mempunyai properti `done: false`
- push object ke array todo

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // exit
    if (input === 'exit') {
      console.log('Sampai Jumpa');
      rl.close();
      return;
    }

    // Validate input (empty or not?)
    if (input === '') {
      console.log('Todo tidak boleh kosong');
    } else {
      // todo object
      let objInput = {
        text: input,
        done: false,
      };
      todos.push(objInput);
    }

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```

⚠️ Note: Belum bisa menampilkan list todo

## 5. Menampilkan list todo

Ide:

1. jika input kata list
2. tampilkan seluruh list todo menggunakan loop

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();
    // Exit
    // ...

    // List
    if (input === 'list') {
      console.log('Todo List:');
      for (let i = 0; i < todos.length; i++) {
        const number = i + 1;
        const status = todos[i].done ? '[x]' : '[ ]';
        const textTodo = todos[i].text;
        console.log(`${number}. ${status} ${textTodo}`);
      }
      tanya();
      return;
    }

    // Validate input (empty or not?)
    // ...

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```

⚠️ Note: Belum bisa ubah status todo

## 6. Ubah status todo jadi done

Ide:

1. jika input kata done + (angka)
2. ubah status todo sesuai angka jadi [x]

cara kerja:

1. gunakan `startsWith()`
2. ambil nomor setelah kata done
3. jika bukan nomor, tampilkan pesan
4. jika todo dengan index sesuai input tidak ada, tampilkan pesan
5. jika todo sudah ditandai done, tampilkan pesan
6. jika semua kondisi tidak terpenuhi, ganti status dan tampilkan pesan

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // exit
    // ...

    // List
    // ...

    // Mark todo done
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
        console.log(`=== Todo ${number} sudah selesai ===`);
        tanya();
        return;
      }

      todos[index].done = true;
      console.log(`=== Todo ${number} sudah ditandai selesai ===`);
      tanya();
      return;
    }

    // Validate input (empty or not?)
    // ...

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```

⚠️ Note: Belum bisa delete todo

## 7. Delete todo

Ide:

1. jika input kata delete + (angka)
2. hilangkan todo dari aray todos
3. method pendukung: `splice(a, b)`
4. a = index mulai delete
5. b = jumlah element yang mau didelet mulai dari a

cara kerja:

1. gunakan `startsWith()`
2. ambil nomor setelah kata done
3. jika bukan nomor, tampilkan pesan
4. jika todo dengan index sesuai input tidak ada, tampilkan pesan
5. jika semua kondisi tidak terpenuhi, delete element dan tampilkan pesan

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // Exit
    // ...

    // List
    // ...

    // Mark todo done
    //  ...

    // Delete todo
    if (input.startsWith('delete')) {
      const number = Number(input.slice(6).trim());

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

      todos.splice(index, 1);
      console.log(`=== Todo ${number} sudah dihapus ===`);
      tanya();
      return;
    }

    // Validate input (empty or not?)
    // ...

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```

⚠️ Note: User belum tau command apa aja yang bisa dipilih

## 8. Help

Ide:

1. jika input kata help
2. tampilkan pesan

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // Exit
    // ...

    // List
    // ...

    // Help
    if (input === 'help') {
      console.log(`
    === TODO CLI COMMANDS ===
add todo        : tambah todo baru
done (angka)    : tandai todo selesai
delete (angka)  : hapus todo
list            : lihat semua todo
exit            : keluar program
help            : lihat bantuan
        `);

      tanya();
      return;
    }

    // Mark todo done
    //  ...

    // Delete todo
    // ...

    // Validate input (empty or not?)
    // ...

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```

⚠️ Note: User belum bisa ubah status jadi undone

## 9. Ubah status todo jadi undone

Ide:

1. jika input kata undone + (angka)
2. ubah status todo sesuai angka jadi [ ]

cara kerja:

1. gunakan `startsWith()`
2. ambil nomor setelah kata undone
3. jika bukan nomor, tampilkan pesan
4. jika todo dengan index sesuai input tidak ada, tampilkan pesan
5. jika todo sudah ditandai undone, tampilkan pesan
6. jika semua kondisi tidak terpenuhi, ganti status dan tampilkan pesan

```js
function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // Exit
    // ...

    // List
    // ...

    // Help
    //..

    // Mark todo done
    //  ...

    // Mark todo undone
    if (input.startsWith('undone')) {
      const number = Number(input.slice(6).trim());

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

      const isUnDone = todos[index].done;
      if (!isUnDone) {
        console.log(`=== Todo ${number} belum selesai ===`);
        tanya();
        return;
      }

      todos[index].done = false;
      console.log(`=== Todo ${number} sudah ditandai belum selesai ===`);
      tanya();
      return;
    }

    // Delete todo
    // ...

    // Validate input (empty or not?)
    // ...

    // recursion (tanya lagi)
    tanya();
  });
}

tanya();
```
