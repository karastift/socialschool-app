import { UserTypes } from "./UserTypes";
import { UseQueryResponse } from "urql";

export interface GradeTypes {
    id: number;
    grade: number;
    subject: string;
    value: number;
    thoughts: string;
    updatedAt: string;
    createdAt: string;
    creatorId: number,
    creator: UserTypes;
};

export type GradesDataTypes = UseQueryResponse<
    {
        allGrades: [GradeTypes] | [];
    }
>;

export type SubjectGradesDataType = UseQueryResponse<
    {
        subjectGrades: [GradeTypes] | [];
    }
>;