<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
![Test][workflow-test]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">KoaJS API Archetype</h3>

  <p align="center">
    Personal API Koa/Typescript boilerplate!
    <br />
    <a href="https://github.com/nbalduzzi/koa-archetype"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/nbalduzzi/koa-archetype/issues">Report Bug</a>
    ·
    <a href="https://github.com/nbalduzzi/koa-archetype/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

This project was created only for personal purpose and use.

This archetype can be used in a real project with the necessary updates.
In this project you can find a `docker-compose.yml` file with a `mongodb` instance for having a persistance database and repository and integration layer.

> If you want it, you can use the DB you like, but you will need to change the orm or library to handle the DB you choosed. In this project i choose `mongoose` for handling the mongodb models.

### Built With

This section should list any major frameworks that you built your project using. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
* [Koa](https://koajs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Typescript IoC](https://github.com/thiagobustamante/typescript-ioc)
* [Docker](https://www.docker.com/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* nvm
  ```bash
  # Install
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash

  # add config on ~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc
  export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  ```

* npm
  ```bash
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nbalduzzi/koa-archetype.git
   ```

2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->
## Usage

### Build

```bash
npm run build
```

### Development


```bash
# Start dev server
npm run dev

# Start dev server (transpiled)
npm run dev:js
```

### Production

```bash
# Start production server
npm start
```

### Test

```bash
# Run unit and integration tests
npm run test

# Run unit and integration tests with coverage
npm run coverage

# Generate the coverage report
npm run coverage:report
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/nbalduzzi/koa-archetype/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Merge Request

<!-- LICENSE -->
## License

Distributed under the `MIT` License.

<!-- CONTACT -->
## Contact

Project Link: [https://github.com/nbalduzzi/koa-archetype](https://github.com/nbalduzzi/koa-archetype)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/nbalduzzi/koa-archetype.svg?style=for-the-badge
[contributors-url]: https://github.com/nbalduzzi/koa-archetype/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nbalduzzi/koa-archetype.svg?style=for-the-badge
[forks-url]: https://github.com/nbalduzzi/koa-archetype/network/members
[stars-shield]: https://img.shields.io/github/stars/nbalduzzi/koa-archetype.svg?style=for-the-badge
[stars-url]: https://github.com/nbalduzzi/koa-archetype/stargazers
[issues-shield]: https://img.shields.io/github/issues/nbalduzzi/koa-archetype.svg?style=for-the-badge
[issues-url]: https://github.com/nbalduzzi/koa-archetype/issues
[license-shield]: https://img.shields.io/github/license/nbalduzzi/koa-archetype.svg?style=for-the-badge
[license-url]: https://github.com/nbalduzzi/koa-archetype/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/nicolasbalduzzi/
[product-screenshot]: images/screenshot.png
[workflow-test]: https://github.com/nbalduzzi/koa-archetype/workflows/Test/badge.svg
