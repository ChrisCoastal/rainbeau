<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ChrisCoastal/rainbeau">
    <img src="https://github.com/ChrisCoastal/rainbeau/repo-assets/readme-images/rainbeau-repo-logo-1200x480.jpg" alt="rainbeau logo over a colorful background">
  </a>
    <p align="center">
      A color theming assistant that takes inspiration from the read world.
    <br />
    </p>

  <h3 align="center">
    <a href="https://rainbeau.netlify.app/" target="blank">
      Check out Rainbeau
    </a>
  </h3>

  <p align="center">
    <br />
    Thanks for giving this project a star! ⭐️
    <br />
    <a href="https://github.com/ChrisCoastal/rainbeau/issues">Report Bug</a>
    ·
    <a href="https://github.com/ChrisCoastal/rainbeau/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#app">Rainbeau</a>
      <ul>
        <li><a href="#create">Create</a></li>
      </ul>
    </li>
    <li><a href="#project">Project</a>
      <ul>
        <li><a href="#inspiration">Inspiration</a></li>
        <li><a href="#inspiration">Features</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Rainbeau is an SPA that allows users to browse through and pull colors directly from images to inspire color themes in their own work. Users cycle through randomized photos to create unique color palettes that are read from ‘color markers’ placed on the image. Markers can be dragged, added, renamed, and deleted to update the palette swatches. User created color themes are formatted for CSS stylesheets and popular UI libraries for easy export.

<!-- [![Product Name Screen Shot][product-screenshot-a]](https://rainbeau.netlify.app/) -->

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Typescript](https://www.typescriptlang.org/)
- [React 18](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [React Spring](https://www.react-spring.dev/)
- [MUI](https://mui.com/)
- [Emotion](https://emotion.sh/docs/introduction)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- APP -->

## Rainbeau App

<p align="center">
  <img src='https://github.com/ChrisCoastal/rainbeau/repo-assets/readme-images/rainbeau-appview.jpg'>
</p>
<p align='center' style='font-size: 10pt'>Image by <a href='https://stock.adobe.com/contributor/202246000/niquirk?load_type=author' target="_blank">Niquirk</a></p>

### Create

You can check out the app and create your own color themes at <a href="https://rainbeau.netlify.app/" target="_blank">Rainbeau</a>.

## Project

### Inspiration

I decided to build Rainbeau as an exercise to gain a more thorough understanding of the power and versatility of <canvas> and the Canvas API. The idea of a palette theming app the gave some constraints to the endless possibilities of color choices, while at the same time having a strong/inspiring visual UI.

My learning from creating Rainbeau became a jump off point for working with WebGL and Three.js.

### Features

Some highlights from what I wanted to accomplish and include in the project:

- work directly with the Canvas API and read / write a 2D context to it
- write a state context that will update colors immediate as users interact with the canvas
- writing logic to translate jpeg image data from the canvas matrix
- keeping the app performant through throttling and handling animation without rerenders
- converting RGB and HEX colors
- use the Fetch API to make requests to Unsplash
- using Google Cloud Functions and Secrets Manager to store API keys
- listening for window resize events to update the canvas context and translate color marker positions

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- [![Product Name Screen Shot][product-screenshot-b]](https://rainbeau.netlify.app/) -->

<!-- ROADMAP -->

## Roadmap

<p align="center">
  <img src='https://github.com/ChrisCoastal/rainbeau/repo-assets/readme-images/rainbeau-canvasview.jpg' >
</p>
<p align='center' style='font-size: 10pt'>Image by <a href='https://unsplash.com/@dimadallacqua' target="_blank">Dima DallAcqua</a></p>

There is still more work and ideas I would love to add (or go back and change 😅) to Rainbeau, but I'm happy with where the project is at in terms of what I set out to make - primarily an exercise to better understand the workings of the Canvas API. I do hope to add a few more of the features planned. The roadmap for future features includes adding auth, saving and sharing palettes between users, and the ability to upload images for local use. If you would like to help implement any, please see the contribution guidelines in the next section.

- [x] map out basic UI
- [x] fetch images from API
- [x] render image to canvas
- [x] read/write canvas image data to state
- [x] HEX to RGB to HSL translations
- [x] add Google Cloud Secret storage
- [x] add draggable color markers
- [x] map RGB colors to color names
- [x] add customizable color name fields
- [x] add formatted export of colors
- [x] improve responsive layout
- [x] change marker animation to React Spring
- [x] update image data / marker positions on resize
- [x] add history to state and undo/redo
- [ ] add tests
- [ ] persist state in local storage
- [ ] refactor state management to Zustand
- [ ] additional color formats
- [ ] Firebase auth / login
- [ ] save user palettes to backend
- [ ] user image uploads
- [ ] sharing color palettes
- [ ] ... 🏁

See the [open issues](https://github.com/ChrisCoastal/rainbeau/issues) for a list of open issues.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you would like to make or suggest are welcomed!

If you have a suggestion that would make Rainbeau better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Note that you will not be able to run the project locally without setting up your own dev backend/cloud functions with Firebase and obtaining a key for Unsplash's API. If you would like assistance with this, please note that when opening an issue.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

I'm currently looking for new projects to work on, or an inspiring team to join for longer term. If you think we would be a good fit (or if you just want to say 'hey'), I'm happy to hear from you!

ChrisCoastal: hello@chriscoastal.com 🌊

Project Link: [https://github.com/ChrisCoastal/rainbeau](https://github.com/ChrisCoastal/rainbeau)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- Thank you to everyone responsible for writing and maintaining the libraries, packages, and other code that are a part of this project. 🙏
- Big thank you to the artist's whose work appears in Rainbeau. Make sure to check out their work via the lin kin the app.
- Extra big thank you to <a href='https://stock.adobe.com/contributor/202246000/niquirk?load_type=author' target="_blank">Niquirk</a>, whose image is the unofficial 'rainbeau'. Also thanks to <a href='https://unsplash.com/@dimadallacqua' target="_blank">Dima DallAcqua</a>, <a href='https://unsplash.com/@jasrolyn' target="_blank">Jas Rolyn</a>, and <a href='https://unsplash.com/@godling' target="_blank">Zhaoli Jin</a> whose work appears in Rainbeau demo stills, video, and this README. 🌈
- Thanks, as always, to the authors of the innumerable articles, Stack Overflow answers, and other resources that allow learning to keeping going everyday. ⛑
- And to the person I catch rainbows with - thank you for your love of color and imagination.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[contributors-shield]: https://img.shields.io/github/contributors/ChrisCoastal/rainbeau.svg?style=for-the-badge
[contributors-url]: https://github.com/ChrisCoastal/rainbeau/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ChrisCoastal/rainbeau.svg?style=for-the-badge
[forks-url]: https://github.com/ChrisCoastal/rainbeau/network/members
[stars-shield]: https://img.shields.io/github/stars/ChrisCoastal/rainbeau.svg?style=for-the-badge
[stars-url]: https://github.com/ChrisCoastal/rainbeau/stargazers
[issues-shield]: https://img.shields.io/github/issues/ChrisCoastal/rainbeau.svg?style=for-the-badge
[issues-url]: https://github.com/ChrisCoastal/rainbeau/issues
[license-shield]: https://img.shields.io/github/license/ChrisCoastal/rainbeau.svg?style=for-the-badge
[license-url]: https://github.com/ChrisCoastal/rainbeau/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/christopher-allen-3194371b5
[product-screenshot-a]: https://github.com/ChrisCoastal/rainbeau/repo-assets/readme-images/rainbeau-appview.jpg
[product-screenshot-b]: https://github.com/ChrisCoastal/rainbeau/repo-assets/readme-images/rainbeau-canvasview.jpg
