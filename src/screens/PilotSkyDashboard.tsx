import React from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    useWindowDimensions,
} from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";

const PilotSkyDashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container}>
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
            <Text style={styles.flightId}>PEGA-001 ✈️</Text>
          </View>
        </Card.Content>
      </Card>

      {/* GRID LAYOUT */}
      <View
        style={[
          styles.gridContainer,
          { flexDirection: isMobile ? "column" : "row", flexWrap: "wrap" },
        ]}
      >
        {/* LEFT COLUMN */}
        <View style={[styles.column, isMobile && styles.fullWidth]}>
          {/* Telemetry */}
          <Card style={styles.telemetryCard}>
            <Card.Title
              title="⚡ PEGA Real-time Telemetry"
              titleStyle={styles.sectionTitle}
            />
            <Card.Content style={styles.telemetryRow}>
              <View style={styles.telemetryItem}>
                <Text style={styles.telemetryLabel}>Battery Level</Text>
                <Text style={styles.telemetryValueGreen}>80%</Text>
              </View>
              <View style={styles.telemetryItem}>
                <Text style={styles.telemetryLabel}>ETA</Text>
                <Text style={styles.telemetryValueBlue}>14:32</Text>
                <Text style={styles.telemetrySub}>Houston Methodist</Text>
              </View>
              <View style={styles.telemetryItem}>
                <Text style={styles.telemetryLabel}>Cooler Temp</Text>
                <Text style={styles.telemetryValueBlue}>3.6°C</Text>
                <Text style={styles.telemetryStatus}>Optimal</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Dispatch */}
          <Card style={styles.dispatchCard}>
            <Card.Title
              title="✈️ Dispatch Status"
              titleStyle={styles.sectionTitlePurple}
            />
            <Card.Content>
              <View style={styles.routeRow}>
                <Text style={styles.statusActive}>ACTIVE</Text>
                <Text style={styles.routeText}>
                  Houston Methodist → MD Anderson
                </Text>
                <Button mode="outlined" textColor="#1e293b">
                  Override
                </Button>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.pickupRow}>
                <View style={styles.point}>
                  <Text style={styles.pointLabel}>Pickup</Text>
                  <Text style={styles.pointName}>Houston Methodist</Text>
                  <Text style={styles.pointTime}>Completed 12:30</Text>
                </View>
                <View style={styles.point}>
                  <Text style={styles.pointLabel}>Destination</Text>
                  <Text style={styles.pointName}>
                    MD Anderson Cancer Center
                  </Text>
                  <Text style={styles.pointTime}>ETA 14:32</Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Weather Alert */}
          <Card style={styles.weatherCard}>
            <Card.Title
              title="🌤️ Weather Alert Integration"
              titleStyle={styles.sectionTitleOrange}
            />
            <Card.Content>
              <View style={styles.alertBox}>
                <Text style={styles.alertText}>
                  ⚠️ Moderate turbulence expected between waypoints 2–3
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
          {/* Flight Workflow */}
          <Card style={styles.workflowCard}>
            <Card.Title
              title="🧭 Flight Workflow"
              titleStyle={styles.sectionTitleBlue}
            />
            <Card.Content>
              <View style={styles.workflowStepsContainer}>
                <Text style={styles.workflowStepActive}>
                  ● Pre-flight (Active)
                </Text>
                <Text style={styles.workflowStep}>○ In-flight</Text>
                <Text style={styles.workflowStep}>○ Post-flight</Text>
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
                  style={styles.workflowBtnLight}
                  labelStyle={styles.workflowBtnText}
                >
                  Set In-flight
                </Button>
                <Button
                  mode="outlined"
                  style={styles.workflowBtnLight}
                  labelStyle={styles.workflowBtnText}
                >
                  Set Post-flight
                </Button>
              </View>
            </Card.Content>
          </Card>

          {/* Mission Details */}
          <Card style={styles.missionCard}>
            <Card.Title
              title="🚀 Mission Details"
              titleStyle={styles.sectionTitle}
            />
            <Card.Content>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Mission Type:</Text>
                <Text style={styles.missionBadge}>STAT</Text>
              </View>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Cargo Type:</Text>
                <Text>Organ Transport</Text>
              </View>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Priority:</Text>
                <Text style={styles.priorityCritical}>Critical</Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Distance:</Text>
                <Text>47.3 mi</Text>
              </View>
              <View style={styles.missionRow}>
                <Text style={styles.missionLabel}>Flight Time:</Text>
                <Text>18 min</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Quick Actions */}
          <Card style={styles.actionsCard}>
            <Card.Title
              title="⚡ Quick Actions"
              titleStyle={styles.sectionTitleGreen}
            />
            <Card.Content>
              <Button mode="contained" style={styles.emergencyBtn}>
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
    </ScrollView>
  );
};

export default PilotSkyDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    padding: 16,
  },
  headerCard: {
    backgroundColor: "#1e40af",
    borderRadius: 16,
    marginBottom: 20,
    padding: 16,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 20,
  },
  headerSubtitle: {
    color: "#dbeafe",
    fontSize: 13,
  },
  flightInfoBox: {
    alignItems: "flex-end",
  },
  flightIdLabel: {
    color: "#c7d2fe",
    fontSize: 12,
  },
  flightId: {
    color: "#f8fafc",
    fontWeight: "700",
    fontSize: 18,
  },
  gridContainer: {
    justifyContent: "space-between",
    rowGap: 16,
    columnGap: 16,
  },
  column: {
    flex: 1,
    minWidth: "48%",
  },
  fullWidth: {
    minWidth: "100%",
  },
  // Telemetry
  telemetryCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#2563eb",
    fontWeight: "700",
  },
  telemetryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  telemetryItem: {
    alignItems: "center",
  },
  telemetryLabel: {
    color: "#1e293b",
    fontSize: 13,
  },
  telemetryValueGreen: {
    color: "#16a34a",
    fontSize: 20,
    fontWeight: "700",
  },
  telemetryValueBlue: {
    color: "#2563eb",
    fontSize: 20,
    fontWeight: "700",
  },
  telemetrySub: {
    color: "#475569",
    fontSize: 12,
  },
  telemetryStatus: {
    color: "#0ea5e9",
    backgroundColor: "#e0f2fe",
    borderRadius: 8,
    paddingHorizontal: 6,
    fontSize: 11,
    marginTop: 4,
  },
  // Dispatch
  dispatchCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  sectionTitlePurple: {
    color: "#7c3aed",
    fontWeight: "700",
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusActive: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    paddingHorizontal: 8,
    borderRadius: 6,
    fontWeight: "600",
  },
  routeText: {
    flex: 1,
    textAlign: "center",
    color: "#1e293b",
    fontWeight: "600",
  },
  pickupRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  point: {
    flex: 1,
    alignItems: "center",
  },
  pointLabel: {
    color: "#64748b",
    fontSize: 12,
  },
  pointName: {
    fontWeight: "600",
    color: "#1e293b",
  },
  pointTime: {
    fontSize: 12,
    color: "#64748b",
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#cbd5e1",
  },
  // Weather
  weatherCard: {
    backgroundColor: "#fff7ed",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  sectionTitleOrange: {
    color: "#ea580c",
    fontWeight: "700",
  },
  alertBox: {
    backgroundColor: "#fef3c7",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  alertText: {
    color: "#92400e",
    fontSize: 13,
  },
  weatherRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  weatherItem: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 6,
  },
  weatherLabel: {
    color: "#475569",
    fontSize: 12,
  },
  weatherValue: {
    fontWeight: "700",
    color: "#1e293b",
  },
  // Workflow
  sectionTitleBlue: {
  color: "#2563eb",
  fontWeight: "700",
  fontSize: 16,
},

workflowCard: {
  backgroundColor: "#f8fafc",
  borderRadius: 20,
  marginBottom: 16,
  padding: 16,
  shadowColor: "#000",
  shadowOpacity: 0.05,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

workflowStepsContainer: {
  marginBottom: 12,
},

workflowStepActive: {
  color: "#ca8a04",
  fontWeight: "700",
  fontSize: 14,
  marginBottom: 4,
},

workflowStep: {
  color: "#94a3b8",
  fontSize: 14,
  marginBottom: 4,
},

workflowBtnGroup: {
  marginTop: 10,
  gap: 8,
},

workflowBtnActive: {
  backgroundColor: "#0f172a",
  borderRadius: 40,
  paddingVertical: 4,
  shadowColor: "#000",
  shadowOpacity: 0.15,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
},

workflowBtnLight: {
  borderColor: "#cbd5e1",
  backgroundColor: "#f1f5f9",
  borderRadius: 40,
  paddingVertical: 4,
},

workflowBtnTextActive: {
  color: "#e0e7ff",
  fontWeight: "700",
  fontSize: 14,
},

workflowBtnText: {
  color: "#64748b",
  fontWeight: "600",
  fontSize: 14,
},
  // Mission
  missionCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  missionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  missionLabel: {
    color: "#475569",
    fontWeight: "600",
  },
  missionBadge: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    fontWeight: "700",
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  priorityCritical: {
    color: "#dc2626",
    fontWeight: "700",
  },
  // Actions
  actionsCard: {
    backgroundColor: "#f0fdf4",
    borderRadius: 12,
    marginBottom: 32,
    padding: 12,
  },
  sectionTitleGreen: {
    color: "#16a34a",
    fontWeight: "700",
  },
  emergencyBtn: {
    backgroundColor: "#16a34a",
    marginVertical: 6,
  },
  actionBtn: {
    borderColor: "#a7f3d0",
    marginVertical: 6,
  },
});
