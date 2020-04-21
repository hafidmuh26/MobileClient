import { Toast } from 'native-base';

export function showError(error) {
    Toast.show({
        text: error.message,
        buttonText: 'OK',
        type: 'danger',
        durations: 3000
    });
}

export function showSuccess() {
    Toast.show({
        text: success.message,
        buttonText: 'OK',
        type: 'succes',
        durations: 3000
    });
}