import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds and buttons
import { BlurView } from 'expo-blur'; // For the blurred background effect
import { useNavigation } from '@react-navigation/native';

export default function LandingScreen() {
  const navigation = useNavigation();
  const [showRoleSelection, setShowRoleSelection] = useState(false); // State for role selection modal
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);
  const carAnim = new Animated.Value(0); // Animation for car
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track current image index
  const [buttonOpacity, setButtonOpacity] = useState(new Animated.Value(0)); // For button fade-in effect
  const images = [
    require('./part.png'), // Replace with your first image
    require('./landingpic.png'), // Replace with your second image
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(carAnim, {
            toValue: 10,
            duration: 1000, // Reduced duration for smoother animation
            useNativeDriver: true,
          }),
          Animated.timing(carAnim, {
            toValue: 0,
            duration: 1000, // Reduced duration for smoother animation
            useNativeDriver: true,
          }),
        ])
      ).start(),
    ]).start();

    // Set up the interval for auto-sliding images (faster transition)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Auto-slide the images
    }, 2000); // Reduced to 2 seconds for a faster slider transition

    // Add delay for the "Get Started" button to fade in
    Animated.timing(buttonOpacity, {
      toValue: 3,
      duration: 1000,
      delay: 1000, // Delay of 1 second before the button appears
      useNativeDriver: true,
    }).start();

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const handleRoleSelection = (role) => {
    setShowRoleSelection(false); // Close the modal
    if (role === 'user') {
      navigation.navigate('SignUp', { role: 'user' });
    } else if (role === 'admin') {
      navigation.navigate('SignUp', { role: 'admin' });
    }
  };

  return (
    <LinearGradient colors={['#0A0F1C', '#1C2834']} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Text style={styles.title}>REVXTEND</Text>

        {/* Auto-slider with 2 images */}
        <Animated.Image
          source={images[currentImageIndex]}
          style={{
            width: '90%', // Increased width to make the image larger
            height: 300, // Increased height for a bigger slider
            resizeMode: 'contain',
            marginVertical: 20,
            transform: [{ translateX: carAnim }],
          }}
        />

        <Text style={styles.subtitle}>Unleash Your Car's{'\n'}True Potential.</Text>

        {/* Get Started Button with delayed fade-in */}
        <Animated.View style={[{ opacity: buttonOpacity }, styles.buttonContainer]}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => setShowRoleSelection(true)} // Open the modal
          >
            <LinearGradient
              colors={['#FF6B00', '#FF6B00']} // Corrected color code
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.buttonText}>GET STARTED</Text>
              <Text style={styles.arrow}>→</Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      </Animated.View>

      {/* Role Selection Modal */}
      <Modal
        visible={showRoleSelection}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowRoleSelection(false)}
      >
        <BlurView intensity={50} style={styles.blurBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Your Role</Text>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => handleRoleSelection('user')}
            >
              <Text style={styles.roleText}>User</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => handleRoleSelection('admin')}
            >
              <Text style={styles.roleText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowRoleSelection(false)}
            >
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 28,
    color: '#D1D1D1',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 34,
  },
  buttonContainer: {
    marginTop: 40, // Adjusted to drag the button further down
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 0,
    elevation: 10, // Shadow for Android
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Jura',
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 1,
    marginRight: 8,
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '300',
  },
  buttonPressed: {
    opacity: 0.9,
  },
  blurBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1A1A1A',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  roleButton: {
    backgroundColor: '#FF6B00',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  roleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: '#FF6B00',
    fontSize: 14,
  },
});
