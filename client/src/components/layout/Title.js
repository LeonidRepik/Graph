const Title = () => {
  const styles = getStyles();
  return (
    <div className="title">
      <h1 style={styles.title}>PEOPLE ANR THEIR CARS</h1>
    </div>
  );
};

const getStyles = () => ({
  title: {
    fontSize: 20,
    padding: "15px",
    marginBottom: "50px",
  },
});

export default Title;
