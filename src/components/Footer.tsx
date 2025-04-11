import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 SUSHITR4SH. All Rights Reserved.</p>
      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
