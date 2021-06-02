import { UserTypes } from "../UserTypes";

export type CommentTypes = {
    id: number;
    username: string;
    text: string;
    creator: UserTypes;
};