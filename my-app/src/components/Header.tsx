

const Header = ({ title, content }: { title: string; content: string }) => {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={content} />
      <title>{title}</title>
    </>
  );
};

export default Header;
