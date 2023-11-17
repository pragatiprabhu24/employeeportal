import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import Modal from 'react-native-modal';
import EmployeeCard from '../components/EmployeeCard';
import { fetchData } from '../services/apiService';

const MainScreen = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newEmployeeData, setNewEmployeeData] = useState({ id: 0, name: '', email: '', phone: '', address: '' });
  const [isAddingEmployee, setIsAddingEmployee] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = async () => {
    try {
      const data = await fetchData();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsAddingEmployee(false);
  };

  const handleAddEmployee = () => {
    if (isAddingEmployee) {
      if (newEmployeeData.name && newEmployeeData.email && newEmployeeData.phone && newEmployeeData.address) {
        setEmployees([{ ...newEmployeeData }, ...employees]);
        setModalVisible(false);
      } else {
        alert('Please fill in all required fields.');
      }
    } else {
      setIsAddingEmployee(true);
    }
  };

  const navigateToDetail = (employee) => {
    navigation.navigate('DetailScreen', { employee, employees });
  };

  return (
    <ScrollView>
      <View>
        <Button title="+ Add New Employee" onPress={toggleModal} />

        {employees.map((employee) => (
          <TouchableOpacity
            key={employee.id}
            onPress={() => navigateToDetail(employee)}
          >
            <EmployeeCard employee={employee} employees={employees} />
          </TouchableOpacity>
        ))}

        <Modal isVisible={isModalVisible} onRequestClose={toggleModal} style={{ backgroundColor: '#fff', padding: 10 }}>
          <View>
            <TextInput
              label="Name"
              style={{ marginBottom: 10 }}
              onChangeText={(text) => setNewEmployeeData((prevData) => ({ ...prevData, name: text }))}
              required
            />
            <TextInput
              label="Email"
              style={{ marginBottom: 10 }}
              onChangeText={(text) => setNewEmployeeData((prevData) => ({ ...prevData, email: text }))}
              required
            />
            <TextInput
              label="Mobile Number"
              style={{ marginBottom: 10 }}
              onChangeText={(text) => setNewEmployeeData((prevData) => ({ ...prevData, phone: text }))}
              required
            />
            <TextInput
              label="Address"
              style={{ marginBottom: 10 }}
              onChangeText={(text) => setNewEmployeeData((prevData) => ({ ...prevData, address: text }))}
              required
            />
            <Button title={isAddingEmployee ? "Confirm" : "Add Employee"} onPress={handleAddEmployee} style={{ marginBottom: 10 }} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default MainScreen;