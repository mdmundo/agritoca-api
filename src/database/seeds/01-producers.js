exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('producers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('producers').insert([
        {
          address: '27179787, St. Gkznepnw, Honolulu, Hawaii',
          CPF: '55770485267',
          CNPJ: '58949864147992',
          name: 'Eco Focus',
          whatsapp: '5595956384129'
        },
        {
          address: '73179165, St. Yhtdcvsa, Scottsdale, Arizona',
          CPF: '58408183924',
          CNPJ: '22119070331300',
          name: 'Innovation Arch',
          whatsapp: '5595955227627'
        },
        {
          address: '45858473, St. Wkwogsam, Raleigh, North Carolina',
          CPF: '38974781506',
          CNPJ: '35464159252107',
          name: 'Strat Security',
          whatsapp: '5595959593088'
        },
        {
          address: '92426216, St. Kwyomanm, New York, New York',
          CPF: '92181668643',
          CNPJ: '50041373236014',
          name: 'Inspire Fitness Co',
          whatsapp: '5595956674450'
        },
        {
          address: '18211170, St. Xfmkqlxi, Indianapolis, Indiana',
          CPF: '86226334399',
          CNPJ: '50372070705304',
          name: 'Candor Corp',
          whatsapp: '5595957821621'
        },
        {
          address: '32640553, St. Bmsayvrn, Atlanta, Georgia',
          CPF: '77437360988',
          CNPJ: '54360364472698',
          name: 'Cogent Data',
          whatsapp: '5595957267039'
        },
        {
          address: '16764476, St. Moljwqqi, Madison, Wisconsin',
          CPF: '28909142661',
          CNPJ: '27906099532396',
          name: 'Epic Adventure Inc',
          whatsapp: '5595958057758'
        },
        {
          address: '68932792, St. Fforktfw, Seattle, Washington',
          CPF: '60765009646',
          CNPJ: '82976584538295',
          name: 'Sanguine Skincare',
          whatsapp: '5595952768184'
        },
        {
          address: '72769808, St. Bljqdkvk, Milwaukee, Wisconsin',
          CPF: '65826300394',
          CNPJ: '56933766068066',
          name: 'Vortex Solar',
          whatsapp: '5595950635037'
        },
        {
          address: '99836122, St. Zjaejgqp, Santa Ana, California',
          CPF: '15626951765',
          CNPJ: '64077160895835',
          name: 'Admire Arts',
          whatsapp: '5595954723760'
        },
        {
          address: '73806699, St. Tczmetye, Durham, North Carolina',
          CPF: '38893571718',
          CNPJ: '79933330101190',
          name: 'Bravura Inc',
          whatsapp: '5595952820251'
        },
        {
          address: '57508398, St. Tzlmnzyd, Lincoln, Nebraska',
          CPF: '40596387711',
          CNPJ: '19262900902370',
          name: 'Bonefete Fun',
          whatsapp: '5595953275899'
        },
        {
          address: '16721125, St. Xobqmcfx, Oklahoma City, Oklahoma',
          CPF: '94438077409',
          CNPJ: '24409532967634',
          name: 'Moxie Marketing',
          whatsapp: '5595958050003'
        },
        {
          address: '85093321, St. Zgvfxyfg, Charlotte, North Carolina',
          CPF: '56111597364',
          CNPJ: '82130378155338',
          name: 'Zeal Wheels',
          whatsapp: '5595957575112'
        },
        {
          address: '49321896, St. Yzovymks, Miami, Florida',
          CPF: '80224842883',
          CNPJ: '14418305245805',
          name: 'Obelus Concepts',
          whatsapp: '5595957682143'
        },
        {
          address: '15282542, St. Pppdrbgm, Minneapolis, Minnesota',
          CPF: '02722506915',
          CNPJ: '20223805285527',
          name: 'Quad Goals',
          whatsapp: '5595954817265'
        },
        {
          address: '12707245, St. Pxrophrx, Tucson, Arizona',
          CPF: '29573972188',
          CNPJ: '08348158844317',
          name: 'Erudite Learning',
          whatsapp: '5595959622669'
        },
        {
          address: '17395042, St. Gawazqhx, Tampa, Florida',
          CPF: '16733758935',
          CNPJ: '72913846795926',
          name: 'Cipher Publishing',
          whatsapp: '5595954056491'
        },
        {
          address: '62449262, St. Fsmhoryb, Dallas, Texas',
          CPF: '35144193557',
          CNPJ: '51259627264860',
          name: 'Flux Water Gear',
          whatsapp: '5595952286062'
        },
        {
          address: '19546512, St. Pvloqgen, Virginia Beach, Virginia',
          CPF: '88770452070',
          CNPJ: '68893557966613',
          name: 'Lambent Illumination',
          whatsapp: '5595956626327'
        }
      ]);
    });
};