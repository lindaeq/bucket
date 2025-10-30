# bouquet list 🌸

[![Athena Award Badge](https://img.shields.io/endpoint?url=https%3A%2F%2Faward.athena.hackclub.com%2Fapi%2Fbadge)](https://award.athena.hackclub.com?utm_source=readme)

hey! this is **bouquet list**, a little interactive web app i made to track all the things i want to do in my senior year. the idea came from me wanting a way to jot down my goals, add notes or reflections, and make it feel cute and fun to look at. instead of a boring checklist, i wanted something that felt like decorating a moodboard with little flowers, pins, and ribbons while keeping my goals front and center. 🌷✨

## what it does

- lets you add goals and write notes for each one  
- draggable and resizable goal cards  
- falling cherry blossom petals that you can drag around  
- cute moodboard elements (pins, ribbons, emojis) you can add and move anywhere  
- makes goal-tracking feel more playful than your average to-do list  

## why i made it

senior year is full of things i want to try and remember, and i didn’t want just a normal checklist. i wanted something that felt personal and creative, something i could interact with and decorate while keeping my goals in mind. it’s kind of like a digital scrapbook meets bucket list.  

## how i made it

- **react** for the frontend and managing all the draggable/resizable stuff  
- **css & animations** to make the petals fall and style everything  
- **html & js** for layout and interactive elements  
- google fonts: cedarville cursive for the title, patrick hand for everything else  
- handled dragging/resizing with mouse events and state management in react  
- decorations and petals all spawn dynamically, and you can move them wherever you want  

## what i struggled with / learned

making the petals spawn smoothly without piling up over time was tricky at first — i kept getting faster and faster spawning because i didn’t handle intervals properly. also, getting the goal notes to stay open and editable no matter what i clicked around was a bit of a pain. i learned a lot about **react state**, **animation loops**, and **dragging/resizing elements**. honestly, it was a lot of trial and error, but now it feels really satisfying to play with.  


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
