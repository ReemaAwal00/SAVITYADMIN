
// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { useState, useEffect } from "react";

import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import { getAllUsers } from "services/userApi";
import { getAllDoctors } from "services/doctorApi";
import { getAllVolunteers } from "services/volunteerApi";
export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [users, doctors, volunteers] = await Promise.all([
          getAllUsers(),
          getAllDoctors(),
          getAllVolunteers()
        ]);
        
        setTotalUsers(users.length);
        setTotalDoctors(doctors.length);
        setTotalVolunteers(volunteers.length);
      } catch (error) {
        console.error("Error fetching counts:", error);
        // Handle errors appropriately
      }
    };

    fetchCounts();
  }, []);


  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Total Users'
          value={totalUsers.toString()}
        />
        
       
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              
            </Flex>
          }
          name='Total Doctors'
          value={totalDoctors.toString()}
        />
        
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Volunteers'
          value={totalVolunteers.toString()}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
         
        </SimpleGrid>
      </SimpleGrid>
      
    </Box>
  );
}
