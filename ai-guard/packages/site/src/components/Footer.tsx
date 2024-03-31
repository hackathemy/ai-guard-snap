import styled from 'styled-components';

const FooterWrapper = styled.footer`
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
  border-top: 1px solid ${(props) => props.theme.colors.border?.default};
`;

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>Docs https://ai-guard-snap-docs.web.app/</p>
      <p>AI GUARD API https://aiguad.hackathemy.me/swagger/</p>
      <p>Github https://github.com/hackathemy/ai-guard-snap</p>
      <p>Github API https://github.com/hackathemy/ai-guard-assistant-api</p>
    </FooterWrapper>
  );
};
