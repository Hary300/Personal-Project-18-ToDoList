let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function tanya() {
  rl.question('Masukan todo: ', (answer) => {
    const input = answer.trim();

    // Exit
    if (input === 'exit') {
      console.log('Sampai Jumpa');
      rl.close();
      return;
    }

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
    if (input === '') {
      console.log('=== Todo tidak boleh kosong ===');
    } else {
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
