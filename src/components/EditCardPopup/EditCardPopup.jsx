
// // ПОТРІБНО ТЕСТУВАННЯ РОБОТИ КОДУ  З     BACKEND !!!

import { useState } from 'react';
import SvgIcon from '../SvgIcon/SvgIcon';
import CalendarPicker from '../CalendarPicker/CalendarPicker';
import axios from 'axios';  
import s from "./EditCardPopup.module.css";

const EditCardPopup = ({ closeModal, onEdit, task, userId, columnId, accessToken }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [labelColor, setLabelColor] = useState(task.labelColor);
  const [priority, setPriority] = useState(task.priority);
  const [deadline, setDeadline] = useState(new Date(task.deadline));
  const [showDateInput, setShowDateInput] = useState(false);

  const handleEdit = async () => {
    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      deadline: deadline.toISOString().split('T')[0],
      userId,
      columnId,
    };

    try {
      const response = await axios.patch(
        '/:taskId',  
        updatedTask,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,  
          },
        }
      );

      if (response.status === 200) {
        onEdit(response.data); 
        closeModal();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

    const colorPriority = [
    { color: "#8FA1D0", priority: "low" },
    { color: "#E09CB5", priority: "medium" },
    { color: "#BEDBB0", priority: "high" },
    { color: "#1616164D", priority: "without" },
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
    <div
    className={s.popupOverlay} onClick={(e) => {
      if (e.target === e.currentTarget) closeModal();
    }}
  >
    <div className={s.popup}>
      <div className={s.popupContent}>
        <button className={s.closeButton} onClick={closeModal}>
          <SvgIcon
            id="icon-x-close"
            className={s.svgCloseIcon}
            width="18"
            height="18"
          />
        </button>
        <p className={s.TitleCard}>Edit card</p>
        <input
          className={s.inputTitle}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={s.textareaDeskr}
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
        <div className={s.deadlineWrapper}>
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
  </div>
    
  );
};

export default EditCardPopup;

