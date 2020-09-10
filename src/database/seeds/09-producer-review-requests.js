exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('producer_review_requests')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('producer_review_requests').insert([
        {
          producer_id: 1,
          cpf: '02058263027',
          cnpj: '71227067602028',
          name: 'VILLAGEVILLAGE',
          whatsapp: '7679385618429',
          address: '27179787, St. Pilotnictate, Honolulu, Hawaii',
          ie: '56661939718',
          im: '37511604854',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 2,
          cpf: '91777787842',
          cnpj: '25792379874307',
          name: 'VPFAST',
          whatsapp: '8357301146897',
          address: '73179165, St. Domsustain, Scottsdale, Arizona',
          ie: '23135210058',
          im: '16694539905',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 3,
          cpf: '04743640044',
          cnpj: '50499229629653',
          name: 'LANDMATTER',
          whatsapp: '2243550947881',
          address: '45858473, St. steamdote On, Raleigh, North Carolina',
          ie: '17317540145',
          im: '47077944158',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 4,
          cpf: '05384009852',
          cnpj: '76720982948140',
          name: 'JAYEDU',
          whatsapp: '9389934592138',
          address: '92426216, St. Tigodsend, New York, New York',
          ie: '46886436420',
          im: '78111491604',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 5,
          cpf: '61630631082',
          cnpj: '05567207187474',
          name: 'CAMERAAUTO',
          whatsapp: '8089569002976',
          address: '18211170, St. Luckycherish, Indianapolis, Indiana',
          ie: '93097316395',
          im: '05447479784',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 6,
          cpf: '08029291708',
          cnpj: '57187694666518',
          name: 'INTRALV',
          whatsapp: '7731829630557',
          address: '32640553, St. Hbpopular, Atlanta, Georgia',
          ie: '55442561352',
          im: '48819495528',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 7,
          cpf: '99792215734',
          cnpj: '21593888328565',
          name: 'BEAUTYCATERING',
          whatsapp: '9896570027845',
          address: '16764476, St. Corbeckons, Madison, Wisconsin',
          ie: '62879671956',
          im: '98101142463',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 8,
          cpf: '16392760699',
          cnpj: '29493632372758',
          name: 'MEDBUYERS',
          whatsapp: '9372910781372',
          address: '68932792, St. Asiaatingle, Seattle, Washington',
          ie: '83723774436',
          im: '09932951746',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 9,
          cpf: '51212082573',
          cnpj: '89447787163079',
          name: 'PERSONALSCOPE',
          whatsapp: '2339153220084',
          address: '72769808, St. Sirgrandee, Milwaukee, Wisconsin',
          ie: '82662219005',
          im: '78908086430',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 10,
          cpf: '14632694080',
          cnpj: '28512981837768',
          name: 'MACHINEMARINE',
          whatsapp: '3271099316057',
          address: '99836122, St. Alabamaplanner, Santa Ana, California',
          ie: '01396952569',
          im: '58877700672',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 11,
          cpf: '63680159357',
          cnpj: '03541132590161',
          name: 'TENBOYS',
          whatsapp: '9427594558482',
          address: '73806699, St. Retirementawesome, Durham, North Carolina',
          ie: '03366037537',
          im: '92002195323',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 12,
          cpf: '42921910324',
          cnpj: '85720370429283',
          name: 'PUPPYMOVIES',
          whatsapp: '7045546787565',
          address: '57508398, St. Islandlargess, Lincoln, Nebraska',
          ie: '75098369692',
          im: '85870844345',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 13,
          cpf: '07835062500',
          cnpj: '51994506277254',
          name: 'AWCHART',
          whatsapp: '3187482792091',
          address: '16721125, St. Novotickled, Oklahoma City, Oklahoma',
          ie: '24160588027',
          im: '60704152266',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 14,
          cpf: '68838507486',
          cnpj: '85633332576298',
          name: 'EVOLUTIONBENCH',
          whatsapp: '0285456104082',
          address: '85093321, St. Ngflatter, Charlotte, North Carolina',
          ie: '08003118606',
          im: '86742064462',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 15,
          cpf: '50251373913',
          cnpj: '48333577324668',
          name: 'DIYBLACK',
          whatsapp: '4161504430488',
          address: '49321896, St. Snapgrowing, Miami, Florida',
          ie: '02110809804',
          im: '49835263541',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 16,
          cpf: '35929284684',
          cnpj: '83750301464528',
          name: 'ORTHOPOSTER',
          whatsapp: '8009592005753',
          address: '15282542, St. Totalexample, Minneapolis, Minnesota',
          ie: '16556206311',
          im: '47824829348',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 17,
          cpf: '07331894376',
          cnpj: '43951999222395',
          name: 'MEDIALION',
          whatsapp: '7442038908407',
          address: '12707245, St. Antiquetubular, Tucson, Arizona',
          ie: '91432720967',
          im: '31820859874',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 18,
          cpf: '73411328484',
          cnpj: '67411758659326',
          name: 'DARKTRAX',
          whatsapp: '3812541085552',
          address: '17395042, St. Jayoneness, Tampa, Florida',
          ie: '87961430997',
          im: '82621512933',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 19,
          cpf: '36996032857',
          cnpj: '67392921288109',
          name: 'COSMICSOCCER',
          whatsapp: '9061811475620',
          address: '62449262, St. Supportcaptain, Dallas, Texas',
          ie: '35868664121',
          im: '93777153724',
          upserter: 'heckerman@aol.com'
        },
        {
          producer_id: 20,
          cpf: '16103057649',
          cnpj: '17692815698975',
          name: 'CTFORGE',
          whatsapp: '0225758786893',
          address: '19546512, St. Mondomaximal, Virginia Beach, Virginia',
          ie: '81871078024',
          im: '69681926440',
          upserter: 'heckerman@aol.com'
        }
      ]);
    });
};
