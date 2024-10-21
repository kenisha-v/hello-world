import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { auth } from './firebaseConfig'; // Import Firebase config
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Login Screen Component
function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Login successful', `Welcome ${user.email}!`);
        navigation.navigate('MainTabs', { username: user.email }); // Pass username to MainTabs
      })
      .catch((error) => {
        Alert.alert('Login failed', error.message);
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Sign up successful', `Welcome ${user.email}!`);
        navigation.navigate('MainTabs', { username: user.email }); // Pass username to MainTabs
      })
      .catch((error) => {
        Alert.alert('Sign up failed', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login or Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

// Welcome Screen Component
function WelcomeScreen({ route }) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {username}!</Text>
    </View>
  );
}

// Profile Screen Component
function ProfileScreen({ route }) {
  const { username } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is the profile of {username}</Text>
    </View>
  );
}

// Main Tabs Navigator
function MainTabs({ route }) {
  const { username } = route.params;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Welcome" component={WelcomeScreen} initialParams={{ username }} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ username }} />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
