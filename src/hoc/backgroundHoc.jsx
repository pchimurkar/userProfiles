export const backgroundHoc = (Component,bgColor='rgb(197, 159, 218)') => {
    const backgroundStyle = {
    border: '2px solid #b9b4b4',
    margin: '20px',
    padding: '10px',
    backgroundColor: bgColor,
    color:'black',
    display:'inline-block'
    }
  const NewComponent = (props) => {
    return (
      <div style={backgroundStyle}>
        {/* <p>I am from Hoc !!!</p> */}
        <Component {...props}/>
      </div>
    );
  };
  return NewComponent
};

