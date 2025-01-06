import React, { useState, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { insertAllDoctors, getAllDoctors } from "services/doctorApi";
import { getAllUsers, deleteUser } from "services/userApi";  // Import deleteUser function

export default function Settings() {
  const [selectedType, setSelectedType] = useState("User");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState({ name: "", address: "", email: "", contact: "", hospital: "", password: "" });
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data for users and doctors on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors(); // Fetch doctors data from API
        setDoctors(response); // Assuming response is an array of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await getAllUsers(); // Fetch users data from API
        setUsers(response); // Assuming response is an array of users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchDoctors();
    fetchUsers();
  }, []);

  // Set table data based on selected type
  const tableData = selectedType === "User" ? users : doctors;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleAddDoctor = () => {
    // Post doctor data to the database
    insertAllDoctors(doctorData)
      .then((response) => {
        // Successfully added doctor
        console.log('Doctor added:', response);

        // Update state after adding doctor
        setDoctors([...doctors, doctorData]);
        setDoctorData({ name: "", address: "", email: "", contact: "", hospital: "", password: "" });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error adding doctor:', error);
      });
  };

  // Handle delete for users or doctors based on selectedType
  // const handleDelete = async (index) => {
  //   if (selectedType === "User") {
  //     const userId = users[index].id; // Assuming users have unique IDs
  //     try {
  //       await deleteUser(userId); // Delete the user from API
  //       setUsers(users.filter((_, i) => i !== index)); // Remove from state
  //     } catch (error) {
  //       console.error("Error deleting user:", error);
  //     }
  //   } 
  // };

  return (
    <Box pt={{ base: "50px", md: "100px", xl: "10px" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb="20px">
        <Select
          w="200px"
          onChange={(e) => setSelectedType(e.target.value)}
          value={selectedType}
        >
          <option value="User">User</option>
          <option value="Doctor">Doctor</option>
        </Select>
        {selectedType === "Doctor" && (
          <Button colorScheme="teal" onClick={() => setIsModalOpen(true)}>
            Add Doctor
          </Button>
        )}
      </Box>
      <SimpleGrid mb="20px" columns={1} spacing={{ base: "20px", xl: "20px" }}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              {/* <Th>Address</Th> */}
              <Th>Email</Th>
              {/* <Th>Contact</Th> */}
              {selectedType === "Doctor" && <Th>Hospital</Th>}
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((data, index) => (
              <Tr key={index}>
                <Td>{data.username}</Td>
                {/* <Td>{data.address}</Td> */}
                <Td>{data.email}</Td>
                {/* <Td>{data.contact}</Td> */}
                {selectedType === "Doctor" && <Td>{data.hospital}</Td>}
                <Td>
                  <Button colorScheme="red" >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </SimpleGrid>

      {/* Modal for adding doctor */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Doctor</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              name="name"
              value={doctorData.name}
              onChange={handleInputChange}
              mb="10px"
            />
            <Input
              placeholder="Address"
              name="address"
              value={doctorData.address}
              onChange={handleInputChange}
              mb="10px"
            />
            <Input
              placeholder="Email"
              name="email"
              value={doctorData.email}
              onChange={handleInputChange}
              mb="10px"
            />
            <Input
              placeholder="Contact"
              name="contact"
              value={doctorData.contact}
              onChange={handleInputChange}
              mb="10px"
            />
            <Input
              placeholder="Hospital"
              name="hospital"
              value={doctorData.hospital}
              onChange={handleInputChange}
              mb="10px"
            />
            <Input
              placeholder="Password"
              name="password"
              value={doctorData.password}
              onChange={handleInputChange}
              mb="10px"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleAddDoctor} mr="3">
              Submit
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
