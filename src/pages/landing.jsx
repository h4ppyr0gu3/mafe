import svg from '../assets/hero.svg';
import construction from '../assets/construction.svg';
import { A } from "@solidjs/router";

export default function Landing() {
  return (
    <>
      <div class="bg-gray-800">
        <nav id="header" class="fixed w-full z-30 top-0 text-white bg-gray-600">
          <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
            <div class="pl-4 flex items-center">
              <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f47b.svg"/>
              <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f9e0.svg"/>
              <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                Ghost Brain
              </a>
            </div>
            <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-gray-900 lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
              <ul class="list-reset lg:flex justify-end flex-1 items-center">
                <li class="mr-3">
                  <a class="inline-block text-white no-underline hover:text-gray-400 hover:text-underline py-2 px-4" href="#">Blog</a>
                </li>
                <li class="mr-3">
                  <A class="inline-block text-white no-underline hover:text-gray-400 hover:text-underline py-2 px-4" href="/sign_in">Log In</A>
                </li>
              </ul>
              <A href="/sign_up"
                class="mx-auto lg:mx-0 hover:underline bg-gray-800 text-white font-bold rounded-full mt-4 lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
              >
                Sign Up
              </A>
            </div>
          </div>
          <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
        <div class="pt-24 bg-gray-300">
          <div class="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
              <p class="uppercase tracking-loose w-full">Learning Through Projects</p>
              <h1 class="my-4 text-5xl font-bold leading-tight">
                Take your Music offline
              </h1>
              <p class="leading-normal text-2xl mb-8">
                your music your choice, do with it what you please
              </p>
              <a href="/sign_up" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                Sign Up
              </a>
            </div>
            <div class="w-full md:w-3/5 py-6 text-center">
              <img class="w-full md:w-4/5 z-50" src={svg} />
            </div>
          </div>
        </div>
        <section class="bg-gray-400 border-b py-8">
          <div class="container max-w-5xl mx-auto m-8">
            <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Mapp by Ghost Brain
            </h2>
            <div class="w-full mb-4">
              <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
            </div>
            <div class="flex flex-wrap">
              <div class="w-5/6 sm:w-1/2 p-6">
                <h3 class="text-3xl text-gray-800 font-bold leading-none mb-3">
                  Providing little value but much knowledge
                </h3>
                <p class="text-gray-600 mb-8">
                  This project is a testing ground for crazy engineering whilst being useful to only the author, this is not for commercial use.
                  <br />
                  <br />
                  Images from:  
                  <a class="text-pink-500 underline" href="https://undraw.co/">undraw.co</a>
                </p>
              </div>
              <div class="w-full sm:w-1/2 p-6">
                <img class="w-full sm h-64 mx-auto" src={construction}/>
              </div>
            </div>
          </div>
        </section>
        <footer class="bg-gray-600">
          <div class="container mx-auto px-8">
            <div class="w-full flex flex-col md:flex-row py-6">
              <div class="flex-1 mb-6 text-black">
                <div class="flex flex-row">
                  <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f47b.svg"/>
                  <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f9e0.svg"/>
                  <a class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
                    Ghost Brain
                  </a>
                </div>
              </div>
              <div class="flex-1">
                <p class="uppercase text-gray-500 md:mb-6">Links</p>
                <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Support</a>
                  </li>
                </ul>
</div>
<div class="flex-1">
<p class="uppercase text-gray-500 md:mb-6">Legal</p>
<ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Terms</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy</a>
                  </li>
                </ul>
              </div>
              <div class="flex-1">
                <p class="uppercase text-gray-500 md:mb-6">Social</p>
                <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Linkedin</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Twitter</a>
                  </li>
                </ul>
              </div>
              <div class="flex-1">
                <p class="uppercase text-gray-500 md:mb-6">Company</p>
                <ul class="list-reset mb-6">
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a>
                  </li>
                  <li class="mt-2 inline-block mr-2 md:block md:mr-0">
                    <a href="#" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <a href="https://www.freepik.com/free-photos-vectors/background" class="text-gray-500">Background vector created by freepik - www.freepik.com</a>
        </footer>
      </div>
      </>
  );
}
