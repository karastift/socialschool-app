import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Circle, Path } from 'react-native-svg';
import { AreaChart, Grid } from 'react-native-svg-charts';
import ALL_GRADES_QUERY from '../graphql/queries/AllGradesQuery';
import { useQuery } from "urql";
import * as shape from 'd3-shape';

const AllChartBlock = (props) => {

    const onPress = props.onPress;

    const Decorator = ({ x, y, data }) => {
        return data.map((value, index) => (
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

    const Line = ({ line }) => (
        <Path
            key={'line'}
            d={line}
            stroke={'red'}
            fill={'none'}
        />
    );

    const [{ data: gradesData, fetching: gradesFetching, error: gradesError }, reloadGrades] = useQuery({
        query: ALL_GRADES_QUERY,
    });

    if (gradesFetching || gradesError) {
        return (
            <Text>loading</Text>
        );
    }
    else {
        const average = () => {
            let sum = 0;
            gradesData.allGrades.map(grade => {
                sum += grade.grade;
            });
            return (sum / gradesData.allGrades.length).toFixed(2);
        };
        return (
            <TouchableOpacity style={styles.chartContainer} onPress={() => onPress()}>
                <Text style={styles.subjectText}>all time grades</Text>
                <AreaChart
                    style={styles.chart}
                    data={gradesData.allGrades}
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