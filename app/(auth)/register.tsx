import { Text, View, StyleSheet, Alert, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import { Button as Bt } from "react-native-paper";
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth1 } from '@/config/config';
export default function Register() {

    const [email, setEmail] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
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
        }
        catch (error) {
            Alert.alert("Erreur", (error as Error).message);
        }
        setLoading(false);
    };


    return (
        <View style={styles.textinput}>
            <TextInput
                style={styles.button}
                placeholder="Adresse e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.button}
                placeholder="mots de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Bt
                style={styles.textinput}
                onPress={handleRegister}
                loading={loading}
            >
                Register
            </Bt>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#000000',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#black',
    },
    textinput: {
        width: 200,
        height: 40,
        margin: 12,
        borderWidth: 1,
        color: '#red',
    },
});