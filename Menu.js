import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const Menu = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A0F1C', '#212F3C']} // Gradient background colors
        style={styles.gradientBackground}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>Select Modification Type</Text>

            {/* Performance Modifications Logo */}
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => navigation.navigate('CarDetails', { modificationType: 'Performance' })}
            >
              <Image
                source={require('./performmod.png')} // Path to performance logo
                style={styles.logoImage}
              />
              <Text style={styles.logoText}>Performance Modifications</Text>
            </TouchableOpacity>

            {/* Aesthetic Modifications Logo */}
            <TouchableOpacity
              style={styles.logoContainer}
              onPress={() => navigation.navigate('CarDetails', { modificationType: 'Aesthetic' })}
            >
              <Image
                source={require('./carlogo.png')} // Path to aesthetic logo
                style={styles.logoImage}
              />
              <Text style={styles.logoText}>Aesthetic Modifications</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
    width: '90%', // Adding some width for spacing
    paddingLeft: '5%', // Padding from the left
    borderWidth: 2, // Border around the logo container
    borderColor: '#212F3C', // Orange border color
    borderRadius: 10, // Rounded corners for the border
    padding: 10, // Padding inside the border
    backgroundColor: '#212F3C', // Dark background to make it stand out
    shadowColor: '#000', // Shadow effect for button-like appearance
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6, // Elevation for Android devices
  },
  logoImage: {
    width: '100%', // Adjust the image to take up 100% of the container width
    height: 200, // Increase the height to make it larger
    resizeMode: 'contain', // Ensure the image maintains its aspect ratio
    marginBottom: 10, // Space between image and text
  },
  logoText: {
    color: '#fff',
    fontSize: 18, // Increase font size for better visibility
    fontWeight: 'bold',
  },
  // Add pressed effect styles
  buttonPressed: {
    opacity: 0.7, // Slightly reduce opacity when pressed
  },
});

export default Menu;

