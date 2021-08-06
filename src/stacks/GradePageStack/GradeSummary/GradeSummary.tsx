import React from 'react';
import { ActivityIndicator, Platform, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { useAllSubjects } from '../../../graphql/queries/useAllSubjects';
import AllChartBlock from '../../../objects/AllChartBlock';
import SubjectChartBlock from '../../../objects/SubjectChartBlock';

export const GradeSummary: React.FC = ({ navigation }: any) => {

    const [{ data: data, fetching: fetching}, reload] = useAllSubjects();
    
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={fetching}
            onRefresh={() => reload({ requestPolicy: 'network-only' })}
          />
        }
      >
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
      </ScrollView>
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
    marginTop: 20,
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent: 'space-evenly'
  },
});