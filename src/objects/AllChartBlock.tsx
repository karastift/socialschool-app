import React, { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AreaChart, Grid } from 'react-native-svg-charts';
import { Line } from './Line';
import { Decorator } from './Decorator';
import * as shape from 'd3-shape';
import { GradesDataTypes, GradeTypes } from '../types/GradeTypes';
import { useAllGrades } from '../graphql/queries/useAllGrades';
import { getAverage } from '../utils/getAverage';
import { ColorTheme } from '../contexts/ColorTheme';

interface AllChartBlockProps {
  onPress: () => void;
}

const AllChartBlock: React.FC<AllChartBlockProps> = (props) => {

  const styles = useStyles();
  const { chartTheme } = useContext(ColorTheme);
  const onPress = props.onPress;

  const [{ data, fetching, error }]: GradesDataTypes = useAllGrades();
  
  if (typeof error !== 'undefined') {
    
    return (
      <TouchableOpacity style={styles.chartContainer} onPress={() => null}>
        <Text style={{ color: 'white', alignSelf: 'center' }}>Criticial Error.</Text>
      </TouchableOpacity>
    );
  }
  else if (fetching === true) {
    return (
      <TouchableOpacity style={styles.chartContainer} onPress={() => null}>
        <ActivityIndicator color='red'/>
      </TouchableOpacity>
    );
  }
  else {
    if (data!.allGrades?.length !== 0) {
      return (
        <TouchableOpacity style={styles.chartContainer} onPress={() => onPress()}>
          <Text style={styles.subjectText}>Summary</Text>
          <AreaChart
            style={styles.chart}
            data={data!.allGrades}
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
      
          <Text style={styles.averageText}>Ø {getAverage(data!.allGrades)}</Text>
        </TouchableOpacity>
      );
    }
    else {
      return (
        <TouchableOpacity style={[styles.chartContainer, { height: 50 }]}>
          <Text style={[styles.subjectText, { marginTop: 5 }]}>{"You have not injected any grades."}</Text>
        </TouchableOpacity>
      );
    }
  }
};

export default AllChartBlock;

const useStyles = () => {

  const { general, chartTheme } = useContext(ColorTheme);

  return StyleSheet.create({
    chartContainer: {
      marginHorizontal: 20,
      height: 145,
      margin: 10,
      paddingTop: 10,
      backgroundColor: general.elementBackground,
      borderRadius: 20,
    },
    chart: {
      paddingHorizontal: 15,
      alignSelf: 'center',
      height: 100,
      flexDirection: 'row',
    },
    subjectText: {
      textAlign: 'center',
      color: general.text,
      fontWeight: '700',
    },
    averageText: {
      textAlign: 'right',
      color: general.text,
      fontWeight: '700',
      marginRight: 13,
    },
  });
};