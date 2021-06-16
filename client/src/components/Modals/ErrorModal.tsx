import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function ErrorModal(
    msg: string
) {
    MySwal.fire({
        title: `${msg}`,
        html: ` <p> </p>`,
        icon: 'error',
        confirmButtonText: 'Crap.',
    })
}
