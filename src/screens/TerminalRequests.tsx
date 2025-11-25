import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Card } from "react-native-paper";


// BASE URL
const API_BASE = "http://localhost:5001";

const ProgressBar = ({ value }) => (
  <View style={styles.progressTrack}>
    <View style={[styles.progressFill, { width: `${value}%` }]} />
  </View>
);

const TerminalRequests = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 980;

  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reqRes, summaryRes] = await Promise.all([
          fetch(`${API_BASE}/api/requests/active`, { cache: "no-store" }),
          fetch(`${API_BASE}/api/requests/summary`, { cache: "no-store" })
        ]);

        const activeRequests = await reqRes.json();
        const summaryJson = await summaryRes.json();

        setRequests(activeRequests);
        setSummary(summaryJson);
      } catch (err) {
        console.log("FETCH FAILED:", err);
      } finally {
        setLoading(false);   // ← ONLY ONE PLACE
      }
    };

    loadData();
  }, []);

  // SHOW LOADER
  if (loading) {
    return (
      <View style={styles.loaderWrap}>
        <ActivityIndicator size="large" color="#e11d48" />
      </View>
    );
  }

  // IF SUMMARY FAILED
  if (!summary) {
    return (
      <View style={styles.loaderWrap}>
        <Text style={{ color: "#e11d48", fontSize: 20 }}>
          Failed to load summary ❌
        </Text>
      </View>
    );
  }
const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Flight Requests</Text>
            <Text style={styles.headerSubtitle}>Live medical logistics tracking</Text>
          </View>

          <Button
  icon="plus"
  mode="contained"
  style={styles.newRequestBtn}
  labelStyle={{ color: "#fff" }}
  onPress={() => navigation.navigate("NewRequestForm")}
>
  New Request
</Button>

        </Card.Content>
      </Card>

      <View style={[styles.main, { flexDirection: isNarrow ? "column" : "row" }]}>

        {/* LEFT — ACTIVE REQUESTS */}
        <View style={[styles.left, { marginRight: isNarrow ? 0 : 12 }]}>
          <Card style={styles.sectionCard}>
            <Card.Title
              title={
                <Text style={styles.sectionTitle}>
                  <MaterialCommunityIcons name="cube-outline" size={16} /> Active Requests
                </Text>
              }
              right={() => (
                <Text style={styles.pillInfo}>{requests.length} active</Text>
              )}
            />

            <Card.Content style={{ gap: 14 }}>
              {requests.map((r, idx) => (
                <View key={idx} style={styles.reqCard}>
                  
                  {/* HEADER ROW */}
                  <View style={styles.reqHeaderRow}>
                    <View style={styles.reqIdPill}>
                      <Text style={styles.reqIdText}>{r.requestId}</Text>
                    </View>

                    {/* TAG BADGES */}
                    <View style={styles.badgesRow}>
                      {r.tags?.map((t, i) => (
                        <View key={i} style={[styles.badge, { backgroundColor: "#6366f1" }]}>
                          <Text style={styles.badgeText}>{t}</Text>
                        </View>
                      ))}
                    </View>

                    <View
                      style={[
                        styles.statusPill,
                        {
                          backgroundColor:
                            r.status === "in-transit"
                              ? "#2563eb"
                              : r.status === "pending"
                              ? "#f59e0b"
                              : "#10b981",
                        },
                      ]}
                    >
                      <Text style={styles.statusPillText}>{r.status}</Text>
                    </View>
                  </View>

                  {/* DETAILS */}
                  <View style={styles.reqLine}>
                    <MaterialCommunityIcons name="map-marker-outline" size={18} color="#10b981" />
                    <Text style={styles.reqLineLabel}>From:</Text>
                    <Text style={styles.reqLineValue}>{r.fromHospital}</Text>
                  </View>

                  <View style={styles.reqLine}>
                    <MaterialCommunityIcons name="map-marker" size={18} color="#ef4444" />
                    <Text style={styles.reqLineLabel}>To:</Text>
                    <Text style={styles.reqLineValue}>{r.toHospital}</Text>
                  </View>

                  <View style={styles.reqLine}>
                    <MaterialCommunityIcons name="cube-outline" size={18} color="#0ea5e9" />
                    <Text style={styles.reqLineLabel}>Cargo:</Text>
                    <Text style={styles.reqLineValue}>{r.cargo}</Text>
                  </View>

                  <Text style={styles.progressLabel}>Progress</Text>
                  <ProgressBar value={r.progress || 0} />

                  <View style={styles.reqFooterRow}>
                    <View style={styles.etaRow}>
                      <MaterialCommunityIcons name="clock-outline" size={16} color="#64748b" />
                      <Text style={styles.etaText}>ETA: {r.eta}</Text>
                    </View>

                    <View style={styles.tempRow}>
                      <MaterialCommunityIcons name="coolant-temperature" size={16} color="#0ea5e9" />
                      <Text style={styles.tempText}>{r.temp}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </Card.Content>
          </Card>
        </View>

        {/* RIGHT — SUMMARY PANEL */}
        <View style={[styles.right, { marginLeft: isNarrow ? 0 : 12 }]}>
          <Card style={styles.sectionCard}>
            <Card.Title
              title={
                <Text style={styles.sectionTitle}>
                  <MaterialCommunityIcons name="eye-outline" size={16} /> Live Visibility
                </Text>
              }
            />
            <Card.Content>
              <View style={styles.kvRow}>
                <Text style={styles.kvKey}>Active Deliveries:</Text>
                <Text style={styles.kvValStrong}>{summary.activeDeliveries}</Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.kvKey}>Average ETA:</Text>
                <Text style={styles.kvValStrong}>
                  {summary.averageEtaMinutes ? `${summary.averageEtaMinutes} minutes` : "—"}
                </Text>
              </View>

              <View style={styles.kvRow}>
                <Text style={styles.kvKey}>Success Rate:</Text>
                <Text style={[styles.kvValStrong, { color: "#16a34a" }]}>
                  {summary.successRate}%
                </Text>
              </View>

              {/* UPDATES */}
              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
                Recent Updates
              </Text>

              <View style={{ gap: 10, marginTop: 6 }}>
                {summary.recentUpdates.map((u, i) => (
                  <View key={i} style={styles.updateRow}>
                    <View style={styles.dot} />
                    <Text style={styles.updateText}>{u.message}</Text>
                  </View>
                ))}
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={{ height: 36 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loaderWrap: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 16 },
  headerCard: { backgroundColor: "#e11d48", borderRadius: 18, marginBottom: 16 },
  headerContent: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#fff", fontSize: 26, fontWeight: "800" },
  headerSubtitle: { color: "#ffe4e6", marginTop: 4 },
  newRequestBtn: { backgroundColor: "#db2777", borderRadius: 10 },
  main: { alignItems: "flex-start" },
  left: { flex: 1 },
  right: { width: 360, alignSelf: "stretch" },

  sectionCard: { borderRadius: 14, backgroundColor: "#fff", elevation: 2 },
  sectionTitle: { fontWeight: "700", color: "#334155", fontSize: 16 },
  pillInfo: {
    marginRight: 12,
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: "700",
  },

  reqCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    backgroundColor: "#fff",
  },

  reqHeaderRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  reqIdPill: { backgroundColor: "#f1f5f9", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  reqIdText: { color: "#0f172a", fontWeight: "700" },
  badgesRow: { flexDirection: "row", gap: 6, flexWrap: "wrap", flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusPillText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  reqLine: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 10 },
  reqLineLabel: { color: "#64748b", fontWeight: "600" },
  reqLineValue: { color: "#0f172a", fontWeight: "700", flexShrink: 1 },

  progressLabel: { color: "#475569", marginTop: 12, marginBottom: 6 },
  progressTrack: { height: 10, borderRadius: 8, backgroundColor: "#e5e7eb", overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#0f172a" },

  reqFooterRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  etaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  etaText: { color: "#475569", fontWeight: "600" },
  tempRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  tempText: { color: "#0ea5e9", fontWeight: "700" },

  kvRow: { flexDirection: "row", justifyContent: "space-between", marginVertical: 6 },
  kvKey: { color: "#475569" },
  kvValStrong: { color: "#0f172a", fontWeight: "800" },

  updateRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  updateText: { color: "#334155" },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#2563eb" },
});


export default TerminalRequests;
