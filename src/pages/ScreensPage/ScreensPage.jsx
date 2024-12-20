import React, { useState, useMemo, useCallback } from 'react';
import css from './ScreensPage.module.css';
import { selectBoards, selectedBoard } from '../../redux/boards/selectors.js';
import HeaderDashboard from '../../components/HeaderDashboard/HeaderDashboard.jsx';
import MainDashboard from '../../components/MainDashboard/MainDashboard.jsx';
import DefaultText from '../../components/DefaultText/DefaultText.jsx';
import NewBoardForm from '../../components/NewBoardForm/NewBoardForm.jsx';
import { useSelector, useDispatch } from 'react-redux';
import backgrounds from '../../data/backgrounds.json';
import {
  addBoardsThunk,
  getBoardByIdThunk,
} from '../../redux/boards/operations.js';

// Мемоизируем компоненты для предотвращения лишних ререндеров
const MemoizedHeaderDashboard = React.memo(HeaderDashboard);
const MemoizedMainDashboard = React.memo(MainDashboard);
const MemoizedDefaultText = React.memo(DefaultText);

const ScreensPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = useSelector(selectBoards);
  const board = useSelector(selectedBoard);

  const dispatch = useDispatch();

  // Мемоизация для backgroundUrl
  const backgroundStyles = useMemo(() => {
    if (!board?.backgroundId || board.backgroundId === 'nobg') {
      return {
        '--background-mobile-normal': 'none',
        '--background-mobile-large': 'none',
        '--background-tablet-normal': 'none',
        '--background-tablet-large': 'none',
        '--background-desktop-normal': 'none',
        '--background-desktop-large': 'none',
      };
    }

    const bg = backgrounds;
    const backgroundId = board.backgroundId;

    return {
      '--background-mobile-normal': `url(${
        bg.mobile[backgroundId]?.normal || ''
      })`,
      '--background-mobile-large': `url(${
        bg.mobile[backgroundId]?.large || ''
      })`,
      '--background-tablet-normal': `url(${
        bg.tablet[backgroundId]?.normal || ''
      })`,
      '--background-tablet-large': `url(${
        bg.tablet[backgroundId]?.large || ''
      })`,
      '--background-desktop-normal': `url(${
        bg.desktop[backgroundId]?.normal || ''
      })`,
      '--background-desktop-large': `url(${
        bg.desktop[backgroundId]?.large || ''
      })`,
    };
  }, [board]);

  // Мемоизация функций с использованием useCallback
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSaveBoard = useCallback(
    async newBoard => {
      try {
        // Создаем новый борд
        const resultAction = await dispatch(addBoardsThunk(newBoard));

        if (addBoardsThunk.fulfilled.match(resultAction)) {
          const createdBoardId = resultAction.payload._id; // Получаем ID нового борда

          // Загружаем данные борда по ID
          await dispatch(getBoardByIdThunk(createdBoardId));
        } else {
          console.error('Failed to create board:', resultAction.payload);
        }
      } catch (error) {
        console.error('Error while creating board:', error);
      } finally {
        setIsOpen(false); // Закрываем модальное окно
      }
    },
    [dispatch, setIsOpen]
  );

  return (
    <>
      <section className={css.wrapperScreenPage} style={backgroundStyles}>
        {boards.length === 0 || board === null || board === undefined ? (
          <MemoizedDefaultText onOpen={onOpen} />
        ) : (
          <>
            <MemoizedHeaderDashboard
              boardId={board._id}
              title={board.title}
              className={css.headerDashboard}
            />
            <MemoizedMainDashboard
              className={css.mainDashboard}
              boardId={board._id}
            />
          </>
        )}
      </section>
      {isOpen && (
        <NewBoardForm
          isOpen={isOpen}
          onClose={onClose}
          onSave={handleSaveBoard}
        />
      )}
    </>
  );
};

export default React.memo(ScreensPage);
