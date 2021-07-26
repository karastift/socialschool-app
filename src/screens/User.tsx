import React, { useEffect, useState } from 'react';
import { useQuery } from "urql";
import { View, ScrollView, Text } from 'react-native';
import styles from "../styles/UserStyles";
import { useMe } from '../graphql/queries/useMe';
import AllChartBlock from '../objects/AllChartBlock';
import StatsBlock from '../objects/StatsBlock';
import SettingsButton from '../objects/SettingsButtons';
import { UserProps } from '../types/screenProps/UserTypes';


const User = ({ navigation }: UserProps) => {

    const [{ data: meData, fetching: meFetching, error: meError }] = useMe();

    useEffect(() => navigation.setOptions({
        title: meData.me ? meData.me.username: "user",
    }), [!meFetching]);

    return (
        <ScrollView style={styles.container}>
            { !meFetching && meData.me !== null && !meError ?
            (
                <View style={styles.chartWrapper}>
                    <AllChartBlock onPress={() => navigation.navigate('SubjectBoard')}/>
                    <StatsBlock/>
                    <SettingsButton onPress={() => navigation.navigate('Settings')} variant="settingsButton"/>
                </View>
            ) :
            (
                <View>
                    <Text style={styles.errorMsg}>{!meError ? `Log in to see your profile.` : meError.message}</Text>
                </View>
            )
            }
        </ScrollView>
    );
};

export default User;