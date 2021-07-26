import { UserTypes } from "./UserTypes";
import { UseQueryResponse } from "urql";

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