import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function CartInfo(
    date: string,
    totalPrice: number
) {
    MySwal.fire({
        title: 'You have an open cart!',
        html: ` <p> Open since <strong> ${date} </strong> </p> <p> Total price of the items are <strong> ${totalPrice}$ </strong> </p> `,
        icon: 'info',
        confirmButtonText: 'Cool',
    })
}
