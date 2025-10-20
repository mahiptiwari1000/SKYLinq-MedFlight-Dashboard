import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as d3 from 'd3';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { Button, Card } from 'react-native-paper';
import { G, Line, Path, Rect, Svg, Text as SvgText } from 'react-native-svg';

//––––––––––––––––––––––––––––––––––––––––––––––––––
// CHART COMPONENT 1: BarChart
// (Ideally, this would be in its own file: BarChart.js)
//––––––––––––––––––––––––––––––––––––––––––––––––––
const BarChart = ({ data, width, height }) => {
  const margin = { top: 10, right: 0, bottom: 40, left: 30 };
  const graphWidth = width - margin.left - margin.right;
  const graphHeight = height - margin.top - margin.bottom;

  const x = d3.scaleBand()
    .domain(data.map(item => item.month))
    .range([0, graphWidth])
    .paddingInner(0.4)
    .paddingOuter(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .range([graphHeight, 0]);

  const yTicks = y.ticks(4);

  return (
    <View>
      <Svg width={width} height={height}>
        <G transform={`translate(${margin.left}, ${margin.top})`}>
          {/* Y-Axis Grid Lines & Labels */}
          {yTicks.map(tick => (
            <G key={tick}>
              <Line
                x1={0}
                y1={y(tick)}
                x2={graphWidth}
                y2={y(tick)}
                stroke="#e2e8f0"
                strokeDasharray="4"
              />
              <SvgText
                x={-8}
                y={y(tick) + 4}
                fill="#64748b"
                fontSize="12"
                textAnchor="end"
              >
                {tick}
              </SvgText>
            </G>
          ))}
          
          {/* Bars */}
          {data.map(item => (
            <G key={item.month}>
              <Rect
                x={x(item.month)}
                y={y(item.total)}
                width={x.bandwidth()}
                height={graphHeight - y(item.total)}
                fill="#60a5fa"
                rx={2}
              />
              <Rect
                x={x(item.month)}
                y={y(item.stat)}
                width={x.bandwidth()}
                height={graphHeight - y(item.stat)}
                fill="#f87171"
                rx={2}
              />
            </G>
          ))}

          {/* X-Axis Labels */}
          {data.map(item => (
             <SvgText
                key={`label-${item.month}`}
                x={x(item.month) + x.bandwidth() / 2}
                y={graphHeight + 20}
                fill="#64748b"
                fontSize="12"
                textAnchor="middle"
              >
                {item.month}
              </SvgText>
          ))}
        </G>
      </Svg>
    </View>
  );
};


//––––––––––––––––––––––––––––––––––––––––––––––––––
// CHART COMPONENT 2: PieChart
// (Ideally, this would be in its own file: PieChart.js)
//––––––––––––––––––––––––––––––––––––––––––––––––––
const PieChart = ({ data, width, height }) => {
  const radius = Math.min(width, height) / 2 - 10;
  
  const pie = d3.pie()
    .value(d => d.value)
    .sort(null);

  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

  const colors = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']);

  const pieData = pie(data);

  return (
    <View>
      <Svg width={width} height={height}>
        <G transform={`translate(${width / 2}, ${height / 2})`}>
          {pieData.map((d, index) => (
            <Path
              key={index}
              d={arc(d)}
              fill={colors(d.data.label)}
            />
          ))}
        </G>
      </Svg>
    </View>
  );
};


//––––––––––––––––––––––––––––––––––––––––––––––––––
// HELPER & DATA DEFINITIONS
//––––––––––––––––––––––––––––––––––––––––––––––––––

// Helper component for progress bars
const ProgressBar = ({ value, color = '#4ade80' }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBarFill, { width: `${value}%`, backgroundColor: color }]} />
  </View>
);

// Sample data for the charts
const missionVolumeData = [
  { month: 'Jan', total: 40, stat: 12 },
  { month: 'Feb', total: 52, stat: 5 },
  { month: 'Mar', total: 48, stat: 10 },
  { month: 'Apr', total: 61, stat: 18 },
  { month: 'May', total: 55, stat: 14 },
  { month: 'Jun', total: 68, stat: 21 },
];

const missionStatusData = [
  { label: 'Completed', value: 234 },
  { label: 'In Progress', value: 12 },
  { label: 'Delayed', value: 3 },
  { label: 'Cancelled', value: 1 },
];


//––––––––––––––––––––––––––––––––––––––––––––––––––
// MAIN ADMIN CONSOLE COMPONENT
//––––––––––––––––––––––––––––––––––––––––––––––––––
const AdminConsole = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024; // Adjust breakpoint as needed

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Admin Console</Text>
            <Text style={styles.headerSubtitle}>
              Fleet management and system administration
            </Text>
          </View>
          <View style={styles.headerStatus}>
            <Text style={styles.headerStatusText}>Fleet Status</Text>
            <Text style={styles.headerStatusValue}>3/4 Active</Text>
            <MaterialCommunityIcons name="cog" size={28} color="#fff" />
          </View>
        </Card.Content>
      </Card>

      {/* MAIN LAYOUT */}
      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* LEFT/MAIN COLUMN */}
        <View style={[styles.mainColumn, isMobile && styles.fullWidth]}>
          {/* AIRCRAFT STATUS GRID */}
          <View style={[styles.aircraftGrid, isMobile && styles.aircraftGridMobile]}>
            {/* Aircraft Cards */}
            <Card style={styles.aircraftCard}>
              <Card.Content>
                <View style={styles.aircraftHeader}>
                  <Text style={styles.aircraftId}><MaterialCommunityIcons name="airplane" size={16} /> PEGA-001</Text>
                  <View style={[styles.statusBadge, styles.statusInFlight]}><Text style={styles.statusBadgeText}>in-flight</Text></View>
                </View>
                <Text style={styles.batteryLabel}>Battery Level <Text style={{fontWeight: 'bold'}}>87%</Text></Text>
                <ProgressBar value={87} />
                <Text style={styles.aircraftInfo}><MaterialCommunityIcons name="map-marker-outline" size={14} /> En route to MD Anderson</Text>
                <View style={styles.aircraftDetails}>
                  <Text style={styles.detailText}>Mission: <Text style={{fontWeight: 'bold'}}>STAT - Heart Transport</Text></Text>
                  <Text style={styles.detailText}>ETA: <Text style={{fontWeight: 'bold'}}>14:32</Text></Text>
                  <Text style={styles.detailText}>Cooler Temp: <Text style={{fontWeight: 'bold'}}>2.8°C</Text></Text>
                </View>
              </Card.Content>
            </Card>

            <Card style={styles.aircraftCard}>
              <Card.Content>
                <View style={styles.aircraftHeader}>
                  <Text style={styles.aircraftId}><MaterialCommunityIcons name="airplane" size={16} /> PEGA-002</Text>
                  <View style={[styles.statusBadge, styles.statusAvailable]}><Text style={styles.statusBadgeText}>available</Text></View>
                </View>
                <Text style={styles.batteryLabel}>Battery Level <Text style={{fontWeight: 'bold'}}>95%</Text></Text>
                <ProgressBar value={95} />
                <Text style={styles.aircraftInfo}><MaterialCommunityIcons name="map-marker-outline" size={14} /> PEGA Base - Houston</Text>
                 <View style={styles.aircraftDetails}>
                  <Text style={styles.detailText}>Mission: <Text style={{fontWeight: 'bold'}}>Standby</Text></Text>
                  <Text style={styles.detailText}>ETA: <Text style={{fontWeight: 'bold'}}>Ready</Text></Text>
                  <Text style={styles.detailText}>Cooler Temp: <Text style={{fontWeight: 'bold'}}>3.2°C</Text></Text>
                </View>
              </Card.Content>
            </Card>
            
            <Card style={styles.aircraftCard}>
              <Card.Content>
                <View style={styles.aircraftHeader}>
                  <Text style={styles.aircraftId}><MaterialCommunityIcons name="airplane" size={16} /> PEGA-003</Text>
                  <View style={[styles.statusBadge, styles.statusMaintenance]}><Text style={styles.statusBadgeText}>maintenance</Text></View>
                </View>
                <Text style={styles.batteryLabel}>Battery Level <Text style={{fontWeight: 'bold'}}>45%</Text></Text>
                <ProgressBar value={45} color="#f97316"/>
                <Text style={styles.aircraftInfo}><MaterialCommunityIcons name="map-marker-outline" size={14} /> Service Hangar B</Text>
                 <View style={styles.aircraftDetails}>
                  <Text style={styles.detailText}>Mission: <Text style={{fontWeight: 'bold'}}>Scheduled Maintenance</Text></Text>
                  <Text style={styles.detailText}>ETA: <Text style={{fontWeight: 'bold'}}>16:00</Text></Text>
                </View>
              </Card.Content>
            </Card>

             <Card style={styles.aircraftCard}>
              <Card.Content>
                <View style={styles.aircraftHeader}>
                  <Text style={styles.aircraftId}><MaterialCommunityIcons name="airplane" size={16} /> PEGA-004</Text>
                  <View style={[styles.statusBadge, styles.statusInFlight]}><Text style={styles.statusBadgeText}>in-flight</Text></View>
                </View>
                <Text style={styles.batteryLabel}>Battery Level <Text style={{fontWeight: 'bold'}}>72%</Text></Text>
                <ProgressBar value={72} />
                <Text style={styles.aircraftInfo}><MaterialCommunityIcons name="map-marker-outline" size={14} /> En route to Memorial Hermann</Text>
                 <View style={styles.aircraftDetails}>
                  <Text style={styles.detailText}>Mission: <Text style={{fontWeight: 'bold'}}>Standard - Blood Products</Text></Text>
                  <Text style={styles.detailText}>ETA: <Text style={{fontWeight: 'bold'}}>15:15</Text></Text>
                  <Text style={styles.detailText}>Cooler Temp: <Text style={{fontWeight: 'bold'}}>4.1°C</Text></Text>
                </View>
              </Card.Content>
            </Card>
          </View>
          
          {/* MISSION ANALYTICS */}
          <Card style={styles.analyticsCard}>
            <Card.Title title={<Text style={styles.cardTitle}><MaterialCommunityIcons name="chart-line" size={16}/> Mission Analytics</Text>} />
            <Card.Content style={[styles.analyticsContent, isMobile && styles.analyticsContentMobile]}>
                
                {/* Bar Chart Section */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Monthly Mission Volume</Text>
                    <BarChart data={missionVolumeData} width={300} height={150} />
                    <View style={styles.legendRow}>
                        <Text style={styles.legendText}><View style={[styles.legendDot, styles.barBlue]}/> Total Missions</Text>
                        <Text style={styles.legendText}><View style={[styles.legendDot, styles.barRed]}/> STAT Missions</Text>
                    </View>
                </View>

                {/* Pie Chart Section */}
                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Mission Status Distribution</Text>
                    <PieChart data={missionStatusData} width={150} height={150} />
                    <View style={styles.legendColumn}>
                        <View style={styles.legendRow}>
                            <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: '#22c55e'}]}/> Completed: 234</Text>
                            <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: '#3b82f6'}]}/> In Progress: 12</Text>
                        </View>
                        <View style={styles.legendRow}>
                            <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: '#f59e0b'}]}/> Delayed: 3</Text>
                            <Text style={styles.legendText}><View style={[styles.legendDot, {backgroundColor: '#ef4444'}]}/> Cancelled: 1</Text>
                        </View>
                    </View>
                </View>
            </Card.Content>
          </Card>
        </View>

        {/* RIGHT/SIDEBAR COLUMN */}
        <View style={[styles.sidebarColumn, isMobile && styles.fullWidth]}>
            {/* EMERGENCY CONTROLS */}
            <Card style={[styles.sidebarCard, {backgroundColor: '#fff1f2'}]}>
                <Card.Title title={<Text style={styles.cardTitle}><MaterialCommunityIcons name="alert-circle-outline" size={16}/> Emergency Controls</Text>} />
                <Card.Content>
                    <Button icon="flash" mode="contained" style={styles.emergencyButton} labelStyle={{color: '#fff'}}>Emergency Ping All</Button>
                    <Button icon="account-group-outline" mode="outlined" style={styles.sidebarButton}>Contact All Pilots</Button>
                    <Button icon="vector-link" mode="outlined" style={styles.sidebarButton}>System Override</Button>
                </Card.Content>
            </Card>

            {/* SYSTEM ALERTS */}
            <Card style={styles.sidebarCard}>
                <Card.Title title={<Text style={styles.cardTitle}><MaterialCommunityIcons name="bell-outline" size={16}/> System Alerts</Text>} right={() => <Text style={styles.alertCount}>3</Text>} />
                <Card.Content style={{gap: 8}}>
                    <View style={[styles.alertItem, {borderLeftColor: '#facc15'}]}>
                        <View style={styles.alertHeader}><Text style={styles.alertTitle}>PEGA-001 cooler temperature...</Text><View style={styles.alertTagYellow}><Text style={styles.alertTagText}>cold-chain</Text></View></View>
                        <Text style={styles.alertBody}>approaching upper limit</Text>
                        <Text style={styles.alertTime}>14:28</Text>
                    </View>
                    <View style={[styles.alertItem, {borderLeftColor: '#3b82f6'}]}>
                        <View style={styles.alertHeader}><Text style={styles.alertTitle}>Fleet utilization above 85% - ...</Text><View style={styles.alertTagBlue}><Text style={styles.alertTagText}>surplus</Text></View></View>
                         <Text style={styles.alertBody}>consider additional units</Text>
                        <Text style={styles.alertTime}>14:15</Text>
                    </View>
                    <View style={[styles.alertItem, {borderLeftColor: '#ef4444'}]}>
                        <View style={styles.alertHeader}><Text style={styles.alertTitle}>PEGA-003 maintenance...</Text><View style={styles.alertTagRed}><Text style={styles.alertTagText}>compliance</Text></View></View>
                        <Text style={styles.alertBody}>window expires in 2 hours</Text>
                        <Text style={styles.alertTime}>13:45</Text>
                    </View>
                </Card.Content>
            </Card>

            {/* SYSTEM HEALTH */}
            <Card style={[styles.sidebarCard, {backgroundColor: '#f0fdf4'}]}>
                 <Card.Title title={<Text style={styles.cardTitle}><MaterialCommunityIcons name="chart-bell-curve" size={16}/> System Health</Text>} />
                 <Card.Content>
                    <View style={styles.healthRow}><Text style={styles.healthLabel}>Fleet Connectivity</Text><View style={[styles.healthBadge, {backgroundColor: '#dcfce7'}]}><Text style={[styles.healthBadgeText, {color: '#166534'}]}>100%</Text></View></View>
                    <View style={styles.healthRow}><Text style={styles.healthLabel}>Cold Chain Status</Text><View style={[styles.healthBadge, {backgroundColor: '#fef9c3'}]}><Text style={[styles.healthBadgeText, {color: '#854d0e'}]}>1 Warning</Text></View></View>
                    <View style={styles.healthRow}><Text style={styles.healthLabel}>API Endpoints</Text><View style={[styles.healthBadge, {backgroundColor: '#dcfce7'}]}><Text style={[styles.healthBadgeText, {color: '#166534'}]}>Stable</Text></View></View>
                    <View style={styles.healthRow}><Text style={styles.healthLabel}>Database Load</Text><View style={[styles.healthBadge, {backgroundColor: '#d1fae5'}]}><Text style={[styles.healthBadgeText, {color: '#065f46'}]}>Normal</Text></View></View>
                    <View style={styles.utilizationSection}>
                        <Text style={styles.healthLabel}>Fleet Utilization</Text>
                        <Text style={styles.utilizationValue}>87%</Text>
                        <ProgressBar value={87} />
                        <Text style={styles.utilizationSub}>3 of 4 aircraft active</Text>
                    </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9', paddingHorizontal: 16 },
  // Header
  headerCard: { backgroundColor: '#f97316', borderRadius: 20, marginVertical: 16, elevation: 4 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#fed7aa' },
  headerStatus: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerStatusText: { fontSize: 14, color: '#fed7aa' },
  headerStatusValue: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  // Layout
  mainLayout: { flexDirection: 'row', gap: 20 },
  mainLayoutMobile: { flexDirection: 'column' },
  mainColumn: { flex: 3, gap: 20 },
  sidebarColumn: { flex: 1, gap: 20, minWidth: 300 },
  fullWidth: { width: '100%' },
  // Aircraft Grid
  aircraftGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  aircraftGridMobile: { flexDirection: 'column' },
  aircraftCard: { flex: 1, minWidth: '45%', backgroundColor: '#fff', borderRadius: 16 },
  aircraftHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  aircraftId: { fontWeight: 'bold', fontSize: 16, color: '#1e293b' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  statusBadgeText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  statusInFlight: { backgroundColor: '#3b82f6' },
  statusAvailable: { backgroundColor: '#22c55e' },
  statusMaintenance: { backgroundColor: '#f97316' },
  batteryLabel: { fontSize: 13, color: '#64748b', marginBottom: 4 },
  aircraftInfo: { fontSize: 13, color: '#334155', marginVertical: 8 },
  aircraftDetails: { marginTop: 8, gap: 4 },
  detailText: { fontSize: 13, color: '#64748b' },
  // Progress Bar
  progressBarContainer: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  // Analytics & D3 Charts
  analyticsCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 20 },
  cardTitle: { fontWeight: 'bold', color: '#475569', fontSize: 16 },
  analyticsContent: { flexDirection: 'row', gap: 16, alignItems: 'center', justifyContent: 'space-around' },
  analyticsContentMobile: { flexDirection: 'column' },
  chartContainer: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  chartTitle: { fontWeight: '600', marginBottom: 12, color: '#334155' },
  legendRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 16 },
  legendColumn: { gap: 8, marginTop: 16, width: '100%', paddingLeft: 20 },
  legendDot: { width: 10, height: 10, borderRadius: 5, marginRight: 6 },
  legendText: { fontSize: 12, color: '#475569', flexDirection: 'row', alignItems: 'center' },
  barBlue: { backgroundColor: '#60a5fa' },
  barRed: { backgroundColor: '#f87171' },
  // Sidebar
  sidebarCard: { borderRadius: 16, backgroundColor: '#fff' },
  emergencyButton: { backgroundColor: '#ef4444', borderRadius: 8, paddingVertical: 4, marginBottom: 8 },
  sidebarButton: { borderRadius: 8, paddingVertical: 4, marginVertical: 4, borderColor: '#e2e8f0' },
  alertCount: { backgroundColor: '#e0e7ff', color: '#4338ca', fontWeight: 'bold', borderRadius: 6, paddingHorizontal: 8, marginRight: 8 },
  alertItem: { backgroundColor: '#f8fafc', borderRadius: 8, padding: 12, borderLeftWidth: 4 },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  alertTitle: { fontWeight: '600', color: '#1e293b' },
  alertTagYellow: { backgroundColor: '#fef9c3', borderRadius: 6, paddingHorizontal: 6 },
  alertTagBlue: { backgroundColor: '#dbeafe', borderRadius: 6, paddingHorizontal: 6 },
  alertTagRed: { backgroundColor: '#fee2e2', borderRadius: 6, paddingHorizontal: 6 },
  alertTagText: { fontSize: 11, fontWeight: '500' },
  alertBody: { color: '#475569', marginVertical: 2 },
  alertTime: { fontSize: 12, color: '#94a3b8' },
  healthRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  healthLabel: { color: '#334155', fontSize: 14 },
  healthBadge: { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 2 },
  healthBadgeText: { fontWeight: '600', fontSize: 12 },
  utilizationSection: { marginTop: 12, },
  utilizationValue: { fontSize: 28, fontWeight: 'bold', color: '#1e293b', marginVertical: 4 },
  utilizationSub: { fontSize: 12, color: '#64748b', marginTop: 4 },
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

export default AdminConsole;