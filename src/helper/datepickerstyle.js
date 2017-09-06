import {StyleSheet} from 'react-native';

let style = StyleSheet.create({
    dateTouch: {
        width: 142,
        backgroundColor: 'white',
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 23,
        alignItems: 'center',
        justifyContent: 'center',

    },
    dateIcon: {
        width: 10,
        height: 10,
        marginLeft: 10,
        marginRight: 7,
    },
    dateInput: {
        flex: 1,
        height: 23,
        padding: 5,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    dateText: {
        fontSize: 15,
    },
    placeholderText: {
        fontSize: 15,
        color: 'silver'
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    btnText: {
        position: 'absolute',
        top: 10,
        height: 42,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        fontSize: 15,
        color: 'gray'
    },
    btnTextCancel: {
        color: '#666'
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
    datePicker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    disabled: {
        backgroundColor: '#eee'
    }
});

module.exports = style;