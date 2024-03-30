import {
  Card,
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendHelloButton,
} from '../components';
import { isLocalSnap, shouldDisplayReconnectButton } from '../utils';
import {
  useInvokeSnap,
  useMetaMask,
  useMetaMaskContext,
  useRequestSnap,
} from '../hooks';

import { defaultSnapOrigin } from '../config';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Index = () => {
  const { error } = useMetaMaskContext();
  const { isFlask, snapsDetected, installedSnap } = useMetaMask();
  const requestSnap = useRequestSnap();
  const invokeSnap = useInvokeSnap();

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? isFlask
    : snapsDetected;

  const requestWithAIGuard = async (callData: any) => {
    const verified = await invokeSnap({
      method: 'ai-guard',
      // params: { data: callData, chainId: window.ethereum.chainId },
      params: { data: callData, chainId: '1261120' },
    });
    if (verified) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts) {
        await window.ethereum.request(callData);
      }
    }
  };

  const handleSafeContractClick = async () => {
    const callData = {
      method: 'eth_sendTransaction',
      params: [
        {
          to: '0xdC0e4E9C1BF3Aa88Cd9BE32186a741cd893C78cA',
          from: '0xb0b9c5F027A59409579A6a9139c4E9BB29De5A4b',
          gas: '0x5028',
          value: '0x3b9aca00',
        },
      ],
    };
    await requestWithAIGuard(callData);
  };

  const handleHackedContractClick = async () => {
    const callData = {
      method: 'eth_sendTransaction',
      params: [
        {
          to: '0xdC0e4E9C1BF3Aa88Cd9BE32186a741cd893C78cA',
          from: '0xb0b9c5F027A59409579A6a9139c4E9BB29De5A4b',
          gas: '0x5028',
          value: '0x3b9aca00',
        },
      ],
    };
    await requestWithAIGuard(callData);
  };

  return (
    <Container>
      <Heading>
        <Span>AI GUARD</Span> Metamask Snap
      </Heading>
      <Subtitle>Keep your wallet.</Subtitle>
      <CardContainer>
        {error && (
          <ErrorMessage>
            <b>An error happened:</b> {error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={requestSnap}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        <Card
          content={{
            title: 'Base ERC20',
            description: 'Call Base ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={handleSafeContractClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
        <Card
          content={{
            title: 'Hacked ERC20',
            description: 'Call Harmful ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={handleHackedContractClick}
                disabled={!installedSnap}
              />
            ),
          }}
          disabled={!installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(installedSnap) &&
            !shouldDisplayReconnectButton(installedSnap)
          }
        />
      </CardContainer>
    </Container>
  );
};

export default Index;
