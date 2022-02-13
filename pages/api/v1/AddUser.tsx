import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {User} from "../../../src/entity/User";

import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";


const AddUser: NextApiHandler = async (req, res) => {
    const {username, password, passwordConfirm} = req.body
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = username
    user.password=password
    user.passwordConfirm=passwordConfirm
    await user.validate();
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (user.hasErrors()) {
        res.statusCode = 422;
        res.write(JSON.stringify(user.errors))
    } else {
        await connection.manager.save(user);
        res.statusCode = 200;
        res.write(JSON.stringify(user));
    }
    res.end()
};
export default AddUser;