import PilotSkyDashboard from '@/src/screens/PilotSkyDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Navbar from '../../components/ui/NavBar';
import SKYLinqCommandPanel from '../../src/screens/SKYLinqCommandPanel';

const Stack = createNativeStackNavigator();

// Placeholder pages
const FlightLog = () => <></>;
const TerminalRequests = () => <></>;
const AdminConsole = () => <></>;

export default function HomeScreen() {
  return (
    <PaperProvider>
        <Stack.Navigator
          screenOptions={{
            header: ({ navigation }) => <Navbar navigation={navigation} />,
          }}
        >
          <Stack.Screen name="SKYLinq" component={SKYLinqCommandPanel} />
          <Stack.Screen name="PilotDashboard" component={PilotSkyDashboard} />
          <Stack.Screen name="FlightLog" component={FlightLog} />
          <Stack.Screen name="TerminalRequests" component={TerminalRequests} />
          <Stack.Screen name="AdminConsole" component={AdminConsole} />
        </Stack.Navigator>
    </PaperProvider>
  );
}
