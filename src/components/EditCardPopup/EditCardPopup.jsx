// import { useState } from 'react';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import s from "./EditCardPopup.module.css";

// const EditCardPopup = ({ onClose, onEdit, card }) => {
//   const [title, setTitle] = useState(card.title);
//   const [description, setDescription] = useState(card.description);
//   const [labelColor, setLabelColor] = useState(card.labelColor);
//   const [deadline, setDeadline] = useState(card.deadline);
//   const [showDateInput, setShowDateInput] = useState(false);

//   // Функція для перемикання відображення поля вибору дати
//   const toggleDateInput = () => {
//     setShowDateInput(!showDateInput);
//   };

//   // Форматування дати для відображення
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const handleEdit = () => {
//     const updatedCard = {
//       ...card,
//       title,
//       description,
//       labelColor,
//       deadline,
//     };
//     onEdit(updatedCard);
//     onClose();
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
//                   checked={labelColor === color}
//                   onChange={() => setLabelColor(color)}
//                 />
//                 <span className={`${s.colorCircle} ${s[color]}`} />
//               </label>
//             ))}
//           </div>
//         </div>
//         <div className={s.deadline}>
//           <p className={s.deadlineLabel}>Deadline</p>
//           <div onClick={toggleDateInput} className={s.dateDisplay}>
//             {deadline ? formatDate(deadline) : 'Select a date'}
//             <SvgIcon id="icon-chevron-down" className={s.iconChevronDown} width="14" height="14" />
//           </div>


//           {showDateInput && (
//            <input
//            type="date"
//            value={deadline}
//            min={new Date().toISOString().split("T")[0]} // забороняє вибір минулих дат
//            onChange={(e) => {
//              setDeadline(e.target.value);
//              setShowDateInput(false);
//            }}
//            className={s.dateInput}
//          />
//           )}
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


import { useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import CalendarPicker from '../CalendarPicker/CalendarPicker'; // Import the CalendarPicker component
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