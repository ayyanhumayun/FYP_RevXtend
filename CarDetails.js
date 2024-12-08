import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CarDetailForm() {
  const navigation = useNavigation();
  const [isModified, setIsModified] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    transmission: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.brand) tempErrors.brand = 'Brand is required';
    if (!formData.model) tempErrors.model = 'Model is required';
    if (!formData.year) {
      tempErrors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(formData.year)) {
      tempErrors.year = 'Enter a valid year';
    }
    if (!formData.transmission) {
        tempErrors.transmission = 'Transmission type is required';
      }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      if (isModified) {
        navigation.navigate('CarSpecs');
      } else {
        navigation.navigate('FeedbackPage');
      }
    }
  };

  return (
    <LinearGradient colors={['#0A0F1C', '#212F3C']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Title at the top */}
        <Text style={styles.title}>Car Details</Text>

        <ScrollView
          style={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Brand</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Brand"
                placeholderTextColor="#8E8E93"
                value={formData.brand}
                onChangeText={(text) => setFormData({ ...formData, brand: text })}
              />
              {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Model</Text>
              <TextInput
                style={styles.input}
                placeholder=" Model"
                placeholderTextColor="#8E8E93"
                value={formData.model}
                onChangeText={(text) => setFormData({ ...formData, model: text })}
              />
              {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Year"
                placeholderTextColor="#8E8E93"
                keyboardType="numeric"
                value={formData.year}
                onChangeText={(text) => setFormData({ ...formData, year: text })}
              />
              {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Transmission</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Manual, Automatic"
                  placeholderTextColor="#8E8E93"
                  value={formData.transmission}
                  onChangeText={(text) => setFormData({...formData, transmission: text})}
                />
              </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Is Your Car Already Modified</Text>
              <View style={styles.radioContainer}>
                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setIsModified(true)}
                >
                  <View style={styles.radioOuter}>
                    {isModified && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.radioOption}
                  onPress={() => setIsModified(false)}
                >
                  <View style={styles.radioOuter}>
                    {!isModified && <View style={styles.radioInner} />}
                  </View>
                  <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Get Modifications</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Jura-Medium',
  },
  input: {
    backgroundColor: '#FFFFFF15', // Input field background matching gradient
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#444', // Border color
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  radioText: {
    color: '#FFFFFF',
  },
  bottomButtons: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#FF6B00', // Button color stands out
    padding: 16,
    borderRadius: 8,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
