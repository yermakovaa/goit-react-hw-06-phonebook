import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/contacts-actions';
import { getVisibleContacts } from '../../redux/contacts/contacts-selectors';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import s from './ContactList.module.css';
import popTransition from './transitions/pop.module.css';

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getVisibleContacts);

  return contacts.length > 0 ? (
    <TransitionGroup component="ul" className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <CSSTransition key={id} timeout={500} classNames={popTransition}>
          <li className={s.item}>
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
        </CSSTransition>
      ))}
    </TransitionGroup>
  ) : (
    <p>Your phonebook is empty. Please add contact.</p>
  );
}

export default ContactList;
