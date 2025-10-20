import { MaterialCommunityIcons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";

const PilotSkyDashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text variant="headlineSmall" style={styles.headerTitle}>
              Pilot SKY Dashboard
            </Text>
            <Text style={styles.headerSubtitle}>
              Real-time flight operations and telemetry
            </Text>
          </View>
          <View style={styles.flightInfoBox}>
            <Text style={styles.flightIdLabel}>Flight ID</Text>
            <Text style={styles.flightId}>
              PEGA-001{" "}
              <MaterialCommunityIcons name="airplane-takeoff" size={24} />
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* GRID LAYOUT */}
      <View style={[styles.gridContainer, isMobile && styles.mobileContainer]}>
        {/* LEFT COLUMN */}
        <View style={[styles.column, isMobile && styles.fullWidth]}>
          {/* Telemetry */}
          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons
                    name="flash"
                    size={16}
                    color="#4f46e5"
                  />{" "}
                  PEGA Real-time Telemetry
                </Text>
              }
            />
            <Card.Content style={styles.telemetryRow}>
              <View style={styles.telemetryItem}>
                <MaterialCommunityIcons
                  name="battery-charging-80"
                  size={28}
                  color="#16a34a"
                />
                <Text style={styles.telemetryValueGreen}>75%</Text>
                <Text style={styles.telemetryLabel}>Battery Level</Text>
                <View style={styles.batteryBar}>
                  <View style={[styles.batteryFill, { width: "75%" }]} />
                </View>
              </View>
              <View style={styles.telemetryItem}>
                <MaterialCommunityIcons
                  name="clock-outline"
                  size={28}
                  color="#2563eb"
                />
                <Text style={styles.telemetryValueBlue}>14:32</Text>
                <Text style={styles.telemetryLabel}>ETA</Text>
                <Text style={styles.telemetrySub}>Houston Methodist</Text>
              </View>
              <View style={styles.telemetryItem}>
                <MaterialCommunityIcons
                  name="thermometer"
                  size={28}
                  color="#2563eb"
                />
                <Text style={styles.telemetryValueBlue}>3.3°C</Text>
                <Text style={styles.telemetryLabel}>Cooler Temp</Text>
                <View style={styles.optimalBadge}>
                  <Text style={styles.optimalText}>Optimal</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Dispatch */}
          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons
                    name="airplane"
                    size={16}
                    color="#9333ea"
                  />{" "}
                  Dispatch Status
                </Text>
              }
            />
            <Card.Content>
              <View style={styles.dispatchHeader}>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeText}>ACTIVE</Text>
                </View>
                <Text style={styles.routeText}>
                  Houston Methodist → MD Anderson
                </Text>
                <Button
                  mode="outlined"
                  textColor="#475569"
                  style={styles.overrideButton}
                  labelStyle={{ fontSize: 12 }}
                >
                  Override
                </Button>
              </View>
              <View style={styles.dispatchLocations}>
                <Card style={styles.locationCard}>
                  <Card.Content>
                    <View style={styles.locationHeader}>
                      <MaterialCommunityIcons
                        name="map-marker-check"
                        size={20}
                        color="#16a34a"
                      />
                      <Text style={styles.pointLabel}>Pickup</Text>
                    </View>
                    <Text style={styles.pointName}>Houston Methodist</Text>
                    <Text style={styles.pointTime}>Completed 12:30</Text>
                  </Card.Content>
                </Card>
                <Card style={styles.locationCard}>
                  <Card.Content>
                    <View style={styles.locationHeader}>
                      <MaterialCommunityIcons
                        name="map-marker"
                        size={20}
                        color="#2563eb"
                      />
                      <Text style={styles.pointLabel}>Destination</Text>
                    </View>
                    <Text style={styles.pointName}>
                      MD Anderson Cancer Center
                    </Text>
                    <Text style={styles.pointTime}>ETA 14:32</Text>
                  </Card.Content>
                </Card>
              </View>
            </Card.Content>
          </Card>

          {/* Weather Alert */}
          <Card style={[styles.card, { backgroundColor: "#fffbeb" }]}>
            <Card.Title
              title={
                <Text style={[styles.cardTitle, { color: "#f97316" }]}>
                  <MaterialCommunityIcons
                    name="weather-partly-cloudy"
                    size={16}
                    color="#f97316"
                  />{" "}
                  Weather Alert Integration
                </Text>
              }
            />
            <Card.Content>
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>
                  <Text style={{ color: "#f59e0b" }}>▲</Text> Moderate
                  turbulence expected between waypoints 2-3
                </Text>
              </View>
              <View style={styles.weatherRow}>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherLabel}>Wind Speed</Text>
                  <Text style={styles.weatherValue}>12 mph</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherLabel}>Visibility</Text>
                  <Text style={styles.weatherValue}>8 mi</Text>
                </View>
                <View style={styles.weatherItem}>
                  <Text style={styles.weatherLabel}>Precipitation</Text>
                  <Text style={styles.weatherValue}>15%</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* RIGHT COLUMN */}
        <View style={[styles.column, isMobile && styles.fullWidth]}>
          {/* Flight Workflow */}
          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={16}
                    color="#2563eb"
                  />{" "}
                  Flight Workflow
                </Text>
              }
            />
            <Card.Content>
              <View style={styles.workflowStepsContainer}>
                <View style={styles.workflowItem}>
                  <Text style={styles.workflowDotActive}>●</Text>
                  <Text style={styles.workflowTextActive}>Pre-flight</Text>
                  <View style={styles.workflowActiveBadge}>
                    <Text style={styles.workflowActiveBadgeText}>Active</Text>
                  </View>
                </View>
                <View style={styles.workflowItem}>
                  <Text style={styles.workflowDot}>●</Text>
                  <Text style={styles.workflowText}>In-flight</Text>
                </View>
                <View style={styles.workflowItem}>
                  <Text style={styles.workflowDot}>●</Text>
                  <Text style={styles.workflowText}>Post-flight</Text>
                </View>
              </View>

              <View style={styles.workflowBtnGroup}>
                <Button
                  mode="contained"
                  style={styles.workflowBtnActive}
                  labelStyle={styles.workflowBtnTextActive}
                >
                  Set Pre-flight
                </Button>
                <Button
                  mode="outlined"
                  style={styles.workflowBtn}
                  labelStyle={styles.workflowBtnText}
                >
                  Set In-flight
                </Button>
                <Button
                  mode="outlined"
                  style={styles.workflowBtn}
                  labelStyle={styles.workflowBtnText}
                >
                  Set Post-flight
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Mission Details */}
          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons
                    name="rocket-launch-outline"
                    size={16}
                    color="#64748b"
                  />{" "}
                  Mission Details
                </Text>
              }
            />
            <Card.Content>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Mission Type:</Text>
                <View style={styles.missionBadgeSTAT}>
                  <Text style={styles.missionBadgeText}>STAT</Text>
                </View>
              </View>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Cargo Type:</Text>
                <Text style={styles.missionValue}>Organ Transport</Text>
              </View>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Priority:</Text>
                <Text style={styles.priorityCritical}>Critical</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Distance:</Text>
                <Text style={styles.missionValue}>47.3 mi</Text>
              </View>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Flight Time:</Text>
                <Text style={styles.missionValue}>18 min</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Quick Actions */}
          <Card style={[styles.card, { backgroundColor: "#f0fdf4" }]}>
            <Card.Title
              title={
                <Text style={[styles.cardTitle, { color: "#16a34a" }]}>
                  <MaterialCommunityIcons
                    name="flash"
                    size={16}
                    color="#16a34a"
                  />{" "}
                  Quick Actions
                </Text>
              }
            />
            <Card.Content>
              <Button
                mode="contained"
                style={styles.emergencyBtn}
                labelStyle={{ color: "#fff" }}
              >
                Emergency Landing
              </Button>
              <Button mode="outlined" style={styles.actionBtn}>
                Request Priority Clearance
              </Button>
              <Button mode="outlined" style={styles.actionBtn}>
                Update ETA
              </Button>
              <Button mode="outlined" style={styles.actionBtn}>
                Contact Control Tower
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* FOOTER BUTTONS */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonBlue]}
        >
          <MaterialCommunityIcons
            name="file-document-outline"
            size={18}
            color="#2563eb"
          />
          <Text style={styles.footerButtonText}>Flight Log</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonPurple]}
        >
          <MaterialCommunityIcons
            name="cellphone-wireless"
            size={18}
            color="#9333ea"
          />
          <Text style={styles.footerButtonText}>Terminal Requests</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PilotSkyDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc", // Lighter background
    paddingHorizontal: 16,
  },
  headerCard: {
    backgroundColor: "#4338ca", // Adjusted color
    borderRadius: 20,
    marginTop: 16,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "#f8fafc", fontWeight: "bold", fontSize: 28 },
  headerSubtitle: { color: "#dbeafe", fontSize: 14, marginTop: 4 },
  flightInfoBox: { alignItems: "flex-end", padding: 8 },
  flightIdLabel: { color: "#c7d2fe", fontSize: 12 },
  flightId: { color: "#f8fafc", fontWeight: "bold", fontSize: 22 },
  gridContainer: { flexDirection: "row", columnGap: 20 },
  mobileContainer: { flexDirection: "column" },
  column: { flex: 1, rowGap: 20 },
  fullWidth: { minWidth: "100%" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: { fontWeight: "bold", color: "#475569", fontSize: 16 },
  // Telemetry
  telemetryRow: { flexDirection: "row", justifyContent: "space-around" },
  telemetryItem: { alignItems: "center", gap: 6, flex: 1 },
  telemetryLabel: { color: "#64748b", fontSize: 12 },
  telemetryValueGreen: { color: "#16a34a", fontSize: 24, fontWeight: "bold" },
  telemetryValueBlue: { color: "#2563eb", fontSize: 24, fontWeight: "bold" },
  telemetrySub: { color: "#64748b", fontSize: 12 },
  optimalBadge: {
    backgroundColor: "#e0f2fe",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  optimalText: { color: "#0ea5e9", fontSize: 11, fontWeight: "500" },
  batteryBar: {
    height: 6,
    width: "80%",
    backgroundColor: "#e2e8f0",
    borderRadius: 3,
    marginTop: 4,
  },
  batteryFill: { height: 6, backgroundColor: "#16a34a", borderRadius: 3 },
  // Dispatch
  dispatchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
  },
  activeBadge: {
    backgroundColor: "#dcfce7",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeText: { color: "#166534", fontWeight: "600", fontSize: 12 },
  routeText: { color: "#1e293b", fontWeight: "600" },
  overrideButton: { borderColor: "#cbd5e1" },
  dispatchLocations: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  locationCard: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
    borderWidth: 1,
  },
  locationHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  pointLabel: { color: "#64748b", fontSize: 13, fontWeight: "500" },
  pointName: { fontWeight: "bold", color: "#1e293b", marginTop: 8 },
  pointTime: { fontSize: 12, color: "#64748b", marginTop: 4 },
  // Weather
  alertBox: {
    backgroundColor: "#fefce8",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#fef08a",
  },
  alertText: { color: "#a16207", fontWeight: "500" },
  weatherRow: { flexDirection: "row", justifyContent: "space-around" },
  weatherItem: { alignItems: "center" },
  weatherLabel: { color: "#64748b", fontSize: 13 },
  weatherValue: { fontWeight: "bold", color: "#1e293b", fontSize: 16 },
  // Workflow
  workflowStepsContainer: {
    marginBottom: 24,
    gap: 16,
  },
  workflowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  workflowDotActive: {
    color: "#facc15",
    fontSize: 14,
    marginRight: 12,
  },
  workflowTextActive: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 15,
  },
  workflowDot: {
    color: "#e2e8f0",
    fontSize: 14,
    marginRight: 12,
  },
  workflowText: {
    color: "#94a3b8",
    fontSize: 15,
  },
  workflowActiveBadge: {
    backgroundColor: "#fef9c3",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: "auto",
  },
  workflowActiveBadgeText: {
    color: "#854d0e",
    fontSize: 12,
    fontWeight: "500",
  },
  workflowBtnGroup: {
    gap: 12,
  },
  workflowBtnActive: {
    backgroundColor: "#1e293b",
    borderRadius: 50,
    paddingVertical: 8,
  },
  workflowBtnTextActive: {
    color: "#c4b5fd",
    fontWeight: "600",
    fontSize: 14,
  },
  workflowBtn: {
    borderColor: "#ede9fe",
    backgroundColor: "#f5f3ff",
    borderRadius: 50,
    paddingVertical: 8,
  },
  workflowBtnText: {
    color: "#a78bfa",
    fontWeight: "600",
    fontSize: 14,
  },
  // Mission
  missionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  missionLabel: { color: "#475569", fontSize: 14 },
  missionValue: { color: "#1e293b", fontWeight: "500", fontSize: 14 },
  missionBadgeSTAT: {
    backgroundColor: "#fee2e2",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  missionBadgeText: { color: "#b91c1c", fontWeight: "bold", fontSize: 12 },
  priorityCritical: { color: "#dc2626", fontWeight: "bold" },
  divider: { marginVertical: 8, backgroundColor: "#e2e8f0" },
  // Actions
  emergencyBtn: {
    backgroundColor: "#16a34a",
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 8,
  },
  actionBtn: {
    borderColor: "#cbd5e1",
    borderRadius: 8,
    paddingVertical: 6,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  // Footer
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 24,
    gap: 16,
  },
  footerButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    shadowColor: "#94a3b8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  footerButtonBlue: {
    borderColor: "#dbeafe",
  },
  footerButtonPurple: {
    borderColor: "#e9d5ff",
  },
  footerButtonText: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 15,
  },
});