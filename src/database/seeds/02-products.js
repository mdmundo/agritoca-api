exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          ncm: '02032100',
          measure: 'KG',
          description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
          is_organic: false
        },
        {
          ncm: '02032200',
          measure: 'KG',
          description: 'PERNA E PEDAÇO Ñ DESOS. SUÍNOS, CONGELADOS',
          is_organic: false
        },
        {
          ncm: '02032900',
          measure: 'KG',
          description: 'OUTRAS CARNES DE SUÍNO,CONGELADAS',
          is_organic: false
        },
        {
          ncm: '02041000',
          measure: 'KG',
          description: 'CARCS.E MEIAS-CARCS D/CORDEIRO,FRESC.,REFR.',
          is_organic: false
        },
        {
          ncm: '02042100',
          measure: 'KG',
          description: 'CARCS.E MEIAS-CARCS.DE OVINOS,FRESC.REFRIG.',
          is_organic: false
        },
        {
          ncm: '02042200',
          measure: 'KG',
          description: 'OUTRAS PEÇAS Ñ DESOSS.D/OVINOS,FRESC.REFR.',
          is_organic: false
        },
        {
          ncm: '02042300',
          measure: 'KG',
          description: 'PÇS DESOSSADAS D/OVINOS,FRESCAS OU REFRIG.',
          is_organic: false
        },
        {
          ncm: '02043000',
          measure: 'KG',
          description: 'CARCS. E MEIAS-CARCS. DE CORDEIRO,CONG.',
          is_organic: false
        },
        {
          ncm: '02044100',
          measure: 'KG',
          description: 'CARCS. E MEIAS-CARCS. OUTS.OVINOS,CONG.',
          is_organic: false
        },
        {
          ncm: '02044200',
          measure: 'KG',
          description: 'OUTS.PÇS NÃO DESOSS.DE OVINOS,CONGELADAS',
          is_organic: false
        },
        {
          ncm: '02044300',
          measure: 'KG',
          description: 'PEÇAS DESOSSADAS DE OVINOS,CONGELADAS',
          is_organic: false
        },
        {
          ncm: '02045000',
          measure: 'KG',
          description: 'CARNES DE CAPRINOS,FRESC.,REFRIG.OU CONG.',
          is_organic: false
        },
        {
          ncm: '02050000',
          measure: 'KG',
          description: 'CARNE CAVALO,ASININA,MUAR,FRESC.REF.,CONG.',
          is_organic: false
        },
        {
          ncm: '02061000',
          measure: 'KG',
          description: 'MIUDEZAS DE BOVINOS,FRESCAS/REFRIGERADAS',
          is_organic: false
        },
        {
          ncm: '02062100',
          measure: 'KG',
          description: 'LÍNGUAS DE BOVINOS CONGELADAS',
          is_organic: false
        },
        {
          ncm: '02062200',
          measure: 'KG',
          description: 'FÍGADOS DE BOVINOS CONGELADOS',
          is_organic: false
        },
        {
          ncm: '02062910',
          measure: 'KG',
          description: 'RABOS DE BOVINOS CONGELADOS',
          is_organic: false
        },
        {
          ncm: '02062990',
          measure: 'KG',
          description: 'OUTRAS MIUDEZAS COMESTÍVEIS., D/BOVINO,CONG.',
          is_organic: false
        },
        {
          ncm: '02063000',
          measure: 'KG',
          description: 'MIUDEZAS DA ESPÉCIE SUÍNA FRESCAS OU REFR.',
          is_organic: false
        },
        {
          ncm: '02064100',
          measure: 'KG',
          description: 'FÍGADOS DE SUÍNOS, CONGELADOS',
          is_organic: false
        }
      ]);
    });
};
