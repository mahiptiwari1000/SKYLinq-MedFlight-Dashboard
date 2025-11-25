import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, TextInput } from "react-native";
import { Button, Card, Text } from "react-native-paper";

const API_BASE = "https://skylinq-backend-6ztr.vercel.app";

const NewRequestForm = ({ navigation }) => {
  const [form, setForm] = useState({
    requestId: "",
    priority: "Standard",
    tags: [],
    status: "pending",
    fromHospital: "",
    toHospital: "",
    cargo: "",
    progress: 0,
    eta: "—",
    etaMinutes: null,
    temp: "—",
  });

  const update = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const createRequest = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/requests/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed: " + data.message);
        return;
      }

      Alert.alert("Success", "Request created successfully");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Create New Request</Text>

          <TextInput
            style={styles.input}
            placeholder="Request ID (e.g., REQ-010)"
            value={form.requestId}
            onChangeText={(t) => update("requestId", t)}
          />

          <TextInput
            style={styles.input}
            placeholder="From Hospital"
            value={form.fromHospital}
            onChangeText={(t) => update("fromHospital", t)}
          />

          <TextInput
            style={styles.input}
            placeholder="To Hospital"
            value={form.toHospital}
            onChangeText={(t) => update("toHospital", t)}
          />

          <TextInput
            style={styles.input}
            placeholder="Cargo (e.g., Heart, Kidney)"
            value={form.cargo}
            onChangeText={(t) => update("cargo", t)}
          />

          <TextInput
            style={styles.input}
            placeholder="Priority (STAT / Standard / Critical)"
            value={form.priority}
            onChangeText={(t) => update("priority", t)}
          />

          <Button
            mode="contained"
            onPress={createRequest}
            style={{ marginTop: 20 }}
          >
            Submit Request
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { padding: 20, borderRadius: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 12,
  },
});

export default NewRequestForm;
