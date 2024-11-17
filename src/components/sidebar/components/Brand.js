import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components

import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <div className="admin" style={{fontSize:"26px", fontWeight:"600"}}> 
     <h1>Admin Dashboard</h1>
     </div>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
