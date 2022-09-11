import styled from "styled-components";
import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";

const Footer = () => {
  return (
    <SiteFooter>
      <h2>COMPANY</h2>
      <p>About us</p>
      <p>Careers</p>
      <p>Terms</p>
      <p>Ad Preferences</p>
      <p>Connect with us </p>
      <SocialIcons src={facebook} alt="facebook" />
      <SocialIcons src={instagram} alt="instagram" />
      <SocialIcons src={twitter} alt="twitter" />
    </SiteFooter>
  );
};

const SiteFooter = styled.footer`
  background-color: #f9ebc8;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;

  padding: 7px 0;
`;

const SocialIcons = styled.img`
  display: flex;
  width: 1.5%;
`;

export default Footer;
