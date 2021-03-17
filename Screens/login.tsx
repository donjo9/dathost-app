import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useAuth} from '../hooks/auth';

const LoginScreen = () => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const {login} = useAuth();
  return (
    <View style={Styles.View}>
      <TextInput
        style={Styles.TestInput}
        value={userName}
        onChangeText={setUserName}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={Styles.TestInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={() => login(userName, password)}>
        <Text style={Styles.LoginButton}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  TestInput: {
    margin: 10,
    backgroundColor: '#424556',
    borderRadius: 10,
    color: 'white',
    minWidth: 250,
    padding: 10,
  },
  LoginButton: {
    minWidth: 250,
    backgroundColor: '#ffa14b',
    borderRadius: 10,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
  },
  View: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoginScreen;
