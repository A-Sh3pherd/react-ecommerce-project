import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function NewUserModal(
    user: string
) {
    MySwal.fire({
        title: `Hey ${user} !`,
        html: ` <h3> Welcome To iPay :) </h3> `,
        icon: 'info',
        confirmButtonText: 'Cool',
    })
}
