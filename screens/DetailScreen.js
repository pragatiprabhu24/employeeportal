import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { fetchData } from '../services/apiService';
import { Card } from 'react-native-paper';

const DetailScreen = ({ route }) => {
  const { employee } = route.params;
  const [employees, setEmployees] = useState([]);

  const manager = employees.find((manager) => manager.id === employee.parentId);
  const managerName = manager ? manager.name : 'NA';

  const subordinates = employees ? employees.filter((emp) => emp && emp.parentId === employee.id) : [];

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const data = await fetchData();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
  }, []);

  return (
    <View style={{ padding: 20, margin: 10, borderRadius: 8 }}>
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Reporting Manager: {managerName}</Text>
      {subordinates.length === 0 ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Image source='https://img.freepik.com/premium-vector/404-found-error-message-internet-connection-problem_48369-1294.jpg' style={{ width: 200, height: 200, marginTop: 10 }} />
          <Text style={{ fontSize: 16, fontStyle: 'italic', color: 'red', padding: 10 }}>Subordinates not Available</Text>
        </View>
      ) : (
        <View style={{ padding: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold', padding: 10, color: 'red' }}>Subordinates:</Text>
          {subordinates.map((subordinate) => (
            <View key={subordinate.id}>
              <Card style={{ padding: 20, margin: 10, borderRadius: 8, backgroundColor: '#fff' }}>
                <Text variant="titleLarge" style={{ color: '#860A35', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{subordinate.name}</Text>
                <Text variant="bodyMedium" style={{ fontSize: 15, fontStyle: 'italic' }}>{subordinate.email}</Text>
                <Text variant="bodyMedium" style={{ fontSize: 15, fontStyle: 'italic' }}>{subordinate.phone}</Text>
              </Card>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default DetailScreen;