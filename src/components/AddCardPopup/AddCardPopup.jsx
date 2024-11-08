
// // ПОТРІБНО ТЕСТУВАННЯ РОБОТИ КОДУ  З     BACKEND !!!
import { useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import s from './AddCardPopup.module.css';

const AddCardPopup = ({ onClose, onAdd, userId, columnId, accessToken }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [labelColor, setLabelColor] = useState('');
  const [priority, setPriority] = useState(''); 
  const [deadline, setDeadline] = useState(new Date());
  const [showDateInput, setShowDateInput] = useState(false);

  const handleAdd = async () => {
    const createTask = {
      title,
      description,
      priority,
      deadline: deadline.toISOString().split('T')[0],
      userId,
      columnId,
    };

    try {
      const response = await fetch('/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify(createTask),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      onAdd(data);
      onClose();
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  const colorPriority = [
    { color: "#8FA1D0", priority: "low" },
    { color: "#E09CB5", priority: "medium" },
    { color: "#BEDBB0", priority: "high" },
    { color: "#FFFFFF4D", priority: "without" },
  ];

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
          <SvgIcon id="icon-x-close" className={s.svgCloseIcon} width="18" height="18" />
        </button>
        <label className={s.titleCard}>Add Card</label>
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
          <label className={s.labelTitle}>Label color</label>
          <div className={s.labelColors}>
            {colorPriority.map(({ color, priority }) => (
              <button
                key={color}
                type="button"
                className={`${s.colorCircle} ${labelColor === color ? s.active : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setLabelColor(color);
                  setPriority(priority);
                }}
              />
            ))}
          </div>
        </div>

         {/* Використання CalendarPicker для вибору дати */}
        <div className={s.deadline}>
          <label className={s.labelTitle}>Deadline</label>
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

        <button className={s.addButton} onClick={handleAdd}>
          <SvgIcon id="icon-normalBtnBlack" className={s.createIcon} width="28" height="28" />
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCardPopup;



// import { useState } from 'react';
// import SvgIcon from '../SvgIcon/SvgIcon';
// import CalendarPicker from '../CalendarPicker/CalendarPicker';  
// import s from './AddCardPopup.module.css';

// const AddCardPopup = ({ onClose, onAdd }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [labelColor, setLabelColor] = useState('');
//   const [deadline, setDeadline] = useState(new Date());
//   const [showDateInput, setShowDateInput] = useState(false);

//   const handleAdd = () => {
//     const newCard = {
//       title,
//       description,
//       labelColor,
//       deadline: deadline.toISOString().split('T')[0],
//     };
//     onAdd(newCard);
//     onClose();
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
//         <p className={s.TitleCard}>Add Card</p>
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
//                   onChange={() => setLabelColor(color)}
//                   checked={labelColor === color}
//                 />
//                 <span className={`${s.colorCircle} ${s[color]} ${labelColor === color ? s.active : ''}`} />
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Використання нового компонента CalendarPicker */}
//         <div className={s.deadline}>
//           <p className={s.labelTitle}>Deadline</p>
//           <div className={s.CalendarPicker}>
//           <CalendarPicker
//             selectedDate={deadline}
//             onDateChange={setDeadline}
//             showDateInput={showDateInput}
//             toggleDateInput={toggleDateInput}
//             formatDate={formatDate}
//             calendarClassName={s.dateDisplay}
//           />
//           <SvgIcon id="icon-chevron-down" className={s.iconChevronDown} width="14" height="14" />
//         </div>
//         </div>

//         <button className={s.addButton} onClick={handleAdd}>
//           <SvgIcon
//             id="icon-normalBtnBlack"
//             className={s.createIcon}
//             width="28"
//             height="28"
//           />
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddCardPopup;