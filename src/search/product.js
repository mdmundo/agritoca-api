const products = [
  {
    id: 1,
    ncm: '02032100',
    measure: 'UN',
    description: 'CARCS. E MEIAS-CARCS. DE SUÍNOS, CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 2,
    ncm: '02032200',
    measure: 'KG',
    description: 'PERNA E PEDAÇO Ñ DESOS. SUÍNOS, CONGELADOS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 3,
    ncm: '02032900',
    measure: 'KG',
    description: 'OUTRAS CARNES DE SUÍNO,CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 4,
    ncm: '02041000',
    measure: 'KG',
    description: 'CARCS.E MEIAS-CARCS D/CORDEIRO,FRESC.,REFR.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 5,
    ncm: '02042100',
    measure: 'KG',
    description: 'CARCS.E MEIAS-CARCS.DE OVINOS,FRESC.REFRIG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 6,
    ncm: '02042200',
    measure: 'KG',
    description: 'OUTRAS PEÇAS Ñ DESOSS.D/OVINOS,FRESC.REFR.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 7,
    ncm: '02042300',
    measure: 'KG',
    description: 'PÇS DESOSSADAS D/OVINOS,FRESCAS OU REFRIG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 8,
    ncm: '02043000',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. DE CORDEIRO,CONG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 9,
    ncm: '02044100',
    measure: 'KG',
    description: 'CARCS. E MEIAS-CARCS. OUTS.OVINOS,CONG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 10,
    ncm: '02044200',
    measure: 'KG',
    description: 'OUTS.PÇS NÃO DESOSS.DE OVINOS,CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 11,
    ncm: '02044300',
    measure: 'KG',
    description: 'PEÇAS DESOSSADAS DE OVINOS,CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 12,
    ncm: '02045000',
    measure: 'KG',
    description: 'CARNES DE CAPRINOS,FRESC.,REFRIG.OU CONG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 13,
    ncm: '02050000',
    measure: 'KG',
    description: 'CARNE CAVALO,ASININA,MUAR,FRESC.REF.,CONG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 14,
    ncm: '02061000',
    measure: 'KG',
    description: 'MIUDEZAS DE BOVINOS,FRESCAS/REFRIGERADAS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 15,
    ncm: '02062100',
    measure: 'KG',
    description: 'LÍNGUAS DE BOVINOS CONGELADAS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 16,
    ncm: '02062200',
    measure: 'KG',
    description: 'FÍGADOS DE BOVINOS CONGELADOS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 17,
    ncm: '02062910',
    measure: 'KG',
    description: 'RABOS DE BOVINOS CONGELADOS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 18,
    ncm: '02062990',
    measure: 'KG',
    description: 'OUTRAS MIUDEZAS COMESTÍVEIS., D/BOVINO,CONG.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 19,
    ncm: '02063000',
    measure: 'KG',
    description: 'MIUDEZAS DA ESPÉCIE SUÍNA FRESCAS OU REFR.',
    is_organic: false,
    mod: 'mbrown@msn.com'
  },
  {
    id: 20,
    ncm: '02064100',
    measure: 'KG',
    description: 'FÍGADOS DE SUÍNOS, CONGELADOS',
    is_organic: false,
    mod: 'mbrown@msn.com'
  }
];

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  keys: ['ncm', 'description']
};

const Fuse = require('fuse.js');
const fuse = new Fuse(products, options);

// Change the pattern
const pattern = 'carcs';

const result = fuse.search(pattern);

console.log(result.map(({ item }) => ({ ...item })));
