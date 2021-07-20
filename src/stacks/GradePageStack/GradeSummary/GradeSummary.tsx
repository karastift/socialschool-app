import React from 'react';
import { ActivityIndicator, Platform, StyleSheet, View } from 'react-native';
import { useAllSubjects } from '../../../graphql/queries/useAllSubjects';
import AllChartBlock from '../../../objects/AllChartBlock';
import SubjectChartBlock from '../../../objects/SubjectChartBlock';

export const GradeSummary = ({ navigation }: any) => {

    const [{ data: data, fetching: fetching}] = useAllSubjects();
    
    return (
      <View style={styles.container}>
        { !fetching && data.allSubjects !== null
        ? (
        <View style={styles.chartWrapper}>
          {data?.allSubjects?.map((subject: string, index: number) => (
            <SubjectChartBlock
              key={index}
              subject={subject}
              onPress={() => null}
            />
          ))}
        </View>
        ) : (
          <View>
            <ActivityIndicator color="red"/>
          </View>
        )
        }
        <AllChartBlock onPress={() => null}/>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    flex: 1,
    backgroundColor: 'rgb(26, 26, 26)',
    alignItems: 'center',
    color: 'white',
  },
  chartWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 120,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly'
  },
});