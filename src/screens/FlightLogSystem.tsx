import React from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    useWindowDimensions,
    View,
} from "react-native";
import { Button, Card, Chip, Divider, Searchbar, Text } from "react-native-paper";

const FlightLogSystem = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const flightEvents = [
    {
      timestamp: "2024–01–15 14:32:15",
      event: "Pickup Completed",
      flightId: "PEGA–001",
      location: "Houston Methodist Hospital",
      status: "completed",
      priority: "STAT",
      coc: true,
      temperature: "2.8°C",
      details: "Organ transport – Heart transplant",
    },
    {
      timestamp: "2024–01–15 14:28:45",
      event: "CoC Scan Verification",
      flightId: "PEGA–001",
      location: "Houston Methodist Hospital",
      status: "completed",
      priority: "STAT",
      coc: true,
      temperature: "3.1°C",
      details: "Chain of custody verified",
    },
    {
      timestamp: "2024–01–15 14:15:30",
      event: "Flight Departure",
      flightId: "PEGA–001",
      location: "PEGA Base – Houston",
      status: "completed",
      priority: "STAT",
      coc: false,
      temperature: "N/A",
      details: "Emergency medical transport initiated",
    },
    {
      timestamp: "2024–01–15 14:10:12",
      event: "Weather Delay",
      flightId: "PEGA–001",
      location: "PEGA Base – Houston",
      status: "resolved",
      priority: "STAT",
      coc: false,
      temperature: "N/A",
      details: "8-minute delay due to wind conditions",
    },
    {
      timestamp: "2024–01–15 13:45:20",
      event: "Pre-flight Check",
      flightId: "PEGA–001",
      location: "PEGA Base – Houston",
      status: "completed",
      priority: "STAT",
      coc: false,
      temperature: "N/A",
      details: "All systems verified – Ready for departure",
    },
    {
      timestamp: "2024–01–15 12:58:45",
      event: "Delivery Completed",
      flightId: "PEGA–002",
      location: "MD Anderson Cancer Center",
      status: "completed",
      priority: "Standard",
      coc: true,
      temperature: "4.2°C",
      details: "Medication delivery – Oncology department",
    },
    {
      timestamp: "2024–01–15 12:15:30",
      event: "Cold Chain Alert",
      flightId: "PEGA–002",
      location: "In-flight to MD Anderson",
      status: "resolved",
      priority: "Standard",
      coc: true,
      temperature: "6.8°C → 4.2°C",
      details: "Temperature spike resolved – Backup cooling active",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Flight Log System</Text>
            <Text style={styles.headerSubtitle}>
              Comprehensive flight event tracking and documentation
            </Text>
          </View>
          <View style={styles.syncBox}>
            <Text style={styles.syncLabel}>Last Sync</Text>
            <Text style={styles.syncTime}>2 minutes ago</Text>
          </View>
        </Card.Content>
      </Card>

      {/* LOG CONTROLS */}
      <Card style={styles.controlsCard}>
        <Card.Content>
          <View style={styles.searchRow}>
            <Searchbar
              placeholder="Search events, flight IDs, or locations..."
              style={styles.searchBar}
            />
            <Button mode="outlined" style={styles.refreshBtn}>
              Refresh
            </Button>
            <Button mode="contained" style={styles.pdfBtn}>
              Export PDF
            </Button>
          </View>

          <View
            style={[
              styles.integrationRow,
              { flexDirection: isMobile ? "column" : "row" },
            ]}
          >
            <Card style={[styles.integrationCard, { backgroundColor: "#dcfce7" }]}>
              <Card.Content style={styles.integrationContent}>
                <View>
                  <Text style={styles.integrationTitle}>Google Sheets</Text>
                  <Text style={styles.integrationSubtitle}>
                    Live synchronization active
                  </Text>
                </View>
                <Button mode="contained" style={styles.syncButtonGreen}>
                  Sync
                </Button>
              </Card.Content>
            </Card>

            <Card style={[styles.integrationCard, { backgroundColor: "#e0f2fe" }]}>
              <Card.Content style={styles.integrationContent}>
                <View>
                  <Text style={styles.integrationTitle}>Notion</Text>
                  <Text style={styles.integrationSubtitle}>
                    Database integration
                  </Text>
                </View>
                <Button mode="contained" style={styles.syncButtonBlue}>
                  Sync
                </Button>
              </Card.Content>
            </Card>
          </View>
        </Card.Content>
      </Card>

      {/* FLIGHT EVENTS TABLE */}
      <Card style={styles.logCard}>
        <Card.Title
          title="📘 Flight Events Log"
          titleStyle={styles.sectionTitle}
          subtitle={`${flightEvents.length} events`}
        />
        <Divider />
        <FlatList
          data={flightEvents}
          keyExtractor={(item, i) => i.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventRow}>
              <Text style={styles.eventCell}>{item.timestamp}</Text>
              <Text style={styles.eventCell}>{item.event}</Text>
              <Text style={styles.eventCell}>{item.flightId}</Text>
              <Text style={styles.eventCell}>{item.location}</Text>
              <Chip
                style={[
                  styles.statusChip,
                  item.status === "completed"
                    ? styles.statusCompleted
                    : styles.statusResolved,
                ]}
                textStyle={{ color: "#fff" }}
              >
                {item.status}
              </Chip>
              <Chip
                style={[
                  styles.priorityChip,
                  item.priority === "STAT"
                    ? styles.priorityStat
                    : styles.priorityStandard,
                ]}
                textStyle={{ color: "#fff" }}
              >
                {item.priority}
              </Chip>
              <Text style={styles.eventCell}>
                {item.coc ? "✅" : "—"}
              </Text>
              <Text style={styles.eventCell}>{item.temperature}</Text>
              <Text style={styles.detailsText}>{item.details}</Text>
            </View>
          )}
        />
      </Card>

      {/* STATS FOOTER */}
      <View
        style={[
          styles.statsRow,
          { flexDirection: isMobile ? "column" : "row" },
        ]}
      >
        <Card style={[styles.statCard, styles.greenStat]}>
          <Card.Content>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Completed Flights</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.blueStat]}>
          <Card.Content>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Active Flights</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.purpleStat]}>
          <Card.Content>
            <Text style={styles.statNumber}>98.7%</Text>
            <Text style={styles.statLabel}>On-Time Rate</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, styles.redStat]}>
          <Card.Content>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>STAT Alerts</Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

export default FlightLogSystem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  headerCard: {
    backgroundColor: "#7e22ce",
    borderRadius: 16,
    marginBottom: 20,
    padding: 12,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 22,
  },
  headerSubtitle: {
    color: "#e9d5ff",
    fontSize: 13,
  },
  syncBox: { alignItems: "flex-end" },
  syncLabel: { color: "#e9d5ff", fontSize: 12 },
  syncTime: { color: "#fff", fontWeight: "700", fontSize: 16 },
  controlsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  searchBar: { flex: 1, height: 42 },
  refreshBtn: { borderColor: "#94a3b8" },
  pdfBtn: { backgroundColor: "#dc2626" },
  integrationRow: {
    justifyContent: "space-between",
    gap: 12,
  },
  integrationCard: {
    flex: 1,
    borderRadius: 12,
  },
  integrationContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  integrationTitle: { fontWeight: "700", fontSize: 16 },
  integrationSubtitle: { color: "#475569", fontSize: 13 },
  syncButtonGreen: {
    backgroundColor: "#16a34a",
  },
  syncButtonBlue: {
    backgroundColor: "#2563eb",
  },
  logCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#1e40af",
  },
  eventRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderBottomWidth: 0.5,
    borderColor: "#cbd5e1",
    paddingVertical: 6,
  },
  eventCell: {
    flex: 1,
    fontSize: 12,
    color: "#334155",
  },
  detailsText: {
    flex: 2,
    fontSize: 12,
    color: "#475569",
  },
  statusChip: {
    height: 26,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  statusCompleted: {
    backgroundColor: "#16a34a",
  },
  statusResolved: {
    backgroundColor: "#3b82f6",
  },
  priorityChip: {
    height: 26,
    justifyContent: "center",
    marginHorizontal: 4,
  },
  priorityStat: {
    backgroundColor: "#dc2626",
  },
  priorityStandard: {
    backgroundColor: "#64748b",
  },
  statsRow: {
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
  statLabel: {
    color: "#f1f5f9",
    fontSize: 13,
    textAlign: "center",
  },
  greenStat: { backgroundColor: "#16a34a" },
  blueStat: { backgroundColor: "#2563eb" },
  purpleStat: { backgroundColor: "#7e22ce" },
  redStat: { backgroundColor: "#dc2626" },
});
