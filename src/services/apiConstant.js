
module.exports = {
    //API Constant
    // baseUrl: 'http://192.168.200.75:4000/',
    //baseUrl: 'http://662523da.ngrok.io/',
   // baseUrl: 'http://lanetteam.com:5054/',
    baseUrl: 'http://54.156.16.235:3000/',
   // baseUrl: 'http://192.168.200.83:5000/',
    signIn:'auth/local',
    state: 'api/states',
    zones: 'api/zones',
    branch: 'api/branchs',
    agencies: 'api/users/agencies',
    getBalance: 'api/users/getBalance',
    OTP: 'api/otps/getotp',
    updateActive: '/toggleActive',
    checkforUpdate: 'api/appVersion/',
    validateEmail: 'api/users/emailvalidate/',
    validatePhoneNo: 'api/users/phonenumbervalidate/',
    registerUser: 'api/users',
    changePassword: 'api/users/',
    forgotPassword: 'api/users/forgotpassword',
    password: '/password'
};