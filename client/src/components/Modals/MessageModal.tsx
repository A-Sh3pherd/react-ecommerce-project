import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function MessageModal(
    msg: string,
    buttonText: string,
    msgIcon?: 'success' | 'error' | 'warning' | 'info' | 'question' | 'undefined',
) {
    MySwal.fire({
        title: `${msg}`,
        html: ` <p> </p>`,
        icon: `success`,
        confirmButtonText: `${buttonText}`,
    })
}
