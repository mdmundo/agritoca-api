exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_data')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users_data').insert([
        {
          name: 'Edmundo',
          email: 'teverett@msn.com',
          picture:
            'https://s.gravatar.com/avatar/f573cc50e19283110a74db7f4a8bafb8?s=96&d=retro',
          //  password: 'Qqk}X%CPuDte5jw]'
          password:
            '$2a$08$enm3hUVi4nIIKD2dxh2h8emSFvclh6qIaDQgcMPq29GtR07ShTUgu'
        },
        {
          name: 'James',
          email: 'mbrown@msn.com',
          picture:
            'https://s.gravatar.com/avatar/9418cf81ace4c8a471af4172001cc958?s=96&d=retro',
          //  password: 's4L}J(n&[5*y7Z_+'
          password:
            '$2a$08$DdvKh8kc6NK7OtGqoApojua4m5UrJZwN.pGOBbN/TvvdHWcfCW0XO'
        },
        {
          name: 'Stewart',
          email: 'heckerman@aol.com',
          picture:
            'https://s.gravatar.com/avatar/440c551982b4d71250bb1eed6324836f?s=96&d=retro',
          //  password: 'd?285[%4XnC=sNv3'
          password:
            '$2a$08$.AKXgvgRh3h0muSE/uHOO.tjeliyPj3.zs49XXMXk7jC0PAnggREe'
        },
        {
          name: 'Luís',
          email: 'tattooman@me.com',
          picture:
            'https://s.gravatar.com/avatar/fe5683e4a03bf6767e0b71470baf0dcd?s=96&d=retro',
          //  password: 'q=^5YgNZ?vmBAPKM'
          password:
            '$2a$08$nyOlG1jKgtx5VL1cvDMm4uvGujSXJpW5T5gh5bH.rmHjNcw4UAzLu'
        },
        {
          name: 'Damas',
          email: 'mbswan@me.com',
          picture:
            'https://s.gravatar.com/avatar/0fe88c8fb067972b303a8dd61f8dc5ce?s=96&d=retro',
          //  password: 'mKeEpdzs67yxC(/*'
          password:
            '$2a$08$lXAowFKYynjXBrMKDOEeR.TSJkt.GSLJ.9/RSWgu.Nn74ZkQOXZt2'
        },
        {
          name: 'Fedeli',
          email: 'ardagna@aol.com',
          picture:
            'https://s.gravatar.com/avatar/62182d01e55b4eb837e2b9eb5fef5410?s=96&d=retro',
          //  password: 'YPSst/bh_=g5)ycv'
          password:
            '$2a$08$Y/UJ9hb0BO9pvVPX2yGdB.xpUmGxm.49INkVfu0S0cm75N9G2J5M.'
        },
        {
          name: 'Polloni',
          email: 'malin@live.com',
          picture:
            'https://s.gravatar.com/avatar/aee06ee04313c8ccc8b6a1d389916bc2?s=96&d=retro',
          //  password: 'YjDrnHgz65Wu=3>8'
          password:
            '$2a$08$hQYkc0iQGC7Toz.REJ4MLunCdeJ4foMtbNUU5NtCDnG82W1VW5J6i'
        },
        {
          name: 'Peres',
          email: 'magusnet@sbcglobal.net',
          picture:
            'https://s.gravatar.com/avatar/b4f886c65e8cc79a0dbb4fa11b7f2b57?s=96&d=retro',
          //  password: 'T*]F!38%Eej94HZm'
          password:
            '$2a$08$uPrFsvl7QlxtWC6z97NGk.Yu9Cn0eOvNDX/P/FMFP18SUzg.HgT36'
        },
        {
          name: 'Newton',
          email: 'phish@optonline.net',
          picture:
            'https://s.gravatar.com/avatar/761b9d7f608e7987f160391d893cb410?s=96&d=retro',
          //  password: '.SW&kG(]/K[8>w7$'
          password:
            '$2a$08$RX3AMm1Ur5Q0hROm37j30Od9gpjHGYhtef0W8ZbkcJp/G82SdBgyi'
        },
        {
          name: 'José',
          email: 'rmcfarla@yahoo.ca',
          picture:
            'https://s.gravatar.com/avatar/eb1842899353f24d269f3991b426061e?s=96&d=retro',
          //  password: 'r5Z*a+j/P=Kg)WQM'
          password:
            '$2a$08$z.azDxeVDu87nCwmVvC4fec8Uag9AsohUApK9RQQhUh5Fkn0Gdbz6'
        },
        {
          name: 'Vieira',
          email: 'greear@live.com',
          picture:
            'https://s.gravatar.com/avatar/23067fff8b777dd7eb7f6fd7536b0704?s=96&d=retro',
          //  password: 'pRz6bPs!*Ze{-AUV'
          password:
            '$2a$08$jRydvqb0C2UkAHQqBjiMSu.1K1PXSCQscvHRngwHs3NHH3r6XJrbe'
        },
        {
          name: 'Tenenbaun',
          email: 'errxn@comcast.net',
          picture:
            'https://s.gravatar.com/avatar/74ebaf9d02e808276372b267c123a260?s=96&d=retro',
          //  password: 'C5JZ(BEjy?a*_x]q'
          password:
            '$2a$08$9MdPuSBTrxQv.NmUDrwm2ek9dsxD0QtcSNM/wQvmxIW0aVaHNcxru'
        },
        {
          name: 'Langsam',
          email: 'jugalator@icloud.com',
          picture:
            'https://s.gravatar.com/avatar/aecbb5fe9c5944be9527d9054dc64f63?s=96&d=retro',
          //  password: 'M9aSqjsB!TD8mgv='
          password:
            '$2a$08$3ql6QVlMew0nTY2rT1p91.8Zva.3UPtb0oR04tzxDRFsgQVv3yTPq'
        },
        {
          name: 'Augenstein',
          email: 'qrczak@outlook.com',
          picture:
            'https://s.gravatar.com/avatar/8ee2f8233ee9ac37af29f1655863626c?s=96&d=retro',
          //  password: '2dYWH)*!&}[jtJ%{'
          password:
            '$2a$08$TuueWHXqbW5m40uFYQfihupMFIoFRZ8e4vM7/lsvOyWWaQEXN3LXy'
        },
        {
          name: 'Leon',
          email: 'jramio@outlook.com',
          picture:
            'https://s.gravatar.com/avatar/d685e576556e503c3ca97f19e48d9040?s=96&d=retro',
          //  password: 'c8p})D!yJ.b%?jPa'
          password:
            '$2a$08$m8jhbDASaS5QSVvB6jSBjO87LqXKBuQ8l3dIVOT5RGrd/UDjWVqte'
        },
        {
          name: 'Moysés',
          email: 'catalog@sbcglobal.net',
          picture:
            'https://s.gravatar.com/avatar/5f0770ae865258f38351940a8fb03f1b?s=96&d=retro',
          //  password: 'GyT.h2wQ?6pNRx5n'
          password:
            '$2a$08$ZX/.Zx0lNeC0gJ9dQ3y0jOcpk5olbxhWfGyczfiLnqWVYdgCPrtO6'
        },
        {
          name: 'Nussenzveig',
          email: 'dhrakar@yahoo.ca',
          picture:
            'https://s.gravatar.com/avatar/254f0e814fef3a813cf2581147ee6e16?s=96&d=retro',
          //  password: 'Vz82*9^%gEv@A=b$'
          password:
            '$2a$08$Lc60zY5w2q4kkMGnalORqeIcJxErA42NsGDUPqHgeFWa5p7qkz9vy'
        },
        {
          name: 'Resnick',
          email: 'shaffei@mac.com',
          picture:
            'https://s.gravatar.com/avatar/457e05ded2ce000f8819a281a16f1f8d?s=96&d=retro',
          //  password: 'Sk/=H(BwM2)-Kadr'
          password:
            '$2a$08$hc4sdeaqrn81UFyF7SEz1uEMXwUdrM7RN.RGro14GNS18fEI159Su'
        },
        {
          name: 'Halliday',
          email: 'parrt@live.com',
          picture:
            'https://s.gravatar.com/avatar/8d9f400fbdf2d2e4bade91f23ceebd8b?s=96&d=retro',
          //  password: 'QH2+@-M!>Yv/sXb?'
          password:
            '$2a$08$dvH6kruRthCKQJPwEBtSReKf5r.ONzWv/tvr3/UgdYgWDpIgeJ2iC'
        },
        {
          name: 'Thomson',
          email: 'keijser@gmail.com',
          picture:
            'https://s.gravatar.com/avatar/0af128c3c0007ac74a8c40b0dd11ffa1?s=96&d=retro',
          //  password: '{ekR}s2m3D.-)G64'
          password:
            '$2a$08$I6ALju6/peLogziWH35./.KA.kWVyw9Q.4lu53pRMRictdf/7XRWy'
        }
      ]);
    });
};
