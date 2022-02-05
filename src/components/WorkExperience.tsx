import { Box, Divider, Heading, HStack, Text } from "@chakra-ui/react";
import { format, formatDistance } from "date-fns";
import React, { ReactElement } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import { techIcon, TechIcon } from "./TechIcon";

export const WorkExperience: React.FC<{
  techs: techIcon[];
  companyName: string | ReactElement<any, any>;
  startDate: Date;
  endDate?: Date;
  location: string | ReactElement<any, any>;
  title: string | ReactElement<any, any>;
  website: string | ReactElement<any, any>;
}> = ({
  children,
  techs,
  companyName,
  startDate,
  endDate,
  location,
  title,
  website,
}) => {
  return (
    <Box width="100%">
      <Box mb="4">
        <HStack spacing={4}>
          <FaBuilding size={22} />
          <Heading size="lg">{companyName}</Heading>
        </HStack>
        <Box ml="10">{!!website && website}</Box>
      </Box>

      <Text
        mb="2"
        fontWeight="bold"
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
      >
        {title}
      </Text>
      <Text mb="4">
        From {format(startDate, "MMMM yyyy")} until{" "}
        {endDate ? format(endDate, "MMMM yyyy") : "now"} (
        {formatDistance(startDate, endDate || new Date())}) at {location}
      </Text>
      <HStack spacing="4" mb="8">
        {techs.sort().map((t) => (
          <TechIcon tech={t} key={t} />
        ))}
      </HStack>
      {children}
      <Divider mt="8" />
    </Box>
  );
};

export const SubWorkExperience: React.FC<{ title: string }> = ({
  children,
  title,
}) => {
  return (
    <Box mb="2">
      <HStack mb="2">
        <BsArrowReturnRight size={18} />
        <Text
          mb="2"
          fontWeight="bold"
          display={"flex"}
          flexDir={"row"}
          alignItems={"center"}
        >
          {title}
        </Text>
      </HStack>
      <Box ml="7">{children}</Box>
    </Box>
  );
};
