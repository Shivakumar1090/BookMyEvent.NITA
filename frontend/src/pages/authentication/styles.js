const  title = {
    textAlign: 'center',
    fontSize: '2xl',
    fontWeight: 'bold',
    lineHeight: '5',
}

const form = {
  width: '450px',
  "@media only screen and (max-width: 600px)":{
      width: '200px',
  },
}

const btn = {
  background: "#4F46E5",
  marginTop: "10px",
  padding: "7px",
  textTransform: "capitalize",
  fontSize: "15px",
  color: '#fff',
}

const container = {
  display: 'flex',
  minHeight: '90vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6px',
  paddingTop: '12px',
}

export {title , container,form,btn};