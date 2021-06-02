import { UseQueryResponse } from "urql";
import { GradeTypes } from "./GradeTypes";

export type GradesDataTypes = UseQueryResponse<
    {
        grades: [GradeTypes] | [];
    }
>