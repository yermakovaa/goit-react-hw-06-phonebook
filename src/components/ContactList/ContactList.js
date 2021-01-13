import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import s from './ContactList.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getVisibleContacts);

  return contacts.length > 0 ? (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.item} key={id}>
          <p className={s.info}>
            <b>{name}</b>
            <em>{number}</em>
          </p>
          <button
            className={s.btn}
            type="button"
            onClick={() => dispatch(deleteContact(id))}
          >
            <DeleteIcon width="26" height="26" />
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <p>Your phonebook is empty. Please add contact.</p>
  );
}

export default ContactList;
