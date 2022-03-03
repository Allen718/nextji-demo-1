import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import SignIn from "../../../src/model/SignIn";


const Login: NextApiHandler = async (req, res) => {
    const {username, password} = req.body;
    const signIn = new SignIn();
    signIn.username = username;
    signIn.password = password;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    await signIn.validate();
    if (signIn.hasErrors()) {
        res.statusCode = 422;
        res.end(JSON.stringify(signIn.errors));
    }else{
        res.statusCode = 200;
        res.end(JSON.stringify(signIn.user))
    }
};
export default Login;
