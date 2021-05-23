import React, { useState } from 'react';
import { useQuery } from "urql";
import { View, ScrollView, Text } from 'react-native';
import styles from "../styles/UserStyles";
import ME_QUERY from '../graphql/queries/MeQuery';
import AllChartBlock from '../objects/AllChartBlock';
import StatsBlock from '../objects/StatsBlock';
import UserPageSettingsButton from '../objects/UserSettingsButton';


const User = ({ navigation }) => {

    const [{ data: meData, fetching: meFetching, error: meError }, reloadMe] = useQuery({
        query: ME_QUERY,
    });

    return (
        <ScrollView style={styles.container}>
            { !meFetching && meData.me !== null && !meError ?
            (
                <View style={styles.chartWrapper}>
                    <AllChartBlock onPress={() => navigation.navigate('SubjectBoard')}/>
                    <StatsBlock/>
                    <UserPageSettingsButton/>
                </View>
            ) :
            (
                <View>
                    <Text style={{color: 'white'}}>{!meError ? `Log in to see your profile.` : meError.message}</Text>
                </View>
            )
            }
        </ScrollView>
    );
};

export default User;