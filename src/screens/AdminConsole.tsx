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
// BAR CHART
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
    <Svg width={width} height={height}>
      <G transform={`translate(${margin.left}, ${margin.top})`}>
        {yTicks.map(tick => (
          <G key={tick}>
            <Line x1={0} y1={y(tick)} x2={graphWidth} y2={y(tick)} stroke="#e2e8f0" strokeDasharray="4" />
            <SvgText x={-8} y={y(tick) + 4} fill="#64748b" fontSize="12" textAnchor="end">
              {tick}
            </SvgText>
          </G>
        ))}

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

        {data.map(item => (
          <SvgText
            key={`label-${item.month}`}
            x={x(item.month) + x.bandwidth() / 2}
            y={graphHeight + 20}
            fill="#64748b"
            fontSize="12"
            textAnchor="middle">
            {item.month}
          </SvgText>
        ))}
      </G>
    </Svg>
  );
};

//––––––––––––––––––––––––––––––––––––––––––––––––––
// PIE CHART
//––––––––––––––––––––––––––––––––––––––––––––––––––
const PieChart = ({ data, width, height }) => {
  const radius = Math.min(width, height) / 2 - 10;
  const pie = d3.pie().value(d => d.value).sort(null);
  const arc = d3.arc().innerRadius(0).outerRadius(radius);
  const colors = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']);
  const pieData = pie(data);

  return (
    <Svg width={width} height={height}>
      <G transform={`translate(${width / 2}, ${height / 2})`}>
        {pieData.map((d, i) => (
          <Path key={i} d={arc(d)} fill={colors(d.data.label)} />
        ))}
      </G>
    </Svg>
  );
};

//––––––––––––––––––––––––––––––––––––––––––––––––––
// DATA & HELPERS
//––––––––––––––––––––––––––––––––––––––––––––––––––
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

const ProgressBar = ({ value, color = '#4ade80' }) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBarFill, { width: `${value}%`, backgroundColor: color }]} />
  </View>
);

//––––––––––––––––––––––––––––––––––––––––––––––––––
// MAIN ADMIN CONSOLE
//––––––––––––––––––––––––––––––––––––––––––––––––––
const AdminConsole = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HEADER */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Admin Console</Text>
            <Text style={styles.headerSubtitle}>Fleet management and system administration</Text>
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
        {/* MAIN COLUMN */}
        <View style={[styles.mainColumn, isMobile && styles.fullWidth]}>
          {/* AIRCRAFT STATUS */}
          <View style={[styles.aircraftGrid, isMobile && styles.aircraftGridMobile]}>
            {[
              { id: 'PEGA-001', status: 'in-flight', battery: 87, temp: '2.8°C', color: '#3b82f6', loc: 'En route to MD Anderson', mission: 'STAT - Heart Transport', eta: '14:32' },
              { id: 'PEGA-002', status: 'available', battery: 95, temp: '3.2°C', color: '#22c55e', loc: 'PEGA Base - Houston', mission: 'Standby', eta: 'Ready' },
              { id: 'PEGA-003', status: 'maintenance', battery: 45, temp: 'N/A', color: '#f97316', loc: 'Service Hangar B', mission: 'Scheduled Maintenance', eta: '16:00' },
              { id: 'PEGA-004', status: 'in-flight', battery: 72, temp: '4.1°C', color: '#3b82f6', loc: 'En route to Memorial Hermann', mission: 'Standard - Blood Products', eta: '15:15' },
            ].map((a, i) => (
              <Card key={i} style={styles.aircraftCard}>
                <Card.Content>
                  <View style={styles.aircraftHeader}>
                    <Text style={styles.aircraftId}>
                      <MaterialCommunityIcons name="airplane" size={16} /> {a.id}
                    </Text>
                    <View style={[styles.statusBadge, { backgroundColor: a.color }]}>
                      <Text style={styles.statusBadgeText}>{a.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.batteryLabel}>Battery Level <Text style={{ fontWeight: 'bold' }}>{a.battery}%</Text></Text>
                  <ProgressBar value={a.battery} color={a.color} />
                  <Text style={styles.aircraftInfo}>
                    <MaterialCommunityIcons name="map-marker-outline" size={14} /> {a.loc}
                  </Text>
                  <Text style={styles.detailText}>Mission: <Text style={{ fontWeight: 'bold' }}>{a.mission}</Text></Text>
                  <Text style={styles.detailText}>ETA: <Text style={{ fontWeight: 'bold' }}>{a.eta}</Text></Text>
                  <Text style={styles.detailText}>Cooler Temp: <Text style={{ fontWeight: 'bold' }}>{a.temp}</Text></Text>
                </Card.Content>
              </Card>
            ))}
          </View>

          {/* MISSION ANALYTICS */}
          <Card style={styles.analyticsCard}>
            <Card.Title title={<Text style={styles.cardTitle}><MaterialCommunityIcons name="chart-line" size={16}/> Mission Analytics</Text>} />
            <Card.Content style={[styles.analyticsContent, isMobile && styles.analyticsContentMobile]}>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Monthly Mission Volume</Text>
                <BarChart data={missionVolumeData} width={300} height={150} />
              </View>
              <View style={styles.chartContainer}>
                <Text style={styles.chartTitle}>Mission Status Distribution</Text>
                <PieChart data={missionStatusData} width={150} height={150} />
              </View>
            </Card.Content>
          </Card>
        </View>

        {/* SIDEBAR */}
        <View style={[styles.sidebarColumn, isMobile && styles.fullWidth]}>
          <Card style={[styles.sidebarCard, { backgroundColor: '#fff1f2' }]}>
            <Card.Title title={<Text style={styles.cardTitle}><MaterialCommunityIcons name="alert-circle-outline" size={16}/> Emergency Controls</Text>} />
            <Card.Content>
              <Button icon="flash" mode="contained" style={styles.emergencyButton} labelStyle={{ color: '#fff' }}>Emergency Ping All</Button>
              <Button icon="account-group-outline" mode="outlined" style={styles.sidebarButton}>Contact All Pilots</Button>
              <Button icon="vector-link" mode="outlined" style={styles.sidebarButton}>System Override</Button>
            </Card.Content>
          </Card>
        </View>
      </View>

      {/* FOOTER BUTTONS */}
      <View style={styles.footerContainer}>
        <TouchableOpacity
          style={[styles.footerButton, styles.footerButtonBlue]}
          onPress={() => navigation.navigate('FlightLogs')}>
          <MaterialCommunityIcons name="file-document-outline" size={18} color="#2563eb" />
          <Text style={styles.footerButtonText}>Flight Log</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.footerButton, styles.footerButtonPurple]} onPress={() => navigation.navigate('TerminalRequests')}>
          <MaterialCommunityIcons name="cellphone-wireless" size={18} color="#9333ea" />
          <Text style={styles.footerButtonText}>Terminal Requests</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

//––––––––––––––––––––––––––––––––––––––––––––––––––
// STYLES
//––––––––––––––––––––––––––––––––––––––––––––––––––
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9', paddingHorizontal: 16 },
  headerCard: { backgroundColor: '#f97316', borderRadius: 20, marginVertical: 16, elevation: 4 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 14, color: '#fed7aa' },
  headerStatus: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerStatusText: { fontSize: 14, color: '#fed7aa' },
  headerStatusValue: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  mainLayout: { flexDirection: 'row', gap: 20 },
  mainLayoutMobile: { flexDirection: 'column' },
  mainColumn: { flex: 3, gap: 20 },
  sidebarColumn: { flex: 1, gap: 20, minWidth: 300 },
  fullWidth: { width: '100%' },
  aircraftGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  aircraftGridMobile: { flexDirection: 'column' },
  aircraftCard: { flex: 1, minWidth: '45%', backgroundColor: '#fff', borderRadius: 16 },
  aircraftHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  aircraftId: { fontWeight: 'bold', fontSize: 16, color: '#1e293b' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  statusBadgeText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  batteryLabel: { fontSize: 13, color: '#64748b', marginBottom: 4 },
  aircraftInfo: { fontSize: 13, color: '#334155', marginVertical: 8 },
  detailText: { fontSize: 13, color: '#64748b' },
  progressBarContainer: { height: 8, backgroundColor: '#e2e8f0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  analyticsCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 20 },
  cardTitle: { fontWeight: 'bold', color: '#475569', fontSize: 16 },
  analyticsContent: { flexDirection: 'row', gap: 16, alignItems: 'center', justifyContent: 'space-around' },
  analyticsContentMobile: { flexDirection: 'column' },
  chartContainer: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  chartTitle: { fontWeight: '600', marginBottom: 12, color: '#334155' },
  sidebarCard: { borderRadius: 16, backgroundColor: '#fff' },
  emergencyButton: { backgroundColor: '#ef4444', borderRadius: 8, paddingVertical: 4, marginBottom: 8 },
  sidebarButton: { borderRadius: 8, paddingVertical: 4, marginVertical: 4, borderColor: '#e2e8f0' },
  footerContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24, gap: 16 },
  footerButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', paddingVertical: 16, borderRadius: 12, borderWidth: 1.5, shadowColor: '#94a3b8', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 2, gap: 8 },
  footerButtonBlue: { borderColor: '#dbeafe' },
  footerButtonPurple: { borderColor: '#e9d5ff' },
  footerButtonText: { color: '#1e293b', fontWeight: '600', fontSize: 15 },
});

export default AdminConsole;
