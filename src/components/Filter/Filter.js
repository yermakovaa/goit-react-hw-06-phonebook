import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/contacts-actions';
import {
  getFilter,
  getContacts,
} from '../../redux/contacts/contacts-selectors';
import s from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const contacts = useSelector(getContacts);

  return (
    contacts.length > 1 && (
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={e => dispatch(filterContact(e.target.value))}
        />
      </label>
    )
  );
}

export default Filter;
