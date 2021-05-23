import React, { useState } from 'react';
import { useQuery } from "urql";
import { View, Text } from 'react-native';
import styles from "../styles/SubjectBoardStyles";
import ME_QUERY from '../graphql/queries/MeQuery';
import SubjectChartBlock from '../objects/SubjectChartBlock';
import ALL_GRADES_QUERY from '../graphql/queries/AllGradesQuery';


const SubjectBoard = ({ navigation }) => {

    const [{ data: meData, fetching: meFetching, error: meError }, reloadMe] = useQuery({
        query: ME_QUERY,
    });

    const [{ data: subjectsData, fetching: subjectsFetching, error: subjectsError }] = useQuery({
        query: `{allSubjects}`,
    });

    const [{ data: gradesData, fetching: gradesFetching, error: gradesError }, reloadGrades] = useQuery({
        query: ALL_GRADES_QUERY,
    });

    const [reRender, setRerender] = useState(0);

    return (
        <View style={styles.container}>
            { !meFetching && !gradesFetching && !subjectsFetching && typeof gradesData.allGrades !== "undefined" && meData.me !== null && !meError ?
            (
                <View style={styles.chartWrapper}>
                {subjectsData.allSubjects.map((subject, index) => (
                    <SubjectChartBlock
                        key={index}
                        subject={subject}
                    />
                ))}
                </View>
            ) :
            (
                <View>
                    <Text style={{color: 'white'}}>{!meError ? `Log in to see your profile.` : error}</Text>
                </View>
            )
            }
        </View>
    );
};

export default SubjectBoard;