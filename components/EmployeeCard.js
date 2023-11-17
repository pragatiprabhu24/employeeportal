import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


const EmployeeCard = ({ employee, employees }) => {
  const { backgroundColor, parentId } = employee;
  const navigation = useNavigation();

  const manager = employees.find(manager => manager.id === parentId);
  const managerName = manager ? manager.name : 'Not Available';

  const navigateToDetail = () => {
    navigation.navigate('DetailScreen', { employee });
  };

  return (
    <TouchableOpacity onPress={navigateToDetail}>
      <View style={{ backgroundColor, padding: 20, margin: 10, borderRadius: 8 }}>
        <Card>
          <Card.Content>
            <Text variant="titleLarge" style={{ color: '#860A35', fontSize: 20, fontWeight: 'bold', fontStyle: 'italic' }}>{employee.name}</Text>
            <Text variant="bodyMedium" style={{ fontSize: 15, fontStyle: 'italic' }}>{employee.email}</Text>
            <Text variant="bodyMedium" style={{ fontSize: 15, fontStyle: 'italic' }}>{employee.phone}</Text>
            <Text variant="bodyMedium" style={{ fontSize: 15, color: 'green', fontWeight: 200, fontStyle: 'italic' }}>Reporting Manager - {managerName}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={navigateToDetail}>Detail</Button>
          </Card.Actions>
        </Card>
      </View>
    </TouchableOpacity>
  );
};

export default EmployeeCard;