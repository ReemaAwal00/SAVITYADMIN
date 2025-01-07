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
import { getAllUsers, deleteUser } from "services/userApi";

export default function Settings() {
  const [selectedType, setSelectedType] = useState("User");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctorData, setDoctorData] = useState({
    name: "",
    address: "",
    email: "",
    contact: "",
    hospital: "",
    password: "",
  });
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    if (selectedType === "Doctor") {
      try {
        const response = await getAllDoctors();
        setDoctors(response);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    } else if (selectedType === "User") {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  const handleAddDoctor = () => {
    insertAllDoctors(doctorData)
      .then((response) => {
        console.log("Doctor added:", response);
        setDoctors([...doctors, doctorData]);
        setDoctorData({
          name: "",
          address: "",
          email: "",
          contact: "",
          hospital: "",
          password: "",
        });
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
      });
  };

  const handleDelete = async (id, index) => {
    if (selectedType === "User") {
      try {
        await deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
        console.log(`User with ID ${id} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const renderTableHeaders = () => {
    if (selectedType === "User") {
      return (
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Action</Th>
        </Tr>
      );
    } else if (selectedType === "Doctor") {
      return (
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Contact</Th>
          <Th>Address</Th>
          <Th>Hospital</Th>
          <Th>Action</Th>
        </Tr>
      );
    }
  };

  const renderTableRows = () => {
    if (selectedType === "User") {
      return users.map((user, index) => (
        <Tr key={user.userId}>
        <Td>{user.username}</Td>
        <Td>{user.email}</Td>
        <Td>
          <Button
            colorScheme="red"
            onClick={() => handleDelete(user.userId, index)} // Pass user ID and index
          >
            Delete
          </Button>
        </Td>
      </Tr>
    ))
    } else if (selectedType === "Doctor") {
      return doctors.map((doctor, index) => (
        <Tr key={index}>
          <Td>{doctor.name}</Td>
          <Td>{doctor.email}</Td>
          <Td>{doctor.contact}</Td>
          <Td>{doctor.address}</Td>
          <Td>{doctor.hospital}</Td>
          <Td>
            <Button colorScheme="green" mr="3">
              Update
            </Button>
            <Button colorScheme="red" ml="3">
              Delete
            </Button>
          </Td>
        </Tr>
      ));
    }
  };

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
          <Thead>{renderTableHeaders()}</Thead>
          <Tbody>{renderTableRows()}</Tbody>
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
