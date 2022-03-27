import {withIronSessionApiRoute, withIronSessionSsr} from "iron-session/next";
import {
    GetServerSidePropsContext,
    NextApiHandler,
} from "next";

const sessionOptions = {
    password: process.env.SECRET,
    cookieName: "blog",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
};

export function withSessionRoute(handler: NextApiHandler) {
    return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown },
    >(
    handler: (
        context: GetServerSidePropsContext,
    ) => void,
) {
    return withIronSessionSsr(handler, sessionOptions);
}
