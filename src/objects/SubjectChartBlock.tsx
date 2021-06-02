import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Circle, Path } from 'react-native-svg';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { useQuery } from "urql";
import * as shape from 'd3-shape';
import { GradeTypes } from '../types/GradeTypes';
import { SubjectChartBlockProps } from '../types/objectProps/SubjectChartBlockProps';
import { GradesDataTypes } from '../types/GradesDataTypes';

const SubjectChartBlock = (props: SubjectChartBlockProps) => {

    const Decorator = ({ x, y, data }: any) => {
        return data.map((value: GradeTypes, index: number) => (
            <Circle
                key={ index }
                cx={ x(index) }
                cy={ y(value.grade) }
                r={ 4 }
                stroke={'white'}
                fill={'darkred'}
            />
        ))
    }

    const Line = ({ line }: any) => (
        <Path
            key={'line'}
            d={line}
            stroke={'red'}
            fill={'none'}
        />
    );

    const subject = props.subject;
    const [{data: grades, fetching: gradesFetching, error}]: GradesDataTypes = useQuery({
        query: `
        query SubjectGrades($subject: String!){
            subjectGrades(subject: $subject) {
              grade
              createdAt
            }
          }
        `,
        variables: {subject},
    });
    if (gradesFetching || error) {
        return (
            <Text>loading</Text>
        );
    }
    else {
        const average = () => {
            let sum = 0;
            grades!.grades.map((grade: GradeTypes) => {
                sum += grade.grade;
            });
            return (sum / grades!.grades.length).toFixed(2);
        };
        return (
            <TouchableOpacity style={styles.chartContainer}>
                <Text style={styles.subjectText}>{subject}</Text>
                <AreaChart
                    style={styles.chart}
                    data={grades!.grades}
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