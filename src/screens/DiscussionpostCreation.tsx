import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import CREATE_POST_MUTATION from "../graphql/mutations/CreatePostMutation";
import { useMutation, useQuery } from "urql";
import styles from "../styles/PostCreationStyles";
import { DiscussionpostCreationProps } from '../types/screenProps/DiscussionpostCreationTypes';
import { useMe } from '../graphql/queries/useMe';
import CREATE_GRADE_MUTATION from '../graphql/mutations/CreateGradeMutation';
import { SubmitButton } from '../objects/SubmitButton';

function DiscussionpostCreation ({ navigation }: DiscussionpostCreationProps) {

    const [{ data: meData, fetching: meFetching, error: meError }, reloadMe] = useMe();

    const [, createPost] = useMutation(CREATE_GRADE_MUTATION);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('public');
    const [isPublic, togglePublic] = useState(true);
    const [postOrError, setPostOrError] = useState('post');

    const toggleStatus = () => {
        if (isPublic) {
            togglePublic(false);
            setStatus(meData.me.school.schoolName);
        }
        else {
            togglePublic(true);
            setStatus('public');
        }
    };

    const submitPost = () => {
        if (title.length < 5) {
            setPostOrError('Title must have 5 characters.');
        }
        else if (body.length < 5) {
            setPostOrError('Body must have 5 characters.');
        }
        else {
            createPost( { input: {
                title: title,
                text: body,
                status: status,
            }}).then(result => {
                if (typeof result.error !== 'undefined') {
                    console.log(result.error.message);
                }
            else if (typeof result.data.createPost.errors !== 'undefined') {
                const field = result.data.createPost.errors[0].field;
                const message = result.data.createPost.errors[0].message;
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
            {!meFetching && meData.me !== undefined ? (
            <ScrollView>
                <View style={styles.inputView}>
                    <View style={styles.fieldWrapper}>
                        <TextInput
                            multiline
                            placeholder="title" 
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            onChangeText={text => setTitle(text)}
                            textAlign={'center'}
                            spellCheck
                            returnKeyType="done"
                            style={styles.field}
                        />
                    </View>
                    <View style={styles.fieldWrapper}>
                        <TextInput
                            multiline
                            placeholder="body" 
                            placeholderTextColor="rgba(255, 255, 255, 0.8)"
                            onChangeText={text => setBody(text)}
                            textAlign={'center'}
                            spellCheck
                            returnKeyType="done"
                            style={styles.field}
                        />
                    </View>
                    <Switch
                        trackColor={{ false: "rgb(40, 40, 40)", true: "darkred" }}
                        thumbColor={"rgb(40, 40, 40)"}
                        ios_backgroundColor="rgb(60, 60, 60)"
                        onValueChange={toggleStatus}
                        value={isPublic}
                    />
                    <Text style={styles.switchLabel}>{status}</Text>

                    <SubmitButton text="post" onSubmit={() => submitPost()} style={styles.submit}/>
                </View>
            </ScrollView>
            )
            : (
                <View style={styles.error}>
                    <Text style={{color: 'white'}}>Log in to post.</Text>
                </View>
            )}
        </View>
    );

};

export default DiscussionpostCreation;