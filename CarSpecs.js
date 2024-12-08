import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';  // Importing LinearGradient

export default function CarSpecs({ route, navigation }) {
  const { carDetails } = route.params || {};
  const [formData, setFormData] = useState({
    carPower: '',
    installedParts: '',
    engineSize: '',
    fuelType: '',
    modifications: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.carPower) {
      tempErrors.carPower = 'Car power is required';
    } else if (isNaN(formData.carPower) || formData.carPower <= 0) {
      tempErrors.carPower = 'Enter valid horsepower';
    }
    
    if (!formData.engineSize) {
      tempErrors.engineSize = 'Engine size is required';
    } else if (!/^\d*\.?\d*L$/.test(formData.engineSize)) {
      tempErrors.engineSize = 'Format: e.g., 2.0L';
    }
    
    if (!formData.fuelType) {
      tempErrors.fuelType = 'Fuel type is required';
    }
    
    if (!formData.installedParts) {
      tempErrors.installedParts = 'Please list installed parts';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Handle form submission, including combining with carDetails
      console.log('Form submitted:', { ...carDetails, ...formData });

      // Navigate to the 'Modifications' page after successful form submission
      navigation.navigate('Modifications', { carDetails: { ...carDetails, ...formData } });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0A0F1C', '#212F3C']}  // Linear Gradient colors (adjust as needed)
        style={styles.gradientBackground}
      >
        <KeyboardAvoidingView 
          style={styles.keyboardAvoidingView} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView 
              style={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
            >
              <View style={styles.container}>
                <Text style={styles.title}>Modifications</Text>

                <View style={styles.content}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Car Power</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="HP"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      value={formData.carPower}
                      onChangeText={(text) => setFormData({...formData, carPower: text})}
                    />
                    {errors.carPower && <Text style={styles.errorText}>{errors.carPower}</Text>}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Engine Size</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., 2.0L"
                      placeholderTextColor="#8E8E93"
                      value={formData.engineSize}
                      onChangeText={(text) => setFormData({...formData, engineSize: text})}
                    />
                    {errors.engineSize && <Text style={styles.errorText}>{errors.engineSize}</Text>}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fuel Type</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="e.g., Petrol, Diesel"
                      placeholderTextColor="#8E8E93"
                      value={formData.fuelType}
                      onChangeText={(text) => setFormData({...formData, fuelType: text})}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name the parts installed in your car</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Write description about installed parts"
                      placeholderTextColor="#8E8E93"
                      multiline={true}
                      numberOfLines={4}
                      value={formData.installedParts}
                      onChangeText={(text) => setFormData({...formData, installedParts: text})}
                    />
                    {errors.installedParts && <Text style={styles.errorText}>{errors.installedParts}</Text>}
                  </View>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.submitButton} 
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Get Modifications</Text>
            </TouchableOpacity>
          </View>
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
    fontWeight:'Bold',
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
    paddingBottom: 120, // Adjust to ensure enough space for the button and keyboard
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    marginBottom: 8,
    fontFamily: 'Jura-Medium',
  },
  input: {
    backgroundColor: '#ffffff15',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontFamily: 'Jura-Regular',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jura-Medium',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    fontFamily: 'Jura-Regular',
    marginTop: 4,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'space-between', // Ensures content is pushed up when keyboard is visible
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 60, // Ensures space below button
  },
});
