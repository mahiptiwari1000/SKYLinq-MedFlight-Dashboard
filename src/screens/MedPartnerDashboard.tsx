import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Button, Card } from "react-native-paper";

const StatCard = ({ icon, value, label, color }) => (

  <Card style={styles.statCard}>
    <Card.Content style={styles.statCardContent}>
      <View style={[styles.statIconContainer, { backgroundColor: color }]}>
        <MaterialCommunityIcons name={icon} size={22} color="#fff" />
      </View>
      <View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </View>
    </Card.Content>
  </Card>
);

const ProgressBar = ({ value, style }) => (
  <View style={[styles.progressBarContainer, style]}>
    <View style={[styles.progressBarFill, { width: `${value}%` }]} />
  </View>
);

const getStatusStyle = (status) => {
  switch (status.toLowerCase()) {
    case "in-transit":
      return styles.statusTagBlue;
    case "pending":
      return styles.statusTagYellow;
    case "preparing":
      return styles.statusTagOrange;
    default:
      return {};
  }
};
const getPriorityStyle = (priority) => {
  switch (priority.toLowerCase()) {
    case "critical":
      return styles.priorityTagRed;
    case "standard":
      return styles.priorityTagBlue;
    case "high":
      return styles.priorityTagOrange;
    default:
      return {};
  }
};

const MedPartnerDashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Medical Partner Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              Track deliveries and manage requests in real-time
            </Text>
          </View>
          <View style={styles.partnerIdBox}>
            <Text style={styles.partnerIdLabel}>Partner ID</Text>
            <Text style={styles.partnerId}>HMH-001</Text>
          </View>
          <MaterialCommunityIcons
            name="hospital-building"
            size={32}
            color="#fff"
            style={styles.headerIcon}
          />
        </Card.Content>
      </Card>

      {/* STATS ROW */}
      <View style={styles.statsRow}>
        <StatCard
          icon="truck-delivery-outline"
          value="3"
          label="Active Deliveries"
          color="#818cf8"
        />
        <StatCard
          icon="check-circle-outline"
          value="8"
          label="Completed Today"
          color="#4ade80"
        />
        <StatCard
          icon="clock-fast"
          value="18 min"
          label="Avg Delivery Time"
          color="#f472b6"
        />
        <StatCard
          icon="thermometer"
          value="100%"
          label="Temp Compliance"
          color="#60a5fa"
        />
      </View>

      {/* MAIN LAYOUT */}
      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* LEFT COLUMN */}
        <View style={[styles.mainColumn, isMobile && { width: "100%" }]}>
          {/* Active Deliveries */}
          <Card style={styles.card}>
            <Card.Title
              title={<Text style={styles.cardTitle}>Active Deliveries</Text>}
              right={() => <Text style={styles.activeCount}>3 Active</Text>}
            />
            <Card.Content style={{ gap: 16 }}>
              {/* Delivery Card 1 */}
              <View style={styles.deliveryCard}>
                <View style={styles.deliveryHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.deliveryId}>DEL-001</Text>
                    <View style={getStatusStyle("in-transit")}>
                      <Text style={styles.statusTagText}>in-transit</Text>
                    </View>
                    <View style={styles.statusTagRed}>
                      <Text style={styles.statusTagText}>STAT</Text>
                    </View>
                  </View>
                  <View style={getPriorityStyle("Critical")}>
                    <Text style={styles.priorityTagText}>Critical</Text>
                  </View>
                </View>
                <Text style={styles.deliveryType}>Heart - Transplant</Text>
                <View style={styles.locationRow}>
                  <View style={styles.locationItem}>
                    <MaterialCommunityIcons
                      name="map-marker-account-outline"
                      size={16}
                      color="#475569"
                    />
                    <Text>
                      Pickup:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        Houston Methodist Hospital
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.locationItem}>
                    <MaterialCommunityIcons
                      name="map-marker-check-outline"
                      size={16}
                      color="#475569"
                    />
                    <Text>
                      Destination:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        MD Anderson Cancer Center
                      </Text>
                    </Text>
                  </View>
                </View>
                <ProgressBar value={75} />
                <View style={styles.deliveryFooter}>
                  <Text style={styles.footerText}>
                    ETA: <Text style={{ fontWeight: "bold" }}>14:32</Text>
                  </Text>
                  <Text style={styles.footerText}>
                    <MaterialCommunityIcons
                      name="thermometer"
                      size={14}
                      color="#3b82f6"
                    />{" "}
                    Temp:{" "}
                    <Text style={{ fontWeight: "bold", color: "#3b82f6" }}>
                      2.8°C
                    </Text>
                  </Text>
                  <Text style={styles.footerText}>
                    <MaterialCommunityIcons name="airplane" size={14} /> Flight:{" "}
                    <Text style={{ fontWeight: "bold" }}>PEGA-001</Text>
                  </Text>
                </View>
              </View>

              {/* Delivery Card 2 */}
              <View style={styles.deliveryCard}>
                <View style={styles.deliveryHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.deliveryId}>DEL-002</Text>
                    <View style={getStatusStyle("pending")}>
                      <Text style={styles.statusTagText}>pending</Text>
                    </View>
                  </View>
                  <View style={getPriorityStyle("Standard")}>
                    <Text style={styles.priorityTagText}>Standard</Text>
                  </View>
                </View>
                <Text style={styles.deliveryType}>
                  Blood Products (8 units)
                </Text>
                <View style={styles.locationRow}>
                  <View style={styles.locationItem}>
                    <MaterialCommunityIcons
                      name="map-marker-account-outline"
                      size={16}
                      color="#475569"
                    />
                    <Text>
                      Pickup:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        Texas Children's Hospital
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.locationItem}>
                    <MaterialCommunityIcons
                      name="map-marker-check-outline"
                      size={16}
                      color="#475569"
                    />
                    <Text>
                      Destination:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        Memorial Hermann
                      </Text>
                    </Text>
                  </View>
                </View>
                <ProgressBar value={15} />
                <View style={styles.deliveryFooter}>
                  <Text style={styles.footerText}>
                    ETA: <Text style={{ fontWeight: "bold" }}>15:45</Text>
                  </Text>
                  <Text style={styles.footerText}>
                    <MaterialCommunityIcons
                      name="thermometer"
                      size={14}
                      color="#3b82f6"
                    />{" "}
                    Temp:{" "}
                    <Text style={{ fontWeight: "bold", color: "#3b82f6" }}>
                      4.1°C
                    </Text>
                  </Text>
                  <Text style={styles.footerText}>
                    <MaterialCommunityIcons name="airplane" size={14} /> Flight:{" "}
                    <Text style={{ fontWeight: "bold" }}>PEGA-003</Text>
                  </Text>
                </View>
              </View>

              {/* Delivery Card 3 */}
              <View style={styles.deliveryCard}>
                <View style={styles.deliveryHeader}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Text style={styles.deliveryId}>DEL-003</Text>
                    <View style={getStatusStyle("preparing")}>
                      <Text style={styles.statusTagText}>preparing</Text>
                    </View>
                  </View>
                  <View style={getPriorityStyle("High")}>
                    <Text style={styles.priorityTagText}>High</Text>
                  </View>
                </View>
                <Text style={styles.deliveryType}>Kidney - Transplant</Text>
                <View style={styles.locationRow}>
                  <View style={styles.locationItem}>
                    <MaterialCommunityIcons
                      name="map-marker-account-outline"
                      size={16}
                      color="#475569"
                    />
                    <Text>
                      Pickup:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        Baylor St. Luke's
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.locationItem}>
                    <MaterialCommunityIcons
                      name="map-marker-check-outline"
                      size={16}
                      color="#475569"
                    />
                    <Text>
                      Destination:{" "}
                      <Text style={{ fontWeight: "600" }}>
                        Houston Methodist
                      </Text>
                    </Text>
                  </View>
                </View>
                <ProgressBar value={5} />
                <View style={styles.deliveryFooter}>
                  <Text style={styles.footerText}>
                    ETA: <Text style={{ fontWeight: "bold" }}>16:15</Text>
                  </Text>
                  <Text style={styles.footerText}>
                    <MaterialCommunityIcons
                      name="thermometer"
                      size={14}
                      color="#3b82f6"
                    />{" "}
                    Temp:{" "}
                    <Text style={{ fontWeight: "bold", color: "#3b82f6" }}>
                      3.2°C
                    </Text>
                  </Text>
                  <Text style={styles.footerText}>
                    <MaterialCommunityIcons name="airplane" size={14} /> Flight:{" "}
                    <Text style={{ fontWeight: "bold" }}>PEGA-002</Text>
                  </Text>
                </View>
              </View>
            </Card.Content>
          </Card>

          {/* Recent History */}
          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={[styles.cardTitle, { color: "#166534" }]}>
                  <MaterialCommunityIcons
                    name="check-decagram-outline"
                    size={16}
                  />{" "}
                  Recent Delivery History
                </Text>
              }
            />
            <Card.Content style={{ gap: 16 }}>
              <View style={styles.historyItem}>
                <View>
                  <Text style={styles.historyTitle}>Liver - Transplant</Text>
                  <Text style={styles.historySub}>
                    MD Anderson · 2024-01-15
                  </Text>
                </View>
                <View style={styles.deliveredBadge}>
                  <Text style={styles.deliveredText}>Delivered</Text>
                  <Text style={styles.deliveredTime}>12:15</Text>
                </View>
              </View>
              <View style={styles.historyItem}>
                <View>
                  <Text style={styles.historyTitle}>Blood Products</Text>
                  <Text style={styles.historySub}>
                    Memorial Hermann · 2024-01-14
                  </Text>
                </View>
                <View style={styles.deliveredBadge}>
                  <Text style={styles.deliveredText}>Delivered</Text>
                  <Text style={styles.deliveredTime}>16:45</Text>
                </View>
              </View>
              <View style={styles.historyItem}>
                <View>
                  <Text style={styles.historyTitle}>Tissue Samples</Text>
                  <Text style={styles.historySub}>
                    Texas Children's · 2024-01-14
                  </Text>
                </View>
                <View style={styles.deliveredBadge}>
                  <Text style={styles.deliveredText}>Delivered</Text>
                  <Text style={styles.deliveredTime}>10:30</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* RIGHT COLUMN */}
        <View style={[styles.sidebarColumn, isMobile && { width: "100%" }]}>
          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons
                    name="lightning-bolt-outline"
                    size={16}
                  />{" "}
                  Quick Actions
                </Text>
              }
            />
            <Card.Content style={{ gap: 8 }}>
              <Button
                icon="plus-circle"
                mode="contained"
                style={styles.primaryButton}
                labelStyle={{ color: "#fff" }}
              >
                New Request
              </Button>
              <Button
                icon="qrcode-scan"
                mode="outlined"
                style={styles.secondaryButton}
              >
                Scan QR Code
              </Button>
              <Button
                icon="format-list-bulleted"
                mode="outlined"
                style={styles.secondaryButton}
              >
                View All Requests
              </Button>
              <Button
                icon="chart-box-outline"
                mode="outlined"
                style={styles.secondaryButton}
              >
                View Analytics
              </Button>
            </Card.Content>
          </Card>

          <Card style={styles.card}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons name="thermometer-lines" size={16} />{" "}
                  Cold Chain Status
                </Text>
              }
            />
            <Card.Content style={{ gap: 10 }}>
              <View style={styles.tempItem}>
                <Text>DEL-001</Text>
                <Text style={styles.tempValue}>2.8°C</Text>
                <View style={styles.optimalBadge}>
                  <Text style={styles.optimalText}>Optimal</Text>
                </View>
              </View>
              <View style={styles.tempItem}>
                <Text>DEL-002</Text>
                <Text style={styles.tempValue}>4.1°C</Text>
                <View style={styles.optimalBadge}>
                  <Text style={styles.optimalText}>Optimal</Text>
                </View>
              </View>
              <View style={styles.tempItem}>
                <Text>DEL-003</Text>
                <Text style={styles.tempValue}>3.2°C</Text>
                <View style={styles.optimalBadge}>
                  <Text style={styles.optimalText}>Optimal</Text>
                </View>
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={styles.complianceLabel}>Overall Compliance</Text>
                <Text style={styles.complianceValue}>100%</Text>
                <ProgressBar value={100} style={{ height: 10 }} />
                <Text style={styles.complianceSub}>
                  All shipments within range
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card style={[styles.card, { backgroundColor: "#fffbeb" }]}>
            <Card.Title
              title={
                <Text style={styles.cardTitle}>
                  <MaterialCommunityIcons name="alert-outline" size={16} />{" "}
                  Support & Help
                </Text>
              }
            />
            <Card.Content style={{ gap: 8 }}>
              <View style={styles.supportRow}>
                <Text style={styles.supportLabel}>Emergency Line:</Text>
                <Text style={styles.supportValue}>1-800-PEGA-911</Text>
              </View>
              <View style={styles.supportRow}>
                <Text style={styles.supportLabel}>Support Email:</Text>
                <Text style={styles.supportValue}>support@pegasus.com</Text>
              </View>
              <View style={styles.supportRow}>
                <Text style={styles.supportLabel}>Operating Hours:</Text>
                <Text style={styles.supportValue}>24/7</Text>
              </View>
              <Button
                mode="outlined"
                style={styles.contactButton}
                onPress={() => navigation.navigate("SupportChat")}
              >
                Contact Support
              </Button>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", paddingHorizontal: 16 },
  card: { backgroundColor: "#fff", borderRadius: 16, width: "100%" },
  cardTitle: { fontWeight: "bold", color: "#4f46e5" },
  // Header
  headerCard: {
    backgroundColor: "#6d28d9",
    borderRadius: 20,
    marginVertical: 16,
  },
  headerContent: { flexDirection: "row", alignItems: "center" },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { color: "#ddd6fe" },
  partnerIdBox: { marginLeft: "auto", alignItems: "flex-end" },
  partnerIdLabel: { color: "#ddd6fe", fontSize: 12 },
  partnerId: { color: "#fff", fontWeight: "bold", fontSize: 20 },
  headerIcon: { marginLeft: 12 },
  // Stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: "#1c1917", // Dark background
  },
  statCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14, // Gap between icon and text
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  statIconContainer: {
    padding: 12,
    borderRadius: 999,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fafaf9", // Off-white text
  },
  statLabel: {
    fontSize: 12,
    color: "#a8a29e", // Light gray text
  },
  // Layout
  mainLayout: { flexDirection: "row", gap: 20 },
  mainLayoutMobile: { flexDirection: "column" },
  mainColumn: { flex: 2, gap: 20 },
  sidebarColumn: { flex: 1, gap: 20 },
  // Active Deliveries
  activeCount: {
    backgroundColor: "#e0e7ff",
    color: "#4338ca",
    fontWeight: "bold",
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
  },
  deliveryCard: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 12,
  },
  deliveryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deliveryId: { fontWeight: "bold", fontSize: 16 },
  statusTagText: { color: "#fff", fontWeight: "500", fontSize: 11 },
  statusTagBlue: {
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusTagYellow: {
    backgroundColor: "#f59e0b",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusTagOrange: {
    backgroundColor: "#f97316",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  statusTagRed: {
    backgroundColor: "#ef4444",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  priorityTagText: { fontSize: 11, fontWeight: "500" },
  priorityTagRed: {
    backgroundColor: "#fee2e2",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "#b91c1c",
  },
  priorityTagBlue: {
    backgroundColor: "#dbeafe",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "#1e40af",
  },
  priorityTagOrange: {
    backgroundColor: "#ffedd5",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    color: "#9a3412",
  },
  deliveryType: { fontWeight: "600", color: "#334155", marginVertical: 8 },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 8,
    flexWrap: "wrap",
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#475569",
  },
  deliveryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  footerText: { fontSize: 12, color: "#475569", alignItems: "center" },
  // Progress Bar
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4f46e5",
    borderRadius: 4,
  },
  // History
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 12,
  },
  historyTitle: { fontWeight: "600", color: "#1e293b" },
  historySub: { fontSize: 12, color: "#64748b" },
  deliveredBadge: { alignItems: "flex-end" },
  deliveredText: {
    color: "#166534",
    backgroundColor: "#dcfce7",
    fontSize: 11,
    fontWeight: "500",
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  deliveredTime: { fontSize: 12, color: "#64748b", marginTop: 4 },
  // Sidebar
  primaryButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 8,
    paddingVertical: 4,
  },
  secondaryButton: {
    borderRadius: 8,
    borderColor: "#e2e8f0",
    paddingVertical: 4,
  },
  tempItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tempValue: { fontWeight: "bold", color: "#3b82f6" },
  optimalBadge: {
    backgroundColor: "#e0f2fe",
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  optimalText: { color: "#0ea5e9", fontSize: 11 },
  complianceLabel: { fontSize: 12, color: "#64748b" },
  complianceValue: { fontSize: 20, fontWeight: "bold", color: "#1e293b" },
  complianceSub: {
    fontSize: 11,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 4,
  },
  supportRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  supportLabel: { color: "#475569" },
  supportValue: { fontWeight: "bold", color: "#1e293b" },
  contactButton: { marginTop: 12, borderColor: "#f97316", color: "#f97316" },
});

export default MedPartnerDashboard;
