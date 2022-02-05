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
              I work at <a href="https://helloskip.com">helloskip.com</a> as a
              Lead Software Engineer, I have built the{" "}
              <a href="https://apps.apple.com/tr/app/hello-skip/id1534615615">
                mobile app
              </a>{" "}
              from scratch and now I am leading the refactor of the web
              experience.
            </p>
            <p>
              Send me an email at <u>the@pedroraft.com</u>
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
              <a
                href="https://instagram.com/pedroraft"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="mailto:the@pedroraft.com"
                target="_blank"
                rel="noreferrer"
              >
                <HiOutlineMail size={24} />
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
        {/* <VStack mt="16" alignItems="flex-start">
          <Heading size="xl" mb={8}>
            Experience
          </Heading>
          <VStack alignItems="flex-start" spacing={4}>
            <WorkExperience
              companyName="Skip"
              website={
                <Link href="https://helloskip.com/" fontSize={12}>
                  helloskip.com
                </Link>
              }
              location="United States 🇺🇸"
              title={
                <>
                  <Box mr="2">
                    <GiRank3 size={22} />
                  </Box>
                  Lead Software Engineer
                </>
              }
              startDate={new Date("07/30/2020")}
              techs={[
                "typescript",
                "firebase",
                "appStore",
                "applePay",
                "googlePlay",
                "graphql",
                "nextjs",
                "nestjs",
                "xstate",
                "bugsnag",
                "nx",
                "aws",
                "googleCloud",
                "mysql",
                "stripe",
                "react",
              ]}
            >
              <Text>
                <Text fontWeight={"semibold"}>About the Company:</Text>A
                marketplace for help with government-related services and
                information. Adding new services and information every single
                week.
              </Text>
              <br />
              <SubWorkExperience title="As a Lead Software Engineer (Current position)">
                I am leading the refactor of web experience in an effort to
                unify both the project in terms of code and in terms of user
                experience, the projects are shared using a Nx monorepo and use
                react-native-web to share code between react native and next js.
              </SubWorkExperience>
              <SubWorkExperience title="As a Senior React Native Developer">
                I developed this app alone, took about 2 months working part
                time to reach production. This app contains all the knowledge I
                gathered in react native, I used a library called xstate that
                creates final state machines to control service booking flows,
                this flows are highly complex and have a lot of variation of
                outcome depending on multiple factors, making it a perfect use
                case for final state machines, this library also allows you to
                visualize in interactive flowchart the logic of the machine,
                this sped up my iteration with the client and also made us sure
                that the ux flow had no flaws. It also uses a more advanced
                version of redux called rematch, one signal push notifications,
                firebase analytics, communication with graphql as well as rest
                apis, remote configuration, code push(this allows remotely
                updating the app code without releasing a new version) and
                animations with react native reanimated.
              </SubWorkExperience>
            </WorkExperience>

            <WorkExperience
              companyName="V1"
              title={
                <>
                  <Box mr="2">
                    <GiRank2 size={22} />
                  </Box>
                  React Native Developer
                </>
              }
              website={
                <HStack spacing={4}>
                  <Link href="https://v1app.com.br/" fontSize={12}>
                    v1app.com.br
                  </Link>
                  <span>•</span>
                  <Link
                    href="https://apps.apple.com/br/app/v1/id1273279926"
                    fontSize={12}
                  >
                    iOS App
                  </Link>
                  <span>•</span>
                  <Link
                    href="https://play.google.com/store/apps/details?id=vix.projetovapp&hl=pt_BR&gl=US"
                    fontSize={12}
                  >
                    Android App
                  </Link>
                </HStack>
              }
              startDate={new Date("01/01/2020")}
              endDate={new Date("09/01/2020")}
              location="Vila Velha, Brazil 🇧🇷"
              techs={[
                "react",
                "javascript",
                "typescript",
                "redux",
                "firebase",
                "appStore",
                "googlePlay",
                "sentry",
                "radario",
                "ble",
              ]}
            >
              <Text>
                <Text fontWeight={"semibold"}>About the Company:</Text>A V1 is a
                transport and car rental app, large sum of the revenue comes
                from b2b contracts, V1 has hired drivers and their own fleet of
                new cars.
              </Text>
              <br />
              <Text>
                <Text fontWeight={"semibold"}>My role:</Text>I maintained the
                transport app and developed a lot of the car rental part of the
                app, the service is fully done by app, from renting to opening
                the cars using bluetooth at the station and delivering the car
                back, human intervention is only used when needed. I also
                developed the internal app for car maintainers from scratch. The
                app has over 150k users.
              </Text>
            </WorkExperience>

            <WorkExperience
              companyName="Wine"
              title={
                <>
                  <Box mr="2">
                    <GiRank2 size={22} />
                  </Box>
                  React Native Developer
                </>
              }
              website={
                <Link href="https://www.wine.com.br/" fontSize={12}>
                  wine.com.br
                </Link>
              }
              techs={[
                "react",
                "javascript",
                "typescript",
                "redux",
                "firebase",
                "appStore",
                "applePay",
                "googlePay",
                "googlePlay",
                "bugsnag",
              ]}
              startDate={new Date("01/01/2020")}
              endDate={new Date("09/01/2020")}
              location="Vitória, Brazil 🇧🇷"
            >
              Globalsys is an outsourcing tech company and software house.
              During this time I took part, alongside a very talented team, in
              building Wine's rewards and benefits program, also their
              subscription club. At the time I left, the App had over 100k users
              and was responsible for a huge share of the company's revenue.
            </WorkExperience>

            <WorkExperience
              companyName="Maxis JS"
              title={
                <>
                  <Box mr="2">
                    <GiRank1 size={22} />
                  </Box>
                  Full-Stack Developer
                </>
              }
              techs={[
                "ionic",
                "node",
                "postgres",
                "javascript",
                "typescript",
                "ngnix",
                "redis",
                "solidity",
                "docker",
              ]}
              startDate={new Date("01/01/2020")}
              endDate={new Date("09/01/2020")}
              location="Vitória, Brazil 🇧🇷"
            >
              Maxis was a tech startup, I was involved in a prototype project,
              the idea was to make payments using blockchain easy and fun, it
              involved an advanced reward and loyalty program for business to
              offer their costumers. We were a two man team so I was working
              full stack in this project. Unfortunately it never saw production,
              the project was scrapped after some news in Brazil regard crypto
              money laundering scandals, it was clear this was not the right
              time to launch this app. During my time there, I was involved with
              several other small projects, mostly simple sites and a few spa
              dashboards.
            </WorkExperience>

            <WorkExperience
              companyName="CSA Gatti"
              title={
                <>
                  <Box mr="2">
                    <GiRank1 size={22} />
                  </Box>
                  Full-Stack Developer
                </>
              }
              techs={[
                "mongodb",
                "angular",
                "node",
                "mysql",
                "typescript",
                "ngnix",
                "redis",
                "javascript",
                "docker",
              ]}
              startDate={new Date("01/01/2020")}
              endDate={new Date("09/01/2020")}
              location="Vitória, Brazil 🇧🇷"
            >
              Csa was a small company from a close friend of mine, we were doing
              small jobs at this time, mostly web sites and dashboards.
            </WorkExperience>

            <WorkExperience
              companyName="Phidelis"
              title={
                <>
                  <Box mr="2">
                    <GiRank1 size={22} />
                  </Box>
                  Full-Stack Developer
                </>
              }
              techs={[
                "dotNet",
                "microsoft",
                "angular",
                "powerBI",
                "typescript",
                "javascript",
              ]}
              startDate={new Date("01/01/2020")}
              endDate={new Date("09/01/2020")}
              location="Vitória, Brazil 🇧🇷"
            >
              Phidelis is a university / school all in one solution, at the time
              it had over 30 clients including some very large Brazilian
              universities. This was my very first job and although I program
              since I was a kid, this was my first time with a professional team
              dealing with serious software and version control. I made some
              great friends there. The biggest project I was involved there was
              integrating boleto (invoice) system with over 15 different banks
              with the cnab protocol (each bank has their own).
            </WorkExperience>
          </VStack>
        </VStack> */}
      </Box>
    </Box>
  );
}
