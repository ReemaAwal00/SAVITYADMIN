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
import { insertAllDoctors } from "services/doctorApi";
import { getAllDoctors } from "services/doctorApi";

const tableDataUser = [
  { name: "John Doe", address: "123 Main St", email: "john@example.com", contact: "123-456-7890" },
  { name: "Jane Smith", address: "456 Elm St", email: "jane@example.com", contact: "987-654-3210" },
];

const tableDataDoctor = [
  { name: "Dr. Alice", address: "789 Oak St", email: "alice@clinic.com", contact: "555-111-2222", hospital: "City Hospital" },
  { name: "Dr. Bob", address: "321 Pine St", email: "bob@clinic.com", contact: "555-333-4444", hospital: "Green Valley Clinic" },
];

export default function Volunteer() {
  const [selectedType, setSelectedType] = useState("User");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState({ name: "", address: "", email: "", contact: "", hospital: "", password:"" });
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors data from the server on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getAllDoctors(); // Use the getAllDoctors function from services
        setDoctors(response); // Assuming response is an array of doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);


  const tableData = selectedType === "User" ? tableDataUser : doctors;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleAddDoctor = () => {
    // Log the doctorData to check if it's ready for submission
    console.log("Data ready to be sent to the server:", doctorData);

    // Post doctor data to the database
    insertAllDoctors(doctorData)
      .then((response) => {
        // Optionally handle the response from the API (e.g., success message)
        console.log('Doctor added:', response);
        
        // Update state after successfully adding the doctor
        setDoctors([...doctors, doctorData]);
        setDoctorData({ name: "", address: "", email: "", contact: "", hospital: "", password:"" });
        setIsModalOpen(false);
      })
      .catch((error) => {
        // Handle error (e.g., show error message)
        console.error('Error adding doctor:', error);
      });
  };


  return (
    <Box pt={{ base: "50px", md: "100px", xl: "10px" }}> {/* Reduced padding under breadcrumbs */}
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
            <Th>Address</Th>
            <Th>Email</Th>
            <Th>Contact</Th>
            <Th>Hospital</Th>
          </Tr>
        </Thead>
        <Tbody>
          {/* Map over the doctors state and display each doctor's data */}
          {doctors.map((doctor, index) => (
            <Tr key={index}>
              <Td>{doctor.name}</Td>
              <Td>{doctor.address}</Td>
              <Td>{doctor.email}</Td>
              <Td>{doctor.contact}</Td>
              <Td>{doctor.hospital}</Td>
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
