import {Buffer} from 'buffer';
import * as React from 'react';
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import {useAuth} from '../hooks/auth';
import Toast from 'react-native-toast-message';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};
const HomeScreen = ({navigation}: Props) => {
  const [json, setJson] = React.useState<any>([]);
  const {username, password, logout} = useAuth();

  React.useEffect(() => {
    const getServers = async () => {
      if (username && password) {
        try {
          const res = await fetch('https://dathost.net/api/0.1/game-servers', {
            headers: {
              'x-fields': 'name,id',
              authorization: `Basic ${Buffer.from(
                `${username}:${password}`,
              ).toString('base64')}`,
            },
          });
          if (res.status === 200) {
            setJson(await res.json());
          } else if (res.status === 401) {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: 'wrong username or password',
            });
            logout();
          }
        } catch (e) {
          console.error(e.message);
        }
      }
    };
    getServers();
    return () => console.log('killing app.tsx');
  }, [username, password, logout]);

  const servers = json.map((s: any) => (
    <TouchableOpacity
      key={s.id}
      onPress={() => navigation.navigate('Details', {id: s.id})}>
      <View style={Styles.servers}>
        <Text style={Styles.serverText}>{s.name}</Text>
        <TouchableOpacity onPress={() => console.log('serverstarted')}>
          <Text style={Styles.serverStartButton}>Start</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  ));

  return (
    <ScrollView>
      {servers}
      <TouchableOpacity onPress={logout}>
        <Text style={Styles.logoutButton}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  servers: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    backgroundColor: '#424556',
    borderRadius: 10,
  },
  serverText: {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  serverStartButton: {
    color: '#343746',
    textAlign: 'center',
    backgroundColor: '#ffa14b',
    padding: 10,
    borderRadius: 5,
  },
  logoutButton: {
    margin: 10,
    backgroundColor: '#ffa14b',
    borderRadius: 10,
    height: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default HomeScreen;
