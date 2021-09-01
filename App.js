import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import MMKVStorage from 'react-native-mmkv-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import C, {apply} from 'consistencss';
import JailMonkey from 'jail-monkey';

const isJailBroken = JailMonkey.isJailBroken();

MMKVStorage.MODES.SINGLE_PROCESS;

const MMKV = new MMKVStorage.Loader().withEncryption().initialize(); // Returns an MMKV Instance

const textStyle = apply(C.font6, C.p4, C.alignCenter);

const config = {
  SUPER_SECRET_APIKEY: 'adbc1234',
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    console.log(config);
    MMKV.setString('super_secret', 'donttellanyone');
    MMKV.setInt('user_id', 1234);
    MMKV.setBool('flag', false);
    MMKV.getInt('user_id', console.log);
    AsyncStorage.setItem('super_secret', 'donttellanyone');
    AsyncStorage.setItem('first_open', 'true');
    AsyncStorage.getItem('super_secret');
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
      </ScrollView>
      <Text style={textStyle}>
        Is using Frida/ rooted device ? {isJailBroken.toString()}
      </Text>
      <Text style={textStyle}>
        {isJailBroken ? "You can't use the app" : 'Seems legit'}
      </Text>
      <View style={C.itemsCenter}>
        {!isJailBroken && <Button title="Login" />}
      </View>
    </SafeAreaView>
  );
};

export default App;
