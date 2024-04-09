import { useState, useEffect } from 'react';
import { getAllCategories, sendNotification, getAllNotifications } from './service';
import { NotificationTable } from './Notifications';

export const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [categorySelected , setCategorySelected] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const getAll = async () => {
    const data = await getAllCategories();
    const response = await getAllNotifications();
    setCategories(data);
    setNotifications(response);
  }
  useEffect(() => {
    getAll();
  }, [categorySelected, message]);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (categorySelected === '') return;

    try {
      setLoading(true);
      const category = categories.find( cate => cate.name === categorySelected);
      await sendNotification({
        category: category._id,
        message
      });
      setCategorySelected('');
      setMessage('');
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center">
      <form
        onSubmit={(e) => sendMessage(e)}
      >
        <div className="row">
          <h5>Portal Notifications</h5>
        </div>
        <div className="row">
          <div className="mb-3">
            <select className="form-select"
              value={categorySelected }
              onChange={e => setCategorySelected(e.target.value)} >
                <option value=''>Select a Category</option>
                {categories.map(category => (<option key={category._id}>{category.name}</option>))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="mb-3">
            <input className="form-control" placeholder="type your message" onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
        <div className="row">
          {
            loading?
              (
                <div className='container text-center'>
                  <div class="spinner-border text-primary" role="status">
                  </div>
                </div>
              ) : (
                <div className="mb-3">
                  <button className="btn btn-primary">Send Message</button>
                </div>
              )
          }
        </div>
      </form>
      <NotificationTable notifications={notifications}/>
    </div>
  );
}

