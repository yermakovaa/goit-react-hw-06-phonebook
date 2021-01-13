import { useSelector, useDispatch } from 'react-redux';
import { filterContact } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={e => dispatch(filterContact(e.target.value))}
      />
    </label>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Filter;
