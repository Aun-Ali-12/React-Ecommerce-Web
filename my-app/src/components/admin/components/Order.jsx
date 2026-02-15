export const OrderUI = ({ orders, selected, handleCheck }) => {
    const { customer_name, customer_email, order_no, phone, items, address, status, total_price } = orders;
    return (
        <>
            {
                <tr className="border-b hover:bg-gray-50 text-sm hover:cursor-pointer">
                    <td>
                        <input type="checkbox"
                            value={orders.id}
                            onChange={(e) => { handleCheck(e, orders.id) }}
                            checked={selected.includes(orders.id)} />
                    </td>
                    <td className="p-3">{order_no}</td>
                    <td className="p-3">{customer_name}</td>
                    <td className="p-3">{customer_email}</td>
                    <td className="p-3">{phone}</td>
                    <td className="p-3">{address}</td>
                    <td className="p-3">{items.map((val) => (`${val.qty, val.title}`))}</td>
                    <td className="p-3">${total_price}</td>
                    <td className="p-3"><span className={`${status === "pending" ? "bg-yellow-400 rounded-2xl px-3 py-2 text-gray-700" : "bg-green-400 rounded-2xl px-3 py-2 text-gray-700"}`}>{status}</span></td>
                </tr>
            }
        </>
    )
}