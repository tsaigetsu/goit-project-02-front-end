import css from "./DefaultText.module.css";

const DefaultText = ({ onOpen }) => {
  return (
    <>
      <div className={css.wrapperText}>
        <p className={css.text}>
          Before starting your project, it is essential
          <span>
            <button className={css.spanBtn} onClick={onOpen}>
              to create a board
            </button>
          </span>
          to visualize and track all the necessary tasks and milestones. This
          board serves as a powerful tool to organize the workflow and ensure
          effective collaboration among team members.
        </p>
      </div>
    </>
  );
  //
};

export default DefaultText;
