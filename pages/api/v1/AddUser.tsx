import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../src/entity/User";
import md5 from 'md5';
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";


const AddUser: NextApiHandler = async (req, res) => {
    const {username, password, passwordConfirm} = req.body
    const errors = {username: [] as string[], password: [] as string[], passwordConfirm: [] as string[]}
    if (username.trim() === '') {
        errors.username.push('用户名不能为空')
    }
    if (!/[a-zA-Z0-9]/.test(username.trim())) {
        errors.username.push('用户名格式不合法')
    }
    if (username.trim().length > 20) {
        errors.username.push('用户名太长')
    }
    if (username.trim().length < 3) {
        errors.username.push('用户名太短')
    }
    if (password.trim() === '') {
        errors.password.push('密码不能为空')
    }
    if (password.trim() !== passwordConfirm.trim()) {
        errors.passwordConfirm.push('两次输入密码不一致');
    }
    const hasErrors = Object.values(errors).find(error => error.length > 0);
    console.log('Object.keys(errors)',Object.keys(errors))
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (hasErrors) {
        res.statusCode = 422;
        res.write(JSON.stringify(errors))
    } else {
        const connection = await getDatabaseConnection();
        const user = new User();
        user.username = username
        user.passwordDigest = md5(password);
        await connection.manager.save(user);
        res.statusCode = 200;
        res.write(JSON.stringify(user));
    }
    res.end()
};
export default AddUser;