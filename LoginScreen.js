import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { auth } from './firebaseConfig'; // Import the auth instance from firebaseConfig.js
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import { Modal } from 'react-native'; // Import Modal
import { BlurView } from 'expo-blur'; // Import BlurView for background effect

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Logged in successfully!');

      // Redirect to the MenuPage after successful login
      setTimeout(() => {
        navigation.navigate('Menu'); // Navigate to the Menu page
      }, 1000); // 1-second delay for smoother UX
    } catch (error) {
      Alert.alert('Error', 'Failed to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Wrap everything in LinearGradient */}
      <LinearGradient
        colors={['#0A0F1C', '#212F3C']} // Gradient colors
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            {/* Logo Image */}
            <Image source={require('./logo.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>

            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            {/* Password Input Field */}
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]} // Space for the eye button
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible} // Toggle visibility
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={24}
                  color="#aaa" // Grey color for the icon
                />
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}

            <View style={styles.signupContainer}>
              <Text style={styles.SignUpText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.SignUplink}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    color: '#fff',
    marginBottom: 15,
    backgroundColor: '#FFFFFF15',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '20%',
  },
  button: {
    backgroundColor: '#FF6B00',
    width: '70%',
    padding: 16,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  SignUpText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  SignUplink: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default LoginScreen;
