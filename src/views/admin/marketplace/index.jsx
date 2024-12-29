import React, { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";

const tableData = [
  {
    title: "React Basics",
    description: "Introduction to React.js",
    video: "https://example.com/react-basics",
  },
  {
    title: "Advanced React",
    description: "Deep dive into React hooks",
    video: "https://example.com/advanced-react",
  },
  {
    title: "React State Management",
    description: "Managing state in React applications",
    video: "https://example.com/react-state-management",
  },
];

export default function Marketplace() {
  const handleUpdate = (index) => {
    console.log(`Update clicked for row ${index}`);
    // Add update logic here
  };

  return (
    <Box pt={{ base: "180px", md: "80px", xl: "50px" }}>
      {/* Table to display data */}
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Description</Th>
            <Th>Video (URL)</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData.map((row, index) => (
            <Tr key={index}>
              <Td>{row.title}</Td>
              <Td>{row.description}</Td>
              <Td>
                <a href={row.video} target="_blank" rel="noopener noreferrer">
                  {row.video}
                </a>
              </Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleUpdate(index)}>
                  Update
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
