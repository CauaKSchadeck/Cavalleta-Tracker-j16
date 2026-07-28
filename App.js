//Importa as rotas do aplicativo.
import AppRoutes from './src/routes/AppRoutes';

export default function App() {

  return <AppRoutes />;

}







//Teste exemplo 
// import React, { useEffect, useRef, useState } from 'react';
// import { View, Text, Button } from 'react-native';
// import { requestSmsPermissions } from './src/services/Smsgateway';
// import { TrackerService } from './src/services/Trackerservice';

// const TRACKER_NUMBER = ''; // número do chip dentro do J16

// export default function TrackerScreen() {
//   const serviceRef = useRef(null);
//   const [location, setLocation] = useState(null);
//   const [status, setStatus] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         await requestSmsPermissions();
//         serviceRef.current = new TrackerService(TRACKER_NUMBER);
//       } catch (err) {
//         setError(err.message);
//       }
//     })();

//     return () => serviceRef.current?.destroy();
//   }, []);

//   const handleGetLocation = async () => {
//     try {
//       const loc = await serviceRef.current.getLocation();
//       setLocation(loc);
//       setStatus(null);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleGetStatus = async () => {
//     try {
//       const stat = await serviceRef.current.getStatus();
//       setStatus(stat);
//       setLocation(null);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <View style={{ padding: 20 }}>
//       <Button title="Buscar localização" onPress={handleGetLocation} />
//       <Button title="Verificar status" onPress={handleGetStatus} />
//       {location && (
//         <Text>
//           Lat: {location.latitude}, Lng: {location.longitude}
//           {'\n'}Atualizado: {location.timestamp}
//         </Text>
//       )}
//       {status && (
//         <Text>
//           Status do rastreador:{'\n'}
//           {Object.entries(status)
//             .filter(([key]) => key !== 'type' && key !== 'raw')
//             .map(([key, value]) => `${key}: ${value}`)
//             .join('\n')}
//           {status.raw ? `\nResposta bruta: ${status.raw}` : ''}
//         </Text>
//       )}
//       {error && <Text style={{ color: 'red' }}>{error}</Text>}
//     </View>
//   );
// }
