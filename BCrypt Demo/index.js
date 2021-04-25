const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pw, salt)
    console.log(salt)
    console.log(hash)
}

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("Logged in")
    } else {
        console.log('incorrect')
    }
}

//hashPassword('monkey')
login('monkey_business', '$2b$10$zcC8eLUnCGybt3u8owmUduY0WXtJSLvsJriR28a.DXErr3d4reJeO')
