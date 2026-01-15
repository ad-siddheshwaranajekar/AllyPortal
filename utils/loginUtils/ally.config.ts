export const allyConfig = {
  QAT: {
    baseUrl: 'https://ally.qat.anddone.com',
    users: {
      A: {
        userEnv: 'ALLY_QAT_USER_A',
        passEnv: 'ALLY_QAT_PASS_A',
        storageState: 'state/qat-userA.json',
      },
      B: {
        userEnv: 'ALLY_QAT_USER_B',
        passEnv: 'ALLY_QAT_PASS_B',
        storageState: 'state/qat-userB.json',
      },
      C: {  
        userEnv: 'ALLY_QAT_USER_C',
        passEnv: 'ALLY_QAT_PASS_C',
        storageState: 'state/qat-userC.json',
      },
      D: {
        userEnv: 'ALLY_QAT_USER_D',
        passEnv: 'ALLY_QAT_PASS_D', 
        storageState: 'state/qat-userD.json',
      },
      E: {
        userEnv: 'ALLY_QAT_USER_E',
        passEnv: 'ALLY_QAT_PASS_E',
        storageState: 'state/qat-userE.json',
      },
      F: {
        userEnv: 'ALLY_QAT_USER_F',
        passEnv: 'ALLY_QAT_PASS_F', 
        storageState: 'state/qat-userF.json',
      },
    },
  },

  UAT: {
    baseUrl: 'https://ally.uat.anddone.com',
    users: {
      A: {
        userEnv: 'ALLY_UAT_USER_A',
        passEnv: 'ALLY_UAT_PASS_A',
        storageState: 'state/uat-userA.json',
      },
      B: {
        userEnv: 'ALLY_UAT_USER_B',
        passEnv: 'ALLY_UAT_PASS_B',
        storageState: 'state/uat-userB.json',
      },
      C: {
        userEnv: 'ALLY_UAT_USER_C',
        passEnv: 'ALLY_UAT_PASS_C',
        storageState: 'state/uat-userC.json',
      },
      D: {
        userEnv: 'ALLY_UAT_USER_D',   
        passEnv: 'ALLY_UAT_PASS_D',
        storageState: 'state/uat-userD.json',
      },
      E: {
        userEnv: 'ALLY_UAT_USER_E',
        passEnv: 'ALLY_UAT_PASS_E',
        storageState: 'state/uat-userE.json',
      },
      F: {
        userEnv: 'ALLY_UAT_USER_F',
        passEnv: 'ALLY_UAT_PASS_F',
        storageState: 'state/uat-userF.json',
      },
    },
  },
} as const;
