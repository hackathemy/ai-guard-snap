import {
  Card,
  ConnectButton,
  InstallFlaskButton,
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
  width: 95%;
  height: 100%;
  margin-top: 1.5rem;
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

  const requestWithAIGuard = async (data: any) => {
    console.log(data);
    const verified = await invokeSnap({
      method: 'ai-guard',
      params: data,
    });
    if (verified) {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts) {
        await window.ethereum.request(data.data);
      }
    }
  };

  const handleCallContractClick = async (
    chain: string,
    contractAddress: string,
  ) => {
    const callData = {
      method: 'eth_sendTransaction',
      params: [
        {
          to: contractAddress,
          from: '0xb0b9c5F027A59409579A6a9139c4E9BB29De5A4b',
          gas: '0x5028',
          value: '0x3b9aca00',
        },
      ],
    };
    await requestWithAIGuard({ chainId: chain, data: callData });
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
            title: 'Astar zkEVM 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () =>
                  handleCallContractClick(
                    '1261120',
                    '0x211827624c627d228660A07e55ABCe931485dBAB',
                  )
                }
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
            title: 'Astar zkEVM 🔴 ERC20',
            description: 'Danger ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () =>
                  handleCallContractClick(
                    '1261120',
                    '0xdC0e4E9C1BF3Aa88Cd9BE32186a741cd893C78cA',
                  )
                }
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
            title: 'NEON 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () =>
                  handleCallContractClick(
                    '245022926',
                    '0x89740b73594D505A7c4d4238703769bF40448F7A',
                  )
                }
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
            title: 'NEON 🔴 ERC20',
            description: 'Danger ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () =>
                  handleCallContractClick(
                    '245022926',
                    '0xC8f2F44a2214b204C2eD4DDfEfe685148A9aB211',
                  )
                }
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
            title: 'INJECTIVE inEVM 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () =>
                  handleCallContractClick(
                    '2424',
                    '0x211827624c627d228660A07e55ABCe931485dBAB',
                  )
                }
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
            title: 'INJECTIVE inEVM 🔴 ERC20',
            description: 'Danger ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () =>
                  handleCallContractClick(
                    '2424',
                    '0x8401B4CA7D07063B76eb9Add964047690725C2fd',
                  )
                }
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
            title: 'ETH Sepolia 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () => handleCallContractClick('11155111', '')}
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
            title: 'Kava 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () => handleCallContractClick('2222', '')}
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
            title: 'Celo 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () => handleCallContractClick('44787', '')}
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
            title: 'Fhenix 🟢 ERC20',
            description: 'Safe ERC20 Contract',
            button: (
              <SendHelloButton
                onClick={async () => handleCallContractClick('42069', '')}
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
