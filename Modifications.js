import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Importing LinearGradient

export default function Modifications({ navigation }) {

  const handleStageOne = () => {
    // Navigate to Feedback page for Stage One
    console.log("Navigating to Feedback for Stage One");
    navigation.navigate('FeedbackPage');  // Navigate to Feedback page
  };

  const handleStageTwo = () => {
    // Navigate to Feedback page for Stage Two
    console.log("Navigating to Feedback for Stage Two");
    navigation.navigate('FeedbackPage');  // Navigate to Feedback page
  };

  const handleStageThree = () => {
    // Navigate to Feedback page for Stage Three
    console.log("Navigating to Feedback for Stage Three");
    navigation.navigate('FeedbackPage');  // Navigate to Feedback page
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A0F1C', '#212F3C']}  // Linear Gradient colors (adjust as needed)
        style={styles.gradientBackground}
      >
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // This ensures it works on both iOS and Android
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              style={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.container}>
                <Text style={styles.title}>Car Modifications</Text>

                <View style={styles.content}>
                  {/* Stage One */}
                  <TouchableOpacity style={styles.stageButton} onPress={handleStageOne}>
                    <Text style={styles.buttonText}>Stage One: Choose Your Car</Text>
                  </TouchableOpacity>

                  {/* Stage Two */}
                  <TouchableOpacity style={styles.stageButton} onPress={handleStageTwo}>
                    <Text style={styles.buttonText}>Stage Two: Add Modifications</Text>
                  </TouchableOpacity>

                  {/* Stage Three */}
                  <TouchableOpacity style={styles.stageButton} onPress={handleStageThree}>
                    <Text style={styles.buttonText}>Stage Three: Review & Finalize</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Jura-Bold',
    fontWeight: 'Bold',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  stageButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jura-Medium',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center', // Centers the content vertically
  },
});
