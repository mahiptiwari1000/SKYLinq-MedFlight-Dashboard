import React, { useState } from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { Button, Card, Divider, Switch, Text } from "react-native-paper";

const SKYLinqCommandPanel = () => {
  const [statAlert, setStatAlert] = useState(true);
  const [overnightOps, setOvernightOps] = useState(false);
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.headerTitle}>
            SKY Linq Command Panel
          </Text>
          <Text style={styles.headerSubtitle}>
            Partner-facing medical logistics control center
          </Text>
          <Text style={styles.liveStatus}>
            Partner Portal | <Text style={styles.live}>Live Status</Text>
          </Text>
        </Card.Content>
      </Card>

      {/* 2-Column Grid */}
      <View
        style={[
          styles.gridContainer,
          { flexDirection: isMobile ? "column" : "row", flexWrap: "wrap" },
        ]}
      >
        {/* LEFT COLUMN */}
        <View style={[styles.column, isMobile && styles.fullWidth]}>
          {/* Alert Management */}
          <Card style={styles.alertCard}>
            <Card.Title title="⚠️ Alert Management" titleStyle={styles.alertTitle} />
            <Card.Content>
              <View style={styles.toggleRow}>
                <View>
                  <Text style={styles.toggleLabel}>STAT Alert Toggle</Text>
                  <Text style={styles.toggleSub}>Emergency priority notifications</Text>
                </View>
                <Switch value={statAlert} onValueChange={setStatAlert} color="#dc2626" />
              </View>
              <Divider style={styles.divider} />
              <View style={styles.toggleRow}>
                <View>
                  <Text style={styles.toggleLabel}>Overnight Operations</Text>
                  <Text style={styles.toggleSub}>24/7 service availability</Text>
                </View>
                <Switch value={overnightOps} onValueChange={setOvernightOps} color="#facc15" />
              </View>
            </Card.Content>
          </Card>

          {/* Cold Chain Status */}
          <Card style={styles.coldCard}>
  <Card.Title title="🌡️ Cold Chain Status" titleStyle={styles.coldTitle} />
  <Card.Content>
    {[
      { name: "Cooler A-001", temp: "2.5°C", ok: true },
      { name: "Cooler A-002", temp: "3.1°C", ok: true },
      { name: "Cooler B-001", temp: "8.2°C ⚠️", ok: false },
    ].map((c, i) => (
      <View key={i} style={styles.coolerRow}>
        <Text style={styles.coolerName}>{c.name}</Text>
        <Text style={c.ok ? styles.coolerTempOK : styles.coolerTempAlert}>{c.temp}</Text>
      </View>
    ))}
    {![
      { name: "Cooler A-001", ok: true },
      { name: "Cooler A-002", ok: true },
      { name: "Cooler B-001", ok: false },
    ].every(c => c.ok) && (
      <Card style={styles.coldChainAlertBox}>
        <Card.Content>
          <Text style={styles.coldChainAlertText}>
            ⚠️ Cold chain failure detected in Cooler B-001
          </Text>
        </Card.Content>
      </Card>
    )}
  </Card.Content>
</Card>

        </View>

        {/* RIGHT COLUMN */}
        <View style={[styles.column, isMobile && styles.fullWidth]}>
          {/* Quick Actions */}
          <Card style={styles.actionCard}>
            <Card.Title title="🔗 Quick Actions" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <Button
                mode="contained"
                style={styles.actionBtn}
                labelStyle={styles.actionLabel}
              >
                QR Scan & Intake
              </Button>
              <Button
                mode="contained"
                style={[styles.actionBtn, styles.secondaryBtn]}
                labelStyle={styles.actionLabel}
              >
                Compliance Upload
              </Button>
            </Card.Content>
          </Card>

          {/* AI Response Systems */}
          <Card style={styles.aiCard}>
            <Card.Title title="🤖 AI Response Systems" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <View style={styles.aiRow}>
                <Text style={styles.aiLabel}>Captain Dispatch AI</Text>
                <Text style={styles.statusGreen}>Active</Text>
              </View>
              <View style={styles.aiRow}>
                <Text style={styles.aiLabel}>Ascleon MedIntel</Text>
                <Text style={styles.statusGreen}>Active</Text>
              </View>
            </Card.Content>
          </Card>

          {/* Recent Activity */}
          <Card style={styles.activityCard}>
            <Card.Title title="🕒 Recent Activity" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <Text style={styles.activityText}>
                12:45 PM – Pickup completed at Chicago MedPort
              </Text>
              <Text style={styles.activityText}>
                1:10 PM – STAT request received from Mercy West
              </Text>
              <Text style={styles.activityText}>
                1:22 PM – Dispatch AI optimized route ETA 18 min
              </Text>
            </Card.Content>
          </Card>

          {/* System Health */}
          <Card style={styles.systemCard}>
            <Card.Title title="🩺 System Health" titleStyle={styles.sectionTitle} />
            <Card.Content>
              <View style={styles.healthRow}>
                <Text style={styles.healthLabel}>Server Uptime</Text>
                <Text style={styles.statusGreen}>99.98%</Text>
              </View>
              <View style={styles.healthRow}>
                <Text style={styles.healthLabel}>Response Latency</Text>
                <Text style={styles.statusGreen}>183ms</Text>
              </View>
              <View style={styles.healthRow}>
                <Text style={styles.healthLabel}>System Alerts</Text>
                <Text style={styles.statusYellow}>2 Warnings</Text>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

export default SKYLinqCommandPanel;

const styles = StyleSheet.create({
  // ---------- CONTAINER ----------
  container: {
    flex: 1,
    backgroundColor: "#e2e8f0", // soft background
    padding: 16,
  },

  // ---------- HEADER ----------
  headerCard: {
    backgroundColor: "#1e293b", // dark slate
    borderRadius: 16,
    marginBottom: 24,
    padding: 16,
  },
  headerTitle: {
    color: "#f8fafc", // soft white
    fontWeight: "700",
    fontSize: 20,
  },
  headerSubtitle: {
    color: "#cbd5e1", // light gray
    marginTop: 4,
    fontSize: 14,
  },
  liveStatus: {
    color: "#f8fafc",
    marginTop: 6,
    fontSize: 13,
  },
  live: {
    fontWeight: "bold",
  },

  // ---------- GRID ----------
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

  // ---------- ALERT MANAGEMENT ----------
  alertCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  alertTitle: {
    color: "#ef4444", // bright red
    fontWeight: "700",
    fontSize: 16,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  toggleLabel: {
    fontWeight: "700",
    fontSize: 14,
    color: "#1e293b", // dark slate
  },
  toggleSub: {
    color: "#64748b", // slate gray
    fontSize: 12,
  },
  statAlertLabel: {
    color: "#ef4444", // red
    fontWeight: "700",
    fontSize: 14,
  },
  overnightOpsLabel: {
    color: "#fbbf24", // golden yellow
    fontWeight: "700",
    fontSize: 14,
  },
  divider: {
    backgroundColor: "#cbd5e1",
    marginVertical: 6,
  },

  // ---------- COLD CHAIN STATUS ----------
  coldCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  coldTitle: {
    color: "#3b82f6", // vibrant blue
    fontWeight: "700",
    fontSize: 16,
  },
  coolerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  coolerName: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: 14,
  },
  coolerTempOK: {
    color: "#22c55e", // green when normal
    fontWeight: "700",
    fontSize: 14,
  },
  coolerTempAlert: {
    color: "#ef4444", // red when alert
    fontWeight: "700",
    fontSize: 14,
  },
  coldChainAlertBox: {
    backgroundColor: "#fee2e2", // light red
    borderRadius: 8,
    marginTop: 12,
    padding: 10,
  },
  coldChainAlertText: {
    color: "#ef4444", // red text
    fontWeight: "700",
    fontSize: 14,
  },

  // ---------- QUICK ACTIONS ----------
  actionCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  sectionTitle: {
    color: "#3b82f6", // vibrant blue
    fontWeight: "700",
    fontSize: 16,
  },
  actionBtn: {
    backgroundColor: "#2563eb",
    marginVertical: 8,
    borderRadius: 8,
  },
  secondaryBtn: {
    backgroundColor: "#7c3aed",
  },
  actionLabel: {
    color: "#f8fafc",
    fontWeight: "600",
  },

  // ---------- AI SYSTEMS ----------
  aiCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  aiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  aiLabel: {
    fontSize: 14,
    color: "#1e293b",
  },
  statusGreen: {
    color: "#22c55e",
    fontWeight: "600",
  },
  statusYellow: {
    color: "#fbbf24",
    fontWeight: "600",
  },

  // ---------- RECENT ACTIVITY ----------
  activityCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
  },
  activityText: {
    color: "#475569",
    fontSize: 13,
    marginBottom: 6,
  },

  // ---------- SYSTEM HEALTH ----------
  systemCard: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    marginBottom: 32,
    padding: 12,
  },
  healthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  healthLabel: {
    fontSize: 14,
    color: "#1e293b",
  },
});




