let todos = [];

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// === 0. HALAMAN AWAL ===
function mulai() {
  console.log('== SELAMAT DATANG DI TO DO HARY300 ==');
  console.log('== INI ADALAH HALAMAN AWAL ==');

  console.log(`
== DAFTAR TODO CLI COMMANDS ==  
menu       : halaman awal
add        : tambah todo baru
list       : lihat semua todo
done       : tandai todo selesai
undone     : tandai todo belum selesai
delete     : hapus todo
exit       : keluar program
    `);

  tanya();
}

mulai();

// === 1. MULAI TANYA ===
function tanya() {
  rl.question('Pilih command: ', (answer) => {
    const input = answer.trim().toLowerCase();
    if (input === 'menu') {
      mulai();
    } else if (input === 'add') {
      addTodo();
    } else if (input === 'list') {
      listTodo();
    } else if (input === 'done') {
      doneTodo();
    } else if (input === 'undone') {
      unDoneTodo();
    } else if (input === 'delete') {
      deleteTodo();
    } else if (input === 'exit') {
      closeTodo();
    } else {
      console.log('==================================');
      console.log(`
        `);
      console.log('PESAN: Command salah!!');
      console.log(`
        `);
      console.log('==================================');
      tanya();
    }
  });
}

// === 2. CLOSE TODO ===
function closeTodo() {
  console.log('PESAN: Sampai Jumpa');
  rl.close();
}

// === 3. ADD TODO ===
function addTodo() {
  rl.question('Masukan todo (ketik n untuk selesai): ', (answer) => {
    const input = answer.trim();

    if (input === 'exit') return closeTodo();

    if (input === 'n') {
      return listTodo();
    }

    if (input === '') {
      console.log('==================================');
      console.log(`
        `);
      console.log(`PESAN: Input tidak boleh kosong!!`);
      console.log(`
        `);
      console.log('==================================');
      addTodo();
    } else {
      let obj = {
        text: input,
        done: false,
      };
      todos.push(obj);
    }

    return addTodo();
  });
}

// === 4. LIST TODO ===
function listTodo() {
  console.log('==================================');
  console.log('== INI ADALAH HALAMAN LIST TODO ==');
  console.log('List Todo Kamu: ');
  if (todos.length === 0) {
    console.log(`
      `);
    console.log('*******************************');
    console.log('PESAN: Daftar todo masih kosong');
    console.log('*******************************');
    console.log(`
      `);
  } else {
    for (let i = 0; i < todos.length; i++) {
      const number = i + 1;
      const done = todos[i].done ? '[x]' : '[ ]';
      const text = todos[i].text;
      console.log(`${number}. ${done} ${text}`);
    }
  }
  console.log('==================================');

  return tanya();
}

// === 5. DONE TODO ===
function doneTodo() {
  if (todos.length === 0) {
    console.log(`
      `);
    console.log('*******************************');
    console.log('PESAN: Daftar todo masih kosong');
    console.log('*******************************');
    console.log(`
      `);

    return tanya();
  }

  rl.question('Masukan number todo untuk ditandai selesai: ', (answer) => {
    const input = answer.trim();

    if (input === 'exit') return closeTodo();

    const number = Number(input);
    if (isNaN(number)) {
      console.log('==================================');
      console.log(`
        `);
      console.log('PESAN: number todo tidak valid');
      console.log(`
        `);
      console.log('==================================');
      return doneTodo();
    }

    const index = number - 1;
    if (todos[index] === undefined) {
      console.log('==================================');
      console.log(`
        `);
      console.log(`PESAN: tidak ada todo nomer ${number}`);
      console.log(`
        `);
      console.log('==================================');
      return doneTodo();
    }

    todos[index].done = true;
    console.log('==================================');
    console.log(`
        `);
    console.log(`PESAN: todo ${number} ditandai selesai`);
    console.log(`
        `);
    console.log('==================================');
    return listTodo();
  });
}

// === 6. UNDONE TODO ===
function unDoneTodo() {
  if (todos.length === 0) {
    console.log(`
      `);
    console.log('*******************************');
    console.log('PESAN: Daftar todo masih kosong');
    console.log('*******************************');
    console.log(`
      `);

    return tanya();
  }

  rl.question(
    'Masukan number todo untuk ditandai belum selesai: ',
    (answer) => {
      const input = answer.trim();
      if (input === 'exit') return closeTodo();

      const number = Number(input);
      if (isNaN(number)) {
        console.log('==================================');
        console.log(`
        `);
        console.log('PESAN: number todo tidak valid');
        console.log(`
        `);
        console.log('==================================');
        return doneTodo();
      }

      const index = number - 1;
      if (todos[index] === undefined) {
        console.log('==================================');
        console.log(`
        `);
        console.log(`PESAN: tidak ada todo nomer ${number}`);
        console.log(`
        `);
        console.log('==================================');
        return doneTodo();
      }

      todos[index].done = false;
      console.log('==================================');
      console.log(`
        `);
      console.log(`PESAN: todo ${number} ditandai belum selesai`);
      console.log(`
        `);
      console.log('==================================');
      return listTodo();
    }
  );
}

// === 7. DELETE TODO ===
function deleteTodo() {
  if (todos.length === 0) {
    console.log(`
      `);
    console.log('*******************************');
    console.log('PESAN: Daftar todo masih kosong');
    console.log('*******************************');
    console.log(`
      `);

    return tanya();
  }

  rl.question('Masukan nomor todo yang akan dihapus?', (answer) => {
    const number = Number(answer.trim());

    if (isNaN(number)) {
      console.log('==================================');
      console.log(`
        `);
      console.log('PESAN: number todo tidak valid');
      console.log(`
        `);
      console.log('==================================');
      return deleteTodo();
    }

    const index = number - 1;
    if (todos[index] === undefined) {
      console.log('==================================');
      console.log(`
        `);
      console.log(`PESAN: tidak ada todo nomer ${number}`);
      console.log(`
        `);
      console.log('==================================');
      return deleteTodo();
    }

    function confirmation() {
      rl.question(`yakin hapus todo ${number}? (y/n)`, (answer) => {
        const input = answer.trim().toLowerCase();
        if (input === 'y') {
          todos.splice(index, 1);
          console.log('==================================');
          console.log(`
        `);
          console.log(`PESAN: todo ${number} sudah dihapus`);
          console.log(`
        `);
          console.log('==================================');
          return listTodo();
        } else if (input === 'n') {
          sure = false;
          return listTodo();
        } else {
          console.log('==================================');
          console.log(`
        `);
          console.log(`PESAN: input salah!!`);
          console.log(`
        `);
          console.log('==================================');
          return confirmation();
        }
      });
    }

    confirmation();
  });
}
