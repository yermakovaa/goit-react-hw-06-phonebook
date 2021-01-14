import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContact,
  dndContact,
} from '../../redux/contacts/contacts-actions';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ReactComponent as DeleteIcon } from '../../img/delete.svg';
import s from './ContactList.module.css';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function ContactList() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;

    const items = reorder(contacts, source.index, destination.index);

    dispatch(dndContact(items));
  };

  return contacts.length > 0 ? (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="contacts">
        {provided => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={s.list}
          >
            {contacts.map(({ id, name, number }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {provided => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={s.item}
                  >
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  ) : (
    <p>Your phonebook is empty. Please add contact.</p>
  );
}

export default ContactList;
