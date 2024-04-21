import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import {
  Box,
  Card,
  Container,
  Grid,
  styled,
  Tab,
  Tabs,
  useTheme,
} from "@mui/material";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import AgentHistoryTable from "./AgentHistoryTable";

// import CreditHistoryTable from '../CreditHistory/CreditHistoryTable';
// import GameHistoryTable from '../GameHistory/GameHistoryTable';

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
      padding: 0 ${theme.spacing(2)};
      position: relative;
      bottom: -1px;

      .MuiTabs-root {
        height: 44px;
        min-height: 44px;
      }

      .MuiTabs-scrollableX {
        overflow-x: auto !important;
      }

      .MuiTabs-indicator {
          min-height: 4px;
          height: 4px;
          box-shadow: none;
          bottom: -4px;
          background: none;
          border: 0;

          &:after {
            position: absolute;
            left: 50%;
            width: 28px;
            content: ' ';
            margin-left: -14px;
            background: ${theme.colors.primary.main};
            border-radius: inherit;
            height: 100%;
          }
      }

      .MuiTab-root {
          &.MuiButtonBase-root {
              height: 44px;
              min-height: 44px;
              background: ${theme.colors.alpha.white[50]};
              border: 1px solid ${theme.colors.alpha.black[10]};
              border-bottom: 0;
              position: relative;
              margin-right: ${theme.spacing(1)};
              font-size: ${theme.typography.pxToRem(14)};
              color: ${theme.colors.alpha.black[80]};
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 0;

              .MuiTouchRipple-root {
                opacity: .1;
              }

              &:after {
                position: absolute;
                left: 0;
                right: 0;
                width: 100%;
                bottom: 0;
                height: 1px;
                content: '';
                background: ${theme.colors.alpha.black[10]};
              }

              &:hover {
                color: ${theme.colors.alpha.black[100]};
              }
          }

          &.Mui-selected {
              color: ${theme.colors.alpha.black[100]};
              background: ${theme.colors.alpha.white[100]};
              border-bottom-color: ${theme.colors.alpha.white[100]};

              &:after {
                height: 0;
              }
          }
      }
  `
);

function AgentDataDetails(props: { userID: string, userName: string, userEmail:string, quota: number }) {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState<string>("credit");

  const tabs = [
    { value: "credit", label: "Credit History" },
    { value: "game", label: "Game History" },
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  // @ts-ignore
  return (
    <>
      <Helmet>
        <title>Agent Dashboard</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader userID={props.userID} userName={props.userName} userEmail={props.userEmail} quota={props.quota} />
      </PageTitleWrapper>
      <Container maxWidth="lg" sx={{ marginBottom: "30px" }}>
        <AgentHistoryTable userID={props.userID} />
      </Container>
    </>
  );
}

export default AgentDataDetails;
