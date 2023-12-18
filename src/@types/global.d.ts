type SignValidInterface = {
    email: string;
    password: string;
    username?: string;
};

type GSignValidInterface = {
    clientId: string;
    credential: string;
    select_by?: string;
};

interface User {
    email: string;
    username: string;
}
