import axios from 'axios';
import { useState } from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import SvgIcon from "../SvgIcon/SvgIcon";
import s from './EditBoardForm.module.css';

const icons = [
    { id: "ic1", iconName: "icon-Project" },
    { id: "ic2", iconName: "icon-star-04" },
    { id: "ic3", iconName: "icon-loading-03" },
    { id: "ic4", iconName: "icon-puzzle-piece-02" },
    { id: "ic5", iconName: "icon-container" },
    { id: "ic6", iconName: "icon-lightning-02" },
    { id: "ic7", iconName: "icon-colors" },
    { id: "ic8", iconName: "icon-hexagon-01" }
];
const backgrounds = [
    { id: "bg1", url: "/src/assets/images/jpgs/desktop/flowers2x.jpg" },
    { id: "bg2", url: "/src/assets/images/jpgs/desktop/skyMountrain2x.jpg" },
    { id: "bg3", url: "/src/assets/images/jpgs/desktop/pinkTree2x.jpg" },
    { id: "bg4", url: "/src/assets/images/jpgs/desktop/moon2x.jpg" },
    { id: "bg5", url: "/src/assets/images/jpgs/desktop/jungleLeafes2x.jpg" },
    { id: "bg6", url: "/src/assets/images/jpgs/desktop/sky2x.jpg" },
    { id: "bg7", url: "/src/assets/images/jpgs/desktop/seaMountain2x.jpg" },
    { id: "bg8", url: "/src/assets/images/jpgs/desktop/ballons2x.jpg" },
    { id: "bg9", url: "/src/assets/images/jpgs/desktop/orangeMoon2x.jpg" },
    { id: "bg10", url: "/src/assets/images/jpgs/desktop/ship2x.jpg" },
    { id: "bg11", url: "/src/assets/images/jpgs/desktop/flyingBallons2x.jpg" },
    { id: "bg12", url: "/src/assets/images/jpgs/desktop/dessert2x.jpg" },
    { id: "bg13", url: "/src/assets/images/jpgs/desktop/beach2.jpg" },
    { id: "bg14", url: "/src/assets/images/jpgs/desktop/lotBallons2x.jpg" },
    { id: "bg15", url: "/src/assets/images/jpgs/desktop/carNightSky2x.jpg" }
];

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .min(2, "Title must be at least 2 characters")
        .max(32, "Title cannot exceed 32 characters"),
});

const EditBoardForm = ({ isOpen, onClose, initialTitle, initialIcon, initialBackground, onSave, boardId }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [hasText, setHasText] = useState((!!initialTitle));

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: initialTitle || "",
            icon: initialIcon || icons[0].id,
            background: initialBackground || backgrounds[0].id
        },
    });

    const onInputChange = (e) => {
        setHasText(e.target.value.length > 0);
    };

    const selectedIcon = watch("icon");
    const selectedBackground = watch("background");

    const handleFormClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsExiting(false);
            reset();
            onClose();
        }, 300);
    };

    const onSubmit = async (data) => {
        const payload = {
            title: data.title,
            iconId: data.icon,
            backgroundId: data.background === "none" ? null : data.background
        };
        
        try {
            const response = await axios.patch(`/boards/${boardId}`, payload);
        
            console.log("Board updated:", response.data);
            onSave(response.data);
            handleFormClose();
        } catch (error) {
            console.error("Error updating board:", error);
        }
    };
    
    // const onSubmit = (data) => {
    //     console.log("Updated Data: ", data);
    //     onSave(data);
    //     handleFormClose();
    // };

    if (!isOpen && !isExiting) return null;

    return (
        <div className={`${s.modalOverlay} ${isExiting ? s.fadeOut : ""}`} onClick={handleFormClose}>
            <div className={`${s.modalContainer} ${isExiting ? s.fadeOut : ""}`} onClick={(e) => e.stopPropagation()}>
                <button className={s.modalCloseBtn} onClick={handleFormClose}>
                    <SvgIcon 
                        id="icon-x-close"
                        className={s.closeBtnIcon}
                        width="18"
                        height="18"
                    />
                </button>
                <h2>Edit board</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Поле для назви дошки */}
                    <div className={s.inputGroup}>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title")}
                            className={hasText ? s.focused : ""}
                            onChange={(e) => {
                                onInputChange(e);
                                setValue('title', e.target.value);
                            }}
                            onFocus={() => setHasText(true)}
                            onBlur={(e) => setHasText(e.target.value.length > 0)}
                        />
                        {errors.title && <p className={s.error}>{errors.title.message}</p>}
                    </div>

                    {/* Список іконок як радіо-кнопки */}
                    <label>Icons</label>
                    <div className={s.icons}>
                        {icons.map((icon) => (
                            <label key={icon.id} className={s.iconButton}>
                                <input
                                    type="radio"
                                    value={icon.id}
                                    {...register("icon")}
                                    checked={selectedIcon === icon.id}
                                    onChange={() => setValue("icon", icon.id)}
                                />
                                <SvgIcon
                                    width="18"
                                    height="18"
                                    id={icon.iconName}
                                    className={s.radioIcon}
                                />
                            </label>
                        ))}
                    </div>

                    {/* Список фонів як радіо-кнопки */}
                    <label>Background</label>
                    <div className={s.backgrounds}>
                        <label className={`${s.backgroundIcon} ${selectedBackground === "none" ? s.selected : ""}`}>
                            <input
                                type="radio"
                                value="none"
                                {...register("background")}
                                checked={selectedBackground === "none"}
                                onChange={() => setValue("background", "none")}
                            />
                            <SvgIcon
                                width="16"
                                height="16"
                                id="icon-image-05"
                                className={s.radioIcon}
                            />
                        </label>
                        {backgrounds.map((bg) => (
                            <label
                                key={bg.id}
                                className={`${s.backgroundButton} ${selectedBackground === bg.id ? s.selected : ""}`}
                                style={{ backgroundImage: bg.url ? `url(${bg.url})` : "none" }}>
                                <input
                                    type="radio"
                                    value={bg.id}
                                    {...register("background")}
                                    checked={selectedBackground === bg.id}
                                    onChange={() => setValue("background", bg.id)}
                                />
                            </label>
                        ))}
                    </div>

                    {/* Кнопка "Create" */}
                    <button type="submit" className={s.createBtn}>
                        <SvgIcon
                            id="icon-normalBtnBlack"
                            width="16"
                            height="16"
                            className={s.createBtnIcon} />
                        Edit
                    </button>
                </form>
            </div>
        </div>
    );
};

EditBoardForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    initialTitle: PropTypes.string,
    initialIcon: PropTypes.string,
    initialBackground: PropTypes.string,
    onSave: PropTypes.func.isRequired,
    boardId: PropTypes.string.isRequired,
};

export default EditBoardForm;