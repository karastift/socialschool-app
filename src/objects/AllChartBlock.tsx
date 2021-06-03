import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AreaChart, Grid } from 'react-native-svg-charts';
import { Line } from './Line';
import { Decorator } from './Decorator';
import ALL_GRADES_QUERY from '../graphql/queries/AllGradesQuery';
import { useQuery } from "urql";
import * as shape from 'd3-shape';
import { AllChartBlockProps } from '../types/objectProps/AllChartBlockProps';
import { GradesDataTypes, GradeTypes } from '../types/GradeTypes';

const average = (array: [GradeTypes]) => {
    let sum = 0;
    array.map((grade) => {
        sum += grade.grade;
    });
    return (sum / array.length).toFixed(2);
};

const AllChartBlock = (props: AllChartBlockProps) => {

    const onPress = props.onPress;

    const [{ data: gradesData, fetching: gradesFetching, error: gradesError }]: GradesDataTypes = useQuery({
        query: ALL_GRADES_QUERY,
    });
    if (gradesFetching === true || typeof gradesError !== 'undefined') {
        return (
            <Text>{"loading"}</Text>
        );
    }
    else {
        if (gradesData!.allGrades?.length !== 0) {
            return (
                <TouchableOpacity style={styles.chartContainer} onPress={() => onPress()}>
                    <Text style={styles.subjectText}>{"all time grades"}</Text>
                    <AreaChart
                        style={styles.chart}
                        data={gradesData!.allGrades}
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
                
                    <Text style={styles.averageText}>Ø {average(gradesData!.allGrades)}</Text>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={[styles.chartContainer, {height: 50}]}>
                    <Text style={[styles.subjectText, {marginTop: 5}]}>{"You have not injected any grades."}</Text>
                </TouchableOpacity>
            );
        }
    }
};

export default AllChartBlock;

const styles = StyleSheet.create({
    chartContainer: {
        width: '95%',
        height: 145,
        margin: 10,
        paddingTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
    },
    chart: {
        paddingLeft: 20,
        height: 100,
        width: '95%',
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