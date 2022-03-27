import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import SignIn from "../../../src/model/SignIn";
// import {withIronSessionApiRoute} from "iron-session/next";
import {withSessionRoute} from "lib/withSession";

 const Login:NextApiHandler=async(req, res)=> {
    const {username, password} = req.body;
    const signIn = new SignIn();
    signIn.username = username;
    signIn.password = password;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    await signIn.validate();
    if (signIn.hasErrors()) {
        res.statusCode = 422;
        res.end(JSON.stringify(signIn.errors));
    } else {
        req.session.user = signIn.user
        res.statusCode = 200;
        await req.session.save();
        res.end(JSON.stringify(signIn.user))
    }
}
export default withSessionRoute(Login);
