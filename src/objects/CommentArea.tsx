import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import { useMutation } from 'urql';
import { CommentAreaProps } from '../types/objectProps/CommentAreaProps';

export const CommentArea = (props: CommentAreaProps) => {

  const [text, setText] = useState('');
  const [result, createComment] = useMutation(`
  mutation CreatePostComment($postId: Int!, $text: String!){
    createPostComment(postId: $postId, text: $text) {
        postComment {
            id
            postId
            text
        }
        errors {
            message
            field
        }
    }
  }
  `);

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="What do you think about this?"
        placeholderTextColor="grey"
        textAlign="center"
        value={text}
        onChangeText={text => setText(text)}
      />

      <TouchableOpacity style={styles.container} onPress={() => {
        createComment({postId: props.postId, text});
        setText('');
        }}>
        <Text style={styles.costumText}>comment</Text>
      </TouchableOpacity>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    backgroundColor: 'rgb(26, 26, 26)',
    alignItems: 'center',
    width: windowWidth,
    color: 'white',
    paddingBottom: 20,
  },
  textInput: {
    width: 300,
    height: 50,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 20,
    textAlign: 'center',
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  costumText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 15,
    color: 'darkred',
  },
});