export type SettingsButtonProps = {
  variant: 'settingsButton' | 'changeUsernameButton' | 'changeSchoolButton' | 'changePasswordButton' | 'aboutButton',
  color?: string,
  changeUsernameFn?: any,
  changeSchoolFn?: any,
  changePasswordFn?: any,
  onPress?: any,
}