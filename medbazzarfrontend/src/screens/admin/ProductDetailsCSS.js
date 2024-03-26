import makeStyles from '@mui/styles/makeStyles';

export const productDetailStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    width:'100%',
    height:'100vh',
    justifyContent:'center',
    alignItems:'center',
    background:'#ecf0f1',
  },
  box:{
      width:700,
      height:'auto',
      background:'#00d2d3',
      borderRadius:10,
      padding:10
  },
  boxDisplay:{
      width:1200,
      height:'auto',
      background:'#00d2d3',
      borderRadius:10,
      padding:10
  }
}));