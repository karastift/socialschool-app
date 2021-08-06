import React, { useState } from "react";
import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";
import { useMutation } from "urql";
import { realName } from "../../../../utils/realName";
import { GradeForm } from "./CreateGradeStack/GradeForm";
import { ValueForm } from "./CreateGradeStack/ValueForm";
import { SubjectForm } from "./CreateGradeStack/SubjectForm";
import { ThoughtsForm } from "./CreateGradeStack/ThoughtsForm";
import { GradeInput } from "../../../../types/GradeInput";
import CREATE_GRADE_MUTATION from "../../../../graphql/mutations/CreateGradeMutation";

const Stack = createStackNavigator();

const CreatePostStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export const CreateGradeStack: React.FC = ({ navigation, route }: any) => {

  const [grade, setGrade] = useState('')
  const [subject, setSubject] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [value, setValue] = useState('')
  const [,createGrade] = useMutation(CREATE_GRADE_MUTATION);

  const submit = async () => {

    const input: GradeInput = {
      grade: parseInt(grade),
      subject,
      thoughts: thoughts.trimEnd(),
      value: parseFloat(value.toString()),
    };

    const { data, error } = await createGrade({ input });

    if (error) {
      navigation.navigate('GradeSummary');
    }
    else if (data.createGrade.errors) {
      const { field, message } = data.createGrade.errors[0];
      navigation.navigate(realName(field), { message });
    }
    else {
      navigation.goBack();
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Screen name='Grade' options={CreatePostStackOptions}>
        { props => <GradeForm {...props} setGrade={setGrade}/>}
      </Stack.Screen>
      <Stack.Screen name='Value' options={CreatePostStackOptions}>
        { props => <ValueForm {...props} setValue={setValue}/>}
      </Stack.Screen>
      <Stack.Screen name='Subject' options={CreatePostStackOptions}>
        { props => <SubjectForm {...props} setSubject={setSubject}/>}
      </Stack.Screen>
      <Stack.Screen name='Thoughts' options={CreatePostStackOptions}>
        { props => <ThoughtsForm {...props} setThoughts={setThoughts} onSubmit={submit}/>}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
