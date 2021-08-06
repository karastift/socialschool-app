import { CompositeNavigationProp, NavigatorScreenParams, RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { OperationResult } from "urql";

// titleform
export type TitleFormProps = StackScreenProps<CreatePostStackParamList, 'Title'>;

// textform
export type TextFormProps = StackScreenProps<CreatePostStackParamList, 'Text'>;

// statusform
export type StatusFormProps = StackScreenProps<CreatePostStackParamList, 'Status'>;

// createpoststack
export type CreatePostStackParamList = {
	Title: {
		setTitle: React.Dispatch<React.SetStateAction<string>>;
	};
	Text: {
		setText: React.Dispatch<React.SetStateAction<string>>;
	};
	Status: {
		setStatus: React.Dispatch<React.SetStateAction<string>>;
	};
};

type CreatePostStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<PostStackParamList, 'CreatePostStack'>,
  StackNavigationProp<CreatePostStackParamList>
>;

export type CreatePostStackProps = {
	navigation: CreatePostStackNavigationProp;
};

// editpost
export type EditPostProps = StackScreenProps<PostStackParamList, 'EditPost'>

// post
type PostNavigationProp = StackNavigationProp<PostStackParamList, 'Post'>;
type PostRouteProp = RouteProp<PostStackParamList, 'Post'>;

export type PostProps = {
	navigation: PostNavigationProp,
	route: PostRouteProp,
	setComment: React.Dispatch<React.SetStateAction<string>>,
	submitComment: () => Promise<OperationResult<any, object>>,
};

// poststack
export type PostStackParamList = {
	Post: {
		postId: number;
	},
	EditPost: Readonly<object | undefined>;
	CreatePostStack: NavigatorScreenParams<CreatePostStackParamList>;
};

type PostStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<FeedStackParamList, 'Post'>,
  StackNavigationProp<PostStackParamList>
>;

type PostStackRouteProp = RouteProp<FeedStackParamList, 'Post'>

export type PostStackProps = {
	navigation: PostStackNavigationProp;
	route: PostStackRouteProp;
};

// feed
export type FeedProps = StackScreenProps<FeedStackParamList, 'Feed'>;

// feedstack
export type FeedStackParamList = {
	Feed: undefined;
	Post: NavigatorScreenParams<PostStackParamList> & { postId: number };
};

type FeedStackNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Feed'>,
  StackNavigationProp<FeedStackParamList>
>;

export type FeedStackProps = {
	navigation: FeedStackNavigationProp;
};

// gradeform
type GradeFormNavigationProp = StackNavigationProp<CreateGradeStackParamList, 'Grade'>;
type GradeFormRouteProp = RouteProp<CreateGradeStackParamList, 'Grade'>;
export type GradeFormProps = {
	navigation: GradeFormNavigationProp,
	route: GradeFormRouteProp,
	setGrade: React.Dispatch<React.SetStateAction<string>>,
};

// valueform
type ValueFormNavigationProp = StackNavigationProp<CreateGradeStackParamList, 'Value'>;
type ValueFormRouteProp = RouteProp<CreateGradeStackParamList, 'Value'>;
export type ValueFormProps = {
	navigation: ValueFormNavigationProp,
	route: ValueFormRouteProp,
	setValue: React.Dispatch<React.SetStateAction<string>>,
};

// subjectform
type SubjectFormNavigationProp = StackNavigationProp<CreateGradeStackParamList, 'Subject'>;
type SubjectFormRouteProp = RouteProp<CreateGradeStackParamList, 'Subject'>;
export type SubjectFormProps = {
	navigation: SubjectFormNavigationProp,
	route: SubjectFormRouteProp,
	setSubject: React.Dispatch<React.SetStateAction<string>>,
};

// thoughtsform
type ThoughtsFormNavigationProp = StackNavigationProp<CreateGradeStackParamList, 'Thoughts'>;
type ThoughtsFormRouteProp = RouteProp<CreateGradeStackParamList, 'Thoughts'>;
export type ThoughtsFormProps = {
	navigation: ThoughtsFormNavigationProp,
	route: ThoughtsFormRouteProp,
	setThoughts: React.Dispatch<React.SetStateAction<string>>,
	onSubmit: () => Promise<void>,
};

// creategradestack
export type CreateGradeStackParamList = {
	Grade: Readonly<object | undefined>;
	Value: Readonly<object | undefined>;
	Subject: Readonly<object | undefined>;
	Thoughts: Readonly<object | undefined>;
};

type CreateGradeStackNavigationProp = CompositeNavigationProp<
	StackNavigationProp<GradeStackParamList, 'CreateGradeStack'>,
	StackNavigationProp<CreateGradeStackParamList>
>;

export type CreateGradeStackProps = {
	navigation: CreateGradeStackNavigationProp,
};

// gradestack
export type GradeStackParamList = {
	Grade: NavigatorScreenParams<CreateGradeStackParamList>;
	EditGrade: undefined;
	CreateGradeStack: undefined;
};

// grade
export type GradeProps = StackScreenProps<GradeStackParamList, 'Grade'>;

// editgrade
export type EditGradeProps = StackScreenProps<GradeStackParamList, 'EditGrade'>

// gradesummary
export type GradeSummaryProps = StackScreenProps<GradePageStackParamList, 'GradeSummary'>;

// subjectgrades
export type SubjectGradesProps = StackScreenProps<GradePageStackParamList, 'SubjectGrades'>;

// gradepage
export type GradePageStackParamList = {
	GradeSummary: undefined;
	Grade: NavigatorScreenParams<GradeStackParamList>;
	SubjectGrades: undefined;
};

export type GradePageStackNavigationProp = CompositeNavigationProp<
	StackNavigationProp<RootStackParamList, 'Grade'>,
	StackNavigationProp<GradePageStackParamList>
>;

export type GradePageStackProps = {
	navigation: GradePageStackNavigationProp,
};

// profile
export type ProfileProps = StackScreenProps<UserStackParamList, 'Profile'>;

// editprofile
export type EditProfileProps = StackScreenProps<UserStackParamList, 'EditProfile'>;

// userstack
type UserStackParamList = {
	Profile: Readonly<object | undefined>,
	EditProfile: Readonly<object | undefined>,
};

type UserStackNavigationProp = CompositeNavigationProp<
	StackNavigationProp<RootStackParamList, 'User'>,
	StackNavigationProp<UserStackParamList>
>;

export type UserStackProps = {
	navigation: UserStackNavigationProp,
};

// root
export type RootStackParamList = {
  Feed: NavigatorScreenParams<FeedStackParamList>;
  User: undefined;
  Grade: undefined;
  Account: undefined;
};