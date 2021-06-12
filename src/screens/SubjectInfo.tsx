import React, { useEffect } from 'react';
import { useQuery } from "urql";
import { View, Text, ActivityIndicator } from 'react-native';
import styles from "../styles/SubjectBoardStyles";
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
      { !gradesFetching ?
      (
        <View>
          <Text>{params.subject}</Text>
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

export default SubjectInfo;