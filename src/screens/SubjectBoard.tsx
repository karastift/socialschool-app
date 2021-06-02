import React, { useState } from 'react';
import { useQuery } from "urql";
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "../styles/SubjectBoardStyles";
import SubjectChartBlock from '../objects/SubjectChartBlock';
import { SubjectBoardProps } from '../types/screenProps/SubjectBoardTypes';

const SubjectBoard = ({ navigation }: SubjectBoardProps) => {

    const [{ data: subjectsData, fetching: subjectsFetching, error: subjectsError }] = useQuery({
        query: `{allSubjects}`,
    });

    return (
        <View style={styles.container}>
            { !subjectsFetching ?
            (
                <View style={styles.chartWrapper}>
                {subjectsData.allSubjects.map((subject: string, index: number) => (
                    <SubjectChartBlock
                        key={index}
                        subject={subject}
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