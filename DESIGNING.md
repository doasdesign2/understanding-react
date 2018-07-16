# Limit Manager: Mini React's Document Design Process

## Summary

* [Chosen stack](#chosen-stack)
* [Configuring Webpack](#configuring-webpack)
* [Flow of planning and development](#flow-of-planning-and-development)
  * [Implementing the Mini React](#implementing-the-mini-react)
  * [Styling the UI](#styling-the-ui)
* [Next steps](#next-steps)
* [Some references](#some-references)

### Chosen stack

- **Webpack as module bundler**: it is a flexible and powerful tool that, besides it is a little hard to configure, we can setup each detail. It fits to large projects which needs to scale
- **TypeScript as typing language that compiles to JavaScript**: it is a superset and it is JavaScript. It is also easy to configure with Webpack
- **Jest for unit and integration tests**: it is a complete tests framework also easy to configure and to integrate with third party libraries. I also used an excellent VSCode paid extension called **Wallaby**

### Configuring Webpack

I already had a [boilerplate](https://github.com/rafaelmaruta/webpack-react-redux-sass-css-modules-jest-storybook-flow) in my git repo. It isn't recommended to configure Webpack from zero for each project, so I keep some boilerplates in my repo to fit some needs. I just needed to do some changes like:

- Update to Webpack 4 and reconfigure some plugins like migrate the Extract Text Plugin to **Mini CSS Extract Plugin**
- Uninstall some unnecessary dependencies
- Install TypeScript
- Configure everything to work with Jest and Wallaby

## Flow of planning and development

### Implementing the Mini React

I already had read some articles about the React's core, but I felt I needed to research for more references mainly about the structure. So I found a good article called [Gooact](https://medium.com/@sweetpalma/gooact-react-in-160-lines-of-javascript-44e0742ad60f) which explains how to implement a React like with just 160 lines of JavaScript. I started implementing, and the rendering part I thought it was good, but the reconciliation wasn't so good because it re-renders the whole DOM tree for each update, so I started doing it my way.

I finished and I got the single node update. At this point I already accomplished what the exercise demanded, but I wanted to go further. I wanted to get the DOM tree update (patching) reconciliation, so I found another article recommended by Dan Abramov called [Didact](https://github.com/hexacta/didact). Fortunatelly the structure was similar to the one I implemented, just changing some names like patching to reconciliation. It was really more complete than the other, speaking about children instances, public instances etc. so I followed some principles to achieve the DOM update, like the comparation of the virtual DOM element type with the instantiated DOM element type and the child instances length with the next child elements length. I even created another `App.js` files to test the DOM changes.

### Styling the UI

At the beginning I thought I would style the UI without touching the data structure provided. As it has only HTML elements, I thought it was perfect to use Styled Components, but I didn't implemented the components rendering. Maybe I would using some CSS features like pseudo elements but I thought it wouldn't be semantic and I found it was one more chance to challenge my implementation, and it was, because I needed to create more DOM hierarchy and the Text Element rendering for the amount placeholders.

So I chose to use **ITCSS** with **BEM**, because they are focused in scoping and specifying the styles for large projects and for components. Normaly with React I also use React CSS Modules.

The greatest challenge was to style the slider, so I started to research and found some articles which styles through reseting the default browser's appearance, but some things like styling the slider's progress wasn't fit, so I found a [codepen](https://codepen.io/nlfonseca/pen/MwbovQ) where it uses the slider thumb's shadow to fill the progress lol It is a workaround ***gambiarra*** but it worked!

### Next steps:

- Implement JSX
- Implement lifecycle hooks
- Improve children nodes reconciliation
- Improve attribute changes checking
- Implement key for lists
- Implement components rendering
- Implement possibility to use Styled Component
- Support of the slider for Edge
- Implement the React Fiber algorithm reconciliation
- Build the slider from zero without workaround

### Some references:

- [Gooact: React in 160 lines of JavaScript](https://medium.com/@sweetpalma/gooact-react-in-160-lines-of-javascript-44e0742ad60f)
- [Didact: a DIY guide to build your own React](https://github.com/hexacta/didact)
- [Organizando seu CSS com ITCSS](https://willianjusten.com.br/organizando-seu-css-com-itcss/)
- [Simple Slider (CSS only)](https://codepen.io/nlfonseca/pen/MwbovQ)