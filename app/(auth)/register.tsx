import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
      <Link href="/(auth)/login" style={styles.button}>
        Already have an account. Go to Login Screen
      </Link>
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
    color: '#fff',
  },
});