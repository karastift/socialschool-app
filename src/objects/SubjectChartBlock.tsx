import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as shape from 'd3-shape';
import { Line } from './Line';
import { Decorator } from './Decorator';
import { AreaChart, Grid } from 'react-native-svg-charts';
import { GradeTypes, SubjectGradesDataType } from '../types/GradeTypes';
import { SubjectChartBlockProps } from '../types/objectProps/SubjectChartBlockProps';
import { useSubjectGrades } from '../graphql/queries/useSubjectGrades';
import { ColorTheme } from '../contexts/ColorTheme';

const SubjectChartBlock = (props: SubjectChartBlockProps) => {

  const { chartTheme } = useContext(ColorTheme);

  const subject = props.subject;
  const chartContainerStyle = props.chartContainerStyle;
  const chartStyle = props.chartStyle; 

  const [{ data, fetching, error }]: SubjectGradesDataType = useSubjectGrades({ subject });
  
  if (fetching || error) {
    return (
      <View style={styles.chartContainer}>
        <ActivityIndicator color="red"/>
      </View>
    );
  }
  else {
    const average = () => {
      let sum = 0;
      data!.subjectGrades.map((grade: GradeTypes) => {
          sum += grade.grade;
      });
      return (sum / data!.subjectGrades.length).toFixed(2);
    };

    return (
      <TouchableOpacity style={[styles.chartContainer, chartContainerStyle]} onPress={props.onPress}>
        <Text style={styles.subjectText}>{subject}</Text>
        <AreaChart
          style={styles.chart}
          data={data!.subjectGrades}
          yAccessor={({ item }) => item.grade}
          yMin={6}
          yMax={1}
          start={6}
          animate
          animationDuration={700}
          numberOfTicks={6}
          contentInset={{ top: 20, bottom: 20 }}
          curve={shape.curveNatural}
          svg={{ fill: chartTheme.background }}
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
    backgroundColor: 'rgb(35, 35, 35)',
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