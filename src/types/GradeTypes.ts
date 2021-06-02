import { UserTypes } from "./UserTypes";

export type GradeTypes = {
    id: number;
    grade: number;
    subject: string;
    thoughts: string;
    updatedAt: string;
    createdAt: string;
    creatorId: number,
    creator: UserTypes;
};