import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMutation, useQuery } from "urql";
import Slider from "@react-native-community/slider";
import CREATE_GRADE_MUTATION from "../graphql/mutations/CreateGradeMutation";
import ME_QUERY from '../graphql/queries/MeQuery';
import styles from "../styles/GradeCreationStyles";
import subjectData from "../subjects.json";
import { GradepostProps } from '../types/screenProps/GradepostCreationTypes';

const GradepostCreation = ({ navigation }: GradepostProps) => {

    const [{ data: meData, fetching: meFetching, error: meError }, reloadMe] = useQuery({
        query: ME_QUERY,
    });

    const [, injectGrade] = useMutation(CREATE_GRADE_MUTATION);

    const [grade, setGrade] = useState(1);
    const [showSubject, setShowSubject] = useState('');
    const [subject, setSubject] = useState('');
    const [thoughts, setThoughts] = useState('public');
    const [injectOrError, setInjectOrError] = useState('inject');

    const subjects = subjectData.subjects;
    useEffect(() => {
        if (subject.length >= 2) {
            for (let i = 0; i < subjects.length; i++) {
                if (subjects[i].toLowerCase().includes(subject.toLowerCase())) {
                    setShowSubject(subjects[i]);
                }
            }
        }
    }, [subject]);

    const submit = () => {
        if (subject.length < 2) {
            setInjectOrError('Subject must have 2 characters.');
        }
        else {
            injectGrade( { input: {
                grade: grade,
                subject: subject,
                thoughts: thoughts,
            }}).then(result => {
                if (typeof result.error !== 'undefined') {
                    console.log(result.error.message);
                }
            else if (typeof result.data.createGrade.errors !== 'undefined' && result.data.createGrade.errors !== null) {
                const field = result.data.createGrade.errors[0].field;
                const message = result.data.createGrade.errors[0].message;
                console.log(field, message);
            }
                else {
                    navigation.navigate('Welcome', { refresh: null });
                }
            });
        }
    };

    return (
        <View style={styles.container}>
            {!meFetching && typeof meData.me !== "undefined" && meData.me !== null ? (
                <View style={styles.inputView}>
                    <View style={styles.slider}>
                        <Text style={{color: "rgba(255, 255, 255, 0.8)"}}>grade:</Text>
                        <Slider
                            style={{width: 200, height: 40}}
                            step={1}
                            minimumValue={1}
                            maximumValue={6}
                            value={grade}
                            onValueChange={(num) => setGrade(num)}
                            minimumTrackTintColor="rgba(255, 255, 255, 0.6)"
                            maximumTrackTintColor="#000000"
                            thumbTintColor="darkred"
                        />
                        <Text style={{color: "white"}}>{grade}</Text>
                    </View>
                    <View style={styles.fieldWrapper}>
                        <Text style={styles.shower} onPress={() => {
                            setSubject(showSubject);
                        }}>{showSubject}</Text>
                        <TextInput  
                            placeholder="subject"
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            textAlign={'center'}
                            returnKeyType="done"
                            style={styles.field}
                        />
                </View>
                    <View style={styles.fieldWrapper}>
                        <TextInput
                            placeholder="thoughts" 
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            onChangeText={text => setThoughts(text)}
                            textAlign={'center'}
                            spellCheck
                            returnKeyType="done"
                            style={styles.field}
                        />
                    </View>
                    <TouchableOpacity style={{padding: 25}} onPress={()=>{submit();}}>
                        <Text style={styles.submit}>{injectOrError}</Text>
                    </TouchableOpacity>
                </View>
            )
            : (
                <View style={styles.error}>
                    <Text style={{color: 'white'}}>Log in inject a grade.</Text>
                </View>
            )}
        </View>
    );
};

export default GradepostCreation;