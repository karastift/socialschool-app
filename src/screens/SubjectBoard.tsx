import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from "../styles/SubjectBoardStyles";
import SubjectChartBlock from '../objects/SubjectChartBlock';
import { SubjectBoardProps } from '../types/screenProps/SubjectBoardTypes';
import { useAllSubjects } from '../graphql/queries/useAllSubjects';

const SubjectBoard = ({ navigation }: SubjectBoardProps) => {

    const [{ data: subjectsData, fetching: subjectsFetching, error: subjectsError }] = useAllSubjects();

    return (
        <View style={styles.container}>
            { !subjectsFetching ?
            (
                <View style={styles.chartWrapper}>
                {subjectsData.allSubjects.map((subject: string, index: number) => (
                    <SubjectChartBlock
                        key={index}
                        subject={subject}
                        onPress={() => navigation.navigate('SubjectInfo', { subject })}
                    />
                ))}
                </View>
            ) :
            (
                <View>
                    <ActivityIndicator color="red"/>
                </View>
            )
            }
        </View>
    );
};

export default SubjectBoard;