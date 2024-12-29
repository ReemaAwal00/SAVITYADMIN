import React, { useState } from "react";
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
} from "@chakra-ui/react";

const tableDataUser = [
  { name: "John Doe", address: "123 Main St", email: "john@example.com", contact: "123-456-7890" },
  { name: "Jane Smith", address: "456 Elm St", email: "jane@example.com", contact: "987-654-3210" },
];

const tableDataDoctor = [
  { name: "Dr. Alice", address: "789 Oak St", email: "alice@clinic.com", contact: "555-111-2222" },
  { name: "Dr. Bob", address: "321 Pine St", email: "bob@clinic.com", contact: "555-333-4444" },
];

export default function Settings() {
  const [selectedType, setSelectedType] = useState("User");

  // Determine table data based on selection
  const tableData = selectedType === "User" ? tableDataUser : tableDataDoctor;

  return (
    <Box pt={{ base: "50px", md: "100px", xl: "10px" }}> {/* Reduced padding under breadcrumbs */}
      {/* Dropdown to select User or Doctor */}
      <Select
        mb="20px"
        w="200px"
        onChange={(e) => setSelectedType(e.target.value)}
        value={selectedType}
      >
        <option value="User">User</option>
        <option value="Doctor">Doctor</option>
      </Select>

      {/* Table to display data */}
      <SimpleGrid
        mb="20px"
        columns={1}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Address</Th>
              <Th>Email</Th>
              <Th>Contact</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>{row.name}</Td>
                <Td>{row.address}</Td>
                <Td>{row.email}</Td>
                <Td>{row.contact}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </SimpleGrid>
    </Box>
  );
}
