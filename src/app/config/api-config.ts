const HOST = '192.168.1.111';
const PORT = '3008';
const DOMEA = `http://${HOST}:${PORT}/api/v1`;
const apiConfig = {
    modelList: `${DOMEA}/models.json`,
    model: `${DOMEA}/models`,
    checkEmail: `${DOMEA}/users/check_email.json`,
    securityCode: `${HOST}:${PORT}/security_code.json`,
    register: `${DOMEA}/users.json`,
    login: `${DOMEA}/login.json`,
    modifyPassword: `${DOMEA}/users/password.json`,
    userProfile: `${DOMEA}/users/profile.json`,
    assets: `http://54.223.81.116:8888/assets/`
}
export default apiConfig ;