import React, { useState } from "react";
import { View, StyleSheet, Alert, Image, Dimensions, TouchableOpacity, Text } from "react-native";
import { TextInput, Button as Bt } from "react-native-paper";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth1 } from '@/config/config';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

export default function Register() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs.");
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth1, email, password);
            Alert.alert("Succès", "Inscription réussie !");
            router.replace("/login");
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
                <Text style={styles.welcomeText}>Créer un compte</Text>
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
                    onPress={handleRegister}
                    loading={loading}
                    disabled={loading}
                    style={styles.registerButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                >
                    S'inscrire
                </Bt>

                <TouchableOpacity 
                    onPress={() => router.push("/(auth)/login")}
                    style={styles.loginContainer}
                >
                    <Text style={styles.loginText}>
                        Déjà un compte ? 
                        <Text style={styles.loginLink}> Se connecter</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

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
    registerButton: {
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
    loginContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
    },
    loginLink: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});