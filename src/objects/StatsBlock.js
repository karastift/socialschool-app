import React from 'react';
import { StyleSheet, Text, ActivityIndicator } from "react-native";
import { useQuery } from "urql";
import { View } from 'react-native';
import ME_QUERY from '../graphql/queries/MeQuery';

const StatsBlock = _ => {

    const [{data, fetching}] = useQuery({
        query: ME_QUERY,
    });

    if (!fetching) {
        return (
            <View style={styles.chartContainer}>
                <Text style={styles.subjectText}>username:</Text>
                <Text/>
                <Text style={[styles.subjectText, {color: 'darkred'}]}>{data.me.username}</Text>
                <Text/>
                <Text style={styles.subjectText}>email:</Text>
                <Text/>
                <Text style={[styles.subjectText, {color: 'darkred'}]}>{data.me.email}</Text>
                <Text/>
                <Text style={styles.subjectText}>school:</Text>
                <Text/>
                <Text style={[styles.subjectText, {color: 'darkred'}]}>{data.me.school.schoolName}</Text>
            </View>
        );
    }
    else {
        return (
            <ActivityIndicator color="red"/>
        );
    }
};

export default StatsBlock;

const styles = StyleSheet.create({
    chartContainer: {
        flex: 1,
        margin: 10,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        borderRadius: 20,
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