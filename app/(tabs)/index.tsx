// import FlightLogSystem from '@/src/screens/FlightLogSystem';
import AdminConsole from '@/src/screens/AdminConsole';
import MedPartnerDashboard from '@/src/screens/MedPartnerDashboard';
import PilotSkyDashboard from '@/src/screens/PilotSkyDashboard';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { PaperProvider } from 'react-native-paper';
import Navbar from '../../components/ui/NavBar';
import SKYLinqCommandPanel from '../../src/screens/SKYLinqCommandPanel';


const Stack = createNativeStackNavigator();

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
          <Stack.Screen name="MedPartnerDashboard" component={MedPartnerDashboard} />
          <Stack.Screen name="AdminConsole" component={AdminConsole} />
        </Stack.Navigator>
    </PaperProvider>
  );
}
