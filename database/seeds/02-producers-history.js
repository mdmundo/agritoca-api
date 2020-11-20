const Hashids = require('hashids/cjs');
const hashids = new Hashids('agritoca-api', 6);

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('producers_history')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('producers_history').insert([
        {
          producer_id: 1,
          cpf: '55770485267',
          cnpj: '58949864147992',
          name: 'Eco Focus',
          whatsapp: '5595956384129',
          address: '27179787, St. Gkznepnw, Honolulu, Hawaii',
          ie: '44864122407',
          im: '38848818893',
          hash: hashids.encode(1),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 2,
          cpf: '58408183924',
          cnpj: '22119070331300',
          name: 'Innovation Arch',
          whatsapp: '5595955227627',
          address: '73179165, St. Yhtdcvsa, Scottsdale, Arizona',
          ie: '19099526129',
          im: '50704096269',
          hash: hashids.encode(2),
          mod: 'manyymoore@gmail.com',
          owner: 'james@example.com'
        },
        {
          producer_id: 3,
          cpf: '38974781506',
          cnpj: '35464159252107',
          name: 'Strat Security',
          whatsapp: '5595959593088',
          address: '45858473, St. Wkwogsam, Raleigh, North Carolina',
          ie: '17776956765',
          im: '96235711237',
          hash: hashids.encode(3),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 4,
          cpf: '92181668643',
          cnpj: '50041373236014',
          name: 'Inspire Fitness Co',
          whatsapp: '5595956674450',
          address: '92426216, St. Kwyomanm, New York, New York',
          ie: '14744493884',
          im: '21683115232',
          hash: hashids.encode(4),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 5,
          cpf: '86226334399',
          cnpj: '50372070705304',
          name: 'Candor Corp',
          whatsapp: '5595957821621',
          address: '18211170, St. Xfmkqlxi, Indianapolis, Indiana',
          ie: '78874500591',
          im: '38248919167',
          hash: hashids.encode(5),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 6,
          cpf: '77437360988',
          cnpj: '54360364472698',
          name: 'Cogent Data',
          whatsapp: '5595957267039',
          address: '32640553, St. Bmsayvrn, Atlanta, Georgia',
          ie: '20928197584',
          im: '74980564457',
          hash: hashids.encode(6),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 7,
          cpf: '28909142661',
          cnpj: '27906099532396',
          name: 'Epic Adventure Inc',
          whatsapp: '5595958057758',
          address: '16764476, St. Moljwqqi, Madison, Wisconsin',
          ie: '94311000308',
          im: '08070598636',
          hash: hashids.encode(7),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 8,
          cpf: '60765009646',
          cnpj: '82976584538295',
          name: 'Sanguine Skincare',
          whatsapp: '5595952768184',
          address: '68932792, St. Fforktfw, Seattle, Washington',
          ie: '59029973536',
          im: '81424199717',
          hash: hashids.encode(8),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 9,
          cpf: '65826300394',
          cnpj: '56933766068066',
          name: 'Vortex Solar',
          whatsapp: '5595950635037',
          address: '72769808, St. Bljqdkvk, Milwaukee, Wisconsin',
          ie: '16643116209',
          im: '53486629390',
          hash: hashids.encode(9),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 10,
          cpf: '15626951765',
          cnpj: '64077160895835',
          name: 'Admire Arts',
          whatsapp: '5595954723760',
          address: '99836122, St. Zjaejgqp, Santa Ana, California',
          ie: '52015084540',
          im: '39959644806',
          hash: hashids.encode(10),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 11,
          cpf: '38893571718',
          cnpj: '79933330101190',
          name: 'Bravura Inc',
          whatsapp: '5595952820251',
          address: '73806699, St. Tczmetye, Durham, North Carolina',
          ie: '39920322917',
          im: '80547195480',
          hash: hashids.encode(11),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 12,
          cpf: '40596387711',
          cnpj: '19262900902370',
          name: 'Bonefete Fun',
          whatsapp: '5595953275899',
          address: '57508398, St. Tzlmnzyd, Lincoln, Nebraska',
          ie: '33929541670',
          im: '02770378666',
          hash: hashids.encode(12),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 13,
          cpf: '94438077409',
          cnpj: '24409532967634',
          name: 'Moxie Marketing',
          whatsapp: '5595958050003',
          address: '16721125, St. Xobqmcfx, Oklahoma City, Oklahoma',
          ie: '37735057157',
          im: '15392318534',
          hash: hashids.encode(13),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 14,
          cpf: '56111597364',
          cnpj: '82130378155338',
          name: 'Zeal Wheels',
          whatsapp: '5595957575112',
          address: '85093321, St. Zgvfxyfg, Charlotte, North Carolina',
          ie: '81476471192',
          im: '85690257755',
          hash: hashids.encode(14),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 15,
          cpf: '80224842883',
          cnpj: '14418305245805',
          name: 'Obelus Concepts',
          whatsapp: '5595957682143',
          address: '49321896, St. Yzovymks, Miami, Florida',
          ie: '54160950179',
          im: '61766332694',
          hash: hashids.encode(15),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 16,
          cpf: '02722506915',
          cnpj: '20223805285527',
          name: 'Quad Goals',
          whatsapp: '5595954817265',
          address: '15282542, St. Pppdrbgm, Minneapolis, Minnesota',
          ie: '60722342250',
          im: '87666412212',
          hash: hashids.encode(16),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 17,
          cpf: '29573972188',
          cnpj: '08348158844317',
          name: 'Erudite Learning',
          whatsapp: '5595959622669',
          address: '12707245, St. Pxrophrx, Tucson, Arizona',
          ie: '04680523280',
          im: '86057279614',
          hash: hashids.encode(17),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 18,
          cpf: '16733758935',
          cnpj: '72913846795926',
          name: 'Cipher Publishing',
          whatsapp: '5595954056491',
          address: '17395042, St. Gawazqhx, Tampa, Florida',
          ie: '58816193310',
          im: '92051616549',
          hash: hashids.encode(18),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 19,
          cpf: '35144193557',
          cnpj: '51259627264860',
          name: 'Flux Water Gear',
          whatsapp: '5595952286062',
          address: '62449262, St. Fsmhoryb, Dallas, Texas',
          ie: '50249724720',
          im: '93276065905',
          hash: hashids.encode(19),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        },
        {
          producer_id: 20,
          cpf: '88770452070',
          cnpj: '68893557966613',
          name: 'Lambent Illumination',
          whatsapp: '5595956626327',
          address: '19546512, St. Pvloqgen, Virginia Beach, Virginia',
          ie: '13902142292',
          im: '45809714080',
          hash: hashids.encode(20),
          mod: 'manyymoore@gmail.com',
          owner: 'manyymoore@gmail.com'
        }
      ]);
    });
};
