import { Text, View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useAuth } from '@/context/ctx';
import { getAuth } from 'firebase/auth';
import { User } from "@firebase/auth";
import { Button, Card, Divider, Avatar } from "react-native-paper";
import { GettAllTickets, Ticket } from '@/services/ticket.service';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return '#f44336';
    case 'medium':
      return '#ff9800';
    case 'low':
      return '#4CAF50';
    default:
      return '#757575';
  }
};

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleShowTickets();
  }, []);

  if (!user) return <Redirect href="/login" />;

  const signOut = () => {
    const auth = getAuth();
    auth.signOut();
  };

  const handleShowTickets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTickets = await GettAllTickets();
      setTickets(fetchedTickets);
    } catch (err) {
      setError("Erreur lors du chargement des tickets");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Avatar.Text 
            size={50} 
            label={user.email?.[0].toUpperCase() ?? 'U'} 
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.welcomeText}>{user.email}</Text>
          </View>
        </View>
        <Pressable onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </Pressable>
      </View>

      <Button
        mode="contained"
        onPress={handleShowTickets}
        style={styles.refreshButton}
        labelStyle={styles.buttonLabel}
        disabled={isLoading}
      >
        {isLoading ? 'Chargement...' : 'Actualiser les tickets'}
      </Button>

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      <ScrollView style={styles.ticketsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#ffffff" style={styles.loader} />
        ) : (
          tickets.length > 0 ? (
            tickets.map((ticket) => (
              <Card key={ticket.name} style={styles.ticketCard}>
                <Card.Content>
                  <View style={styles.ticketHeader}>
                    <Text style={styles.ticketTitle}>{ticket.name}</Text>
                    <View style={[styles.priorityBadge, 
                      { backgroundColor: getPriorityColor(ticket.priority) }]}>
                      <Text style={styles.priorityText}>{ticket.priority}</Text>
                    </View>
                  </View>
                  <Divider style={styles.divider} />
                  <View style={styles.ticketFooter}>
                    <Text style={[styles.ticketStatus,
                      { color: ticket.status === 'opened' ? '#4CAF50' : '#f44336' }]}>
                      {ticket.status === 'opened' ? 'Ouvert' : 'Fermé'}
                    </Text>
                  </View>
                </Card.Content>
              </Card>
            ))
          ) : (
            <Text style={styles.noTicketsText}>Aucun ticket disponible</Text>
          )
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: '#ff4444',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  loader: {
    marginTop: 20,
  },
  noTicketsText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 15,
  },
  avatar: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 10,
    borderRadius: 8,
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '500',
  },
  refreshButton: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  ticketsContainer: {
    flex: 1,
  },
  ticketCard: {
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    elevation: 4,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  divider: {
    marginVertical: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  ticketStatus: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});