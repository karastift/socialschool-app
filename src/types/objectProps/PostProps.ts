export type PostProps = {
    id?: number;
    username: string;
    title: string;
    body: string;
    status: string;
    upvotes: number;
    createdAt?: string;
    updatedAt?: string;
    style?: any;
};