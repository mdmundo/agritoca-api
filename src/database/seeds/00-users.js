const bcrypt = require('bcryptjs');

const users = [
  {
    email: 'teverett@msn.com',
    password: 'Qqk}X%CPuDte5jw]',
    is_admin: true
  },
  {
    email: 'mbrown@msn.com',
    password: 's4L}J(n&[5*y7Z_+',
    is_mod: true
  },
  {
    email: 'heckerman@aol.com',
    password: 'd?285[%4XnC=sNv3'
  },
  {
    email: 'tattooman@me.com',
    password: 'q=^5YgNZ?vmBAPKM'
  },
  {
    email: 'mbswan@me.com',
    password: 'mKeEpdzs67yxC(/*'
  },
  {
    email: 'ardagna@aol.com',
    password: 'YPSst/bh_=g5)ycv'
  },
  {
    email: 'malin@live.com',
    password: 'YjDrnHgz65Wu=3>8'
  },
  {
    email: 'magusnet@sbcglobal.net',
    password: 'T*]F!38%Eej94HZm'
  },
  {
    email: 'phish@optonline.net',
    password: '.SW&kG(]/K[8>w7$'
  },
  {
    email: 'rmcfarla@yahoo.ca',
    password: 'r5Z*a+j/P=Kg)WQM'
  },
  {
    email: 'greear@live.com',
    password: 'pRz6bPs!*Ze{-AUV'
  },
  {
    email: 'errxn@comcast.net',
    password: 'C5JZ(BEjy?a*_x]q'
  },
  {
    email: 'jugalator@icloud.com',
    password: 'M9aSqjsB!TD8mgv='
  },
  {
    email: 'qrczak@outlook.com',
    password: '2dYWH)*!&}[jtJ%{'
  },
  {
    email: 'jramio@outlook.com',
    password: 'c8p})D!yJ.b%?jPa'
  },
  {
    email: 'catalog@sbcglobal.net',
    password: 'GyT.h2wQ?6pNRx5n'
  },
  {
    email: 'dhrakar@yahoo.ca',
    password: 'Vz82*9^%gEv@A=b$'
  },
  {
    email: 'shaffei@mac.com',
    password: 'Sk/=H(BwM2)-Kadr'
  },
  {
    email: 'parrt@live.com',
    password: 'QH2+@-M!>Yv/sXb?'
  },
  {
    email: 'keijser@gmail.com',
    password: '{ekR}s2m3D.-)G64'
  }
];

const usersHashedPasswords = users.map((user) => {
  const password = bcrypt.hashSync(user.password, 8);
  return { ...user, password };
});

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(usersHashedPasswords);
    });
};
