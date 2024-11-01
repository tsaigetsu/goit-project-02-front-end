import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from 'prop-types';
import s from './EditBoardForm.module.css';

const icons = [
    "icon-Project",
    "icon-star-04",
    "icon-loading-03",
    "icon-puzzle-piece-02",
    "icon-container",
    "icon-lightning-02",
    "icon-colors",
    "icon-hexagon-01"
];
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

const EditBoardForm = ({ isOpen, onClose, initialTitle, initialIcon, initialBackground }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: initialTitle || "",
            icon: initialIcon || icons[0],
            background: initialBackground || "none"
        },
    });

    const selectedIcon = watch("icon");
    const selectedBackground = watch("background");

    const onSubmit = (data) => {
        console.log("Updated Data: ", data);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={s.modalOverlay} onClick={onClose}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={s.modalClose} onClick={onClose}>×</button>
                <h2>Edit board</h2>
                <form onSubmit={handleSubmit(onSubmit)}>

                    {/* Поле для редактирования названия */}
                    <div className={s.inputGroup}>
                        <input
                            type="text"
                            placeholder="Title"
                            {...register("title")}
                        />
                        {errors.title && <p className={s.error}>{errors.title.message}</p>}
                    </div>

                    {/* Список иконок как радиокнопки */}
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
                                <svg width="24" height="24">
                                    <use href={`#${icon}`} />
                                </svg>
                            </label>
                        ))}
                    </div>

                    {/* Список фонов как радиокнопки */}
                    <label>Background</label>
                    <div className={s.backgrounds}>
                        <label className={s.backgroundButton}>
                            <input
                                type="radio"
                                value="none"
                                {...register("background")}
                                checked={selectedBackground === "none"}
                                onChange={() => setValue("background", "none")}
                            />
                            <svg width="24" height="24">
                                <use href="#icon-no-background" />
                            </svg>
                        </label>
                        {backgrounds.map((bg, index) => (
                            <label key={index} className={s.backgroundButton} style={{ backgroundImage: `url(${bg})` }}>
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

                    {/* Кнопка "Edit" */}
                    <button type="submit" className={s.createBtn}>
                        <svg width="16" height="16">
                            <use href="#icon-normalPlus" />
                        </svg>
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
};

export default EditBoardForm;
