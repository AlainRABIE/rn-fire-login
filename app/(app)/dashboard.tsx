import { Text, View, StyleSheet, Pressable } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/context/ctx';
import { getAuth } from 'firebase/auth';
import { User } from "@firebase/auth";
import { Button } from "react-native-paper";
import { GettAllTickets, Ticket } from '@/services/ticket.service';
import React, { useEffect, useState } from 'react';

export function Affiche() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    GettAllTickets().then((fetchedTickets) => {
      setTickets(fetchedTickets);
    });
  }, []);

  return (
    <View>
      {tickets.map((ticket, index) => (
        <Text key={index}>{ticket.name}</Text>
      ))}
    </View>
  );
}

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showTickets, setShowTickets] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  if (!user) return <Redirect href="/login" />;

  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };

  const handleShowTickets = () => {
    GettAllTickets().then((fetchedTickets) => {
      setTickets(fetchedTickets);
      setShowTickets(true);
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.toz}>Dashboard Screen</Text>
      <Bonjour user={user} />
      <Pressable onPress={signOut}>
        <Text style={{ color: '#fff' }}>Se déconnecter</Text>
      </Pressable>
      <Button mode="contained" onPress={handleShowTickets}>
        Afficher les tickets
      </Button>
      {showTickets && (
        <View>
          {tickets.map((ticket, index) => (
            <Text key={index}>{ticket.name}</Text>
          ))}
        </View>
      )}
    </View>
  );
}

const Bonjour = ({ user }: { user: User }): JSX.Element => {
  return (
    <>
      <Text>Hello {user.email}</Text>
    </>
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
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
  toz: {
    color: '#fff',
  },
});