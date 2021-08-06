import { User } from "./User";
import { UseQueryResponse } from "urql";

export interface Grade {
	id: number;
	grade: number;
	subject: string;
	value: number;
	thoughts: string;
	updatedAt: string;
	createdAt: string;
	creatorId: number,
	creator: User;
};

export type GradesData = UseQueryResponse<{
	allGrades: [Grade] | [];
}>;

export type SubjectGradesData = UseQueryResponse<{
	subjectGrades: [Grade] | [];
}>;