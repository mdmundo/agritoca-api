exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'teverett@msn.com',
          //  password: 'Qqk}X%CPuDte5jw]'
          password:
            '$2a$08$enm3hUVi4nIIKD2dxh2h8emSFvclh6qIaDQgcMPq29GtR07ShTUgu',
          is_admin: true
        },
        {
          email: 'mbrown@msn.com',
          //  password: 's4L}J(n&[5*y7Z_+'
          password:
            '$2a$08$DdvKh8kc6NK7OtGqoApojua4m5UrJZwN.pGOBbN/TvvdHWcfCW0XO'
        },
        {
          email: 'heckerman@aol.com',
          //  password: 'd?285[%4XnC=sNv3'
          password:
            '$2a$08$.AKXgvgRh3h0muSE/uHOO.tjeliyPj3.zs49XXMXk7jC0PAnggREe'
        },
        {
          email: 'tattooman@me.com',
          //  password: 'q=^5YgNZ?vmBAPKM'
          password:
            '$2a$08$nyOlG1jKgtx5VL1cvDMm4uvGujSXJpW5T5gh5bH.rmHjNcw4UAzLu'
        },
        {
          email: 'mbswan@me.com',
          //  password: 'mKeEpdzs67yxC(/*'
          password:
            '$2a$08$lXAowFKYynjXBrMKDOEeR.TSJkt.GSLJ.9/RSWgu.Nn74ZkQOXZt2'
        },
        {
          email: 'ardagna@aol.com',
          //  password: 'YPSst/bh_=g5)ycv'
          password:
            '$2a$08$Y/UJ9hb0BO9pvVPX2yGdB.xpUmGxm.49INkVfu0S0cm75N9G2J5M.'
        },
        {
          email: 'malin@live.com',
          //  password: 'YjDrnHgz65Wu=3>8'
          password:
            '$2a$08$hQYkc0iQGC7Toz.REJ4MLunCdeJ4foMtbNUU5NtCDnG82W1VW5J6i'
        },
        {
          email: 'magusnet@sbcglobal.net',
          //  password: 'T*]F!38%Eej94HZm'
          password:
            '$2a$08$uPrFsvl7QlxtWC6z97NGk.Yu9Cn0eOvNDX/P/FMFP18SUzg.HgT36'
        },
        {
          email: 'phish@optonline.net',
          //  password: '.SW&kG(]/K[8>w7$'
          password:
            '$2a$08$RX3AMm1Ur5Q0hROm37j30Od9gpjHGYhtef0W8ZbkcJp/G82SdBgyi'
        },
        {
          email: 'rmcfarla@yahoo.ca',
          //  password: 'r5Z*a+j/P=Kg)WQM'
          password:
            '$2a$08$z.azDxeVDu87nCwmVvC4fec8Uag9AsohUApK9RQQhUh5Fkn0Gdbz6'
        },
        {
          email: 'greear@live.com',
          //  password: 'pRz6bPs!*Ze{-AUV'
          password:
            '$2a$08$jRydvqb0C2UkAHQqBjiMSu.1K1PXSCQscvHRngwHs3NHH3r6XJrbe'
        },
        {
          email: 'errxn@comcast.net',
          //  password: 'C5JZ(BEjy?a*_x]q'
          password:
            '$2a$08$9MdPuSBTrxQv.NmUDrwm2ek9dsxD0QtcSNM/wQvmxIW0aVaHNcxru'
        },
        {
          email: 'jugalator@icloud.com',
          //  password: 'M9aSqjsB!TD8mgv='
          password:
            '$2a$08$3ql6QVlMew0nTY2rT1p91.8Zva.3UPtb0oR04tzxDRFsgQVv3yTPq'
        },
        {
          email: 'qrczak@outlook.com',
          //  password: '2dYWH)*!&}[jtJ%{'
          password:
            '$2a$08$TuueWHXqbW5m40uFYQfihupMFIoFRZ8e4vM7/lsvOyWWaQEXN3LXy'
        },
        {
          email: 'jramio@outlook.com',
          //  password: 'c8p})D!yJ.b%?jPa'
          password:
            '$2a$08$m8jhbDASaS5QSVvB6jSBjO87LqXKBuQ8l3dIVOT5RGrd/UDjWVqte'
        },
        {
          email: 'catalog@sbcglobal.net',
          //  password: 'GyT.h2wQ?6pNRx5n'
          password:
            '$2a$08$ZX/.Zx0lNeC0gJ9dQ3y0jOcpk5olbxhWfGyczfiLnqWVYdgCPrtO6'
        },
        {
          email: 'dhrakar@yahoo.ca',
          //  password: 'Vz82*9^%gEv@A=b$'
          password:
            '$2a$08$Lc60zY5w2q4kkMGnalORqeIcJxErA42NsGDUPqHgeFWa5p7qkz9vy'
        },
        {
          email: 'shaffei@mac.com',
          //  password: 'Sk/=H(BwM2)-Kadr'
          password:
            '$2a$08$hc4sdeaqrn81UFyF7SEz1uEMXwUdrM7RN.RGro14GNS18fEI159Su'
        },
        {
          email: 'parrt@live.com',
          //  password: 'QH2+@-M!>Yv/sXb?'
          password:
            '$2a$08$dvH6kruRthCKQJPwEBtSReKf5r.ONzWv/tvr3/UgdYgWDpIgeJ2iC'
        },
        {
          email: 'keijser@gmail.com',
          //  password: '{ekR}s2m3D.-)G64'
          password:
            '$2a$08$I6ALju6/peLogziWH35./.KA.kWVyw9Q.4lu53pRMRictdf/7XRWy'
        }
      ]);
    });
};
