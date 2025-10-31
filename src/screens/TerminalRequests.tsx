// src/screens/TerminalRequests.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
} from 'react-native';
import { Button, Card } from 'react-native-paper';

// ————————————————————————
// Helpers & Static Data
// ————————————————————————
const ProgressBar = ({ value, track = '#e5e7eb', fill = '#0f172a' }) => (
  <View style={[styles.progressTrack, { backgroundColor: track }]}>
    <View style={[styles.progressFill, { width: `${value}%`, backgroundColor: fill }]} />
  </View>
);

const REQUESTS = [
  {
    id: 'REQ–001',
    badges: [{ label: 'STAT', color: '#ef4444' }, { label: 'Critical', color: '#f97316' }],
    statusPill: { label: 'in-transit', color: '#2563eb' },
    from: 'Houston Methodist Hospital',
    to: 'MD Anderson Cancer Center',
    cargo: 'Heart - Transplant',
    progress: 75,
    eta: '14:32',
    temp: '2.8°C',
  },
  {
    id: 'REQ–002',
    badges: [{ label: 'CoC', color: '#8b5cf6' }, { label: 'Standard', color: '#60a5fa' }],
    statusPill: { label: 'pending', color: '#f59e0b' },
    from: "Texas Children's Hospital",
    to: "Baylor St. Luke's",
    cargo: 'Blood Products',
    progress: 0,
    eta: '—',
    temp: '—',
  },
  {
    id: 'REQ–003',
    badges: [{ label: 'Cooler', color: '#3b82f6' }, { label: 'Standard', color: '#60a5fa' }],
    statusPill: { label: 'completed', color: '#10b981' },
    from: 'Memorial Hermann',
    to: 'Methodist Sugar Land',
    cargo: 'Medications',
    progress: 100,
    eta: 'Delivered',
    temp: '—',
  },
];

const RECENT_UPDATES = [
  { dot: '#3b82f6', text: 'REQ–001 - 5 min to destination' },
  { dot: '#22c55e', text: 'REQ–003 - Delivery completed' },
  { dot: '#f59e0b', text: 'REQ–002 - Awaiting pickup' },
];

// ————————————————————————
// Screen
// ————————————————————————
const TerminalRequests = () => {
  const { width } = useWindowDimensions();
  const isNarrow = width < 980;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <Card style={styles.headerCard}>
        <Card.Content style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Terminal Requests</Text>
            <Text style={styles.headerSubtitle}>
              Medical partner logistics and delivery management
            </Text>
          </View>
          <Button
            icon="plus"
            mode="contained"
            style={styles.newRequestBtn}
            labelStyle={{ color: '#fff', fontWeight: '700' }}
            onPress={() => {}}
          >
            New Request
          </Button>
        </Card.Content>
      </Card>

      {/* Two-column layout */}
      <View style={[styles.main, { flexDirection: isNarrow ? 'column' : 'row' }]}>
        {/* Left: Active Requests */}
        <View style={[styles.left, { marginRight: isNarrow ? 0 : 12 }]}>
          <Card style={styles.sectionCard}>
            <Card.Title
              title={<Text style={styles.sectionTitle}><MaterialCommunityIcons name="cube-outline" size={16} />  Active Requests</Text>}
              right={() => <Text style={styles.pillInfo}>{REQUESTS.filter(r=>r.statusPill.label!=='completed').length} active</Text>}
            />
            <Card.Content style={{ gap: 14 }}>
              {REQUESTS.map((r, idx) => (
                <View key={idx} style={styles.reqCard}>
                  <View style={styles.reqHeaderRow}>
                    <View style={styles.reqIdPill}>
                      <Text style={styles.reqIdText}>{r.id}</Text>
                    </View>
                    <View style={styles.badgesRow}>
                      {r.badges.map((b, i) => (
                        <View key={i} style={[styles.badge, { backgroundColor: b.color }]}>
                          <Text style={styles.badgeText}>{b.label}</Text>
                        </View>
                      ))}
                    </View>
                    <View style={[styles.statusPill, { backgroundColor: r.statusPill.color }]}>
                      <Text style={styles.statusPillText}>{r.statusPill.label}</Text>
                    </View>
                  </View>

                  <View style={styles.reqLine}>
                    <MaterialCommunityIcons name="map-marker-outline" size={18} color="#10b981" />
                    <Text style={styles.reqLineLabel}>From:</Text>
                    <Text style={styles.reqLineValue}>{r.from}</Text>
                  </View>
                  <View style={styles.reqLine}>
                    <MaterialCommunityIcons name="map-marker" size={18} color="#ef4444" />
                    <Text style={styles.reqLineLabel}>To:</Text>
                    <Text style={styles.reqLineValue}>{r.to}</Text>
                  </View>
                  <View style={styles.reqLine}>
                    <MaterialCommunityIcons name="cube-outline" size={18} color="#0ea5e9" />
                    <Text style={styles.reqLineLabel}>Cargo:</Text>
                    <Text style={styles.reqLineValue}>{r.cargo}</Text>
                  </View>

                  <Text style={styles.progressLabel}>Progress</Text>
                  <ProgressBar value={r.progress} />
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

        {/* Right: Live Visibility + Summary */}
        <View style={[styles.right, { marginLeft: isNarrow ? 0 : 12 }]}>
          <Card style={styles.sectionCard}>
            <Card.Title
              title={<Text style={styles.sectionTitle}><MaterialCommunityIcons name="eye-outline" size={16}/>  Live Visibility</Text>}
            />
            <Card.Content>
              <View style={styles.centerIconWrap}>
                <View style={styles.centerIcon}>
                  <MaterialCommunityIcons name="hospital-building" size={42} color="#0ea5e9" />
                </View>
                <Text style={styles.centerTitle}>Real-time Tracking</Text>
                <Text style={styles.centerSub}>
                  Monitor your deliveries with live GPS tracking and status updates
                </Text>
              </View>

              <View style={{ gap: 10, marginTop: 6 }}>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Active Deliveries:</Text>
                  <View style={[styles.kvBadge, { backgroundColor: '#dcfce7' }]}><Text style={[styles.kvBadgeText, { color: '#166534' }]}>2</Text></View>
                </View>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Average ETA:</Text>
                  <Text style={styles.kvValStrong}>18 minutes</Text>
                </View>
                <View style={styles.kvRow}>
                  <Text style={styles.kvKey}>Success Rate:</Text>
                  <Text style={[styles.kvValStrong, { color: '#16a34a' }]}>99.2%</Text>
                </View>
              </View>

              <View style={styles.hr} />
              <Text style={styles.subHeader}>Recent Updates</Text>
              <View style={{ gap: 10, marginTop: 6 }}>
                {RECENT_UPDATES.map((u, i) => (
                  <View key={i} style={styles.updateRow}>
                    <View style={[styles.dot, { backgroundColor: u.dot }]} />
                    <Text style={styles.updateText}>{u.text}</Text>
                  </View>
                ))}
              </View>

              <Button
                icon="radar"
                mode="contained"
                style={styles.trackBtn}
                labelStyle={{ color: '#fff', fontWeight: '700' }}
                onPress={() => {}}
              >
                Track All Deliveries
              </Button>
            </Card.Content>
          </Card>

          <Card style={[styles.sectionCard, { marginTop: 12 }]}>
            <Card.Title
              title={<Text style={styles.sectionTitle}><MaterialCommunityIcons name="clipboard-list-outline" size={16}/>  Request Summary</Text>}
            />
            <Card.Content>
              <View style={[styles.summaryGrid, { flexDirection: isNarrow ? 'row' : 'row' }]}>
                <View style={[styles.summaryCard, { backgroundColor: '#ecfdf5' }]}>
                  <Text style={[styles.summaryNumber, { color: '#059669' }]}>12</Text>
                  <Text style={styles.summaryLabel}>This Month</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: '#eef2ff' }]}>
                  <Text style={[styles.summaryNumber, { color: '#4338ca' }]}>3</Text>
                  <Text style={styles.summaryLabel}>Active</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: '#f5f3ff' }]}>
                  <Text style={[styles.summaryNumber, { color: '#7c3aed' }]}>8</Text>
                  <Text style={styles.summaryLabel}>STAT Requests</Text>
                </View>
                <View style={[styles.summaryCard, { backgroundColor: '#fff7ed' }]}>
                  <Text style={[styles.summaryNumber, { color: '#ea580c' }]}>15min</Text>
                  <Text style={styles.summaryLabel}>Avg Response</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        </View>
      </View>

      <View style={{ height: 36 }} />
    </ScrollView>
  );
};

export default TerminalRequests;

// ————————————————————————
// Styles
// ————————————————————————
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f5f9', padding: 16 },

  // Header
  headerCard: {
    backgroundColor: '#e11d48',
    borderRadius: 18,
    marginBottom: 16,
  },
  headerContent: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: { color: '#fff', fontSize: 26, fontWeight: '800' },
  headerSubtitle: { color: '#ffe4e6', marginTop: 4 },
  newRequestBtn: {
    backgroundColor: '#db2777',
    borderRadius: 10,
  },

  // Layout
  main: { alignItems: 'flex-start' },
  left: { flex: 1 },
  right: { width: 360, alignSelf: 'stretch' },

  // Section card
  sectionCard: { borderRadius: 14, backgroundColor: '#fff', elevation: 2 },
  sectionTitle: { fontWeight: '700', color: '#334155', fontSize: 16 },
  pillInfo: {
    marginRight: 12,
    backgroundColor: '#e0e7ff',
    color: '#4338ca',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    fontWeight: '700',
  },

  // Request card
  reqCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    backgroundColor: '#fff',
  },
  reqHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reqIdPill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reqIdText: { color: '#0f172a', fontWeight: '700' },
  badgesRow: { flexDirection: 'row', gap: 6, marginLeft: 6, flexWrap: 'wrap', flex: 1 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusPillText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  reqLine: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  reqLineLabel: { color: '#64748b', fontWeight: '600' },
  reqLineValue: { color: '#0f172a', fontWeight: '700', flexShrink: 1 },

  progressLabel: { color: '#475569', marginTop: 12, marginBottom: 6 },
  progressTrack: { height: 10, borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 8 },

  reqFooterRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  etaText: { color: '#475569', fontWeight: '600' },
  tempRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tempText: { color: '#0ea5e9', fontWeight: '700' },

  // Right panel: Live visibility
  centerIconWrap: { alignItems: 'center', marginTop: 2 },
  centerIcon: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  centerTitle: { fontWeight: '800', fontSize: 16, color: '#0f172a' },
  centerSub: { color: '#475569', textAlign: 'center', marginTop: 6 },

  kvRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  kvKey: { color: '#475569' },
  kvValStrong: { color: '#0f172a', fontWeight: '800' },
  kvBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  kvBadgeText: { fontWeight: '800' },
  hr: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 14 },
  subHeader: { fontWeight: '800', color: '#0f172a' },
  updateRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  updateText: { color: '#334155' },
  dot: { width: 8, height: 8, borderRadius: 4 },

  trackBtn: {
    marginTop: 14,
    backgroundColor: '#0ea5e9',
    borderRadius: 10,
  },

  // Summary
  summaryGrid: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  summaryCard: {
    width: '48%',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryNumber: { fontSize: 24, fontWeight: '900' },
  summaryLabel: { color: '#475569', marginTop: 4, fontWeight: '600' },
});
