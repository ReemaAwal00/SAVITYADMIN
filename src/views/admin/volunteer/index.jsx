import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { getAllVolunteers } from "services/volunteerApi"; // Import the API service

export default function VolunteerTable() {
  const [tableData, setTableData] = useState([]);

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllVolunteers(); // Fetch volunteers from the API
        console.log(data); // Log the data to check if it's being fetched correctly
        setTableData(data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once when the component mounts

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "50px" }}>
      {/* Table to display data */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Description</Th>
            <Th>Email</Th>
            <Th>Contact</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.length > 0 ? (
            tableData.map((row, index) => (
              <Tr key={index}>
                <Td>{row.vname}</Td>
                <Td>{row.vdescription}</Td>
                <Td>{row.vemail}</Td>
                <Td>{row.vcontact}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan="4">No data available</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
