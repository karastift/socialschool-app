import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Line } from './Line';
import { Decorator } from './Decorator';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { useQuery } from "urql";
import * as shape from 'd3-shape';
import { GradeTypes, SubjectGradesDataType } from '../types/GradeTypes';
import { SubjectChartBlockProps } from '../types/objectProps/SubjectChartBlockProps';
import { useSubjectGrades } from '../graphql/queries/useSubjectGrades';

const SubjectChartBlock = (props: SubjectChartBlockProps) => {

    const subject = props.subject;
    
    const [{data: grades, fetching: gradesFetching, error}]: SubjectGradesDataType = useSubjectGrades({ subject });

    if (gradesFetching || error) {
        return (
          <View style={styles.chartContainer}>
            <ActivityIndicator color="red"/>
          </View>
        );
    }
    else {
        const average = () => {
            let sum = 0;
            grades!.subjectGrades.map((grade: GradeTypes) => {
                sum += grade.grade;
            });
            return (sum / grades!.subjectGrades.length).toFixed(2);
        };
        return (
            <TouchableOpacity style={styles.chartContainer}>
                <Text style={styles.subjectText}>{subject}</Text>
                <AreaChart
                    style={styles.chart}
                    data={grades!.subjectGrades}
                    yAccessor={({ item }) => item.grade}
                    yMin={6}
                    yMax={1}
                    start={6}
                    animate
                    animationDuration={700}
                    numberOfTicks={6}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                    svg={{ fill: 'rgba(255, 0, 0, 0.1)' }}
                >
                    <Grid/>
                    <Line {...props}/>
                    <Decorator {...props}/>
                </AreaChart>
               
                <Text style={styles.averageText}>Ø {average()}</Text>
            </TouchableOpacity>
        );
    }
};

export default SubjectChartBlock;

const styles = StyleSheet.create({
    chartContainer: {
        width: 160,
        height: 145,
        margin: 10,
        paddingTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
    },
    chart: {
        paddingLeft: 20,
        paddingRight: 10,
        height: 100,
        width: 150,
    },
    subjectText: {
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
    },
    averageText: {
        textAlign: 'right',
        color: 'white',
        fontWeight: '700',
        marginRight: 13,
    },
});