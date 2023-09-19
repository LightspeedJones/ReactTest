import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 10,
    },
    list: {
        overflowY: scroll,
        maxHeight: 300,
        flex: 1,
        padding: 15,
    },
    text: {
        padding: 5
    },
    listContainer: {
        width: '90%'
    },
    btnAdd:{
        justifyContent: 'center',
        alignContent: 'center',
    },
    btnDoneRemove: {
        flexDirection: 'row',
        columnGap: 10,
        alignItems: 'flex-end',
        marginLeft: 'auto'
    }
})