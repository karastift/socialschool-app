import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "../styles/SubjectInfoStyles";
import SubjectChartBlock from '../objects/SubjectChartBlock';
import { SubjectInfoProps } from '../types/screenProps/SubjectInfoTypes';
import { useSubjectGrades } from '../graphql/queries/useSubjectGrades';

const SubjectInfo = ({ navigation, route }: SubjectInfoProps) => {

  const { params } = route;

  useEffect(() => navigation.setOptions({
    title: params.subject,
  }), []);

  const [{ data: gradesData, fetching: gradesFetching, error: gradesError }] = useSubjectGrades(params);

  return (
    <View style={styles.container}>
      { !gradesFetching
      ? (
        <View style={styles.chartWrapper}>
          <SubjectChartBlock
            subject={params.subject}
            chartContainerStyle={styles.chartContainer}
            chartStyle={styles.chart}
          />
        </View>
      )
      : (
        <View>
          <ActivityIndicator color="red" size="large" style={styles.load}/>
        </View>
      )
      }
    </View>
  );
};

export default SubjectInfo;