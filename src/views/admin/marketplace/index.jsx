import React, { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Input, Textarea } from "@chakra-ui/react";
import { getAllResource } from "services/resourceApi";
import { updateResource } from "services/resourceApi"; // Import the updateResource function

export default function Marketplace() {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    description: "",
    video: "",
  });

  // Fetch data from the API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllResource();
        setTableData(data); // Store the fetched data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once when the component mounts

  const handleUpdateClick = (index) => {
    const selected = tableData[index];
    console.log("Selected Resource ID:", selected.id); // Log the id of the selected item
    setSelectedRow(selected);
    setUpdatedData({
      title: selected.title,
      description: selected.description,
      video: selected.video,
    });
    setIsModalOpen(true); // Open the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Call the updateResource function with the selected id and updated data
      const updatedResource = await updateResource(selectedRow.id, updatedData);
      console.log("Updated Resource:", updatedResource);
      
      // Close the modal after updating
      setIsModalOpen(false);

      // Optionally, refresh the table data after the update
      const updatedTableData = tableData.map((row) =>
        row.id === selectedRow.id ? updatedResource : row
      );
      setTableData(updatedTableData); // Update table with the new resource data

    } catch (error) {
      console.error("Error updating resource:", error);
    }
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
                <Button colorScheme="blue" onClick={() => handleUpdateClick(index)}>
                  Update
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Modal for Update Form */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Resource</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              name="title"
              value={updatedData.title}
              onChange={handleInputChange}
              mb={3}
            />
            <Textarea
              placeholder="Description"
              name="description"
              value={updatedData.description}
              onChange={handleInputChange}
              mb={3}
            />
            <Input
              placeholder="Video URL"
              name="video"
              value={updatedData.video}
              onChange={handleInputChange}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Update
            </Button>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
