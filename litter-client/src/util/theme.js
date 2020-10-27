export default {
  palette: {
    primary: {
      main: '#212121',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FAFAFA',
      contrastText: '#212121',
    },
  },
  typography: {
    useNextVariants: true,
  },
  theme: {
    form: {
      textAlign: 'center',
    },
    image: {
      margin: '20px auto 20px auto',
    },
    pageTitle: {
      margin: '10px auto 10px auto',
    },
    textField: {
      margin: '10px auto 10px auto',
    },
    button: {
      margin: 20,
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: '10px',
    },
    progress: {
      position: 'absolute',
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4,
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20,
    },
    paper: {
      padding: 20,
    },
    profile: {
      '& .image-wrapper': {
        textAlign: 'center',
        position: 'relative',
        '& button': {
          position: 'absolute',
          top: '80%',
          left: '70%',
        },
      },
      '& .profile-image': {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%',
      },
      '& .profile-details': {
        textAlign: 'center',
        '& span, svg': {
          verticalAlign: 'middle',
        },
        '& a': {
          color: '#00bcd4',
        },
      },
      '& hr': {
        border: 'none',
        margin: '0 0 10px 0',
      },
      '& svg.button': {
        '&:hover': {
          cursor: 'pointer',
        },
      },
    },
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px',
      },
    },
    card: {
      display: 'flex',
      marginBottom: 20,
    },
    cardContent: {
      width: '100%',
      flexDirection: 'column',
      padding: 25,
    },
    cover: {
      minWidth: 200,
      objectFit: 'cover',
    },
    handle: {
      width: 60,
      height: 18,
      backgroundColor: '#212121',
      marginBottom: 7,
    },
    date: {
      height: 14,
      width: 100,
      backgroundColor: 'rgba(0,0,0,0.3)',
      marginBottom: 10,
    },
    fullLine: {
      height: 15,
      width: '90%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      marginBottom: 10,
    },
    halfLine: {
      height: 15,
      width: '50%',
      backgroundColor: 'rgba(0,0,0,0.6)',
      marginBottom: 10,
    },
  },
}
