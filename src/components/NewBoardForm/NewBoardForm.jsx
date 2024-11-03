import { useState } from 'react';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import SvgIcon from "../SvgIcon/SvgIcon";
import s from './NewBoardForm.module.css';

const icons = [
    "icon-Project",
    "icon-star-04",
    "icon-loading-03",
    "icon-puzzle-piece-02",
    "icon-container",
    "icon-lightning-02",
    "icon-colors",
    "icon-hexagon-01"];
const backgrounds = [
    "/src/assets/images/jpgs/desktop/flowers2x.jpg",
    "/src/assets/images/jpgs/desktop/skyMountrain2x.jpg",
    "/src/assets/images/jpgs/desktop/pinkTree2x.jpg",
    "/src/assets/images/jpgs/desktop/moon2x.jpg",
    "/src/assets/images/jpgs/desktop/jungleLeafes2x.jpg",
    "/src/assets/images/jpgs/desktop/sky2x.jpg",
    "/src/assets/images/jpgs/desktop/seaMountain2x.jpg",
    "/src/assets/images/jpgs/desktop/ballons2x.jpg",
    "/src/assets/images/jpgs/desktop/orangeMoon2x.jpg",
    "/src/assets/images/jpgs/desktop/ship2x.jpg",
    "/src/assets/images/jpgs/desktop/flyingBallons2x.jpg",
    "/src/assets/images/jpgs/desktop/dessert2x.jpg",
    "/src/assets/images/jpgs/desktop/beach2.jpg",
    "/src/assets/images/jpgs/desktop/lotBallons2x.jpg",
    "/src/assets/images/jpgs/desktop/carNightSky2x.jpg"
];

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Title is required")
        .min(2, "Title must be at least 2 characters")
        .max(32, "Title cannot exceed 32 characters"),
});

const NewBoardForm = ({ isOpen, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            icon: icons[0],
            background: "none"
        },
    });

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

    const onSubmit = (data) => {
        console.log("Valid Data: ", data);
        handleFormClose();
    };

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
                <h2>New board</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Поле для назви дошки */}
                    <div className={s.inputGroup}>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title")}
                        />
                        {errors.title && <p className={s.error}>{errors.title.message}</p>}
                    </div>

                    {/* Список іконок як радіо-кнопки */}
                    <label>Icons</label>
                    <div className={s.icons}>
                        {icons.map((icon, index) => (
                            <label key={index} className={s.iconButton}>
                                <input
                                    type="radio"
                                    value={icon}
                                    {...register("icon")}
                                    checked={selectedIcon === icon}
                                    onChange={() => setValue("icon", icon)}
                                />
                                <SvgIcon
                                    width="18"
                                    height="18"
                                    id={icon}
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
                        {backgrounds.map((bg, index) => (
                            <label key={index} className={`${s.backgroundButton} ${selectedBackground === bg ? s.selected : ""}`} style={{ backgroundImage: `url(${bg})` }}>
                                <input
                                    type="radio"
                                    value={bg}
                                    {...register("background")}
                                    checked={selectedBackground === bg}
                                    onChange={() => setValue("background", bg)}
                                />
                            </label>
                        ))}
                    </div>

                    {/* Кнопка "Create" */}
                    <button type="submit" className={s.createBtn}>
                        <SvgIcon id="icon-normalPlus" width="16" height="16" />
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

NewBoardForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NewBoardForm;