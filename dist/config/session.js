export const sessionConfig = {
    secret: String(process.env.SESSION_SECREATE),
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 5 * 60 * 1000,
    },
};
