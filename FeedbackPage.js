import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // For gradient backgrounds and buttons
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons'; // For star icons

export default function FeedbackPage() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0); // Rating state (1 to 5)
  const [feedback, setFeedback] = useState(''); // Feedback state
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button when submitting

  const handleRating = (ratingValue) => {
    setRating(ratingValue); // Set rating based on star selection
  };

  const handleSubmit = () => {
    if (rating === 0 || feedback.trim() === '') {
      alert('Please provide a rating and feedback');
      return;
    }

    setIsSubmitting(true); // Disable button while submitting

    // Simulating form submission
    setTimeout(() => {
      alert('Thank you for your feedback!');
      setIsSubmitting(false); // Re-enable button after submission
      navigation.goBack(); // Navigate back after feedback is submitted
    }, 2000);
  };

  return (
    <LinearGradient colors={['#0A0F1C', '#1C2834']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Feedback</Text>
        <Text style={styles.subtitle}>Please rate your experience</Text>

        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              onPress={() => handleRating(star)}
            >
              <MaterialIcons
                name={star <= rating ? 'star' : 'star-border'}
                size={40}
                color="#FF6B00"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Write your feedback..."
          placeholderTextColor="#D1D1D1"
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />

        {/* Submit Button */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
          disabled={isSubmitting} // Disable while submitting
        >
          <LinearGradient
            colors={['#FF6B00', '#FF6B00']} // Button color
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop:160,
    marginBottom: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 24,
    color: '#D1D1D1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 34,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    height: 150,
    width: '100%',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
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
  },
  buttonPressed: {
    opacity: 0.9,
  },
});
