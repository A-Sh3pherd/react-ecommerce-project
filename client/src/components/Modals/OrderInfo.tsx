import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function OrderInfo(
    date: string,
) {
    MySwal.fire({
        title: `Your last order was at: `,
        html: ` <p> <strong style="font-size: 1.25rem"> ${date} </strong> </p> `,
        icon: 'info',
        confirmButtonText: 'Cool',
    })
}
