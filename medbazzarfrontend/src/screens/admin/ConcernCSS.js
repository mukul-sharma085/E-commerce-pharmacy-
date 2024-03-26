import makeStyles from '@mui/styles/makeStyles';

 export const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      width:'100%',
      height:'100vh',
      justifyContent:'center',
      alignItems:'center',
      background:'#ecf0f1',
    },
    box:{
        width:400,
        height:'auto',
        background:'#00d2d3',
        borderRadius:10,
        padding:10
    },
    boxDisplay:{
        width:800,
        height:'auto',
        background:'#00d2d3',
        borderRadius:10,
        padding:10
    }
  }));