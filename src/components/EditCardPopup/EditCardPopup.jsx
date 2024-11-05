
import { useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import CalendarPicker from '../CalendarPicker/CalendarPicker'; 
import s from "./EditCardPopup.module.css";

const EditCardPopup = ({ onClose, onEdit, card }) => {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [labelColor, setLabelColor] = useState(card.labelColor);
  const [deadline, setDeadline] = useState(new Date(card.deadline));
  const [showDateInput, setShowDateInput] = useState(false);

  const handleEdit = () => {
    const updatedCard = {
      ...card,
      title,
      description,
      labelColor,
      deadline: deadline.toISOString().split('T')[0],
    };
    onEdit(updatedCard);
    onClose();
  };

  const toggleDateInput = () => {
    setShowDateInput(!showDateInput);
  };

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric' };
    const today = new Date();
    const selectedDate = new Date(date);
    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      return `Today, ${selectedDate.toLocaleDateString('en-US', options)}`;
    }
    return selectedDate.toLocaleDateString('en-US', options);
  };

  return (
    <div className={s.popup}>
      <div className={s.popupContent}>
        <button className={s.closeButton} onClick={onClose}>
          <SvgIcon
            id="icon-x-close"
            className={s.svgCloseIcon}
            width="18"
            height="18"
          />
        </button>
        <p className={s.TitleCard}>Edit Card</p>
        <input
          className={s.inputTitle}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={s.inputTitle}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={s.labelColor}>
          <p className={s.labelTitle}>Label color</p>
          <div>
            {['violet', 'pink', 'green', 'black'].map((color) => (
              <label key={color}>
                <input
                  type="radio"
                  name="labelColor"
                  value={color}
                  onChange={() => setLabelColor(color)}
                  checked={labelColor === color}
                />
                <span className={`${s.colorCircle} ${s[color]} ${labelColor === color ? s.active : ''}`} />
              </label>
            ))}
          </div>
        </div>

        {/* Using CalendarPicker for date selection */}
        <div className={s.deadline}>
          <p className={s.labelTitle}>Deadline</p>
          <div className={s.CalendarPicker}>
          <CalendarPicker
            selectedDate={deadline}
            onDateChange={setDeadline}
            showDateInput={showDateInput}
            toggleDateInput={toggleDateInput}
            formatDate={formatDate}
            calendarClassName={s.dateDisplay}
          />
          <SvgIcon id="icon-chevron-down" className={s.iconChevronDown} width="14" height="14" />
        </div>
        </div>

        <button className={s.addButton} onClick={handleEdit}>
          <SvgIcon
            id="icon-normalBtnBlack"
            className={s.createIcon}
            width="28"
            height="28"
          />
          Edit
        </button>
      </div>
    </div>
  );
};

export default EditCardPopup;


// // ПОТРІБНО ТЕСТУВАННЯ РОБОТИ КОДУ  З     BACKEND !!!

// import { useState } from 'react';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import CalendarPicker from '../CalendarPicker/CalendarPicker'; 
// import s from "./EditCardPopup.module.css";

// const EditCardPopup = ({ onClose, onEdit, card }) => {
//   const [title, setTitle] = useState(card.title);
//   const [description, setDescription] = useState(card.description);
//   const [priority, setPriority] = useState(card.priority);
//   const [deadline, setDeadline] = useState(new Date(card.deadline));
//   const [showDateInput, setShowDateInput] = useState(false);

//   const handleEdit = async () => {
//     const updatedCard = {
//       ...card,
//       title,
//       description,
//       priority,
//       deadline: deadline.toISOString().split('T')[0],
//     };

//     try {
//       const response = await fetch(`https://goit-project-02-back-end.onrender.com/api/Tasks/updateTask/${card._id}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedCard),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         onEdit(result); 
//         onClose(); 
//       } else {
//         console.error('Error:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Request failed:', error);
//     }
//   };

//   const toggleDateInput = () => {
//     setShowDateInput(!showDateInput);
//   };

//   const formatDate = (date) => {
//     const options = { month: 'long', day: 'numeric' };
//     const today = new Date();
//     const selectedDate = new Date(date);
//     if (
//       selectedDate.getDate() === today.getDate() &&
//       selectedDate.getMonth() === today.getMonth() &&
//       selectedDate.getFullYear() === today.getFullYear()
//     ) {
//       return `Today, ${selectedDate.toLocaleDateString('en-US', options)}`;
//     }
//     return selectedDate.toLocaleDateString('en-US', options);
//   };

//   return (
//     <div className={s.popup}>
//       <div className={s.popupContent}>
//         <button className={s.closeButton} onClick={onClose}>
//           <SvgIcon
//             id="icon-x-close"
//             className={s.svgCloseIcon}
//             width="18"
//             height="18"
//           />
//         </button>
//         <p className={s.TitleCard}>Edit Card</p>
//         <input
//           className={s.inputTitle}
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           className={s.inputTitle}
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <div className={s.labelColor}>
//           <p className={s.labelTitle}>Label color</p>
//           <div>
//             {['violet', 'pink', 'green', 'black'].map((color) => (
//               <label key={color}>
//                 <input
//                   type="radio"
//                   name="labelColor"
//                   value={color}
//                   onChange={() => setPriority(color)}
//                   checked={priority === color}
//                 />
//                 <span className={`${s.colorCircle} ${s[color]} ${priority === color ? s.active : ''}`} />
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Використання CalendarPicker для вибору дати */}
//         <div className={s.deadline}>
//           <p className={s.labelTitle}>Deadline</p>
//           <div className={s.CalendarPicker}>
//             <CalendarPicker
//               selectedDate={deadline}
//               onDateChange={setDeadline}
//               showDateInput={showDateInput}
//               toggleDateInput={toggleDateInput}
//               formatDate={formatDate}
//               calendarClassName={s.dateDisplay}
//             />
//             <SvgIcon id="icon-chevron-down" className={s.iconChevronDown} width="14" height="14" />
//           </div>
//         </div>

//         <button className={s.addButton} onClick={handleEdit}>
//           <SvgIcon
//             id="icon-normalBtnBlack"
//             className={s.createIcon}
//             width="28"
//             height="28"
//           />
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EditCardPopup;