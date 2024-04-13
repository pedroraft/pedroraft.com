import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Link,
  Text,
  useColorMode,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { formatDistance } from "date-fns";
import React from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { GiRank1, GiRank2, GiRank3 } from "react-icons/gi";
import { HiOutlineMail } from "react-icons/hi";
import {
  SubWorkExperience,
  WorkExperience,
} from "../components/WorkExperience";

export default function IndexPage() {
  const { colorMode, toggleColorMode } = useColorMode();
  const contrastColor = useColorModeValue("black", "white");
  return (
    <Box display="flex" justifyContent="center">
      <Box width="800px" pt="8" pb="8">
        <Button onClick={toggleColorMode} size="sm" mb="8">
          {colorMode === "light" ? <BsFillMoonFill /> : <BsFillSunFill />}
        </Button>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <VStack alignItems="flex-start" pr="16">
            <Heading size="2xl" mb="8">
              {"Hello, I'm Pedro Raft"}
            </Heading>
            <p>
              I am a React and React Native developer with{" "}
              {formatDistance(new Date("01/12/2016"), new Date())} experience
              building industry applications. I{"'"}m an active proponent of
              JavaScript and have professional experience working with Node js
              and other backend technologies like GraphQl, Redis, NoSql, Sql,
              and some experience with DevOps.
            </p>
            <p>
              I work at <a href="https://helloskip.com">helloskip.com</a> as
              Head of Engineering.
            </p>
            <HStack pt="8" width={200} justifyContent="space-between">
              <a
                href="https://www.linkedin.com/in/pedroraft/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedinIn size={24} />
              </a>
              <a
                href="https://github.com/pedroraft"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub size={24} />
              </a>
            </HStack>
          </VStack>
          <Image
            src="https://github.com/pedroraft.png"
            alt="Pedro Raft profile photo"
            height={200}
            borderRadius="full"
            width={200}
          />
        </HStack>
      </Box>
    </Box>
  );
}
