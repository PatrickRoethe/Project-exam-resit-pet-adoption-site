# PetAdopt – Project Exam Resit (Noroff FED2)
![image](https://github.com/user-attachments/assets/da1271f8-3380-4d86-96de-c8ff57b493c9)


**PetAdopt** is a simple CRUD pet adoption frontend, built as a project exam resit for Noroff FED2 (Frontend Development).  
The app allows users to create, view, update, and delete pet adoption listings.  
Design and functionality is based on provided Figma wireframes and the Noroff API.

- **Live demo:** [https://incandescent-creponne-8e1230.netlify.app/](https://incandescent-creponne-8e1230.netlify.app/)
- **Figma:** [View design](https://www.figma.com/design/JkOLy7xOvAPunfR4vjGFiL/Pet-adoption-site?node-id=13-30&t=zgud4fJ7baGHIR6i-1)
- **GitHub repo:** [https://github.com/PatrickRoethe/Project-exam-resit-pet-adoption-site](https://github.com/PatrickRoethe/Project-exam-resit-pet-adoption-site)
- **Roadmap/board:** [GitHub Project](https://github.com/users/PatrickRoethe/projects/9)

## Tech stack

- React 19
- React Router 7
- React Hook Form 7
- Zustand
- TailwindCSS
- Vite

## How to run locally

```bash
git clone https://github.com/PatrickRoethe/Project-exam-resit-pet-adoption-site.git
cd project-exam-resit-pet-adoption-site
npm install
npm run dev

```

## Known issues & TODOs
- Some success/error messages need improvement
- Desktop layout could be more tailored to design spec
- Some features (like dashboard) are not fully implemented
- Code cleanup, refactoring, and error handling could be improved
- Optimization: All use global styling, no duplicate code etc
- Build out adopt function, or contact form
- Build confirmations modals, in design theme
- Adjust and work on LOGO size
- Favourites - probably just local though?
- Profile/Dashboard page, with easy navigation to pet listings AND to update info, avatar etc.
- Clean up Searchbar to 1:1 design system
- Improve filtering, and add more options?
- Popular locations?
- Fullwidth btns on mobile
- Accessibility, aria labels and more
- PROPER typography 1:1 with styleguide in a optimized way - responsive
- Testing (WCAG, accessibility, performance)
- Searchbar on mobile view goes outside of HeroBanner, Not proper handling of dead space on desktop (login, reg, create and edit)
- Pet details: entire bg needs to use the same color from tailwind.config
- Enhance contrast on herobanner by following design system -> fill black, with high opacity or secondary color? (FOR h1 & h2)
- Make inputfloating, not come behind borders on active state -> and increase size for better redability.
- Improve searchbar, and auto suggestions
- Make mobiledrawer text also change color on hover, to secondary not just underline


..and a lot more! 
