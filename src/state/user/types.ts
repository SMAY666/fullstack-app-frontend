export type UserState = {
    token: string;
    userId: number;
    expirationTime: number;
};

export type Token = {
    userId: number;
}
