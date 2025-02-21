import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import { TextInput, IconButton, Button as Bt, useTheme } from "react-native-paper";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth1 } from "@/config/config";
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth1, email, password);
      router.replace("/dashboard");
    } catch (error) {
      Alert.alert("Erreur", (error as Error).message);
    }
    setLoading(false);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.logoContainer}>
        <Image 
          source={require('@/assets/logo.webp')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Bienvenue</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          label="Adresse e-mail"
          value={email}
          onChangeText={setEmail}
          mode="flat"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          textColor="#fff"
          theme={{
            colors: { 
              primary: '#fff',
              onSurfaceVariant: '#fff9'
            }
          }}
          left={<TextInput.Icon icon="email" color="#fff" />}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            label="Mot de passe"
            value={password}
            onChangeText={setPassword}
            mode="flat"
            secureTextEntry={secureText}
            autoCapitalize="none"
            style={styles.input}
            textColor="#fff"
            theme={{
              colors: { 
                primary: '#fff',
                onSurfaceVariant: '#fff9'
              }
            }}
            left={<TextInput.Icon icon="lock" color="#fff" />}
            right={
              <TextInput.Icon 
                icon={secureText ? "eye-off" : "eye"} 
                color="#fff" 
                onPress={() => setSecureText(!secureText)}
              />
            }
          />
        </View>

        <Bt
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.loginButton}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Se connecter
        </Bt>

        <TouchableOpacity 
          onPress={() => router.push("/(auth)/register")}
          style={styles.registerContainer}
        >
          <Text style={styles.registerText}>
            Pas encore de compte ? 
            <Text style={styles.registerLink}> S'inscrire</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: height * 0.05,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  passwordContainer: {
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    elevation: 5,
  },
  buttonContent: {
    paddingVertical: 8,
    height: 50,
  },
  buttonLabel: {
    fontSize: 18,
    color: '#4c669f',
    fontWeight: 'bold',
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
  },
  registerLink: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;