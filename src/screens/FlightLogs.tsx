import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    TextInput,
    View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";

const FlightLogs = () => {
  const flightEvents = [
    {
      timestamp: "2024-01-15 14:32:15",
      event: "Pickup Completed",
      flightId: "PEGA-001",
      location: "Houston Methodist Hospital",
      status: "completed",
      priority: "STAT",
      temp: "2.8°C",
    },
    {
      timestamp: "2024-01-15 14:28:45",
      event: "CoC Scan Verification",
      flightId: "PEGA-001",
      location: "Houston Methodist Hospital",
      status: "completed",
      priority: "STAT",
      temp: "3.1°C",
    },
    {
      timestamp: "2024-01-15 14:15:30",
      event: "Flight Departure",
      flightId: "PEGA-001",
      location: "PEGA Base - Houston",
      status: "completed",
      priority: "STAT",
      temp: "N/A",
    },
    {
      timestamp: "2024-01-15 14:10:12",
      event: "Weather Delay",
      flightId: "PEGA-001",
      location: "PEGA Base - Houston",
      status: "resolved",
      priority: "STAT",
      temp: "N/A",
    },
    {
      timestamp: "2024-01-15 13:45:20",
      event: "Pre-flight Check",
      flightId: "PEGA-001",
      location: "PEGA Base - Houston",
      status: "completed",
      priority: "STAT",
      temp: "N/A",
    },
    {
      timestamp: "2024-01-15 12:58:45",
      event: "Delivery Completed",
      flightId: "PEGA-002",
      location: "MD Anderson Cancer Center",
      status: "completed",
      priority: "Standard",
      temp: "4.2°C",
    },
    {
      timestamp: "2024-01-15 12:15:30",
      event: "Cold Chain Alert",
      flightId: "PEGA-002",
      location: "In-flight to MD Anderson",
      status: "resolved",
      priority: "Standard",
      temp: "6.8°C → 4.2°C",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Flight Log System</Text>
            <Text style={styles.headerSubtitle}>
              Comprehensive flight event tracking and documentation
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.syncLabel}>Last Sync</Text>
            <Text style={styles.syncTime}>2 minutes ago</Text>
            <MaterialCommunityIcons
              name="file-document-outline"
              size={26}
              color="#fff"
            />
          </View>
        </Card.Content>
      </Card>

      {/* LOG CONTROLS */}
      <Card style={styles.controlCard}>
        <Card.Title
          title="Log Controls"
          titleStyle={styles.controlTitle}
          left={() => (
            <MaterialCommunityIcons name="magnify" size={20} color="#475569" />
          )}
          right={() => (
            <Button
              icon="file-pdf-box"
              mode="contained"
              buttonColor="#ef4444"
              textColor="#fff"
            >
              Export PDF
            </Button>
          )}
        />
        <Card.Content>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search events, flight IDs, or locations..."
              placeholderTextColor="#94a3b8"
            />
            <Button
              mode="outlined"
              textColor="#475569"
              style={styles.filterBtn}
              icon="filter"
            >
              All Statuses
            </Button>
            <Button
              mode="outlined"
              textColor="#475569"
              style={styles.refreshBtn}
              icon="refresh"
            >
              Refresh
            </Button>
          </View>

          {/* SYNC CARDS */}
          <View style={styles.syncRow}>
            <Card style={[styles.syncCard, { backgroundColor: "#dcfce7" }]}>
              <Card.Content style={styles.syncContent}>
                <View>
                  <Text style={styles.syncTitle}>Google Sheets</Text>
                  <Text style={styles.syncDesc}>
                    Live synchronization active
                  </Text>
                </View>
                <Button mode="contained" buttonColor="#16a34a">
                  Sync
                </Button>
              </Card.Content>
            </Card>

            <Card style={[styles.syncCard, { backgroundColor: "#dbeafe" }]}>
              <Card.Content style={styles.syncContent}>
                <View>
                  <Text style={styles.syncTitle}>Notion</Text>
                  <Text style={styles.syncDesc}>Database integration</Text>
                </View>
                <Button mode="contained" buttonColor="#3b82f6">
                  Sync
                </Button>
              </Card.Content>
            </Card>
          </View>
        </Card.Content>
      </Card>

      {/* EVENT LOG TABLE */}
      <Card style={styles.logCard}>
        <Card.Title
          title="Flight Events Log"
          titleStyle={styles.logTitle}
          left={() => (
            <MaterialCommunityIcons
              name="calendar-month"
              size={20}
              color="#6d28d9"
            />
          )}
          right={() => (
            <View style={styles.eventCount}>
              <Text style={styles.eventCountText}>7 events</Text>
            </View>
          )}
        />
        <Card.Content>
          {/* Table header */}
          <View style={styles.tableHeader}>
            {[
              "Timestamp",
              "Event",
              "Flight ID",
              "Location",
              "Status",
              "Priority",
              "Temp",
            ].map((col) => (
              <Text key={col} style={styles.tableHeaderText}>
                {col}
              </Text>
            ))}
          </View>

          {/* Rows */}
          {flightEvents.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                { backgroundColor: index % 2 === 0 ? "#f8fafc" : "#fff" },
              ]}
            >
              <Text style={styles.tableCell}>{item.timestamp}</Text>
              <Text style={styles.tableCell}>{item.event}</Text>
              <Text style={[styles.tableCell, styles.badge]}>
                {item.flightId}
              </Text>
              <Text style={styles.tableCell}>{item.location}</Text>
              <Text
                style={[
                  styles.statusBadge,
                  item.status === "completed"
                    ? styles.statusGreen
                    : styles.statusBlue,
                ]}
              >
                {item.status}
              </Text>
              <Text
                style={[
                  styles.priorityBadge,
                  item.priority === "STAT"
                    ? styles.priorityRed
                    : styles.priorityGray,
                ]}
              >
                {item.priority}
              </Text>
              <Text style={styles.tableCell}>{item.temp}</Text>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* SUMMARY */}
      <View style={styles.summaryRow}>
        <Card style={[styles.summaryCard, { backgroundColor: "#22c55e" }]}>
          <Card.Content>
            <Text style={styles.summaryNumber}>24</Text>
            <Text style={styles.summaryLabel}>Completed Flights</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.summaryCard, { backgroundColor: "#3b82f6" }]}>
          <Card.Content>
            <Text style={styles.summaryNumber}>3</Text>
            <Text style={styles.summaryLabel}>Active Missions</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.summaryCard, { backgroundColor: "#8b5cf6" }]}>
          <Card.Content>
            <Text style={styles.summaryNumber}>98.7%</Text>
            <Text style={styles.summaryLabel}>Success Rate</Text>
          </Card.Content>
        </Card>
        <Card style={[styles.summaryCard, { backgroundColor: "#ef4444" }]}>
          <Card.Content>
            <Text style={styles.summaryNumber}>2</Text>
            <Text style={styles.summaryLabel}>STAT Alerts</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Page
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9", // light app background
    padding: 16,
  },

  // Header (purple banner, still light-friendly)
  headerCard: {
    borderRadius: 20,
    backgroundColor: "#7c3aed",
    marginVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { fontSize: 26, fontWeight: "bold", color: "#ffffff" },
  headerSubtitle: { color: "#ede9fe", fontSize: 14 },
  headerRight: { alignItems: "flex-end", gap: 2 },
  syncLabel: { color: "#ede9fe", fontSize: 12 },
  syncTime: { color: "#ffffff", fontWeight: "700", fontSize: 16 },

  // Controls block
  controlCard: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff", // force light
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  controlTitle: { fontWeight: "bold", color: "#334155" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    color: "#0f172a",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  filterBtn: {
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  refreshBtn: {
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },

  // Sync integrations
  syncRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  syncCard: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#ffffff", // base; we still tint per-instance if desired
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  syncContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  syncTitle: { fontWeight: "700", fontSize: 16, color: "#0f172a" },
  syncDesc: { color: "#475569", fontSize: 13 },

  // Events table
  logCard: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  logTitle: { fontWeight: "bold", color: "#4c1d95" },

  eventCount: {
    backgroundColor: "#ede9fe",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  eventCountText: { color: "#6d28d9", fontWeight: "600" },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tableHeaderText: {
    flex: 1,
    color: "#334155",
    fontWeight: "700",
    fontSize: 12,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff", // base white; alternate in render if you like
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: "#1e293b",
    textAlign: "center",
    paddingHorizontal: 2,
  },
  badge: {
    backgroundColor: "#f1f5f9",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "center",
    overflow: "hidden",
  },

  statusBadge: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 999,
    color: "#ffffff",
    fontSize: 12,
    overflow: "hidden",
    alignSelf: "center",
    marginHorizontal: 6,
  },
  statusGreen: { backgroundColor: "#22c55e" },
  statusBlue: { backgroundColor: "#3b82f6" },

  priorityBadge: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 999,
    color: "#ffffff",
    fontSize: 12,
    overflow: "hidden",
    alignSelf: "center",
    marginHorizontal: 6,
  },
  priorityRed: { backgroundColor: "#ef4444" },
  priorityGray: { backgroundColor: "#94a3b8" },

  // Summary cards
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
    flexWrap: "wrap",
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    alignItems: "center",
    minWidth: "45%",
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  summaryNumber: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  summaryLabel: {
    color: "#f8fafc",
    textAlign: "center",
    fontSize: 14,
  },
});


export default FlightLogs;