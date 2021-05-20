import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/PostStyles";

const randomWords = ['says:', 'claims:', 'thinks:', 'believes:', 'is of the view:', 'is of the opinion:'];
const Comment = (props) => {
    const username = props.username;
    const body = props.body;
    const index = props.id;
    const randWord = randomWords[Math.floor(Math.random() * randomWords.length)];
    if (username.length != 0) {
        return (
            <View style={styles.commentWrapper} key={index}>
                <View style={styles.comment}>
                    <Text style={styles.commentInfo}>{username} {randWord}</Text>
                    <Text style={styles.commentBody}>{body}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style={styles.commentWrapper}>
            <View style={styles.comment}>
                <Text style={styles.commentInfo}>{body}</Text>
            </View>
        </View>
    );
};

export default Comment;