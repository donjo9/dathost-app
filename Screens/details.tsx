import * as React from 'react';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '../types';
import {useAuth} from '../hooks/auth';
import {Buffer} from 'buffer';
import Toast from 'react-native-toast-message';
import {ScrollView} from 'react-native-gesture-handler';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type csgo_settings = {
  autoload_configs: [];
  disable_bots: boolean;
  enable_csay_plugin: boolean;
  enable_gotv: boolean;
  enable_sourcemod: boolean;
  game_mode: string;
  insecure: boolean;
  mapgroup: string;
  mapgroup_start_map: string;
  maps_source: string;
  password: string;
  pure_server: boolean;
  rcon: string;
  slots: 15;
  sourcemod_admins: string;
  sourcemod_plugins: Array<string>;
  steam_game_server_login_token: string;
  tickrate: 128;
  workshop_authkey: string;
  workshop_id: string;
  workshop_start_map_id: string;
};

type csgo_ports = {
  game: number | null;
  gotv: number | null;
  query: number | null;
};

type ServerDetails = {
  id: string;
  name: string;
  added_voice_server: null;
  autostop: boolean;
  autostop_minutes: number;
  booting: boolean;
  confirmed: boolean;
  cost_per_hour: number;
  csgo_settings: csgo_settings | null;
  custom_domain: string;
  default_file_locations: string;
  disk_usage_bytes: number;
  duplicate_source_server: null;
  enable_core_dump: boolean;
  enable_mysql: boolean;
  ftp_password: string;
  game: string;
  ip: string;
  location: string;
  manual_sort_order: number;
  match_id: null;
  max_cost_per_hour: number;
  max_cost_per_month: number;
  max_disk_usage_gb: number;
  month_credits: number;
  month_reset_at: number;
  mumble_settings: null;
  mysql_password: string;
  mysql_username: string;
  on: boolean;
  players_online: number;
  ports: csgo_ports;
  raw_ip: string;
  reboot_on_crash: boolean;
  scheduled_commands: [];
  server_error: null;
  status: [];
  teamfortress2_settings: null;
  teamspeak3_settings: null;
  user_data: string;
  valheim_settings: null;
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
type Props = {
  navigation: DetailsScreenNavigationProp;
  route: DetailsScreenRouteProp;
};
const DetailsScreen = ({route}: Props) => {
  const {username, password, logout} = useAuth();
  const [json, setJson] = React.useState<ServerDetails>({} as ServerDetails);
  React.useEffect(() => {
    const getServers = async () => {
      if (username && password) {
        try {
          const res = await fetch(
            `https://dathost.net/api/0.1/game-servers/${route.params.id}`,
            {
              headers: {
                authorization: `Basic ${Buffer.from(
                  `${username}:${password}`,
                ).toString('base64')}`,
              },
            },
          );
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
    return () => console.log('killing details.tsx');
  }, [username, password, route.params.id, logout]);

  return (
    <ScrollView>
      <View style={Styles.infoItems}>
        <Text style={Styles.infoText}>Game: </Text>
        <Text style={Styles.infoText}>

      <View style={Styles.infoItems}>
        <Text style={Styles.infoText}>Name:</Text>
        <Text style={Styles.infoText}> {json?.name}</Text>
      </View>
      <View style={Styles.infoItems}>
        <Text style={Styles.infoText}>Game:</Text>
        <Text style={Styles.infoText}> {json?.game}</Text>
      </View>
      <View style={Styles.infoItems}>
        <Text style={Styles.infoText}>Port:</Text>
        <Text style={Styles.infoText}> {json?.ports?.game}</Text>
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  infoText: {
    color: 'white',
    backgroundColor: '#424556',
  },
  infoItems: {
    paddingLeft: 10,
    paddingRight: 10,
    color: 'white',
    backgroundColor: '#424556',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default DetailsScreen;
