export const NotificationTable = (props) => {
  const { notifications } = props;
  return (
    <div className='row'>
    <div className='col-10'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Delivered</th>
            <th scope="col">Notification</th>
            <th scope="col">Category</th>
            <th scope="col">Date</th>
            <th scope="col">Message</th>
            <th scope="col">User</th>
          </tr>
        </thead>
        <tbody>
          {
            notifications.map(notif => (
              <tr key={notif._id}>
                <th scope="row">{notif.delivered ? 'Yes' : 'No'}</th>
                <td>{notif.notification}</td>
                <td>{notif.category.toString()}</td>
                <td>{(new Date(notif.time).toLocaleString())}</td>
                <td>{notif.message}</td>
                <td>{notif.user.email}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  </div>
  );
}
