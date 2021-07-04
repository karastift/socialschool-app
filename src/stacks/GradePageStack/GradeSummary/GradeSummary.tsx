import React, { useState } from 'react';
import { View, ActivityIndicator, Dimensions, StyleSheet, Text } from 'react-native';
import SubjectChartBlock from '../../../objects/SubjectChartBlock';
import { useAllSubjects } from '../../../graphql/queries/useAllSubjects';
import AllChartBlock from '../../../objects/AllChartBlock';

export const GradeSummary = ({ navigation }: any) => {

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
                          onPress={() => null}
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
            <AllChartBlock onPress={() => null}/>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: 'rgb(26, 26, 26)',
    alignItems: 'center',
    width: windowWidth,
    height: windowHeight,
    color: 'white',
  },
  chartWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 100,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly'
  },
});

export default styles;