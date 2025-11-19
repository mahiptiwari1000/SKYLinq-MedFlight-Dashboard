import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View
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

  // ---- Helper to build status stats + pie chart gradient ----
  const buildStatusStats = useCallback(() => {
    const counts = {};
    flightEvents.forEach((e) => {
      counts[e.status] = (counts[e.status] || 0) + 1;
    });

    const total = flightEvents.length;
    const segments = [];
    let current = 0;

    Object.entries(counts).forEach(([status, count]) => {
      const pct = (count as number) / total;
      const start = current * 100;
      const end = (current + pct) * 100;
      segments.push({ status, start, end, count });
      current += pct;
    });

    // Map statuses to colors (these should match your app palette)
    const statusColors: Record<string, string> = {
      completed: "#22c55e", // green
      resolved: "#3b82f6", // blue
    };

    const gradientStops = segments
      .map((seg) => {
        const color = statusColors[seg.status] || "#64748b";
        return `${color} ${seg.start.toFixed(2)}% ${seg.end.toFixed(2)}%`;
      })
      .join(", ");

    return { segments, total, gradientStops, statusColors };
  }, [flightEvents]);

  // ---- HTML generator for the PDF ----
  const generatePdfHtml = useCallback(() => {
    const { segments, total, gradientStops, statusColors } = buildStatusStats();

    const rowsHtml = flightEvents
      .map(
        (e) => `
        <tr>
          <td>${e.timestamp}</td>
          <td>${e.event}</td>
          <td>${e.flightId}</td>
          <td>${e.location}</td>
          <td>${e.status}</td>
          <td>${e.priority}</td>
          <td>${e.temp}</td>
        </tr>
      `
      )
      .join("");

    const legendHtml = segments
      .map((seg) => {
        const color = statusColors[seg.status] || "#64748b";
        const pct = ((seg.count as number) / total) * 100;
        return `
          <div class="legend-item">
            <span class="legend-color" style="background-color:${color};"></span>
            <span class="legend-text">
              ${seg.status} – ${seg.count} (${pct.toFixed(1)}%)
            </span>
          </div>
        `;
      })
      .join("");

    return `
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Flight Logs Report</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            padding: 24px;
            color: #0f172a;
            background-color: #f8fafc;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 4px;
            color: #111827;
          }
          h2 {
            font-size: 18px;
            margin-top: 24px;
            margin-bottom: 8px;
            color: #111827;
          }
          .subtitle {
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 16px;
          }
          .header-meta {
            font-size: 12px;
            color: #6b7280;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            font-size: 11px;
          }
          th, td {
            border: 1px solid #e5e7eb;
            padding: 6px 8px;
            text-align: left;
          }
          th {
            background-color: #f3f4f6;
            font-weight: 600;
            color: #374151;
          }
          tr:nth-child(even) td {
            background-color: #f9fafb;
          }

          .summary-row {
            display: flex;
            gap: 16px;
            margin-top: 12px;
          }
          .summary-card {
            flex: 1;
            border-radius: 12px;
            padding: 10px 12px;
            color: #fff;
          }
          .summary-title {
            font-size: 12px;
            opacity: 0.9;
          }
          .summary-number {
            font-size: 20px;
            font-weight: 700;
            margin-top: 4px;
          }
          .summary-green { background-color: #22c55e; }
          .summary-blue { background-color: #3b82f6; }
          .summary-purple { background-color: #8b5cf6; }
          .summary-red { background-color: #ef4444; }

          .chart-container {
            display: flex;
            gap: 24px;
            align-items: center;
            margin-top: 12px;
          }
          .pie {
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: conic-gradient(${gradientStops});
            border: 4px solid #e5e7eb;
          }
          .legend {
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 12px;
          }
          .legend-item {
            display: flex;
            align-items: center;
            gap: 6px;
          }
          .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 999px;
            display: inline-block;
          }
          .legend-text {
            color: #374151;
          }
        </style>
      </head>
      <body>
        <h1>Flight Log System – Report</h1>
        <div class="subtitle">
          Comprehensive flight event tracking and documentation
        </div>
        <div class="header-meta">
          Generated at: ${new Date().toLocaleString()}
          <br/>
          Total events: ${flightEvents.length}
        </div>

        <h2>Flight Status Overview</h2>
        <div class="chart-container">
          <div class="pie"></div>
          <div class="legend">
            ${legendHtml}
          </div>
        </div>

        <div class="summary-row">
          <div class="summary-card summary-green">
            <div class="summary-title">Completed Flights</div>
            <div class="summary-number">24</div>
          </div>
          <div class="summary-card summary-blue">
            <div class="summary-title">Active Missions</div>
            <div class="summary-number">3</div>
          </div>
          <div class="summary-card summary-purple">
            <div class="summary-title">Success Rate</div>
            <div class="summary-number">98.7%</div>
          </div>
          <div class="summary-card summary-red">
            <div class="summary-title">STAT Alerts</div>
            <div class="summary-number">2</div>
          </div>
        </div>

        <h2>Flight Events Log</h2>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Event</th>
              <th>Flight ID</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Temp</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
    </html>
    `;
  }, [buildStatusStats, flightEvents]);

  // ---- Export handler ----
  const handleExportPdf = useCallback(async () => {
    try {
      const html = generatePdfHtml();

      const { uri } = await Print.printToFileAsync({
        html,
        base64: false,
      });

      // Open share dialog so user can download / save / share the PDF
      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: "Share Flight Logs Report",
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  }, [generatePdfHtml]);

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
              onPress={handleExportPdf}   // <<< HERE
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
              <Text style={styles.eventCountText}>
                {flightEvents.length} events
              </Text>
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
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  // Header (purple banner)
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

  // Controls
  controlCard: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
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
    backgroundColor: "#ffffff",
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
