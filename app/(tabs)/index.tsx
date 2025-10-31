// import FlightLogSystem from '@/src/screens/FlightLogSystem';
import AdminConsole from '@/src/screens/AdminConsole';
import FlightLogs from '@/src/screens/FlightLogs';
import MedPartnerDashboard from '@/src/screens/MedPartnerDashboard';
import PilotSkyDashboard from '@/src/screens/PilotSkyDashboard';
import TerminalRequests from '@/src/screens/TerminalRequests';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Navbar from '../../components/ui/NavBar';


const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
    <PaperProvider>
        <Stack.Navigator
          screenOptions={{
            header: ({ navigation, route }) => <Navbar navigation={navigation} currentRoute = {route.name}/>,
          }}
        >
          <Stack.Screen name="PilotDashboard" component={PilotSkyDashboard} />
          <Stack.Screen name="MedPartnerDashboard" component={MedPartnerDashboard} />
          <Stack.Screen name="AdminConsole" component={AdminConsole} />
          <Stack.Screen name="FlightLogs" component={FlightLogs} />
          <Stack.Screen name="TerminalRequests" component={TerminalRequests} />
        </Stack.Navigator>
    </PaperProvider>
  );
}
