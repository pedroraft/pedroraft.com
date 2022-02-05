import { Box, Tooltip, useColorModeValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { FaNodeJs, FaStripe } from "react-icons/fa";
import { GrMysql } from "react-icons/gr";
import {
  SiAmazonaws,
  SiAngular,
  SiApplepay,
  SiAppstore,
  SiBluetooth,
  SiBugsnag,
  SiCsharp,
  SiDocker,
  SiDotnet,
  SiEthereum,
  SiFirebase,
  SiGooglecloud,
  SiGooglepay,
  SiGoogleplay,
  SiGraphql,
  SiIonic,
  SiJavascript,
  SiMicrosoft,
  SiMicrosoftsqlserver,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNginx,
  SiNx,
  SiPostgresql,
  SiPowerbi,
  SiRadar,
  SiReact,
  SiRedis,
  SiRedux,
  SiSentry,
  SiTypescript,
  SiXstate,
} from "react-icons/si";

const techList = {
  typescript: { label: "Typescript", color: "#2f74c0", Icon: SiTypescript },
  firebase: { label: "Firebase", color: "#ffcc31", Icon: SiFirebase },
  appStore: { label: "App Store", color: "#1b85ed", Icon: SiAppstore },
  applePay: { label: "Apple Pay", Icon: SiApplepay },
  googlePay: { label: "Google Pay", color: "#4286f4", Icon: SiGooglepay },
  nextjs: { label: "Next JS", Icon: SiNextdotjs },
  nestjs: { label: "Nest JS", color: "#e0234e", Icon: SiNestjs },
  graphql: { label: "GraphQL", color: "#df33a6", Icon: SiGraphql },
  googlePlay: { label: "Google Play", color: "#4286f4", Icon: SiGoogleplay },
  xstate: { label: "Xstate", Icon: SiXstate },
  bugsnag: { label: "Bugsnag", color: "#4949e4", Icon: SiBugsnag },
  nx: { label: "NX", color: "#153157", Icon: SiNx },
  aws: { label: "AWS", color: "#ec912d", Icon: SiAmazonaws },
  googleCloud: { label: "Google Cloud", color: "#4286f4", Icon: SiGooglecloud },
  mysql: { label: "MySql", color: "#4479a2", Icon: GrMysql },
  stripe: { label: "Stripe", color: "#5469d4", Icon: FaStripe },
  react: { label: "React and React Native", color: "#5fd3f3", Icon: SiReact },
  javascript: { label: "Javascript", color: "#f7df1d", Icon: SiJavascript },
  redux: { label: "Redux", color: "#7348b6", Icon: SiRedux },
  sentry: { label: "Sentry", color: "#362d59", Icon: SiSentry },
  radario: { label: "Radar.io", color: "#037aff", Icon: SiRadar },
  ble: { label: "Bluetooth low energy", color: "#007ff6", Icon: SiBluetooth },
  ionic: { label: "Ionic", color: "#488aff", Icon: SiIonic },
  node: { label: "Node JS", color: "#7cb702", Icon: FaNodeJs },
  postgres: { label: "Postgres", color: "#336791", Icon: SiPostgresql },
  ngnix: { label: "NGINX", color: "#019237", Icon: SiNginx },
  redis: { label: "Redis", color: "#dc382c", Icon: SiRedis },
  mongodb: { label: "Mongo DB", color: "#4aa446", Icon: SiMongodb },
  angular: { label: "Angular", color: "#dd0032", Icon: SiAngular },
  csharp: { label: "Csharp", color: "#9868d4", Icon: SiCsharp },
  sqlServer: {
    label: "Sql Server",
    color: "#d32023",
    Icon: SiMicrosoftsqlserver,
  },
  dotNet: { label: "Dot Net", color: "#4d29ca", Icon: SiDotnet },
  microsoft: { label: "Microsoft", color: "#049be2", Icon: SiMicrosoft },
  powerBI: { label: "Power Bi", color: "#eac213", Icon: SiPowerbi },
  solidity: { label: "Solidity (Ethereum)", Icon: SiEthereum },
  docker: { label: "Docker", color: "#2496ed", Icon: SiDocker },
};

export type techIcon = keyof typeof techList;

export const TechIcon: React.FC<{ tech: techIcon }> = ({ tech }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { Icon, label, color } = techList[tech] as {
    label: string;
    color?: string;
    Icon: IconType;
  };
  const contrastColor = useColorModeValue("black", "white");
  return (
    <Tooltip label={label}>
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Icon
          color={isHovered ? color || contrastColor : undefined}
          size={24}
        />
      </Box>
    </Tooltip>
  );
};
