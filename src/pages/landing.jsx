import svg from '../assets/hero.svg';
import construction from '../assets/construction.svg';
import { A } from "@solidjs/router";
import Footer from "../components/footer";
import bg from '../assets/landing.png';
import bg2 from '../assets/landing2.jpg';
import { onMount } from 'solid-js';

export default function Landing() {
  let bgHere, bgImg;

  onMount(() => {
    bgHere.style.backgroundImage = `url(${bg})`;
    bgImg.style.backgroundImage = `url(${bg2})`;
  });

  return (
    <>
      <div class="bg-neutral-900">
        <nav id="header" class="fixed w-full z-30 top-0 text-white bg-neutral-900">
          <div class="w-full mx-auto flex flex-wrap items-center justify-between">
            <div class="pl-4 flex items-center">
              <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f47b.svg"/>
              <img class="w-10" src="https://twemoji.maxcdn.com/v/13.1.0/svg/1f9e0.svg"/>
              <A class="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
                Ghost Brain
              </A>
            </div>
            <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-neutral-900 lg:bg-transparent text-black p-4 lg:p-0 z-20" id="nav-content">
              <ul class="list-reset lg:flex justify-end flex-1 items-center">
                <li class="mr-3">
                  <A class="inline-block text-white no-underline hover:text-gray-400 hover:text-underline py-2 px-4" href="/">Blog</A>
                </li>
                <li class="mr-3">
                  <A class="inline-block text-white no-underline hover:text-gray-400 hover:text-underline py-2 px-4" href="/sign_in">Log In</A>
                </li>
              </ul>
              <A href="/sign_up"
                class="mx-auto lg:mx-0 hover:underline bg-neutral-700 text-neutral-100 font-bold rounded-full lg:mt-0 py-4 px-8 shadow opacity-75 focus:outline-none hover:text-white hover:text-white m-2"
              >
                Sign Up
              </A>
            </div>
          </div>
          <hr class="border-b border-gray-100 opacity-25 my-0 py-0" />
        </nav>
        <div class="pt-24" ref={bgImg}>
          <div class="mx-20">
            <div class="px-8 mx-auto flex flex-wrap flex-col md:flex-row items-center">
              <div class="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                <p class="uppercase tracking-loose w-full">Learning Through Projects</p>
                <h1 class="my-4 text-5xl font-bold leading-tight">
                  Take your Music offline
                </h1>
                <p class="leading-normal text-2xl mb-8">
                  your music your choice, do with it what you please
                </p>
                <A href="/sign_up" class="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                  Sign Up
                </A>
              </div>
              <div class="w-full md:w-3/5 py-6 text-center">
                <img class="w-full md:w-4/5 z-50" src={svg} />
              </div>
            </div>
          </div>
        </div>
        <section class="py-8" ref={bgHere}>
          <div class="max-w-5xl mx-auto m-8">
            <h2 class="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
              Mapp by Ghost Brain
            </h2>
            <div class="w-full mb-4">
              <div class="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t" />
            </div>
            <div class="flex flex-wrap">
              <div class="w-5/6 sm:w-1/2 p-6">
                <h3 class="text-3xl text-white font-bold leading-none mb-3">
                  Providing little value but much knowledge
                </h3>
                <p class="text-white mb-8">
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
      <Footer/>
      </div>
      </>
  );
}
