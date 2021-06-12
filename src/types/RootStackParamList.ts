export type RootStackParamList = {
  Welcome: { refresh: undefined | null };
  Discussionpost: {
    id: number,
    refresh: undefined | null;
  };
  DiscussionpostCreation: undefined;
  Error: { error: any; };
  GradepostCreation: undefined;
  Login: undefined;
  Register: undefined;
  Settings: undefined;
  SubjectBoard: undefined;
  SubjectInfo: { subject: string; };
  User: undefined;
};