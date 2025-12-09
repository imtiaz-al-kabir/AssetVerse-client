const Footer = () => {
  return (
    <footer className="footer p-10 bg-blue-400 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside>
          <div className="text-3xl font-bold mb-2">AssetVerse</div>
          <p>
            Corporate Asset Management System.
            <br />
            Providing reliable tracking since 2024
          </p>
        </aside>
        <nav className="flex flex-col gap-3">
          <header className="footer-title">Services</header>
          <a className="link link-hover">Asset Tracking</a>
          <a className="link link-hover">Employee Management</a>
          <a className="link link-hover">Reporting</a>
          <a className="link link-hover">Support</a>
        </nav>
        <nav className="flex flex-col gap-3">
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
        </nav>
        <nav className="flex flex-col gap-3">
          <header className="footer-title">Legal</header>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
