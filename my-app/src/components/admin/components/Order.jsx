export const OrderUI = ({ orders }) => {
    const { customer_name, customer_email, order_no, phone, items, address, status, total_price } = orders;
    return (
        <>
            {
                <tbody>
                    <tr className="border-b hover:bg-gray-50 text-sm hover:cursor-pointer">
                        <td className="p-3"><input type="checkbox" name="" id="" /></td>
                        <td className="p-3">{order_no}</td>
                        <td className="p-3">{customer_name}</td>
                        <td className="p-3">{customer_email}</td>
                        <td className="p-3">{phone}</td>
                        <td className="p-3">{address}</td>
                        <td className="p-3">{items.map((val) => (`${val.qty, val.title}`))}</td>
                        <td className="p-3">{total_price}</td>
                        <td className="p-3">{status}</td>
                    </tr>
                </tbody>
            }
        </>
    )
}
