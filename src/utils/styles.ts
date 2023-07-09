import { Image, NavbarIcon } from "./constant"

const colors = {
    lightGray: '#5d5454ad',
    redBtnhovered: '#ad081b',
    modalBackground:'#121212b3',
    crossBtnHovered:'#1e1c1c57',
    inputBorderColor:'#80808038',
    hoverTransparentBtn:'#201c1ca1',
}
export const styles = {
    NavbarContainer: {
        width: '100%',
        // height: '50px',
        backgroundColor: '#00000094',
        // padding:5,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: { md: 'sticky', xs: 'fixed' },
        top: { xs: 'auto', md: 0 },
        bottom: { xs: 0, md: 'auto' },
        boxShadow: '0 0 1px',
        zIndex: 100,
        filter: 'drop-shadow(2px 4px 6px black)'
    },
    NavbarIcons: (item: NavbarIcon, pathName: string) => ({
        flex: { md: (item.name === 'Search') ? 35 : 1, xs: 0 },
        padding: ['Search'].includes(item.name) ? 0 : 1,
        background: { md: (item.name === 'Search') ? colors.lightGray : (item.path === pathName) ? colors.redBtnhovered : '', xs: (item.path === pathName) ? colors.redBtnhovered : (item.path === pathName) ? colors.redBtnhovered : '' },
        margin: .5,
        borderRadius: 20,
        color: ([item.path].includes(pathName)) ? 'black' : 'white',
        cursor: 'pointer',
        display: { xs: ['Search', 'Messages', 'Logo'].includes(item.name) ? 'none' : 'flex', md: 'flex' },
        ":hover": {
            background: ['Search','Logo','Profile'].includes(item.name) ? '' : 'white',
            color: ['Search','Logo','Profile'].includes(item.name) ? '' : `black !important`
        },
        justifyContent: "center",
        alignItems: 'center',
        zIndex: 100
    }),
    input: {
        color: 'white',
        border: 'none ',
        "::after": {
            borderBottom: 'none'
        },
        "::before": {
            borderBottom: `none !important`
        },
        ":focus": {
            borderBottom: 'none'
        },
        ":focus-visible": {
            borderBottom: 'none'
        },
        ":hover": {
            borderBottom: 'none'
        },
        width: '100% ',
        background: 'transparent',
        boxShadow: '0 0 0',
        padding: 1,
        paddingLeft: 2,
        paddingRight: 2
    },
    flex1: {
        flex: 1
    },
    displayFlex: {
        display: 'flex'
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    alignItemCenter: {
        alignItems: 'center'
    },
    explore: {
        background: 'transparent',
        margin: '2rem 1rem'
    },
    FlexColumn: {
        flexDirection: 'column'
    },
    bold: {
        fontWeight: "bold"
    },
    h5: {

    },
    h4: {

    },
    flexWrap: {
        flexWrap: 'wrap'
    },
    exploreCardsContainer: {
        justifyContent: 'space-evenly',
        background: 'transparent',
        margin: 2,
        width: { md: '80%', xs: '95%' }
    },
    exploreCard: (src: string) => ({
        background: 'blue',
        flex: { md: '1 0 20%', xs: '1 0 45%' },
        margin: { md: '2rem 4rem', xs: 2 },
        minHeight: '30vh',
        borderRadius: 5,
        boxShadow: '0 0 2px blue',
        ":hover": {
            transform: 'scale(1.05)',
        },
        backgroundImage: `url("${src}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        alignItems: 'end',
        // filter: 'blur(2px)',
    }),
    saveBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        color: 'white',
        backgroundColor: `${colors.redBtnhovered} !important`,
        padding: 1,
        borderRadius: 10,
    },
    roundedBtn: {
        padding: 1,
        borderRadius: '50%',
        backgroundColor: 'white !important',
        color: 'black',
        minWidth: 0,
        fontWeight: 'bold'
    },
    modalContainer: {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        background:colors.modalBackground,
        color:'white',
        borderRadius:7,
        display:'flex',
        width:{md:'50%',xs:'80%'},
        
    },
    crossBtn:{
        color:'white',
        backgroundColor:'transparent !important',
        position:'absolute',
        left:0,
        top:0,
        padding:3,
        height:0,
        width:0,
        ":hover":{
            backgroundColor:`${colors.crossBtnHovered} !important`
        }
    },
    formInput:(name:string)=>({
        background:'transparent',
        m:'1.5rem 0',
        border:`1px solid ${colors.inputBorderColor}`,
        borderRadius:3,
        ":hover":{
            borderBottom:`1px solid ${colors.inputBorderColor}`
        },
        position:'relative',
        "::before":{
            content:`"${name}"`,
            position:'absolute',
            top:-30,
            left:0,
            fontWeight:'100'
        }
    }),
    cardBg:{
        background: colors.modalBackground
    },
    transparentBtn:(isCreate:string,item:{
        name:string
    })=>({
        background: 'none',
        backgroundColor: 'none',
        color:'white',
        borderRadius:3,
        marginRight:2,
        "::after": {
            content: '""',
            display: [isCreate].includes(item?.name)?"block":'none',
            background: colors.inputBorderColor,
            width: '55%',
            height: 2,
            position:'absolute',
            bottom:0
        },
        ":hover":{
            background:'transparent'
        }
    }),
    verified:{
        color:'rgb(0, 149, 246)',
        fill:'rgb(0, 149, 246)',
        margin:'0 1px',
        fontSize:'22px'
    }
}