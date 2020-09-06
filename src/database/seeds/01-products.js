exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        { name: 'Física' },
        { name: 'Básica' },
        { name: 'Álgebra' },
        { name: 'Linear' },
        { name: 'Aplicações' },
        { name: 'Estruturas' },
        { name: 'Dados' },
        { name: 'C' },
        { name: 'Computação' },
        { name: 'Introdução' },
        { name: 'Cálculo' },
        { name: 'Volume' },
        { name: 'Edição' },
        { name: 'Linguagem' },
        { name: 'Décima' },
        { name: 'Máquinas' },
        { name: 'Fundamentos' },
        { name: 'Usando' },
        { name: 'Ciência' },
        { name: 'Mecânica' }
      ]);
    });
};
