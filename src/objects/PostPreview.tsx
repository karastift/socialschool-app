import React from 'react';
import { View, Text, StyleSheet, Dimensions, ViewStyle } from 'react-native';

interface PostProps {
	username: string;
	status: string;
	title: string;
	body: string;
	upvotes: number;
	id: number;
	style: ViewStyle;
}

const PostPreview: React.FC<PostProps> = (props) => {
	const {
		username,
		status,
		title,
		body,
		upvotes,
		id: key,
	} = props;
	return (
		<View key={key} style={props.style}>
			<View style={styles.discussionpost}>
				<Text style={styles.discussionpostTitle}>{title}</Text>
				<Text> </Text>
				<Text style={styles.discussionpostBody}>{body}{body.length === 500 ? '...' : ''}</Text>
				{username !== 'error' ? <Text style={styles.discussionpostInfo}>posted by <Text style={styles.discussionpostInfo2}>{username}</Text> | {status == 'public' ? (<Text>{status}</Text>) : (<Text style={styles.discussionpostInfo2}>{status}</Text>)} | {upvotes}</Text> : <Text> </Text>}
			</View>
		</View>
	);
};

export default PostPreview;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	discussionpost: {
		color: 'white',
		backgroundColor: 'rgb(35, 35, 35)',
		borderRadius: 24,
		alignItems: 'center',
		width: windowWidth-30,
		maxHeight: 700,
		overflow: 'hidden',
		paddingHorizontal: 6,
	},
	discussionpostInfo: {
		color: 'grey',
		textAlign: 'left',
		fontWeight: '300',
		marginTop: 10
	},
	discussionpostInfo2: {
		color: 'rgba(255, 255, 255, 0.8)',
	},
	discussionpostTitle: {
		color: 'white',
		fontWeight: '900',
		marginTop: 5,
		marginLeft: 10,
	},
	discussionpostBody: {
		color: 'white',
		textAlign: 'center',
		fontWeight: '700',
	},
});