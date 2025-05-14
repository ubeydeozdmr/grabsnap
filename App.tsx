import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { Car } from './api/data';
import RoundedButton from './components/RoundedButton';
import { Colors } from './constants/colors';
import { Fonts } from './constants/fonts';
import CarDetails from './screens/CarDetails';
import Home from './screens/Home';
import Listed from './screens/Listed';
import Makes from './screens/Makes';
import Models from './screens/Models';
import Profile from './screens/Profile';
import SellCar from './screens/SellCar';
import Settings from './screens/Settings';
import SubmissionCompleted from './screens/SubmissionCompleted';
import ChangePass from './screens/auth/ChangePass';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Verification from './screens/auth/Verification';
import Welcome from './screens/auth/Welcome';
import ChangePhone from './screens/auth/ChangePhone';

SplashScreen.preventAutoHideAsync();

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
  Makes: undefined;
  Models: { makeId: number };
  SellCar: undefined;
  SubmissionCompleted: undefined;
  Register: undefined;
  Welcome: undefined;
  Login: undefined;
  ChangePass: undefined;
  Verification: undefined;
  ChangePhone: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.tabBarContainer,
        {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tabItemStyle = StyleSheet.flatten([
          styles.tabItem,
          route.name === 'Listed' && styles.listedTab,
          route.name === 'Profile' && styles.profileTab,
        ]);

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={({ pressed }) => [tabItemStyle, pressed && styles.pressed]}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                color: isFocused ? Colors.primary : Colors.gray,
                size: 24,
                focused: false,
              })}
            <Text
              style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
      <View style={styles.sellCarContainer}>
        <Pressable
          onPress={() => navigation.navigate('SellCar')}
          style={({ pressed }) => [
            styles.sellCarButton,
            pressed && styles.pressed,
          ]}
        >
          <RoundedButton onPress={() => navigation.navigate('SellCar')}>
            <MaterialIcons name="add" size={48} color="white" />
          </RoundedButton>
          <Text style={styles.tabLabel}>SELL CAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontSize: 20,
          color: Colors.primary,
          fontFamily: Fonts.Satoshi.Black,
        },
        headerTitleAlign: 'left',
        headerTitleContainerStyle: {},
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
          title: 'HOME',
          headerTitle: 'GRABSNAP',
        }}
      />
      <Tab.Screen
        name="Listed"
        component={Listed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={24} color={color} />
          ),
          title: 'LISTED',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
          title: 'PROFILE',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={24} color={color} />
          ),
          title: 'SETTINGS',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('./assets/fonts/Satoshi-Regular.ttf'),
    'Satoshi-Medium': require('./assets/fonts/Satoshi-Medium.ttf'),
    'Satoshi-Bold': require('./assets/fonts/Satoshi-Bold.ttf'),
    'Satoshi-Black': require('./assets/fonts/Satoshi-Black.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ChangePhone"
            screenOptions={{
              headerTitle: 'GrabSnap',
              headerTitleStyle: { fontFamily: Fonts.Satoshi.Bold },
              headerStyle: { backgroundColor: Colors.background },
            }}
          >
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ChangePass" component={ChangePass} />
            <Stack.Screen name="Verification" component={Verification} />
            <Stack.Screen name="ChangePhone" component={ChangePhone} />
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{
                headerShown: false,
                headerTitle: 'GrabSnap',
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="CarDetails"
              component={CarDetails}
              options={{
                headerShown: true,
                headerTitle: 'Car Details',
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Makes"
              component={Makes}
              options={{
                headerShown: true,
                headerTitle: 'Makes',
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="Models"
              component={Models}
              options={{
                headerShown: true,
                headerTitle: 'Models',
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="SellCar"
              component={SellCar}
              options={{
                headerShown: true,
                headerTitle: 'New Listing',
              }}
            ></Stack.Screen>
            <Stack.Screen
              name="SubmissionCompleted"
              component={SubmissionCompleted}
              options={{
                headerShown: true,
                headerTitle: 'Submission Completed',
              }}
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopWidth: 0,
    position: 'relative',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listedTab: {
    marginRight: 36,
  },
  profileTab: {
    marginLeft: 36,
  },
  sellCarContainer: {
    position: 'absolute',
    top: -30,
    left: '50%',
    marginLeft: -35,
    width: 70,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellCarButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.gray,
    marginTop: 4,
    textAlign: 'center',
    width: '100%',
    includeFontPadding: false,
  },
  tabLabelFocused: {
    color: Colors.primary,
  },
  pressed: {
    opacity: 0.7,
  },
});
