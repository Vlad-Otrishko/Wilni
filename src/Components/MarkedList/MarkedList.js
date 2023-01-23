import s from './MarkedList.module.css';
import { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import TextModules from '../TextModules';

function MarkedList({ pageName, data }) {

  const chosenId = useParams().id;
  
   if (data === 'toBeGenerated') {
    if (pageName==='reports') {
      const textFiles = require.context(
        '../../pictures/reports/documents/',
        true,
        /^\.\/.*$/
      );
      const path = textFiles.keys().map(textFiles);
      data = path.map((el) => ({
        pathToFile: el,
        reference: el.split('/').filter(Boolean)[2].split('.')[0],
      }));
    }
    if (pageName === 'chronology') {
      data = TextModules('chronology', 'articles');
    }
  }
    
    return (
      <ul
        className={
          s.markedList + ' ' + s[`markedList__${pageName}`] + ' ' + 'reset-list'
        }
      >
        {pageName === 'reports' ? (
          data.map((el) => (
            <li
              key={nanoid()}
              className={
                s.markedListItem + ' ' + s[`markedListItem__${pageName}`]
              }
            >
              <a
                className={s.documentLink + ' ' + 'reset-link'}
                href={el.pathToFile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="звіт у вигляді текстового файлу"
              >
                {el.reference}
              </a>
            </li>
          ))
        ) : (
          <>
            {pageName === 'chronology'
              ? data.map((el) => (
                  <li
                    key={nanoid()}
                    className={
                      s.markedListItem + ' ' + s[`markedListItem__${pageName}`] + ' ' +
                      `${el.id===chosenId? s['activeListItem']:''}`
                    }
                  >
                    <NavLink
                      to={`/chronology/${el.id}`}
                      className={s.chronoLink + ' ' + 'reset-link'}
                    >
                      {({ isActive }) => (
                        <h2
                          className={
                            s.chronolinkTitle +
                            ' ' +
                            `${isActive ? s.activeLink : undefined}`
                          }
                        >
                          {el.title}
                        </h2>
                      )}
                    </NavLink>
                    {chosenId === el.id && <Outlet />}
                  </li>
                ))
              : data.map((el) => (
                  <li
                    key={nanoid()}
                    className={
                      s.markedListItem + ' ' + s[`markedListItem__${pageName}`]
                    }
                  >
                    {el}
                  </li>
                ))}
          </>
        )}
      </ul>
    );
}
export default MarkedList;