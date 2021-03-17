import {Buffer} from 'buffer';
import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
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

      <TouchableOpacity
        onPress={async () => {
          const res = await fetch('https://dathost.net/api/0.1/account', {
            headers: {
              'x-fields': 'id',
              authorization: `Basic ${Buffer.from(
                `${userName}:${password}`,
              ).toString('base64')}`,
            },
          });
          if (res.status === 200) {
            login(userName, password);
          } else if (res.status === 401) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'wrong username or password',
            });
            setPassword('');
          }
        }}>
        <Text style={Styles.LoginButton}>Login</Text>
      </TouchableOpacity>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
