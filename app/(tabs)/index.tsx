// import FlightLogSystem from '@/src/screens/FlightLogSystem';
import PilotSkyDashboard from '@/src/screens/PilotSkyDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Navbar from '../../components/ui/NavBar';
import SKYLinqCommandPanel from '../../src/screens/SKYLinqCommandPanel';

const Stack = createNativeStackNavigator();

// Placeholder pages
const TerminalRequests = () => <></>;
const AdminConsole = () => <></>;
const FlightLogSystem = () => <></>;

export default function HomeScreen() {
  return (
    <PaperProvider>
        <Stack.Navigator
          screenOptions={{
            header: ({ navigation, route }) => <Navbar navigation={navigation} currentRoute = {route.name}/>,
          }}
        >
          <Stack.Screen name="SKYLinq" component={SKYLinqCommandPanel} />
          <Stack.Screen name="PilotDashboard" component={PilotSkyDashboard} />
          <Stack.Screen name="FlightLog" component={FlightLogSystem} />
          <Stack.Screen name="TerminalRequests" component={TerminalRequests} />
          <Stack.Screen name="AdminConsole" component={AdminConsole} />
        </Stack.Navigator>
    </PaperProvider>
  );
}
