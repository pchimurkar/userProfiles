import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <Spinner animation="border" variant="success">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}

export default Loader;