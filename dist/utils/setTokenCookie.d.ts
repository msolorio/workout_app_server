interface ContextType {
    res: {
        cookie: (cookieName: string, value: string, config: {
            httpOnly: boolean;
            maxAge: number;
        }) => void;
    };
}
declare function setTokenCookie(context: ContextType, token: string): void;
