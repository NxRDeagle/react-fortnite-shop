const Footer = () => {
  return (
    <footer className="page-footer pink darken-4">
      <div className="footer-copyright">
        <div className="container">
          © {new Date().getFullYear()} Copyright Text
          <a
            className="grey-text text-lighten-4 right"
            href="https://github.com/NxRDeagle/react-fortnite-shop"
            target="_blank">
            Repo
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
